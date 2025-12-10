# frozen_string_literal: true

require "digest"
require "mime/types"

module Gemkanbino
  module FileManager
    # Utility methods for file operations
    module FileUtils
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
      rescue
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
      rescue => e
        "Error calculating hash: #{e.message}"
      end

      def format_file_choice(file)
        basename = File.basename(file)
        size = File.size(file) rescue 0
        size_str = format_file_size(size)

        "#{basename.ljust(25)} #{size_str.rjust(8)}"
      end
    end
  end
end