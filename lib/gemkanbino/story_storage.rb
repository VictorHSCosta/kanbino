# frozen_string_literal: true

require "fileutils"
require "json"
require "date"

module Gemkanbino
  # Specialized storage for story files and metadata
  class StoryStorage
    attr_reader :pastel, :storage_root

    def initialize
      @pastel = Pastel.new
      @storage_root = get_story_storage_directory
      ensure_storage_directory
      @index_file = File.join(@storage_root, "stories_index.json")
      load_index
    end

    def save_story(title, story_data, metadata)
      # Validate inputs
      raise ArgumentError, "Title cannot be empty" if title.nil? || title.strip.empty?
      raise ArgumentError, "Story data cannot be nil" if story_data.nil?

      # Create story directory
      safe_title = sanitize_title(title)
      story_dir = File.join(@storage_root, safe_title)
      FileUtils.mkdir_p(story_dir)

      # Save story content as markdown
      story_file = File.join(story_dir, "#{safe_title}.md")
      File.write(story_file, format_story_as_markdown(story_data))

      # Save metadata
      metadata_file = File.join(story_dir, "metadata.json")
      File.write(metadata_file, JSON.pretty_generate(metadata))

      # Save raw story data
      story_data_file = File.join(story_dir, "story_data.json")
      File.write(story_data_file, JSON.pretty_generate(story_data))

      # Update index
      add_to_index(safe_title, metadata)

      true
    end

    def get_story(title)
      safe_title = sanitize_title(title)
      metadata = @index[safe_title]

      return nil unless metadata

      story_dir = File.join(@storage_root, safe_title)
      story_data_file = File.join(story_dir, "story_data.json")

      unless File.exist?(story_data_file)
        return { error: "Story data file missing", metadata: metadata }
      end

      begin
        story_data = JSON.parse(File.read(story_data_file), symbolize_names: true)
        {
          title: title,
          chapters: story_data[:chapters] || [],
          metadata: metadata,
          story_data: story_data
        }
      rescue JSON::ParserError
        { error: "Corrupted story data file", metadata: metadata }
      end
    end

    def list_stories(filter = nil)
      if @index.empty?
        return []
      end

      stories = @index.map do |safe_title, metadata|
        {
          title: metadata["title"],
          safe_title: safe_title,
          metadata: metadata,
          exists: story_exists?(safe_title)
        }
      end

      # Apply filter if provided
      if filter
        filter = filter.downcase
        stories = stories.select do |story|
          story[:title].downcase.include?(filter) ||
            story[:metadata]["template"].downcase.include?(filter) ||
            (story[:metadata]["tags"] && story[:metadata]["tags"].any? { |tag| tag.downcase.include?(filter) })
        end
      end

      # Sort by creation date (newest first)
      stories.sort_by { |story| story[:metadata]["created_at"] }.reverse
    end

    def delete_story(title)
      safe_title = sanitize_title(title)

      unless @index.key?(safe_title)
        return false
      end

      story_dir = File.join(@storage_root, safe_title)

      if File.exist?(story_dir)
        FileUtils.rm_rf(story_dir)
      end

      @index.delete(safe_title)
      save_index

      true
    end

    def story_exists?(title)
      safe_title = sanitize_title(title)
      @index.key?(safe_title) && story_files_exist?(safe_title)
    end

    def search_stories(query)
      return [] if @index.empty?

      query = query.downcase
      results = []

      @index.each do |safe_title, metadata|
        matches = []

        # Search in title
        if metadata["title"].downcase.include?(query)
          matches << "title"
        end

        # Search in template
        if metadata["template"].downcase.include?(query)
          matches << "template"
        end

        # Search in tags
        if metadata["tags"] && metadata["tags"].any? { |tag| tag.downcase.include?(query) }
          matches << "tags"
        end

        # Search in characters
        if metadata["characters"] && metadata["characters"].any? { |char| char.downcase.include?(query) }
          matches << "characters"
        end

        # Search in genres
        if metadata["genres"] && metadata["genres"].any? { |genre| genre.downcase.include?(query) }
          matches << "genres"
        end

        # Search in story content if story exists
        if story_files_exist?(safe_title)
          story_content = get_story_content(safe_title)
          if story_content && story_content.downcase.include?(query)
            matches << "content"
          end
        end

        if matches.any?
          results << {
            title: metadata["title"],
            safe_title: safe_title,
            metadata: metadata,
            matches: matches,
            exists: story_files_exist?(safe_title)
          }
        end
      end

      results.sort_by { |result| result[:metadata]["created_at"] }.reverse
    end

    def get_story_markdown(title)
      safe_title = sanitize_title(title)
      story_dir = File.join(@storage_root, safe_title)
      story_file = File.join(story_dir, "#{safe_title}.md")

      if File.exist?(story_file)
        File.read(story_file)
      else
        nil
      end
    end

    def get_story_stats
      total_stories = @index.length
      total_words = @index.values.sum { |metadata| metadata["word_count"] || 0 }
      total_chapters = @index.values.sum { |metadata| metadata["chapters"] || 0 }

      templates = Hash.new(0)
      @index.values.each { |metadata| templates[metadata["template"]] += 1 }

      oldest_date = @index.values.map { |m| m["created_at"] }.min
      newest_date = @index.values.map { |m| m["created_at"] }.max

      {
        total_stories: total_stories,
        total_words: total_words,
        total_chapters: total_chapters,
        templates: templates,
        storage_location: @storage_root,
        oldest_story: oldest_date,
        newest_story: newest_date,
        index_size: File.size(@index_file) if File.exist?(@index_file)
      }
    end

    def cleanup_storage
      puts pastel.cyan("🧹 Cleaning up story storage...")

      removed_count = 0
      @index.each do |safe_title, metadata|
        unless story_files_exist?(safe_title)
          @index.delete(safe_title)
          removed_count += 1
          puts pastel.yellow("Removed missing story from index: #{metadata['title']}")
        end
      end

      save_index if removed_count > 0
      puts pastel.green("✓ Cleanup completed. Removed #{removed_count} missing stories.")
    end

    private

    def get_story_storage_directory
      # Try to get from config first
      config_manager = ConfigManager.new
      custom_path = config_manager.get_config("stories.directory")

      return custom_path if custom_path && Dir.exist?(File.dirname(custom_path))

      # Default locations
      default_paths = [
        File.join(Dir.home, ".gemkanbino", "stories"),
        File.join(Dir.tmpdir, "gemkanbino", "stories"),
        File.join(Dir.pwd, ".gemkanbino_stories")
      ]

      default_paths.find { |path| can_create_directory?(path) } || default_paths.first
    end

    def can_create_directory?(path)
      parent = File.dirname(path)
      Dir.exist?(parent) && File.writable?(parent)
    end

    def ensure_storage_directory
      FileUtils.mkdir_p(@storage_root)
    end

    def sanitize_title(title)
      # Replace spaces and special characters with underscores
      title.gsub(/[^a-zA-Z0-9\s\-_]/, '').strip.gsub(/\s+/, '_').downcase
    end

    def format_story_as_markdown(story_data)
      markdown = "# #{story_data[:title]}\n\n"

      story_data[:chapters].each_with_index do |chapter, index|
        markdown += "## Chapter #{index + 1}: #{chapter[:title]}\n\n"
        markdown += "#{chapter[:content]}\n\n"
      end

      markdown
    end

    def load_index
      if File.exist?(@index_file)
        begin
          @index = JSON.parse(File.read(@index_file))
        rescue JSON::ParserError
          puts pastel.yellow("Warning: Corrupted story index file, creating new one.")
          @index = {}
        end
      else
        @index = {}
      end
    end

    def save_index
      File.write(@index_file, JSON.pretty_generate(@index))
    end

    def add_to_index(safe_title, metadata)
      @index[safe_title] = metadata
      save_index
    end

    def story_files_exist?(safe_title)
      story_dir = File.join(@storage_root, safe_title)
      story_file = File.join(story_dir, "#{safe_title}.md")
      metadata_file = File.join(story_dir, "metadata.json")

      Dir.exist?(story_dir) && File.exist?(story_file) && File.exist?(metadata_file)
    end

    def get_story_content(safe_title)
      story_data = get_story_metadata(safe_title)
      return nil unless story_data

      # Search through chapters for content
      story_dir = File.join(@storage_root, safe_title)
      story_data_file = File.join(story_dir, "story_data.json")

      if File.exist?(story_data_file)
        begin
          data = JSON.parse(File.read(story_data_file), symbolize_names: true)
          return data[:chapters].map { |chapter| chapter[:content] }.join(" ")
        rescue JSON::ParserError
          return nil
        end
      end

      nil
    end

    def get_story_metadata(safe_title)
      @index[safe_title]
    end
  end
end