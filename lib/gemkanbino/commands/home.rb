# frozen_string_literal: true

module Gemkanbino
  module Commands
    # Home page command with centered welcome message
    class Home
      def initialize(pastel: nil)
        @pastel = pastel || Pastel.new
      end

      def show
        welcome_message = "bem vindo"
        centered_output(welcome_message)
      end

      private

      def centered_output(message)
        terminal_width = get_terminal_width
        padding = (terminal_width - message.length) / 2

        puts
        puts " " * padding + @pastel.bold.cyan(message)
        puts
      end

      def get_terminal_width
        # Try to get terminal width, fallback to 80 if fails
        width = `tput cols`.to_i
        width > 0 ? width : 80
      end
    end
  end
end