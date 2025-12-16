# frozen_string_literal: true

module Gemkanbino
  module Utils
    # Display utilities for terminal formatting and welcome screen
    class DisplayUtils
      attr_reader :pastel

      def initialize
        @pastel = Pastel.new
      end

      # Clear the terminal screen
      def clear_screen
        print "\e[2J\e[f"
      end

      # Get terminal width
      def terminal_width
        IO.console.winsize[1] rescue 80
      end

      # Center text horizontally in the terminal
      def center_text(text, padding_lines = 0)
        width = terminal_width
        lines = text.split("\n")

        centered_lines = []

        # Add padding lines at the top
        padding_lines.times { centered_lines << "" }

        lines.each do |line|
          # Remove ANSI color codes for length calculation
          plain_line = pastel.strip(line)
          padding = [(width - plain_line.length) / 2, 0].max
          centered_lines << " " * padding + line
        end

        # Add padding lines at the bottom
        padding_lines.times { centered_lines << "" }

        centered_lines.join("\n")
      end

      # Generate welcome message with colors
      def welcome_message
        [
          pastel.green.bold("BEM VINDO"),
          "",
          pastel.cyan("à Gemkanbino CLI"),
          "",
          pastel.dim("Sua ferramenta para gerenciar arquivos e pastas"),
          "",
          pastel.yellow("Digite 'gemkanbino help' para ver todos os comandos")
        ].join("\n")
      end

      # Display the welcome screen
      def show_welcome
        clear_screen
        centered = center_text(welcome_message, terminal_height_padding)
        puts centered
        puts
      end

      private

      # Calculate vertical padding based on terminal height
      def terminal_height_padding
        height = IO.console.winsize[0] rescue 24
        # Target to center the content vertically
        [height / 4, 2].max
      end
    end
  end
end