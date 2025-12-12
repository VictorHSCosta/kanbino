# frozen_string_literal: true

require 'pastel'

require_relative 'utils/terminal_helper'

module Gemkanbino
  # Utilitário para exibir página de boas-vindas
  # Responsável por renderizar a interface inicial de forma centralizada e responsiva
  class WelcomeDisplay
    def initialize
      @pastel = Pastel.new
    end

    # Exibe a página de boas-vindas completa
    def show
      clear_screen
      display_welcome_content
      display_help_hint
    end

    # Exibe apenas o conteúdo central "Bem Vindo"
    def show_welcome_only
      clear_screen
      welcome_content
    end

    private

    # Limpa a tela
    def clear_screen
      Gemkanbino::Utils::TerminalHelper.clear_screen
    end

    # Exibe o conteúdo principal de boas-vindas
    def display_welcome_content
      welcome_content.each { |line| puts line }
    end

    # Gera o conteúdo da página de boas-vindas
    # @return [Array<String>] Linhas formatadas
    def welcome_content
      terminal_size = Gemkanbino::Utils::TerminalHelper.terminal_size
      width = [terminal_size[:width] - 10, 60].max # Garante largura mínima

      # Cria o conteúdo da caixa de boas-vindas
      box_content = build_box_content(width)

      # Cria a borda e centraliza
      bordered_lines = Gemkanbino::Utils::TerminalHelper.create_border(
        box_content,
        width,
        style: :double
      )

      # Adiciona espaçamento vertical
      top_spacing = calculate_vertical_spacing(bordered_lines.size)
      bottom_spacing = top_spacing + 2

      result = []
      result += Array.new(top_spacing) { '' }
      result += Gemkanbino::Utils::TerminalHelper.center_lines(bordered_lines, terminal_size[:width])
      result += Array.new(bottom_spacing) { '' }

      result
    end

    # Constrói o conteúdo da caixa de boas-vindas
    # @param width [Integer] Largura da caixa
    # @return [String] Conteúdo formatado
    def build_box_content(width)
      title = build_title
      subtitle = build_subtitle(width)

      [
        title,
        '',
        subtitle,
        '',
        build_separator(width - 10),
        '',
        build_commands_list(width - 10)
      ].join("\n")
    end

    # Constrói o título principal
    # @return [String] Título formatado com cores
    def build_title
      @pastel.bold.cyan('Bem Vindo')
    end

    # Constrói o subtítulo
    # @param width [Integer] Largura máxima
    # @return [String] Subtítulo formatado
    def build_subtitle(width)
      subtitle_text = 'Sua ferramenta CLI para gerenciamento de arquivos e uploads'
      @pastel.white.dim(Gemkanbino::Utils::TerminalHelper.truncate(subtitle_text, width))
    end

    # Constrói uma linha separadora
    # @param width [Integer] Largura da separadora
    # @return [String] Separador formatado
    def build_separator(width)
      @pastel.dim(Gemkanbino::Utils::TerminalHelper.separator(width, char: '·'))
    end

    # Constrói a lista de comandos principais
    # @param width [Integer] Largura máxima
    # @return [String] Lista de comandos formatada
    def build_commands_list(width)
      commands = [
        ['home', 'Mostra esta página'],
        ['interactive', 'Inicia modo interativo'],
        ['help', 'Mostra todos os comandos'],
        ['version', 'Mostra versão'],
        ['ls', 'Lista arquivos'],
        ['upload', 'Faz upload de arquivos']
      ]

      header = @pastel.yellow.bold('Comandos Principais:')

      command_lines = commands.map do |cmd, desc|
        formatted_cmd = @pastel.cyan("• #{cmd}")
        formatted_desc = @pastel.dim(desc)
        "  #{formatted_cmd.ljust(15)} #{formatted_desc}"
      end

      result = [header, ''] + command_lines
      result.join("\n")
    end

    # Calcula espaçamento vertical para centralizar o conteúdo
    # @param content_height [Integer] Altura do conteúdo
    # @return [Integer] Número de linhas de espaçamento superior
    def calculate_vertical_spacing(content_height)
      terminal_height = Gemkanbino::Utils::TerminalHelper.terminal_size[:height]

      # Deixa pelo menos 3 linhas na parte inferior para a dica de ajuda
      available_height = terminal_height - content_height - 5

      # Se não houver espaço suficiente, usa espaçamento mínimo
      available_height < 0 ? 0 : available_height / 2
    end

    # Exibe dica de ajuda na parte inferior
    def display_help_hint
      hint_text = 'Digite "help" para ver todos os comandos disponíveis ou "interactive" para o modo shell'
      centered_hint = Gemkanbino::Utils::TerminalHelper.center_text(
        @pastel.dim(hint_text)
      )

      puts
      puts centered_hint
      puts
    end
  end
end