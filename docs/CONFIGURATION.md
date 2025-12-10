# Gemkanbino Configuration Guide

This comprehensive guide covers all aspects of configuring Gemkanbino, from basic settings to advanced customization options.

## Table of Contents

- [Configuration Overview](#configuration-overview)
- [Configuration Files](#configuration-files)
- [Basic Configuration](#basic-configuration)
- [Storage Configuration](#storage-configuration)
- [Upload Configuration](#upload-configuration)
- [UI Configuration](#ui-configuration)
- [Environment Variables](#environment-variables)
- [Provider-Specific Settings](#provider-specific-settings)
- [Advanced Configuration](#advanced-configuration)
- [Configuration Examples](#configuration-examples)
- [Troubleshooting](#troubleshooting)

## Configuration Overview

Gemkanbino uses a hierarchical configuration system that allows customization through:

1. **Configuration Files** - YAML files for persistent settings
2. **Environment Variables** - For system-level customization
3. **Command Line Options** - For per-command overrides
4. **Runtime Configuration** - Programmatic configuration

### Configuration Priority

Settings are applied in the following order (highest to lowest priority):

1. **Command Line Options** (`--option=value`)
2. **Environment Variables** (`GEMKANBINO_*`)
3. **Configuration Files** (`~/.gemkanbino/config.yml`)
4. **Default Values** (built-in defaults)

## Configuration Files

### Main Configuration File

The primary configuration file is located at:

**Linux/macOS**: `~/.gemkanbino/config.yml`
**Windows**: `%USERPROFILE%\.gemkanbino\config.yml`

### Directory Structure

```
~/.gemkanbino/
├── config.yml              # Main configuration file
├── storage/               # Local file storage directory
│   └── index.json         # Storage index file
├── upload_history.json    # Upload history log
└── logs/                  # Log files (if enabled)
    ├── gemkanbino.log
    └── uploads.log
```

### Configuration File Format

The configuration uses YAML format:

```yaml
# Gemkanbino Configuration File

# Storage settings
storage:
  base_path: "~/.gemkanbino/storage"
  auto_organize: true
  max_storage_size: "10GB"
  cleanup_interval: "monthly"

# Upload settings
upload:
  default_provider: "fileio"
  timeout: 30
  retry_attempts: 3
  retry_delay: 5

# UI settings
ui:
  colors: true
  progress_bars: true
  verbose: false
  confirm_destructive: true

# Logging
logging:
  enabled: false
  level: "info"
  file: "~/.gemkanbino/logs/gemkanbino.log"
  max_size: "10MB"
  backup_count: 5

# Providers
providers:
  fileio:
    expires_in: "14d"
  transfersh:
    expires_in: "14d"
    max_downloads: 100
```

## Basic Configuration

### Getting Started

Initialize configuration with the CLI:

```bash
# Show current configuration
gemkanbino config

# Show specific configuration value
gemkanbino config storage.base_path

# Set configuration value
gemkanbino config default_provider fileio

# Reset configuration to defaults
gemkanbino config --reset
```

### Essential Settings

#### Default Upload Provider

```bash
# Set default upload provider
gemkanbino config upload.default_provider fileio

# Available providers: fileio, transfersh
```

#### Storage Location

```bash
# Set custom storage location
gemkanbino config storage.base_path "/custom/path/to/storage"

# Use environment variable
export GEMKANBINO_STORAGE_PATH="/custom/path/to/storage"
```

#### UI Preferences

```bash
# Enable/disable colors
gemkanbino config ui.colors true

# Enable/disable progress bars
gemkanbino config ui.progress_bars true

# Enable verbose output
gemkanbino config ui.verbose true
```

## Storage Configuration

### Local Storage Settings

#### Base Path Configuration

```yaml
storage:
  base_path: "~/.gemkanbino/storage"
  auto_organize: true
```

**Options:**
- `base_path`: Directory for storing files (supports `~` expansion)
- `auto_organize`: Automatically organize files by date/type
- `create_directories`: Auto-create missing directories
- `preserve_structure`: Preserve original directory structure

#### Storage Limits

```yaml
storage:
  max_storage_size: "10GB"
  max_file_count: 10000
  cleanup_interval: "monthly"
  auto_compress: true
```

**Size Formats:**
- `"100MB"`, `"1GB"`, `"10TB"` (case-insensitive)
- `1048576` (bytes)
- `null` or omit for unlimited

#### Cleanup Settings

```yaml
storage:
  cleanup:
    enabled: true
    interval: "monthly"
    older_than: "90d"
    compress_before: "30d"
    delete_after: "365d"
```

**Interval Options:**
- `"daily"`, `"weekly"`, `"monthly"`, `"yearly"`
- `null` or `"never"` to disable

### File Organization

```yaml
storage:
  organization:
    by_date: true          # Organize by date (YYYY/MM/DD)
    by_type: true          # Organize by file type
    by_size: false         # Organize by size category
    date_format: "%Y/%m/%d"
    preserve_metadata: true
```

**Example Organization:**
```
storage/
├── 2025/
│   ├── 12/
│   │   ├── 10/
│   │   │   ├── documents/
│   │   │   ├── images/
│   │   │   └── archives/
```

## Upload Configuration

### General Upload Settings

```yaml
upload:
  default_provider: "fileio"
  timeout: 30
  retry_attempts: 3
  retry_delay: 5
  chunk_size: "1MB"
  parallel_uploads: false
```

**Timeout Settings:**
- `timeout`: Overall operation timeout in seconds
- `connect_timeout`: Connection timeout in seconds
- `read_timeout`: Read timeout in seconds

**Retry Configuration:**
- `retry_attempts`: Number of retry attempts (0-10)
- `retry_delay`: Delay between retries in seconds
- `exponential_backoff`: Use exponential backoff for retries

### Provider Configuration

#### File.io Provider

```yaml
providers:
  fileio:
    expires_in: "14d"
    max_file_size: "2GB"
    auto_delete: true
    notify_on_expiry: false
```

**Expiration Options:**
- `"1h"`, `"1d"`, `"1w"`, `"1M"` (hours, days, weeks, months)
- `"never"` for permanent files (if supported)

#### Transfer.sh Provider

```yaml
providers:
  transfersh:
    expires_in: "14d"
    max_downloads: 100
    max_file_size: "10GB"
    encryption_password: null
    custom_domain: null
```

**Security Options:**
- `encryption_password`: Password for server-side encryption
- `custom_domain`: Custom domain for transfersh instance

### Custom Providers

```yaml
providers:
  custom_provider:
    name: "My Cloud Storage"
    api_endpoint: "https://api.mycloud.com"
    api_key: "${MY_CLOUD_API_KEY}"
    max_file_size: "5GB"
    supported_formats: ["jpg", "png", "pdf", "txt"]
```

**Environment Variable Substitution:**
Use `${VAR_NAME}` syntax to substitute environment variables.

## UI Configuration

### Color Settings

```yaml
ui:
  colors: true
  color_scheme: "default"
  custom_colors:
    success: "green"
    error: "red"
    warning: "yellow"
    info: "cyan"
    highlight: "bright_blue"
```

**Available Color Schemes:**
- `"default"` - Standard colors
- `"dark"` - Optimized for dark terminals
- `"light"` - Optimized for light terminals
- `"high_contrast"` - High contrast for accessibility

### Progress Indicators

```yaml
ui:
  progress_bars: true
  progress_style: "bar"
  progress_width: 40
  show_percentages: true
  show_eta: true
```

**Progress Styles:**
- `"bar"` - Classic progress bar
- `"spinner"` - Rotating spinner
- `"dots"` - Animated dots
- `"emoji"` - Emoji indicators

### Interaction Settings

```yaml
ui:
  confirm_destructive: true
  auto_select_single: false
  show_file_previews: true
  preview_lines: 20
  interactive_timeout: 60
```

### Output Configuration

```yaml
ui:
  verbose: false
  quiet: false
  timestamp: false
  log_format: "human"
  table_format: "default"
```

**Log Formats:**
- `"human"` - Human-readable format
- `"json"` - JSON format
- `"csv"` - CSV format
- `"syslog"` - Syslog format

## Environment Variables

### General Configuration

```bash
# Configuration directory
export GEMKANBINO_CONFIG_DIR="/path/to/config"

# Storage directory
export GEMKANBINO_STORAGE_PATH="/path/to/storage"

# Log level (debug, info, warn, error)
export GEMKANBINO_LOG_LEVEL="info"

# Default upload provider
export GEMKANBINO_DEFAULT_PROVIDER="fileio"
```

### Provider Configuration

```bash
# File.io settings
export GEMKANBINO_FILEIO_EXPIRES="14d"
export GEMKANBINO_FILEIO_API_KEY="your_api_key"

# Transfer.sh settings
export GEMKANBINO_TRANSFERSH_DOMAIN="transfer.sh"
export GEMKANBINO_TRANSFERSH_PASSWORD="encryption_password"
```

### Network Configuration

```bash
# HTTP proxy
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="https://proxy.example.com:8080"

# No proxy for these domains
export NO_PROXY="localhost,127.0.0.1,.example.com"

# Connection timeout
export GEMKANBINO_TIMEOUT=30
export GEMKANBINO_CONNECT_TIMEOUT=10
```

### Debug Configuration

```bash
# Enable debug mode
export GEMKANBINO_DEBUG=true

# Save request/response data
export GEMKANBINO_SAVE_DEBUG_DATA=true
export GEMKANBINO_DEBUG_DIR="/tmp/gemkanbino_debug"
```

## Provider-Specific Settings

### File.io Configuration

```yaml
providers:
  fileio:
    # API endpoint (usually don't need to change)
    api_endpoint: "https://file.io"

    # File expiration
    expires_in: "14d"

    # Maximum file size
    max_file_size: "2GB"

    # Supported file formats
    allowed_formats: null  # null means all formats

    # Authentication (if available)
    api_key: null

    # Additional headers
    headers:
      User-Agent: "Gemkanbino/0.1.0"
```

### Transfer.sh Configuration

```yaml
providers:
  transfersh:
    # API endpoint
    api_endpoint: "https://transfer.sh"

    # File expiration
    expires_in: "14d"

    # Maximum file size
    max_file_size: "10GB"

    # Download limits
    max_downloads: 100

    # Encryption
    encryption_password: null

    # Custom domain
    custom_domain: null

    # Additional options
    options:
      virus_scan: true
      password_protection: false
```

### Custom Provider Example

```yaml
providers:
  custom_s3:
    name: "Amazon S3"
    type: "s3"

    # AWS Configuration
    region: "us-east-1"
    bucket: "my-gemkanbino-bucket"

    # Authentication
    access_key_id: "${AWS_ACCESS_KEY_ID}"
    secret_access_key: "${AWS_SECRET_ACCESS_KEY}"

    # Upload settings
    max_file_size: "5GB"
    public_url: true
    expires_in: "30d"

    # Additional S3 options
    s3_options:
      server_side_encryption: "AES256"
      storage_class: "STANDARD"
      metadata:
        uploaded_by: "gemkanbino"
```

## Advanced Configuration

### Performance Tuning

```yaml
performance:
  # Thread pool size for parallel operations
  thread_pool_size: 4

  # Memory usage limits
  max_memory_usage: "512MB"
  buffer_size: "64KB"

  # File operations
  chunk_size: "1MB"
  copy_buffer_size: "4MB"

  # Network settings
  connection_pool_size: 10
  keep_alive_timeout: 30
```

### Security Configuration

```yaml
security:
  # File validation
  validate_file_types: true
  allowed_extensions: [".txt", ".jpg", ".png", ".pdf"]
  max_filename_length: 255

  # Path security
  allow_symlinks: false
  restrict_to_home: false
  chroot_storage: false

  # Upload security
  scan_uploads: false
  quarantine_suspicious: true

  # Authentication
  require_auth: false
  api_keys: []
```

### Logging Configuration

```yaml
logging:
  enabled: true
  level: "info"  # debug, info, warn, error, fatal

  # Log file configuration
  file: "~/.gemkanbino/logs/gemkanbino.log"
  max_size: "10MB"
  backup_count: 5
  rotate: "daily"

  # Log format
  format: "%{timestamp} [%{level}] %{message}"
  timestamp_format: "%Y-%m-%d %H:%M:%S"

  # Separate upload logs
  upload_logging: true
  upload_log_file: "~/.gemkanbino/logs/uploads.log"

  # Console logging
  console: true
  console_level: "info"

  # Remote logging (optional)
  remote:
    enabled: false
    endpoint: "https://logs.example.com/api/logs"
    api_key: "${LOG_API_KEY}"
```

### Integration Settings

```yaml
integrations:
  # Shell integration
  shell:
    enable_completion: true
    install_aliases: true
    alias_prefix: "gk"

  # Editor integration
  editor:
    default_editor: "${EDITOR}"
    line_numbers: true
    syntax_highlighting: true

  # Desktop notifications
  notifications:
    enabled: false
    provider: "system"  # system, growl, notify-send

  # Cloud storage sync
  sync:
    enabled: false
    provider: "dropbox"
    sync_interval: "hourly"
    exclude_patterns: ["*.tmp", "*.log"]
```

## Configuration Examples

### Basic Setup

```yaml
# Simple configuration for basic usage
storage:
  base_path: "~/gemkanbino_files"

upload:
  default_provider: "fileio"
  timeout: 30

ui:
  colors: true
  progress_bars: true
```

### Power User Setup

```yaml
# Advanced configuration for power users
storage:
  base_path: "~/Documents/Gemkanbino"
  auto_organize: true
  max_storage_size: "50GB"
  cleanup:
    enabled: true
    interval: "weekly"
    older_than: "90d"

upload:
  default_provider: "transfersh"
  timeout: 60
  retry_attempts: 5
  chunk_size: "2MB"

ui:
  colors: true
  progress_bars: true
  verbose: true
  confirm_destructive: true
  show_file_previews: true
  preview_lines: 50

providers:
  fileio:
    expires_in: "7d"
  transfersh:
    expires_in: "30d"
    max_downloads: 50

logging:
  enabled: true
  level: "debug"
  file: "~/.gemkanbino/logs/gemkanbino.log"
  max_size: "50MB"
```

### Development Setup

```yaml
# Configuration for development and testing
storage:
  base_path: "/tmp/gemkanbino_test"
  auto_organize: false

upload:
  default_provider: "fileio"
  timeout: 10
  retry_attempts: 1

ui:
  colors: true
  verbose: true
  debug_mode: true

logging:
  enabled: true
  level: "debug"
  console: true

security:
  validate_file_types: false
  allowed_extensions: []
```

### Corporate Environment Setup

```yaml
# Configuration for corporate/prod environments
storage:
  base_path: "/shared/storage/gemkanbino"
  max_storage_size: "1TB"
  cleanup:
    enabled: true
    interval: "daily"
    older_than: "30d"

upload:
  default_provider: "custom_s3"
  timeout: 120
  retry_attempts: 10

providers:
  custom_s3:
    region: "us-west-2"
    bucket: "company-file-uploads"
    access_key_id: "${AWS_ACCESS_KEY_ID}"
    secret_access_key: "${AWS_SECRET_ACCESS_KEY}"
    server_side_encryption: "AES256"
    storage_class: "STANDARD_IA"

logging:
  enabled: true
  level: "info"
  file: "/var/log/gemkanbino/gemkanbino.log"
  remote:
    enabled: true
    endpoint: "https://logs.company.com/api/logs"
    api_key: "${LOG_API_KEY}"

security:
  validate_file_types: true
  allowed_extensions: [".pdf", ".doc", ".docx", ".txt"]
  scan_uploads: true
  require_auth: true
  api_keys: ["${GEMKANBINO_API_KEY}"]
```

## Troubleshooting

### Common Configuration Issues

#### 1. Configuration File Not Found

**Problem:** `Configuration file not found` error

**Solution:**
```bash
# Create default configuration
mkdir -p ~/.gemkanbino
cat > ~/.gemkanbino/config.yml << EOF
storage:
  base_path: "~/.gemkanbino/storage"
upload:
  default_provider: "fileio"
ui:
  colors: true
EOF
```

#### 2. Permission Denied

**Problem:** Cannot write to storage directory

**Solution:**
```bash
# Check permissions
ls -la ~/.gemkanbino

# Fix permissions
chmod 755 ~/.gemkanbino
chmod 755 ~/.gemkanbino/storage
```

#### 3. Upload Provider Not Working

**Problem:** Upload fails with provider error

**Solution:**
```bash
# Test provider connectivity
gemkanbino test-provider fileio

# Check provider configuration
gemkanbino config providers.fileio

# Reset to default provider
gemkanbino config upload.default_provider fileio
```

#### 4. Environment Variables Not Loading

**Problem:** Environment variables not recognized

**Solution:**
```bash
# Check current environment
env | grep GEMKANBINO

# Set environment variables
export GEMKANBINO_DEBUG=true

# Add to shell profile
echo 'export GEMKANBINO_DEBUG=true' >> ~/.bashrc
source ~/.bashrc
```

### Debug Configuration

#### Enable Debug Mode

```bash
# Temporary debug mode
gemkanbino --debug <command>

# Set debug in configuration
gemkanbino config logging.level debug
gemkanbino config logging.console true

# Environment variable
export GEMKANBINO_DEBUG=true
```

#### View Effective Configuration

```bash
# Show all configuration with sources
gemkanbino config --verbose

# Show specific setting
gemkanbino config storage.base_path --verbose

# Export current configuration
gemkanbino config --export > current_config.yml
```

### Validation

#### Validate Configuration File

```bash
# Check syntax
ruby -ryaml -e "puts YAML.load_file(ENV['HOME'] + '/.gemkanbino/config.yml')"

# Validate with gemkanbino
gemkanbino config --validate
```

#### Test Storage Configuration

```bash
# Test storage directory
mkdir -p "$(gemkanbino config storage.base_path)"
touch "$(gemkanbino config storage.base_path)/test"
rm "$(gemkanbino config storage.base_path)/test"
```

#### Test Upload Configuration

```bash
# Test default provider
echo "test" > test_file.txt
gemkanbino upload test_file.txt
rm test_file.txt
```

### Getting Help

If you encounter configuration issues:

1. **Check the logs** in `~/.gemkanbino/logs/`
2. **Enable debug mode** for detailed output
3. **Validate your configuration** file syntax
4. **Test each component** individually
5. **Check environment variables** are set correctly
6. **Review this guide** for common solutions
7. **Create an issue** with your configuration details

---

For additional help or questions about configuration, please visit the [project repository](https://github.com/VictorHSCosta/kanbino) or [create an issue](https://github.com/VictorHSCosta/kanbino/issues).