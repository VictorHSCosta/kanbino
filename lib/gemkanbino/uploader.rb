# frozen_string_literal: true

require "httparty"
require "json"
require "pastel"
require "tty/prompt"
require "tty/progressbar"
require_relative "utils/file_validator"
require_relative "uploader/history_manager"
require_relative "uploader/ui_utils"
require_relative "uploader/provider_manager"

module Gemkanbino
  # Handles file uploads to various cloud services
  class Uploader
    include Uploader::HistoryManager
    include Uploader::UiUtils
    include Uploader::ProviderManager

    attr_reader :pastel, :prompt

    def initialize
      @pastel = Pastel.new
      @prompt = TTY::Prompt.new
    end

    def upload_file(file_path, provider_name = nil)
      file_path = File.expand_path(file_path)

      # Validate file
      Utils::FileValidator.validate_file_readable(file_path)

      # Get provider
      provider = get_provider(provider_name)
      provider_name ||= provider.name

      puts pastel.cyan("📤 Uploading file to #{provider_name}...")
      puts pastel.dim("File: #{File.basename(file_path)}")
      puts pastel.dim("Size: #{format_size(File.size(file_path))}")

      begin
        # Show progress bar
        progress = create_progress_bar

        # Upload file
        result = provider.upload(file_path, &progress_block(progress))

        # Handle result
        if result[:success]
          display_upload_result(result, provider_name)
          save_upload_history(file_path, provider_name, result)
          result[:url]
        else
          display_upload_error(result, provider_name)
          nil
        end
      rescue => e
        puts pastel.red("❌ Upload failed: #{e.message}")
        nil
      end
    end

    def upload_selected_file(provider_name = nil)
      manager = FileManager.new
      current_file = manager.current_selection

      if current_file.nil?
        puts pastel.yellow("No file selected. Use 'select <file>' first.")
        return false
      end

      upload_file(current_file, provider_name)
    end

    def upload_multiple_files(file_paths, provider_name = nil)
      provider = get_provider(provider_name)
      provider_name ||= provider.name

      results = []
      total_files = file_paths.length

      puts pastel.cyan("📤 Uploading #{total_files} files to #{provider_name}...")

      file_paths.each_with_index do |file_path, index|
        puts "\n" + pastel.dim("File #{index + 1}/#{total_files}")

        result = upload_file(file_path, provider_name)
        results << { file: file_path, url: result }

        # Small delay between uploads to avoid rate limiting
        sleep(1) if index < total_files - 1
      end

      display_multiple_upload_results(results, provider_name)
      results
    end
  end
end
end