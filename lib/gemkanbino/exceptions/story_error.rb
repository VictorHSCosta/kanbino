# frozen_string_literal: true

module Gemkanbino
  module Exceptions
    # Custom exception for story-related errors
    class StoryError < StandardError
      attr_reader :error_type, :story_title

      def initialize(message, error_type = :general, story_title = nil)
        super(message)
        @error_type = error_type
        @story_title = story_title
      end

      def to_s
        if @story_title
          "#{super} (Story: #{@story_title})"
        else
          super
        end
      end
    end

    # Specific story error types
    class StoryNotFoundError < StoryError
      def initialize(story_title)
        super("Story not found", :not_found, story_title)
      end
    end

    class StoryAlreadyExistsError < StoryError
      def initialize(story_title)
        super("Story already exists", :already_exists, story_title)
      end
    end

    class InvalidStoryTitleError < StoryError
      def initialize(title)
        super("Invalid story title: #{title}", :invalid_title)
      end
    end

    class TemplateNotFoundError < StoryError
      def initialize(template_name)
        super("Template not found: #{template_name}", :template_not_found)
      end
    end

    class StoryGenerationError < StoryError
      def initialize(message, story_title = nil)
        super("Failed to generate story: #{message}", :generation_failed, story_title)
      end
    end

    class StoryStorageError < StoryError
      def initialize(message, story_title = nil)
        super("Storage error: #{message}", :storage_error, story_title)
      end
    end

    class StoryExportError < StoryError
      def initialize(message, story_title = nil)
        super("Export error: #{message}", :export_error, story_title)
      end
    end
  end
end