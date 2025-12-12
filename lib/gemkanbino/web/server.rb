# frozen_string_literal: true

require 'sinatra/base'
require 'webrick'

module Gemkanbino
  module Web
    class Server < Sinatra::Base
      set :public_folder, File.join(File.dirname(__FILE__), '../../..', 'public')
      set :views, File.join(File.dirname(__FILE__), '../../..', 'views')
      set :bind, '0.0.0.0'
      set :port, 4567
      set :show_exceptions, false

      get '/' do
        begin
          erb :index
        rescue Errno::ENOENT => e
          raise Exceptions::TemplateNotFoundError.new('index.erb')
        end
      end

      # Health check endpoint
      get '/health' do
        content_type :json
        { status: 'ok', timestamp: Time.now.iso8601 }.to_json
      end

      # Error handlers
      error Exceptions::WebError do
        content_type :json
        status 500
        env['sinatra.error'].to_hash.to_json
      end

      error Errno::EADDRINUSE do
        content_type :json
        status 500
        {
          error: 'Port Conflict',
          message: "Port #{settings.port} is already in use on #{settings.bind}",
          error_code: 'PORT_CONFLICT',
          details: { port: settings.port, host: settings.bind }
        }.to_json
      end

      error do
        content_type :json
        status 500
        {
          error: 'Internal Server Error',
          message: env['sinatra.error'].message,
          error_code: 'INTERNAL_ERROR'
        }.to_json
      end

      not_found do
        content_type :json
        status 404
        {
          error: 'Not Found',
          message: "Route not found: #{request.path_info}",
          error_code: 'ROUTE_NOT_FOUND',
          details: { path: request.path_info }
        }.to_json
      end

      # Start the server
      def self.start!(options = {})
        configure do
          set :port, options[:port] if options[:port]
          set :bind, options[:bind] if options[:bind]
        end

        begin
          puts "🚀 Gemkanbino Web Server starting at http://#{settings.bind}:#{settings.port}"
          run!
        rescue Errno::EADDRINUSE => e
          raise Exceptions::PortConflictError.new(settings.port, settings.bind)
        rescue => e
          raise Exceptions::ServerStartError.new(e.message, port: settings.port, host: settings.bind)
        end
      end

      # Stop the server gracefully
      def self.stop!
        quit! if running?
      end
    end
  end
end