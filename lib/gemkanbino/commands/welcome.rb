# frozen_string_literal: true

require "io/console"

module Gemkanbino
  module Commands
    # Welcome command with centered text display
    class Welcome
      attr_reader :pastel

      def initialize
        @pastel = Pastel.new
      end

      def show_welcome
        clear_screen
        display_welcome_message
      end

      private

      def clear_screen
        print "\e[H\e[2J"
      end

      def terminal_width
        IO.console.winsize[1]
      rescue
        80  # fallback width
      end

      def terminal_height
        IO.console.winsize[0]
      rescue
        24  # fallback height
      end

      def center_text(text, width = nil)
        width ||= terminal_width
        text.ljust((width + text.length) / 2).rjust(width)
      end

      def display_welcome_message
        width = terminal_width
        height = terminal_height

        # Create welcome message with styling
        welcome_lines = [
          "",
          "",
          pastel.bold.cyan(center_text("╔══════════════════════════════════════════════════════════════╗", width)),
          pastel.bold.cyan(center_text("║                                                              ║", width)),
          pastel.bold.cyan(center_text("║" + center_text("                  BEM-VINDO", width - 4) + "║", width)),
          pastel.bold.cyan(center_text("║                                                              ║", width)),
          pastel.bold.cyan(center_text("║" + center_text("                  ao Kanbino", width - 4) + "║", width)),
          pastel.bold.cyan(center_text("║                                                              ║", width)),
          pastel.bold.cyan(center_text("║" + center_text("        Seu gerenciador de arquivos em CLI", width - 4) + "║", width)),
          pastel.bold.cyan(center_text("║                                                              ║", width)),
          pastel.bold.cyan(center_text("╚══════════════════════════════════════════════════════════════╝", width)),
          "",
          pastel.white.center(width),
          pastel.dim(center_text("Digite 'gemkanbino --help' para ver todos os comandos disponíveis", width)),
          pastel.dim(center_text("ou 'gemkanbino interactive' para o modo interativo", width)),
          "",
          ""
        ]

        # Calculate vertical centering
        total_content_lines = welcome_lines.length
        vertical_padding = (height - total_content_lines) / 2

        # Add vertical padding
        vertical_padding.times { puts }

        # Display the welcome message
        welcome_lines.each { |line| puts line }
      end
    end
  end
end