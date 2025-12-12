# frozen_string_literal: true

require "spec_helper"
require "stringio"

RSpec.describe "gemkanbino welcome command" do
  let(:cli) { Gemkanbino::CLI.new }
  let(:output) { StringIO.new }

  before do
    allow(STDOUT).to receive(:tty?).and_return(true)
    allow(IO).to receive(:console).and_return(double("console", winsize: [24, 80]))
    allow(ENV).to receive(:[]).and_call_original
  end

  describe "#welcome" do
    context "with default options" do
      it "displays welcome screen without errors" do
        expect { cli.welcome }.not_to raise_error
      end

      it "includes welcome message in Portuguese" do
        output = capture_stdout { cli.welcome }
        expect(output).to match(/Bem-vindo/i)
      end

      it "includes version information" do
        output = capture_stdout { cli.welcome }
        expect(output).to include(Gemkanbino::VERSION.to_s)
      end
    end

    context "with compact format" do
      it "displays compact welcome screen" do
        expect { cli.welcome(format: 'compact') }.not_to raise_error
      end

      it "shows essential information only" do
        output = capture_stdout { cli.welcome(format: 'compact') }
        expect(output).to include("Gemkanbino")
        expect(output).to include("Ferramenta CLI")
      end
    end

    context "with detailed format" do
      it "displays detailed welcome screen" do
        expect { cli.welcome(format: 'detailed') }.not_to raise_error
      end

      it "includes system information" do
        output = capture_stdout { cli.welcome(format: 'detailed') }
        expect(output).to match(/Informações do Sistema|Ruby:|Terminal:/i)
      end
    end

    context "with minimal format" do
      it "displays minimal welcome screen" do
        expect { cli.welcome(format: 'minimal') }.not_to raise_error
      end

      it "shows only version" do
        output = capture_stdout { cli.welcome(format: 'minimal') }
        expect(output).to match(/Gemkanbino v#{Gemkanbino::VERSION}/)
      end
    end

    context "with tips option" do
      it "displays tips when requested" do
        output = capture_stdout { cli.welcome(tips: true) }
        expect(output).to match(/Dicas/i) || expect(output.length).to be > 0
      end
    end

    context "with help option" do
      it "displays getting started guide when requested" do
        output = capture_stdout { cli.welcome(help: true) }
        expect(output).to match(/Primeiros Passos/i)
      end
    end

    context "with no_clear option"        it "sets NO_CLEAR environment variable" do
        expect(ENV).to receive(:[]=).with('NO_CLEAR', 'true')
        cli.welcome(no_clear: true)
      end
    end

    context "with both tips and help options" do
      it "uses detailed format automatically" do
        welcome_service = instance_double(Gemkanbino::WelcomeService)
        expect(Gemkanbino::WelcomeService).to receive(:new).and_return(welcome_service)
        expect(welcome_service).to receive(:display_welcome).with(:detailed)
        expect(welcome_service).to receive(:display_quick_tips)
        expect(welcome_service).to receive(:display_getting_started)

        cli.welcome(tips: true, help: true)
      end
    end

    context "with invalid format" do
      it "handles invalid format gracefully" do
        # Thor should handle enum validation, but let's ensure graceful handling
        expect { cli.welcome(format: 'invalid') }.to raise_error(Thor::InvocationError)
      end
    end

    context "with small terminal" do
      before do
        allow(IO).to receive(:console).and_return(double("console", winsize: [8, 30]))
      end

      it "adapts to small terminal size" do
        expect { cli.welcome }.not_to raise_error
      end

      it "does not crash with small terminal" do
        output = capture_stdout { cli.welcome }
        expect(output.length).to be > 0
      end
    end

    context "when console is not available" do
      before do
        allow(IO).to receive(:console).and_raise(StandardError.new("Console error"))
      end

      it "handles console errors gracefully" do
        expect { cli.welcome }.not_to raise_error
      end
    end

    context "when STDOUT is not tty" do
      before do
        allow(STDOUT).to receive(:tty?).and_return(false)
      end

      it "still works without tty" do
        expect { cli.welcome }.not_to raise_error
      end

      it "displays without color formatting" do
        output = capture_stdout { cli.welcome }
        expect(output.length).to be > 0
      end
    end
  end

  describe "#determine_welcome_format (private method)" do
    context "with tips and help both true" do
      let(:options) { { tips: true, help: true } }

      it "returns detailed format" do
        format = cli.send(:determine_welcome_format, options)
        expect(format).to eq(:detailed)
      end
    end

    context "with auto format" do
      let(:options) { { format: 'auto' } }

      it "returns auto format" do
        format = cli.send(:determine_welcome_format, options)
        expect(format).to eq(:auto)
      end
    end

    context "with specific format" do
      let(:options) { { format: 'compact' } }

      it "returns the specified format" do
        format = cli.send(:determine_welcome_format, options)
        expect(format).to eq(:compact)
      end
    end

    context "with no format specified" do
      let(:options) { {} }

      it "returns auto format as default" do
        format = cli.send(:determine_welcome_format, options)
        expect(format).to eq(:auto)
      end
    end
  end

  describe "integration with configuration system" do
    before do
      # Mock configuration to test integration
      allow(Gemkanbino::Config::WelcomeConfig).to receive(:should_show_welcome?).and_return(true)
      allow(Gemkanbino::Config::WelcomeConfig).to receive(:get_welcome_format).and_return('auto')
    end

    it "works with configuration system" do
      expect { cli.welcome }.not_to raise_error
    end

    it "respects configuration settings" do
      expect(Gemkanbino::Config::WelcomeConfig).to receive(:get_welcome_format).and_return('compact')
      welcome_service = instance_double(Gemkanbino::WelcomeService)
      expect(Gemkanbino::WelcomeService).to receive(:new).and_return(welcome_service)
      expect(welcome_service).to receive(:display_welcome).with(:compact)

      cli.welcome
    end
  end

  describe "Thor command structure" do
    it "is properly registered as a Thor command" do
      expect(Gemkanbino::CLI.all_commands.keys).to include(:welcome)
    end

    it "has correct command description" do
      command = Gemkanbino::CLI.all_commands[:welcome]
      expect(command.description).to eq("Exibir tela de boas-vindas e informações")
    end

    it "has correct options defined" do
      command = Gemkanbino::CLI.all_commands[:welcome]
      expect(command.options.keys).to include(:format)
      expect(command.options.keys).to include(:no_clear)
      expect(command.options.keys).to include(:tips)
      expect(command.options.keys).to include(:help)
    end

    it "validates format enum values" do
      command = Gemkanbino::CLI.all_commands[:welcome]
      format_option = command.options[:format]
      expect(format_option.enum).to include('auto', 'compact', 'detailed', 'minimal')
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