# frozen_string_literal: true

require "thor"
require "pastel"
require "tty/prompt"

module Gemkanbino
  # Main CLI class using Thor framework
  #
  # Provides the command-line interface for all Gemkanbino operations including
  # file navigation, management, local storage, and cloud uploads. Built with
  # Thor for robust CLI functionality with help generation and option parsing.
  #
  # @example Using the CLI
  #   # In command line
  #   gemkanbino ls --long
  #   gemkanbino select file.txt
  #   gemkanbino upload --provider fileio
  #
  #   # Programmatically
  #   CLI.start(%w[ls --long])
  #   CLI.start(%w[select file.txt])
  #
  # @author VictorHSCosta <victorhenriquecosta23@gmail.com>
  # @version 0.1.0
  # @since 0.1.0
  class CLI < Thor
    attr_reader :pastel, :prompt

    # Initialize a new CLI instance
    #
    # Sets up the terminal interface components for colored output and
    # interactive prompts. Handles Thor framework initialization.
    #
    # @param args [Array<String>] Command line arguments
    # @param options [Hash] Command line options
    # @param config [Hash] Thor configuration options
    #
    # @example
    #   cli = CLI.new
    #   cli.pwd
    def initialize(args = [], options = {}, config = {})
      super
      @pastel = Pastel.new
      @prompt = TTY::Prompt.new
    end

    desc "version", "Display gemkanbino version"
    def version
      puts pastel.green("Gemkanbino version #{VERSION}")
    end

    desc "pwd", "Show current working directory"
    # Display the current working directory in colored output
    #
    # @example Show current directory
    #   gemkanbino pwd
    #   # => /home/user/projects
    def pwd
      puts pastel.blue(Dir.pwd)
    end

    desc "ls [PATH]", "List files and directories in PATH (default: current directory)"
    option :all, aliases: "-a", type: :boolean, desc: "Show hidden files"
    option :long, aliases: "-l", type: :boolean, desc: "Use long listing format"
    # List files and directories with optional formatting
    #
    # Provides familiar ls functionality with options for hidden files and detailed output.
    # Automatically colorizes output and provides file type indicators.
    #
    # @param path [String] Directory path to list (default: current directory)
    # @option options [Boolean] :all Show hidden files (starting with .)
    # @option options [Boolean] :long Use detailed long format with permissions, size, etc.
    #
    # @example List current directory
    #   gemkanbino ls
    #
    # @example List with hidden files and long format
    #   gemkanbino ls --all --long
    #   gemkanbino ls -al
    #
    # @example List specific directory
    #   gemkanbino ls /path/to/directory
    def ls(path = ".")
      navigator = FileNavigator.new
      navigator.list_files(path, options)
    end

    desc "cd PATH", "Change current directory to PATH"
    # Change the current working directory
    #
    # Changes the shell's current directory and provides confirmation.
    # Handles relative and absolute paths with proper error checking.
    #
    # @param path [String] Target directory path
    #
    # @example Change to parent directory
    #   gemkanbino cd ..
    #
    # @example Change to absolute path
    #   gemkanbino cd /home/user/documents
    #
    # @example Change to relative directory
    #   gemkanbino cd subdirectory
    def cd(path)
      navigator = FileNavigator.new
      navigator.change_directory(path)
    end

    desc "select FILE", "Select a file for operations"
    # Select a file for subsequent operations
    #
    # Selects a file that will be used by default for other commands
    # like info, copy, and upload. Validates file existence and readability.
    #
    # @param file_path [String] Path to the file to select
    #
    # @example Select a file
    #   gemkanbino select document.pdf
    #   # ✓ Selected: document.pdf
    #
    # @example Select file with path
    #   gemkanbino select /path/to/file.txt
    def select(file_path)
      manager = FileManager.new
      manager.select_file(file_path)
    end

    desc "info [FILE]", "Show detailed information about selected file or specific FILE"
    # Display detailed file information
    #
    # Shows comprehensive file metadata including size, permissions, modification dates,
    # file type, and checksum for smaller files. Works with selected file or specific file.
    #
    # @param file_path [String, nil] File path to analyze. If nil, shows info for selected file.
    #
    # @example Show info for selected file
    #   gemkanbino select document.txt
    #   gemkanbino info
    #
    # @example Show info for specific file
    #   gemkanbino info /path/to/file.txt
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
    # Copy file to organized local storage
    #
    # Copies files to Gemkanbino's local storage system with metadata tracking.
    # Creates organized directories and maintains an index of stored files.
    #
    # @param file_path [String, nil] File to copy. If nil, copies selected file.
    # @option options [String] :target Custom target directory name in storage
    #
    # @example Copy selected file
    #   gemkanbino select document.pdf
    #   gemkanbino copy
    #
    # @example Copy specific file with custom target
    #   gemkanbino copy /path/to/file.txt --target my-backup
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
    # Upload file to cloud storage provider
    #
    # Uploads files to various cloud providers with progress tracking and
    # URL generation. Supports multiple providers with different characteristics.
    #
    # @param file_path [String, nil] File to upload. If nil, uploads selected file.
    # @option options [String] :provider Upload provider name (fileio, transfersh)
    #
    # @example Upload selected file to default provider
    #   gemkanbino select image.png
    #   gemkanbino upload
    #
    # @example Upload specific file to file.io
    #   gemkanbino upload /path/to/file.txt --provider fileio
    #
    # @example Upload to transfer.sh
    #   gemkanbino upload document.pdf -p transfersh
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

    map "--version" => :version
    map "-v" => :version
    map "--help" => :help
    map "-h" => :help
  end
end