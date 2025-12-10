# frozen_string_literal: true

require "fileutils"
require "tty/prompt"

module Gemkanbino
  module LocalStorage
    # Utility methods for storage operations
    module StorageUtils
      private

      def get_storage_directory
        # Default locations (since ConfigManager is not implemented yet)
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
        rescue => e
          puts pastel.red("Error compressing directory: #{e.message}")
          false
        end
      end
    end
  end
end