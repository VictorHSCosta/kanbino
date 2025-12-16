# frozen_string_literal: true

module Gemkanbino
  # Welcome class for displaying the home page
  class Welcome
    attr_reader :pastel

    def initialize(pastel)
      @pastel = pastel
    end

    def show
      clear_screen
      display_welcome_message
    end

    private

    def clear_screen
      system("clear") || system("cls")
    end

    def display_welcome_message
      terminal_width = get_terminal_width
      message = "Bem vindo"
      subtitle = "Kanbino - Sua ferramenta de gerenciamento de arquivos"

      # Calculate padding for centering
      message_padding = (terminal_width - message.length) / 2
      subtitle_padding = (terminal_width - subtitle.length) / 2

      # Add empty lines for vertical centering (approximate)
      puts "\n" * 3

      # Display centered message with color
      puts " " * message_padding + @pastel.green.bold(message)
      puts " " * subtitle_padding + @pastel.cyan(subtitle)

      puts "\n" * 2
      puts " " * ((terminal_width - 40) / 2) + @pastel.dim("Use 'gemkanbino --help' para ver todos os comandos")
    end

    def get_terminal_width
      # Try to get terminal width, fallback to 80 if not available
      `tput cols 2>/dev/null`.chomp.to_i.tap do |width|
        return width if width > 0
      rescue StandardError
        80
      end
    end
  end
end