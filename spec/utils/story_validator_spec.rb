# frozen_string_literal: true

require "spec_helper"

RSpec.describe Gemkanbino::Utils::StoryValidator do
  describe ".validate_title" do
    it "accepts valid titles" do
      valid_titles = [
        "A Simple Story",
        "Story with Numbers 123",
        "Story-with-hyphens",
        "Story_with_underscores",
        "Story with punctuation!",
        "Story: A Tale"
      ]

      valid_titles.each do |title|
        expect {
          described_class.validate_title(title)
        }.not_to raise_error
      end
    end

    it "rejects nil title" do
      expect {
        described_class.validate_title(nil)
      }.to raise_error(Gemkanbino::Exceptions::InvalidStoryTitleError, /cannot be nil/)
    end

    it "rejects empty title" do
      expect {
        described_class.validate_title("")
      }.to raise_error(Gemkanbino::Exceptions::InvalidStoryTitleError, /cannot be empty/)
    end

    it "rejects title that's too short" do
      expect {
        described_class.validate_title("Hi")
      }.to raise_error(Gemkanbino::Exceptions::InvalidStoryTitleError, /at least 3 characters/)
    end

    it "rejects title that's too long" do
      long_title = "A" * 201
      expect {
        described_class.validate_title(long_title)
      }.to raise_error(Gemkanbino::Exceptions::InvalidStoryTitleError, /less than 200 characters/)
    end

    it "rejects titles with invalid characters" do
      invalid_titles = [
        "Title with @ symbol",
        "Title with # hashtag",
        "Title with % percent",
        "Title with & ampersand",
        "Title with * asterisk",
        "Title with + plus",
        "Title with = equals"
      ]

      invalid_titles.each do |title|
        expect {
          described_class.validate_title(title)
        }.to raise_error(Gemkanbino::Exceptions::InvalidStoryTitleError, /invalid characters/)
      end
    end

    it "rejects titles with consecutive special characters" do
      expect {
        described_class.validate_title("Story with--double dashes")
      }.to raise_error(Gemkanbino::Exceptions::InvalidStoryTitleError, /consecutive special characters/)
    end
  end

  describe ".validate_story_data" do
    let(:valid_story_data) do
      {
        title: "A Valid Story",
        chapters: [
          { title: "Chapter 1", content: "This is chapter one content." },
          { title: "Chapter 2", content: "This is chapter two content." }
        ]
      }
    end

    it "accepts valid story data" do
      expect {
        described_class.validate_story_data(valid_story_data)
      }.not_to raise_error
    end

    it "rejects nil story data" do
      expect {
        described_class.validate_story_data(nil)
      }.to raise_error(ArgumentError, /cannot be nil/)
    end

    it "rejects non-hash story data" do
      expect {
        described_class.validate_story_data("not a hash")
      }.to raise_error(ArgumentError, /must be a hash/)
    end

    it "rejects story data missing title" do
      invalid_data = valid_story_data.dup
      invalid_data.delete(:title)

      expect {
        described_class.validate_story_data(invalid_data)
      }.to raise_error(ArgumentError, /missing required field: title/)
    end

    it "rejects story data missing chapters" do
      invalid_data = valid_story_data.dup
      invalid_data.delete(:chapters)

      expect {
        described_class.validate_story_data(invalid_data)
      }.to raise_error(ArgumentError, /missing required field: chapters/)
    end

    it "rejects story data with non-array chapters" do
      invalid_data = valid_story_data.dup
      invalid_data[:chapters] = "not an array"

      expect {
        described_class.validate_story_data(invalid_data)
      }.to raise_error(ArgumentError, /Chapters must be an array/)
    end

    it "rejects story data with empty chapters" do
      invalid_data = valid_story_data.dup
      invalid_data[:chapters] = []

      expect {
        described_class.validate_story_data(invalid_data)
      }.to raise_error(ArgumentError, /at least one chapter/)
    end

    it "validates each chapter" do
      invalid_data = valid_story_data.dup
      invalid_data[:chapters] = [
        { title: "Chapter 1", content: "Valid content" },
        { title: "", content: "Invalid empty title" }
      ]

      expect {
        described_class.validate_story_data(invalid_data)
      }.to raise_error(ArgumentError, /title cannot be empty/)
    end
  end

  describe ".validate_chapter" do
    let(:valid_chapter) do
      { title: "A Valid Chapter", content: "This is valid chapter content." }
    end

    it "accepts valid chapter" do
      expect {
        described_class.validate_chapter(valid_chapter)
      }.not_to raise_error
    end

    it "rejects non-hash chapter" do
      expect {
        described_class.validate_chapter("not a hash")
      }.to raise_error(ArgumentError, /must be a hash/)
    end

    it "rejects chapter missing title" do
      invalid_chapter = { content: "Content without title" }
      expect {
        described_class.validate_chapter(invalid_chapter)
      }.to raise_error(ArgumentError, /missing required fields/)
    end

    it "rejects chapter missing content" do
      invalid_chapter = { title: "Title without content" }
      expect {
        described_class.validate_chapter(invalid_chapter)
      }.to raise_error(ArgumentError, /missing required fields/)
    end

    it "rejects non-string title" do
      invalid_chapter = { title: 123, content: "Valid content" }
      expect {
        described_class.validate_chapter(invalid_chapter)
      }.to raise_error(ArgumentError, /fields must be strings/)
    end

    it "rejects empty title" do
      invalid_chapter = { title: "", content: "Valid content" }
      expect {
        described_class.validate_chapter(invalid_chapter)
      }.to raise_error(ArgumentError, /title cannot be empty/)
    end

    it "rejects empty content" do
      invalid_chapter = { title: "Valid Title", content: "" }
      expect {
        described_class.validate_chapter(invalid_chapter)
      }.to raise_error(ArgumentError, /content cannot be empty/)
    end

    it "rejects title that's too long" do
      long_title = "A" * 101
      invalid_chapter = { title: long_title, content: "Valid content" }
      expect {
        described_class.validate_chapter(invalid_chapter)
      }.to raise_error(ArgumentError, /title too long/)
    end

    it "rejects content that's too long" do
      long_content = "A" * 50_001
      invalid_chapter = { title: "Valid Title", content: long_content }
      expect {
        described_class.validate_chapter(invalid_chapter)
      }.to raise_error(ArgumentError, /content too long/)
    end
  end

  describe ".validate_metadata" do
    let(:valid_metadata) do
      {
        "title" => "A Valid Story",
        "template" => "test_template",
        "created_at" => Time.now.iso8601,
        "chapters" => 5,
        "word_count" => 5000,
        "characters" => ["Character 1", "Character 2"],
        "genres" => ["Fiction", "Adventure"],
        "tags" => ["test", "story"]
      }
    end

    it "accepts valid metadata" do
      expect {
        described_class.validate_metadata(valid_metadata)
      }.not_to raise_error
    end

    it "accepts minimal valid metadata" do
      minimal_metadata = {
        "title" => "Minimal Story",
        "template" => "test_template",
        "created_at" => Time.now.iso8601
      }

      expect {
        described_class.validate_metadata(minimal_metadata)
      }.not_to raise_error
    end

    it "rejects nil metadata" do
      expect {
        described_class.validate_metadata(nil)
      }.to raise_error(ArgumentError, /cannot be nil/)
    end

    it "rejects non-hash metadata" do
      expect {
        described_class.validate_metadata("not a hash")
      }.to raise_error(ArgumentError, /must be a hash/)
    end

    it "rejects metadata missing required fields" do
      required_fields = %w[title template created_at]
      required_fields.each do |field|
        invalid_metadata = valid_metadata.dup
        invalid_metadata.delete(field)

        expect {
          described_class.validate_metadata(invalid_metadata)
        }.to raise_error(ArgumentError, /missing required field: #{field}/)
      end
    end

    it "rejects invalid created_at timestamp" do
      invalid_metadata = valid_metadata.dup
      invalid_metadata["created_at"] = "invalid timestamp"

      expect {
        described_class.validate_metadata(invalid_metadata)
      }.to raise_error(ArgumentError, /Invalid created_at timestamp/)
    end

    it "rejects negative chapters count" do
      invalid_metadata = valid_metadata.dup
      invalid_metadata["chapters"] = -1

      expect {
        described_class.validate_metadata(invalid_metadata)
      }.to raise_error(ArgumentError, /Chapters count must be non-negative/)
    end

    it "rejects negative word count" do
      invalid_metadata = valid_metadata.dup
      invalid_metadata["word_count"] = -100

      expect {
        described_class.validate_metadata(invalid_metadata)
      }.to raise_error(ArgumentError, /Word count must be non-negative/)
    end

    it "rejects invalid characters array" do
      invalid_metadata = valid_metadata.dup
      invalid_metadata["characters"] = "not an array"

      expect {
        described_class.validate_metadata(invalid_metadata)
      }.to raise_error(ArgumentError, /Characters must be an array/)
    end

    it "rejects empty character names" do
      invalid_metadata = valid_metadata.dup
      invalid_metadata["characters"] = ["Valid Character", ""]

      expect {
        described_class.validate_metadata(invalid_metadata)
      }.to raise_error(ArgumentError, /non-empty strings/)
    end
  end

  describe ".validate_template_name" do
    it "accepts valid template names" do
      valid_names = [
        "simple_template",
        "template_with_numbers_123",
        "camelCaseTemplate",
        "UPPERCASE_TEMPLATE"
      ]

      valid_names.each do |name|
        expect {
          described_class.validate_template_name(name)
        }.not_to raise_error
      end
    end

    it "rejects template names with invalid characters" do
      invalid_names = [
        "template-with-dashes",
        "template with spaces",
        "template@with#special"
      ]

      invalid_names.each do |name|
        expect {
          described_class.validate_template_name(name)
        }.to raise_error(ArgumentError, /invalid characters/)
      end
    end

    it "rejects template names that are too long" do
      long_name = "a" * 51
      expect {
        described_class.validate_template_name(long_name)
      }.to raise_error(ArgumentError, /too long/)
    end
  end

  describe ".validate_export_format" do
    it "accepts valid formats" do
      valid_formats = %w[markdown html pdf txt MARKDOWN HTML PDF TXT]

      valid_formats.each do |format|
        expect {
          described_class.validate_export_format(format)
        }.not_to raise_error
      end
    end

    it "rejects invalid formats" do
      invalid_formats = %w[doc docx xml json invalid_format]

      invalid_formats.each do |format|
        expect {
          described_class.validate_export_format(format)
        }.to raise_error(ArgumentError, /Invalid export format/)
      end
    end
  end

  describe ".validate_search_query" do
    it "accepts valid queries" do
      valid_queries = [
        "simple search",
        "search with numbers 123",
        "Search-With-Dashes",
        "search_with_underscores"
      ]

      valid_queries.each do |query|
        expect {
          described_class.validate_search_query(query)
        }.not_to raise_error
      end
    end

    it "rejects nil query" do
      expect {
        described_class.validate_search_query(nil)
      }.to raise_error(ArgumentError, /cannot be nil/)
    end

    it "rejects empty query" do
      expect {
        described_class.validate_search_query("")
      }.to raise_error(ArgumentError, /cannot be empty/)
    end

    it "rejects query that's too long" do
      long_query = "a" * 101
      expect {
        described_class.validate_search_query(long_query)
      }.to raise_error(ArgumentError, /too long/)
    end
  end

  describe ".sanitize_story_options" do
    it "sanitizes valid options hash" do
      options = {
        "name" => "Valid Name",
        "number" => 123,
        "array" => ["item1", "item2"],
        "nested" => {
          "inner" => "value"
        }
      }

      result = described_class.sanitize_story_options(options)
      expect(result).to eq(options)
    end

    it "sanitizes strings in options" do
      options = {
        "name" => "Name\x00with\x08control\x7Fcharacters"
      }

      result = described_class.sanitize_story_options(options)
      expect(result["name"]).not_to include("\x00")
      expect(result["name"]).not_to include("\x08")
      expect(result["name"]).not_to include("\x7F")
    end

    it "removes empty strings from arrays" do
      options = {
        "array" => ["item1", "", "item2", "", "item3"]
      }

      result = described_class.sanitize_story_options(options)
      expect(result["array"]).to eq(["item1", "item2", "item3"])
    end

    it "handles non-hash input" do
      expect {
        described_class.sanitize_story_options("not a hash")
      }.not_to raise_error
    end

    it "skips invalid keys" do
      options = {
        "" => "empty key",
        nil => "nil key",
        123 => "numeric key",
        "valid_key" => "valid value"
      }

      result = described_class.sanitize_story_options(options)
      expect(result.keys).to eq(["valid_key"])
      expect(result["valid_key"]).to eq("valid value")
    end
  end
end