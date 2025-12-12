# frozen_string_literal: true

require "spec_helper"
require "stringio"

RSpec.describe Gemkanbino::CLI do
  let(:cli) { described_class.new }
  let(:output) { StringIO.new }
  let(:terminal_width) { 80 }

  before do
    # Mock terminal width
    allow(IO).to receive(:console).and_return(winsize: [24, terminal_width])

    # Redirect stdout to capture output
    $stdout = output
  end

  after do
    # Restore stdout
    $stdout = STDOUT
  end

  describe "#inicio" do
    it "exibe mensagem de boas-vindas centralizada" do
      cli.inicio

      output_string = output.string
      expect(output_string).to include("Bem-vindo")
      expect(output_string).to include("✨")
      expect(output_string).to include("Use 'gemkanbino help' para ver todos os comandos")
    end

    it "usa cores na mensagem de boas-vindas" do
      expect(cli.pastel).to receive(:green).with("Bem-vindo").and_call_original
      expect(cli.pastel).to receive(:cyan).and_call_original
      expect(cli.pastel).to receive(:dim).and_call_original

      cli.inicio
    end

    context "com terminal de diferentes larguras" do
      let(:terminal_width) { 120 }

      it "centraliza mensagem adequadamente" do
        cli.inicio

        output_string = output.string
        lines = output_string.split("\n").reject(&:empty?)

        # Verificar que há padding para centralização
        expect(lines.first).to start_with(" ")
      end
    end

    context "com terminal muito pequeno" do
      let(:terminal_width) { 20 }

      it "ainda exibe mensagem sem quebrar" do
        cli.inicio

        output_string = output.string
        expect(output_string).to include("Bem-vindo")
      end
    end
  end

  describe "#get_terminal_width" do
    it "retorna largura do terminal quando disponível" do
      allow(IO).to receive(:console).and_return(winsize: [24, 100])

      width = cli.send(:get_terminal_width)
      expect(width).to eq(100)
    end

    it "retorna fallback de 80 quando não é possível obter largura" do
      allow(IO).to receive(:console).and_raise(StandardError.new("Erro"))

      width = cli.send(:get_terminal_width)
      expect(width).to eq(80)
    end
  end

  describe "#calculate_center_padding" do
    it "calcula padding correto para centralização" do
      padding = cli.send(:calculate_center_padding, 10, 80)
      expect(padding).to eq(35) # (80 - 10) / 2
    end

    it "retorna 0 quando texto é maior que terminal" do
      padding = cli.send(:calculate_center_padding, 100, 80)
      expect(padding).to eq(0)
    end
  end

  describe "aliases" do
    context "comando welcome" do
      it "delegar para comando inicio" do
        expect(cli).to receive(:display_welcome_message)

        # Simular chamada do Thor com mapeamento
        cli.invoke(:inicio)
      end
    end
  end
end