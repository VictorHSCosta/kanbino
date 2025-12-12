# frozen_string_literal: true

require 'readline'
require 'tty-prompt'
require 'pastel'

module Gemkanbino
  # Shell interativo para modo de linha de comando contínuo
  # Permite executar múltiplos comandos sem reiniciar a aplicação
  class InteractiveShell
    PROMPT = 'kanbino> '.freeze

    def initialize
      @prompt = TTY::Prompt.new
      @pastel = Pastel.new
      @history = []
      @running = false
    end

    # Inicia o shell interativo
    def self.start
      new.run
    end

    # Loop principal do shell interativo
    def run
      @running = true
      clear_screen
      show_welcome_message

      while @running
        begin
          input = read_input
          next if input.nil? || input.strip.empty?

          process_command(input.strip)
        rescue Interrupt
          handle_interrupt
        rescue StandardError => e
          show_error(e.message)
        end
      end

      show_goodbye_message
    end

    private

    # Lê entrada do usuário com suporte a histórico
    def read_input
      Readline.readline(PROMPT, true)&.strip
    end

    # Processa um comando digitado pelo usuário
    # @param input [String] Comando digitado
    def process_command(input)
      add_to_history(input)

      case input.downcase
      when 'exit', 'quit', 'sair'
        @running = false
      when 'clear', 'limpar'
        clear_screen
      when 'help', 'ajuda'
        show_help
      when 'history', 'historico'
        show_history
      when 'home', 'inicio'
        show_home
      else
        execute_command(input)
      end
    end

    # Executa comandos da CLI principal
    # @param command [String] Comando a ser executado
    def execute_command(command)
      begin
        # Cria uma nova instância da CLI e executa o comando
        args = command.split
        Gemkanbino::CLI.start(args)
      rescue Thor::UndefinedCommandError
        show_error("Comando não reconhecido: #{command}")
      rescue Thor::InvocationError => e
        show_error("Erro ao executar comando: #{e.message}")
      end
    end

    # Adiciona comando ao histórico
    def add_to_history(command)
      @history << command
      # Mantém apenas os últimos 100 comandos
      @history = @history.last(100) if @history.size > 100
    end

    # Limpa a tela
    def clear_screen
      system('clear') || system('cls')
    end

    # Mostra mensagem de boas-vindas
    def show_welcome_message
      puts @pastel.cyan.bold('╔════════════════════════════════════════════════════════════════╗')
      puts @pastel.cyan.bold('║                    Kanbino Shell Interativo                    ║')
      puts @pastel.cyan.bold('╚════════════════════════════════════════════════════════════════╝')
      puts
      puts @pastel.white('Bem-vindo ao modo interativo!')
      puts @pastel.dim('Digite "help" para ver os comandos disponíveis ou "exit" para sair.')
      puts
    end

    # Mostra mensagem de despedida
    def show_goodbye_message
      puts
      puts @pastel.green('Obrigado por usar o Kanbino. Até logo! 👋')
      puts
    end

    # Mostra ajuda dos comandos interativos
    def show_help
      puts
      puts @pastel.yellow.bold('Comandos Disponíveis:')
      puts
      puts @pastel.white('  ' + 'Comandos Interativos:'.ljust(25) + 'Descrição')
      puts @pastel.dim('  ' + '-' * 50)
      puts @pastel.white('  help'.ljust(25) + 'Mostra esta ajuda')
      puts @pastel.white('  history'.ljust(25) + 'Mostra histórico de comandos')
      puts @pastel.white('  clear'.ljust(25) + 'Limpa a tela')
      puts @pastel.white('  home'.ljust(25) + 'Mostra página inicial')
      puts @pastel.white('  exit, quit, sair'.ljust(25) + 'Sai do modo interativo')
      puts
      puts @pastel.yellow.bold('Comandos Kanbino:')
      puts
      puts @pastel.white('  ' + 'Comandos Principais:'.ljust(25) + 'Descrição')
      puts @pastel.dim('  ' + '-' * 50)
      puts @pastel.white('  version'.ljust(25) + 'Mostra versão')
      puts @pastel.white('  pwd'.ljust(25) + 'Mostra diretório atual')
      puts @pastel.white('  ls [caminho]'.ljust(25) + 'Lista arquivos e diretórios')
      puts @pastel.white('  cd <caminho>'.ljust(25) + 'Altera diretório')
      puts @pastel.white('  select <arquivo>'.ljust(25) + 'Seleciona arquivo para operações')
      puts @pastel.white('  info'.ljust(25) + 'Mostra informações do arquivo selecionado')
      puts @pastel.white('  copy'.ljust(25) + 'Copia arquivo selecionado')
      puts @pastel.white('  upload <provedor>'.ljust(25) + 'Faz upload do arquivo')
      puts @pastel.white('  config <ação>'.ljust(25) + 'Gerencia configurações')
      puts
    end

    # Mostra histórico de comandos
    def show_history
      puts
      puts @pastel.yellow.bold('Histórico de Comandos:')
      puts
      if @history.empty?
        puts @pastel.dim('Nenhum comando no histórico ainda.')
      else
        @history.each_with_index do |cmd, index|
          puts @pastel.white("#{(index + 1).to_s.rjust(3)}: #{cmd}")
        end
      end
      puts
    end

    # Mostra página inicial
    def show_home
      clear_screen
      Gemkanbino::WelcomeDisplay.new.show
    end

    # Mostra mensagem de erro formatada
    # @param message [String] Mensagem de erro
    def show_error(message)
      puts @pastel.red.bold('❌ Erro:') + ' ' + @pastel.white(message)
      puts
    end

    # Trata interrupção (Ctrl+C)
    def handle_interrupt
      puts
      puts @pastel.yellow('⚠️  Use "exit" para sair do modo interativo.')
      puts
    end
  end
end