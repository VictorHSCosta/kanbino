# Gemkanbino

[![Ruby Version](https://img.shields.io/badge/ruby-3.2%2B-red.svg)](https://www.ruby-lang.org/)
[![Gem Version](https://img.shields.io/gem/v/gemkanbino.svg)](https://rubygems.org/gems/gemkanbino)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/VictorHSCosta/kanbino/actions)

**Gemkanbino** is a comprehensive CLI tool for file management, navigation, and cloud uploads. Built with Ruby and Thor framework, it provides an intuitive way to navigate your file system, select files, create local copies, and upload them to cloud services directly from your terminal.

## 🚀 Features

- **File Navigation**: Navigate directories with familiar commands (`pwd`, `ls`, `cd`)
- **File Management**: Select, copy, and manage files with ease
- **Cloud Uploads**: Upload files to multiple cloud providers (file.io, transfer.sh)
- **Local Storage**: Create organized local copies with custom targets
- **Interactive Mode**: User-friendly interactive shell for guided operations
- **Configuration Management**: Flexible configuration system for all operations
- **Rich Output**: Colorized terminal output with progress bars and prompts

## 📦 Installation

### Install from RubyGems

```bash
gem install gemkanbino
```

### Using Bundler

Add this line to your application's Gemfile:

```ruby
gem 'gemkanbino'
```

And then execute:

```bash
bundle install
```

### Install from Source

```bash
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino
bundle install
bundle exec rake install
```

## 🔧 Requirements

- Ruby 3.2.0 or higher
- Unix-like operating system (Linux, macOS, WSL)

## 🎯 Usage

### Basic Commands

```bash
# Show version
gemkanbino version

# Show current working directory
gemkanbino pwd

# List files (current directory)
gemkanbino ls

# List files with options
gemkanbino ls /path/to/directory --all --long

# Change directory
gemkanbino cd /path/to/directory
```

### File Operations

```bash
# Select a file for operations
gemkanbino select /path/to/file.txt

# Show file information
gemkanbino info /path/to/file.txt
gemkanbino info  # Shows info for selected file

# Copy file to local storage
gemkanbino copy /path/to/file.txt --target "my-backup"
gemkanbino copy  # Copies selected file

# List stored files
gemkanbino list
```

### Cloud Uploads

```bash
# Upload to default provider
gemkanbino upload /path/to/file.txt
gemkanbino upload  # Uploads selected file

# Upload to specific provider
gemkanbino upload /path/to/file.txt --provider fileio
gemkanbino upload /path/to/file.txt --provider transfersh
```

### Configuration

```bash
# Show all configuration
gemkanbino config

# Show specific configuration
gemkanbino config storage_path

# Set configuration value
gemkanbino config default_provider fileio
```

### Interactive Mode

```bash
# Start interactive shell
gemkanbino interactive
```

## 📁 Project Structure

```
├── lib/
│   ├── gemkanbino.rb              # Main module entry point
│   ├── gemkanbino/
│   │   ├── cli.rb                 # Main CLI class (Thor commands)
│   │   ├── version.rb             # Version information
│   │   ├── file_navigator.rb      # Directory navigation
│   │   ├── file_manager.rb        # File operations
│   │   ├── local_storage.rb       # Local file storage
│   │   ├── uploader.rb            # Cloud upload functionality
│   │   ├── commands/              # Command implementations
│   │   ├── config/                # Configuration modules
│   │   ├── exceptions/            # Custom exceptions
│   │   ├── upload_providers/      # Upload service providers
│   │   └── utils/                 # Utility modules
├── exe/
│   └── gemkanbino                 # Executable script
├── spec/                          # Test files
└── docs/                          # Additional documentation
```

## 🔌 Upload Providers

### File.io
- **Description**: Temporary file sharing service
- **Retention**: Files available for 1 download or 14 days
- **Max Size**: Up to 2GB
- **Usage**: `gemkanbino upload file.txt --provider fileio`

### Transfer.sh
- **Description**: Simple file sharing service
- **Retention**: Files available for 14 days (configurable)
- **Max Size**: Up to 10GB
- **Usage**: `gemkanbino upload file.txt --provider transfersh`

## ⚙️ Configuration

Gemkanbino stores configuration in `~/.gemkanbino/config.yml`. Key options include:

```yaml
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

## 🛠️ Development

### Setup Development Environment

```bash
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino
bin/setup
```

### Running Tests

```bash
# Run all tests
bundle exec rake spec

# Run tests with coverage
bundle exec rspec

# Run code linting
bundle exec rubocop

# Run both tests and linting
bundle exec rake test
```

### Local Installation

```bash
# Install gem locally
bundle exec rake install

# Uninstall local version
gem uninstall gemkanbino
```

## 📚 Documentation

- [API Documentation](docs/API.md) - Complete API reference
- [Installation Guide](docs/INSTALLATION.md) - Detailed installation instructions
- [Configuration Guide](docs/CONFIGURATION.md) - Configuration options and examples
- [Upload Providers](docs/UPLOAD_PROVIDERS.md) - Upload provider documentation
- [Testing Guide](TESTING.md) - Testing instructions (Portuguese)
- [Contributing Guide](CONTRIBUTING.md) - Development contribution guidelines

## 🤝 Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/VictorHSCosta/kanbino. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/VictorHSCosta/kanbino/blob/main/CODE_OF_CONDUCT.md).

Please read our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- Development setup
- Code style and standards
- Pull request process
- Issue reporting
- Release process

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a complete history of changes.

## 🐛 Troubleshooting

### Common Issues

**Gem not found error:**
```bash
# Make sure RubyGems is updated
gem update --system
gem install gemkanbino
```

**Permission denied:**
```bash
# Install in user directory
gem install --user-install gemkanbino
```

**Upload failures:**
```bash
# Check internet connection
# Verify file exists and is readable
# Try different upload provider
```

### Getting Help

- Check the [Issues](https://github.com/VictorHSCosta/kanbino/issues) page
- Create a new issue with detailed information
- Include OS, Ruby version, and error messages

## 📄 License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Code of Conduct

Everyone interacting in the Gemkanbino project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/VictorHSCosta/kanbino/blob/main/CODE_OF_CONDUCT.md).

## 🙏 Acknowledgments

- Built with [Thor](https://github.com/rails/thor) - Ruby CLI framework
- Uses [TTY gems](https://github.com/piotrmurach/tty) for beautiful terminal interfaces
- Upload functionality powered by [HTTParty](https://github.com/jnunemaker/httparty)
- Styled with [Pastel](https://github.com/piotrmurach/pastel) for terminal colors

## 📞 Contact

- **Author**: VictorHSCosta
- **Email**: victorhenriquecosta23@gmail.com
- **GitHub**: https://github.com/VictorHSCosta/kanbino
- **Issues**: https://github.com/VictorHSCosta/kanbino/issues

---

**Made with ❤️ in Ruby**