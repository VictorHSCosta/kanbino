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

# Load utilities
require_relative "gemkanbino/utils/file_validator"
require_relative "gemkanbino/utils/completion"
require_relative "gemkanbino/utils/history"

# Load exceptions
require_relative "gemkanbino/exceptions/file_error"
require_relative "gemkanbino/exceptions/upload_error"
require_relative "gemkanbino/exceptions/config_error"

# Gemkanbino - A comprehensive CLI tool for file management, navigation, and cloud uploads
#
# Gemkanbino provides a powerful command-line interface for:
# - Navigating file systems with familiar commands (pwd, ls, cd)
# - Managing files (select, copy, info, preview)
# - Uploading files to cloud services (file.io, transfer.sh)
# - Organizing local file storage with metadata
# - Interactive shell mode for guided operations
#
# @example Basic usage
#   require 'gemkanbino'
#
#   # Use CLI directly
#   Gemkanbino::CLI.start(%w[ls --long])
#
#   # Use programmatically
#   navigator = Gemkanbino::FileNavigator.new
#   navigator.list_files("/path/to/directory", long: true)
#
#   manager = Gemkanbino::FileManager.new
#   manager.select_file("/path/to/file.txt")
#
#   uploader = Gemkanbino::Uploader.new
#   url = uploader.upload_file("/path/to/file.txt", "fileio")
#
# @author VictorHSCosta <victorhenriquecosta23@gmail.com>
# @version 0.1.0
# @since 0.1.0
module Gemkanbino
  # Base error class for all Gemkanbino exceptions
  #
  # All custom exceptions in Gemkanbino inherit from this class,
  # allowing for easy rescue and handling of Gemkanbino-specific errors.
  #
  # @example Handling Gemkanbino errors
  #   begin
  #     uploader.upload_file(file_path)
  #   rescue Gemkanbino::Error => e
  #     puts "Gemkanbino error: #{e.message}"
  #   end
  class Error < StandardError; end

  # Main module methods for convenient access
  class << self
    # Get the current version of Gemkanbino
    #
    # @return [String] The current version string
    #
    # @example
    #   Gemkanbino.version #=> "0.1.0"
    def version
      VERSION
    end

    # Create a new file manager instance
    #
    # @return [Gemkanbino::FileManager] A new file manager instance
    #
    # @example
    #   manager = Gemkanbino.file_manager
    #   manager.select_file("/path/to/file.txt")
    def file_manager
      FileManager.new
    end

    # Create a new uploader instance
    #
    # @return [Gemkanbino::Uploader] A new uploader instance
    #
    # @example
    #   uploader = Gemkanbino.uploader
    #   uploader.upload_file("/path/to/file.txt")
    def uploader
      Uploader.new
    end

    # Create a new file navigator instance
    #
    # @return [Gemkanbino::FileNavigator] A new file navigator instance
    #
    # @example
    #   navigator = Gemkanbino.file_navigator
    #   navigator.list_files(".", long: true)
    def file_navigator
      FileNavigator.new
    end

    # Create a new local storage instance
    #
    # @return [Gemkanbino::LocalStorage] A new local storage instance
    #
    # @example
    #   storage = Gemkanbino.local_storage
    #   storage.copy_file("/path/to/file.txt")
    def local_storage
      LocalStorage.new
    end
  end
end
