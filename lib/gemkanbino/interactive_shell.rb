# frozen_string_literal: true

require 'pastel'

module Gemkanbino
  class InteractiveShell
    def initialize
      @pastel = Pastel.new
    end

    def run
      puts @pastel.bold.green('=== Kanbino Interactive Shell ===')
      puts 'Type "help" for available commands or "exit" to quit.'

      loop do
        print 'kanbino> '
        input = gets.chomp.strip

        case input
        when 'exit', 'quit'
          puts @pastel.yellow('Goodbye!')
          break
        when 'help'
          show_help
        when ''
          next
        else
          handle_command(input)
        end
      end
    end

    private

    def show_help
      puts @pastel.bold('Available commands:')
      puts '  help     - Show this help message'
      puts '  exit     - Exit the interactive shell'
      puts '  upload   - Upload a file'
      puts '  storage  - Manage storage settings'
      puts '  config   - Show configuration'
    end

    def handle_command(input)
      case input.split.first
      when 'upload'
        handle_upload_command(input)
      when 'storage'
        handle_storage_command(input)
      when 'config'
        handle_config_command(input)
      else
        puts @pastel.red("Unknown command: #{input}")
      end
    end

    def handle_upload_command(input)
      # Placeholder for upload functionality
      puts @pastel.yellow('Upload command not yet implemented in interactive mode')
    end

    def handle_storage_command(input)
      # Placeholder for storage functionality
      puts @pastel.yellow('Storage command not yet implemented in interactive mode')
    end

    def handle_config_command(input)
      # Placeholder for config functionality
      puts @pastel.yellow('Config command not yet implemented in interactive mode')
    end
  end
end