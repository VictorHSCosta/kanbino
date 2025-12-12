# frozen_string_literal: true

require "thor"
require "pastel"
require "tty/prompt"
require "json"

module Gemkanbino
  # Main CLI class using Thor framework
  class CLI < Thor
    attr_reader :pastel, :prompt

    def initialize(args = [], options = {}, config = {})
      super
      @pastel = Pastel.new
      @prompt = TTY::Prompt.new
    end

    # Define home as default task when no command is provided
    def self.default_task
      :home
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

    desc "home", "Display welcome page with centered message"
    def home
      welcome = WelcomeDisplay.new
      welcome.show
    end

    desc "config [KEY] [VALUE]", "Show or set configuration"
    def config(key = nil, value = nil)
      config_manager = ConfigManager.new
      if key.nil?
        all_config = config_manager.show_all_config
        if all_config.empty?
          puts pastel.dim("No configuration set.")
        else
          puts pastel.yellow("Current Configuration:")
          puts JSON.pretty_generate(all_config)
        end
      elsif value.nil?
        config_value = config_manager.get_config(key)
        if config_value.nil?
          puts pastel.red("Configuration key '#{key}' not found.")
        else
          puts pastel.green("#{key}: #{config_value}")
        end
      else
        config_manager.set_config(key, value)
        puts pastel.green("✓ Configuration updated: #{key} = #{value}")
      end
    end

    desc "interactive", "Start interactive shell mode"
    def interactive
      InteractiveShell.start
    end

    # Custom help method with better formatting
    def help(command = nil)
      if command
        super(command)
      else
        display_enhanced_help
      end
    end

    # Display enhanced help with better formatting and examples
    def display_enhanced_help
      puts pastel.bold.cyan("Kanbino - CLI File Management Tool")
      puts pastel.dim("Version: #{VERSION}")
      puts
      puts pastel.yellow.bold("Usage:")
      puts "  #{pastel.white('gemkanbino')} [#{pastel.cyan('command')}] [#{pastel.green('options')}]"
      puts "  #{pastel.white('gemkanbino')} #{pastel.cyan('home')}    # Show welcome page (default)"
      puts
      puts pastel.yellow.bold("Main Commands:")

      # Show main commands with descriptions
      main_commands = [
        ['home', 'Show welcome page (default command)'],
        ['interactive', 'Start interactive shell mode'],
        ['help', 'Show this help message'],
        ['version', 'Display version information']
      ]

      main_commands.each do |cmd, desc|
        puts "  #{pastel.cyan(cmd.ljust(15))} #{pastel.dim(desc)}"
      end

      puts
      puts pastel.yellow.bold("File Operations:")

      file_commands = [
        ['pwd', 'Show current working directory'],
        ['ls [PATH]', 'List files and directories'],
        ['cd PATH', 'Change directory'],
        ['select FILE', 'Select a file for operations'],
        ['info [FILE]', 'Show file information'],
        ['copy [FILE]', 'Copy file to local storage'],
        ['upload [FILE]', 'Upload file to cloud service'],
        ['list', 'List all stored files']
      ]

      file_commands.each do |cmd, desc|
        puts "  #{pastel.cyan(cmd.ljust(20))} #{pastel.dim(desc)}"
      end

      puts
      puts pastel.yellow.bold("Configuration:")

      config_commands = [
        ['config', 'Show all configuration'],
        ['config KEY', 'Show specific configuration value'],
        ['config KEY VALUE', 'Set configuration value']
      ]

      config_commands.each do |cmd, desc|
        puts "  #{pastel.cyan(cmd.ljust(25))} #{pastel.dim(desc)}"
      end

      puts
      puts pastel.yellow.bold("Examples:")
      puts "  #{pastel.white('gemkanbino')}                           # Show welcome page"
      puts "  #{pastel.white('gemkanbino')} #{pastel.cyan('ls')}                      # List current directory"
      puts "  #{pastel.white('gemkanbino')} #{pastel.cyan('select')} #{pastel.green('myfile.txt')}      # Select file"
      puts "  #{pastel.white('gemkanbino')} #{pastel.cyan('upload')}                   # Upload selected file"
      puts "  #{pastel.white('gemkanbino')} #{pastel.cyan('config')} #{pastel.green('upload.provider')} transfersh # Set upload provider"
      puts "  #{pastel.white('gemkanbino')} #{pastel.cyan('interactive')}             # Start interactive mode"
      puts
      puts pastel.dim("For more information about a specific command, use:")
      puts "  #{pastel.white('gemkanbino')} #{pastel.cyan('help')} [#{pastel.green('command')}]"
      puts
    end

    map "--version" => :version
    map "-v" => :version
    map "--help" => :help
    map "-h" => :help
    map "" => :home  # Empty argument shows home
  end
end