# Gemkanbino Upload Providers Documentation

This guide provides comprehensive information about the upload providers available in Gemkanbino, their configurations, limitations, and usage instructions.

## Table of Contents

- [Overview](#overview)
- [Supported Providers](#supported-providers)
- [Provider Comparison](#provider-comparison)
- [File.io Provider](#fileio-provider)
- [Transfer.sh Provider](#transfer-sh-provider)
- [Custom Providers](#custom-providers)
- [Provider Configuration](#provider-configuration)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Provider Development](#provider-development)

## Overview

Gemkanbino supports multiple cloud storage providers for file uploads, each with different characteristics, limitations, and use cases. The provider system is designed to be extensible, allowing for custom provider implementations.

### Provider Features

All providers support:
- **Progress Tracking**: Real-time upload progress with visual indicators
- **Error Handling**: Comprehensive error reporting and retry logic
- **URL Generation**: Shareable download links for uploaded files
- **Metadata Support**: File information and upload tracking
- **Clipboard Integration**: Automatic URL copying (when available)

### Provider Selection

You can specify providers in several ways:

```bash
# Default provider in configuration
gemkanbino config upload.default_provider fileio

# Per-upload provider selection
gemkanbino upload file.txt --provider fileio
gemkanbino upload file.txt --provider transfersh

# Interactive provider selection
gemkanbino upload file.txt  # Will prompt if no default set
```

## Supported Providers

### Built-in Providers

| Provider | Max Size | Retention | Features | Privacy |
|----------|----------|-----------|----------|---------|
| **File.io** | 2GB | 14 days or 1 download | Temporary, one-time use | Public |
| **Transfer.sh** | 10GB | 14 days (configurable) | Multiple downloads, encryption | Public |

### Provider Characteristics

#### File.io
- **Best for**: Temporary file sharing, one-time downloads
- **File limits**: Up to 2GB per file
- **Retention**: 14 days or 1 download (whichever comes first)
- **Privacy**: Publicly accessible URLs
- **Speed**: Fast upload and download
- **Cost**: Free tier available

#### Transfer.sh
- **Best for**: Multiple downloads, larger files
- **File limits**: Up to 10GB per file
- **Retention**: 14 days (configurable up to 1 year)
- **Privacy**: Publicly accessible URLs, optional password protection
- **Speed**: Fast upload and download
- **Cost**: Free service

## Provider Comparison

### Feature Matrix

| Feature | File.io | Transfer.sh |
|---------|---------|-------------|
| **Max File Size** | 2GB | 10GB |
| **Default Retention** | 14 days or 1 download | 14 days |
| **Custom Retention** | Limited | Yes (1h - 1 year) |
| **Download Limit** | 1 download | Unlimited |
| **Password Protection** | No | Yes |
| **Encryption** | No | Yes (server-side) |
| **Custom Domain** | No | Yes |
| **API Access** | Yes | Yes |
| **Statistics** | No | No |
| **Delete URL** | Yes | Yes |
| **Bulk Uploads** | Limited | Yes |

### Use Case Recommendations

#### Choose File.io for:
- **Temporary sharing**: Files that should be deleted after first download
- **Privacy**: Files that need immediate deletion after access
- **Simple workflow**: No additional configuration needed
- **Small to medium files**: Under 2GB

#### Choose Transfer.sh for:
- **Multiple downloads**: Files accessed by multiple people
- **Large files**: Up to 10GB
- **Custom retention**: Specific expiration dates
- **Password protection**: Secure file sharing
- **Reliability**: Established service with good uptime

## File.io Provider

### Overview

File.io is a temporary file sharing service that automatically deletes files after they are downloaded once or after 14 days, whichever comes first.

### Configuration

```yaml
providers:
  fileio:
    # API endpoint (usually don't need to change)
    api_endpoint: "https://file.io"

    # File expiration time (format: "1h", "1d", "1w", "1M")
    expires_in: "14d"

    # Maximum file size (format: "100MB", "1GB", "10GB")
    max_file_size: "2GB"

    # Allowed file extensions (null = all allowed)
    allowed_extensions: null

    # API key (if available)
    api_key: null

    # Custom HTTP headers
    headers:
      User-Agent: "Gemkanbino/0.1.0"
```

### Usage Examples

#### Basic Upload
```bash
# Upload with default settings
gemkanbino upload document.txt --provider fileio

# Upload with custom expiration (if supported)
gemkanbino config providers.fileio.expires_in "7d"
gemkanbino upload document.txt --provider fileio
```

#### Programmatic Usage
```ruby
require 'gemkanbino'

uploader = Gemkanbino::Uploader.new
result = uploader.upload_file('/path/to/file.txt', 'fileio')

if result[:success]
  puts "Upload URL: #{result[:url]}"
  puts "Expires: #{result[:expires_at]}"
  puts "Delete URL: #{result[:delete_url]}"
else
  puts "Upload failed: #{result[:error]}"
end
```

### Response Format

```json
{
  "success": true,
  "key": "abcdef123456",
  "url": "https://file.io/d/abcdef123456",
  "expires_in": "14d",
  "expires_at": "2025-12-24T10:30:00Z",
  "max_downloads": 1,
  "downloads": 0,
  "delete_url": "https://file.io/d/abcdef123456/delete"
}
```

### Limitations

- **Single Download**: Files are deleted after first download
- **Public Access**: Anyone with the URL can download
- **No Password Protection**: No built-in security features
- **Size Limit**: Maximum 2GB per file
- **Retention**: Maximum 14 days

### Best Practices

- Use for **temporary sharing** of sensitive documents
- **Download immediately** after upload to ensure availability
- **Share URLs carefully** as they're publicly accessible
- **Verify file size** before upload to avoid errors

## Transfer.sh Provider

### Overview

Transfer.sh is a simple file sharing service that supports larger files, longer retention periods, and additional security features.

### Configuration

```yaml
providers:
  transfersh:
    # API endpoint (can use custom instance)
    api_endpoint: "https://transfer.sh"

    # File expiration time
    expires_in: "14d"

    # Maximum file size
    max_file_size: "10GB"

    # Download limits (null = unlimited)
    max_downloads: null

    # Password protection
    encryption_password: null

    # Custom domain (if using self-hosted instance)
    custom_domain: null

    # Additional upload options
    options:
      virus_scan: true
      password_protection: false
```

### Usage Examples

#### Basic Upload
```bash
# Upload with default settings
gemkanbino upload large_file.zip --provider transfersh

# Upload with custom expiration
gemkanbino config providers.transfersh.expires_in "30d"
gemkanbino upload large_file.zip --provider transfersh
```

#### Password Protected Upload
```bash
# Set password in configuration
gemkanbino config providers.transfersh.encryption_password "mypassword"

# Or use environment variable
export GEMKANBINO_TRANSFERSH_PASSWORD="mypassword"
gemkanbino upload sensitive.pdf --provider transfersh
```

#### Custom Retention
```bash
# Set custom retention period
gemkanbino config providers.transfersh.expires_in "7d"  # 7 days
gemkanbino config providers.transfersh.expires_in "1M"  # 1 month
gemkanbino config providers.transfersh.expires_in "1y"  # 1 year
```

#### Custom Domain
```bash
# Use custom transfer.sh instance
gemkanbino config providers.transfersh.api_endpoint "https://files.mycompany.com"
gemkanbino config providers.transfersh.custom_domain "files.mycompany.com"
```

### Programmatic Usage
```ruby
require 'gemkanbino'

uploader = Gemkanbino::Uploader.new

# Basic upload
result = uploader.upload_file('/path/to/large_file.zip', 'transfersh')

if result[:success]
  puts "Upload URL: #{result[:url]}"
  puts "Expires: #{result[:expires_at]}"
  puts "Size: #{result[:size]}"
end

# Upload with password
Gemkanbino.config.set('providers.transfersh.encryption_password', 'secret123')
result = uploader.upload_file('/path/to/sensitive.pdf', 'transfersh')
```

### Response Format

```json
{
  "success": true,
  "url": "https://transfer.sh/filename.zip/abcdef123456",
  "expires_in": "14d",
  "expires_at": "2025-12-24T10:30:00Z",
  "max_downloads": null,
  "size": 1048576,
  "content_type": "application/zip",
  "delete_url": "https://transfer.sh/filename.zip/abcdef123456/delete",
  "password_protected": false
}
```

### Expiration Options

Transfer.sh supports various expiration formats:

| Format | Description | Example |
|--------|-------------|---------|
| "1h" | 1 hour | `gemkanbino config providers.transfersh.expires_in "1h"` |
| "1d" | 1 day | `gemkanbino config providers.transfersh.expires_in "1d"` |
| "1w" | 1 week | `gemkanbino config providers.transfersh.expires_in "1w"` |
| "1M" | 1 month | `gemkanbino config providers.transfersh.expires_in "1M"` |
| "1y" | 1 year | `gemkanbino config providers.transfersh.expires_in "1y"` |

### Advanced Features

#### Virus Scanning
```yaml
providers:
  transfersh:
    options:
      virus_scan: true  # Enable automatic virus scanning
```

#### Custom Instance
```yaml
providers:
  transfersh:
    api_endpoint: "https://files.company.com"
    custom_domain: "files.company.com"
```

#### Download Limits
```yaml
providers:
  transfersh:
    max_downloads: 10  # Limit to 10 downloads
```

### Limitations

- **Public URLs**: Still publicly accessible unless password protected
- **Size Limit**: Maximum 10GB per file
- **Rate Limiting**: May have upload rate limits
- **No Direct Statistics**: Limited usage analytics

### Best Practices

- Use **password protection** for sensitive files
- Set **appropriate retention** periods
- Consider **file size** for reliable uploads
- Use **custom instances** for corporate environments

## Custom Providers

### Creating Custom Providers

You can create custom upload providers by implementing the provider interface:

```ruby
module Gemkanbino
  module UploadProviders
    class CustomProvider
      include BaseProvider

      def initialize(config = {})
        @config = config
        @api_endpoint = config[:api_endpoint] || "https://api.custom.com"
        @api_key = config[:api_key]
      end

      # Provider information
      def name
        "CustomProvider"
      end

      def description
        "Custom upload service"
      end

      # Upload implementation
      def upload(file_path, &progress_block)
        # Implementation here
        {
          success: true,
          url: "https://custom.com/files/#{file_id}",
          expires_at: Time.now + 86400
        }
      end

      # Connection test
      def test_connection
        # Test connectivity to provider
        true
      end

      # Availability check
      def available?
        test_connection
      end

      private

      def perform_upload(file_path, &progress_block)
        # Actual upload implementation
        # Should call progress_block with progress percentage (0.0 - 1.0)
      end
    end
  end
end
```

### Provider Interface

All providers must implement these methods:

#### Required Methods

- `upload(file_path, &progress_block)` - Upload file with progress tracking
- `name` - Return provider name
- `description` - Return provider description
- `test_connection` - Test provider connectivity
- `available?` - Check if provider is available

#### Upload Method Requirements

The `upload` method must:
- Accept a file path string
- Accept an optional progress block
- Return a hash with at least:
  - `:success` (Boolean)
  - `:url` (String on success)
  - `:error` (String on failure)

#### Progress Tracking

Implement progress tracking by calling the progress block:

```ruby
def upload(file_path, &progress_block)
  file_size = File.size(file_path)
  uploaded = 0

  # ... upload logic ...

  # Report progress (0.0 to 1.0)
  progress_block.call(uploaded.to_f / file_size) if progress_block
end
```

### Registering Custom Providers

Add your custom provider to the uploader:

```ruby
module Gemkanbino
  class Uploader
    private

    def providers
      [
        UploadProviders::FileIO.new,
        UploadProviders::TransferSh.new,
        UploadProviders::CustomProvider.new(custom_config)
      ]
    end
  end
end
```

### Example: AWS S3 Provider

```ruby
module Gemkanbino
  module UploadProviders
    class S3Provider
      include BaseProvider

      def initialize(config = {})
        @config = config
        @bucket = config[:bucket]
        @region = config[:region] || 'us-east-1'
        @access_key_id = config[:access_key_id]
        @secret_access_key = config[:secret_access_key]

        setup_s3_client
      end

      def name
        "Amazon S3"
      end

      def description
        "Amazon S3 cloud storage"
      end

      def upload(file_path, &progress_block)
        object_key = generate_object_key(file_path)

        s3_client.put_object(
          bucket: @bucket,
          key: object_key,
          body: File.open(file_path, 'rb'),
          content_type: MIME::Types.type_for(file_path).first&.content_type,
          content_length: File.size(file_path)
        ) do |chunk|
          # Progress tracking
          progress_block.call(chunk.size.to_f / File.size(file_path)) if progress_block
        end

        url = s3_client.presigned_url(:get, bucket: @bucket, key: object_key, expires_in: 86400)

        {
          success: true,
          url: url,
          expires_at: Time.now + 86400
        }
      rescue => e
        {
          success: false,
          error: e.message
        }
      end

      def test_connection
        s3_client.list_buckets
        true
      rescue => e
        false
      end

      def available?
        @s3_client && test_connection
      end

      private

      def setup_s3_client
        require 'aws-sdk-s3'

        @s3_client = Aws::S3::Client.new(
          region: @region,
          access_key_id: @access_key_id,
          secret_access_key: @secret_access_key
        )
      end

      def generate_object_key(file_path)
        timestamp = Time.now.strftime('%Y%m%d_%H%M%S')
        filename = File.basename(file_path)
        "gemkanbino/#{timestamp}/#{filename}"
      end
    end
  end
end
```

## Provider Configuration

### Setting Default Provider

```bash
# Set globally
gemkanbino config upload.default_provider fileio

# Set per provider settings
gemkanbino config providers.fileio.expires_in "7d"
gemkanbino config providers.transfersh.max_downloads 10
```

### Environment Variables

```bash
# Provider selection
export GEMKANBINO_DEFAULT_PROVIDER="fileio"

# File.io settings
export GEMKANBINO_FILEIO_EXPIRES="14d"
export GEMKANBINO_FILEIO_API_KEY="your_api_key"

# Transfer.sh settings
export GEMKANBINO_TRANSFERSH_EXPIRES="30d"
export GEMKANBINO_TRANSFERSH_PASSWORD="encryption_password"
export GEMKANBINO_TRANSFERSH_DOMAIN="files.company.com"
```

### Testing Providers

```bash
# Test specific provider
gemkanbino test-provider fileio
gemkanbino test-provider transfersh

# Test all providers
gemkanbino list-providers
```

## Security Considerations

### File Privacy

- **Public URLs**: Most providers use publicly accessible URLs
- **No Encryption**: Files are uploaded unencrypted unless provider supports it
- **Temporary Access**: Use providers with automatic deletion for sensitive files
- **Password Protection**: Use Transfer.sh with passwords when available

### Best Practices

#### For Sensitive Files
```bash
# Use short expiration times
gemkanbino config providers.fileio.expires_in "1h"
gemkanbino config providers.transfersh.expires_in "1d"

# Use password protection (Transfer.sh)
gemkanbino config providers.transfersh.encryption_password "strong_password"

# Delete files after use
gemkanbino upload sensitive.pdf --provider fileio
# Download and verify, then file will auto-delete
```

#### Compliance Considerations
- **Data Classification**: Classify files before upload
- **Retention Policies**: Set appropriate expiration times
- **Access Control**: Use password protection when available
- **Audit Trail**: Monitor upload history with `gemkanbino show-upload-history`

### Provider Trust

- **Reputable Services**: Use established providers
- **Terms of Service**: Review provider terms and privacy policies
- **Data Location**: Consider where data is stored
- **Backup Strategy**: Don't rely on providers for permanent storage

## Troubleshooting

### Common Upload Issues

#### "File too large"
```bash
# Check provider limits
gemkanbino list-providers

# Use different provider for larger files
gemkanbino upload large_file.zip --provider transfersh
```

#### "Upload timeout"
```bash
# Increase timeout settings
gemkanbino config upload.timeout 120

# Check network connectivity
gemkanbino test-provider fileio
```

#### "Provider unavailable"
```bash
# Test provider connectivity
gemkanbino test-provider transfersh

# Check internet connection
ping transfer.sh
ping file.io
```

#### "Authentication failed"
```bash
# Check API key configuration
gemkanbino config providers.fileio.api_key
export GEMKANBINO_FILEIO_API_KEY="your_key"

# Test with different provider
gemkanbino upload file.txt --provider fileio
```

### Debug Information

#### Enable Debug Mode
```bash
# Temporary debug
gemkanbino --debug upload file.txt

# Enable debug logging
gemkanbino config logging.level debug
gemkanbino config logging.console true
```

#### Check Configuration
```bash
# Show current provider settings
gemkanbino config --verbose

# Show all providers
gemkanbino list-providers

# Test all providers
for provider in fileio transfersh; do
  echo "Testing $provider:"
  gemkanbino test-provider $provider
done
```

### Network Issues

#### Proxy Configuration
```bash
# Set HTTP proxy
export HTTP_PROXY="http://proxy.company.com:8080"
export HTTPS_PROXY="https://proxy.company.com:8080"

# Set no proxy for certain domains
export NO_PROXY="localhost,127.0.0.1,.company.com"
```

#### DNS Issues
```bash
# Test DNS resolution
nslookup file.io
nslookup transfer.sh

# Use alternative DNS if needed
echo "nameserver 8.8.8.8" >> /etc/resolv.conf
```

## Provider Development

### Contributing Providers

We welcome contributions for new upload providers. When creating a provider:

1. **Follow the interface** - Implement all required methods
2. **Add tests** - Include comprehensive test coverage
3. **Document configuration** - Document all configuration options
4. **Handle errors** - Provide clear error messages
5. **Support progress** - Implement progress tracking
6. **Follow Ruby conventions** - Use proper Ruby style

### Provider Requirements

- **Ruby 3.2+** compatibility
- **Thread safety** for concurrent uploads
- **Proper error handling** and retry logic
- **Progress tracking** with percentage reporting
- **Configuration validation** for required settings
- **Documentation** for all public methods

### Submitting Providers

1. **Fork the repository**
2. **Create provider class** in `lib/gemkanbino/upload_providers/`
3. **Add configuration schema** documentation
4. **Write comprehensive tests** in `spec/upload_providers/`
5. **Update documentation** with provider details
6. **Submit pull request** with description

---

For additional help or questions about upload providers, please visit the [project repository](https://github.com/VictorHSCosta/kanbino) or [create an issue](https://github.com/VictorHSCosta/kanbino/issues).