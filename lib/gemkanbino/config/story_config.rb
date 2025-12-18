# frozen_string_literal: true

require 'yaml'
require 'fileutils'
require 'pastel'

module Gemkanbino
  module Config
    # Configuration manager for story-specific settings
    class StoryConfig
      attr_reader :pastel, :config_file, :config

      DEFAULT_CONFIG = {
        general: {
          default_genre: 'sci_fi',
          default_length: 'medium',
          default_variation: 'medium',
          auto_save: false,
          include_metadata: true,
          include_toc: true
        },
        storage: {
          stories_directory: 'stories',
          max_stories: 1000,
          auto_cleanup: false,
          compression_enabled: false,
          compression_threshold_days: 30
        },
        generation: {
          max_title_length: 200,
          max_word_count: 50000,
          min_word_count: 100,
          quality_check_enabled: true,
          prevent_repetition: true
        },
        display: {
          show_warnings: true,
          show_progress: true,
          colored_output: true,
          compact_mode: false
        },
        advanced: {
          seed_for_reproducible: nil,
          template_engine: 'war_of_the_five_years',
          markdown_style: 'default',
          cache_enabled: true
        }
      }.freeze

      def initialize
        @pastel = Pastel.new
        @config_file = get_config_file_path
        @config = load_config
      end

      def get(key)
        keys = key.to_s.split('.')
        value = @config

        keys.each do |k|
          value = value[k.to_sym] || value[k] if value
        end

        value
      end

      def set(key, value)
        keys = key.to_s.split('.')
        last_key = keys.pop.to_sym
        target = @config

        keys.each do |k|
          target = (target[k.to_sym] ||= {})
        end

        target[last_key] = value
        save_config
        true
      end

      def reset_to_defaults
        @config = deep_copy(DEFAULT_CONFIG)
        save_config
        true
      end

      def show_config(section = nil)
        if section
          display_section(section)
        else
          display_all_config
        end
      end

      def validate_config
        errors = []
        warnings = []

        # Validate general settings
        unless valid_genre?(get('general.default_genre'))
          errors << "Gênero padrão inválido: #{get('general.default_genre')}"
        end

        unless valid_length?(get('general.default_length'))
          errors << "Comprimento padrão inválido: #{get('general.default_length')}"
        end

        unless valid_variation?(get('general.default_variation'))
          errors << "Variação padrão inválida: #{get('general.default_variation')}"
        end

        # Validate storage settings
        if get('storage.max_stories') < 1
          warnings << "Limite máximo de histórias muito baixo: #{get('storage.max_stories')}"
        elsif get('storage.max_stories') > 10000
          warnings << "Limite máximo de histórias muito alto: #{get('storage.max_stories')}"
        end

        # Validate generation settings
        if get('generation.max_word_count') < get('generation.min_word_count')
          errors << "Contagem máxima de palavras menor que a mínima"
        end

        {
          valid: errors.empty?,
          errors: errors,
          warnings: warnings
        }
      end

      def export_config(file_path)
        begin
          File.write(file_path, YAML.dump(@config))
          puts pastel.green("✓ Configuração exportada para: #{file_path}")
          true
        rescue => e
          puts pastel.red("✗ Erro ao exportar configuração: #{e.message}")
          false
        end
      end

      def import_config(file_path)
        begin
          imported_config = YAML.load_file(file_path)
          @config = merge_configs(DEFAULT_CONFIG, imported_config)
          save_config
          puts pastel.green("✓ Configuração importada de: #{file_path}")
          true
        rescue => e
          puts pastel.red("✗ Erro ao importar configuração: #{e.message}")
          false
        end
      end

      def get_effective_config(overrides = {})
        # Merge default config with user config, then with runtime overrides
        effective = deep_copy(DEFAULT_CONFIG)
        effective = merge_configs(effective, @config)
        effective = merge_configs(effective, overrides)

        # Apply logical constraints
        apply_constraints(effective)

        effective
      end

      private

      def get_config_file_path
        # Try to get from main config first
        main_config_dir = File.join(Dir.home, '.gemkanbino')
        if Dir.exist?(main_config_dir)
          return File.join(main_config_dir, 'story_config.yml')
        end

        # Fallback to default location
        File.join(Dir.home, '.gemkanbino', 'story_config.yml')
      end

      def load_config
        if File.exist?(@config_file)
          begin
            loaded_config = YAML.load_file(@config_file)
            merge_configs(DEFAULT_CONFIG, loaded_config)
          rescue => e
            puts pastel.yellow("Aviso: Erro ao carregar configuração, usando padrões: #{e.message}")
            deep_copy(DEFAULT_CONFIG)
          end
        else
          # Create default config file
          save_config
          deep_copy(DEFAULT_CONFIG)
        end
      end

      def save_config
        begin
          FileUtils.mkdir_p(File.dirname(@config_file))
          File.write(@config_file, YAML.dump(@config))
        rescue => e
          puts pastel.red("Erro ao salvar configuração: #{e.message}")
        end
      end

      def display_section(section)
        section_config = get(section)
        return unless section_config

        puts pastel.cyan.bold("\n📋 Configuração: #{section.to_s.gsub('_', ' ').capitalize}")
        puts "=" * 50

        display_hash(section_config, "")
      end

      def display_all_config
        puts pastel.cyan.bold("\n📋 Configuração Completa do Gerador de Histórias")
        puts "=" * 60

        @config.each do |section, values|
          puts pastel.green.bold("\n#{section.to_s.gsub('_', ' ').capitalize}:")
          display_hash(values, "  ")
        end

        # Show configuration file location
        puts pastel.dim("\n📍 Arquivo de configuração: #{@config_file}")
      end

      def display_hash(hash, indent = "")
        hash.each do |key, value|
          if value.is_a?(Hash)
            puts "#{indent}#{pastel.white(key)}:"
            display_hash(value, indent + "  ")
          else
            puts "#{indent}#{pastel.white(key)}: #{format_value(value)}"
          end
        end
      end

      def format_value(value)
        case value
        when true
          pastel.green('sim')
        when false
          pastel.red('não')
        when nil
          pastel.dim('nulo')
        else
          value.to_s
        end
      end

      def merge_configs(base, overlay)
        return deep_copy(overlay) unless base.is_a?(Hash) && overlay.is_a?(Hash)

        result = deep_copy(base)
        overlay.each do |key, value|
          if result[key].is_a?(Hash) && value.is_a?(Hash)
            result[key] = merge_configs(result[key], value)
          else
            result[key] = value
          end
        end

        result
      end

      def deep_copy(obj)
        Marshal.load(Marshal.dump(obj))
      end

      def apply_constraints(config)
        # Ensure min_word_count <= max_word_count
        if config.dig(:generation, :min_word_count) > config.dig(:generation, :max_word_count)
          config[:generation][:max_word_count] = config[:generation][:min_word_count] * 2
        end

        # Ensure reasonable limits
        config[:storage][:max_stories] = [[config[:storage][:max_stories], 1].max, 10000].min
        config[:generation][:max_word_count] = [[config[:generation][:max_word_count], 50].max, 100000].min

        config
      end

      def valid_genre?(genre)
        valid_genres = ['sci_fi', 'fantasy', 'drama', 'adventure', 'mystery', 'horror', 'romance']
        valid_genres.include?(genre.to_s.downcase)
      end

      def valid_length?(length)
        valid_lengths = ['short', 'medium', 'long', 'epic']
        valid_lengths.include?(length.to_s.downcase)
      end

      def valid_variation?(variation)
        valid_variations = ['none', 'low', 'medium', 'high', 'extreme']
        valid_variations.include?(variation.to_s.downcase)
      end
    end
  end
end