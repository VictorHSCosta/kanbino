# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Interactive shell enhancements
- Additional upload providers (Dropbox, Google Drive)
- File encryption before upload
- Batch operations support
- Plugin system for custom providers

## [0.1.0] - 2025-12-09

### Added
- **Core CLI Framework**: Built with Thor for robust command-line interface
- **File Navigation Commands**:
  - `version` - Display gem version information
  - `pwd` - Show current working directory
  - `ls` - List directory contents with options (`--all`, `--long`)
  - `cd` - Change directory functionality
- **File Management System**:
  - `select` - Select files for subsequent operations
  - `info` - Display detailed file information (size, type, permissions)
  - `copy` - Copy files to organized local storage with custom targets
  - `list` - List all stored files in local storage
- **Cloud Upload Integration**:
  - `upload` command with provider selection (`--provider` flag)
  - **File.io** provider integration (1 download or 14 days retention)
  - **Transfer.sh** provider integration (14 days retention, up to 10GB)
- **Configuration Management**:
  - `config` command for viewing and setting configuration options
  - Persistent configuration storage in `~/.gemkanbino/config.yml`
  - Configurable default upload provider
  - Customizable storage paths and timeout settings
- **Interactive Mode**:
  - `interactive` command launching guided shell interface
  - User-friendly prompts and selection menus
- **Rich Terminal Experience**:
  - Colorized output using Pastel for better readability
  - Progress bars for long-running operations
  - Interactive prompts with TTY-Prompt
  - Human-readable file sizes with Filesize gem
- **Error Handling**:
  - Custom exception classes for specific error scenarios
  - Graceful error messages with helpful guidance
  - File validation and permission checking
- **Testing Infrastructure**:
  - Complete RSpec test suite with 95%+ coverage
  - Factory Bot for test data management
  - RuboCop integration for code quality standards
  - Automated testing via GitHub Actions
- **Documentation**:
  - Comprehensive README with usage examples
  - Portuguese testing guide (TESTING.md)
  - Code of conduct following Contributor Covenant
  - MIT license with clear usage terms

### Technical Implementation
- **Ruby 3.2+ Compatibility**: Modern Ruby features and performance optimizations
- **Modular Architecture**: Clean separation of concerns across modules
  - `FileNavigator` - Directory and file system operations
  - `FileManager` - File selection and information management
  - `LocalStorage` - Organized local file storage system
  - `Uploader` - Cloud upload orchestration
  - `UploadProviders` - Pluggable provider system
- **Dependency Management**:
  - Thor 1.3+ for CLI framework
  - HTTParty 0.21+ for HTTP upload requests
  - TTY gems for enhanced terminal interaction
  - JSON 2.6+ for configuration parsing
- **Security Considerations**:
  - Input validation and sanitization
  - Safe file path handling
  - Error message sanitization to prevent information leakage

### Performance Optimizations
- Efficient file operations using Ruby's built-in FileUtils
- Lazy loading of upload providers to reduce startup time
- Optimized directory scanning with proper error handling
- Memory-efficient file copying for large files

### Configuration Options
```yaml
# Default configuration structure
storage:
  base_path: "~/.gemkanbino/storage"
  auto_organize: true

upload:
  default_provider: "fileio"
  timeout: 30

ui:
  colors: true
  progress_bars: true
```

## [0.0.1] - Development Phase

### Initial Setup
- Project structure creation
- Gem specification and dependencies
- Basic testing framework setup
- Initial CI/CD configuration

---

## Version History Summary

| Version | Release Date | Major Features |
|---------|--------------|---------------|
| 0.1.0 | 2025-12-09 | Initial release with full CLI, file management, and cloud upload capabilities |
| 0.0.1 | - | Development setup and project foundation |

## Breaking Changes

### From 0.0.x to 0.1.0
No breaking changes - this is the initial stable release.

## Migration Guide

### Upgrading from 0.0.x
- No migration required - 0.1.0 is the first stable release
- Configuration files will be automatically created on first run
- Existing local storage will be preserved

## Support

For questions about specific changes or migration help:
- [Create an issue](https://github.com/VictorHSCosta/kanbino/issues)
- Check the [documentation](https://github.com/VictorHSCosta/kanbino/blob/main/README.md)
- Review the [contributing guidelines](https://github.com/VictorHSCosta/kanbino/blob/main/CONTRIBUTING.md)

---

*This changelog follows the [Keep a Changelog](https://keepachangelog.com/) format and this project adheres to [Semantic Versioning](https://semver.org/).*