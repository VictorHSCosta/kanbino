# frozen_string_literal: true

module Gemkanbino
  module Config
    # Upload configuration settings
    class UploadConfig
      DEFAULT_CONFIG = {
        "upload" => {
          "default_provider" => "fileio",
          "max_retries" => 3,
          "timeout" => 300, # 5 minutes
          "copy_url_to_clipboard" => true,
          "save_history" => true,
          "history_limit" => 100,
          "providers" => {
            "fileio" => {
              "enabled" => true,
              "api_key" => nil,
              "max_size" => 2 * 1024 * 1024 * 1024, # 2GB
              "expiration_days" => 14
            },
            "transfersh" => {
              "enabled" => true,
              "max_size" => 10 * 1024 * 1024 * 1024, # 10GB
              "expiration_days" => 30
            }
          }
        }
      }.freeze

      def self.default_config
        DEFAULT_CONFIG
      end

      def self.validate_config(config)
        errors = []

        upload_config = config["upload"] || {}

        # Validate default_provider
        if upload_config["default_provider"]
          provider = upload_config["default_provider"]
          valid_providers = ["fileio", "transfersh"]
          unless valid_providers.include?(provider)
            errors << "Default provider must be one of: #{valid_providers.join(', ')}"
          end
        end

        # Validate numeric values
        ["max_retries", "timeout", "history_limit"].each do |key|
          if upload_config.key?(key)
            value = upload_config[key]
            unless value.is_a?(Integer) && value > 0
              errors << "Upload #{key} must be a positive integer"
            end
          end
        end

        # Validate boolean values
        ["copy_url_to_clipboard", "save_history"].each do |key|
          if upload_config.key?(key) && ![true, false].include?(upload_config[key])
            errors << "Upload #{key} must be true or false"
          end
        end

        # Validate providers configuration
        if upload_config["providers"]
          provider_config = upload_config["providers"]
          ["fileio", "transfersh"].each do |provider_name|
            if provider_config[provider_name]
              validate_provider_config(provider_config[provider_name], provider_name, errors)
            end
          end
        end

        errors
      end

      def self.validate_provider_config(config, provider_name, errors)
        # Validate enabled flag
        if config.key?("enabled") && ![true, false].include?(config["enabled"])
          errors << "#{provider_name} provider enabled flag must be true or false"
        end

        # Validate max_size
        if config.key?("max_size")
          size = config["max_size"]
          unless size.is_a?(Integer) && size > 0
            errors << "#{provider_name} provider max_size must be a positive integer"
          end
        end

        # Validate expiration_days
        if config.key?("expiration_days")
          days = config["expiration_days"]
          unless days.is_a?(Integer) && days > 0
            errors << "#{provider_name} provider expiration_days must be a positive integer"
          end
        end

        # Validate api_key (optional, but if present should be string)
        if config.key?("api_key") && !config["api_key"].is_a?(String)
          errors << "#{provider_name} provider api_key must be a string"
        end
      end
    end
  end
end