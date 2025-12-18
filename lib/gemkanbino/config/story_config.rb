# frozen_string_literal: true

require "yaml"
require "fileutils"

module Gemkanbino
  module Config
    # Configuration management for story functionality
    class StoryConfig
      attr_reader :config_file, :config

      def initialize
        @config_file = get_config_file_path
        load_config
      end

      def get(key, default = nil)
        keys = key.to_s.split(".")
        value = @config

        keys.each do |k|
          return default unless value.is_a?(Hash) && value.key?(k)
          value = value[k]
        end

        value
      end

      def set(key, value)
        keys = key.to_s.split(".")
        last_key = keys.pop
        config_section = @config

        keys.each do |k|
          config_section[k] = {} unless config_section.key?(k) && config_section[k].is_a?(Hash)
          config_section = config_section[k]
        end

        config_section[last_key] = value
        save_config
      end

      def get_story_directory
        get("stories.directory", default_story_directory)
      end

      def set_story_directory(path)
        set("stories.directory", File.expand_path(path))
      end

      def get_default_template
        get("stories.default_template", "guerra_irmaos_planetas")
      end

      def set_default_template(template_name)
        set("stories.default_template", template_name)
      end

      def get_export_format
        get("stories.export_format", "markdown")
      end

      def set_export_format(format)
        set("stories.export_format", format)
      end

      def get_auto_save_enabled
        get("stories.auto_save", true)
      end

      def set_auto_save_enabled(enabled)
        set("stories.auto_save", enabled)
      end

      def get_max_title_length
        get("stories.max_title_length", 200)
      end

      def set_max_title_length(length)
        set("stories.max_title_length", length)
      end

      def get_max_chapters
        get("stories.max_chapters", 20)
      end

      def set_max_chapters(count)
        set("stories.max_chapters", count)
      end

      def get_max_words_per_chapter
        get("stories.max_words_per_chapter", 50_000)
      end

      def set_max_words_per_chapter(count)
        set("stories.max_words_per_chapter", count)
      end

      def get_enabled_genres
        get("stories.enabled_genres", default_genres)
      end

      def set_enabled_genres(genres)
        set("stories.enabled_genres", genres)
      end

      def get_editor_command
        get("stories.editor_command", default_editor_command)
      end

      def set_editor_command(command)
        set("stories.editor_command", command)
      end

      def get_preview_lines
        get("stories.preview_lines", 20)
      end

      def set_preview_lines(lines)
        set("stories.preview_lines", lines)
      end

      def get_display_format
        get("stories.display_format", "detailed")
      end

      def set_display_format(format)
        set("stories.display_format", format)
      end

      def get_search_results_limit
        get("stories.search_results_limit", 50)
      end

      def set_search_results_limit(limit)
        set("stories.search_results_limit", limit)
      end

      def reset_to_defaults
        @config = default_config
        save_config
      end

      def show_config
        puts "Story Configuration:"
        puts "=" * 40
        puts "Directory: #{get_story_directory}"
        puts "Default Template: #{get_default_template}"
        puts "Export Format: #{get_export_format}"
        puts "Auto Save: #{get_auto_save_enabled ? 'Enabled' : 'Disabled'}"
        puts "Max Title Length: #{get_max_title_length}"
        puts "Max Chapters: #{get_max_chapters}"
        puts "Max Words/Chapter: #{get_max_words_per_chapter}"
        puts "Editor Command: #{get_editor_command}"
        puts "Preview Lines: #{get_preview_lines}"
        puts "Display Format: #{get_display_format}"
        puts "Search Results Limit: #{get_search_results_limit}"
        puts "=" * 40
      end

      def validate_config
        errors = []

        # Validate story directory
        story_dir = get_story_directory
        parent_dir = File.dirname(story_dir)
        unless Dir.exist?(parent_dir)
          errors << "Story directory parent does not exist: #{parent_dir}"
        end

        unless File.writable?(parent_dir)
          errors << "Story directory parent is not writable: #{parent_dir}"
        end

        # Validate template
        template = get_default_template
        unless template.is_a?(String) && !template.empty?
          errors << "Default template must be a non-empty string"
        end

        # Validate export format
        valid_formats = %w[markdown html pdf txt]
        unless valid_formats.include?(get_export_format)
          errors << "Invalid export format. Valid formats: #{valid_formats.join(', ')}"
        end

        # Validate numeric values
        if get_max_title_length < 1 || get_max_title_length > 1000
          errors << "Max title length must be between 1 and 1000"
        end

        if get_max_chapters < 1 || get_max_chapters > 100
          errors << "Max chapters must be between 1 and 100"
        end

        if get_max_words_per_chapter < 100 || get_max_words_per_chapter > 1_000_000
          errors << "Max words per chapter must be between 100 and 1,000,000"
        end

        if get_preview_lines < 1 || get_preview_lines > 1000
          errors << "Preview lines must be between 1 and 1000"
        end

        if get_search_results_limit < 1 || get_search_results_limit > 1000
          errors << "Search results limit must be between 1 and 1000"
        end

        # Validate display format
        valid_display_formats = %w[compact detailed full]
        unless valid_display_formats.include?(get_display_format)
          errors << "Invalid display format. Valid formats: #{valid_display_formats.join(', ')}"
        end

        errors
      end

      private

      def get_config_file_path
        # Try to get from global config first
        global_config = File.join(Dir.home, ".gemkanbino", "config.yml")
        return global_config if File.exist?(global_config)

        # Fallback to local config
        File.join(Dir.pwd, ".gemkanbino", "stories.yml")
      end

      def load_config
        if File.exist?(@config_file)
          begin
            yaml_content = File.read(@config_file)
            @config = YAML.safe_load(yaml_content) || {}
          rescue => e
            puts "Warning: Failed to load story config: #{e.message}"
            @config = {}
          end
        else
          @config = default_config
          save_config
        end
      end

      def save_config
        config_dir = File.dirname(@config_file)
        FileUtils.mkdir_p(config_dir)

        File.write(@config_file, YAML.dump(@config))
      end

      def default_config
        {
          "stories" => {
            "directory" => default_story_directory,
            "default_template" => "guerra_irmaos_planetas",
            "export_format" => "markdown",
            "auto_save" => true,
            "max_title_length" => 200,
            "max_chapters" => 20,
            "max_words_per_chapter" => 50_000,
            "enabled_genres" => default_genres,
            "editor_command" => default_editor_command,
            "preview_lines" => 20,
            "display_format" => "detailed",
            "search_results_limit" => 50,
            "backup_enabled" => true,
            "backup_frequency" => "weekly",
            "compression_enabled" => false,
            "metadata_validation" => "strict"
          }
        }
      end

      def default_story_directory
        File.join(Dir.home, ".gemkanbino", "stories")
      end

      def default_genres
        [
          "Science Fiction",
          "Fantasy",
          "Mystery",
          "Drama",
          "Romance",
          "Thriller",
          "Horror",
          "Adventure",
          "Historical Fiction",
          "War"
        ]
      end

      def default_editor_command
        # Try to detect a suitable editor
        editors = %w[nano vim emacs code subl atom]
        editors.find { |editor| system("which #{editor} > /dev/null 2>&1") } || "nano"
      end
    end
  end
end