# Gemkanbino Documentation Hub

Welcome to the comprehensive documentation for Gemkanbino - a powerful CLI tool for file management, navigation, and cloud uploads.

## 📚 Documentation Index

### Getting Started

| Document | Description | For |
|----------|-------------|-----|
| [📖 Main README](../README.md) | Project overview, features, and quick start guide | New users |
| [🚀 Installation Guide](INSTALLATION.md) | Detailed installation instructions for all platforms | All users |
| [⚙️ Configuration Guide](CONFIGURATION.md) | Complete configuration reference | Power users |
| [🔧 API Documentation](API.md) | Complete API reference for developers | Developers |

### User Guides

| Document | Description | For |
|----------|-------------|-----|
| [📤 Upload Providers](UPLOAD_PROVIDERS.md) | Documentation for upload service providers | All users |
| [🧪 Testing Guide](../TESTING.md) | Testing instructions (Portuguese) | Developers |
| [📋 Changelog](../CHANGELOG.md) | Version history and release notes | All users |

### Development

| Document | Description | For |
|----------|-------------|-----|
| [🤝 Contributing Guide](../CONTRIBUTING.md) | Development setup and contribution guidelines | Contributors |
| [📜 Code of Conduct](../CODE_OF_CONDUCT.md) | Community guidelines and standards | All participants |
| [🏗️ Project Structure](#project-structure) | Overview of codebase organization | Developers |

## 🚀 Quick Navigation

### New to Gemkanbino?

1. **Start with the [Main README](../README.md)** - Get an overview of what Gemkanbino can do
2. **Follow the [Installation Guide](INSTALLATION.md)** - Install Gemkanbino on your system
3. **Read the [Configuration Guide](CONFIGURATION.md)** - Customize your setup
4. **Check [Upload Providers](UPLOAD_PROVIDERS.md)** - Learn about cloud upload options

### Want to Contribute?

1. **Read the [Contributing Guide](../CONTRIBUTING.md)** - Understand our development process
2. **Follow the [Code of Conduct](../CODE_OF_CONDUCT.md)** - Learn community expectations
3. **Review the [API Documentation](API.md)** - Understand the codebase
4. **Check the [Testing Guide](../TESTING.md)** - Learn how to test your changes

### Need Help?

- **🐛 Report Issues**: [GitHub Issues](https://github.com/VictorHSCosta/kanbino/issues)
- **💬 Start Discussions**: [GitHub Discussions](https://github.com/VictorHSCosta/kanbino/discussions)
- **📧 Contact Maintainer**: victorhenriquecosta23@gmail.com

## 📖 Document Details

### Installation Guide

**[INSTALLATION.md](INSTALLATION.md)**

Comprehensive installation instructions covering:
- System requirements (Ruby 3.2+)
- Multiple installation methods (gem, bundler, source)
- Platform-specific instructions (Linux, macOS, Windows)
- Environment setup and configuration
- Troubleshooting common issues
- Upgrade and uninstallation procedures

**Key Sections:**
- [System Requirements](INSTALLATION.md#system-requirements)
- [Installation Methods](INSTALLATION.md#installation-methods)
- [Platform-Specific Setup](INSTALLATION.md#installation-by-operating-system)
- [Troubleshooting](INSTALLATION.md#troubleshooting)

### Configuration Guide

**[CONFIGURATION.md](CONFIGURATION.md)**

Complete configuration reference including:
- Configuration file structure and syntax
- Storage settings and limits
- Upload provider configuration
- UI and display options
- Environment variables
- Advanced settings and performance tuning
- Security considerations

**Key Sections:**
- [Configuration Files](CONFIGURATION.md#configuration-files)
- [Storage Configuration](CONFIGURATION.md#storage-configuration)
- [Upload Configuration](CONFIGURATION.md#upload-configuration)
- [Environment Variables](CONFIGURATION.md#environment-variables)

### API Documentation

**[API.md](API.md)**

Complete technical reference for:
- Core classes and methods
- CLI command interface
- Upload provider API
- Exception handling
- Utility modules
- Usage examples and code samples

**Key Sections:**
- [Main Module](API.md#main-module)
- [CLI Class](API.md#cli-class)
- [Core Classes](API.md#core-classes)
- [Upload Providers](API.md#upload-providers)

### Upload Providers Documentation

**[UPLOAD_PROVIDERS.md](UPLOAD_PROVIDERS.md)**

Detailed information about upload services:
- File.io provider setup and limits
- Transfer.sh provider configuration
- Custom provider implementation
- Security considerations
- Comparison of providers

**Key Sections:**
- [Supported Providers](UPLOAD_PROVIDERS.md#supported-providers)
- [Provider Configuration](UPLOAD_PROVIDERS.md#provider-configuration)
- [Custom Providers](UPLOAD_PROVIDERS.md#custom-providers)

## 🏗️ Project Structure

Understanding the codebase organization:

```
kanbino/
├── 📁 lib/gemkanbino/           # Main source code
│   ├── gemkanbino.rb           # Entry point
│   ├── cli.rb                  # Command-line interface
│   ├── version.rb              # Version information
│   ├── file_navigator.rb       # Directory navigation
│   ├── file_manager.rb         # File operations
│   ├── local_storage.rb        # Local file storage
│   ├── uploader.rb             # Upload functionality
│   ├── config_manager.rb       # Configuration management
│   ├── interactive_shell.rb    # Interactive mode
│   ├── 📁 commands/            # Command implementations
│   ├── 📁 config/              # Configuration modules
│   ├── 📁 exceptions/          # Custom exception classes
│   ├── 📁 upload_providers/    # Upload service providers
│   └── 📁 utils/               # Utility modules
├── 📁 exe/                     # Executable scripts
│   └── gemkanbino              # Main executable
├── 📁 spec/                    # Test files
│   ├── spec_helper.rb          # Test configuration
│   ├── 📁 factories/           # Test data factories
│   └── 📁 gemkanbino/          # Unit tests
├── 📁 docs/                    # Documentation
│   ├── README.md               # This file
│   ├── API.md                  # API reference
│   ├── INSTALLATION.md         # Installation guide
│   ├── CONFIGURATION.md        # Configuration guide
│   └── UPLOAD_PROVIDERS.md     # Upload providers
├── 📄 README.md                # Project README
├── 📄 CHANGELOG.md             # Version history
├── 📄 CONTRIBUTING.md          # Contribution guidelines
├── 📄 CODE_OF_CONDUCT.md       # Community guidelines
├── 📄 TESTING.md               # Testing guide (Portuguese)
├── 📄 gemkanbino.gemspec       # Gem specification
└── 📄 Rakefile                 # Build tasks
```

## 🔗 Quick Links

### External Resources

- [Ruby Documentation](https://ruby-doc.org/)
- [Thor CLI Framework](https://github.com/rails/thor)
- [TTY Gems Collection](https://github.com/piotrmurach/tty)
- [RubyGems.org](https://rubygems.org/gems/gemkanbino)

### Related Projects

- [File.io](https://file.io/) - Temporary file sharing service
- [Transfer.sh](https://transfer.sh/) - Simple file sharing service
- [Pastel](https://github.com/piotrmurach/pastel) - Terminal colors
- [HTTParty](https://github.com/jnunemaker/httparty) - HTTP client library

## 📊 Documentation Statistics

| Metric | Value |
|--------|-------|
| Total Documents | 8 |
| Core Documentation | 4 |
| Development Docs | 4 |
| Languages | English (primary), Portuguese (testing) |
| Last Updated | 2025-12-10 |

## 🎯 Documentation Goals

This documentation aims to:

- ✅ **Comprehensive Coverage** - Document all features and functionality
- ✅ **Multiple Audiences** - Serve users, developers, and contributors
- ✅ **Practical Examples** - Provide real-world usage examples
- ✅ **Easy Navigation** - Clear structure and cross-references
- ✅ **Regular Updates** - Keep documentation current with code changes

## 📝 Documentation Standards

### Writing Guidelines

- **Clear Language** - Use simple, direct language
- **Active Voice** - Write in active voice when possible
- **Code Examples** - Include working code samples
- **Cross-References** - Link to related documentation
- **Consistent Format** - Follow established templates

### Markup Standards

- **Markdown** - Use GitHub-flavored Markdown
- **Code Blocks** - Include language hints for syntax highlighting
- **Tables** - Use structured tables for organized information
- **Emojis** - Use emojis sparingly for visual appeal
- **Links** - Use descriptive link text

### Review Process

All documentation should:
- Be reviewed for accuracy
- Test code examples for correctness
- Check links for validity
- Verify formatting consistency

## 🔄 Keeping Documentation Updated

### Documentation Maintenance

Documentation is updated through:

1. **Code Changes** - Updated when features are added/modified
2. **Community Feedback** - Improved based on user input
3. **Regular Reviews** - Periodic accuracy checks
4. **Version Releases** - Updated for each new release

### Contributing to Documentation

We welcome documentation contributions:

- **Corrections** - Fix errors or outdated information
- **Improvements** - Enhance clarity and completeness
- **Translations** - Add documentation in other languages
- **Examples** - Provide additional usage examples

See [Contributing Guide](../CONTRIBUTING.md#documentation-standards) for guidelines.

## 📞 Support

If you need help with Gemkanbino:

### Documentation Issues

- **Missing Information** - Report missing or unclear documentation
- **Outdated Content** - Flag outdated information
- **Formatting Problems** - Report formatting or display issues
- **Link Problems** - Report broken or incorrect links

### Technical Support

- **Bug Reports** - [Create an issue](https://github.com/VictorHSCosta/kanbino/issues)
- **Feature Requests** - [Suggest improvements](https://github.com/VictorHSCosta/kanbino/issues)
- **Questions** - [Start a discussion](https://github.com/VictorHSCosta/kanbino/discussions)
- **Direct Contact** - victorhenriquecosta23@gmail.com

---

## 🗺️ Navigation Map

```
Documentation Hub (docs/README.md)
├── 📖 Getting Started
│   ├── Main README (../README.md)
│   ├── Installation Guide (INSTALLATION.md)
│   └── Quick Start (../README.md#usage)
├── ⚙️ Configuration
│   ├── Configuration Guide (CONFIGURATION.md)
│   ├── Environment Variables (CONFIGURATION.md#environment-variables)
│   └── Provider Settings (CONFIGURATION.md#provider-specific-settings)
├── 📤 Upload Services
│   ├── Upload Providers (UPLOAD_PROVIDERS.md)
│   ├── File.io Guide (UPLOAD_PROVIDERS.md#fileio)
│   └── Transfer.sh Guide (UPLOAD_PROVIDERS.md#transfer-sh)
├── 🔧 Development
│   ├── API Documentation (API.md)
│   ├── Contributing Guide (../CONTRIBUTING.md)
│   ├── Testing Guide (../TESTING.md)
│   └── Code of Conduct (../CODE_OF_CONDUCT.md)
└── 📋 Reference
    ├── Changelog (../CHANGELOG.md)
    ├── Project Structure (docs/README.md#project-structure)
    └── Support Information (docs/README.md#support)
```

---

Thank you for using Gemkanbino! We hope this documentation helps you make the most of the tool. If you have suggestions for improving our documentation, please let us know! 🚀