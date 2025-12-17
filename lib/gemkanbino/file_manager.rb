# frozen_string_literal: true

require "fileutils"
require "digest"
require "mime/types"
require "pastel"
require "tty/prompt"

module Gemkanbino
  # Manages file selection and operations
  class FileManager
    attr_reader :pastel, :prompt, :selected_files

    def initialize
      @pastel = Pastel.new
      @prompt = TTY::Prompt.new
      @selected_files = []
      @current_selection = nil
    end

    def select_file(file_path)
      file_path = File.expand_path(file_path)

      unless File.exist?(file_path)
        puts pastel.red("Error: File '#{file_path}' does not exist.")
        return false
      end

      unless File.file?(file_path)
        puts pastel.yellow("Warning: '#{file_path}' is a directory, not a file.")
        return false
      end

      @current_selection = file_path
      @selected_files << file_path unless @selected_files.include?(file_path)

      puts pastel.green("✓ Selected: #{File.basename(file_path)}")
      puts pastel.dim("Full path: #{file_path}")
      true
    end

    def select_multiple_files(pattern = nil)
      if pattern
        files = Dir.glob(pattern).select { |f| File.file?(f) }
      else
        files = Dir.glob("*").select { |f| File.file?(f) }
      end

      if files.empty?
        puts pastel.yellow("No files found matching the pattern.")
        return []
      end

      choices = files.map do |file|
        {
          name: format_file_choice(file),
          value: file
        }
      end

      selected = @prompt.multi_select("Select files to operate on:", choices)

      selected.each { |file| select_file(file) }
      selected
    end

    def show_file_info(file_path)
      file_path = File.expand_path(file_path)

      unless File.exist?(file_path)
        puts pastel.red("Error: File '#{file_path}' does not exist.")
        return
      end

      begin
        stat = File.stat(file_path)
        display_file_info(file_path, stat)
      rescue StandardError => e
        puts pastel.red("Error reading file info: #{e.message}")
      end
    end

    def show_selected_file_info
      if @current_selection.nil?
        puts pastel.yellow("No file selected. Use 'select <file>' to select a file.")
        return
      end

      show_file_info(@current_selection)
    end

    def preview_file(file_path = nil, lines: 20)
      file_path ||= @current_selection

      if file_path.nil?
        puts pastel.yellow("No file selected and no file path provided.")
        return
      end

      file_path = File.expand_path(file_path)

      unless File.exist?(file_path)
        puts pastel.red("Error: File '#{file_path}' does not exist.")
        return
      end

      begin
        content_type = get_content_type(file_path)

        if content_type&.start_with?("text/") || is_text_file?(file_path)
          preview_text_file(file_path, lines)
        elsif content_type&.start_with?("image/")
          preview_image_file(file_path)
        else
          puts pastel.yellow("Binary file detected. Cannot preview content.")
          display_file_info(file_path, File.stat(file_path))
        end
      rescue StandardError => e
        puts pastel.red("Error previewing file: #{e.message}")
      end
    end

    def current_selection
      @current_selection
    end

    def selected_files
      @selected_files.dup
    end

    def clear_selection
      @current_selection = nil
      @selected_files.clear
      puts pastel.green("Selection cleared.")
    end

    def remove_from_selection(file_path = nil)
      if file_path.nil?
        @selected_files.pop
        puts pastel.green("Removed last selected file.")
      else
        file_path = File.expand_path(file_path)
        if @selected_files.delete(file_path)
          puts pastel.green("Removed from selection: #{File.basename(file_path)}")
        else
          puts pastel.yellow("File not in selection: #{File.basename(file_path)}")
        end
      end

      @current_selection = @selected_files.last
    end

    def list_selection
      if @selected_files.empty?
        puts pastel.yellow("No files selected.")
        return
      end

      puts pastel.cyan("Selected files (#{@selected_files.length}):")
      puts "-" * 50

      @selected_files.each_with_index do |file, index|
        marker = file == @current_selection ? pastel.green("►") : " "
        size = File.size(file) rescue StandardError
        0
        size_str = format_file_size(size)

        puts "#{marker} #{index + 1}. #{File.basename(file).ljust(30)} #{size_str.rjust(8)}"
        puts "   #{pastel.dim(file)}" if file == @current_selection
      end
    end

    def interactive_file_selector(directory = ".")
      unless Dir.exist?(directory)
        puts pastel.red("Directory '#{directory}' does not exist.")
        return nil
      end

      loop do
        files = get_files_for_selection(directory)

        if files.empty?
          puts pastel.yellow("No files in this directory.")
          return nil
        end

        choices = [
          { name: ".. (Parent Directory)", value: :parent },
          { name: "Current Directory: #{directory}", value: :current, disabled: true },
          { name: "---", value: :separator, disabled: true }
        ] + files

        choice = @prompt.select("Select a file or navigate:", choices)

        case choice
        when :parent
          directory = File.expand_path("..", directory)
        when :current
          # Do nothing, just refresh
        when :separator
          # Do nothing
        else
          # File selected
          if select_file(choice)
            return choice
          end
        end
      end
    end

    private

    def display_file_info(file_path, stat)
      puts pastel.cyan("\n📄 File Information:")
      puts "=" * 50
      puts pastel.bold("Name:") + " " + File.basename(file_path)
      puts pastel.bold("Path:") + " " + file_path
      puts pastel.bold("Size:") + " " + format_file_size(stat.size)
      puts pastel.bold("Type:") + " " + get_content_description(file_path)
      puts pastel.bold("Permissions:") + " " + format_permissions(stat.mode)
      puts pastel.bold("Created:") + " " + stat.ctime.strftime("%Y-%m-%d %H:%M:%S")
      puts pastel.bold("Modified:") + " " + stat.mtime.strftime("%Y-%m-%d %H:%M:%S")
      puts pastel.bold("Accessed:") + " " + stat.atime.strftime("%Y-%m-%d %H:%M:%S")

      if File.size(file_path) < 1_000_000 # Less than 1MB
        md5 = calculate_file_hash(file_path, "MD5")
        puts pastel.bold("MD5:") + " " + md5
      end

      puts "=" * 50
    end

    def preview_text_file(file_path, lines)
      puts pastel.cyan("\n📖 Preview: #{File.basename(file_path)}")
      puts "-" * 50

      file_lines = File.readlines(file_path, encoding: "UTF-8")
      total_lines = file_lines.length
      preview_lines = [lines, total_lines].min

      puts pastel.dim("Showing #{preview_lines} of #{total_lines} lines:")
      puts

      file_lines.first(preview_lines).each_with_index do |line, index|
        line_num = (index + 1).to_s.rjust(4)
        content = line.chomp
        puts pastel.dim(line_num + ":") + " " + content
      end

      if total_lines > lines
        puts pastel.dim("\n... (#{total_lines - lines} more lines)")
      end

      puts "-" * 50
    end

    def preview_image_file(file_path)
      puts pastel.cyan("\n🖼️ Image Information:")
      puts "-" * 50
      puts pastel.bold("File:") + " " + File.basename(file_path)
      puts pastel.bold("Path:") + " " + file_path
      puts pastel.bold("Size:") + " " + format_file_size(File.size(file_path))
      puts pastel.bold("Type:") + " " + get_content_type(file_path) || "Unknown"
      puts pastel.yellow("Image preview not available in terminal mode")
      puts "-" * 50
    end

    def get_files_for_selection(directory)
      Dir.glob("#{directory}/*")
        .select { |f| File.file?(f) }
        .map do |file|
          {
            name: format_file_choice(file),
            value: File.expand_path(file)
          }
        end
        .sort_by { |f| f[:name] }
    end

    def format_file_choice(file)
      basename = File.basename(file)
      size = File.size(file) rescue StandardError
        0
      size_str = format_file_size(size)

      "#{basename.ljust(25)} #{size_str.rjust(8)}"
    end

    def get_content_type(file_path)
      mime_types = MIME::Types.type_for(file_path)
      mime_types.first&.content_type
    end

    def get_content_description(file_path)
      content_type = get_content_type(file_path)
      return "File" unless content_type

      case content_type
      when /^text\//
        "Text File"
      when /^image\//
        "Image File"
      when /^audio\//
        "Audio File"
      when /^video\//
        "Video File"
      when /^application\/pdf/
        "PDF Document"
      when /^application\/json/
        "JSON File"
      when /^application\/xml/
        "XML File"
      else
        content_type.split("/").map(&:capitalize).join(" ")
      end
    end

    def is_text_file?(file_path)
      text_extensions = %w[.txt .rb .py .js .html .css .md .yml .yaml .json .xml .csv .log .conf]
      text_extensions.include?(File.extname(file_path).downcase)
    end

    def format_permissions(mode)
      permissions = ""
      3.times do |i|
        bits = (mode >> (6 - i * 3)) & 0x7
        permissions += (bits & 4 != 0) ? "r" : "-"
        permissions += (bits & 2 != 0) ? "w" : "-"
        permissions += (bits & 1 != 0) ? "x" : "-"
      end
      permissions
    end

    def format_file_size(size)
      require "filesize"
      Filesize.new(size).pretty
    rescue StandardError
        "#{size}B"
    end

    def calculate_file_hash(file_path, algorithm)
      case algorithm
      when "MD5"
        Digest::MD5.file(file_path).hexdigest
      when "SHA1"
        Digest::SHA1.file(file_path).hexdigest
      when "SHA256"
        Digest::SHA256.file(file_path).hexdigest
      else
        "Unknown algorithm"
      end
    rescue StandardError => e
      "Error calculating hash: #{e.message}"
    end
  end
end