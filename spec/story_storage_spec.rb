# frozen_string_literal: true

require "spec_helper"
require "fileutils"
require "tmpdir"

RSpec.describe Gemkanbino::StoryStorage do
  let(:storage) { described_class.new }
  let(:test_title) { "Test Story Title" }
  let(:test_story_data) do
    {
      title: test_title,
      chapters: [
        {
          title: "Chapter 1",
          content: "This is the first chapter of the test story. It contains some content to test the storage functionality."
        },
        {
          title: "Chapter 2",
          content: "This is the second chapter. More content here to ensure the story is substantial enough for testing purposes."
        }
      ]
    }
  end
  let(:test_metadata) do
    {
      title: test_title,
      template: "test_template",
      created_at: Time.now.iso8601,
      chapters: 2,
      word_count: 30,
      characters: ["Character 1", "Character 2"],
      genres: ["Test", "Fiction"],
      tags: ["test", "storage"]
    }
  end

  around(:each) do |example|
    # Use a temporary directory for test storage
    Dir.mktmpdir do |tmpdir|
      original_storage_root = storage.instance_variable_get(:@storage_root)
      storage.instance_variable_set(:@storage_root, File.join(tmpdir, "test_stories"))
      storage.send(:ensure_storage_directory)

      example.run

      # Clean up
      storage.instance_variable_set(:@storage_root, original_storage_root)
    end
  end

  describe "#save_story" do
    it "saves story data and metadata" do
      result = storage.save_story(test_title, test_story_data, test_metadata)

      expect(result).to be true
      expect(storage.story_exists?(test_title)).to be true
    end

    it "creates necessary files" do
      storage.save_story(test_title, test_story_data, test_metadata)

      safe_title = storage.send(:sanitize_title, test_title)
      story_dir = File.join(storage.instance_variable_get(:@storage_root), safe_title)

      expect(Dir.exist?(story_dir)).to be true
      expect(File.exist?(File.join(story_dir, "#{safe_title}.md"))).to be true
      expect(File.exist?(File.join(story_dir, "metadata.json"))).to be true
      expect(File.exist?(File.join(story_dir, "story_data.json"))).to be true
    end

    it "updates index" do
      storage.save_story(test_title, test_story_data, test_metadata)
      index = storage.instance_variable_get(:@index)

      expect(index).to have_key(storage.send(:sanitize_title, test_title))
    end

    it "raises error for nil title" do
      expect {
        storage.save_story(nil, test_story_data, test_metadata)
      }.to raise_error(ArgumentError, /Title cannot be empty/)
    end

    it "raises error for empty title" do
      expect {
        storage.save_story("", test_story_data, test_metadata)
      }.to raise_error(ArgumentError, /Title cannot be empty/)
    end

    it "raises error for nil story data" do
      expect {
        storage.save_story(test_title, nil, test_metadata)
      }.to raise_error(ArgumentError, /Story data cannot be nil/)
    end
  end

  describe "#get_story" do
    before do
      storage.save_story(test_title, test_story_data, test_metadata)
    end

    it "retrieves saved story" do
      story = storage.get_story(test_title)

      expect(story).not_to be_nil
      expect(story[:title]).to eq(test_title)
      expect(story[:chapters]).to eq(test_story_data[:chapters])
      expect(story[:metadata]).to eq(test_metadata)
    end

    it "returns nil for non-existent story" do
      story = storage.get_story("Non-existent Story")
      expect(story).to be_nil
    end
  end

  describe "#list_stories" do
    before do
      storage.save_story("Story 1", test_story_data, test_metadata.merge("title" => "Story 1"))
      storage.save_story("Story 2", test_story_data, test_metadata.merge("title" => "Story 2"))
    end

    it "lists all stories" do
      stories = storage.list_stories

      expect(stories.length).to eq(2)
      expect(stories.map { |s| s[:title] }).to include("Story 1", "Story 2")
    end

    it "filters stories" do
      filtered = storage.list_stories("Story 1")

      expect(filtered.length).to eq(1)
      expect(filtered.first[:title]).to eq("Story 1")
    end

    it "returns empty list when no stories exist" do
      # Clear the storage
      storage.instance_variable_set(:@index, {})
      storage.send(:save_index)

      stories = storage.list_stories
      expect(stories).to be_empty
    end
  end

  describe "#delete_story" do
    before do
      storage.save_story(test_title, test_story_data, test_metadata)
    end

    it "deletes existing story" do
      expect(storage.story_exists?(test_title)).to be true

      result = storage.delete_story(test_title)

      expect(result).to be true
      expect(storage.story_exists?(test_title)).to be false
    end

    it "removes story files" do
      safe_title = storage.send(:sanitize_title, test_title)
      story_dir = File.join(storage.instance_variable_get(:@storage_root), safe_title)

      storage.delete_story(test_title)

      expect(Dir.exist?(story_dir)).to be false
    end

    it "removes from index" do
      storage.delete_story(test_title)
      index = storage.instance_variable_get(:@index)

      expect(index).not_to have_key(storage.send(:sanitize_title, test_title))
    end

    it "returns false for non-existent story" do
      result = storage.delete_story("Non-existent Story")
      expect(result).to be false
    end
  end

  describe "#search_stories" do
    before do
      storage.save_story("Space Adventure", test_story_data, test_metadata.merge(
        "title" => "Space Adventure",
        "characters" => ["Alex", "Captain Nova"]
      ))
      storage.save_story("Fantasy Quest", test_story_data, test_metadata.merge(
        "title" => "Fantasy Quest",
        "characters" => ["Wizard", "Knight"]
      ))
    end

    it "finds stories by title" do
      results = storage.search_stories("Space")

      expect(results.length).to eq(1)
      expect(results.first[:title]).to eq("Space Adventure")
      expect(results.first[:matches]).to include("title")
    end

    it "finds stories by characters" do
      results = storage.search_stories("Alex")

      expect(results.length).to eq(1)
      expect(results.first[:title]).to eq("Space Adventure")
      expect(results.first[:matches]).to include("characters")
    end

    it "returns empty results for no matches" do
      results = storage.search_stories("NonExistentTerm")

      expect(results).to be_empty
    end
  end

  describe "#get_story_markdown" do
    before do
      storage.save_story(test_title, test_story_data, test_metadata)
    end

    it "returns markdown content" do
      markdown = storage.get_story_markdown(test_title)

      expect(markdown).to be_a(String)
      expect(markdown).to include("# #{test_title}")
      expect(markdown).to include("Chapter 1")
      expect(markdown).to include("This is the first chapter")
    end

    it "returns nil for non-existent story" do
      markdown = storage.get_story_markdown("Non-existent")
      expect(markdown).to be_nil
    end
  end

  describe "#get_story_stats" do
    before do
      storage.save_story("Story 1", test_story_data, test_metadata.merge("title" => "Story 1", "word_count" => 100))
      storage.save_story("Story 2", test_story_data, test_metadata.merge("title" => "Story 2", "word_count" => 200))
    end

    it "returns storage statistics" do
      stats = storage.get_story_stats

      expect(stats[:total_stories]).to eq(2)
      expect(stats[:total_words]).to eq(300)
      expect(stats[:total_chapters]).to eq(4)
      expect(stats[:storage_location]).to be_a(String)
    end
  end

  describe "#cleanup_storage" do
    before do
      storage.save_story(test_title, test_story_data, test_metadata)
    end

    it "removes missing stories from index" do
      # Manually corrupt the index
      safe_title = storage.send(:sanitize_title, test_title)
      storage.instance_variable_get(:@index)["missing_story"] = { "title" => "Missing" }
      storage.send(:save_index)

      expect(storage.instance_variable_get(:@index).length).to eq(2)

      storage.cleanup_storage

      expect(storage.instance_variable_get(:@index).length).to eq(1)
      expect(storage.instance_variable_get(:@index)).not_to have_key("missing_story")
    end
  end

  describe "utility methods" do
    describe "#sanitize_title" do
      it "sanitizes titles correctly" do
        test_cases = [
          ["Simple Title", "simple_title"],
          ["Title with spaces", "title_with_spaces"],
          ["Title-with-dashes!", "title-with-dashes"],
          ["Title with $pecial characters", "title_with_pecial_characters"],
          ["Title   with   multiple   spaces", "title_with_multiple_spaces"]
        ]

        test_cases.each do |input, expected|
          result = storage.send(:sanitize_title, input)
          expect(result).to eq(expected)
        end
      end
    end

    describe "#story_files_exist?" do
      it "checks file existence correctly" do
        storage.save_story(test_title, test_story_data, test_metadata)

        expect(storage.send(:story_files_exist?, storage.send(:sanitize_title, test_title))).to be true
        expect(storage.send(:story_files_exist?, "non_existent")).to be false
      end
    end
  end
end