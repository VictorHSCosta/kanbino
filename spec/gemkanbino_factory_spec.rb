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

  describe "file_error factory" do
    it "creates a valid FileError instance" do
      error = build(:file_error)

      expect(error).to be_a(Gemkanbino::Exceptions::FileError)
      expect(error.message).to eq("Test file error")
      expect(error.file_path).to eq("/test/path")
      expect(error.operation).to eq(:read)
    end
  end

  describe "file_not_found_error factory" do
    it "creates a valid FileNotFoundError instance" do
      error = build(:file_not_found_error)

      expect(error).to be_a(Gemkanbino::Exceptions::FileNotFoundError)
      expect(error.message).to include("File not found: /test/nonexistent/file.txt")
      expect(error.file_path).to eq("/test/nonexistent/file.txt")
    end
  end

  describe "upload_error factory" do
    it "creates a valid UploadError instance" do
      error = build(:upload_error)

      expect(error).to be_a(Gemkanbino::Exceptions::UploadError)
      expect(error.message).to eq("Test upload error")
      expect(error.file_path).to eq("/test/file.txt")
      expect(error.provider).to eq(:test_provider)
      expect(error.response_code).to eq(500)
    end
  end

  describe "provider_not_found_error factory" do
    it "creates a valid ProviderNotFoundError instance" do
      error = build(:provider_not_found_error)

      expect(error).to be_a(Gemkanbino::Exceptions::ProviderNotFoundError)
      expect(error.message).to include("Upload provider not found: nonexistent_provider")
      expect(error.provider).to eq("nonexistent_provider")
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