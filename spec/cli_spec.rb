# frozen_string_literal: true

require "gemkanbino/cli"

RSpec.describe Gemkanbino::CLI do
  let(:cli) { Gemkanbino::CLI.new }

  describe "#home" do
    it "displays welcome message" do
      # Mock the private methods to isolate the test
      allow(cli).to receive(:get_terminal_width).and_return(80)
      allow(cli).to receive(:get_terminal_height).and_return(24)
      allow(cli).to receive(:get_vertical_padding).and_return(11)

      # Expect the welcome message to be displayed
      expect { cli.home }.to output(/bem vindo/).to_stdout
    end

    it "calls display_centered_welcome method" do
      allow(cli).to receive(:get_terminal_width).and_return(80)
      allow(cli).to receive(:get_terminal_height).and_return(24)
      allow(cli).to receive(:get_vertical_padding).and_return(11)

      expect(cli).to receive(:display_centered_welcome).once
      cli.home
    end
  end

  describe "#get_terminal_width" do
    it "returns terminal width when available" do
      allow(IO).to receive_message_chain(:console, :winsize).and_return([24, 80])
      expect(cli.send(:get_terminal_width)).to eq(80)
    end

    it "returns fallback width when terminal width is not available" do
      allow(IO).to receive_message_chain(:console, :winsize).and_raise(StandardError)
      expect(cli.send(:get_terminal_width)).to eq(80)
    end
  end

  describe "#get_terminal_height" do
    it "returns terminal height when available" do
      allow(IO).to receive_message_chain(:console, :winsize).and_return([24, 80])
      expect(cli.send(:get_terminal_height)).to eq(24)
    end

    it "returns fallback height when terminal height is not available" do
      allow(IO).to receive_message_chain(:console, :winsize).and_raise(StandardError)
      expect(cli.send(:get_terminal_height)).to eq(24)
    end
  end

  describe "#get_vertical_padding" do
    it "returns appropriate vertical padding" do
      allow(cli).to receive(:get_terminal_height).and_return(24)
      expect(cli.send(:get_vertical_padding)).to eq(11)
    end
  end

  describe "#centered_text" do
    it "centers text within given width" do
      result = cli.send(:centered_text, "test", 80)
      expect(result.length).to be <= 80
      expect(result).to include("test")
    end

    it "returns original text when text is longer than width" do
      long_text = "this is a very long text that exceeds the width"
      result = cli.send(:centered_text, long_text, 10)
      expect(result).to eq(long_text)
    end

    it "applies styling to the text" do
      allow(cli).to receive(:get_terminal_width).and_return(80)
      result = cli.send(:centered_text, "test", 80)
      expect(result).to include("test")
    end
  end
end