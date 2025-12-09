# frozen_string_literal: true

module Gemkanbino
  module Commands
    # Upload-related CLI commands
    class Upload < Thor
      desc "file FILE_PATH [PROVIDER]", "Upload a file to cloud storage"
      option :provider, aliases: "-p", desc: "Upload provider (fileio, transfersh)"
      option :progress, aliases: "-P", type: :boolean, default: true, desc: "Show progress bar"
      def upload(file_path)
        provider_name = options[:provider]
        uploader = Uploader.new
        url = uploader.upload_file(file_path, provider_name)

        unless url
          puts "Upload failed."
        end
      end

      desc "selected [PROVIDER]", "Upload selected file to cloud storage"
      option :provider, aliases: "-p", desc: "Upload provider (fileio, transfersh)"
      def selected
        provider_name = options[:provider]
        uploader = Uploader.new
        url = uploader.upload_selected_file(provider_name)

        unless url
          puts "Upload failed."
        end
      end

      desc "multiple FILE1 FILE2 ... [PROVIDER]", "Upload multiple files"
      option :provider, aliases: "-p", desc: "Upload provider (fileio, transfersh)"
      def multiple(*args)
        return puts "Please provide at least one file to upload." if args.empty?

        # Check if last argument is a provider
        provider_name = nil
        if ["fileio", "transfersh"].include?(args.last.downcase)
          provider_name = args.pop
        end

        uploader = Uploader.new
        results = uploader.upload_multiple_files(args, provider_name)
      end

      desc "providers", "List available upload providers"
      def providers
        uploader = Uploader.new
        uploader.list_providers
      end

      desc "history [LIMIT]", "Show upload history"
      option :limit, aliases: "-l", type: :numeric, default: 10, desc: "Number of recent uploads to show"
      def history
        uploader = Uploader.new
        uploader.show_upload_history(options[:limit])
      end

      desc "stats", "Show upload statistics"
      def stats
        uploader = Uploader.new
        uploader.show_upload_stats
      end

      desc "test PROVIDER", "Test upload provider connectivity"
      def test(provider)
        uploader = Uploader.new
        success = uploader.test_provider(provider)

        if success
          puts "Provider test passed."
        else
          puts "Provider test failed."
        end
      end

      desc "batch DIRECTORY [PROVIDER]", "Upload all files from directory"
      option :provider, aliases: "-p", desc: "Upload provider (fileio, transfersh)"
      option :pattern, aliases: "-P", desc: "File pattern (default: *)"
      def batch(directory, provider = nil)
        unless Dir.exist?(directory)
          puts "Directory '#{directory}' does not exist."
          return
        end

        pattern = options[:pattern] || "*"
        file_pattern = File.join(directory, pattern)
        files = Dir.glob(file_pattern).select { |f| File.file?(f) }

        if files.empty?
          puts "No files found matching pattern '#{pattern}' in directory '#{directory}'."
          return
        end

        puts "Found #{files.length} files to upload."

        uploader = Uploader.new
        results = uploader.upload_multiple_files(files, provider || options[:provider])
      end
    end
  end
end