# frozen_string_literal: true

# Factory Bot definitions for gemkanbino
FactoryBot.define do
  factory :gemkanbino_error, class: Gemkanbino::Error do
    skip_create
    initialize_with { new("Test error message") }
  end

  factory :file_error, class: Gemkanbino::Exceptions::FileError do
    skip_create
    initialize_with { new("Test file error", "/test/path", :read) }
  end

  factory :file_not_found_error, class: Gemkanbino::Exceptions::FileNotFoundError do
    skip_create
    initialize_with { new("/test/nonexistent/file.txt") }
  end

  factory :upload_error, class: Gemkanbino::Exceptions::UploadError do
    skip_create
    initialize_with { new("Test upload error", "/test/file.txt", :test_provider, 500) }
  end

  factory :provider_not_found_error, class: Gemkanbino::Exceptions::ProviderNotFoundError do
    skip_create
    initialize_with { new("nonexistent_provider") }
  end
end