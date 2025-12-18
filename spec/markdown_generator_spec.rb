# frozen_string_literal: true

require 'spec_helper'
require_relative '../lib/gemkanbino/markdown_generator'

RSpec.describe Gemkanbino::MarkdownGenerator do
  describe '#initialize' do
    it 'initializes with default options' do
      generator = described_class.new
      expect(generator.instance_variable_get(:@include_toc)).to be true
      expect(generator.instance_variable_get(:@include_metadata)).to be true
    end

    it 'accepts custom options' do
      options = {
        include_toc: false,
        include_metadata: false,
        formatting_style: :minimal
      }
      generator = described_class.new(options)
      expect(generator.instance_variable_get(:@include_toc)).to be false
      expect(generator.instance_variable_get(:@include_metadata)).to be false
    end
  end

  describe '#generate' do
    let(:generator) { described_class.new }
    let(:sample_story_data) do
      {
        title: 'A Guerra dos Irmãos',
        content: {
          introduction: 'Esta é a história de uma grande guerra.',
          characters: [
            {
              name: 'Arthur',
              role: 'Irmão mais velho',
              planet: 'Terra Nova',
              description: 'Um líder sábio e corajoso'
            },
            {
              name: 'Lancelot',
              role: 'Irmão mais novo',
              planet: 'Marte Prime',
              description: 'Um guerreiro habilidoso'
            }
          ],
          setting: {
            galaxy: 'Via Láctea Central',
            time_period: 'Século 25',
            planets: [
              {
                name: 'Terra Nova',
                characteristics: 'Planeta rico em recursos minerais',
                population: '10 bilhões'
              },
              {
                name: 'Marte Prime',
                characteristics: 'Planeta industrializado',
                population: '8 bilhões'
              }
            ]
          },
          conflict: {
            cause: 'Disputa por recursos limitados',
            escalation: 'Batalhas intensificam-se',
            stakes: 'A sobrevivência de ambos os mundos'
          },
          development: [
            'Ano 1: Tensões diplomáticas aumentam',
            'Ano 2: Primeiras batalhas ocorrem',
            'Ano 3: Guerra total declarada',
            'Ano 4: Tecnologias experimentais usadas',
            'Ano 5: Negociações de paz começam'
          ],
          climax: 'A batalha final decide o destino da galáxia.',
          resolution: 'A paz é finalmente alcançada.',
          epilogue: 'A história serve como lição para futuras gerações.'
        },
        metadata: {
          created_at: '2024-01-15T10:30:00Z',
          genre: 'sci_fi',
          word_count: 500,
          tags: ['ficção científica', 'guerra', 'irmãos'],
          theme: 'conflito, redenção',
          language: 'pt-BR'
        }
      }
    end

    it 'generates valid markdown content' do
      markdown = generator.generate(sample_story_data)
      expect(markdown).to be_a(String)
      expect(markdown).not_to be_empty
    end

    it 'includes the story title' do
      markdown = generator.generate(sample_story_data)
      expect(markdown).to include('# A Guerra dos Irmãos')
    end

    it 'includes table of contents by default' do
      markdown = generator.generate(sample_story_data)
      expect(markdown).to include('## Índice')
      expect(markdown).to include('[Introdução](#introdução)')
      expect(markdown).to include('[Personagens](#personagens)')
    end

    it 'includes metadata by default' do
      markdown = generator.generate(sample_story_data)
      expect(markdown).to include('## Informações da História')
      expect(markdown).to include('Gênero:')
      expect(markdown).to include('Data de Criação:')
      expect(markdown).to include('Contagem de Palavras:')
    end

    it 'includes all content sections' do
      markdown = generator.generate(sample_story_data)

      expect(markdown).to include('## Introdução')
      expect(markdown).to include('## Personagens')
      expect(markdown).to include('## Cenário')
      expect(markdown).to include('## O Conflito')
      expect(markdown).to include('## Desenvolvimento da Guerra')
      expect(markdown).to include('## O Clímax')
      expect(markdown).to include('## Resolução')
      expect(markdown).to include('## Epílogo')
    end

    it 'formats characters correctly' do
      markdown = generator.generate(sample_story_data)

      expect(markdown).to include('### Arthur')
      expect(markdown).to include('**Função:** Irmão mais velho')
      expect(markdown).to include('**Descrição:** Um líder sábio e corajoso')

      expect(markdown).to include('### Lancelot')
      expect(markdown).to include('**Função:** Irmão mais novo')
    end

    it 'formats setting information correctly' do
      markdown = generator.generate(sample_story_data)

      expect(markdown).to include('**Galáxia:** Via Láctea Central')
      expect(markdown).to include('**Período de Tempo:** Século 25')
      expect(markdown).to include('### Terra Nova')
      expect(markdown).to include('### Marte Prime')
    end

    it 'formats conflict section correctly' do
      markdown = generator.generate(sample_story_data)

      expect(markdown).to include('### Causa da Guerra')
      expect(markdown).to include('Disputa por recursos limitados')
      expect(markdown).to include('### Escalada')
      expect(markdown).to include('### O que estava em jogo')
    end

    it 'formats development timeline as list' do
      markdown = generator.generate(sample_story_data)

      expect(markdown).to include('- **Ano 1: Tensões diplomáticas aumentam**')
      expect(markdown).to include('- **Ano 2: Primeiras batalhas ocorrem**')
    end

    it 'includes footer information' do
      markdown = generator.generate(sample_story_data)

      expect(markdown).to include('História gerada por Gemkanbino')
      expect(markdown).to include('Esta é uma obra de ficção')
    end
  end

  describe 'option handling' do
    let(:sample_story_data) do
      {
        title: 'Test Story',
        content: {
          introduction: 'Test introduction.',
          characters: [],
          setting: {},
          conflict: {},
          development: [],
          climax: 'Test climax.',
          resolution: 'Test resolution.',
          epilogue: 'Test epilogue.'
        },
        metadata: {}
      }
    end

    it 'can exclude table of contents' do
      generator = described_class.new(include_toc: false)
      markdown = generator.generate(sample_story_data)
      expect(markdown).not_to include('## Índice')
    end

    it 'can exclude metadata' do
      generator = described_class.new(include_metadata: false)
      markdown = generator.generate(sample_story_data)
      expect(markdown).not_to include('## Informações da História')
    end
  end

  describe 'edge cases' do
    it 'handles empty characters array' do
      story_data = {
        title: 'Test',
        content: {
          introduction: 'Test.',
          characters: [],
          setting: {},
          conflict: {},
          development: [],
          climax: 'Test.',
          resolution: 'Test.',
          epilogue: 'Test.'
        },
        metadata: {}
      }

      generator = described_class.new
      expect { generator.generate(story_data) }.not_to raise_error
    end

    it 'handles missing optional metadata' do
      story_data = {
        title: 'Test',
        content: {
          introduction: 'Test.',
          characters: [],
          setting: {},
          conflict: {},
          development: [],
          climax: 'Test.',
          resolution: 'Test.',
          epilogue: 'Test.'
        },
        metadata: {}
      }

      generator = described_class.new
      markdown = generator.generate(story_data)
      expect(markdown).to be_a(String)
    end

    it 'handles special characters in content' do
      story_data = {
        title: 'História com Caracteres Especiais: !@#$%',
        content: {
          introduction: 'Conteúdo com "aspas" e \'apóstrofos\'.',
          characters: [{ name: 'Nome & Sobrenome', role: 'Papel', description: 'Descrição' }],
          setting: {},
          conflict: {},
          development: [],
          climax: 'Clímax.',
          resolution: 'Resolução.',
          epilogue: 'Epílogo.'
        },
        metadata: {}
      }

      generator = described_class.new
      expect { generator.generate(story_data) }.not_to raise_error
    end
  end

  describe 'markdown formatting' do
    let(:generator) { described_class.new }
    let(:sample_story_data) do
      {
        title: 'Test Story',
        content: {
          introduction: 'This is a test story.',
          characters: [{ name: 'Test Character', role: 'Protagonist', description: 'A test character' }],
          setting: { galaxy: 'Test Galaxy', time_period: 'Future', planets: [] },
          conflict: { cause: 'Test conflict', escalation: 'Test escalation', stakes: 'Test stakes' },
          development: ['Year 1: Test event'],
          climax: 'Test climax.',
          resolution: 'Test resolution.',
          epilogue: 'Test epilogue.'
        },
        metadata: {
          created_at: '2024-01-15T10:30:00Z',
          genre: 'sci_fi',
          word_count: 100,
          tags: ['test'],
          theme: 'test',
          language: 'pt-BR'
        }
      }
    end

    it 'uses proper markdown headers' do
      markdown = generator.generate(sample_story_data)
      lines = markdown.split("\n")

      # Should have H1 for title
      expect(lines).to include('# Test Story')

      # Should have H2 for main sections
      expect(lines).to include('## Introdução')
      expect(lines).to include('## Personagens')

      # Should have H3 for subsections
      expect(lines).to include('### Test Character')
    end

    it 'uses proper markdown formatting for bold text' do
      markdown = generator.generate(sample_story_data)
      expect(markdown).to include('**Função:**')
      expect(markdown).to include('**Descrição:**')
    end

    it 'includes horizontal rules for separation' do
      markdown = generator.generate(sample_story_data)
      expect(markdown).to include('---')
    end
  end
end