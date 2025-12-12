#!/usr/bin/env ruby
# frozen_string_literal: true

# Simple test script to validate our implementation
require_relative 'lib/gemkanbino'

puts "🧪 Testing Kanbino Implementation..."
puts

# Test ConfigManager
puts "1. Testing ConfigManager..."
begin
  config_manager = Gemkanbino::ConfigManager.new
  config_manager.set_config('test.key', 'test_value')
  value = config_manager.get_config('test.key')
  puts "✓ ConfigManager working: #{value}"
rescue => e
  puts "✗ ConfigManager error: #{e.message}"
end

# Test WelcomeDisplay
puts "2. Testing WelcomeDisplay..."
begin
  welcome = Gemkanbino::WelcomeDisplay.new
  puts "✓ WelcomeDisplay initialized successfully"
rescue => e
  puts "✗ WelcomeDisplay error: #{e.message}"
end

# Test TerminalHelper
puts "3. Testing TerminalHelper..."
begin
  terminal_size = Gemkanbino::Utils::TerminalHelper.terminal_size
  puts "✓ TerminalHelper working: #{terminal_size}"
rescue => e
  puts "✗ TerminalHelper error: #{e.message}"
end

# Test Completion
puts "4. Testing Completion..."
begin
  completion = Gemkanbino::Utils::Completion.new
  suggestions = completion.suggestions('h')
  puts "✓ Completion working: #{suggestions.size} suggestions"
rescue => e
  puts "✗ Completion error: #{e.message}"
end

# Test History
puts "5. Testing History..."
begin
  history = Gemkanbino::Utils::History.new
  history.add('test command')
  puts "✓ History working: #{history.size} commands"
rescue => e
  puts "✗ History error: #{e.message}"
end

# Test CLI command registration
puts "6. Testing CLI commands..."
begin
  cli = Gemkanbino::CLI.new
  puts "✓ CLI initialized successfully"

  # Check if home method exists
  if cli.respond_to?(:home)
    puts "✓ Home command registered"
  else
    puts "✗ Home command missing"
  end
rescue => e
  puts "✗ CLI error: #{e.message}"
end

puts
puts "🎯 Implementation validation complete!"