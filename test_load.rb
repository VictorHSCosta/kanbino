#!/usr/bin/env ruby
# frozen_string_literal: true

# Simple test to verify all files load correctly
puts "Testing gem loading..."

begin
  require_relative "lib/gemkanbino"
  puts "✓ gemkanbino loaded successfully"

  # Test creating basic objects
  config_manager = Gemkanbino::ConfigManager.new
  puts "✓ ConfigManager created successfully"

  puts "✓ All tests passed!"
rescue => e
  puts "✗ Error: #{e.message}"
  puts e.backtrace.first(5)
  exit 1
end