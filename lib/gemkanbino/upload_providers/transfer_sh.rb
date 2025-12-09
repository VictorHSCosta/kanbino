# frozen_string_literal: true

require "httparty"
require "json"

module Gemkanbino
  module UploadProviders
    # Transfer.sh upload provider
    class TransferSh
      BASE_URL = "https://transfer.sh"
      MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024 # 10GB

      attr_reader :name, :description

      def initialize
        @name = "transfer.sh"
        @description = "Free file hosting with no registration required"
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
          filename = File.basename(file_path)

          # transfer.sh allows specifying max days and download counts as headers
          response = HTTParty.put(
            "#{BASE_URL}/#{filename}",
            body: File.read(file_path),
            headers: {
              "Content-Type" => get_content_type(file_path),
              "Max-Days" => "30" # Optional: expire after 30 days
            },
            timeout: 600 # 10 minutes for large files
          )

          if response.success?
            # transfer.sh returns the URL directly in the response body
            url = response.body.strip

            {
              success: true,
              url: url,
              delete_url: generate_delete_url(url),
              expires_at: (Time.now + 30 * 24 * 60 * 60).strftime("%Y-%m-%d %H:%M:%S")
            }
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
        rescue => e
          {
            success: false,
            error: "Upload error: #{e.message}"
          }
        end
      end

      def test_connection
        begin
          # transfer.sh is simple, just try to access the base URL
          response = HTTParty.get(BASE_URL, timeout: 10)
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
        # transfer.sh supports all file types
        ["*"]
      end

      def expiration_options
        ["Default (30 days)", "Custom"]
      end

      private

      def get_content_type(file_path)
        mime_types = MIME::Types.type_for(file_path)
        mime_types.first&.content_type || "application/octet-stream"
      end

      def generate_delete_url(upload_url)
        # transfer.sh supports DELETE method for deletion
        # We can't generate a delete URL directly, but inform user about deletion
        "#{upload_url} (DELETE method)"
      end

      def format_size(bytes)
        require "filesize"
        Filesize.new(bytes).pretty
      rescue
          "#{bytes}B"
      end
    end
  end
end