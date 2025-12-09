# frozen_string_literal: true

# Factory Bot definitions for gemkanbino
FactoryBot.define do
  factory :gemkanbino_error, class: "Gemkanbino::Error" do
    initialize_with { new("Test error message") }
  end
end