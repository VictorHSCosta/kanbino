# frozen_string_literal: true

require "thor"
require "pastel"
require "tty/prompt"
require_relative "story_generator"
require_relative "markdown_generator"

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

    desc "story", "Create a fictional story about the 5-year war between two brothers over the largest planets"
    option :title, aliases: "-t", desc: "Custom title for the story"
    option :genre, aliases: "-g", desc: "Story genre (sci_fi, fantasy, drama)"
    option :length, aliases: "-l", desc: "Story length (short, medium, long)"
    option :interactive, aliases: "-i", type: :boolean, desc: "Interactive mode with customization options"
    option :save, aliases: "-s", type: :boolean, desc: "Save story to local storage"
    option :variation, desc: "Content variation level (low, medium, high)"
    def story
      generator = StoryGenerator.new(
        title: options[:title],
        genre: options[:genre] || "sci_fi",
        length: (options[:length] || "medium").to_sym,
        interactive: options[:interactive] || false,
        variation: options[:variation] || "medium"
      )

      story_data = if options[:interactive]
                     generate_interactive_story(generator)
                   else
                     generator.generate_war_story
                   end

      markdown_gen = MarkdownGenerator.new
      markdown_content = markdown_gen.generate(story_data)

      if options[:save]
        save_story_to_storage(story_data[:title], markdown_content)
      else
        puts pastel.green.bold("\n#{story_data[:title]}")
        puts pastel.cyan("=" * story_data[:title].length)
        puts markdown_content
      end
    end

    desc "stories", "Manage saved stories (list, show, delete)"
    option :action, aliases: "-a", desc: "Action to perform (list, show, delete)"
    option :title, aliases: "-t", desc: "Story title for show/delete actions"
    def stories
      case options[:action]
      when "list"
        list_stories
      when "show"
        show_story(options[:title])
      when "delete"
        delete_story(options[:title])
      else
        puts pastel.red("Error: Please specify an action with --action [list|show|delete]")
        puts pastel.yellow("Examples:")
        puts "  gemkanbino stories --action list"
        puts "  gemkanbino stories --action show --title 'Story Title'"
        puts "  gemkanbino stories --action delete --title 'Story Title'"
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

    private

    def generate_interactive_story(generator)
      custom_params = {}

      puts pastel.blue.bold("📚 Modo Interativo de Criação de História")
      puts pastel.cyan("Personalize sua história sobre a guerra dos 5 anos entre dois irmãos:\n")

      # Coletar nomes dos personagens
      custom_params[:brother1_name] = prompt.ask("Nome do irmão mais velho:") do |q|
        q.default "Kael"
      end

      custom_params[:brother2_name] = prompt.ask("Nome do irmão mais novo:") do |q|
        q.default "Zephyr"
      end

      # Coletar nomes dos planetas
      custom_params[:planet1_name] = prompt.ask("Nome do primeiro planeta:") do |q|
        q.default "Megatron Prime"
      end

      custom_params[:planet2_name] = prompt.ask("Nome do segundo planeta:") do |q|
        q.default "Omega Supremus"
      end

      # Coletar nome da galáxia
      custom_params[:galaxy_name] = prompt.ask("Nome da galáxia:") do |q|
        q.default "Andromeda Central"
      end

      generator.instance_variable_set(:@custom_params, custom_params)
      generator.generate_war_story
    end

    def save_story_to_storage(title, content)
      require_relative "local_storage"

      storage = LocalStorage.new
      filename = "#{title.downcase.gsub(/[^a-z0-9\s]/, '').gsub(/\s+/, '_')}.md"

      begin
        storage.save_generated_story(title, filename, content)
        puts pastel.green("✓ História '#{title}' salva com sucesso!")
        puts pastel.cyan("📍 Arquivo: #{filename}")
      rescue => e
        puts pastel.red("✗ Erro ao salvar história: #{e.message}")
      end
    end

    def list_stories
      require_relative "local_storage"

      storage = LocalStorage.new
      stories = storage.list_stories

      if stories.empty?
        puts pastel.yellow("Nenhuma história salva encontrada.")
      else
        puts pastel.green.bold("📚 Histórias Salvas:")
        puts pastel.cyan("-" * 30)
        stories.each_with_index do |story, index|
          puts "#{index + 1}. #{pastel.white(story[:title])}"
          puts "   📅 #{pastel.dim(story[:created_at])}"
          puts "   📊 #{pastel.dim("#{story[:word_count]} palavras")}"
          puts
        end
      end
    end

    def show_story(title)
      require_relative "local_storage"

      unless title
        puts pastel.red("Erro: Por favor, especifique o título da história com --title")
        return
      end

      storage = LocalStorage.new
      begin
        content = storage.get_story_content(title)
        if content
          puts pastel.green.bold("#{title}")
          puts pastel.cyan("=" * title.length)
          puts content
        else
          puts pastel.red("História '#{title}' não encontrada.")
        end
      rescue => e
        puts pastel.red("Erro ao carregar história: #{e.message}")
      end
    end

    def delete_story(title)
      require_relative "local_storage"

      unless title
        puts pastel.red("Erro: Por favor, especifique o título da história com --title")
        return
      end

      confirm = prompt.yes?("Tem certeza que deseja excluir a história '#{title}'?")
      if confirm
        storage = LocalStorage.new
        begin
          if storage.delete_story(title)
            puts pastel.green("✓ História '#{title}' excluída com sucesso!")
          else
            puts pastel.red("História '#{title}' não encontrada.")
          end
        rescue => e
          puts pastel.red("Erro ao excluir história: #{e.message}")
        end
      else
        puts pastel.yellow("Operação cancelada.")
      end
    end
  end
end