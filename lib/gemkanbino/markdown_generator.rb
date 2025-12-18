# frozen_string_literal: true

module Gemkanbino
  # Class responsible for converting story data to well-formatted markdown
  class MarkdownGenerator
    def initialize(options = {})
      @include_toc = options[:include_toc] || true
      @include_metadata = options[:include_metadata] || true
      @formatting_style = options[:formatting_style] || :default
    end

    def generate(story_data)
      markdown_parts = []

      # Add title
      markdown_parts << generate_title(story_data[:title])

      # Add table of contents
      markdown_parts << generate_toc if @include_toc

      # Add metadata
      markdown_parts << generate_metadata(story_data[:metadata]) if @include_metadata

      # Add main content
      markdown_parts << generate_introduction(story_data[:content][:introduction])
      markdown_parts << generate_characters_section(story_data[:content][:characters])
      markdown_parts << generate_setting_section(story_data[:content][:setting])
      markdown_parts << generate_conflict_section(story_data[:content][:conflict])
      markdown_parts << generate_development_section(story_data[:content][:development])
      markdown_parts << generate_climax_section(story_data[:content][:climax])
      markdown_parts << generate_resolution_section(story_data[:content][:resolution])
      markdown_parts << generate_epilogue_section(story_data[:content][:epilogue])

      # Add separator
      markdown_parts << generate_footer

      markdown_parts.join("\n\n")
    end

    private

    def generate_title(title)
      "# #{title}\n"
    end

    def generate_toc
      toc = <<~MARKDOWN
        ## Índice

        - [Introdução](#introdução)
        - [Personagens](#personagens)
        - [Cenário](#cenário)
        - [O Conflito](#o-conflito)
        - [Desenvolvimento da Guerra](#desenvolvimento-da-guerra)
        - [O Clímax](#o-clímax)
        - [Resolução](#resolução)
        - [Epílogo](#epílogo)

        ---
      MARKDOWN
      toc
    end

    def generate_metadata(metadata)
      metadata_section = <<~MARKDOWN
        ## Informações da História

        **Gênero:** #{format_genre(metadata[:genre])}
        **Data de Criação:** #{format_date(metadata[:created_at])}
        **Contagem de Palavras:** #{metadata[:word_count]}
        **Tags:** #{metadata[:tags].join(', ')}
        **Tema:** #{metadata[:theme]}

        ---
      MARKDOWN
      metadata_section
    end

    def generate_introduction(introduction)
      <<~MARKDOWN
        ## Introdução

        #{introduction}
      MARKDOWN
    end

    def generate_characters_section(characters)
      characters_section = "## Personagens\n\n"
      characters.each_with_index do |character, index|
        characters_section << "### #{character[:name]}\n\n"
        characters_section << "**Função:** #{character[:role]}\n\n"
        characters_section << "**Planeta:** #{character[:planet]}\n\n" if character[:planet] && !character[:planet].empty?
        characters_section << "**Descrição:** #{character[:description]}\n\n"
        characters_section << "---\n\n" if index < characters.length - 1
      end
      characters_section
    end

    def generate_setting_section(setting)
      <<~MARKDOWN
        ## Cenário

        **Galáxia:** #{setting[:galaxy]}
        **Período de Tempo:** #{setting[:time_period]}

        ### Planetas

        #{format_planets(setting[:planets])}
      MARKDOWN
    end

    def generate_conflict_section(conflict)
      <<~MARKDOWN
        ## O Conflito

        ### Causa da Guerra
        #{conflict[:cause]}

        ### Escalada
        #{conflict[:escalation]}

        ### O que estava em jogo
        #{conflict[:stakes]}
      MARKDOWN
    end

    def generate_development_section(development)
      development_section = "## Desenvolvimento da Guerra\n\n"
      development.each do |event|
        development_section << "- **#{event}**\n"
      end
      development_section
    end

    def generate_climax_section(climax)
      <<~MARKDOWN
        ## O Clímax

        #{climax}
      MARKDOWN
    end

    def generate_resolution_section(resolution)
      <<~MARKDOWN
        ## Resolução

        #{resolution}
      MARKDOWN
    end

    def generate_epilogue_section(epilogue)
      <<~MARKDOWN
        ## Epílogo

        #{epilogue}
      MARKDOWN
    end

    def generate_footer
        <<~MARKDOWN
          ---

          *História gerada por Gemkanbino - Gerador de Histórias Ficcionais*

          *Esta é uma obra de ficção. Qualquer semelhança com eventos reais é mera coincidência.*
        MARKDOWN
    end

    # Helper methods for formatting
    def format_genre(genre)
      case genre.to_sym
      when :sci_fi
        "Ficção Científica"
      when :fantasy
        "Fantasia"
      when :drama
        "Drama"
      when :adventure
        "Aventura"
      when :mystery
        "Mistério"
      else
        genre.to_s.capitalize
      end
    end

    def format_date(date_string)
      require 'date'
      date = Date.parse(date_string)
      date.strftime("%d de %B de %Y")
    rescue
      date_string
    end

    def format_planets(planets)
      planets_text = ""
      planets.each_with_index do |planet, index|
        planets_text << "#### #{planet[:name]}\n\n"
        planets_text << "#{planet[:characteristics]}\n\n"
        planets_text << "**População:** #{planet[:population]}\n\n"
        planets_text << "---\n\n" if index < planets.length - 1
      end
      planets_text
    end

    # Alternative formatting styles
    def generate_with_minimal_style(story_data)
      simplified = "## #{story_data[:title]}\n\n"
      simplified << "### Introdução\n\n#{story_data[:content][:introduction]}\n\n"
      simplified << "### Conflito\n\n#{story_data[:content][:conflict][:cause]}\n\n"
      simplified << "### Clímax\n\n#{story_data[:content][:climax]}\n\n"
      simplified << "### Resolução\n\n#{story_data[:content][:resolution]}\n\n"
      simplified << "### Epílogo\n\n#{story_data[:content][:epilogue]}"
      simplified
    end

    def generate_with_novel_style(story_data)
      novel = "# #{story_data[:title]}\n\n"
      novel << "*#{story_data[:metadata][:created_at]}*\n\n---\n\n"

      # Characters introduction
      novel << "## Os Irmãos\n\n"
      story_data[:content][:characters].each do |character|
        novel << "**#{character[:name]}**, #{character[:description].downcase}.\n\n"
      end

      # The story as narrative
      novel << "## A História\n\n"
      novel << "#{story_data[:content][:introduction]}\n\n"
      novel << "### O Início da Guerra\n\n"
      novel << "#{story_data[:content][:conflict][:cause]}\n\n"

      story_data[:content][:development].each do |event|
        novel << "#{event}.\n\n"
      end

      novel << "### O Momento Decisivo\n\n"
      novel << "#{story_data[:content][:climax]}\n\n"
      novel << "#{story_data[:content][:resolution]}\n\n"
      novel << "#{story_data[:content][:epilogue]}"
      novel
    end
  end
end