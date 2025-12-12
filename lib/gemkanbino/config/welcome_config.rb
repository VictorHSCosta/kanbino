# frozen_string_literal: true

module Gemkanbino
  module Config
    # Welcome screen configuration settings
    class WelcomeConfig
      DEFAULT_CONFIG = {
        "welcome" => {
          "enabled" => true,
          "show_on_start" => true,
          "format" => "auto",  # auto, compact, detailed, minimal
          "clear_screen" => true,
          "show_tips" => true,
          "show_getting_started" => true,
          "tips_frequency" => 0.3,  # 30% chance to show tips
          "max_tips" => 4,
          "auto_timeout" => nil,  # seconds, nil = no timeout
          "colors_enabled" => true,
          "ascii_art" => true,
          "show_system_info" => false,
          "show_env_info" => false,
          "remember_preferences" => true,
          "compact_threshold" => {
            "min_width" => 60,
            "min_height" => 15
          },
          "minimal_threshold" => {
            "min_width" => 40,
            "min_height" => 10
          },
          "custom_message" => nil,
          "custom_footer" => nil
        }
      }.freeze

      def self.default_config
        DEFAULT_CONFIG
      end

      def self.validate_config(config)
        errors = []
        welcome_config = config["welcome"] || {}

        # Validate boolean values
        ["enabled", "show_on_start", "clear_screen", "show_tips", "show_getting_started",
         "colors_enabled", "ascii_art", "show_system_info", "show_env_info", "remember_preferences"].each do |key|
          if welcome_config.key?(key) && ![true, false].include?(welcome_config[key])
            errors << "Welcome #{key} must be true or false"
          end
        end

        # Validate format
        if welcome_config["format"]
          format = welcome_config["format"]
          unless %w[auto compact detailed minimal].include?(format)
            errors << "Welcome format must be one of: auto, compact, detailed, minimal"
          end
        end

        # Validate tips_frequency
        if welcome_config["tips_frequency"]
          freq = welcome_config["tips_frequency"]
          unless freq.is_a?(Numeric) && freq >= 0 && freq <= 1
            errors << "Welcome tips_frequency must be a number between 0 and 1"
          end
        end

        # Validate max_tips
        if welcome_config["max_tips"]
          max_tips = welcome_config["max_tips"]
          unless max_tips.is_a?(Integer) && max_tips > 0
            errors << "Welcome max_tips must be a positive integer"
          end
        end

        # Validate auto_timeout
        if welcome_config["auto_timeout"]
          timeout = welcome_config["auto_timeout"]
          unless timeout.is_a?(Integer) && timeout > 0
            errors << "Welcome auto_timeout must be a positive integer (seconds)"
          end
        end

        # Validate threshold values
        ["compact_threshold", "minimal_threshold"].each do |threshold_key|
          if welcome_config[threshold_key]
            threshold = welcome_config[threshold_key]
            validate_threshold(threshold, threshold_key, errors)
          end
        end

        # Validate custom_message
        if welcome_config["custom_message"]
          message = welcome_config["custom_message"]
          unless message.is_a?(String) && message.length <= 200
            errors << "Welcome custom_message must be a string with max 200 characters"
          end
        end

        # Validate custom_footer
        if welcome_config["custom_footer"]
          footer = welcome_config["custom_footer"]
          unless footer.is_a?(String) && footer.length <= 300
            errors << "Welcome custom_footer must be a string with max 300 characters"
          end
        end

        errors
      end

      def self.get_config
        config_dir = File.join(Dir.home, ".gemkanbino")
        config_file = File.join(config_dir, "config.yml")

        if File.exist?(config_file)
          begin
            require 'yaml'
            full_config = YAML.load_file(config_file) || {}
            return default_config["welcome"].merge(full_config["welcome"] || {})
          rescue => e
            # Fallback to default if config is corrupted
            default_config["welcome"]
          end
        else
          default_config["welcome"]
        end
      end

      def self.save_config(config)
        config_dir = File.join(Dir.home, ".gemkanbino")
        config_file = File.join(config_dir, "config.yml")

        # Ensure config directory exists
        FileUtils.mkdir_p(config_dir) unless Dir.exist?(config_dir)

        begin
          require 'yaml'
          full_config = if File.exist?(config_file)
                         YAML.load_file(config_file) || {}
                       else
                         {}
                       end

          full_config["welcome"] = config
          File.write(config_file, YAML.dump(full_config))
          true
        rescue => e
          false
        end
      end

      def self.reset_to_defaults
        save_config(default_config["welcome"])
      end

      def self.should_show_welcome?
        config = get_config
        return false unless config["enabled"]
        return false unless config["show_on_start"]
        return true if ENV['GEMKANBINO_FORCE_WELCOME']
        return false if ENV['GEMKANBINO_NO_WELCOME'] || ENV['CI'] || !STDOUT.tty?
        true
      end

      def self.get_welcome_format
        config = get_config
        format = config["format"]

        # Override format if terminal is too small
        terminal_width = IO.console&.winsize[1] || 80
        terminal_height = IO.console&.winsize[0] || 24

        if format == "auto"
          compact_min_width = config.dig("compact_threshold", "min_width") || 60
          compact_min_height = config.dig("compact_threshold", "min_height") || 15
          minimal_min_width = config.dig("minimal_threshold", "min_width") || 40
          minimal_min_height = config.dig("minimal_threshold", "min_height") || 10

          if terminal_width < minimal_min_width || terminal_height < minimal_min_height
            "minimal"
          elsif terminal_width < compact_min_width || terminal_height < compact_min_height
            "compact"
          else
            "detailed"
          end
        else
          format
        end
      end

      def self.should_show_tips?
        config = get_config
        return false unless config["enabled"]
        return false unless config["show_tips"]
        return true if ENV['GEMKANBINO_SHOW_TIPS']

        # Show tips based on frequency
        freq = config["tips_frequency"] || 0.3
        rand < freq
      end

      def self.should_show_getting_started?
        config = get_config
        return false unless config["enabled"]
        return false unless config["show_getting_started"]

        # Show getting started on first run
        config_dir = File.join(Dir.home, ".gemkanbino")
        !File.exist?(config_dir)
      end

      def self.should_clear_screen?
        config = get_config
        return false unless config["enabled"]
        return false unless config["clear_screen"]
        return false if ENV['NO_CLEAR'] || !STDOUT.tty?
        true
      end

      private

      def self.validate_threshold(threshold, threshold_key, errors)
        unless threshold.is_a?(Hash)
          errors << "#{threshold_key} must be a hash with min_width and min_height"
          return
        end

        ["min_width", "min_height"].each do |dim|
          if threshold.key?(dim)
            value = threshold[dim]
            unless value.is_a?(Integer) && value > 0
              errors << "#{threshold_key} #{dim} must be a positive integer"
            end
          else
            errors << "#{threshold_key} must include #{dim}"
          end
        end
      end
    end
  end
end