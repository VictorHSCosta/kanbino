# frozen_string_literal: true

require "thor"
require "pastel"
require "tty/prompt"

# Load story functionality
require_relative "story_manager"
require_relative "story_templates"
require_relative "story_storage"
require_relative "story_exporter"
require_relative "formatters/story_formatter"
require_relative "config/story_config"

module Gemkanbino
  # Main CLI class using Thor framework
  class CLI < Thor
    attr_reader :pastel, :prompt

    def initialize(args = [], options = {}, config = {})
      super
      @pastel = Pastel.new
      @prompt = TTY::Prompt.new

      # Initialize story templates
      StoryTemplates.load_builtin_templates
    end

    desc "version", "Display gemkanbino version"
    def version
      puts pastel.green("Gemkanbino version #{VERSION}")
    end

    desc "pwd", "Show current working directory"
    def pwd
      puts pastel.blue(Dir.pwd)
    end

    desc "ls [PATH]", "List files and directories in PATH (default: current directory)"
    option :all, aliases: "-a", type: :boolean, desc: "Show hidden files"
    option :long, aliases: "-l", type: :boolean, desc: "Use long listing format"
    def ls(path = ".")
      navigator = FileNavigator.new
      navigator.list_files(path, options)
    end

    desc "cd PATH", "Change current directory to PATH"
    def cd(path)
      navigator = FileNavigator.new
      navigator.change_directory(path)
    end

    desc "select FILE", "Select a file for operations"
    def select(file_path)
      manager = FileManager.new
      manager.select_file(file_path)
    end

    desc "info [FILE]", "Show detailed information about selected file or specific FILE"
    def info(file_path = nil)
      manager = FileManager.new
      if file_path
        manager.show_file_info(file_path)
      else
        manager.show_selected_file_info
      end
    end

    desc "copy [FILE]", "Copy selected file or specific FILE to local storage"
    option :target, aliases: "-t", desc: "Target directory name"
    def copy(file_path = nil)
      storage = LocalStorage.new
      if file_path
        storage.copy_file(file_path, options[:target])
      else
        storage.copy_selected_file(options[:target])
      end
    end

    desc "upload [FILE]", "Upload selected file or specific FILE to cloud"
    option :provider, aliases: "-p", desc: "Upload provider (fileio, transfersh)"
    def upload(file_path = nil)
      uploader = Uploader.new
      if file_path
        uploader.upload_file(file_path, options[:provider])
      else
        uploader.upload_selected_file(options[:provider])
      end
    end

    desc "list", "List all stored files"
    def list
      storage = LocalStorage.new
      storage.list_stored_files
    end

    desc "config [KEY] [VALUE]", "Show or set configuration"
    def config(key = nil, value = nil)
      config_manager = ConfigManager.new
      if key.nil?
        config_manager.show_all_config
      elsif value.nil?
        config_manager.show_config(key)
      else
        config_manager.set_config(key, value)
      end
    end

    desc "interactive", "Start interactive shell mode"
    def interactive
      shell = InteractiveShell.new
      shell.start
    end

    # Story commands
    desc "create_story TITLE", "Create a new story"
    option :template, aliases: "-t", desc: "Story template to use"
    option :interactive, aliases: "-i", type: :boolean, default: false, desc: "Interactive story creation"
    def create_story(title = nil)
      if options[:interactive] || title.nil?
        story_manager = StoryManager.new
        story_manager.interactive_story_creation
      else
        story_manager = StoryManager.new
        template_name = options[:template] || "guerra_irmaos_planetas"
        story_manager.create_story(title, template_name)
      end
    rescue Exceptions::StoryError => e
      puts pastel.red("Error: #{e.message}")
    end

    desc "list_stories [FILTER]", "List all stored stories"
    option :format, aliases: "-f", desc: "List format (compact, detailed, full)"
    def list_stories(filter = nil)
      story_manager = StoryManager.new

      if options[:format]
        formatter = Formatters::StoryFormatter.new
        stories = story_manager.storage.list_stories(filter)
        puts formatter.format_story_list(stories, options[:format])
      else
        story_manager.list_stories(filter)
      end
    end

    desc "show_story TITLE", "Display a story"
    option :preview, aliases: "-p", type: :boolean, default: false, desc: "Show preview only"
    option :lines, aliases: "-l", type: :numeric, default: 20, desc: "Number of lines for preview"
    def show_story(title)
      story_manager = StoryManager.new

      if options[:preview]
        story_data = story_manager.storage.get_story(title)
        if story_data
          formatter = Formatters::StoryFormatter.new
          puts formatter.format_story_preview(story_data, options[:lines])
        else
          puts pastel.red("Story '#{title}' not found.")
        end
      else
        story_manager.show_story(title)
      end
    end

    desc "delete_story TITLE", "Delete a story"
    def delete_story(title)
      story_manager = StoryManager.new
      story_manager.delete_story(title)
    end

    desc "search_stories QUERY", "Search stories by content"
    def search_stories(query)
      story_manager = StoryManager.new
      story_manager.search_stories(query)
    end

    desc "story_info TITLE", "Show story information"
    def story_info(title)
      story_manager = StoryManager.new
      story_manager.get_story_info(title)
    end

    desc "export_story TITLE", "Export a story to different formats"
    option :format, aliases: "-f", default: "markdown", desc: "Export format (markdown, html, pdf, txt)"
    option :destination, aliases: "-d", desc: "Destination directory or file"
    def export_story(title)
      story_manager = StoryManager.new
      story_manager.export_story(title, options[:format], options[:destination])
    rescue Exceptions::StoryError => e
      puts pastel.red("Error: #{e.message}")
    end

    desc "list_templates", "List available story templates"
    def list_templates
      story_manager = StoryManager.new
      story_manager.list_templates
    end

    desc "story_stats", "Show story storage statistics"
    def story_stats
      storage = StoryStorage.new
      stats = storage.get_story_stats
      formatter = Formatters::StoryFormatter.new
      puts formatter.format_storage_stats(stats)
    end

    desc "cleanup_stories", "Clean up story storage"
    def cleanup_stories
      storage = StoryStorage.new
      storage.cleanup_storage
    end

    map "--version" => :version
    map "-v" => :version
    map "--help" => :help
    map "-h" => :help
  end
end