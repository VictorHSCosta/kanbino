# frozen_string_literal: true

require 'spec_helper'
require_relative '../lib/gemkanbino/story_generator'

RSpec.describe Gemkanbino::StoryGenerator do
  describe '#initialize' do
    it 'initializes with default options' do
      generator = described_class.new
      expect(generator.title).to be_a(String)
      expect(generator.title).not_to be_empty
      expect(generator.instance_variable_get(:@genre)).to eq('sci_fi')
      expect(generator.instance_variable_get(:@length)).to eq(:medium)
    end

    it 'accepts custom options' do
      options = {
        title: 'Minha História Personalizada',
        genre: 'fantasy',
        length: :short
      }
      generator = described_class.new(options)
      expect(generator.title).to eq('Minha História Personalizada')
      expect(generator.instance_variable_get(:@genre)).to eq('fantasy')
      expect(generator.instance_variable_get(:@length)).to eq(:short)
    end
  end

  describe '#generate_war_story' do
    let(:generator) { described_class.new }
    let(:story_data) { generator.generate_war_story }

    it 'returns a complete story structure' do
      expect(story_data).to be_a(Hash)
      expect(story_data).to have_key(:title)
      expect(story_data).to have_key(:content)
      expect(story_data).to have_key(:metadata)
    end

    it 'generates a non-empty title' do
      expect(story_data[:title]).to be_a(String)
      expect(story_data[:title]).not_to be_empty
    end

    it 'creates all required content sections' do
      content = story_data[:content]
      required_sections = [:introduction, :characters, :setting, :conflict, :development, :climax, :resolution, :epilogue]

      required_sections.each do |section|
        expect(content).to have_key(section)
        expect(content[section]).not_to be_nil
      end
    end

    it 'generates exactly two characters' do
      characters = story_data[:content][:characters]
      expect(characters).to be_a(Array)
      expect(characters.length).to eq(2)

      characters.each do |character|
        expect(character).to have_key(:name)
        expect(character).to have_key(:role)
        expect(character).to have_key(:description)
      end
    end

    it 'generates 5-year development timeline' do
      development = story_data[:content][:development]
      expect(development).to be_a(Array)
      expect(development.length).to eq(5)

      development.each_with_index do |event, index|
        expect(event).to be_a(String)
        expect(event).to include("Ano #{index + 1}")
      end
    end

    it 'includes complete metadata' do
      metadata = story_data[:metadata]
      expect(metadata).to have_key(:created_at)
      expect(metadata).to have_key(:genre)
      expect(metadata).to have_key(:word_count)
      expect(metadata).to have_key(:tags)
      expect(metadata).to have_key(:language)
    end

    it 'generates story with custom parameters' do
      custom_params = {
        brother1_name: 'Arthur',
        brother2_name: 'Merlin',
        planet1_name: 'Camelot Prime',
        planet2_name: 'Avalon Secundus'
      }
      generator = described_class.new(custom_params: custom_params)
      story_data = generator.generate_war_story

      characters = story_data[:content][:characters]
      expect(characters[0][:name]).to eq('Arthur')
      expect(characters[1][:name]).to eq('Merlin')
    end
  end

  describe 'story content quality' do
    let(:generator) { described_class.new }
    let(:story_data) { generator.generate_war_story }

    it 'generates coherent content' do
      content = story_data[:content]

      # Introduction should be substantial
      expect(content[:introduction].length).to be > 50

      # Characters should have descriptions
      content[:characters].each do |character|
        expect(character[:description].length).to be > 20
      end

      # Conflict should have cause
      expect(content[:conflict][:cause].length).to be > 30

      # Climax and resolution should be substantial
      expect(content[:climax].length).to be > 50
      expect(content[:resolution].length).to be > 50
    end

    it 'maintains consistent theme' do
      content = story_data[:content]
      full_text = content.values.join(' ').downcase

      # Should contain war-related terms
      expect(full_text).to include('guerra')
      expect(full_text).to include('irmãos')
      expect(full_text).to include('planeta')
    end
  end

  describe 'variations' do
    it 'produces different stories with variation enabled' do
      generator1 = described_class.new(variation: :medium)
      generator2 = described_class.new(variation: :medium)

      story1 = generator1.generate_war_story
      story2 = generator2.generate_war_story

      # Titles should be different
      expect(story1[:title]).not_to eq(story2[:title])
    end

    it 'can produce identical stories with no variation' do
      generator1 = described_class.new(variation: :none, title: 'Teste Fixo')
      generator2 = described_class.new(variation: :none, title: 'Teste Fixo')

      story1 = generator1.generate_war_story
      story2 = generator2.generate_war_story

      # Content should be identical
      expect(story1[:content][:introduction]).to eq(story2[:content][:introduction])
    end
  end

  describe 'edge cases' do
    it 'handles empty custom parameters gracefully' do
      generator = described_class.new(custom_params: {})
      expect { generator.generate_war_story }.not_to raise_error
    end

    it 'handles nil custom parameters' do
      generator = described_class.new(custom_params: nil)
      expect { generator.generate_war_story }.not_to raise_error
    end

    it 'generates valid story with minimum options' do
      generator = described_class.new
      story_data = generator.generate_war_story

      expect(story_data[:title]).to be_a(String)
      expect(story_data[:content]).to be_a(Hash)
      expect(story_data[:metadata]).to be_a(Hash)
    end
  end

  describe 'word count calculation' do
    it 'calculates reasonable word count' do
      generator = described_class.new
      story_data = generator.generate_war_story

      word_count = story_data[:metadata][:word_count]
      expect(word_count).to be > 100
      expect(word_count).to be < 10000
    end
  end

  describe 'genre handling' do
    it 'accepts different genres' do
      genres = ['sci_fi', 'fantasy', 'drama']
      genres.each do |genre|
        generator = described_class.new(genre: genre)
        story_data = generator.generate_war_story
        expect(story_data[:metadata][:genre]).to eq(genre)
      end
    end
  end
end