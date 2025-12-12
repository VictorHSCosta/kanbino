# frozen_string_literal: true

require "thor"
require "pastel"
require "tty/prompt"

module Gemkanbino
  # Main CLI class using Thor framework
  class CLI < Thor
    attr_reader :pastel, :prompt

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

    desc "server", "Start web server"
    option :port, aliases: "-p", type: :numeric, desc: "Port number (default: 4567)"
    option :host, aliases: "-H", desc: "Host address (default: 0.0.0.0)"
    def server
      require_relative 'web/server'

      server_options = {}
      server_options[:port] = options[:port] if options[:port]
      server_options[:bind] = options[:host] if options[:host]

      begin
        Web::Server.start!(server_options)
      rescue Interrupt
        puts pastel.yellow("\n🛑 Servidor web encerrado")
      rescue => e
        puts pastel.red("❌ Erro ao iniciar servidor: #{e.message}")
        exit 1
      end
    end

    map "--version" => :version
    map "-v" => :version
    map "--help" => :help
    map "-h" => :help
  end
end