# frozen_string_literal: true

require 'spec_helper'
require 'net/http'
require 'json'
require 'timeout'

RSpec.describe Gemkanbino::Web::Server do
  let(:server) { described_class }
  let(:test_port) { 4568 }
  let(:test_host) { '127.0.0.1' }

  before(:all) do
    # Set test port and host
    server.set :port, test_port
    server.set :bind, test_host
    server.set :environment, :test
  end

  after(:all) do
    server.stop! if server.running?
  end

  describe 'GET /' do
    it 'returns the homepage' do
      # Start server in background thread
      server_thread = Thread.new { server.start! }

      # Wait for server to start
      wait_for_server(test_host, test_port)

      begin
        response = make_request('GET', '/', test_host, test_port)

        expect(response.code).to eq('200')
        expect(response.body).to include('bem vindo')
        expect(response.body).to include('Gemkanbino')
        expect(response['content-type']).to include('text/html')
      ensure
        server.stop!
        server_thread.join(5) if server_thread.alive?
      end
    end
  end

  describe 'GET /health' do
    it 'returns health check information' do
      server_thread = Thread.new { server.start! }
      wait_for_server(test_host, test_port)

      begin
        response = make_request('GET', '/health', test_host, test_port)

        expect(response.code).to eq('200')
        body = JSON.parse(response.body)
        expect(body['status']).to eq('ok')
        expect(body).to have_key('timestamp')
        expect(response['content-type']).to include('application/json')
      ensure
        server.stop!
        server_thread.join(5) if server_thread.alive?
      end
    end
  end

  describe 'GET /nonexistent' do
    it 'returns 404 for unknown routes' do
      server_thread = Thread.new { server.start! }
      wait_for_server(test_host, test_port)

      begin
        response = make_request('GET', '/nonexistent', test_host, test_port)

        expect(response.code).to eq('404')
        body = JSON.parse(response.body)
        expect(body['error']).to eq('Not Found')
        expect(body['error_code']).to eq('ROUTE_NOT_FOUND')
      ensure
        server.stop!
        server_thread.join(5) if server_thread.alive?
      end
    end
  end

  describe 'server configuration' do
    it 'accepts custom port configuration' do
      custom_port = 4569
      expect do
        server_thread = Thread.new { server.start!(port: custom_port) }
        wait_for_server(test_host, custom_port)
        server.stop!
        server_thread.join(5) if server_thread.alive?
      end.not_to raise_error
    end

    it 'accepts custom host configuration' do
      custom_host = '127.0.0.1'
      expect do
        server_thread = Thread.new { server.start!(bind: custom_host) }
        wait_for_server(custom_host, test_port)
        server.stop!
        server_thread.join(5) if server_thread.alive?
      end.not_to raise_error
    end
  end

  describe 'error handling' do
    it 'handles server startup errors gracefully' do
      # Try to start on the same port twice to simulate port conflict
      server_thread1 = Thread.new { server.start! }
      wait_for_server(test_host, test_port)

      expect do
        # This should fail with port conflict
        server_thread2 = Thread.new { server.start! }
        sleep(1)  # Give it time to try
        server_thread2.kill
      end.not_to raise_error

      server.stop!
      server_thread1.join(5) if server_thread1.alive?
    end
  end

  private

  def wait_for_server(host, port, timeout = 10)
    start_time = Time.now
    loop do
      begin
        TCPSocket.open(host, port) { |socket| socket.close }
        break
      rescue Errno::ECONNREFUSED
        raise "Server failed to start within #{timeout} seconds" if Time.now - start_time > timeout
        sleep(0.1)
      end
    end
  end

  def make_request(method, path, host, port)
    uri = URI("http://#{host}:#{port}#{path}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.open_timeout = 5
    http.read_timeout = 5

    case method.upcase
    when 'GET'
      http.get(uri.path)
    when 'POST'
      http.post(uri.path, '')
    else
      raise "Unsupported HTTP method: #{method}"
    end
  rescue => e
    raise "HTTP request failed: #{e.message}"
  end
end