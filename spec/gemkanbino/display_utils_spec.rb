# frozen_string_literal: true

require "spec_helper"

RSpec.describe Gemkanbino::Utils::DisplayUtils do
  let(:display_utils) { described_class.new }

  describe "#initialize" do
    it "creates a pastel instance" do
      expect(display_utils.pastel).to be_a(Pastel)
    end
  end

  describe "#terminal_width" do
    it "returns a positive integer" do
      width = display_utils.send(:terminal_width)
      expect(width).to be_a(Integer)
      expect(width).to be > 0
    end

    it "falls back to 80 when console width is not available" do
      allow(IO).to receive(:console).and_raise(StandardError)
      width = display_utils.send(:terminal_width)
      expect(width).to eq(80)
    end
  end

  describe "#center_text" do
    it "centers single line text" do
      allow(display_utils).to receive(:terminal_width).and_return(80)
      text = "Hello"
      result = display_utils.center_text(text)

      expect(result).to include("Hello")
      expect(result.strip).to eq("Hello")
    end

    it "centers multi-line text" do
      allow(display_utils).to receive(:terminal_width).and_return(80)
      text = "Line 1\nLine 2"
      result = display_utils.center_text(text)

      expect(result).to include("Line 1")
      expect(result).to include("Line 2")
    end

    it "adds padding lines when specified" do
      allow(display_utils).to receive(:terminal_width).and_return(80)
      text = "Hello"
      result = display_utils.center_text(text, 2)

      lines = result.split("\n")
      expect(lines.first).to be_empty
      expect(lines.last).to be_empty
      expect(lines[2]).to include("Hello")
    end

    it "handles ANSI color codes correctly" do
      allow(display_utils).to receive(:terminal_width).and_return(80)
      colored_text = display_utils.pastel.green.bold("Hello")
      result = display_utils.center_text(colored_text)

      expect(result).to include("Hello")
      # The ANSI codes should not affect centering
    end
  end

  describe "#welcome_message" do
    it "returns a formatted welcome message" do
      message = display_utils.send(:welcome_message)

      expect(message).to include("BEM VINDO")
      expect(message).to include("à Gemkanbino CLI")
      expect(message).to include("Sua ferramenta para gerenciar arquivos e pastas")
      expect(message).to include("Digite 'gemkanbino help' para ver todos os comandos")
    end

    it "contains color formatting" do
      message = display_utils.send(:welcome_message)

      # Check that ANSI color codes are present
      expect(message).to match(/\e\[/)  # ANSI escape sequence
    end
  end

  describe "#clear_screen" do
    it "outputs clear screen ANSI codes" do
      expect { display_utils.clear_screen }.to output.to_stdout
      expect { display_utils.clear_screen }.to output(/\e\[2J\e\[f/).to_stdout
    end
  end

  describe "#show_welcome" do
    it "displays the welcome screen" do
      allow(display_utils).to receive(:clear_screen)
      allow(display_utils).to receive(:center_text).and_return("centered content")

      expect { display_utils.show_welcome }.to output.to_stdout
      expect(display_utils).to have_received(:clear_screen)
      expect(display_utils).to have_received(:center_text)
    end

    it "includes welcome message in output" do
      expect { display_utils.show_welcome }.to output(/BEM VINDO/).to_stdout
    end
  end

  describe "#terminal_height_padding" do
    it "returns reasonable padding value" do
      allow(IO).to receive(:console).and_return([double(winsize: [24]), 80])
      padding = display_utils.send(:terminal_height_padding)
      expect(padding).to be_a(Integer)
      expect(padding).to be >= 2
    end

    it "falls back to reasonable default when console height is not available" do
      allow(IO).to receive(:console).and_raise(StandardError)
      padding = display_utils.send(:terminal_height_padding)
      expect(padding).to eq(2)
    end

    it "returns minimum padding of 2 for very small terminals" do
      allow(IO).to receive(:console).and_return([double(winsize: [8]), 80])
      padding = display_utils.send(:terminal_height_padding)
      expect(padding).to eq(2)
    end
  end
end