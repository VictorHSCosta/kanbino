# frozen_string_literal: true

module Gemkanbino
  module Utils
    # Validation utilities for story operations
    class StoryValidator
      class << self
        # Validate story title
        def validate_title(title)
          raise Exceptions::InvalidStoryTitleError, "Title cannot be nil" if title.nil?
          raise Exceptions::InvalidStoryTitleError, "Title cannot be empty" if title.strip.empty?

          # Length validation
          if title.length < 3
            raise Exceptions::InvalidStoryTitleError, "Title must be at least 3 characters long"
          end

          if title.length > 200
            raise Exceptions::InvalidStoryTitleError, "Title must be less than 200 characters long"
          end

          # Character validation
          unless title.match(/^[a-zA-Z0-9\s\-_.,!?':;]+$/)
            raise Exceptions::InvalidStoryTitleError, "Title contains invalid characters"
          end

          # No consecutive special characters
          if title.match(/[\-_]{2,}/)
            raise Exceptions::InvalidStoryTitleError, "Title cannot contain consecutive special characters"
          end

          true
        end

        # Validate story data structure
        def validate_story_data(story_data)
          raise ArgumentError, "Story data cannot be nil" if story_data.nil?
          raise ArgumentError, "Story data must be a hash" unless story_data.is_a?(Hash)

          # Validate required fields
          %i[title chapters].each do |field|
            unless story_data.key?(field)
              raise ArgumentError, "Story data missing required field: #{field}"
            end
          end

          # Validate title
          validate_title(story_data[:title])

          # Validate chapters
          unless story_data[:chapters].is_a?(Array)
            raise ArgumentError, "Chapters must be an array"
          end

          if story_data[:chapters].empty?
            raise ArgumentError, "Story must have at least one chapter"
          end

          # Validate each chapter
          story_data[:chapters].each_with_index do |chapter, index|
            validate_chapter(chapter, index)
          end

          true
        end

        # Validate chapter structure
        def validate_chapter(chapter, index = nil)
          unless chapter.is_a?(Hash)
            raise ArgumentError, "Chapter #{index + 1} must be a hash"
          end

          unless chapter.key?(:title) && chapter.key?(:content)
            raise ArgumentError, "Chapter #{index + 1} missing required fields"
          end

          unless chapter[:title].is_a?(String) && chapter[:content].is_a?(String)
            raise ArgumentError, "Chapter #{index + 1} fields must be strings"
          end

          if chapter[:title].strip.empty?
            raise ArgumentError, "Chapter #{index + 1} title cannot be empty"
          end

          if chapter[:content].strip.empty?
            raise ArgumentError, "Chapter #{index + 1} content cannot be empty"
          end

          if chapter[:title].length > 100
            raise ArgumentError, "Chapter #{index + 1} title too long (max 100 characters)"
          end

          if chapter[:content].length > 50_000
            raise ArgumentError, "Chapter #{index + 1} content too long (max 50,000 characters)"
          end

          true
        end

        # Validate metadata
        def validate_metadata(metadata)
          raise ArgumentError, "Metadata cannot be nil" if metadata.nil?
          raise ArgumentError, "Metadata must be a hash" unless metadata.is_a?(Hash)

          # Validate required fields
          required_fields = %w[title template created_at]
          required_fields.each do |field|
            unless metadata.key?(field)
              raise ArgumentError, "Metadata missing required field: #{field}"
            end
          end

          # Validate title
          validate_title(metadata["title"])

          # Validate template
          unless metadata["template"].is_a?(String) && !metadata["template"].empty?
            raise ArgumentError, "Template must be a non-empty string"
          end

          # Validate created_at
          begin
            Time.parse(metadata["created_at"])
          rescue ArgumentError
            raise ArgumentError, "Invalid created_at timestamp"
          end

          # Validate optional fields
          if metadata["chapters"] && (!metadata["chapters"].is_a?(Integer) || metadata["chapters"] < 0)
            raise ArgumentError, "Chapters count must be a non-negative integer"
          end

          if metadata["word_count"] && (!metadata["word_count"].is_a?(Integer) || metadata["word_count"] < 0)
            raise ArgumentError, "Word count must be a non-negative integer"
          end

          if metadata["characters"] && (!metadata["characters"].is_a?(Array) ||
                                        !metadata["characters"].all? { |c| c.is_a?(String) && !c.empty? })
            raise ArgumentError, "Characters must be an array of non-empty strings"
          end

          if metadata["genres"] && (!metadata["genres"].is_a?(Array) ||
                                    !metadata["genres"].all? { |g| g.is_a?(String) && !g.empty? })
            raise ArgumentError, "Genres must be an array of non-empty strings"
          end

          if metadata["tags"] && (!metadata["tags"].is_a?(Array) ||
                                  !metadata["tags"].all? { |t| t.is_a?(String) && !t.empty? })
            raise ArgumentError, "Tags must be an array of non-empty strings"
          end

          true
        end

        # Validate template name
        def validate_template_name(template_name)
          raise ArgumentError, "Template name cannot be nil" if template_name.nil?
          raise ArgumentError, "Template name cannot be empty" if template_name.strip.empty?

          unless template_name.match(/^[a-zA-Z0-9_]+$/)
            raise ArgumentError, "Template name contains invalid characters"
          end

          if template_name.length > 50
            raise ArgumentError, "Template name too long (max 50 characters)"
          end

          true
        end

        # Validate export format
        def validate_export_format(format)
          valid_formats = %w[markdown html pdf txt]
          unless valid_formats.include?(format.to_s.downcase)
            raise ArgumentError, "Invalid export format. Supported formats: #{valid_formats.join(', ')}"
          end

          true
        end

        # Validate search query
        def validate_search_query(query)
          raise ArgumentError, "Search query cannot be nil" if query.nil?

          if query.strip.empty?
            raise ArgumentError, "Search query cannot be empty"
          end

          if query.length > 100
            raise ArgumentError, "Search query too long (max 100 characters)"
          end

          true
        end

        # Validate file path for export
        def validate_export_path(path)
          return true if path.nil?  # Optional path

          # Check if parent directory exists and is writable
          parent_dir = File.dirname(path)
          unless Dir.exist?(parent_dir)
            raise ArgumentError, "Export directory does not exist: #{parent_dir}"
          end

          unless File.writable?(parent_dir)
            raise ArgumentError, "Export directory is not writable: #{parent_dir}"
          end

          true
        end

        # Sanitize and validate user input for story options
        def sanitize_story_options(options)
          return {} unless options.is_a?(Hash)

          sanitized = {}

          options.each do |key, value|
            # Skip invalid keys
            next unless key.is_a?(String) && !key.empty?

            # Sanitize string values
            if value.is_a?(String)
              sanitized[key] = sanitize_string(value)
            elsif value.is_a?(Array)
              sanitized[key] = sanitize_array(value)
            elsif value.is_a?(Hash)
              sanitized[key] = sanitize_story_options(value)  # Recursive
            else
              sanitized[key] = value
            end
          end

          sanitized
        end

        private

        # Sanitize string input
        def sanitize_string(str)
          return str if str.nil?

          # Remove potentially dangerous characters
          str.gsub(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/, '').strip
        end

        # Sanitize array input
        def sanitize_array(arr)
          return [] unless arr.is_a?(Array)

          arr.map { |item| item.is_a?(String) ? sanitize_string(item) : item }
             .reject { |item| item.is_a?(String) && item.empty? }
        end
      end
    end
  end
end