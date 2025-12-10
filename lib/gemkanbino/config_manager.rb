# frozen_string_literal: true

require "yaml"

module Gemkanbino
  class ConfigManager
    def initialize
      @config_dir = File.join(Dir.home, ".kanbino")
      @config_file = File.join(@config_dir, "config.yml")
      ensure_config_dir
    end

    def get_config(key)
      config = load_config
      config[key] || default_config[key]
    end

    def set_config(key, value)
      config = load_config
      config[key] = value
      save_config(config)
    end

    def show_all_config
      config = load_config
      config.each do |key, value|
        puts "#{key}: #{value}"
      end
    end

    private

    def load_config
      return {} unless File.exist?(@config_file)

      begin
        YAML.load_file(@config_file) || {}
      rescue Psych::SyntaxError
        {}
      end
    end

    def save_config(config)
      File.write(@config_file, YAML.dump(config))
    end

    def ensure_config_dir
      Dir.mkdir(@config_dir) unless Dir.exist?(@config_dir)
    end

    def default_config
      {
        "default_provider" => "file_io",
        "storage_location" => File.join(Dir.home, "kanbino_uploads"),
        "history_enabled" => true
      }
    end
  end
end