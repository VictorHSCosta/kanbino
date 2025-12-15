# frozen_string_literal: true

require "spec_helper"
require "gemkanbino/commands/home"

RSpec.describe Gemkanbino::Commands::Home do
  let(:home_command) { described_class.new }

  describe "#display_welcome_message" do
    context "when terminal width is available" do
      before do
        allow(home_command).to receive(:detect_terminal_width).and_return(80)
      end

      it "displays centered welcome message" do
        expect { home_command.display_welcome_message }.to output(/Bem Vindo/).to_stdout
      end

      it "returns success response" do
        result = home_command.display_welcome_message
        expect(result[:success]).to be true
        expect(result[:message]).to eq("Welcome message displayed successfully")
      end
    end

    context "when terminal width is smaller than message" do
      before do
        allow(home_command).to receive(:detect_terminal_width).and_return(5)
      end

      it "displays welcome message without centering" do
        expect { home_command.display_welcome_message }.to output(/Bem Vindo/).to_stdout
      end

      it "returns success response" do
        result = home_command.display_welcome_message
        expect(result[:success]).to be true
      end
    end

    context "when terminal width detection fails" do
      before do
        allow(home_command).to receive(:detect_terminal_width).and_return(nil)
      end

      it "displays welcome message without centering" do
        expect { home_command.display_welcome_message }.to output(/Bem Vindo/).to_stdout
      end

      it "returns success response" do
        result = home_command.display_welcome_message
        expect(result[:success]).to be true
      end
    end

    context "when an error occurs during display" do
      before do
        allow(home_command).to receive(:puts).and_raise(StandardError, "Display error")
      end

      it "displays fallback message in red" do
        expect { home_command.display_welcome_message }.to output(/Bem Vindo/).to_stdout
      end

      it "returns error response" do
        result = home_command.display_welcome_message
        expect(result[:success]).to be false
        expect(result[:error]).to eq("Display error")
        expect(result[:details]).to eq("Displayed fallback message")
      end
    end
  end

  describe "#center_text" do
    it "centers text in given width" do
      result = home_command.send(:center_text, "test", 10)
      expect(result).to eq("   test")
    end

    it "handles odd width correctly" do
      result = home_command.send(:center_text, "test", 9)
      expect(result).to eq("  test")
    end

    it "returns original text when width is too small" do
      result = home_command.send(:center_text, "longer text", 5)
      expect(result).to eq("longer text")
    end

    it "returns original text when width is nil" do
      result = home_command.send(:center_text, "test", nil)
      expect(result).to eq("test")
    end
  end

  describe "#detect_terminal_width" do
    context "when IO.console is available" do
      before do
        allow(IO).to receive(:respond_to?).with(:console).and_return(true)
        allow(IO).to receive(:console).and_return(double(winsize: [24, 100]))
      end

      it "returns console width" do
        result = home_command.send(:detect_terminal_width)
        expect(result).to eq(100)
      end
    end

    context "when COLUMNS environment variable is set" do
      before do
        allow(IO).to receive(:respond_to?).with(:console).and_return(false)
        allow(ENV).to receive(:[]).with('COLUMNS').and_return('120')
      end

      it "returns environment variable width" do
        result = home_command.send(:detect_terminal_width)
        expect(result).to eq(120)
      end
    end

    context "when tput command is available" do
      before do
        allow(IO).to receive(:respond_to?).with(:console).and_return(false)
        allow(ENV).to receive(:[]).with('COLUMNS').and_return(nil)
        allow(Open3).to receive(:capture3).with('tput cols').and_return(['80', '', 0])
      end

      it "returns tput width" do
        result = home_command.send(:detect_terminal_width)
        expect(result).to eq(80)
      end
    end

    context "when all detection methods fail" do
      before do
        allow(IO).to receive(:respond_to?).with(:console).and_return(false)
        allow(ENV).to receive(:[]).with('COLUMNS').and_return(nil)
        allow(Open3).to receive(:capture3).and_raise(StandardError)
      end

      it "returns default width" do
        result = home_command.send(:detect_terminal_width)
        expect(result).to eq(80)
      end
    end
  end
end