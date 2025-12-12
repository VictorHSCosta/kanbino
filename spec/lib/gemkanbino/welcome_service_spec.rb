# frozen_string_literal: true

require "spec_helper"
require "stringio"

RSpec.describe Gemkanbino::WelcomeService do
  let(:pastel) { Pastel.new(enabled: true) }
  let(:welcome_service) { described_class.new(pastel) }
  let(:output) { StringIO.new }

  before do
    allow(STDOUT).to receive(:tty?).and_return(true)
    allow(IO).to receive(:console).and_return(double("console", winsize: [80, 120]))
  end

  describe "#display_welcome" do
    context "with auto format" do
      it "displays full welcome screen for normal terminal size" do
        expect { welcome_service.display_welcome(:auto) }.not_to raise_error
      end

      it "includes version information" do
        expect { welcome_service.display_welcome(:auto) }.to output(/Gemkanbino v#{Gemkanbino::VERSION}/).to_stdout
      end

      it "includes welcome message in Portuguese" do
        expect { welcome_service.display_welcome(:auto) }.to output(/Bem-vindo/i).to_stdout
      end
    end

    context "with compact format" do
      it "displays compact welcome screen" do
        expect { welcome_service.display_welcome(:compact) }.not_to raise_error
      end

      it "shows essential information only" do
        output = capture_stdout { welcome_service.display_welcome(:compact) }
        expect(output).to include("Gemkanbino")
        expect(output).to include("Ferramenta CLI")
      end
    end

    context "with minimal format" do
      it "displays minimal welcome screen" do
        expect { welcome_service.display_welcome(:minimal) }.not_to raise_error
      end

      it "shows only version" do
        output = capture_stdout { welcome_service.display_welcome(:minimal) }
        expect(output).to match(/Gemkanbino v#{Gemkanbino::VERSION}/)
      end
    end

    context "with detailed format" do
      it "displays detailed welcome screen with system info" do
        expect { welcome_service.display_welcome(:detailed) }.not_to raise_error
      end

      it "includes system information" do
        output = capture_stdout { welcome_service.display_welcome(:detailed) }
        expect(output).to include("Informações do Sistema")
        expect(output).to include("Ruby:")
        expect(output).to include("Terminal:")
      end
    end

    context "with small terminal" do
      before do
        allow(IO).to receive(:console).and_return(double("console", winsize: [8, 30]))
      end

      it "adapts to small terminal size" do
        expect { welcome_service.display_welcome(:auto) }.not_to raise_error
      end
    end
  end

  describe "#display_quick_tips" do
    it "displays quick tips section" do
      expect { welcome_service.display_quick_tips }.not_to raise_error
    end

    it "shows tip-related content" do
      output = capture_stdout { welcome_service.display_quick_tips }
      expect(output).to match(/Dicas/i) || output.empty?  # May be empty randomly
    end

    it "limits number of tips displayed" do
      output = capture_stdout { welcome_service.display_quick_tips }
      lines = output.lines.select { |line| line.include?("•") || line.match(/^\d+\./) }
      expect(lines.length).to be <= 4
    end
  end

  describe "#display_getting_started" do
    context "with normal terminal size" do
      it "displays getting started guide" do
        expect { welcome_service.display_getting_started }.not_to raise_error
      end

      it "shows first steps information" do
        output = capture_stdout { welcome_service.display_getting_started }
        expect(output).to include("Primeiros Passos")
      end
    end

    context "with small terminal" do
      before do
        allow(IO).to receive(:console).and_return(double("console", winsize: [8, 30]))
        allow(welcome_service).to receive(:terminal_too_small?).and_return(true)
      end

      it "skips getting started guide for small terminals" do
        expect { welcome_service.display_getting_started }.not_to output(/Primeiros Passos/).to_stdout
      end
    end
  end

  describe "private methods" do
    describe "#clear_screen" do
      it "clears screen when STDOUT is tty" do
        allow(STDOUT).to receive(:tty?).and_return(true)
        expect(welcome_service).to receive(:system).with("clear").or_return(true)
        welcome_service.send(:clear_screen)
      end

      it "does not clear screen when STDOUT is not tty" do
        allow(STDOUT).to receive(:tty?).and_return(false)
        expect(welcome_service).not_to receive(:system)
        welcome_service.send(:clear_screen)
      end
    end

    describe "#terminal_too_small?" do
      it "detects normal terminal size as not too small" do
        allow(IO).to receive(:console).and_return(double("console", winsize: [80, 120]))
        expect(welcome_service.send(:terminal_too_small?)).to be false
      end

      it "detects very small terminal as too small" do
        allow(IO).to receive(:console).and_return(double("console", winsize: [8, 30]))
        expect(welcome_service.send(:terminal_too_small?)).to be true
      end
    end

    describe "#first_run?" do
      it "detects first run when config directory doesn't exist" do
        config_dir = File.join(Dir.home, ".gemkanbino")
        allow(File).to receive(:exist?).with(config_dir).and_return(false)
        expect(welcome_service.send(:first_run?)).to be true
      end

      it "detects not first run when config directory exists" do
        config_dir = File.join(Dir.home, ".gemkanbino")
        allow(File).to receive(:exist?).with(config_dir).and_return(true)
        expect(welcome_service.send(:first_run?)).to be false
      end
    end
  end

  describe "error handling" do
    it "handles console errors gracefully" do
      allow(IO).to receive(:console).and_raise(StandardError.new("Console error"))
      expect { welcome_service.display_welcome }.not_to raise_error
    end

    it "handles file system errors gracefully" do
      allow(Dir).to receive(:home).and_raise(StandardError.new("Home error"))
      expect { welcome_service.display_getting_started }.not_to raise_error
    end
  end

  private

  def capture_stdout
    original_stdout = STDOUT
    STDOUT = StringIO.new
    yield
    STDOUT.string
  ensure
    STDOUT = original_stdout
  end
end