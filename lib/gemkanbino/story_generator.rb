# frozen_string_literal: true

require 'json'
require 'date'
require_relative 'story_templates'
require_relative 'story_variator'

module Gemkanbino
  # Main class for generating fictional stories about the 5-year war
  # between two brothers over the largest planets in the world
  class StoryGenerator
    attr_reader :title, :content, :metadata

    def initialize(options = {})
      @title = options[:title] || generate_title
      @genre = options[:genre] || 'sci_fi'
      @length = options[:length] || :medium
      @interactive = options[:interactive] || false
      @custom_params = options[:custom_params] || {}
      @variation_level = options[:variation] || :medium
      @content = {}
      @metadata = {}
      @variator = StoryVariator.new
    end

    def generate_war_story
      build_story_structure
      populate_story_content
      add_metadata

      # Apply variations if specified
      story_data = {
        title: @title,
        content: @content,
        metadata: @metadata
      }

      if @variation_level != :none
        story_data = @variator.vary_story(story_data, @variation_level)
      end

      story_data
    end

    private

    def build_story_structure
      @content = {
        introduction: '',
        characters: [],
        setting: {},
        conflict: {},
        development: [],
        climax: '',
        resolution: '',
        epilogue: ''
      }
    end

    def populate_story_content
      @content[:introduction] = generate_introduction
      @content[:characters] = generate_characters
      @content[:setting] = generate_setting
      @content[:conflict] = generate_conflict
      @content[:development] = generate_development
      @content[:climax] = generate_climax
      @content[:resolution] = generate_resolution
      @content[:epilogue] = generate_epilogue
    end

    def generate_introduction
      "Há muito tempo, em uma galáxia distante, dois irmãos poderosos governavam os maiores planetas do universo. Sua rivalidade daria início a uma guerra que duraria cinco anos e mudaria o destino de todos os mundos."
    end

    def generate_characters
      [
        {
          name: @custom_params[:brother1_name] || "Kael",
          role: "Irmão mais velho",
          planet: @custom_params[:planet1_name] || "Megatron Prime",
          description: "Governante sábio mas ambicioso, busca controle total sobre os recursos galácticos"
        },
        {
          name: @custom_params[:brother2_name] || "Zephyr",
          role: "Irmão mais novo",
          planet: @custom_params[:planet2_name] || "Omega Supremus",
          description: "Líder carismático com visão progressista para o futuro da galáxia"
        }
      ]
    end

    def generate_setting
      {
        galaxy: @custom_params[:galaxy_name] || "Andromeda Central",
        time_period: "Século 25",
        planets: [
          {
            name: "Megatron Prime",
            characteristics: "Planeta gigante gasoso com recursos minerais infinitos",
            population: "12 bilhões de habitantes"
          },
          {
            name: "Omega Supremus",
            characteristics: "Planeta rochoso com tecnologia avançada e exército poderoso",
            population: "8 bilhões de habitantes"
          }
        ]
      }
    end

    def generate_conflict
      {
        cause: "Disputa pelo controle do Asteroide Rica, fonte de energia que alimentaria ambos os planetas por séculos",
        escalation: "Pequenas escaramuças evoluíram para batalhas em escala galáctica",
        stakes: "O destino da humanidade e o equilíbrio galáctico estavam em jogo"
      }
    end

    def generate_development
      [
        "Ano 1: Conflitos diplomáticos falham, começa a guerra fria entre os planetas",
        "Ano 2: Primeiras batalhas espaciais, ambos os lados sofrem perdas significativas",
        "Ano 3: Alianças se formam, outros planetas são forçados a escolher um lado",
        "Ano 4: Guerra atinge seu ponto mais brutal, tecnologias de destruição em massa são empregadas",
        "Ano 5: Exaustos, os irmãos consideram a paz enquanto enfrentam ameaça comum"
      ]
    end

    def generate_climax
      "Durante a batalha final no Asteroide Rica, uma raça alienígena desconhecida emerge do espaço profundo, ameaçando ambos os planetas. Os irmãos são forçados a se unir contra este inimigo comum."
    end

    def generate_resolution
      "Com a ajuda mútua, Kael e Zephyr conseguem repelir a invasão alienígena. A experiência os ensina que sua rivalidade era insignificante comparada às ameaças do universo."
    end

    def generate_epilogue
      "Cinco anos após o início da guerra, os dois irmãos estabelecem uma aliança eterna. Juntos, eles criam a Federação dos Planetas Unidos, garantindo paz e prosperidade para toda a galáxia. A guerra os tornou mais fortes e mais sábios."
    end

    def add_metadata
      @metadata = {
        created_at: Time.now.iso8601,
        genre: @genre,
        length: @length,
        word_count: calculate_word_count,
        tags: generate_tags,
        theme: "guerra, família, redenção, espaço",
        language: "pt-BR"
      }
    end

    def calculate_word_count
      full_text = @content.values.join(' ')
      full_text.split.length
    end

    def generate_tags
      ['ficção científica', 'guerra', 'irmãos', 'espaço', 'planetas', 'conflito', 'redenção']
    end

    def generate_title
      titles = [
        "A Guerra dos Cinco Anos: A Lenda dos Dois Irmãos",
        "Planetas em Conflito: A Batalha de Cinco Anos",
        "A Lenda dos Gigantes: Guerra de Irmãos",
        "Cinco Anos de Escuridão: A Guerra dos Planetas",
        "Irmãos de Lutas: A Batalha pelos Maiores Planetas"
      ]
      titles.sample
    end
  end
end