# frozen_string_literal: true

require_relative "gemkanbino/version"
require_relative "gemkanbino/cli"

# Load all components
require_relative "gemkanbino/file_navigator"
require_relative "gemkanbino/file_manager"
require_relative "gemkanbino/local_storage"
require_relative "gemkanbino/uploader"
require_relative "gemkanbino/config_manager"
require_relative "gemkanbino/interactive_shell"
require_relative "gemkanbino/upload_providers"

# Load commands
require_relative "gemkanbino/commands/home"

# Load utilities
require_relative "gemkanbino/utils/file_validator"
require_relative "gemkanbino/utils/completion"
require_relative "gemkanbino/utils/history"

# Load exceptions
require_relative "gemkanbino/exceptions/file_error"
require_relative "gemkanbino/exceptions/upload_error"
require_relative "gemkanbino/exceptions/config_error"
require_relative "gemkanbino/exceptions/home_error"

module Gemkanbino
  class Error < StandardError; end
  # Your code goes here...
end
