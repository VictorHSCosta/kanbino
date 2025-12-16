#!/usr/bin/env ruby
# frozen_string_literal: true

require_relative "lib/gemkanbino"

# Simulate terminal width for testing
class CLI
  def initialize
    @pastel = Pastel.new
  end

  def welcome
    # For testing purposes, let's simulate terminal width
    terminal_width = 80
    width = terminal_width > 0 ? terminal_width : 80

    puts @pastel.blue("═" * width)
    puts ""
    puts @pastel.green.bold("Bem Vindo".center(width))
    puts ""
    puts @pastel.blue("═" * width)
  end
end

cli = CLI.new
cli.welcome