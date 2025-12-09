# frozen_string_literal: true

module Gemkanbino
  module Commands
    # Storage-related CLI commands
    class Storage < Thor
      desc "list [FILTER]", "List stored files, optionally filtered"
      def list(filter = nil)
        storage = LocalStorage.new
        storage.list_stored_files(filter)
      end

      desc "info NAME", "Show detailed information about a stored file"
      def info(name)
        storage = LocalStorage.new
        info = storage.get_stored_file_info(name)

        unless info
          puts "File '#{name}' not found in storage."
        end
      end

      desc "retrieve NAME [DESTINATION]", "Retrieve a stored file"
      option :force, aliases: "-f", type: :boolean, desc: "Force overwrite existing files"
      def retrieve(name, destination = nil)
        storage = LocalStorage.new
        success = storage.retrieve_file(name, destination)

        unless success
          puts "Failed to retrieve file '#{name}'."
        end
      end

      desc "delete NAME", "Delete a stored file"
      option :confirm, aliases: "-y", type: :boolean, desc: "Skip confirmation prompt"
      def delete(name)
        storage = LocalStorage.new

        unless options[:confirm]
          require "tty/prompt"
          prompt = TTY::Prompt.new
          confirm = prompt.yes?("Are you sure you want to delete '#{name}'?")

          unless confirm
            puts "Operation cancelled."
            return
          end
        end

        success = storage.delete_stored_file(name)

        unless success
          puts "Failed to delete file '#{name}'."
        end
      end

      desc "stats", "Show storage statistics"
      def stats
        storage = LocalStorage.new
        storage.show_storage_stats
      end

      desc "cleanup", "Remove missing files from index"
      def cleanup
        storage = LocalStorage.new
        storage.cleanup_storage
      end

      desc "compress", "Compress old files"
      option :days, aliases: "-d", type: :numeric, default: 30, desc: "Compress files older than N days"
      def compress
        # Note: The LocalStorage.compress_storage method uses hardcoded 30 days
        # This could be enhanced to accept the days option
        storage = LocalStorage.new
        storage.compress_storage
      end

      desc "path", "Show storage directory path"
      def path
        storage = LocalStorage.new
        puts storage.storage_root
      end
    end
  end
end