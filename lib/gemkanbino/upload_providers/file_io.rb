# frozen_string_literal: true

require "httparty"
require "json"

module Gemkanbino
  module UploadProviders
    # File.io upload provider
    class FileIO
      BASE_URL = "https://file.io"
      MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024 # 2GB

      attr_reader :name, :description

      def initialize
        @name = "file.io"
        @description = "Free file hosting with configurable expiration"
      end

      def upload(file_path, &progress_block)
        file_size = File.size(file_path)

        if file_size > MAX_FILE_SIZE
          return {
            success: false,
            error: "File too large. Maximum size is #{format_size(MAX_FILE_SIZE)}"
          }
        end

        begin
          # For file.io, we'll use their simple API
          # Note: file.io requires API key for production use
          # This is a basic implementation

          response = HTTParty.post(
            "#{BASE_URL}/",
            body: {
              file: File.open(file_path, "rb")
            },
            timeout: 300 # 5 minutes
          )

          if response.success?
            data = JSON.parse(response.body)

            if data["success"]
              {
                success: true,
                url: data["link"],
                expires_at: calculate_expiration(data),
                delete_url: data["deleteLink"],
                key: data["key"]
              }
            else
              {
                success: false,
                error: data["message"] || "Upload failed",
                details: data
              }
            end
          else
            {
              success: false,
              error: "HTTP #{response.code}: #{response.message}",
              details: response.body
            }
          end

        rescue HTTParty::Error => e
          {
            success: false,
            error: "Network error: #{e.message}"
          }
        rescue StandardError => e
          {
            success: false,
            error: "Upload error: #{e.message}"
          }
        end
      end

      def test_connection
        begin
          response = HTTParty.get("#{BASE_URL}/", timeout: 10)
          response.success?
        rescue
          false
        end
      end

      def available?
        test_connection
      end

      def max_file_size
        MAX_FILE_SIZE
      end

      def supported_formats
        # file.io supports all file types
        ["*"]
      end

      def expiration_options
        ["1 hour", "1 day", "1 week", "1 month", "Never"]
      end

      private

      def format_size(bytes)
        require "filesize"
        Filesize.new(bytes).pretty
      rescue StandardError
        "#{bytes}B"
      end

      def calculate_expiration(data)
        # file.io API doesn't always return expiration info
        # This is a placeholder implementation
        if data["expiry"]
          Time.parse(data["expiry"]).strftime("%Y-%m-%d %H:%M:%S")
        else
          "Unknown"
        end
      end
    end
  end
end