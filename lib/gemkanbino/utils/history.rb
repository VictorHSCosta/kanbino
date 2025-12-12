# frozen_string_literal: true

require 'fileutils'
require 'json'

module Gemkanbino
  module Utils
    # Gerencia histórico de comandos do shell interativo
    class History
      HISTORY_DIR = File.expand_path('~/.kanbino')
      HISTORY_FILE = File.join(HISTORY_DIR, 'history.json')
      MAX_HISTORY_SIZE = 1000

      def initialize
        @history_file = HISTORY_FILE
        ensure_history_dir
        load_history
      end

      # Adiciona um comando ao histórico
      # @param command [String] Comando a ser adicionado
      def add(command)
        return if command.nil? || command.strip.empty?

        # Remove se já existe para evitar duplicatas consecutivas
        @history.delete(command)
        @history.unshift(command)

        # Mantém apenas os últimos MAX_HISTORY_SIZE comandos
        @history = @history.first(MAX_HISTORY_SIZE)

        save_history
      end

      # Obtém todos os comandos do histórico
      # @return [Array<String>] Array de comandos
      def all
        @history.dup
      end

      # Obtém os últimos N comandos
      # @param count [Integer] Número de comandos
      # @return [Array<String>] Array de comandos
      def last(count)
        @history.first(count)
      end

      # Busca comandos que contêm o termo
      # @param term [String] Termo de busca
      # @return [Array<String>] Comandos que correspondem
      def search(term)
        return [] if term.nil? || term.empty?

        @history.select { |cmd| cmd.downcase.include?(term.downcase) }
      end

      # Obtém comandos que começam com o prefixo
      # @param prefix [String] Prefixo para filtrar
      # @return [Array<String>] Comandos que começam com o prefixo
      def starting_with(prefix)
        return @history.dup if prefix.nil? || prefix.empty?

        @history.select { |cmd| cmd.downcase.start_with?(prefix.downcase) }
      end

      # Limpa todo o histórico
      def clear
        @history.clear
        save_history
      end

      # Remove um comando específico do histórico
      # @param command [String] Comando a ser removido
      def remove(command)
        @history.delete(command)
        save_history
      end

      # Obtém tamanho atual do histórico
      # @return [Integer] Número de comandos no histórico
      def size
        @history.size
      end

      # Verifica se o histórico está vazio
      # @return [Boolean] True se vazio
      def empty?
        @history.empty?
      end

      # Exporta histórico para um arquivo
      # @param file_path [String] Caminho do arquivo de exportação
      def export(file_path)
        File.write(file_path, @history.join("\n"))
        true
      end

      # Importa histórico de um arquivo
      # @param file_path [String] Caminho do arquivo de importação
      def import(file_path)
        return false unless File.exist?(file_path)

        lines = File.read(file_path).split("\n")
        lines.each { |line| add(line) }
        true
      rescue StandardError
        false
      end

      private

      # Garante que o diretório de histórico existe
      def ensure_history_dir
        FileUtils.mkdir_p(HISTORY_DIR) unless Dir.exist?(HISTORY_DIR)
      end

      # Carrega o histórico do arquivo
      def load_history
        if File.exist?(@history_file)
          begin
            data = JSON.parse(File.read(@history_file))
            @history = data.is_a?(Array) ? data : []
          rescue JSON::ParserError
            @history = []
          end
        else
          @history = []
        end
      end

      # Salva o histórico no arquivo
      def save_history
        File.write(@history_file, JSON.pretty_generate(@history))
      rescue StandardError
        # Silently fail - não quebra a aplicação se não conseguir salvar
      end
    end
  end
end