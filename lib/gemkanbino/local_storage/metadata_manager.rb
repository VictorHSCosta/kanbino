# frozen_string_literal: true

require "digest"
require "mime/types"

module Gemkanbino
  module LocalStorage
    # Handles metadata creation and management for stored files
    module MetadataManager
      private

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
      rescue
        "#{bytes}B"
      end
    end
  end
end