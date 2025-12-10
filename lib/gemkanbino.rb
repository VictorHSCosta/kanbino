# frozen_string_literal: true

require_relative "gemkanbino/version"
require_relative "gemkanbino/cli"

# Load all components
require_relative "gemkanbino/file_navigator"
require_relative "gemkanbino/file_manager"
require_relative "gemkanbino/local_storage"
require_relative "gemkanbino/uploader"
require_relative "gemkanbino/upload_providers"

# Load utilities
require_relative "gemkanbino/utils/file_validator"

# Load exceptions
require_relative "gemkanbino/exceptions/file_error"
require_relative "gemkanbino/exceptions/upload_error"

module Gemkanbino
  class Error < StandardError; end

  # Expose version constant
  VERSION = "0.1.0"
end
