# frozen_string_literal: true

require "spec_helper"
require "fileutils"

RSpec.describe Gemkanbino::StoryManager do
  let(:story_manager) { described_class.new }
  let(:test_title) { "Test Story" }
  let(:test_template) { "guerra_irmaos_planetas" }

  before(:all) do
    # Initialize templates for tests
    Gemkanbino::StoryTemplates.load_builtin_templates
  end

  after(:each) do
    # Clean up test stories
    story_manager.storage.instance_variable_get(:@index).clear
    story_manager.storage.send(:save_index)
  end

  describe "#create_story" do
    it "creates a story with valid parameters" do
      result = story_manager.create_story(test_title, test_template)

      expect(result).to eq(test_title)
      expect(story_manager.storage.story_exists?(test_title)).to be true
    end

    it "creates story with metadata" do
      story_manager.create_story(test_title, test_template)
      story_data = story_manager.storage.get_story(test_title)

      expect(story_data[:metadata]["title"]).to eq(test_title)
      expect(story_data[:metadata]["template"]).to eq(test_template)
      expect(story_data[:metadata]["chapters"]).to be > 0
      expect(story_data[:metadata]["word_count"]).to be > 0
    end

    it "raises error for empty title" do
      expect {
        story_manager.create_story("", test_template)
      }.to raise_error(Gemkanbino::Exceptions::StoryError)
    end

    it "raises error for invalid template" do
      expect {
        story_manager.create_story(test_title, "invalid_template")
      }.to raise_error(Gemkanbino::Exceptions::StoryError)
    end

    it "raises error for duplicate title" do
      story_manager.create_story(test_title, test_template)

      expect {
        story_manager.create_story(test_title, test_template)
      }.to raise_error(Gemkanbino::Exceptions::StoryError, /already exists/)
    end

    it "accepts story options" do
      options = {
        brother1_name: "Test Brother 1",
        brother2_name: "Test Brother 2",
        ending_type: "tragedy"
      }

      story_manager.create_story(test_title, test_template, options)
      story_data = story_manager.storage.get_story(test_title)

      expect(story_data[:chapters]).not_to be_empty
      expect(story_data[:metadata]["options"]["brother1_name"]).to eq("Test Brother 1")
    end
  end

  describe "#list_stories" do
    before do
      story_manager.create_story(test_title, test_template)
    end

    it "lists existing stories" do
      expect { story_manager.list_stories }.not_to raise_error
    end

    it "filters stories by query" do
      story_manager.create_story("Another Story", test_template)
      filtered_stories = story_manager.storage.list_stories("Test")

      expect(filtered_stories.length).to eq(1)
      expect(filtered_stories.first[:title]).to eq(test_title)
    end
  end

  describe "#show_story" do
    before do
      story_manager.create_story(test_title, test_template)
    end

    it "displays existing story" do
      expect { story_manager.show_story(test_title) }.not_to raise_error
    end

    it "handles non-existent story" do
      expect { story_manager.show_story("Non-existent") }.not_to raise_error
    end
  end

  describe "#delete_story" do
    before do
      story_manager.create_story(test_title, test_template)
    end

    it "deletes existing story" do
      expect(story_manager.storage.story_exists?(test_title)).to be true

      # Mock prompt to return true for confirmation
      allow(story_manager.prompt).to receive(:yes?).and_return(true)

      result = story_manager.delete_story(test_title)

      expect(result).to be true
      expect(story_manager.storage.story_exists?(test_title)).to be false
    end

    it "handles non-existent story" do
      expect(story_manager.delete_story("Non-existent")).to be false
    end
  end

  describe "#search_stories" do
    before do
      story_manager.create_story("Story about planets", test_template)
      story_manager.create_story("Another story", test_template)
    end

    it "finds stories matching query" do
      expect { story_manager.search_stories("planets") }.not_to raise_error
    end

    it "returns empty results for no matches" do
      expect { story_manager.search_stories("nonexistent") }.not_to raise_error
    end
  end

  describe "#get_story_info" do
    before do
      story_manager.create_story(test_title, test_template)
    end

    it "displays story information" do
      expect { story_manager.get_story_info(test_title) }.not_to raise_error
    end

    it "handles non-existent story" do
      expect { story_manager.get_story_info("Non-existent") }.not_to raise_error
    end
  end

  describe "#export_story" do
    before do
      story_manager.create_story(test_title, test_template)
    end

    it "exports story to markdown" do
      tmp_dir = Dir.mktmpdir
      destination = File.join(tmp_dir, "test_export.md")

      result = story_manager.export_story(test_title, "markdown", destination)

      expect(result).to be true
      expect(File.exist?(destination)).to be true

      FileUtils.rm_rf(tmp_dir)
    end

    it "exports story to text format" do
      tmp_dir = Dir.mktmpdir

      result = story_manager.export_story(test_title, "txt", tmp_dir)

      expect(result).to be true

      FileUtils.rm_rf(tmp_dir)
    end

    it "handles non-existent story" do
      result = story_manager.export_story("Non-existent", "markdown")

      expect(result).to be false
    end
  end

  describe "#list_templates" do
    it "lists available templates" do
      expect { story_manager.list_templates }.not_to raise_error
    end
  end
end