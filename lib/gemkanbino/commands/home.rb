# frozen_string_literal: true

require "pastel"

module Gemkanbino
  module Commands
    # Home command module with welcome message functionality
    class Home
      attr_reader :pastel

      def initialize
        @pastel = Pastel.new
      end

      def display_welcome_message
        begin
          welcome_message = "Bem Vindo"
          terminal_width = detect_terminal_width

          if terminal_width && terminal_width > welcome_message.length
            centered_text = center_text(welcome_message, terminal_width)
            puts pastel.green.bold(centered_text)
          else
            puts pastel.green.bold(welcome_message)
          end

          { success: true, message: "Welcome message displayed successfully" }
        rescue Exceptions::HomeError => e
          puts pastel.red.bold(welcome_message)
          { success: false, error: e.message, details: e.details }
        rescue StandardError => e
          puts pastel.red.bold(welcome_message)
          { success: false, error: e.message, details: "Displayed fallback message" }
        end
      end

      private

      def detect_terminal_width
        begin
          # Try to get terminal width from IO console
          if IO.respond_to?(:console) && IO.console
            return IO.console.winsize[1]
          end

          # Fallback to environment variables
          if ENV['COLUMNS']
            return ENV['COLUMNS'].to_i
          end

          # Try using tput command
          require 'open3'
          stdout, _stderr, _status = Open3.capture3('tput cols')
          unless stdout.strip.empty?
            return stdout.strip.to_i
          end

          # Default fallback width
          80
        rescue StandardError
          80
        end
      end

      def center_text(text, width = nil)
        width ||= detect_terminal_width
        return text if width.nil? || width <= text.length

        padding = (width - text.length) / 2
        ' ' * padding + text
      end
    end
  end
end