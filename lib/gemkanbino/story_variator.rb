# frozen_string_literal: true

require_relative 'story_templates'

module Gemkanbino
  # Class responsible for creating variations in stories to avoid repetition
  class StoryVariator
    def initialize
      @templates = StoryTemplates::WarOfTheFiveYears
      @used_combinations = Set.new
    end

    def vary_story(base_story, variation_level = :medium, seed = nil)
      # Use seed for reproducible variations if provided
      srand(seed) if seed

      case variation_level.to_sym
      when :none
        base_story
      when :low
        apply_low_variation(base_story)
      when :medium
        apply_medium_variation(base_story)
      when :high
        apply_high_variation(base_story)
      when :extreme
        apply_extreme_variation(base_story)
      else
        apply_medium_variation(base_story)
      end
    end

    def generate_unique_combination
      loop do
        combination = {
          intro_index: rand(@templates[:introductions].length),
          character_pair_index: rand(@templates[:character_pairs].length),
          planet_combo_index: rand(@templates[:planet_combinations].length),
          conflict_index: rand(@templates[:conflict_reasons].length),
          climax_index: rand(@templates[:climaxes].length),
          resolution_index: rand(@templates[:resolutions].length),
          epilogue_index: rand(@templates[:epilogues].length)
        }

        return combination unless @used_combinations.include?(combination.to_s)
      end
    end

    def mark_combination_used(combination)
      @used_combinations.add(combination.to_s)
    end

    def reset_usage_tracking
      @used_combinations.clear
    end

    def get_usage_statistics
      {
        total_possible_combinations: calculate_total_combinations,
        used_combinations: @used_combinations.length,
        available_combinations: calculate_total_combinations - @used_combinations.length,
        usage_percentage: (@used_combinations.length.to_f / calculate_total_combinations * 100).round(2)
      }
    end

    private

    def apply_low_variation(story)
      varied_story = deep_copy_story(story)

      # Vary introduction slightly
      varied_story[:content][:introduction] = vary_text_passage(
        story[:content][:introduction],
        @templates[:introductions].sample
      )

      # Add small character details
      varied_story[:content][:characters] = vary_characters_lightly(story[:content][:characters])

      varied_story
    end

    def apply_medium_variation(story)
      varied_story = deep_copy_story(story)

      # Get unique combination
      combination = generate_unique_combination
      mark_combination_used(combination)

      # Apply variations based on combination
      varied_story[:content][:introduction] = @templates[:introductions][combination[:intro_index]]
      varied_story[:content][:characters] = generate_character_variation(combination[:character_pair_index])
      varied_story[:content][:setting][:planets] = generate_planet_variation(combination[:planet_combo_index])
      varied_story[:content][:conflict][:cause] = @templates[:conflict_reasons][combination[:conflict_index]]

      varied_story
    end

    def apply_high_variation(story)
      varied_story = deep_copy_story(story)

      # Get unique combination
      combination = generate_unique_combination
      mark_combination_used(combination)

      # Apply comprehensive variations
      varied_story[:content][:introduction] = @templates[:introductions][combination[:intro_index]]
      varied_story[:content][:characters] = generate_character_variation(combination[:character_pair_index])
      varied_story[:content][:setting][:planets] = generate_planet_variation(combination[:planet_combo_index])
      varied_story[:content][:setting][:galaxy] = generate_galaxy_name
      varied_story[:content][:conflict][:cause] = @templates[:conflict_reasons][combination[:conflict_index]]
      varied_story[:content][:conflict][:escalation] = @templates[:battle_descriptions].sample
      varied_story[:content][:development] = generate_varied_development
      varied_story[:content][:climax] = @templates[:climaxes][combination[:climax_index]]
      varied_story[:content][:resolution] = @templates[:resolutions][combination[:resolution_index]]
      varied_story[:content][:epilogue] = @templates[:epilogues][combination[:epilogue_index]]

      varied_story
    end

    def apply_extreme_variation(story)
      varied_story = deep_copy_story(story)

      # Create completely new story structure
      varied_story[:content][:introduction] = generate_extreme_introduction
      varied_story[:content][:characters] = generate_extreme_characters
      varied_story[:content][:setting] = generate_extreme_setting
      varied_story[:content][:conflict] = generate_extreme_conflict
      varied_story[:content][:development] = generate_extreme_development
      varied_story[:content][:climax] = generate_extreme_climax
      varied_story[:content][:resolution] = generate_extreme_resolution
      varied_story[:content][:epilogue] = generate_extreme_epilogue

      # Update title to reflect extreme variation
      varied_story[:title] = generate_extreme_title

      varied_story
    end

    # Variation helper methods
    def vary_text_passage(original, template)
      # Mix original and template elements
      sentences = original.split('. ')
      template_sentences = template.split('. ')

      result = []
      sentences.each_with_index do |sentence, index|
        if index.even? && template_sentences[index]
          result << template_sentences[index]
        else
          result << sentence
        end
      end

      result.join('. ') + '.'
    end

    def vary_characters_lightly(characters)
      characters.map do |character|
        varied_character = character.dup
        # Add small variations to descriptions
        varied_character[:description] = add_adjective_variation(character[:description])
        varied_character
      end
    end

    def add_adjective_variation(description)
      adjectives = ['poderoso', 'sábio', 'implacável', 'visionário', 'carismático', 'estratégico']
      adjectives.sample + ' e ' + description
    end

    def generate_character_variation(index)
      character_pair = @templates[:character_pairs][index]
      [
        {
          name: character_pair[:brother1][:name],
          role: "Irmão mais velho",
          planet: "", # Will be set based on planets
          description: "#{character_pair[:brother1][:trait]}, governante com visão expansionista"
        },
        {
          name: character_pair[:brother2][:name],
          role: "Irmão mais novo",
          planet: "", # Will be set based on planets
          description: "#{character_pair[:brother2][:trait]}, líder com perspectiva progressista"
        }
      ]
    end

    def generate_planet_variation(index)
      planets = @templates[:planet_combinations][index]
      [
        {
          name: planets[:planet1],
          characteristics: planets[:characteristics],
          population: "#{rand(5..20)} bilhões de habitantes"
        },
        {
          name: planets[:planet2],
          characteristics: planets[:characteristics],
          population: "#{rand(5..20)} bilhões de habitantes"
        }
      ]
    end

    def generate_galaxy_name
      galaxy_names = ["Centaurus Major", "Andromeda Secundus", "Triangulum Prime", "Magellanic Superior", "Virgo Ultra", "Orion Nebula"]
      galaxy_names.sample
    end

    def generate_varied_development
      developments = []
      (1..5).each do |year|
        events = get_year_events(year)
        developments << "Ano #{year}: #{events.sample}"
      end
      developments
    end

    def get_year_events(year)
      case year
      when 1
        ["Tensões diplomáticas aumentam", "Esquemas de espionagem começam", "Propaganda de guerra espalha-se", "Negociações de paz falham"]
      when 2
        ["Primeiras batalhas navais ocorrem", "Planetas neutros são pressionados", "Recursos militares mobilizados", "Bloqueios espaciais estabelecidos"]
      when 3
        ["Alianças formadas e testadas", "Guerra total declarada", "Civilizações menores sofrem consequências", "Tecnologias secretas reveladas"]
      when 4
        ["Tecnologias experimentais empregadas", "Perdas civis aumentam drasticamente", "Morais em ambos os lados vacilam", "Potências estrangeiras intervêm"]
      when 5
        ["Exaustão generalizada", "Possibilidade de negociação surge", "Ameaça externa inesperada aparece", "Sobrevivência da galáxia em risco"]
      end
    end

    # Extreme variation methods
    def generate_extreme_introduction
      openings = [
        "No vácuo infinito do cosmos, onde o tempo e o espaço se entrelaçam em padrões cósmicos, uma profecia antiga falava de dois irmãos cuja rivalidade forjaria ou destruiria o universo conhecido.",
        "Quando as estrelas jovens brilhavam pela primeira vez na galáxia espiral, duas almas gêmeas emergiram de mundos diferentes, destinadas a se tornarem arquitetos da paz ou senhores da destruição.",
        "Nos anais da história galáctica, nenhum conflito foi tão épico quanto a Guerra dos Cinco Anos - uma batalha não apenas por território, mas pela própria alma da civilização interestelar."
      ]
      openings.sample
    end

    def generate_extreme_characters
      [
        {
          name: generate_character_name,
          role: "O Imperador Esquecido",
          planet: "Mundo Prismático",
          description: "Ser antigo com poder sobre o tempo e o espaço, carrega o peso de milênios de sabedoria e ambição"
        },
        {
          name: generate_character_name,
          role: "O Guardião das Fronteiras",
          planet: "Fortaleza Cristalina",
          description: "Protetor dos mundos externos, com habilidades que desafiam as leis da física e compreensão humana"
        }
      ]
    end

    def generate_character_name
      prefixes = ["Xylar", "Zentaur", "Quasar", "Nebul", "Cosmo", "Stellar", "Astro", "Vort"]
      suffixes = ["ian", "on", "us", "ex", "ar", "or", "is", "os"]
      prefixes.sample + suffixes.sample
    end

    def generate_extreme_setting
      {
        galaxy: "Convergência Quântica",
        time_period: "Era da Dissonância",
        planets: [
          {
            name: "Mundo Prismático",
            characteristics: "Planeta-dimensional com existência em múltiplos planos simultaneamente",
            population: "População infinita através de realidades paralelas"
          },
          {
            name: "Fortaleza Cristalina",
            characteristics: "Estrutura viva de cristal quântico que se adapta a qualquer ameaça",
            population: "Consciência coletiva de bilhões de mentes unificadas"
          }
        ]
      }
    end

    def generate_extreme_conflict
      {
        cause: "Disputa pelo Controlador da Realidade, artefato que permite reescrever as leis fundamentais do universo",
        escalation: "Conflito que ameaça desfazer a própria estrutura do espaço-tempo, criando paradoxos que afetam toda a existência",
        stakes: "O destino não apenas da galáxia, mas de todas as realidades possíveis e impossíveis"
      }
    end

    def generate_extreme_development
      [
        "Ano 1: As primeiras rachaduras na realidade começam a aparecer, mundos inteiros desaparecem e reaparecem",
        "Ano 2: Exércitos de dimensões alternativas são convocados, batalhas travadas em múltiplos planos simultaneamente",
        "Ano 3: O tempo começa a se comportar de forma errática, o passado e o futuro colidem no presente",
        "Ano 4: A própria estrutura da matéria começa a se desfazer, civilizações antigas emergem do esquecimento",
        "Ano 5: O ponto de singularidade se aproxima, onde todas as possibilidades convergem para um único destino"
      ]
    end

    def generate_extreme_climax
      "No momento em que o universo prestes a se desfazer, os irmãos descobrem que são manifestações da mesma consciência cósmica, separadas para aprender lições diferentes sobre poder e sacrifício."
    end

    def generate_extreme_resolution
      "Ao se unirem novamente, eles não apenas restauram o universo, mas o elevam a um novo nível de existência, onde todas as civilizações podem coexistir em harmonia através da compreensão fundamental da unidade cósmica."
    end

    def generate_extreme_epilogue
      "A lenda dos Irmãos Cósmicos se espalha por todas as realidades, tornando-se o arquétipo para a evolução futura de consciências em todo o multiverso, um lemb eterno de que a maior batalha é sempre interna."
    end

    def generate_extreme_title
      titles = [
        "A Convergência Final: Crônicas dos Irmãos Cósmicos",
        "Além do Tempo e do Espaço: A Guerra Universal",
        "O Eterno Retorno: A Profecia dos Dois",
        "Guardiões da Realidade: A Última Batalha",
        "Cantos da Criação: A Saga dos Irmãos Dimensionais"
      ]
      titles.sample
    end

    # Utility methods
    def deep_copy_story(story)
      Marshal.load(Marshal.dump(story))
    end

    def calculate_total_combinations
      intros = @templates[:introductions].length
      character_pairs = @templates[:character_pairs].length
      planet_combos = @templates[:planet_combinations].length
      conflicts = @templates[:conflict_reasons].length
      climaxes = @templates[:climaxes].length
      resolutions = @templates[:resolutions].length
      epilogues = @templates[:epilogues].length

      intros * character_pairs * planet_combos * conflicts * climaxes * resolutions * epilogues
    end
  end
end