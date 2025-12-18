# frozen_string_literal: true

module Gemkanbino
  # Module containing templates for the 5-year war story
  module StoryTemplates
    module WarOfTheFiveYears
      TEMPLATES = {
        epic: {
          introductions: [
            "No vasto infinito do cosmos, onde estrelas nascem e morrem como mortais, duas figuras lendárias ergueram-se como titãs. Irmãos de sangue, separados pela ambição e poder, governavam os maiores planetas conhecidos pela humanidade. Sua rivalidade incendiaria os céus por cinco longos anos.",
            "A cronologia galáctica marcaria para sempre o período conhecido como 'A Guerra dos Cinco Anos'. Tudo começou com uma promessa quebrada entre irmãos, evoluiu para uma disputa por recursos infinitos e culminou em uma guerra que ameaçou destruir toda a vida conhecida no universo.",
            "Quando os ancestrais registraram os primeiros conflitos interestelares, jamais imaginariam que a maior ameaça à paz galáctica viria não de alienígenas desconhecidos, mas do vínculo fraturado entre dois irmãos que controlavam os gigantes cósmicos."
          ],

          character_pairs: [
            {
              brother1: { name: "Orion", title: "O Conquistador", trait: "Ambicioso e implacável" },
              brother2: { name: "Lyra", title: "O Diplomata", trait: "Sábio e compassivo" }
            },
            {
              brother1: { name: "Thanatos", title: "O Senhor da Guerra", trait: "Estrategista brutal" },
              brother2: { name: "Elysium", title: "O Guardião da Paz", trait: "Defensor da justiça" }
            },
            {
              brother1: { name: "Nexus", title: "O Magnata", trait: "Mestre do comércio" },
              brother2: { name: "Aether", title: "O Visionário", trait: "Inovador tecnológico" }
            }
          ],

          planet_combinations: [
            {
              planet1: "Titan Majoris",
              planet2: "Colossus Prime",
              characteristics: "Gigantes gasosos com atmosferas ricas em elementos raros"
            },
            {
              planet1: "Hephaestus Omega",
              planet2: "Atlas Supremus",
              characteristics: "Planetas rochosos com núcleos de metais preciosos"
            },
            {
              planet1: "Kratos Maximus",
              planet2: "Zeus Imperialis",
              characteristics: "Super-Terras com gravidade intensa e recursos infinitos"
            }
          ],

          conflict_reasons: [
            "Disputa pelo Asteroide Dourado, fonte de energia que poderia sustentar ambos os impérios por milênios",
            "Controle do Portal Interestelar que conecta 47 sistemas solares diferentes",
            "Posse da Tecnologia Antiga dos Progenitores, capaz de transformar planetas inteiros",
            "Domínio sobre as Rotas Comerciais da Via Láctea Central",
            "Propriedade da Estação de Pesquisa Quântica que podia controlar o tempo"
          ],

          battle_descriptions: [
            "Frotas com milhares de naves colidiam no espaço profundo, criando tempestades de fogo que brilhavam mais que supernovas. Cada batalha durava semanas, com soldados lutando em condições impossíveis.",
            "Guerra assimétrica se desenvolveu, com táticas de guerrilha espacial e ataques surpresa que mudavam constantemente o equilíbrio de poder.",
            "Tecnologias de destruição em massa foram desenvolvidas e empregadas, alterando permanentemente paisagens planetárias e extinguindo civilizações menores."
          ],

          climaxes: [
            "Quando tudo parecia perdido para ambos os lados, uma civilização alienígena de outra dimensão emergiu, ameaçando consumir toda a matéria existente. Os irmãos foram forçados a unir forças contra este inimigo incompreensível.",
            "No auge da batalha final, um fenômeno natural cósmico sem precedentes - uma explosão de raios gama - ameaçou aniquilar ambos os planetas. A sobrevivência exigia cooperação imediata.",
            "A descoberta de uma profecia antiga revelou que apenas unidos os irmãos poderiam desvendar o mistério da criação do universo, um conhecimento que mudaria tudo."
          ],

          resolutions: [
            "Após derrotarem a ameaça comum, os irmãos estabeleceram um tratado histórico que unificou seus impérios. A guerra os tornara mais fortes individualmente, mas a paz os tornaria invencíveis juntos.",
            "Com seus recursos combinados e tecnologia compartilhada, eles criaram uma era de ouro para a galáxia. A rivalidade foi transformada em colaboração produtiva.",
            "O sacrifício mútuo durante a crise final criou um vínculo indestrutível. Eles governariam juntos como co-imperadores, instituindo um sistema de governo que duraria por gerações."
          ],

          epilogues: [
            "Cinco anos após o início das hostilidades, a Federação dos Planetas Unidos foi estabelecida. Kael e Zephyr, agora mais velhos e mais sábios, governavam como exemplos de como o conflito pode levar à evolução e paz duradoura.",
            "A guerra deixou cicatrizes profundas, mas também trouxe avanços tecnológicos que beneficiariam toda a humanidade. Os irmãos se tornaram lenda, seu conflito servindo como lição eterna sobre os perigos da divisão e o poder da união.",
            "Na nova ordem galáctica, os ex-inimigos se tornaram os pilares da paz. Sua história seria contada por milênios como o exemplo definitivo de como a maior guerra da história resultou na maior aliança jamais concebida."
          ]
        }
      }.freeze

      def self.get_random_element(category, subcategory = nil)
        if subcategory
          TEMPLATES.dig(:epic, category, subcategory)&.sample || ""
        else
          TEMPLATES.dig(:epic, category)&.sample || ""
        end
      end

      def self.get_all_elements(category)
        TEMPLATES.dig(:epic, category) || []
      end

      def self.variate_template(base_story, variation_level = :medium)
        case variation_level
        when :low
          apply_low_variation(base_story)
        when :medium
          apply_medium_variation(base_story)
        when :high
          apply_high_variation(base_story)
        else
          base_story
        end
      end

      private

      def self.apply_low_variation(story)
        story[:introduction] = get_random_element(:introductions)
        story[:characters] = generate_varied_characters
        story
      end

      def self.apply_medium_variation(story)
        story[:introduction] = get_random_element(:introductions)
        story[:characters] = generate_varied_characters
        story[:setting][:planets] = generate_varied_planets
        story[:conflict][:cause] = get_random_element(:conflict_reasons)
        story[:climax] = get_random_element(:climaxes)
        story[:resolution] = get_random_element(:resolutions)
        story[:epilogue] = get_random_element(:epilogues)
        story
      end

      def self.apply_high_variation(story)
        story[:introduction] = get_random_element(:introductions)
        story[:characters] = generate_varied_characters
        story[:setting][:planets] = generate_varied_planets
        story[:setting][:galaxy] = generate_random_galaxy_name
        story[:conflict][:cause] = get_random_element(:conflict_reasons)
        story[:conflict][:escalation] = get_random_element(:battle_descriptions)
        story[:development] = generate_varied_development
        story[:climax] = get_random_element(:climaxes)
        story[:resolution] = get_random_element(:resolutions)
        story[:epilogue] = get_random_element(:epilogues)
        story
      end

      def self.generate_varied_characters
        character_pair = get_random_element(:character_pairs)
        [
          {
            name: character_pair[:brother1][:name],
            role: "Irmão mais velho",
            planet: "", # Will be set based on planets
            description: character_pair[:brother1][:trait] + ", governante com visão expansionista"
          },
          {
            name: character_pair[:brother2][:name],
            role: "Irmão mais novo",
            planet: "", # Will be set based on planets
            description: character_pair[:brother2][:trait] + ", líder com perspectiva progressista"
          }
        ]
      end

      def self.generate_varied_planets
        planets = get_random_element(:planet_combinations)
        [
          {
            name: planets[:planet1],
            characteristics: planets[:characterities],
            population: "#{rand(5..20)} bilhões de habitantes"
          },
          {
            name: planets[:planet2],
            characteristics: planets[:characteristics],
            population: "#{rand(5..20)} bilhões de habitantes"
          }
        ]
      end

      def self.generate_random_galaxy_name
        galaxy_names = ["Centaurus", "Andromeda Secundus", "Triangulum Prime", "Magellanic Major", "Virgo Supercluster"]
        galaxy_names.sample
      end

      def self.generate_varied_development
        developments = []
        (1..5).each do |year|
          event = case year
                  when 1
                    ["Tensões diplomáticas aumentam", "Esquemas de espionagem começam", "Propaganda de guerra espalha-se"].sample
                  when 2
                    ["Primeiras batalhas navais ocorrem", "Planetas neutros são pressionados", "Recursos militares mobilizados"].sample
                  when 3
                    ["Alianças formadas e testadas", "Guerra total declarada", "Civilizações menores sofrem consequências"].sample
                  when 4
                    ["Tecnologias experimentais empregadas", "Perdas civis aumentam drasticamente", "Morais em ambos os lados vacilam"].sample
                  when 5
                    ["Exaustão generalizada", "Possibilidade de negociação surge", "Ameaça externa inesperada aparece"].sample
                  end
          developments << "Ano #{year}: #{event}"
        end
        developments
      end
    end
  end
end