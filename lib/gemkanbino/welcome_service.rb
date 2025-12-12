# frozen_string_literal: true

require 'pastel'
require_relative 'ui/banner_renderer'
require_relative 'ui/terminal_helper'
require_relative 'version'

module Gemkanbino
  # Service for displaying welcome screen and initial user guidance
  class WelcomeService
    attr_reader :pastel, :banner_renderer, :terminal_helper

    def initialize(pastel = Pastel.new)
      @pastel = pastel
      @banner_renderer = UI::BannerRenderer.new(pastel)
      @terminal_helper = UI::TerminalHelper.new(pastel)
    end

    # Display welcome screen with different formats
    def display_welcome(format = :auto)
      clear_screen if should_clear_screen?

      case format
      when :compact
        display_compact_welcome
      when :detailed
        display_detailed_welcome
      when :minimal
        display_minimal_welcome
      else
        display_auto_welcome
      end

      display_system_info if format == :detailed
    end

    # Display quick tips and suggestions
    def display_quick_tips
      tips = generate_tips
      return if tips.empty?

      puts @terminal_helper.center_text(@banner_renderer.create_info_banner("Dicas Rápidas"))
      puts @terminal_helper.vertical_padding

      tips.each_with_index do |tip, index|
        tip_text = "#{index + 1}. #{tip}"
        puts @terminal_helper.center_text(@terminal_helper.bullet_point(tip_text))
      end

      puts @terminal_helper.vertical_padding
    end

    # Display getting started guide
    def display_getting_started
      return if terminal_too_small?

      puts @terminal_helper.center_text(@banner_renderer.create_info_banner("Primeiros Passos"))
      puts @terminal_helper.vertical_padding

      steps = generate_contextual_steps

      steps.each do |step|
        puts @terminal_helper.center_text(@terminal_helper.bullet_point(step))
      end

      puts @terminal_helper.vertical_padding

      # Add quick navigation suggestions
      display_quick_navigation if should_show_quick_navigation?
    end

    private

    def should_clear_screen?
      STDOUT.tty? && !ENV['NO_CLEAR'] && !terminal_too_small?
    end

    def clear_screen
      system('clear') || system('cls') if STDOUT.tty?
    end

    def terminal_too_small?
      @terminal_helper.terminal_too_small?(min_width: 40, min_height: 10)
    end

    def display_auto_welcome
      if terminal_too_small?
        display_compact_welcome
      else
        display_full_welcome
      end
    end

    def display_full_welcome
      puts @terminal_helper.center_text(@banner_renderer.create_welcome_banner(VERSION))
      puts @terminal_helper.vertical_padding(2)

      display_quick_tips if should_show_tips?
      display_getting_started if should_show_getting_started?

      display_navigation_help
    end

    def display_compact_welcome
      welcome_text = "Bem-vindo ao #{@pastel.bold.green('Gemkanbino')} v#{VERSION}!"
      puts @terminal_helper.center_text(welcome_text)
      puts @terminal_helper.center_text(@terminal_helper.dim("Ferramenta CLI para gerenciamento de arquivos"))
      puts @terminal_helper.vertical_padding

      help_text = "Use '#{@pastel.cyan('gemkanbino --help')}' para ver comandos disponíveis"
      puts @terminal_helper.center_text(help_text)
    end

    def display_detailed_welcome
      display_full_welcome
      display_environment_info
      display_configuration_info
    end

    def display_minimal_welcome
      puts @pastel.green("Gemkanbino v#{VERSION}")
    end

    def display_system_info
      return if terminal_too_small?

      puts @terminal_helper.separator
      puts @terminal_helper.header("Informações do Sistema:")

      info_lines = [
        "Ruby: #{RUBY_VERSION}",
        "Terminal: #{@terminal_helper.terminal_width}x#{@terminal_helper.terminal_height}",
        "Cores: #{@terminal_helper.supports_color? ? 'Sim' : 'Não'}",
        "TTS: #{STDOUT.tty? ? 'Sim' : 'Não'}"
      ]

      info_lines.each do |line|
        puts @terminal_helper.bullet_point(line)
      end

      puts @terminal_helper.vertical_padding
    end

    def display_environment_info
      puts @terminal_helper.center_text(@terminal_helper.subheader("Ambiente:"))

      env_info = [
        "Diretório atual: #{@terminal_helper.emphasize(Dir.pwd)}",
        "Usuário: #{ENV['USER'] || ENV['USERNAME'] || 'desconhecido'}"
      ]

      env_info.each do |info|
        puts @terminal_helper.center_text(info)
      end

      puts @terminal_helper.vertical_padding
    end

    def display_configuration_info
      config_file = File.join(Dir.home, '.gemkanbino', 'config.yml')
      config_status = File.exist?(config_file) ?
                     @pastel.green("Configurado") :
                     @pastel.yellow("Não configurado")

      puts @terminal_helper.center_text("Configuração: #{config_status}")
      puts @terminal_helper.vertical_padding
    end

    def display_navigation_help
      help_text = if terminal_too_small?
                   "Use --help para comandos"
                 else
                   "Navegue com: #{@terminal_helper.emphasize('ls')}, #{@terminal_helper.emphasize('cd')}, #{@terminal_helper.emphasize('select')}"
                 end

      puts @terminal_helper.center_text(@terminal_helper.dim(help_text))
      puts @terminal_helper.vertical_padding
    end

    def should_show_tips?
      !terminal_too_small? && rand < 0.3 # Show tips 30% of the time
    end

    def should_show_getting_started?
      first_run? && !terminal_too_small?
    end

    def first_run?
      config_dir = File.join(Dir.home, '.gemkanbino')
      !File.exist?(config_dir)
    end

    def generate_tips
      tips = [
        "Use as setas do teclado no modo interativo para navegação rápida",
        "Pressione Tab para autocompletar nomes de arquivos e diretórios",
        "Configure provedores de upload com 'gemkanbino config upload_provider fileio'",
        "Use 'gemkanbino upload --provider transfersh' para links temporários",
        "Armazene arquivos frequentes com 'gemkanbino copy'",
        "Liste arquivos armazenados com 'gemkanbino list'",
        "Use --all ou -a para mostrar arquivos ocultos no comando ls",
        "Use --long ou -l para formato de lista detalhada"
      ]

      # Add contextual tips based on environment
      tips.concat(generate_contextual_tips)

      # Return 2-4 random tips
      tips.sample(rand(2..4))
    end

    def generate_contextual_tips
      contextual_tips = []

      # Check if there are files in current directory
      if Dir.entries('.').length > 2  # More than . and ..
        contextual_tips << "Use 'gemkanbino ls' para ver os #{Dir.entries('.').length - 2} arquivos neste diretório"
      end

      # Check if .gemkanbino directory exists
      if File.exist?(File.join(Dir.home, '.gemkanbino'))
        contextual_tips << "Você já usou Gemkanbino antes - use 'gemkanbino list' para ver arquivos armazenados"
      end

      # Check for common file types
      common_files = %w[.txt .md .pdf .jpg .png .zip].select do |ext|
        Dir.glob("*#{ext}").any?
      end

      if common_files.any?
        file_types = common_files.map { |ext| ext[1..] }.join(', ')
        contextual_tips << "Detectei arquivos #{file_types} - use 'gemkanbino select arquivo.#{common_files.first[1..]}'"
      end

      contextual_tips
    end

    def generate_contextual_steps
      base_steps = [
        "Use 'gemkanbino ls' para ver arquivos no diretório atual",
        "Use 'gemkanbino select <arquivo>' para selecionar um arquivo",
        "Use 'gemkanbino upload' para enviar para a nuvem",
        "Use 'gemkanbino --help' para ver todos os comandos"
      ]

      # Add contextual steps based on environment
      if first_run?
        base_steps.unshift("🎉 Primeira vez usando Gemkanbino? Bem-vindo!")
      end

      if Dir.glob('*.txt *.md').any?
        base_steps.insert(-2, "📄 Detectei arquivos de texto - experimente 'gemkanbino select arquivo.txt'")
      end

      if Dir.glob('*.{jpg,jpeg,png,gif}').any?
        base_steps.insert(-2, "🖼️ Detectei imagens - experimente fazer upload com 'gemkanbino upload'")
      end

      base_steps
    end

    def display_quick_navigation
      return if terminal_too_small?

      puts @terminal_helper.center_text(@terminal_helper.subheader("Navegação Rápida:"))

      navigation_items = [
        ["📁", "ls", "Listar arquivos"],
        ["🔍", "pwd", "Diretório atual"],
        ["⚙️", "config", "Configurações"],
        ["💬", "interactive", "Modo interativo"]
      ]

      navigation_items.each do |emoji, command, description|
        line = if @terminal_helper.supports_color?
                 "#{emoji} #{@terminal_helper.emphasize(command.ljust(12))} #{description}"
               else
                 "#{emoji} #{command.ljust(12)} #{description}"
               end
        puts @terminal_helper.center_text(@terminal_helper.bullet_point(line, " "))
      end

      puts @terminal_helper.vertical_padding
    end

    def should_show_quick_navigation?
      !terminal_too_small? && first_run?
    end
  end
end