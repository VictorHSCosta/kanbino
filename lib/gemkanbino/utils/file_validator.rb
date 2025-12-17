# frozen_string_literal: true

require_relative "../exceptions/file_error"

module Gemkanbino
  module Utils
    # Utility class for file validation
    class FileValidator
      # Maximum file size for uploads (default: 100MB)
      DEFAULT_MAX_SIZE = 100 * 1024 * 1024

      # Allowed file extensions
      ALLOWED_EXTENSIONS = %w[
        .txt .md .pdf .doc .docx .xls .xlsx .ppt .pptx
        .jpg .jpeg .png .gif .bmp .svg .webp
        .mp3 .wav .flac .aac .ogg
        .mp4 .avi .mkv .mov .wmv .flv .webm
        .zip .rar .7z .tar .gz .bz2
        .json .xml .csv .yml .yaml
        .rb .py .js .ts .html .css .php .java .cpp .c .h
        .exe .msi .dmg .pkg .deb .rpm
      ].freeze

      class << self
        def validate_file_exists(file_path)
          raise Exceptions::FileNotFoundError, file_path unless File.exist?(file_path)
          true
        end

        def validate_file_readable(file_path)
          validate_file_exists(file_path)
          raise Exceptions::FilePermissionError, file_path, :read unless File.readable?(file_path)
          true
        end

        def validate_file_writable(file_path)
          dir = File.dirname(file_path)
          unless Dir.exist?(dir)
            raise Exceptions::FileError, "Directory does not exist: #{dir}"
          end

          unless File.writable?(dir)
            raise Exceptions::FilePermissionError, dir, :write
          end
          true
        end

        def validate_file_size(file_path, max_size = DEFAULT_MAX_SIZE)
          validate_file_exists(file_path)

          size = File.size(file_path)
          if size > max_size
            raise Exceptions::FileError,
                  "File size #{format_size(size)} exceeds maximum allowed size #{format_size(max_size)}"
          end

          true
        end

        def validate_file_extension(file_path, allowed_extensions = ALLOWED_EXTENSIONS)
          extension = File.extname(file_path).downcase

          unless allowed_extensions.include?(extension)
            raise Exceptions::FileError,
                  "File extension '#{extension}' is not allowed. Allowed: #{allowed_extensions.join(', ')}"
          end

          true
        end

        def validate_file_type(file_path, allowed_types = nil)
          content_type = get_content_type(file_path)

          return true unless allowed_types && !allowed_types.empty?

          unless allowed_types.any? { |type| content_type&.include?(type) }
            raise Exceptions::FileError,
                  "File type '#{content_type}' is not allowed. Allowed: #{allowed_types.join(', ')}"
          end

          true
        end

        def validate_path_safety(file_path)
          # Prevent path traversal attacks
          clean_path = File.expand_path(file_path)

          if clean_path.include?("../")
            raise Exceptions::FileError, "Path contains potentially unsafe traversal: #{file_path}"
          end

          true
        end

        def validate_file_content(file_path)
          validate_file_readable(file_path)

          # Basic content validation
          begin
            # Try to read first few bytes to ensure file is accessible
            File.open(file_path, "rb") do |file|
              file.read(1024) # Read first 1KB
            end
            true
          rescue => e
            raise Exceptions::FileError, "Cannot read file content: #{e.message}"
          end
        end

        def comprehensive_validation(file_path, options = {})
          validate_file_exists(file_path)
          validate_file_readable(file_path)
          validate_path_safety(file_path)

          validate_file_size(file_path, options[:max_size]) if options[:max_size]
          validate_file_extension(file_path, options[:allowed_extensions]) if options[:allowed_extensions]
          validate_file_type(file_path, options[:allowed_types]) if options[:allowed_types]
          validate_file_content(file_path) unless options[:skip_content_check]

          true
        end

        def get_file_info(file_path)
          validate_file_exists(file_path)

          stat = File.stat(file_path)

          {
            path: file_path,
            name: File.basename(file_path),
            size: stat.size,
            size_formatted: format_size(stat.size),
            content_type: get_content_type(file_path),
            extension: File.extname(file_path),
            created_at: stat.ctime,
            modified_at: stat.mtime,
            readable: File.readable?(file_path),
            writable: File.writable?(file_path),
            executable: File.executable?(file_path)
          }
        end

        def is_safe_file?(file_path)
          begin
            comprehensive_validation(file_path)
            true
          rescue Exceptions::FileError
            false
          end
        end

        private

        def get_content_type(file_path)
          mime_types = MIME::Types.type_for(file_path)
          mime_types.first&.content_type
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
end