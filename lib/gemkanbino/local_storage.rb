# frozen_string_literal: true

require "fileutils"
require "digest"
require "json"
require "date"
require "pastel"

module Gemkanbino
  # Manages local file storage with organization and metadata
  class LocalStorage
    attr_reader :pastel, :storage_root

    def initialize
      @pastel = Pastel.new
      @storage_root = get_storage_directory
      ensure_storage_directory
      @index_file = File.join(@storage_root, "index.json")
      load_index
    end

    def copy_file(file_path, target_name = nil)
      file_path = File.expand_path(file_path)

      # Validate file
      Utils::FileValidator.validate_file_readable(file_path)

      # Generate target name if not provided
      target_name ||= generate_target_name(file_path)

      # Create target directory
      target_dir = File.join(@storage_root, target_name)
      FileUtils.mkdir_p(target_dir)

      # Copy file
      target_file = File.join(target_dir, File.basename(file_path))
      FileUtils.cp(file_path, target_file)

      # Create metadata
      metadata = create_metadata(file_path, target_name)

      # Save metadata
      metadata_file = File.join(target_dir, "metadata.json")
      File.write(metadata_file, JSON.pretty_generate(metadata))

      # Update index
      add_to_index(target_name, metadata)

      puts pastel.green("✓ File copied to storage: #{target_name}")
      puts pastel.dim("Location: #{target_dir}")
      puts pastel.dim("Original: #{file_path}")

      target_name
    end

    def copy_selected_file(target_name = nil)
      manager = FileManager.new
      current_file = manager.current_selection

      if current_file.nil?
        puts pastel.yellow("No file selected. Use 'select <file>' first.")
        return false
      end

      copy_file(current_file, target_name)
    end

    def list_stored_files(filter = nil)
      if @index.empty?
        puts pastel.yellow("No files stored yet.")
        return
      end

      filtered_files = filter_files(@index, filter)

      if filtered_files.empty?
        puts pastel.yellow("No files match filter: #{filter}")
        return
      end

      puts pastel.cyan("📦 Stored Files (#{filtered_files.length}):")
      puts "=" * 80

      filtered_files.each do |name, metadata|
        display_stored_file(name, metadata)
      end

      puts "=" * 80
      puts pastel.dim("Storage location: #{@storage_root}")
    end

    def get_stored_file_info(name)
      metadata = @index[name]
      return nil unless metadata

      puts pastel.cyan("\n📦 Stored File Information: #{name}")
      puts "=" * 50

      display_file_metadata(metadata)

      # Check if file exists
      file_path = get_file_path(name)
      if File.exist?(file_path)
        puts pastel.green("✓ File exists in storage")
      else
        puts pastel.red("✗ File missing from storage")
      end

      puts "=" * 50
    end

    def retrieve_file(name, destination = nil)
      metadata = @index[name]
      return false unless metadata

      source_path = get_file_path(name)
      unless File.exist?(source_path)
        puts pastel.red("Error: File '#{name}' not found in storage.")
        return false
      end

      destination ||= File.join(Dir.pwd, metadata["original_name"])

      if File.exist?(destination)
        overwrite = ask_overwrite(destination)
        return false unless overwrite
      end

      FileUtils.cp(source_path, destination)
      puts pastel.green("✓ File retrieved: #{destination}")
      true
    end

    def delete_stored_file(name)
      metadata = @index[name]
      return false unless metadata

      file_dir = File.join(@storage_root, name)

      if File.exist?(file_dir)
        FileUtils.rm_rf(file_dir)
        puts pastel.yellow("🗑️ Deleted stored file: #{name}")
      end

      @index.delete(name)
      save_index

      true
    end

    def cleanup_storage
      puts pastel.cyan("🧹 Cleaning up storage...")

      removed_count = 0
      @index.each do |name, metadata|
        file_path = get_file_path(name)
        unless File.exist?(file_path)
          @index.delete(name)
          removed_count += 1
          puts pastel.yellow("Removed missing file from index: #{name}")
        end
      end

      save_index if removed_count > 0
      puts pastel.green("✓ Cleanup completed. Removed #{removed_count} missing files.")
    end

    def get_storage_stats
      total_files = @index.length
      total_size = calculate_total_size
      oldest_date = @index.values.map { |m| m["stored_at"] }.min
      newest_date = @index.values.map { |m| m["stored_at"] }.max

      {
        total_files: total_files,
        total_size: total_size,
        total_size_formatted: format_size(total_size),
        storage_location: @storage_root,
        oldest_file: oldest_date,
        newest_file: newest_date,
        index_size: File.size(@index_file) if File.exist?(@index_file)
      }
    end

    def show_storage_stats
      stats = get_storage_stats

      puts pastel.cyan("📊 Storage Statistics:")
      puts "=" * 40
      puts pastel.bold("Total Files:") + " #{stats[:total_files]}"
      puts pastel.bold("Total Size:") + " #{stats[:total_size_formatted]}"
      puts pastel.bold("Location:") + " #{stats[:storage_location]}"

      if stats[:oldest_file]
        puts pastel.bold("Oldest File:") + " #{Date.parse(stats[:oldest_file]).strftime('%Y-%m-%d')}"
        puts pastel.bold("Newest File:") + " #{Date.parse(stats[:newest_file]).strftime('%Y-%m-%d')}"
      end

      puts pastel.bold("Index Size:") + " #{format_size(stats[:index_size] || 0)}" if stats[:index_size]
      puts "=" * 40
    end

    def compress_storage
      puts pastel.cyan("🗜️ Compressing old files...")

      cutoff_date = Date.today - 30 # 30 days ago
      compressed_count = 0

      @index.each do |name, metadata|
        stored_date = Date.parse(metadata["stored_at"])

        if stored_date < cutoff_date
          file_dir = File.join(@storage_root, name)
          archive_name = "#{name}.tar.gz"

          if compress_directory(file_dir, archive_name)
            @index.delete(name)
            compressed_count += 1
            puts pastel.green("✓ Compressed: #{name}")
          end
        end
      end

      save_index if compressed_count > 0
      puts pastel.green("✓ Compression completed. Archived #{compressed_count} files.")
    end

    private

    def get_storage_directory
      # ConfigManager not yet implemented, using default paths only
      # TODO: Implement config management when ConfigManager is available

      # Default locations
      default_paths = [
        File.join(Dir.home, ".gemkanbino", "storage"),
        File.join(Dir.tmpdir, "gemkanbino", "storage"),
        File.join(Dir.pwd, ".gemkanbino_storage")
      ]

      default_paths.find { |path| can_create_directory?(path) } || default_paths.first
    end

    def can_create_directory?(path)
      parent = File.dirname(path)
      Dir.exist?(parent) && File.writable?(parent)
    end

    def ensure_storage_directory
      FileUtils.mkdir_p(@storage_root)
    end

    def generate_target_name(file_path)
      basename = File.basename(file_path, ".*")
      timestamp = Time.now.strftime("%Y%m%d_%H%M%S")
      random_suffix = (0...3).map { (65 + rand(26)).chr }.join.downcase

      "#{basename}_#{timestamp}_#{random_suffix}"
    end

    def create_metadata(file_path, target_name)
      stat = File.stat(file_path)
      md5_hash = Digest::MD5.file(file_path).hexdigest

      {
        target_name: target_name,
        original_path: file_path,
        original_name: File.basename(file_path),
        stored_at: Time.now.iso8601,
        size: stat.size,
        md5_hash: md5_hash,
        content_type: get_content_type(file_path),
        created_at: stat.ctime.iso8601,
        modified_at: stat.mtime.iso8601,
        tags: []
      }
    end

    def get_content_type(file_path)
      mime_types = MIME::Types.type_for(file_path)
      mime_types.first&.content_type
    end

    def load_index
      if File.exist?(@index_file)
        begin
          @index = JSON.parse(File.read(@index_file))
        rescue JSON::ParserError
          puts pastel.yellow("Warning: Corrupted index file, creating new one.")
          @index = {}
        end
      else
        @index = {}
      end
    end

    def save_index
      File.write(@index_file, JSON.pretty_generate(@index))
    end

    def add_to_index(name, metadata)
      @index[name] = metadata
      save_index
    end

    def get_file_path(name)
      metadata = @index[name]
      return nil unless metadata

      File.join(@storage_root, name, metadata["original_name"])
    end

    def filter_files(index, filter)
      return index unless filter

      filter = filter.downcase
      index.select do |name, metadata|
        name.downcase.include?(filter) ||
          metadata["original_name"].downcase.include?(filter) ||
          metadata["content_type"]&.downcase&.include?(filter)
      end
    end

    def display_stored_file(name, metadata)
      size_str = format_size(metadata["size"])
      date_str = Date.parse(metadata["stored_at"]).strftime("%Y-%m-%d")

      file_path = get_file_path(name)
      status = File.exist?(file_path) ? pastel.green("✓") : pastel.red("✗")

      puts "#{status} #{name.ljust(30)} #{metadata["original_name"].ljust(25)} #{size_str.rjust(8)} #{date_str}"
    end

    def display_file_metadata(metadata)
      puts pastel.bold("Original Name:") + " #{metadata['original_name']}"
      puts pastel.bold("Original Path:") + " #{metadata['original_path']}"
      puts pastel.bold("Size:") + " #{format_size(metadata['size'])}"
      puts pastel.bold("Type:") + " #{metadata['content_type'] || 'Unknown'}"
      puts pastel.bold("MD5:") + " #{metadata['md5_hash']}"
      puts pastel.bold("Stored:") + " #{Date.parse(metadata['stored_at']).strftime('%Y-%m-%d %H:%M:%S')}"
    end

    def format_size(bytes)
      require "filesize"
      Filesize.new(bytes).pretty
    rescue StandardError
        "#{bytes}B"
    end

    def ask_overwrite(destination)
      require "tty/prompt"
      prompt = TTY::Prompt.new

      prompt.yes?("File '#{File.basename(destination)}' already exists. Overwrite?")
    end

    def compress_directory(dir_path, archive_name)
      begin
        archive_path = File.join(@storage_root, archive_name)
        FileUtils.cd(@storage_root) do
          system("tar -czf #{archive_name} #{File.basename(dir_path)}")
        end

        if File.exist?(archive_path)
          FileUtils.rm_rf(dir_path)
          true
        else
          false
        end
      rescue StandardError => e
        puts pastel.red("Error compressing directory: #{e.message}")
        false
      end
    end

    def calculate_total_size
      @index.values.sum { |metadata| metadata["size"] || 0 }
    end
  end
end