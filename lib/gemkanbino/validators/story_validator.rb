# frozen_string_literal: true

require 'pastel'

module Gemkanbino
  module Validators
    # Validator for story generation operations
    class StoryValidator
      def initialize
        @pastel = Pastel.new
        @errors = []
        @warnings = []
      end

      def validate_story_generation(options = {})
        @errors.clear
        @warnings.clear

        validate_title(options[:title])
        validate_genre(options[:genre])
        validate_length(options[:length])
        validate_variation_level(options[:variation])
        validate_custom_parameters(options[:custom_params])

        {
          valid: @errors.empty?,
          errors: @errors,
          warnings: @warnings
        }
      end

      def validate_story_content(story_data)
        @errors.clear
        @warnings.clear

        validate_story_structure(story_data)
        validate_content_quality(story_data)
        validate_metadata(story_data[:metadata]) if story_data[:metadata]

        {
          valid: @errors.empty?,
          errors: @errors,
          warnings: @warnings
        }
      end

      def validate_file_operations(title, content)
        @errors.clear
        @warnings.clear

        validate_save_permissions
        validate_file_name(title)
        validate_content_size(content)
        validate_disk_space

        {
          valid: @errors.empty?,
          errors: @errors,
          warnings: @warnings
        }
      end

      def validate_story_search_query(query)
        @errors.clear

        if query.nil? || query.strip.empty?
          @errors << "A consulta de busca não pode estar vazia"
        elsif query.length < 2
          @errors << "A consulta de busca deve ter pelo menos 2 caracteres"
        elsif query.length > 100
          @errors << "A consulta de busca não pode exceder 100 caracteres"
        end

        {
          valid: @errors.empty?,
          errors: @errors,
          warnings: []
        }
      end

      def format_validation_results(results)
        output = []

        unless results[:errors].empty?
          output << @pastel.red.bold("❌ Erros encontrados:")
          results[:errors].each { |error| output << @pastel.red("  • #{error}") }
        end

        unless results[:warnings].empty?
          output << @pastel.yellow.bold("⚠️  Avisos:")
          results[:warnings].each { |warning| output << @pastel.yellow("  • #{warning}") }
        end

        if results[:errors].empty? && results[:warnings].empty?
          output << @pastel.green.bold("✅ Validação concluída com sucesso!")
        end

        output.join("\n")
      end

      private

      # Story generation validation methods
      def validate_title(title)
        if title.nil?
          @warnings << "Nenhum título fornecido. Um título será gerado automaticamente."
          return
        end

        if title.strip.empty?
          @errors << "O título não pode estar vazio"
        elsif title.length > 200
          @errors << "O título não pode exceder 200 caracteres"
        elsif title.length < 3
          @warnings << "Títulos muito curtos podem não ser descritivos"
        elsif contains_inappropriate_content?(title)
          @errors << "O título contém conteúdo inadequado"
        end
      end

      def validate_genre(genre)
        valid_genres = ['sci_fi', 'fantasy', 'drama', 'adventure', 'mystery', 'horror', 'romance']

        if genre && !valid_genres.include?(genre.to_s.downcase)
          @warnings << "Gênero '#{genre}' não reconhecido. Usando 'sci_fi' como padrão."
        end
      end

      def validate_length(length)
        valid_lengths = [:short, :medium, :long, :epic]

        if length && !valid_lengths.include?(length.to_sym)
          @warnings << "Comprimento '#{length}' não reconhecido. Usando 'medium' como padrão."
        end
      end

      def validate_variation_level(variation)
        valid_levels = [:none, :low, :medium, :high, :extreme]

        if variation && !valid_levels.include?(variation.to_sym)
          @warnings << "Nível de variação '#{variation}' não reconhecido. Usando 'medium' como padrão."
        end
      end

      def validate_custom_parameters(params)
        return unless params

        params.each do |key, value|
          case key.to_s
          when 'brother1_name', 'brother2_name'
            validate_character_name(key, value)
          when 'planet1_name', 'planet2_name'
            validate_planet_name(key, value)
          when 'galaxy_name'
            validate_galaxy_name(value)
          else
            @warnings << "Parâmetro personalizado '#{key}' não reconhecido"
          end
        end
      end

      def validate_character_name(key, name)
        if name.nil? || name.strip.empty?
          @errors << "O nome do personagem '#{key}' não pode estar vazio"
        elsif name.length > 50
          @errors << "O nome do personagem '#{key}' não pode exceder 50 caracteres"
        elsif name.length < 2
          @warnings << "Nome de personagem muito curto para '#{key}'"
        elsif contains_inappropriate_content?(name)
          @errors << "O nome do personagem '#{key}' contém conteúdo inadequado"
        end
      end

      def validate_planet_name(key, name)
        if name.nil? || name.strip.empty?
          @errors << "O nome do planeta '#{key}' não pode estar vazio"
        elsif name.length > 100
          @errors << "O nome do planeta '#{key}' não pode exceder 100 caracteres"
        elsif name.length < 3
          @warnings << "Nome de planeta muito curto para '#{key}'"
        elsif contains_inappropriate_content?(name)
          @errors << "O nome do planeta '#{key}' contém conteúdo inadequado"
        end
      end

      def validate_galaxy_name(name)
        if name.nil? || name.strip.empty?
          @warnings << "Nome da galáxia não fornecido. Usando nome padrão."
        elsif name.length > 100
          @errors << "O nome da galáxia não pode exceder 100 caracteres"
        elsif contains_inappropriate_content?(name)
          @errors << "O nome da galáxia contém conteúdo inadequado"
        end
      end

      # Story content validation methods
      def validate_story_structure(story_data)
        required_sections = [:introduction, :characters, :setting, :conflict, :development, :climax, :resolution, :epilogue]

        required_sections.each do |section|
          unless story_data.dig(:content, section)
            @errors << "Seção obrigatória ausente: #{section}"
          end
        end

        # Validate characters array
        characters = story_data.dig(:content, :characters)
        if characters
          unless characters.is_a?(Array) && characters.length == 2
            @errors << "A história deve ter exatamente 2 personagens (os irmãos)"
          end

          characters.each_with_index do |character, index|
            unless character[:name] && character[:role]
              @errors << "Personagem #{index + 1} está incompleto (faltando nome ou papel)"
            end
          end
        end

        # Validate development timeline
        development = story_data.dig(:content, :development)
        if development
          unless development.is_a?(Array) && development.length == 5
            @errors << "A seção de desenvolvimento deve ter exatamente 5 eventos (um por ano)"
          end
        end
      end

      def validate_content_quality(story_data)
        content = story_data[:content]
        return unless content

        # Check minimum content length
        full_text = content.values.join(' ')
        word_count = full_text.split.length

        if word_count < 100
          @warnings << "A história parece muito curta (#{word_count} palavras)"
        elsif word_count > 10000
          @warnings << "A história é muito longa (#{word_count} palavras). Pode afetar o desempenho."
        end

        # Check for repetition
        sentences = full_text.split(/[.!?]+/)
        repeated_sentences = find_repeated_sentences(sentences)

        if repeated_sentences.length > 3
          @warnings << "Muitas frases repetidas detectadas. Considere aumentar a variação."
        end

        # Check for empty sections
        content.each do |section_name, section_content|
          if section_content.is_a?(String) && section_content.strip.empty?
            @warnings << "Seção '#{section_name}' está vazia"
          elsif section_content.is_a?(Array) && section_content.empty?
            @warnings << "Seção '#{section_name}' está vazia"
          end
        end
      end

      def validate_metadata(metadata)
        return unless metadata

        required_metadata = [:created_at, :genre, :word_count, :tags, :theme, :language]

        required_metadata.each do |field|
          unless metadata[field]
            @warnings << "Metadado ausente: #{field}"
          end
        end

        # Validate word count
        if metadata[:word_count] && (metadata[:word_count] < 50 || metadata[:word_count] > 50000)
          @warnings << "Contagem de palavras suspeita: #{metadata[:word_count]}"
        end

        # Validate created_at date
        if metadata[:created_at]
          begin
            Date.parse(metadata[:created_at])
          rescue ArgumentError
            @errors << "Data de criação inválida: #{metadata[:created_at]}"
          end
        end
      end

      # File operations validation methods
      def validate_save_permissions
        storage_dir = File.join(Dir.home, '.gemkanbino', 'storage', 'stories')

        unless Dir.exist?(File.dirname(storage_dir))
          @errors << "Diretório de armazenamento não acessível"
        end

        unless File.writable?(File.dirname(storage_dir))
          @errors << "Sem permissão de escrita no diretório de armazenamento"
        end
      end

      def validate_file_name(title)
        return unless title

        filename = title.downcase.gsub(/[^a-z0-9\s]/, '').gsub(/\s+/, '_') + '.md'

        if filename.length > 255
          @errors << "Nome de arquivo gerado muito longo"
        end

        # Check for reserved names (Windows)
        reserved_names = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9']
        base_name = filename.gsub('.md', '')

        if reserved_names.include?(base_name.upcase)
          @errors << "Nome de arquivo reservado pelo sistema: #{base_name}"
        end
      end

      def validate_content_size(content)
        return unless content

        content_size = content.bytesize

        if content_size == 0
          @errors << "O conteúdo da história está vazio"
        elsif content_size > 10 * 1024 * 1024 # 10MB
          @warnings << "Contúdo muito grande (#{content_size} bytes). Pode afetar o desempenho."
        end
      end

      def validate_disk_space
        storage_dir = File.join(Dir.home, '.gemkanbino', 'storage', 'stories')

        begin
          stat = File.statvfs(storage_dir) if File.exist?(storage_dir)
          return unless stat

          available_space = stat.f_bavail * stat.f_frsize
          required_space = 1024 * 1024 # 1MB minimum

          if available_space < required_space
            @warnings << "Espaço em disco limitado no diretório de armazenamento"
          end
        rescue
          @warnings << "Não foi possível verificar o espaço em disco disponível"
        end
      end

      # Utility methods
      def contains_inappropriate_content?(text)
        # Simple check for inappropriate content
        # In a real implementation, this would be more sophisticated
        inappropriate_patterns = [
          /password/i,
          /secret/i,
          /confidential/i,
          /admin/i,
          /root/i
        ]

        text.to_s.match?(Regexp.union(inappropriate_patterns))
      end

      def find_repeated_sentences(sentences)
        return [] if sentences.length < 2

        sentence_counts = Hash.new(0)
        repeated = []

        sentences.map(&:strip).reject(&:empty?).each do |sentence|
          sentence_counts[sentence.downcase] += 1
        end

        sentence_counts.each do |sentence, count|
          repeated << sentence if count > 1
        end

        repeated
      end
    end
  end
end