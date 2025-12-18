# frozen_string_literal: true

require "spec_helper"

RSpec.describe Gemkanbino::StoryTemplates do
  before(:all) do
    # Load builtin templates
    described_class.load_builtin_templates
  end

  describe ".register_template" do
    it "registers a new template" do
      # Create a test template class
      test_template_class = Class.new(described_class::BaseTemplate) do
        def description
          "Test template"
        end

        def generate_story(title, options = {})
          {
            title: title,
            chapters: [
              { title: "Chapter 1", content: "Test content" }
            ]
          }
        end
      end

      described_class.register_template("test_template", test_template_class)

      template = described_class.get_template("test_template")
      expect(template).to be_instance_of(test_template_class)
    end
  end

  describe ".get_template" do
    it "returns existing template" do
      template = described_class.get_template("guerra_irmaos_planetas")
      expect(template).not_to be_nil
      expect(template).to respond_to(:generate_story)
    end

    it "returns nil for non-existent template" do
      template = described_class.get_template("non_existent")
      expect(template).to be_nil
    end
  end

  describe ".list_templates" do
    it "lists available templates" do
      templates = described_class.list_templates
      expect(templates).to include("guerra_irmaos_planetas")
      expect(templates).to all(be_a(String))
    end
  end

  describe ".list_templates_with_descriptions" do
    it "lists templates with descriptions" do
      templates = described_class.list_templates_with_descriptions
      expect(templates).to be_an(Array)

      # Find our template in the list
      guerra_template = templates.find { |name, _| name == "guerra_irmaos_planetas" }
      expect(guerra_template).not_to be_nil
      expect(guerra_template[1]).to be_a(String)
      expect(guerra_template[1].length).to be > 0
    end
  end
end

RSpec.describe Gemkanbino::StoryTemplates::GuerraIrmaosPlanetas do
  let(:template) { described_class.new }
  let(:test_title) { "The Great War" }

  describe "#description" do
    it "returns a description" do
      description = template.description
      expect(description).to be_a(String)
      expect(description.length).to be > 0
      expect(description).to include("brothers")
    end
  end

  describe "#get_user_options" do
    it "returns user options configuration" do
      options = template.get_user_options
      expect(options).to be_a(Hash)

      # Check for expected options
      expect(options).to have_key(:brother1_name)
      expect(options).to have_key(:brother2_name)
      expect(options).to have_key(:ending_type)

      # Validate option structure
      brother1_option = options[:brother1_name]
      expect(brother1_option).to have_key(:type)
      expect(brother1_option).to have_key(:prompt)
      expect(brother1_option[:type]).to eq(:string)
    end
  end

  describe "#generate_story" do
    it "generates a complete story" do
      story = template.generate_story(test_title)

      expect(story).to have_key(:title)
      expect(story).to have_key(:chapters)
      expect(story).to have_key(:metadata)

      expect(story[:title]).to eq(test_title)
      expect(story[:chapters]).to be_an(Array)
      expect(story[:chapters].length).to eq(5)  # 5 chapters for 5 years war

      # Check chapter structure
      story[:chapters].each_with_index do |chapter, index|
        expect(chapter).to have_key(:title)
        expect(chapter).to have_key(:content)

        expect(chapter[:title]).to be_a(String)
        expect(chapter[:content]).to be_a(String)
        expect(chapter[:title].length).to be > 0
        expect(chapter[:content].length).to be > 0
      end

      # Check metadata
      metadata = story[:metadata]
      expect(metadata).to have_key(:characters)
      expect(metadata).to have_key(:planets)
      expect(metadata).to have_key(:genres)
      expect(metadata).to have_key(:word_count)

      expect(metadata[:characters]).to be_an(Array)
      expect(metadata[:characters].length).to eq(2)  # Two brothers
      expect(metadata[:planets]).to be_an(Array)
      expect(metadata[:planets].length).to eq(2)  # Two planets
    end

    it "uses custom options" do
      custom_options = {
        brother1_name: "Custom Brother 1",
        brother2_name: "Custom Brother 2",
        planet1_name: "Custom Planet 1",
        planet2_name: "Custom Planet 2",
        ending_type: "victory"
      }

      story = template.generate_story(test_title, custom_options)
      metadata = story[:metadata]

      expect(metadata[:characters]).to include("Custom Brother 1")
      expect(metadata[:characters]).to include("Custom Brother 2")
      expect(metadata[:planets]).to include("Custom Planet 1")
      expect(metadata[:planets]).to include("Custom Planet 2")
      expect(metadata[:ending_type]).to eq("victory")
    end

    it "generates different endings based on ending_type" do
      reconciliation_story = template.generate_story(test_title, { ending_type: "reconciliation" })
      victory_story = template.generate_story(test_title, { ending_type: "victory" })
      tragedy_story = template.generate_story(test_title, { ending_type: "tragedy" })

      # Check that the last chapters are different
      reconciliation_last_chapter = reconciliation_story[:chapters].last[:content]
      victory_last_chapter = victory_story[:chapters].last[:content]
      tragedy_last_chapter = tragedy_story[:chapters].last[:content]

      expect(reconciliation_last_chapter).not_to eq(victory_last_chapter)
      expect(victory_last_chapter).not_to eq(tragedy_last_chapter)
      expect(reconciliation_last_chapter).not_to eq(tragedy_last_chapter)
    end

    it "generates meaningful content" do
      story = template.generate_story(test_title)

      # Check that content contains expected themes
      all_content = story[:chapters].map { |c| c[:content] }.join.downcase

      expect(all_content).to include("brother")
      expect(all_content).to include("war")
      expect(all_content).to include("year")

      # Check for 5-year progression
      expect(story[:chapters].first[:title]).to include("Inheritance")
      expect(story[:chapters].last[:title]).to include("Chapter 5")
    end

    it "calculates word count correctly" do
      story = template.generate_story(test_title)
      expected_word_count = story[:chapters].sum { |chapter| chapter[:content].split.length }

      expect(story[:metadata][:word_count]).to eq(expected_word_count)
      expect(story[:metadata][:word_count]).to be > 1000  # Should be a substantial story
    end
  end
end