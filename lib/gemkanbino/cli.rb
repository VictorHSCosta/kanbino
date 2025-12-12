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

    desc "inicio", "Exibir página de início com mensagem de boas-vindas"
    def inicio
      display_welcome_message
    end

    desc "interactive", "Start interactive shell mode"
    def interactive
      shell = InteractiveShell.new
      shell.start
    end

    private

    def display_welcome_message
      terminal_width = get_terminal_width
      welcome_text = "Bem-vindo"
      decorative_line = "✨"

      # Calcular centralização
      padding = calculate_center_padding(welcome_text.length + 4, terminal_width) # +4 para os decorações
      line_padding = calculate_center_padding(decorative_line.length * 2, terminal_width)

      # Exibir mensagem centralizada
      puts
      puts " " * line_padding + pastel.cyan(decorative_line * 2)
      puts " " * padding + pastel.green.bold("➤ #{welcome_text} #{decorative_line}")
      puts " " * line_padding + pastel.cyan(decorative_line * 2)
      puts
      puts " " * calculate_center_padding(40, terminal_width) + pastel.dim("Use 'gemkanbino help' para ver todos os comandos")
      puts
    end

    def get_terminal_width
      IO.console.winsize[1] rescue 80
    end

    def calculate_center_padding(text_length, terminal_width)
      [(terminal_width - text_length) / 2, 0].max
    end

    map "--version" => :version
    map "-v" => :version
    map "--help" => :help
    map "-h" => :help
    map "welcome" => :inicio
    map "home" => :inicio
    map "start" => :inicio
    map "bemvindo" => :inicio
  end
end