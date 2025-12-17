# frozen_string_literal: true

require "fileutils"
require "pastel"

module Gemkanbino
  # Handles file system navigation operations
  class FileNavigator
    attr_reader :pastel

    def initialize
      @pastel = Pastel.new
    end

    def list_files(path = ".", options = {})
      unless Dir.exist?(path)
        puts pastel.red("Error: Directory '#{path}' does not exist.")
        return
      end

      begin
        entries = get_directory_entries(path, options[:all])

        if entries.empty?
          puts pastel.yellow("Directory is empty")
          return
        end

        if options[:long]
          display_long_format(entries, path)
        else
          display_simple_format(entries)
        end
      rescue Errno::PermissionError
        puts pastel.red("Error: Permission denied to access '#{path}'")
      rescue => e
        puts pastel.red("Error accessing directory: #{e.message}")
      end
    end

    def change_directory(path)
      unless Dir.exist?(path)
        puts pastel.red("Error: Directory '#{path}' does not exist.")
        return false
      end

      begin
        Dir.chdir(path)
        puts pastel.green("Changed to: #{Dir.pwd}")
        true
      rescue Errno::PermissionError
        puts pastel.red("Error: Permission denied to access '#{path}'")
        false
      rescue => e
        puts pastel.red("Error changing directory: #{e.message}")
        false
      end
    end

    def current_directory
      Dir.pwd
    end

    def directory_exists?(path)
      Dir.exist?(path)
    end

    def parent_directory
      File.expand_path("..", Dir.pwd)
    end

    def home_directory
      Dir.home
    end

    def navigate_interactive
      loop do
        puts pastel.cyan("\nCurrent directory: #{Dir.pwd}")
        puts pastel.yellow("Options: [cd] [ls] [pwd] [parent] [home] [quit]")

        choice = prompt("Enter command: ").strip.downcase

        case choice
        when "quit", "exit", "q"
          break
        when "pwd"
          puts pastel.blue(Dir.pwd)
        when "parent", ".."
          change_directory("..")
        when "home", "~"
          change_directory(Dir.home)
        when "ls"
          list_files(Dir.pwd)
        when /^cd\s+(.+)$/
          target = $1.strip
          change_directory(target)
        else
          puts pastel.red("Unknown command. Try: cd, ls, pwd, parent, home, quit")
        end
      end
    end

    private

    def get_directory_entries(path, show_hidden = false)
      entries = Dir.entries(path)

      unless show_hidden
        entries = entries.reject { |entry| entry.start_with?(".") }
      end

      # Sort directories first, then files
      entries.sort_by do |entry|
        full_path = File.join(path, entry)
        File.directory?(full_path) ? "0#{entry}" : "1#{entry}"
      end
    end

    def display_simple_format(entries)
      entries.each do |entry|
        display_entry(entry)
      end
    end

    def display_long_format(entries, base_path)
      max_size = entries.map(&:length).max || 0

      puts pastel.bold("Type".ljust(4) + "Size".ljust(12) + "Name".ljust(max_size + 2) + "Modified")
      puts "-" * (50 + max_size)

      entries.each do |entry|
        full_path = File.join(base_path, entry)
        stat = File.stat(full_path) rescue nil

        if stat
          type = File.directory?(full_path) ? pastel.blue("DIR ") : pastel.green("FILE")
          size = format_file_size(stat.size)
          name = format_entry_name(entry, File.directory?(full_path))
          modified = stat.mtime.strftime("%Y-%m-%d %H:%M")

          puts "#{type} #{size.ljust(12)} #{name.ljust(max_size + 2)} #{modified}"
        else
          puts pastel.red("????") + " " * 8 + "#{entry.ljust(max_size + 2)} [unreadable]"
        end
      end
    end

    def display_entry(entry)
      if entry.start_with?(".")
        puts pastel.bright_black(entry)
      elsif File.directory?(entry)
        puts pastel.blue("#{entry}/")
      else
        puts entry
      end
    end

    def format_entry_name(entry, is_directory)
      if is_directory
        pastel.blue("#{entry}/")
      elsif entry.start_with?(".")
        pastel.bright_black(entry)
      else
        entry
      end
    end

    def format_file_size(size)
      require "filesize"
      Filesize.new(size).pretty
    rescue
      "#{size}B"
    end

    def prompt(message)
      print pastel.cyan(message)
      gets.chomp
    end
  end
end