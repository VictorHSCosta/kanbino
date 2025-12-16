# frozen_string_literal: true

require "spec_helper"
require "gemkanbino/cli"

RSpec.describe Gemkanbino::CLI do
  let(:cli) { Gemkanbino::CLI.new }

  describe "#welcome" do
    it "displays welcome message" do
      allow(cli).to receive(:puts)
      allow(cli).to receive(:`).and_return("80")

      expect(cli.pastel).to receive(:blue).with("═" * 80)
      expect(cli.pastel).to receive(:green).and_wrap_original do |original, *args|
        original.call(*args)
      end
      expect(cli.pastel).to receive(:blue).with("═" * 80)

      cli.welcome
    end

    it "centers the welcome message" do
      allow(cli).to receive(:puts)
      allow(cli).to receive(:`).and_return("80")

      expect(cli.pastel.green.bold).to receive(:center).with(80).and_call_original
      cli.welcome
    end

    it "handles terminal width detection failure gracefully" do
      allow(cli).to receive(:puts)
      allow(cli).to receive(:`).and_return("0")

      expect(cli.pastel).to receive(:blue).with("═" * 80)
      cli.welcome
    end
  end
end