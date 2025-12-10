# frozen_string_literal: true

module Gemkanbino
  module Exceptions
    # Custom exception for file-related errors
    class FileError < Error
      attr_reader :file_path, :operation

      def initialize(message, file_path = nil, operation = nil)
        super(message)
        @file_path = file_path
        @operation = operation
      end
    end

    # Exception for file not found
    class FileNotFoundError < FileError
      def initialize(file_path)
        super("File not found: #{file_path}", file_path, :read)
      end
    end

    # Exception for permission errors
    class FilePermissionError < FileError
      def initialize(file_path, operation)
        super("Permission denied for #{operation}: #{file_path}", file_path, operation)
      end
    end
  end
end