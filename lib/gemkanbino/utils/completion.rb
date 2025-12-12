# frozen_string_literal: true

module Gemkanbino
  module Utils
    # Sistema de auto-completar para comandos CLI
    class Completion
      # Comandos principais disponíveis
      BASE_COMMANDS = %w[
        version pwd ls cd select info copy upload config interactive home
        help exit quit clear history
      ].freeze

      # Subcomandos conhecidos
      SUBCOMMANDS = {
        'upload' => ['transfer.sh', 'file.io'],
        'storage' => ['list', 'clear', 'show', 'set'],
        'config' => ['show', 'set', 'list', 'get']
      }.freeze

      def initialize
        @available_commands = BASE_COMMANDS.dup
        @command_help = {}
        load_command_descriptions
      end

      # Sugere completions para o input atual
      # @param input [String] Input parcial do usuário
      # @return [Array<String>] Sugestões de completetion
      def suggestions(input)
        return all_commands if input.nil? || input.empty?

        parts = input.split
        return base_command_suggestions(input) if parts.size == 1

        subcommand_suggestions(parts.first, parts[1..-1])
      end

      # Adiciona comandos dinâmicos à lista de completions
      # @param commands [Array<String>] Novos comandos
      def add_commands(commands)
        Array(commands).each do |cmd|
          @available_commands << cmd unless @available_commands.include?(cmd)
        end
        @available_commands.sort!
      end

      # Remove comandos da lista de completions
      # @param commands [Array<String>] Comandos a remover
      def remove_commands(commands)
        Array(commands).each { |cmd| @available_commands.delete(cmd) }
      end

      # Obtém todos os comandos disponíveis
      # @return [Array<String>] Array de comandos
      def all_commands
        (@available_commands + SUBCOMMANDS.keys).sort.uniq
      end

      # Obtém subcomandos para um comando principal
      # @param command [String] Comando principal
      # @return [Array<String>] Subcomandos disponíveis
      def subcommands_for(command)
        SUBCOMMANDS[command] || []
      end

      # Obtém descrição de um comando
      # @param command [String] Comando
      # @return [String] Descrição do comando
      def command_description(command)
        @command_help[command] || 'Comando Kanbino'
      end

      # Verifica se um comando é válido
      # @param command [String] Comando a verificar
      # @return [Boolean] True se for válido
      def valid_command?(command)
        all_commands.include?(command)
      end

      # Gera string de ajuda para comandos disponíveis
      # @return [String] Texto de ajuda formatado
      def help_text
        text = []
        text << "Comandos disponíveis:"
        text << ""

        all_commands.each do |cmd|
          description = command_description(cmd)
          text << sprintf("  %-15s %s", cmd, description)
        end

        text << ""
        text.join("\n")
      end

      # Gera completions para shells específicos (bash, zsh)
      # @param shell [Symbol] Tipo de shell (:bash, :zsh)
      # @return [String] Script de completion
      def completion_script(shell = :bash)
        case shell
        when :bash
          bash_completion_script
        when :zsh
          zsh_completion_script
        else
          ''
        end
      end

      private

      # Sugestões para comandos base
      # @param input [String] Input parcial
      # @return [Array<String>] Sugestões
      def base_command_suggestions(input)
        prefix = input.downcase
        @available_commands.select { |cmd| cmd.downcase.start_with?(prefix) }
      end

      # Sugestões para subcomandos
      # @param main_command [String] Comando principal
      # @param args [Array<String>] Argumentos restantes
      # @return [Array<String>] Sugestões
      def subcommand_suggestions(main_command, args)
        return [] unless SUBCOMMANDS.key?(main_command)

        if args.size == 1
          # Sugestão de subcomando
          prefix = args.first.downcase
          SUBCOMMANDS[main_command].select { |sub| sub.downcase.start_with?(prefix) }
        else
          # Para argumentos adicionais, poderíamos implementar outras lógicas
          # como sugestão de arquivos, caminhos, etc.
          []
        end
      end

      # Carrega descrições dos comandos
      def load_command_descriptions
        @command_help = {
          'version' => 'Mostra versão da aplicação',
          'pwd' => 'Mostra diretório de trabalho atual',
          'ls' => 'Lista arquivos e diretórios',
          'cd' => 'Altera diretório',
          'select' => 'Seleciona arquivo para operações',
          'info' => 'Mostra informações do arquivo selecionado',
          'copy' => 'Copia arquivo selecionado para área de transferência',
          'upload' => 'Faz upload para serviços cloud',
          'config' => 'Gerencia configurações',
          'storage' => 'Gerencia armazenamento local',
          'interactive' => 'Inicia modo interativo',
          'home' => 'Mostra página inicial',
          'help' => 'Mostra ajuda',
          'exit' => 'Sai da aplicação',
          'quit' => 'Sai da aplicação',
          'clear' => 'Limpa a tela',
          'history' => 'Mostra histórico de comandos'
        }
      end

      # Gera script de completion para bash
      # @return [String] Script bash completion
      def bash_completion_script
        <<~BASH
          # Bash completion for Kanbino
          _gemkanbino_completion() {
              local cur prev opts
              COMPREPLY=()
              cur="${COMP_WORDS[COMP_CWORD]}"
              prev="${COMP_WORDS[COMP_CWORD-1]}"

              if [[ ${COMP_CWORD} == 1 ]] ; then
                  opts="#{all_commands.join(' ')}"
                  COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
                  return 0
              fi

              case "${prev}" in
                  upload)
                      opts="transfer.sh file.io"
                      COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
                      return 0
                      ;;
                  config|storage)
                      opts="list show set get"
                      COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
                      return 0
                      ;;
                  cd)
                      COMPREPLY=( $(compgen -d -- ${cur}) )
                      return 0
                      ;;
                  *)
                      ;;
              esac
          }

          complete -F _gemkanbino_completion gemkanbino
        BASH
      end

      # Gera script de completion para zsh
      # @return [String] Script zsh completion
      def zsh_completion_script
        <<~ZSH
          #compdef gemkanbino

          _gemkanbino() {
              local -a commands subcommands

              commands=(
                  'version:Mostra versão da aplicação'
                  'pwd:Mostra diretório de trabalho atual'
                  'ls:Lista arquivos e diretórios'
                  'cd:Altera diretório'
                  'select:Seleciona arquivo para operações'
                  'info:Mostra informações do arquivo selecionado'
                  'copy:Copia arquivo selecionado'
                  'upload:Faz upload para serviços cloud'
                  'config:Gerencia configurações'
                  'storage:Gerencia armazenamento local'
                  'interactive:Inicia modo interativo'
                  'home:Mostra página inicial'
                  'help:Mostra ajuda'
                  'exit:Sai da aplicação'
                  'quit:Sai da aplicação'
                  'clear:Limpa a tela'
                  'history:Mostra histórico de comandos'
              )

              subcommands=(
                  'upload:(transfer.sh file.io)'
                  'config:(list show set get)'
                  'storage:(list show set get)'
              )

              _arguments -C \\
                  '1: :->command' \\
                  '*:: :->args'

              case $state in
                  command)
                      _describe 'command' commands
                      ;;
                  args)
                      case $line[1] in
                          upload)
                              _describe 'subcommand' subcommands
                              ;;
                          config|storage)
                              _describe 'subcommand' subcommands
                              ;;
                          cd)
                              _files -/
                              ;;
                      esac
                      ;;
              esac
          }

          _gemkanbino
        ZSH
      end
    end
  end
end