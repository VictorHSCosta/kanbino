# Gemkanbino API Documentation

This document provides a comprehensive API reference for all Gemkanbino modules, classes, and methods. Gemkanbino is designed to be used both as a command-line tool and as a Ruby library.

## Table of Contents

- [Main Module](#main-module)
- [CLI Class](#cli-class)
- [Core Classes](#core-classes)
  - [FileNavigator](#filenavigator)
  - [FileManager](#filemanager)
  - [LocalStorage](#localstorage)
  - [Uploader](#uploader)
- [Command Modules](#command-modules)
- [Configuration Modules](#configuration-modules)
- [Exception Classes](#exception-classes)
- [Upload Providers](#upload-providers)
- [Utility Modules](#utility-modules)

## Main Module

### Gemkanbino

The main module that serves as the entry point for the gem.

```ruby
require 'gemkanbino'
```

#### Constants

- `VERSION` - Returns the current version string of the gem.

#### Classes

- `Gemkanbino::Error` - Base error class for all Gemkanbino exceptions.

## CLI Class

### Gemkanbino::CLI

The main command-line interface class built with Thor framework.

#### Constructor

```ruby
Gemkanbino::CLI.new(args = [], options = {}, config = {})
```

Creates a new CLI instance with optional arguments, options, and configuration.

#### Attributes

- `pastel` - Returns the Pastel instance for colored terminal output.
- `prompt` - Returns the TTY::Prompt instance for interactive prompts.

#### Commands

##### version
```ruby
version
```
Display gemkanbino version information.

##### pwd
```ruby
pwd
```
Show current working directory with colored output.

##### ls
```ruby
ls(path = ".", options = {})
```
List files and directories in the specified path.

**Parameters:**
- `path` (String, default: ".") - Directory path to list
- `options` (Hash) - Options hash:
  - `:all` (Boolean) - Show hidden files (alias: `-a`)
  - `:long` (Boolean) - Use long listing format (alias: `-l`)

##### cd
```ruby
cd(path)
```
Change current directory to the specified path.

**Parameters:**
- `path` (String) - Target directory path

##### select
```ruby
select(file_path)
```
Select a file for subsequent operations.

**Parameters:**
- `file_path` (String) - Path to the file to select

##### info
```ruby
info(file_path = nil)
```
Show detailed information about a file.

**Parameters:**
- `file_path` (String, optional) - File path to analyze. If not provided, shows info for selected file.

##### copy
```ruby
copy(file_path = nil, options = {})
```
Copy file to local storage.

**Parameters:**
- `file_path` (String, optional) - File path to copy. If not provided, copies selected file.
- `options` (Hash) - Options hash:
  - `:target` (String) - Target directory name (alias: `-t`)

##### upload
```ruby
upload(file_path = nil, options = {})
```
Upload file to cloud service.

**Parameters:**
- `file_path` (String, optional) - File path to upload. If not provided, uploads selected file.
- `options` (Hash) - Options hash:
  - `:provider` (String) - Upload provider name (alias: `-p`)

##### list
```ruby
list
```
List all stored files in local storage.

##### config
```ruby
config(key = nil, value = nil)
```
Show or set configuration values.

**Parameters:**
- `key` (String, optional) - Configuration key to show or set
- `value` (String, optional) - Configuration value to set

##### interactive
```ruby
interactive
```
Start interactive shell mode for guided operations.

## Core Classes

### FileNavigator

Handles file system navigation operations.

```ruby
navigator = Gemkanbino::FileNavigator.new
```

#### Constructor

```ruby
FileNavigator.new
```
Creates a new FileNavigator instance with colored output support.

#### Attributes

- `pastel` - Returns the Pastel instance for terminal colors.

#### Methods

##### list_files
```ruby
list_files(path = ".", options = {})
```
List files and directories with optional formatting.

**Parameters:**
- `path` (String, default: ".") - Directory path to list
- `options` (Hash) - Options:
  - `:all` (Boolean) - Include hidden files
  - `:long` (Boolean) - Use detailed format

**Returns:** `nil` (outputs to console)

##### change_directory
```ruby
change_directory(path) -> Boolean
```
Change the current working directory.

**Parameters:**
- `path` (String) - Target directory path

**Returns:** `true` if successful, `false` otherwise

##### current_directory
```ruby
current_directory -> String
```
Get the current working directory.

**Returns:** String containing the current directory path.

##### directory_exists?
```ruby
directory_exists?(path) -> Boolean
```
Check if a directory exists.

**Parameters:**
- `path` (String) - Directory path to check

**Returns:** `true` if directory exists, `false` otherwise

##### parent_directory
```ruby
parent_directory -> String
```
Get the parent directory of current working directory.

**Returns:** String containing the parent directory path.

##### home_directory
```ruby
home_directory -> String
```
Get the user's home directory.

**Returns:** String containing the home directory path.

##### navigate_interactive
```ruby
navigate_interactive
```
Start interactive navigation mode.

**Returns:** `nil` (interactive console mode)

### FileManager

Manages file selection and information operations.

```ruby
manager = Gemkanbino::FileManager.new
```

#### Constructor

```ruby
FileManager.new
```
Creates a new FileManager instance with selection tracking.

#### Attributes

- `pastel` - Returns the Pastel instance for colors
- `prompt` - Returns the TTY::Prompt instance for interactions
- `selected_files` - Returns an array of selected file paths

#### Methods

##### select_file
```ruby
select_file(file_path) -> Boolean
```
Select a file for operations.

**Parameters:**
- `file_path` (String) - Path to the file to select

**Returns:** `true` if file selected successfully, `false` otherwise

##### select_multiple_files
```ruby
select_multiple_files(pattern = nil) -> Array
```
Select multiple files using interactive selection.

**Parameters:**
- `pattern` (String, optional) - Glob pattern for filtering files

**Returns:** Array of selected file paths

##### show_file_info
```ruby
show_file_info(file_path)
```
Display detailed information about a file.

**Parameters:**
- `file_path` (String) - Path to the file to analyze

**Returns:** `nil` (outputs to console)

##### show_selected_file_info
```ruby
show_selected_file_info
```
Display information about the currently selected file.

**Returns:** `nil` (outputs to console)

##### preview_file
```ruby
preview_file(file_path = nil, lines: 20)
```
Preview file content (text or image metadata).

**Parameters:**
- `file_path` (String, optional) - File to preview. Uses selected file if not provided.
- `lines` (Integer, default: 20) - Number of lines to show for text files

**Returns:** `nil` (outputs to console)

##### current_selection
```ruby
current_selection -> String or nil
```
Get the currently selected file path.

**Returns:** String with file path or `nil` if no file selected

##### selected_files
```ruby
selected_files -> Array
```
Get all selected file paths.

**Returns:** Array of selected file paths (copy)

##### clear_selection
```ruby
clear_selection
```
Clear all selected files.

**Returns:** `nil` (outputs confirmation to console)

##### remove_from_selection
```ruby
remove_from_selection(file_path = nil)
```
Remove a file from selection.

**Parameters:**
- `file_path` (String, optional) - Specific file to remove. Removes last selected if not provided.

**Returns:** `nil` (outputs confirmation to console)

##### list_selection
```ruby
list_selection
```
List all selected files with details.

**Returns:** `nil` (outputs to console)

##### interactive_file_selector
```ruby
interactive_file_selector(directory = ".") -> String or nil
```
Interactive file selection with directory navigation.

**Parameters:**
- `directory` (String, default: ".") - Starting directory

**Returns:** Selected file path or `nil` if cancelled

### LocalStorage

Manages local file storage with organization and metadata.

```ruby
storage = Gemkanbino::LocalStorage.new
```

#### Constructor

```ruby
LocalStorage.new
```
Creates a new LocalStorage instance and ensures storage directory exists.

#### Attributes

- `pastel` - Returns the Pastel instance for colors
- `storage_root` - Returns the storage root directory path

#### Methods

##### copy_file
```ruby
copy_file(file_path, target_name = nil) -> String
```
Copy a file to local storage with metadata.

**Parameters:**
- `file_path` (String) - Path to file to copy
- `target_name` (String, optional) - Custom target directory name

**Returns:** String with the target name used for storage

##### copy_selected_file
```ruby
copy_selected_file(target_name = nil) -> String or false
```
Copy the currently selected file to storage.

**Parameters:**
- `target_name` (String, optional) - Custom target directory name

**Returns:** String with target name or `false` if no file selected

##### list_stored_files
```ruby
list_stored_files(filter = nil)
```
List all stored files with optional filtering.

**Parameters:**
- `filter` (String, optional) - Filter string for searching files

**Returns:** `nil` (outputs to console)

##### get_stored_file_info
```ruby
get_stored_file_info(name)
```
Show detailed information about a stored file.

**Parameters:**
- `name` (String) - Storage name of the file

**Returns:** `nil` (outputs to console)

##### retrieve_file
```ruby
retrieve_file(name, destination = nil) -> Boolean
```
Retrieve a stored file to a destination.

**Parameters:**
- `name` (String) - Storage name of the file to retrieve
- `destination` (String, optional) - Destination path. Uses current directory if not provided.

**Returns:** `true` if successful, `false` otherwise

##### delete_stored_file
```ruby
delete_stored_file(name) -> Boolean
```
Delete a stored file and its metadata.

**Parameters:**
- `name` (String) - Storage name of the file to delete

**Returns:** `true` if successful, `false` otherwise

##### cleanup_storage
```ruby
cleanup_storage
```
Remove entries for missing files from the index.

**Returns:** `nil` (outputs summary to console)

##### get_storage_stats
```ruby
get_storage_stats -> Hash
```
Get comprehensive storage statistics.

**Returns:** Hash with statistics:
- `:total_files` (Integer) - Number of stored files
- `:total_size` (Integer) - Total size in bytes
- `:total_size_formatted` (String) - Human-readable size
- `:storage_location` (String) - Storage directory path
- `:oldest_file` (String) - ISO8601 date of oldest file
- `:newest_file` (String) - ISO8601 date of newest file
- `:index_size` (Integer) - Size of index file in bytes

##### show_storage_stats
```ruby
show_storage_stats
```
Display storage statistics in a formatted way.

**Returns:** `nil` (outputs to console)

##### compress_storage
```ruby
compress_storage
```
Compress files older than 30 days.

**Returns:** `nil` (outputs summary to console)

### Uploader

Handles file uploads to various cloud services.

```ruby
uploader = Gemkanbino::Uploader.new
```

#### Constructor

```ruby
Uploader.new
```
Creates a new Uploader instance with progress tracking.

#### Attributes

- `pastel` - Returns the Pastel instance for colors
- `prompt` - Returns the TTY::Prompt instance for interactions

#### Methods

##### upload_file
```ruby
upload_file(file_path, provider_name = nil) -> String or nil
```
Upload a file to a cloud provider.

**Parameters:**
- `file_path` (String) - Path to file to upload
- `provider_name` (String, optional) - Provider name. Shows selection prompt if not provided.

**Returns:** String with upload URL or `nil` if failed

##### upload_selected_file
```ruby
upload_selected_file(provider_name = nil) -> String or false
```
Upload the currently selected file.

**Parameters:**
- `provider_name` (String, optional) - Provider name

**Returns:** String with URL or `false` if no file selected

##### upload_multiple_files
```ruby
upload_multiple_files(file_paths, provider_name = nil) -> Array
```
Upload multiple files to the same provider.

**Parameters:**
- `file_paths` (Array) - Array of file paths to upload
- `provider_name` (String, optional) - Provider name

**Returns:** Array of hashes with `:file` and `:url` keys

##### list_providers
```ruby
list_providers
```
List all available upload providers with their status.

**Returns:** `nil` (outputs to console)

##### show_upload_history
```ruby
show_upload_history(limit = 10)
```
Show recent upload history.

**Parameters:**
- `limit` (Integer, default: 10) - Number of entries to show

**Returns:** `nil` (outputs to console)

##### test_provider
```ruby
test_provider(provider_name) -> Boolean
```
Test connectivity to a specific provider.

**Parameters:**
- `provider_name` (String) - Name of the provider to test

**Returns:** `true` if test passes, `false` otherwise

##### get_upload_stats
```ruby
get_upload_stats -> Hash
```
Get upload statistics from history.

**Returns:** Hash with statistics:
- `:total_uploads` (Integer) - Total number of uploads
- `:total_size` (Integer) - Total size uploaded in bytes
- `:total_size_formatted` (String) - Human-readable total size
- `:uploads_by_provider` (Hash) - Uploads count by provider
- `:most_recent_upload` (String) - ISO8601 timestamp
- `:oldest_upload` (String) - ISO8601 timestamp

##### show_upload_stats
```ruby
show_upload_stats
```
Display upload statistics in a formatted way.

**Returns:** `nil` (outputs to console)

## Command Modules

### Commands::Storage

Namespace for storage-related commands.

### Commands::Upload

Namespace for upload-related commands.

## Configuration Modules

### Config::StorageConfig

Configuration management for storage settings.

### Config::UploadConfig

Configuration management for upload settings.

## Exception Classes

### Exceptions::FileError

Base class for file-related errors.

### Exceptions::UploadError

Raised when upload operations fail.

### Exceptions::ConfigError

Raised when configuration operations fail.

## Upload Providers

### UploadProviders::FileIO

File.io upload provider implementation.

#### Methods

- `upload(file_path) -> Hash` - Upload file to file.io
- `test_connection -> Boolean` - Test file.io connectivity
- `name -> String` - Returns "FileIO"
- `description -> String` - Returns provider description
- `available? -> Boolean` - Check if provider is available

### UploadProviders::TransferSh

Transfer.sh upload provider implementation.

#### Methods

- `upload(file_path) -> Hash` - Upload file to transfer.sh
- `test_connection -> Boolean` - Test transfer.sh connectivity
- `name -> String` - Returns "TransferSh"
- `description -> String` - Returns provider description
- `available? -> Boolean` - Check if provider is available

## Utility Modules

### Utils::FileValidator

File validation utilities.

#### Methods

##### validate_file_readable
```ruby
validate_file_readable(file_path)
```
Validate that a file exists and is readable.

**Parameters:**
- `file_path` (String) - Path to file to validate

**Raises:** `Exceptions::FileError` if validation fails

##### validate_file_exists
```ruby
validate_file_exists(file_path)
```
Validate that a file exists.

**Parameters:**
- `file_path` (String) - Path to file to validate

**Raises:** `Exceptions::FileError` if file doesn't exist

### Utils::Completion

Command completion utilities.

### Utils::History

Command history management.

## Usage Examples

### Basic File Operations

```ruby
require 'gemkanbino'

# Initialize components
navigator = Gemkanbino::FileNavigator.new
manager = Gemkanbino::FileManager.new
storage = Gemkanbino::LocalStorage.new

# Navigate directories
navigator.list_files("/path/to/directory", all: true, long: true)
navigator.change_directory("/path/to/directory")

# Select and manage files
manager.select_file("/path/to/file.txt")
manager.show_selected_file_info

# Copy to storage
storage.copy_selected_file("my_backup")

# Upload to cloud
uploader = Gemkanbino::Uploader.new
url = uploader.upload_selected_file("fileio")
```

### Custom Upload Provider

```ruby
# Create custom provider
class CustomProvider
  include Gemkanbino::UploadProviders::Base

  def name
    "CustomProvider"
  end

  def description
    "Custom upload service"
  end

  def upload(file_path, &progress_block)
    # Implementation here
    {
      success: true,
      url: "https://example.com/file",
      expires_at: Time.now + 86400
    }
  end
end
```

## Error Handling

All operations raise specific exception types:

```ruby
begin
  uploader = Gemkanbino::Uploader.new
  uploader.upload_file("/path/to/file.txt", "invalid_provider")
rescue Gemkanbino::Exceptions::UploadError => e
  puts "Upload failed: #{e.message}"
rescue Gemkanbino::Exceptions::FileError => e
  puts "File error: #{e.message}"
end
```

## Configuration

Configuration is managed through YAML files and environment variables:

```ruby
# Access configuration
config = Gemkanbino::ConfigManager.new
config.set_config("storage.base_path", "/custom/path")
config.get_config("upload.default_provider")
```