# frozen_string_literal: true

require "spec_helper"

RSpec.describe Gemkanbino::UI::TerminalHelper do
  let(:pastel) { Pastel.new(enabled: true) }
  let(:terminal_helper) { described_class.new(pastel) }

  before do
    allow(IO).to receive(:console).and_return(double("console", winsize: [24, 80]))
  end

  describe "#terminal_width" do
    it "returns the terminal width" do
      expect(terminal_helper.terminal_width).to eq(80)
    end

    it "falls back to 80 when console is not available" do
      allow(IO).to receive(:console).and_return(nil)
      expect(terminal_helper.terminal_width).to eq(80)
    end
  end

  describe "#terminal_height" do
    it "returns the terminal height" do
      expect(terminal_helper.terminal_height).to eq(24)
    end

    it "falls back to 24 when console is not available" do
      allow(IO).to receive(:console).and_return(nil)
      expect(terminal_helper.terminal_height).to eq(24)
    end
  end

  describe "#supports_color?" do
    it "returns true when terminal supports colors" do
      allow(ENV).to receive(:[]).with('NO_COLOR').and_return(nil)
      allow(STDOUT).to receive(:tty?).and_return(true)
      expect(terminal_helper.supports_color?).to be true
    end

    it "returns false when NO_COLOR is set" do
      allow(ENV).to receive(:[]).with('NO_COLOR').and_return('1')
      expect(terminal_helper.supports_color?).to be false
    end

    it "returns true when FORCE_COLOR is set" do
      allow(ENV).to receive(:[]).with('NO_COLOR').and_return(nil)
      allow(ENV).to receive(:[]).with('FORCE_COLOR').and_return('1')
      allow(STDOUT).to receive(:tty?).and_return(false)
      expect(terminal_helper.supports_color?).to be true
    end
  end

  describe "#center_text" do
    it "centers text in available width" do
      text = "Hello"
      result = terminal_helper.center_text(text, 20)
      expect(result.length).to be >= text.length
      expect(result).to match(/^ +Hello/)
    end

    it "handles text with ANSI codes correctly" do
      colored_text = pastel.red("Hello")
      result = terminal_helper.center_text(colored_text, 20)
      expect(result).to include(colored_text)
    end

    it "returns text as-is when it fits perfectly" do
      text = "Hello World!"
      width = text.length
      result = terminal_helper.center_text(text, width)
      expect(result).to eq(text)
    end
  end

  describe "#horizontal_line" do
    it "creates a line with specified character" do
      result = terminal_helper.horizontal_line('-', 10)
      expect(result).to eq('-' * 10)
    end

    it "uses default width when not specified" do
      result = terminal_helper.horizontal_line('-')
      expect(result.length).to eq(terminal_helper.terminal_width)
    end
  end

  describe "#separator" do
    it "creates styled separator when colors are supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(true)
      result = terminal_helper.separator(10)
      expect(result).to include('─')
    end

    it "creates plain separator when colors are not supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(false)
      result = terminal_helper.separator(10)
      expect(result).to eq('-' * 10)
    end
  end

  describe "#vertical_padding" do
    it "returns specified number of newlines" do
      result = terminal_helper.vertical_padding(3)
      expect(result).to eq("\n" * 3)
    end

    it "defaults to 1 newline" do
      result = terminal_helper.vertical_padding
      expect(result).to eq("\n")
    end
  end

  describe "#bullet_point" do
    it "creates bullet point with color when supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(true)
      result = terminal_helper.bullet_point("Test")
      expect(result).to include("● Test")
    end

    it "creates plain bullet when color not supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(false)
      result = terminal_helper.bullet_point("Test")
      expect(result).to eq("● Test")
    end

    it "uses custom bullet character" do
      allow(terminal_helper).to receive(:supports_color?).and_return(false)
      result = terminal_helper.bullet_point("Test", "*")
      expect(result).to eq("* Test")
    end
  end

  describe "#header" do
    it "creates bold green header when colors are supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(true)
      result = terminal_helper.header("Test Header")
      expect(result).to include("Test Header")
    end

    it "creates uppercase header when colors are not supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(false)
      result = terminal_helper.header("Test Header")
      expect(result).to eq("TEST HEADER")
    end
  end

  describe "#subheader" do
    it "creates blue subheader when colors are supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(true)
      result = terminal_helper.subheader("Test")
      expect(result).to include("Test")
    end

    it "returns plain text when colors are not supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(false)
      result = terminal_helper.subheader("Test")
      expect(result).to eq("Test")
    end
  end

  describe "#emphasize" do
    it "creates yellow emphasis when colors are supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(true)
      result = terminal_helper.emphasize("Important")
      expect(result).to include("Important")
    end

    it "returns plain text when colors are not supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(false)
      result = terminal_helper.emphasize("Important")
      expect(result).to eq("Important")
    end
  end

  describe "#dim" do
    it "creates dim text when colors are supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(true)
      result = terminal_helper.dim("Subtle")
      expect(result).to include("Subtle")
    end

    it "creates bracketed text when colors are not supported" do
      allow(terminal_helper).to receive(:supports_color?).and_return(false)
      result = terminal_helper.dim("Subtle")
      expect(result).to eq("[Subtle]")
    end
  end

  describe "#terminal_too_small?" do
    it "detects normal terminal as not too small" do
      result = terminal_helper.terminal_too_small?(min_width: 60, min_height: 15)
      expect(result).to be false
    end

    it "detects small terminal as too small" do
      allow(terminal_helper).to receive(:terminal_width).and_return(30)
      allow(terminal_helper).to receive(:terminal_height).and_return(8)
      result = terminal_helper.terminal_too_small?(min_width: 40, min_height: 10)
      expect(result).to be true
    end

    it "uses default thresholds when not specified" do
      allow(terminal_helper).to receive(:terminal_width).and_return(30)
      allow(terminal_helper).to receive(:terminal_height).and_return(8)
      result = terminal_helper.terminal_too_small?
      expect(result).to be true
    end
  end

  describe "#safe_width" do
    it "returns 80% of terminal width" do
      allow(terminal_helper).to receive(:terminal_width).and_return(100)
      result = terminal_helper.safe_width
      expect(result).to eq(80)
    end

    it "limits to maximum width" do
      allow(terminal_helper).to receive(:terminal_width).and_return(200)
      result = terminal_helper.safe_width
      expect(result).to eq(120) # Limited to 120 as specified in the method
    end

    it "uses custom percentage" do
      allow(terminal_helper).to receive(:terminal_width).and_return(100)
      result = terminal_helper.safe_width(0.5)
      expect(result).to eq(50)
    end
  end

  describe "#truncate_text" do
    it "returns original text when it fits" do
      text = "Short text"
      result = terminal_helper.truncate_text(text, 20)
      expect(result).to eq(text)
    end

    it "truncates text when too long" do
      text = "This is a very long text that needs to be truncated"
      result = terminal_helper.truncate_text(text, 20)
      expect(result.length).to be <= 23 # 20 + ellipsis
      expect(result).to end_with("...")
    end

    it "handles ANSI codes in text correctly" do
      colored_text = pastel.red("This is colored text")
      result = terminal_helper.truncate_text(colored_text, 15)
      expect(result).to include(colored_text) || result.length <= 18 # 15 + ellipsis
    end
  end

  describe "#box_text" do
    it "creates box around single line text" do
      text = "Hello"
      result = terminal_helper.box_text(text)
      expect(result).to include("Hello")
      expect(result).to match(/^[┌+].*[┐+]$/m)
    end

    it "creates box around multi-line text" do
      text = "Line 1\nLine 2"
      result = terminal_helper.box_text(text)
      expect(result).to include("Line 1")
      expect(result).to include("Line 2")
      expect(result).to match(/^[┌+].*[┐+]$/m)
    end

    it "limits box width" do
      text = "This is a very long line that should be wrapped or truncated to fit within the box"
      result = terminal_helper.box_text(text, width: 50)
      expect(result).to include("This is a very long line")
      expect(result.lines.first.length).to be <= 50
    end
  end

  describe "error handling" do
    it "handles console errors gracefully" do
      allow(IO).to receive(:console).and_raise(StandardError.new("Console error"))
      expect { terminal_helper.terminal_width }.not_to raise_error
      expect(terminal_helper.terminal_width).to eq(80) # fallback value
    end

    it "handles nil input in truncate_text" do
      expect { terminal_helper.truncate_text(nil) }.to raise_error(NoMethodError)
    end
  end
end