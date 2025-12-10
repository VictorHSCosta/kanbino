# frozen_string_literal: true

module Gemkanbino
  module Config
    # Storage configuration settings
    class StorageConfig
      DEFAULT_CONFIG = {
        "storage" => {
          "directory" => File.join(Dir.home, ".gemkanbino", "storage"),
          "max_size" => 1024 * 1024 * 1024, # 1GB
          "compression_enabled" => true,
          "compression_threshold" => 30, # days
          "cleanup_on_startup" => false,
          "auto_duplicate_detection" => true
        }
      }.freeze

      def self.default_config
        DEFAULT_CONFIG
      end

      def self.validate_config(config)
        errors = []

        storage_config = config["storage"] || {}

        # Validate directory
        if storage_config["directory"]
          dir = storage_config["directory"]
          unless dir.is_a?(String) && !dir.empty?
            errors << "Storage directory must be a non-empty string"
          end
        end

        # Validate max_size
        if storage_config["max_size"]
          size = storage_config["max_size"]
          unless size.is_a?(Integer) && size > 0
            errors << "Storage max_size must be a positive integer"
          end
        end

        # Validate boolean values
        ["compression_enabled", "cleanup_on_startup", "auto_duplicate_detection"].each do |key|
          if storage_config.key?(key) && ![true, false].include?(storage_config[key])
            errors << "Storage #{key} must be true or false"
          end
        end

        # Validate compression_threshold
        if storage_config["compression_threshold"]
          threshold = storage_config["compression_threshold"]
          unless threshold.is_a?(Integer) && threshold >= 0
            errors << "Storage compression_threshold must be a non-negative integer"
          end
        end

        errors
      end
    end
  end
end