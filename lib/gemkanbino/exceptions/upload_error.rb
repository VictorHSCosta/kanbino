# frozen_string_literal: true

module Gemkanbino
  module Exceptions
    # Custom exception for upload-related errors
    class UploadError < Error
      attr_reader :file_path, :provider, :response_code

      def initialize(message, file_path = nil, provider = nil, response_code = nil)
        super(message)
        @file_path = file_path
        @provider = provider
        @response_code = response_code
      end
    end

    # Exception for provider not found
    class ProviderNotFoundError < UploadError
      def initialize(provider_name)
        super("Upload provider not found: #{provider_name}", nil, provider_name)
      end
    end

    # Exception for file too large
    class FileTooLargeError < UploadError
      def initialize(file_path, size, max_size)
        super("File too large: #{format_size(size)} (max: #{format_size(max_size)})", file_path)
        @max_size = max_size
      end

      def max_size
        @max_size
      end
    end

    # Exception for network errors
    class NetworkError < UploadError
      def initialize(message, provider = nil)
        super("Network error: #{message}", nil, provider)
      end
    end
  end
end