# frozen_string_literal: true

require "json"
require "date"
require "pastel"
require "tty/prompt"

module Gemkanbino
  # Manages story creation, storage, and retrieval
  class StoryManager
    attr_reader :pastel, :prompt, :storage

    def initialize
      @pastel = Pastel.new
      @prompt = TTY::Prompt.new
      @storage = StoryStorage.new
    end

    def create_story(title, template_name = "guerra_irmaos_planetas", options = {})
      # Validate title
      Utils::StoryValidator.validate_title(title)

      # Check for existing story
      if @storage.story_exists?(title)
        raise Exceptions::StoryError, "Story '#{title}' already exists"
      end

      # Get template
      template = StoryTemplates.get_template(template_name)
      raise Exceptions::StoryError, "Template '#{template_name}' not found" unless template

      # Generate story content
      story_data = template.generate_story(title, options)

      # Add metadata
      metadata = create_story_metadata(title, template_name, story_data, options)

      # Save story
      @storage.save_story(title, story_data, metadata)

      puts pastel.green("✓ Story created successfully: #{title}")
      puts pastel.dim("Template: #{template_name}")
      puts pastel.dim("Chapters: #{story_data[:chapters].length}")

      title
    end

    def list_stories(filter = nil)
      stories = @storage.list_stories(filter)

      if stories.empty?
        puts pastel.yellow("No stories found.")
        return
      end

      puts pastel.cyan("📚 Stories (#{stories.length}):")
      puts "=" * 80

      stories.each do |story|
        display_story_in_list(story)
      end

      puts "=" * 80
    end

    def show_story(title)
      story_data = @storage.get_story(title)

      if story_data.nil?
        puts pastel.red("Story '#{title}' not found.")
        return
      end

      display_full_story(story_data)
    end

    def delete_story(title)
      unless @storage.story_exists?(title)
        puts pastel.red("Story '#{title}' not found.")
        return false
      end

      confirm = @prompt.yes?("Are you sure you want to delete '#{title}'?")
      return false unless confirm

      if @storage.delete_story(title)
        puts pastel.yellow("🗑️ Story deleted: #{title}")
        true
      else
        puts pastel.red("Failed to delete story: #{title}")
        false
      end
    end

    def search_stories(query)
      results = @storage.search_stories(query)

      if results.empty?
        puts pastel.yellow("No stories found matching: #{query}")
        return
      end

      puts pastel.cyan("🔍 Search Results for '#{query}' (#{results.length}):")
      puts "=" * 80

      results.each do |story|
        display_story_in_list(story)
      end

      puts "=" * 80
    end

    def get_story_info(title)
      story_data = @storage.get_story(title)

      if story_data.nil?
        puts pastel.red("Story '#{title}' not found.")
        return
      end

      display_story_info(story_data)
    end

    def export_story(title, format = "markdown", destination = nil)
      story_data = @storage.get_story(title)

      if story_data.nil?
        puts pastel.red("Story '#{title}' not found.")
        return false
      end

      exporter = StoryExporter.new
      success = exporter.export(story_data, format, destination)

      if success
        puts pastel.green("✓ Story exported: #{title} (#{format})")
      else
        puts pastel.red("Failed to export story: #{title}")
      end

      success
    end

    def interactive_story_creation
      puts pastel.cyan("📝 Interactive Story Creation")
      puts "=" * 40

      # Get title
      title = @prompt.ask("Story title:") do |q|
        q.required true
        q.validate(/^[a-zA-Z0-9\s\-_]+$/, "Title can only contain letters, numbers, spaces, hyphens and underscores")
      end

      # Select template
      templates = StoryTemplates.list_templates
      template_name = @prompt.select("Select template:", templates)

      # Get template-specific options
      options = get_template_options(template_name)

      create_story(title, template_name, options)
    end

    def list_templates
      templates = StoryTemplates.list_templates_with_descriptions

      puts pastel.cyan("📋 Available Templates:")
      puts "=" * 50

      templates.each do |name, description|
        puts pastel.bold(name.ljust(30)) + " #{description}"
      end

      puts "=" * 50
    end

    private

    def create_story_metadata(title, template_name, story_data, options)
      {
        title: title,
        template: template_name,
        created_at: Time.now.iso8601,
        chapters: story_data[:chapters].length,
        word_count: calculate_word_count(story_data),
        characters: extract_characters(story_data),
        genres: story_data[:metadata][:genres] || [],
        tags: options[:tags] || [],
        options: options
      }
    end

    def calculate_word_count(story_data)
      story_data[:chapters].sum do |chapter|
        chapter[:content].split.length
      end
    end

    def extract_characters(story_data)
      story_data[:metadata][:characters] || []
    end

    def display_story_in_list(story)
      metadata = story[:metadata]
      date_str = Date.parse(metadata["created_at"]).strftime("%Y-%m-%d")

      status = story[:exists] ? pastel.green("✓") : pastel.red("✗")
      chapters = metadata["chapters"] || 0
      word_count = metadata["word_count"] || 0

      puts "#{status} #{story[:title].ljust(25)} #{metadata["template"].ljust(20)} #{chapters.to_s.rjust(3)}ch #{word_count.to_s.rjust(6)}w #{date_str}"
    end

    def display_full_story(story_data)
      metadata = story_data[:metadata]
      title = metadata["title"]

      puts pastel.cyan("\n📖 #{title}")
      puts "=" * 60
      puts pastel.dim("Template: #{metadata["template"]}")
      puts pastel.dim("Created: #{Date.parse(metadata["created_at"]).strftime("%Y-%m-%d %H:%M")}")
      puts pastel.dim("Chapters: #{metadata["chapters"]}")
      puts pastel.dim("Words: #{metadata["word_count"]}")
      puts "=" * 60

      story_data[:chapters].each_with_index do |chapter, index|
        puts "\n" + pastel.bold("Chapter #{index + 1}: #{chapter[:title]}")
        puts "-" * 40
        puts chapter[:content]
        puts
      end
    end

    def display_story_info(story_data)
      metadata = story_data[:metadata]

      puts pastel.cyan("\n📚 Story Information: #{metadata["title"]}")
      puts "=" * 50
      puts pastel.bold("Title:") + " #{metadata["title"]}"
      puts pastel.bold("Template:") + " #{metadata["template"]}"
      puts pastel.bold("Created:") + " #{Date.parse(metadata["created_at"]).strftime("%Y-%m-%d %H:%M:%S")}"
      puts pastel.bold("Chapters:") + " #{metadata["chapters"]}"
      puts pastel.bold("Word Count:") + " #{metadata["word_count"]}"

      if metadata["characters"] && !metadata["characters"].empty?
        puts pastel.bold("Characters:") + " #{metadata["characters"].join(", ")}"
      end

      if metadata["genres"] && !metadata["genres"].empty?
        puts pastel.bold("Genres:") + " #{metadata["genres"].join(", ")}"
      end

      if metadata["tags"] && !metadata["tags"].empty?
        puts pastel.bold("Tags:") + " #{metadata["tags"].join(", ")}"
      end

      puts "=" * 50
    end

    def get_template_options(template_name)
      template = StoryTemplates.get_template(template_name)
      return {} unless template&.respond_to?(:get_user_options)

      options = {}
      template_options = template.get_user_options

      template_options.each do |key, config|
        case config[:type]
        when :string
          options[key] = @prompt.ask(config[:prompt]) do |q|
            q.required config[:required] || false
            q.default config[:default] if config[:default]
          end
        when :select
          options[key] = @prompt.select(config[:prompt], config[:choices])
        when :multi_select
          options[key] = @prompt.multi_select(config[:prompt], config[:choices])
        when :confirm
          options[key] = @prompt.yes?(config[:prompt])
        end
      end

      options
    end
  end
end