# frozen_string_literal: true

require 'json'
require 'fileutils'

module Gemkanbino
  module Config
    class WebConfig
      DEFAULT_HOST = '0.0.0.0'
      DEFAULT_PORT = 4567
      CONFIG_FILE = File.join(Dir.home, '.gemkanbino', 'web_config.json')

      attr_reader :host, :port

      def initialize
        load_config
      end

      def load_config
        if File.exist?(CONFIG_FILE)
          config = JSON.parse(File.read(CONFIG_FILE))
          @host = config['host'] || DEFAULT_HOST
          @port = config['port'] || DEFAULT_PORT
        else
          @host = DEFAULT_HOST
          @port = DEFAULT_PORT
        end
      rescue JSON::ParserError => e
        warn "⚠️  Erro ao ler configuração web: #{e.message}. Usando valores padrão."
        @host = DEFAULT_HOST
        @port = DEFAULT_PORT
      end

      def save_config(host: nil, port: nil)
        @host = host if host
        @port = port if port

        config = {
          'host' => @host,
          'port' => @port
        }

        ensure_config_directory
        File.write(CONFIG_FILE, JSON.pretty_generate(config))
      end

      def reset_to_defaults
        @host = DEFAULT_HOST
        @port = DEFAULT_PORT
        save_config
      end

      def server_url
        "http://#{@host}:#{@port}"
      end

      private

      def ensure_config_directory
        config_dir = File.dirname(CONFIG_FILE)
        FileUtils.mkdir_p(config_dir) unless Dir.exist?(config_dir)
      end
    end
  end
end