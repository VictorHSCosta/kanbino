# frozen_string_literal: true

require "spec_helper"

RSpec.describe Gemkanbino::CLI do
  let(:cli) { described_class.new }

  describe "#welcome" do
    it "displays the welcome screen" do
      display_utils = instance_double(Gemkanbino::Utils::DisplayUtils)
      allow(Gemkanbino::Utils::DisplayUtils).to receive(:new).and_return(display_utils)
      expect(display_utils).to receive(:show_welcome)

      cli.welcome
    end

    it "handles the auto option" do
      display_utils = instance_double(Gemkanbino::Utils::DisplayUtils)
      allow(Gemkanbino::Utils::DisplayUtils).to receive(:new).and_return(display_utils)
      expect(display_utils).to receive(:show_welcome)

      cli.welcome({ auto: true })
    end

    it "creates DisplayUtils instance" do
      display_utils = instance_double(Gemkanbino::Utils::DisplayUtils)
      allow(display_utils).to receive(:show_welcome)
      allow(Gemkanbino::Utils::DisplayUtils).to receive(:new).and_return(display_utils)

      cli.welcome

      expect(Gemkanbino::Utils::DisplayUtils).to have_received(:new)
    end
  end

  describe "help integration" do
    it "includes welcome command in help output" do
      help_output = capture(:stdout) { cli.help }
      expect(help_output).to include("welcome")
      expect(help_output).to include("Display welcome screen")
    end
  end

  describe "command registration" do
    it "has the welcome command registered" do
      expect(cli.class.commands).to have_key("welcome")
      expect(cli.class.commands["welcome"].description).to eq("Display welcome screen")
    end

    it "supports the auto option" do
      command_options = cli.class.commands["welcome"].options
      expect(command_options).to have_key("auto")
      expect(command_options["auto"].type).to eq(:boolean)
    end
  end
end