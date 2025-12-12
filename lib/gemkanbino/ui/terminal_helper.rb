# frozen_string_literal: true

module Gemkanbino
  module UI
    # Helper class for terminal operations and formatting
    class TerminalHelper
      def initialize(pastel = Pastel.new)
        @pastel = pastel
      end

      # Get terminal dimensions
      def terminal_width
        IO.console&.winsize[1] || 80
      end

      def terminal_height
        IO.console&.winsize[0] || 24
      end

      # Check if terminal supports colors
      def supports_color?
        ENV['NO_COLOR'].nil? &&
        (STDOUT.tty? || ENV['FORCE_COLOR'])
      end

      # Center text horizontally
      def center_text(text, width = terminal_width)
        text_length = text.gsub(/\e\[[0-9;]*m/, '').length
        padding = [(width - text_length) / 2, 0].max
        ' ' * padding + text
      end

      # Create horizontal line
      def horizontal_line(char = '-', width = terminal_width)
        char * width
      end

      # Create separator with style
      def separator(width = terminal_width)
        if supports_color?
          @pastel.bright_black(horizontal_line('─', width))
        else
          horizontal_line('-', width)
        end
      end

      # Add vertical padding
      def vertical_padding(lines = 1)
        "\n" * lines
      end

      # Format bullet point with color
      def bullet_point(text, bullet = '●')
        if supports_color?
          "#{@pastel.green(bullet)} #{text}"
        else
          "#{bullet} #{text}"
        end
      end

      # Create header text
      def header(text)
        if supports_color?
          @pastel.bold.green(text)
        else
          text.upcase
        end
      end

      # Create subheader text
      def subheader(text)
        if supports_color?
          @pastel.blue(text)
        else
          text
        end
      end

      # Create emphasis text
      def emphasize(text)
        if supports_color?
          @pastel.yellow(text)
        else
          text
        end
      end

      # Create dim text
      def dim(text)
        if supports_color?
          @pastel.bright_black(text)
        else
          "[#{text}]"
        end
      end

      # Check if terminal is too small
      def terminal_too_small?(min_width: 40, min_height: 10)
        terminal_width < min_width || terminal_height < min_height
      end

      # Safe width calculation with fallback
      def safe_width(percentage = 0.8)
        [terminal_width * percentage, 120].min
      end

      # Truncate text to fit in width
      def truncate_text(text, max_width = safe_width)
        text_length = text.gsub(/\e\[[0-9;]*m/, '').length
        return text if text_length <= max_width

        ellipsis = supports_color? ? @pastel.bright_black('...') : '...'
        truncated_length = max_width - 3
        text[0, truncated_length] + ellipsis
      end

      # Create box around text
      def box_text(text, width: safe_width)
        lines = text.split("\n")
        max_line_width = lines.map { |line| line.gsub(/\e\[[0-9;]*m/, '').length }.max
        box_width = [max_line_width + 4, width].min

        top_border = if supports_color?
                      @pastel.bright_black('┌' + ('─' * (box_width - 2)) + '┐')
                    else
                      '+' + ('-' * (box_width - 2)) + '+'
                    end

        bottom_border = if supports_color?
                         @pastel.bright_black('└' + ('─' * (box_width - 2)) + '┘')
                       else
                         '+' + ('-' * (box_width - 2)) + '+'
                       end

        content = lines.map do |line|
          padding = [(box_width - line.gsub(/\e\[[0-9;]*m/, '').length - 2), 0].max
          if supports_color?
            "#{@pastel.bright_black('│')} #{line}#{' ' * padding} #{@pastel.bright_black('│')}"
          else
            "| #{line}#{' ' * padding} |"
          end
        end

        [top_border, content, bottom_border].flatten.join("\n")
      end
    end
  end
end