# frozen_string_literal: true

require 'json'
require 'fileutils'

require_relative 'exceptions/config_error'

module Gemkanbino
  # Gerencia configurações globais da aplicação
  # Responsável por armazenar e recuperar configurações em formato JSON
  class ConfigManager
    CONFIG_DIR = File.expand_path('~/.kanbino')
    CONFIG_FILE = File.join(CONFIG_DIR, 'config.json')

    def initialize
      @config_file = CONFIG_FILE
      ensure_config_dir
    end

    # Obtém um valor de configuração específico
    # @param key [String] Chave da configuração
    # @param default [Object] Valor padrão caso não exista
    # @return [Object] Valor da configuração
    def get_config(key, default = nil)
      config = load_config
      config.dig(*key.split('.')) || default
    end

    # Define um valor de configuração
    # @param key [String] Chave da configuração (suporta notação de ponto)
    # @param value [Object] Valor a ser armazenado
    def set_config(key, value)
      config = load_config
      keys = key.split('.')
      last_key = keys.pop
      target = keys.reduce(config) { |hash, k| hash[k] ||= {} }
      target[last_key] = value
      save_config(config)
      value
    end

    # Exibe todas as configurações atuais
    # @return [Hash] Configurações completas
    def show_all_config
      load_config
    end

    # Remove uma configuração específica
    # @param key [String] Chave da configuração a ser removida
    def remove_config(key)
      config = load_config
      keys = key.split('.')
      last_key = keys.pop
      target = keys.reduce(config) { |hash, k| hash[k] ||= {} }
      target.delete(last_key)
      save_config(config)
      true
    end

    # Verifica se uma configuração existe
    # @param key [String] Chave da configuração
    # @return [Boolean] True se existir
    def config_exists?(key)
      !get_config(key).nil?
    end

    # Limpa todas as configurações
    def clear_all_config
      save_config({})
      true
    end

    # Recarrega as configurações do arquivo
    def reload_config
      @config_cache = nil
      load_config
    end

    # Exporta configurações para um arquivo específico
    # @param file_path [String] Caminho do arquivo de exportação
    def export_config(file_path)
      config = load_config
      File.write(file_path, JSON.pretty_generate(config))
      true
    end

    # Importa configurações de um arquivo específico
    # @param file_path [String] Caminho do arquivo de importação
    def import_config(file_path)
      unless File.exist?(file_path)
        raise Gemkanbino::Exceptions::ConfigError, "Arquivo de configuração não encontrado: #{file_path}"
      end

      begin
        imported_config = JSON.parse(File.read(file_path))
        save_config(imported_config)
        true
      rescue JSON::ParserError => e
        raise Gemkanbino::Exceptions::ConfigError, "Arquivo de configuração inválido: #{e.message}"
      end
    end

    private

    # Garante que o diretório de configuração existe
    def ensure_config_dir
      FileUtils.mkdir_p(CONFIG_DIR) unless Dir.exist?(CONFIG_DIR)
    end

    # Carrega as configurações do arquivo com cache
    def load_config
      @config_cache ||= begin
        if File.exist?(@config_file)
          JSON.parse(File.read(@config_file))
        else
          {}
        end
      rescue JSON::ParserError => e
        raise Gemkanbino::Exceptions::ConfigError, "Erro ao ler arquivo de configuração: #{e.message}"
      end
    end

    # Salva as configurações no arquivo
    def save_config(config)
      ensure_config_dir
      File.write(@config_file, JSON.pretty_generate(config))
      @config_cache = config
    rescue StandardError => e
      raise Gemkanbino::Exceptions::ConfigError, "Erro ao salvar configuração: #{e.message}"
    end
  end
end