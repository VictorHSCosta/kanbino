# frozen_string_literal: true

require_relative 'terminal_helper'

module Gemkanbino
  module UI
    # Renderer for creating banners and visual elements
    class BannerRenderer
      def initialize(pastel = Pastel.new)
        @pastel = pastel
        @helper = TerminalHelper.new(pastel)
      end

      # Create ASCII art banner for Gemkanbino
      def create_logo_banner
        logo = <<~LOGO
           ╭─────────────────────────────────────────────────╮
           │  ██████╗ ██████╗ ███╗   ███╗███╗   ███╗███████╗  │
           │  ██╔══██╗██╔══██╗████╗ ████║████╗ ████║██╔════╝  │
           │  ██████╔╝██████╔╝██╔████╔██║██╔████╔██║█████╗    │
           │  ██╔══██╗██╔══██╗██║╚██╔╝██║██║╚██╔╝██║██╔══╝    │
           │  ██████╔╝██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗  │
           │  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝  │
           ╰─────────────────────────────────────────────────╯
        LOGO

        # Apply colors to logo if supported
        if @helper.supports_color?
          logo = logo.gsub(/█/) { |match| @pastel.cyan(match) }
                     .gsub(/─/) { |match| @pastel.bright_black(match) }
                     .gsub(/│/) { |match| @pastel.bright_black(match) }
                     .gsub(/╭╮╯╰/) { |match| @pastel.bright_black(match) }
        end

        logo
      end

      # Create simple text banner (fallback for small terminals)
      def create_simple_banner
        text = "GEMKANBINO"
        if @helper.supports_color?
          @pastel.bold.cyan(text)
        else
          text
        end
      end

      # Create welcome banner based on terminal size
      def create_welcome_banner(version)
        if @helper.terminal_too_small?(min_width: 60, min_height: 15)
          create_compact_welcome(version)
        else
          create_full_welcome(version)
        end
      end

      private

      def create_full_welcome(version)
        sections = []

        # Logo
        sections << @helper.center_text(create_logo_banner)

        # Welcome message
        welcome_msg = if @helper.supports_color?
                       @pastel.bold.green("Bem-vindo ao Gemkanbino v#{version}!")
                     else
                       "BEM-VINDO AO GEMKANBINO v#{version}!"
                     end
        sections << @helper.center_text(welcome_msg)

        # Description
        description = "Sua ferramenta CLI para gerenciamento de arquivos e uploads na nuvem"
        if @helper.supports_color?
          description = @pastel.white(description)
        end
        sections << @helper.center_text(description)

        sections << @helper.vertical_padding(2)

        # Commands section
        commands_section = create_commands_section
        sections << @helper.center_text(commands_section)

        sections << @helper.vertical_padding(1)

        # Footer
        footer = create_footer
        sections << @helper.center_text(footer)

        sections.join("\n")
      end

      def create_compact_welcome(version)
        sections = []

        # Simple banner
        sections << @helper.center_text(create_simple_banner)

        sections << @helper.vertical_padding(1)

        # Welcome message
        welcome_msg = if @helper.supports_color?
                       @pastel.bold.green("Bem-vindo ao Gemkanbino v#{version}")
                     else
                       "BEM-VINDO AO GEMKANBINO v#{version}"
                     end
        sections << @helper.center_text(welcome_msg)

        # Description
        description = "Ferramenta CLI para gerenciamento de arquivos"
        if @helper.supports_color?
          description = @pastel.white(description)
        end
        sections << @helper.center_text(description)

        sections << @helper.vertical_padding(1)

        # Quick help
        help_text = "Use 'gemkanbino --help' para ver comandos disponíveis"
        if @helper.supports_color?
          help_text = @pastel.dim(help_text)
        end
        sections << @helper.center_text(help_text)

        sections.join("\n")
      end

      def create_commands_section
        commands = [
          ["📁", "ls", "Listar arquivos"],
          ["📂", "cd", "Navegar diretórios"],
          ["📋", "select", "Selecionar arquivo"],
          ["💾", "copy", "Copiar para storage"],
          ["☁️", "upload", "Upload para nuvem"],
          ["⚙️", "config", "Configurações"]
        ]

        lines = []
        lines << @helper.header("Comandos Principais:")
        lines << ""

        commands.each do |emoji, command, description|
          line = if @helper.supports_color?
                   "#{emoji} #{@helper.emphasize(command.ljust(10))} #{description}"
                 else
                   "#{emoji} #{command.ljust(10)} #{description}"
                 end
          lines << @helper.bullet_point(line, " ")
        end

        lines.join("\n")
      end

      def create_footer
        lines = []
        lines << @helper.separator(@helper.safe_width)
        lines << @helper.dim("Digite 'gemkanbino interactive' para modo interativo")
        lines << @helper.dim("Visite github.com/VictorHSCosta/kanbino para mais informações")
        lines.join("\n")
      end

      # Create success banner
      def create_success_banner(message)
        banner = "✅ #{message}"
        if @helper.supports_color?
          @pastel.bold.green(banner)
        else
          banner
        end
      end

      # Create error banner
      def create_error_banner(message)
        banner = "❌ #{message}"
        if @helper.supports_color?
          @pastel.bold.red(banner)
        else
          banner
        end
      end

      # Create warning banner
      def create_warning_banner(message)
        banner = "⚠️ #{message}"
        if @helper.supports_color?
          @pastel.bold.yellow(banner)
        else
          banner
        end
      end

      # Create info banner
      def create_info_banner(message)
        banner = "ℹ️ #{message}"
        if @helper.supports_color?
          @pastel.bold.blue(banner)
        else
          banner
        end
      end

      # Create loading spinner line
      def create_loading_line(message)
        if @helper.supports_color?
          "#{@pastel.cyan('⟳')} #{@pastel.white(message)}"
        else
          "#{message}..."
        end
      end

      # Create progress indicator
      def create_progress_line(current, total, message)
        percentage = (current.to_f / total * 100).round(1)
        bar_length = 20
        filled_length = (current.to_f / total * bar_length).round

        bar = if @helper.supports_color?
                filled = '█' * filled_length
                empty = '░' * (bar_length - filled_length)
                "#{@pastel.green(filled)}#{@pastel.bright_black(empty)}"
              else
                filled = '=' * filled_length
                empty = ' ' * (bar_length - filled_length)
                "#{filled}#{empty}"
              end

        "#{message} [#{bar}] #{percentage}% (#{current}/#{total})"
      end
    end
  end
end