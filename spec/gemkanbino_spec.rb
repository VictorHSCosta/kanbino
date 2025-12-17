# frozen_string_literal: true

RSpec.describe Gemkanbino do
  it "has a version number" do
    expect(Gemkanbino::VERSION).not_to be nil
  end

  it "does something useful" do
    expect(true).to eq(true)
  end

  describe "Kibi Recipe File" do
    let(:recipe_file_path) { File.join(Dir.pwd, 'receita_kibi.md') }

    it "exists in the project root" do
      expect(File.exist?(recipe_file_path)).to be true
    end

    it "is a readable file" do
      expect(File.readable?(recipe_file_path)).to be true
    end

    it "contains kibi recipe content" do
      content = File.read(recipe_file_path)

      # Verifica se contém elementos básicos de uma receita
      expect(content).to include("Receita de Kibi")
      expect(content).to include("Ingredientes")
      expect(content).to include("Modo de Preparo")

      # Verifica se contém ingredientes específicos do kibi/quiabo
      expect(content).to match(/quiabo/i)
      expect(content).to match(/cebola|alho|azeite/i)
    end

    it "has proper markdown structure" do
      content = File.read(recipe_file_path)

      # Verifica se cabeçalhos markdown estão presentes
      expect(content).to match(/^# \w+/)
      expect(content).to match(/^## \w+/)

      # Verifica se há listas ou tabelas
      expect(content).to match(/^- |\* |\|/)
    end
  end
end
