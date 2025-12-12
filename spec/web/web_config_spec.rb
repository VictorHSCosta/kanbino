# frozen_string_literal: true

require 'spec_helper'
require 'tempfile'

RSpec.describe Gemkanbino::Config::WebConfig do
  let(:config) { described_class.new }
  let(:temp_config_dir) { Dir.mktmpdir }

  before do
    # Override config file location for testing
    allow(described_class).to receive(:const_get).with(:CONFIG_FILE).and_return(
      File.join(temp_config_dir, 'web_config.json')
    )
  end

  after do
    FileUtils.rm_rf(temp_config_dir)
  end

  describe '#initialize' do
    it 'loads default configuration when no config file exists' do
      expect(config.host).to eq('0.0.0.0')
      expect(config.port).to eq(4567)
    end

    it 'loads configuration from existing file' do
      config_data = {
        'host' => '127.0.0.1',
        'port' => 8080
      }
      config_file = File.join(temp_config_dir, 'web_config.json')
      File.write(config_file, JSON.pretty_generate(config_data))

      new_config = described_class.new
      expect(new_config.host).to eq('127.0.0.1')
      expect(new_config.port).to eq(8080)
    end

    it 'uses defaults when config file has invalid JSON' do
      config_file = File.join(temp_config_dir, 'web_config.json')
      File.write(config_file, 'invalid json content')

      expect { described_class.new }.not_to raise_error
      new_config = described_class.new
      expect(new_config.host).to eq('0.0.0.0')
      expect(new_config.port).to eq(4567)
    end
  end

  describe '#save_config' do
    it 'saves configuration to file' do
      config.save_config(host: '192.168.1.1', port: 9000)

      expect(config.host).to eq('192.168.1.1')
      expect(config.port).to eq(9000)

      config_file = File.join(temp_config_dir, 'web_config.json')
      expect(File.exist?(config_file)).to be true

      saved_data = JSON.parse(File.read(config_file))
      expect(saved_data['host']).to eq('192.168.1.1')
      expect(saved_data['port']).to eq(9000)
    end

    it 'updates only specified parameters' do
      config.save_config(host: '127.0.0.1')
      expect(config.host).to eq('127.0.0.1')
      expect(config.port).to eq(4567) # unchanged

      config.save_config(port: 3000)
      expect(config.host).to eq('127.0.0.1') # unchanged
      expect(config.port).to eq(3000)
    end
  end

  describe '#reset_to_defaults' do
    it 'resets configuration to default values' do
      config.save_config(host: 'custom-host', port: 9999)
      expect(config.host).to eq('custom-host')
      expect(config.port).to eq(9999)

      config.reset_to_defaults
      expect(config.host).to eq('0.0.0.0')
      expect(config.port).to eq(4567)
    end
  end

  describe '#server_url' do
    it 'returns correct server URL' do
      expect(config.server_url).to eq('http://0.0.0.0:4567')

      config.save_config(host: 'localhost', port: 8080)
      expect(config.server_url).to eq('http://localhost:8080')
    end
  end
end