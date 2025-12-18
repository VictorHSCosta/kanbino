# frozen_string_literal: true

require 'spec_helper'
require_relative '../lib/gemkanbino/cli'
require_relative '../lib/gemkanbino/local_storage'

RSpec.describe 'Story Commands Integration' do
  let(:cli) { Gemkanbino::CLI.new }
  let(:temp_storage_dir) { Dir.mktmpdir }

  before do
    # Override storage directory for testing
    allow(Dir).to receive(:home).and_return(temp_storage_dir)
  end

  after do
    FileUtils.rm_rf(temp_storage_dir) if Dir.exist?(temp_storage_dir)
  end

  describe 'story generation command' do
    it 'generates a story with basic options' do
      expect { cli.story }.not_to raise_error
    end

    it 'accepts custom title' do
      expect { cli.story(title: 'Minha História de Teste') }.not_to raise_error
    end

    it 'accepts different genres' do
      genres = ['sci_fi', 'fantasy', 'drama']
      genres.each do |genre|
        expect { cli.story(genre: genre) }.not_to raise_error
      end
    end

    it 'accepts different lengths' do
      lengths = ['short', 'medium', 'long']
      lengths.each do |length|
        expect { cli.story(length: length) }.not_to raise_error
      end
    end

    it 'accepts variation levels' do
      variations = ['none', 'low', 'medium', 'high']
      variations.each do |variation|
        expect { cli.story(variation: variation) }.not_to raise_error
      end
    end
  end

  describe 'story saving functionality' do
    it 'saves story when save option is provided' do
      expect { cli.story(title: 'História para Salvar', save: true) }.not_to raise_error
    end

    it 'creates story in storage' do
      storage = Gemkanbino::LocalStorage.new
      initial_count = storage.list_stories.length

      cli.story(title: 'História Teste Storage', save: true)

      final_count = storage.list_stories.length
      expect(final_count).to eq(initial_count + 1)
    end
  end

  describe 'story management commands' do
    let(:storage) { Gemkanbino::LocalStorage.new }
    let(:test_title) { 'História de Teste para Gerenciamento' }

    before do
      # Create a test story for management operations
      generator = Gemkanbino::StoryGenerator.new(title: test_title)
      story_data = generator.generate_war_story
      markdown_gen = Gemkanbino::MarkdownGenerator.new
      markdown_content = markdown_gen.generate(story_data)

      storage.save_generated_story(test_title, "#{test_title.downcase.gsub(/[^a-z0-9\s]/, '').gsub(/\s+/, '_')}.md", markdown_content)
    end

    it 'lists saved stories' do
      expect { cli.stories(action: 'list') }.not_to raise_error
    end

    it 'shows specific story content' do
      expect { cli.stories(action: 'show', title: test_title) }.not_to raise_error
    end

    it 'deletes specific story' do
      initial_count = storage.list_stories.length
      cli.stories(action: 'delete', title: test_title)
      final_count = storage.list_stories.length

      expect(final_count).to eq(initial_count - 1)
    end

    it 'handles non-existent story gracefully' do
      expect { cli.stories(action: 'show', title: 'História Inexistente') }.not_to raise_error
    end

    it 'handles invalid action gracefully' do
      expect { cli.stories(action: 'invalid') }.not_to raise_error
    end
  end

  describe 'story generation with custom parameters' do
    it 'handles interactive mode simulation' do
      # This would normally prompt for user input
      # For testing, we'll simulate the response
      custom_params = {
        brother1_name: 'Arthur Test',
        brother2_name: 'Merlin Test',
        planet1_name: 'Camelot Test',
        planet2_name: 'Avalon Test',
        galaxy_name: 'Galáxia Test'
      }

      generator = Gemkanbino::StoryGenerator.new(custom_params: custom_params)
      story_data = generator.generate_war_story

      characters = story_data[:content][:characters]
      expect(characters[0][:name]).to eq('Arthur Test')
      expect(characters[1][:name]).to eq('Merlin Test')
    end
  end

  describe 'integration between components' do
    it 'generates story and converts to markdown successfully' do
      generator = Gemkanbino::StoryGenerator.new(title: 'História Integração')
      story_data = generator.generate_war_story

      markdown_gen = Gemkanbino::MarkdownGenerator.new
      markdown_content = markdown_gen.generate(story_data)

      expect(markdown_content).to be_a(String)
      expect(markdown_content).not_to be_empty
      expect(markdown_content).to include('História Integração')
    end

    it 'generates and saves story with all metadata' do
      generator = Gemkanbino::StoryGenerator.new(
        title: 'História Completa',
        genre: 'fantasy',
        length: :long,
        variation: :high
      )
      story_data = generator.generate_war_story

      expect(story_data[:metadata][:genre]).to eq('fantasy')
      expect(story_data[:metadata][:word_count]).to be > 0
      expect(story_data[:metadata][:tags]).not_to be_empty
    end
  end

  describe 'error handling' do
    it 'handles very long titles gracefully' do
      long_title = 'A' * 250
      expect { cli.story(title: long_title) }.not_to raise_error
    end

    it 'handles invalid genre gracefully' do
      expect { cli.story(genre: 'invalid_genre') }.not_to raise_error
    end

    it 'handles invalid length gracefully' do
      expect { cli.story(length: 'invalid_length') }.not_to raise_error
    end

    it 'handles storage permission errors gracefully' do
      # Mock a storage permission error
      allow_any_instance_of(Gemkanbino::LocalStorage).to receive(:save_generated_story).and_raise(Errno::EACCES)

      expect { cli.story(title: 'Test', save: true) }.not_to raise_error
    end
  end

  describe 'story variation functionality' do
    it 'produces different stories with high variation' do
      generator1 = Gemkanbino::StoryGenerator.new(title: 'Test', variation: :high)
      generator2 = Gemkanbino::StoryGenerator.new(title: 'Test', variation: :high)

      story1 = generator1.generate_war_story
      story2 = generator2.generate_war_story

      # With high variation, stories should be different
      expect(story1[:content][:introduction]).not_to eq(story2[:content][:introduction])
    end

    it 'produces identical stories with no variation' do
      generator1 = Gemkanbino::StoryGenerator.new(title: 'Test', variation: :none)
      generator2 = Gemkanbino::StoryGenerator.new(title: 'Test', variation: :none)

      story1 = generator1.generate_war_story
      story2 = generator2.generate_war_story

      # With no variation, stories should be identical
      expect(story1[:content][:introduction]).to eq(story2[:content][:introduction])
    end
  end

  describe 'story validation integration' do
    it 'validates story content during generation' do
      generator = Gemkanbino::StoryGenerator.new
      story_data = generator.generate_war_story

      # Basic structure validation
      expect(story_data[:content]).to have_key(:introduction)
      expect(story_data[:content]).to have_key(:characters)
      expect(story_data[:content]).to have_key(:setting)
      expect(story_data[:content]).to have_key(:conflict)
      expect(story_data[:content]).to have_key(:development)
      expect(story_data[:content]).to have_key(:climax)
      expect(story_data[:content]).to have_key(:resolution)
      expect(story_data[:content]).to have_key(:epilogue)

      # Characters validation
      expect(story_data[:content][:characters]).to be_a(Array)
      expect(story_data[:content][:characters].length).to eq(2)

      # Development validation
      expect(story_data[:content][:development]).to be_a(Array)
      expect(story_data[:content][:development].length).to eq(5)
    end
  end

  describe 'full workflow integration' do
    it 'completes full story generation and management workflow' do
      # 1. Generate story
      cli.story(title: 'Workflow Test Story', save: true)

      # 2. List stories to verify it was saved
      expect { cli.stories(action: 'list') }.not_to raise_error

      # 3. Show the story
      expect { cli.stories(action: 'show', title: 'Workflow Test Story') }.not_to raise_error

      # 4. Delete the story
      expect { cli.stories(action: 'delete', title: 'Workflow Test Story') }.not_to raise_error

      # Verify workflow completed without errors
      storage = Gemkanbino::LocalStorage.new
      found_story = storage.list_stories.find { |s| s[:title] == 'Workflow Test Story' }
      expect(found_story).to be_nil
    end
  end
end