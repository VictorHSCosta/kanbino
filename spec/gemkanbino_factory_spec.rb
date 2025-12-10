# frozen_string_literal: true

RSpec.describe "Factory Bot examples", type: :model do
  describe "gemkanbino_error factory" do
    it "creates a valid Gemkanbino::Error instance" do
      error = build(:gemkanbino_error)

      expect(error).to be_a(Gemkanbino::Error)
      expect(error.message).to eq("Test error message")
    end

    it "creates a Gemkanbino::Error with custom message" do
      custom_error = Gemkanbino::Error.new("Custom message")

      expect(custom_error).to be_a(Gemkanbino::Error)
      expect(custom_error.message).to eq("Custom message")
    end
  end

  describe "Factory Bot syntax examples" do
    it "demonstrates create vs build" do
      # Build creates object without saving (if applicable)
      error = build(:gemkanbino_error)
      expect(error).to be_a(Gemkanbino::Error)

      # Create would save the object (if it were an ActiveRecord model)
      # For plain Ruby objects, create behaves like build
      created_error = create(:gemkanbino_error)
      expect(created_error).to be_a(Gemkanbino::Error)
    end

    it "demonstrates attributes_for" do
      # attributes_for returns a hash of attributes
      # For this simple error factory, it returns an empty hash
      attrs = attributes_for(:gemkanbino_error)
      expect(attrs).to be_a(Hash)
    end
  end
end