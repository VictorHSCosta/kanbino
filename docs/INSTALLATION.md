# Gemkanbino Installation Guide

This comprehensive guide covers all aspects of installing Gemkanbino on different systems and environments.

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation Methods](#installation-methods)
- [Installation by Operating System](#installation-by-operating-system)
- [Environment Setup](#environment-setup)
- [Configuration](#configuration)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

## System Requirements

### Ruby Version

Gemkanbino requires **Ruby 3.2.0 or higher**.

#### Checking Ruby Version

```bash
ruby --version
# Expected output: ruby 3.2.x or higher
```

#### Installing Ruby

**Ubuntu/Debian:**
```bash
# Install Ruby 3.2+
sudo apt update
sudo apt install ruby3.2 ruby3.2-dev

# Or using Ruby version manager (recommended)
# Install rbenv
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

# Add to shell profile
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# Install Ruby 3.2
rbenv install 3.2.2
rbenv global 3.2.2
```

**macOS:**
```bash
# Using Homebrew
brew install ruby@3.2

# Add to PATH (add to ~/.zshrc or ~/.bash_profile)
echo 'export PATH="/usr/local/opt/ruby@3.2/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Or using rbenv (recommended)
brew install rbenv
rbenv install 3.2.2
rbenv global 3.2.2
```

**Windows:**
```bash
# Using RubyInstaller
# Download from https://rubyinstaller.org/downloads/
# Choose Ruby+Devkit version 3.2.x

# Or using Chocolatey
choco install ruby

# Or using Scoop
scoop install ruby
```

### Operating System Compatibility

- **Linux**: All modern distributions (Ubuntu 18.04+, Debian 10+, CentOS 8+, Fedora 35+)
- **macOS**: 10.15 Catalina and later
- **Windows**: Windows 10 and later (via WSL or native)
- **BSD**: FreeBSD, OpenBSD, NetBSD with Ruby support

### Required System Tools

```bash
# Verify essential tools are available
which git curl tar gzip

# On Ubuntu/Debian
sudo apt install git curl tar gzip build-essential

# On macOS (via Homebrew)
brew install git curl tar gzip

# On Windows (via Chocolatey)
choco install git curl gzip
```

## Installation Methods

### Method 1: RubyGems (Recommended)

This is the simplest and most common installation method.

```bash
# Install the latest version
gem install gemkanbino

# Install specific version
gem install gemkanbino -v 0.1.0

# Install with documentation
gem install gemkanbino --document=rdoc
```

**Advantages:**
- Automatic dependency management
- Easy updates with `gem update gemkanbino`
- Version management with `gem` commands
- System-wide availability

### Method 2: Bundler

For use within Ruby applications or development environments.

#### Gemfile Installation

Create or update your `Gemfile`:

```ruby
source 'https://rubygems.org'

gem 'gemkanbino', '~> 0.1'
```

Install dependencies:

```bash
bundle install
```

#### Local Development

```bash
# Clone the repository
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# Install dependencies
bundle install

# Install gem locally
bundle exec rake install
```

### Method 3: Source Installation

For development or custom modifications.

```bash
# Clone the repository
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# Install build dependencies
bundle install

# Build and install gem
gem build gemkanbino.gemspec
gem install gemkanbino-*.gem
```

### Method 4: Package Manager Installation

#### Homebrew (macOS)

```bash
# If tap exists (future support)
brew tap VictorHSCosta/tap
brew install gemkanbino
```

#### AUR (Arch Linux)

```bash
# Using yay or other AUR helper
yay -S ruby-gemkanbino

# Manual installation
git clone https://aur.archlinux.org/ruby-gemkanbino.git
cd ruby-gemkanbino
makepkg -si
```

## Installation by Operating System

### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install Ruby and development tools
sudo apt install ruby3.2 ruby3.2-dev build-essential

# Install gemkanbino
gem install gemkanbino

# Add gem path to PATH if needed
echo 'export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### CentOS/RHEL/Fedora

```bash
# CentOS/RHEL
sudo yum install ruby ruby-devel gcc make

# Fedora
sudo dnf install ruby ruby-devel gcc make

# Install gemkanbino
gem install gemkanbino

# Update PATH if necessary
echo 'export PATH="$HOME/.gem/ruby/$(ruby -e "puts RUBY_VERSION")/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### macOS

```bash
# Install Ruby using Homebrew
brew install ruby@3.2

# Set up environment
echo 'export PATH="/usr/local/opt/ruby@3.2/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Install gemkanbino
gem install gemkanbino
```

### Windows

#### Native Windows

1. **Install Ruby**: Download from [RubyInstaller](https://rubyinstaller.org/downloads/)
2. **Run installer**: Choose "Add Ruby executables to your PATH"
3. **Install gemkanbino**:
   ```cmd
   gem install gemkanbino
   ```

#### Windows Subsystem for Linux (WSL)

```bash
# Enable WSL (in PowerShell as Administrator)
wsl --install

# After installation, open Ubuntu/WSL terminal
sudo apt update
sudo apt install ruby3.2 ruby3.2-dev build-essential
gem install gemkanbino
```

#### Windows using Git Bash

```bash
# Install Ruby for Windows first
# Then in Git Bash
gem install gemkanbino
```

### FreeBSD

```bash
# Install Ruby
pkg install ruby ruby-gems

# Install gemkanbino
gem install gemkanbino
```

## Environment Setup

### Shell Configuration

Add gem executables to your PATH by adding to your shell profile:

#### Bash (~/.bashrc)
```bash
export PATH="$HOME/.gem/ruby/$(ruby -e "puts RUBY_VERSION")/bin:$PATH"
```

#### Zsh (~/.zshrc)
```bash
export PATH="$HOME/.gem/ruby/$(ruby -e "puts RUBY_VERSION")/bin:$PATH"
```

#### Fish (~/.config/fish/config.fish)
```fish
set -x PATH $HOME/.gem/ruby/(ruby -e "puts RUBY_VERSION")/bin $PATH
```

### Gem Configuration

Configure RubyGems for better experience:

```bash
# Skip documentation for faster installation
echo "gem: --no-document" > ~/.gemrc

# Configure gem sources (optional)
gem sources --clear-all
gem sources --add https://rubygems.org/
```

### Environment Variables

```bash
# Optional: Set custom config directory
export GEMKANBINO_CONFIG_DIR="$HOME/.config/gemkanbino"

# Optional: Set custom storage directory
export GEMKANBINO_STORAGE_DIR="$HOME/gemkanbino_storage"
```

## Configuration

### Initial Configuration

After installation, initialize the configuration:

```bash
# Create default configuration
gemkanbino config

# Set default upload provider
gemkanbino config default_provider fileio

# Set custom storage location
gemkanbino config storage.base_path "/path/to/storage"
```

### Configuration File Location

Default configuration file locations:
- **Linux/macOS**: `~/.gemkanbino/config.yml`
- **Windows**: `%USERPROFILE%\.gemkanbino\config.yml`

### Directory Structure

Gemkanbino creates the following directory structure:

```
~/.gemkanbino/
├── config.yml              # Main configuration
├── storage/               # Local file storage
│   └── index.json         # Storage index
└── upload_history.json    # Upload history
```

## Verification

### Basic Installation Test

```bash
# Check if gem is installed
gem list gemkanbino

# Check version
gemkanbino version

# Test basic functionality
gemkanbino pwd
gemkanbino ls
```

### Functionality Test

```bash
# Create test file
echo "Hello Gemkanbino!" > test_file.txt

# Test file operations
gemkanbino select test_file.txt
gemkanbino info test_file.txt

# Test local storage
gemkanbino copy test_file.txt --target test_backup
gemkanbino list

# Clean up
rm test_file.txt
```

### Dependency Test

```bash
# Test Ruby environment
ruby -v
bundle -v

# Test gem dependencies
gem which thor
gem which httparty
gem which pastel
```

### Troubleshooting Commands

```bash
# Check gem installation location
gem which gemkanbino
gem environment

# Check file permissions
ls -la $(which gemkanbino)

# Test Ruby loading
ruby -e "require 'gemkanbino'; puts 'Gemkanbino loaded successfully'"
```

## Troubleshooting

### Common Issues

#### 1. "command not found: gemkanbino"

**Problem:** Gem is installed but not in PATH.

**Solution:**
```bash
# Find gem installation path
gem environment gemdir

# Add gem executables to PATH
export PATH=$(gem environment gemdir)/../bin:$PATH

# Add permanently to shell profile
echo 'export PATH=$(gem environment gemdir)/../bin:$PATH' >> ~/.bashrc
```

#### 2. "Ruby version too old"

**Problem:** System Ruby version is below 3.2.0.

**Solution:**
```bash
# Install Ruby 3.2+ using rbenv
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
rbenv install 3.2.2
rbenv global 3.2.2
```

#### 3. Permission Denied

**Problem:** Can't install gems to system directories.

**Solution:**
```bash
# Install in user directory
gem install --user-install gemkanbino

# Or fix gem permissions (not recommended for security)
sudo chown -R $(whoami) $(gem environment gemdir)
```

#### 4. SSL Certificate Errors

**Problem:** Can't download gems due to SSL issues.

**Solution:**
```bash
# Update certificate store
# Ubuntu/Debian
sudo apt update && sudo apt install ca-certificates

# macOS
brew install ca-certificates

# Or temporarily disable SSL verification (not recommended)
gem install gemkanbino --source http://rubygems.org/
```

#### 5. Build Errors

**Problem:** Native extension compilation fails.

**Solution:**
```bash
# Install build tools
# Ubuntu/Debian
sudo apt install build-essential ruby-dev

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install ruby-devel

# macOS
xcode-select --install
```

#### 6. Network Issues

**Problem:** Can't reach RubyGems repository.

**Solution:**
```bash
# Check network connectivity
ping rubygems.org

# Use different gem source
gem sources --clear-all
gem sources --add https://rubygems.org/

# Or use proxy if behind corporate firewall
export http_proxy=http://proxy.company.com:8080
export https_proxy=http://proxy.company.com:8080
```

### Debug Mode

Enable verbose output for debugging:

```bash
# Verbose gem installation
gem install gemkanbino -V

# Debug gemkanbino loading
ruby -d -e "require 'gemkanbino'"

# Check gem dependencies
gem dependency gemkanbino
```

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/VictorHSCosta/kanbino/issues)
2. Verify your Ruby version: `ruby --version`
3. Check system requirements above
4. Try the troubleshooting steps

## Uninstallation

### Remove Gem

```bash
# Uninstall gem
gem uninstall gemkanbino

# Force remove all versions
gem uninstall gemkanbino --all

# Remove dependencies (careful)
gem cleanup gemkanbino
```

### Remove Configuration and Data

```bash
# Remove configuration directory
rm -rf ~/.gemkanbino

# On Windows
rmdir /s %USERPROFILE%\.gemkanbino
```

### Remove PATH Configuration

Remove the gem path from your shell profile:

```bash
# Edit ~/.bashrc, ~/.zshrc, or ~/.config/fish/config.fish
# Remove the line: export PATH="$HOME/.gem/ruby/.../bin:$PATH"
```

## Upgrade Guide

### Upgrading from Previous Versions

```bash
# Check current version
gemkanbino version

# Upgrade to latest
gem update gemkanbino

# Or install specific version
gem install gemkanbino -v 0.2.0
```

### Migration Notes

- Configuration files are compatible across versions
- Storage locations remain unchanged
- Upload history is preserved
- No manual migration required for patch versions

### Release Channels

- **Stable**: Released via RubyGems (recommended)
- **Development**: Install from Git repository
- **Beta**: Available as pre-release gems

```bash
# Install beta/preview versions
gem install gemkanbino --pre
```

---

For additional help or questions, please visit the [project repository](https://github.com/VictorHSCosta/kanbino) or [create an issue](https://github.com/VictorHSCosta/kanbino/issues).