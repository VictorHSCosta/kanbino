# frozen_string_literal: true

require 'io/console'

module Gemkanbino
  module Utils
    # Utilitários para manipulação de terminal e formatação de texto
    class TerminalHelper
      # Obtém o tamanho do terminal
      # @return [Hash] Hash com :width e :height
      def self.terminal_size
        begin
          size = IO.console.winsize
          { width: size[1], height: size[0] }
        rescue StandardError
          # Fallback para tamanhos padrão
          { width: 80, height: 24 }
        end
      end

      # Centraliza texto horizontalmente
      # @param text [String] Texto a ser centralizado
      # @param width [Integer] Largura total (usa largura do terminal se não informado)
      # @return [String] Texto centralizado com espaços
      def self.center_text(text, width = nil)
        width ||= terminal_size[:width]
        text_length = strip_ansi(text).length
        padding = [(width - text_length) / 2, 0].max
        ' ' * padding + text
      end

      # Centraliza múltiplas linhas de texto
      # @param lines [Array<String>] Array de linhas de texto
      # @param width [Integer] Largura total (usa largura do terminal se não informado)
      # @return [Array<String>] Array de linhas centralizadas
      def self.center_lines(lines, width = nil)
        width ||= terminal_size[:width]
        lines.map { |line| center_text(line, width) }
      end

      # Cria uma borda ASCII ao redor do texto
      # @param content [String] Conteúdo a ser enquadrado
      # @param width [Integer] Largura da borda (calculada automaticamente se nil)
      # @param style [Symbol] Estilo da borda (:single, :double, :rounded)
      # @return [Array<String>] Linhas com a borda
      def self.create_border(content, width = nil, style: :single)
        lines = content.split("\n")
        max_line_length = lines.map { |line| strip_ansi(line).length }.max
        border_width = width || [max_line_length + 4, 40].max

        border_chars = case style
                       when :double
                         { top_left: '╔', top_right: '╗', bottom_left: '╚', bottom_right: '╝',
                           horizontal: '═', vertical: '║' }
                       when :rounded
                         { top_left: '╭', top_right: '╮', bottom_left: '╰', bottom_right: '╯',
                           horizontal: '─', vertical: '│' }
                       else # :single
                         { top_left: '┌', top_right: '┐', bottom_left: '└', bottom_right: '┘',
                           horizontal: '─', vertical: '│' }
                       end

        # Linha superior
        top_border = border_chars[:top_left] + border_chars[:horizontal] * (border_width - 2) + border_chars[:top_right]

        # Linhas de conteúdo centralizadas
        content_lines = lines.map do |line|
          padding = border_width - strip_ansi(line).length - 2
          left_padding = padding / 2
          right_padding = padding - left_padding
          border_chars[:vertical] + ' ' * left_padding + line + ' ' * right_padding + border_chars[:vertical]
        end

        # Linha inferior
        bottom_border = border_chars[:bottom_left] + border_chars[:horizontal] * (border_width - 2) + border_chars[:bottom_right]

        [top_border] + content_lines + [bottom_border]
      end

      # Cria uma linha separadora
      # @param width [Integer] Largura da linha (usa largura do terminal se não informado)
      # @param char [String] Caractere a ser usado
      # @return [String] Linha separadora
      def self.separator(width = nil, char: '─')
        width ||= terminal_size[:width]
        char * width
      end

      # Remove códigos ANSI de uma string
      # @param text [String] Texto com códigos ANSI
      # @return [String] Texto sem códigos ANSI
      def self.strip_ansi(text)
        text.gsub(/\e\[[0-9;]*[mGKH]/, '')
      end

      # Verifica se o terminal suporta cores
      # @return [Boolean] True se suportar cores
      def self.color_supported?
        ENV['NO_COLOR'].nil? && (
          ENV['COLORTERM'] ||
          ENV['TERM'] =~ /color|256|truecolor/ ||
          (IO.respond_to?(:console) && IO.console.isatty)
        )
      end

      # Limpa a tela
      def self.clear_screen
        print "\e[H\e[2J"
      end

      # Move o cursor para uma posição específica
      # @param row [Integer] Linha (1-based)
      # @param col [Integer] Coluna (1-based)
      def self.move_cursor(row, col)
        print "\e[#{row};#{col}H"
      end

      # Esconde o cursor
      def self.hide_cursor
        print "\e[?25l"
      end

      # Mostra o cursor
      def self.show_cursor
        print "\e[?25h"
      end

      # Aguarda uma tecla ser pressionada
      # @return [String] Tecla pressionada
      def self.get_key
        begin
          require 'io/console'
          $stdin.getch
        rescue StandardError
          $stdin.gets
        end
      end

      # Trunca texto para caber na largura especificada
      # @param text [String] Texto a ser truncado
      # @param max_width [Integer] Largura máxima
      # @param suffix [String] Sufixo a ser adicionado se truncado
      # @return [String] Texto truncado
      def self.truncate(text, max_width, suffix: '...')
        return text if strip_ansi(text).length <= max_width

        text_length = strip_ansi(text).length
        suffix_length = suffix.length
        truncate_length = max_width - suffix_length

        # Preserva ANSI codes truncando apenas o conteúdo visível
        visible_text = text.gsub(/\e\[[0-9;]*[mGKH]/, '')
        visible_text[0...truncate_length] + suffix
      end

      # Divide texto longo em várias linhas
      # @param text [String] Texto a ser dividido
      # @param max_width [Integer] Largura máxima por linha
      # @return [Array<String>] Linhas divididas
      def self.word_wrap(text, max_width = 80)
        return [text] if strip_ansi(text).length <= max_width

        words = text.split
        lines = []
        current_line = ''

        words.each do |word|
          if strip_ansi(current_line + ' ' + word).length <= max_width
            current_line += ' ' if !current_line.empty?
            current_line += word
          else
            lines << current_line unless current_line.empty?
            current_line = word
          end
        end

        lines << current_line unless current_line.empty?
        lines
      end
    end
  end
end