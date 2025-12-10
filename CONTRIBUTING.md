# Contributing to Gemkanbino

Thank you for your interest in contributing to Gemkanbino! This guide will help you get started with contributing to our comprehensive CLI tool for file management and cloud uploads.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Code Style and Standards](#code-style-and-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Standards](#documentation-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Release Process](#release-process)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

Before you start contributing, make sure you have:

- **Ruby 3.2.0 or higher**
- **Git** for version control
- **Basic knowledge of Ruby programming**
- **Familiarity with command-line tools**
- **Understanding of CLI application development**

### System Requirements

Check that you have the required versions:

```bash
# Check Ruby version
ruby --version  # Should be 3.2.0+

# Check Git version
git --version

# Check for essential tools
which bundle rake rubocop rspec
```

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork locally
git clone https://github.com/YOUR_USERNAME/kanbino.git
cd kanbino

# Add upstream remote
git remote add upstream https://github.com/VictorHSCosta/kanbino.git
```

### 2. Install Dependencies

```bash
# Install gem dependencies
bundle install

# Verify installation
bundle exec rake -T
```

### 3. Development Tools

Install and configure development tools:

```bash
# Install RuboCop for code style checking
bundle exec rubocop --version

# Install RSpec for testing
bundle exec rspec --version

# Install gem for local development
bundle exec rake install
```

### 4. Environment Setup

```bash
# Create development configuration
mkdir -p ~/.gemkanbino_dev
echo "export GEMKANBINO_CONFIG_DIR=$PWD/test_config" >> ~/.bashrc
source ~/.bashrc
```

### 5. Verify Setup

```bash
# Run the test suite
bundle exec rake spec

# Check code style
bundle exec rubocop

# Test local installation
gemkanbino version
```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 Bug Fixes
- Fix reported issues
- Improve error handling
- Resolve edge cases

#### ✨ New Features
- Add new CLI commands
- Implement new upload providers
- Enhance existing functionality

#### 📚 Documentation
- Improve existing documentation
- Add examples and tutorials
- Translate documentation to other languages

#### 🧪 Testing
- Write comprehensive tests
- Improve test coverage
- Add integration tests

#### 🎨 User Experience
- Improve CLI interface
- Better error messages
- Enhanced user feedback

#### 🔧 Maintenance
- Dependency updates
- Performance improvements
- Code refactoring

### Finding Good First Issues

Look for issues labeled:
- `good first issue` - Great for newcomers
- `help wanted` - Community contributions welcome
- `documentation` - Documentation improvements needed

### Choosing What to Work On

1. **Check existing issues** before creating new ones
2. **Comment on issues** you plan to work on
3. **Start small** with bug fixes or documentation
4. **Ask questions** if anything is unclear

## Code Style and Standards

### Ruby Style Guidelines

We follow Ruby community standards with some project-specific rules:

#### General Style
- Use **2 spaces** for indentation (no tabs)
- Maximum **120 characters** per line
- Use **snake_case** for variables and methods
- Use **CamelCase** for classes and modules
- Use **SCREAMING_SNAKE_CASE** for constants

#### Method Definitions
```ruby
# Good
def process_file(file_path, options = {})
  # Method body
end

# Bad
def processFile(filePath, opts={})
  # Method body
end
```

#### Class and Module Structure
```ruby
module Gemkanbino
  class FileManager
    # Constants first
    DEFAULT_TIMEOUT = 30

    # Class methods
    def self.default_config
      # Implementation
    end

    # Public instance methods
    def initialize
      # Implementation
    end

    # Protected methods
    protected

    def internal_method
      # Implementation
    end

    # Private methods
    private

    def helper_method
      # Implementation
    end
  end
end
```

#### Error Handling
```ruby
# Good
def upload_file(file_path)
  raise Gemkanbino::Exceptions::FileError, "File not found" unless File.exist?(file_path)

  begin
    # Upload logic
  rescue => e
    raise Gemkanbino::Exceptions::UploadError, "Upload failed: #{e.message}"
  end
end

# Bad - Avoid generic rescue
def upload_file(file_path)
  begin
    # Upload logic
  rescue
    # Swallowing all errors
  end
end
```

#### Comments and Documentation
```ruby
class FileManager
  # Selects a file for subsequent operations
  #
  # @param file_path [String] Path to the file to select
  # @return [Boolean] true if file selected successfully, false otherwise
  # @raise [FileError] if file doesn't exist or isn't readable
  #
  # @example Select a file
  #   manager = FileManager.new
  #   manager.select_file("/path/to/file.txt") #=> true
  def select_file(file_path)
    # Implementation
  end
end
```

### RuboCop Configuration

We use RuboCop for automated style checking. Run it before committing:

```bash
# Check all files
bundle exec rubocop

# Check specific files
bundle exec rubocop lib/gemkanbino/file_manager.rb

# Auto-fix offenses
bundle exec rubocop -a
```

### Code Review Checklist

Before submitting a pull request, ensure:

- [ ] Code follows project style guidelines
- [ ] RuboCop passes without violations
- [ ] All tests pass
- [ ] New code is tested
- [ ] Documentation is updated
- [ ] No sensitive information is committed
- [ ] Error handling is appropriate

## Testing Guidelines

### Testing Framework

We use **RSpec** for testing with the following structure:

```
spec/
├── spec_helper.rb           # Test configuration
├── support/                 # Support files and helpers
├── factories/               # Test data factories
├── gemkanbino/              # Unit tests
│   ├── file_manager_spec.rb
│   ├── file_navigator_spec.rb
│   └── ...
└── integration/             # Integration tests
    └── cli_spec.rb
```

### Writing Tests

#### Unit Tests
```ruby
# spec/gemkanbino/file_manager_spec.rb
RSpec.describe Gemkanbino::FileManager do
  let(:manager) { described_class.new }
  let(:test_file) { "/tmp/test_file.txt" }

  before do
    File.write(test_file, "test content")
  end

  after do
    File.delete(test_file) if File.exist?(test_file)
  end

  describe "#select_file" do
    context "with valid file" do
      it "selects the file successfully" do
        expect(manager.select_file(test_file)).to be true
        expect(manager.current_selection).to eq(test_file)
      end
    end

    context "with non-existent file" do
      it "returns false and shows error" do
        expect(manager.select_file("/non/existent/file.txt")).to be false
      end
    end
  end
end
```

#### Integration Tests
```ruby
# spec/integration/cli_spec.rb
RSpec.describe "CLI Integration" do
  let(:cli) { Gemkanbino::CLI.new }

  describe "file operations" do
    it "can select and copy a file" do
      test_file = create_test_file
      expect(cli.select(test_file)).to be_successful
      expect(cli.copy).to be_successful
    end
  end
end
```

### Test Coverage

- Aim for **90%+ code coverage**
- Test all public methods
- Test edge cases and error conditions
- Test error handling paths

### Running Tests

```bash
# Run all tests
bundle exec rspec

# Run with coverage report
bundle exec rspec --format documentation

# Run specific test file
bundle exec rspec spec/gemkanbino/file_manager_spec.rb

# Run tests for specific context
bundle exec rspec -e "select_file"

# Run tests with line numbers
bundle exec rspec spec/gemkanbino/file_manager_spec.rb:42
```

### Test Data Management

Use **Factory Bot** for test data:

```ruby
# spec/factories/gemkanbino.rb
FactoryBot.define do
  factory :test_file, class: String do
    initialize_with { "/tmp/test_#{SecureRandom.hex(4)}.txt" }

    after(:build) do |path|
      File.write(path, "test content") unless File.exist?(path)
    end

    after(:destroy) do |path|
      File.delete(path) if File.exist?(path)
    end
  end
end
```

## Documentation Standards

### Inline Documentation

Follow **YARD** documentation standards:

```ruby
# Uploads a file to the specified provider
#
# @param file_path [String] The path to the file to upload
# @param provider_name [String, nil] The upload provider to use
# @option provider_name [String] :fileio Upload to File.io service
# @option provider_name [String] :transfersh Upload to Transfer.sh service
# @return [String, nil] The upload URL or nil if failed
# @raise [FileError] if file doesn't exist
# @raise [UploadError] if upload fails
#
# @example Upload to file.io
#   uploader = Uploader.new
#   uploader.upload_file("/path/to/file.txt", "fileio") #=> "https://file.io/d/..."
#
# @example Upload to default provider
#   uploader.upload_file("/path/to/file.txt") #=> "https://..."
def upload_file(file_path, provider_name = nil)
  # Implementation
end
```

### README and Documentation Files

- Use **Markdown** format
- Include **code examples** with syntax highlighting
- Provide **step-by-step instructions**
- Use **consistent formatting** across files
- Include **table of contents** for long documents

### API Documentation

- Document all public methods
- Include parameter types and return values
- Provide usage examples
- Document edge cases and exceptions

## Pull Request Process

### 1. Create a Branch

```bash
# Create feature branch from main
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-number-description
```

### 2. Make Changes

- Follow coding standards
- Write tests for new functionality
- Update documentation
- Keep commits focused and small

### 3. Commit Messages

Follow **Conventional Commits** format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks

**Examples:**
```
feat(upload): add support for custom upload providers

Add new provider interface to allow users to implement
their own upload services.

Fixes #123
```

```
fix(file-manager): handle nil file paths gracefully

Prevents crashes when nil file paths are passed to
file operations.
```

### 4. Before Submitting

```bash
# Run full test suite
bundle exec rake test

# Check code style
bundle exec rubocop

# Build documentation (if applicable)
bundle exec rake docs

# Install local version for testing
bundle exec rake install
gemkanbino version
```

### 5. Create Pull Request

#### PR Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of the code
- [ ] Code is properly documented
- [ ] Documentation updated if necessary
- [ ] No sensitive information committed

## Related Issues
Closes #123, Fixes #456
```

#### Pull Request Guidelines

- **One feature/fix per PR** when possible
- **Clear, descriptive title**
- **Detailed description** of changes
- **Link to related issues**
- **Include screenshots** for UI changes
- **Add test cases** for new functionality

### 6. Code Review Process

- Be **responsive** to review comments
- **Address all feedback** before requesting merge
- **Keep discussions focused** and technical
- **Thank reviewers** for their time

## Issue Reporting

### Bug Reports

Use the **Bug Report** template and include:

#### Environment Information
- Operating system and version
- Ruby version (`ruby -v`)
- Gemkanbino version (`gemkanbino version`)
- Other relevant software versions

#### Steps to Reproduce
1. Clear, numbered steps
2. Include exact commands used
3. Show expected vs actual behavior
4. Include error messages and backtraces

#### Minimal Reproducible Example
```ruby
# Ruby code to reproduce the issue
require 'gemkanbino'

manager = Gemkanbino::FileManager.new
manager.select_file('/path/to/file')
# Error occurs here
```

### Feature Requests

Use the **Feature Request** template and include:

#### Problem Description
- What problem are you trying to solve?
- Why is this feature needed?
- What's the current workaround?

#### Proposed Solution
- Detailed description of the feature
- How it would work
- Examples of usage

#### Alternatives Considered
- Other approaches you've thought about
- Why your preferred solution is better

### Enhancement Reports

For improvements to existing features:

#### Current Behavior
- How the feature currently works
- Limitations or issues with current implementation

#### Desired Behavior
- How you'd like it to work
- Specific improvements needed

#### Use Cases
- Real-world scenarios where this would help
- Benefits to users

## Release Process

### Version Management

We follow **Semantic Versioning** (SemVer):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

#### Preparation
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version number updated in `version.rb`
- [ ] Release notes prepared

#### Release Process
```bash
# Update version number
# lib/gemkanbino/version.rb
module Gemkanbino
  VERSION = "0.2.0"
end

# Update changelog
# CHANGELOG.md

# Commit changes
git add .
git commit -m "chore: prepare for v0.2.0 release"

# Create tag
git tag -a v0.2.0 -m "Release v0.2.0"

# Push to GitHub
git push upstream main
git push upstream v0.2.0

# Build and publish gem
gem build gemkanbino.gemspec
gem push gemkanbino-0.2.0.gem
```

#### Post-Release
- [ ] Create GitHub release
- [ ] Update documentation website
- [ ] Announce release in relevant channels
- [ ] Close related issues

## Community Guidelines

### Communication Channels

- **GitHub Issues**: For bugs, features, and questions
- **GitHub Discussions**: For general discussion and ideas
- **Email**: victorhenriquecosta23@gmail.com (for sensitive issues)

### Code of Conduct

- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- Be respectful and inclusive
- Assume good intentions
- Help others learn and grow

### Getting Help

- **Search existing issues** before creating new ones
- **Use appropriate labels** for issues
- **Provide context** when asking for help
- **Be patient** with volunteer maintainers

### Recognition

We recognize and appreciate all contributions:

- **Contributors section** in README
- **Release notes** mentioning contributors
- **GitHub statistics** tracking contributions
- **Special recognition** for significant contributions

## Development Tools and Scripts

### Rake Tasks

```bash
# List all available tasks
bundle exec rake -T

# Common tasks
bundle exec rake spec          # Run tests
bundle exec rake rubocop       # Check code style
bundle exec rake test          # Run tests and style checks
bundle exec rake install       # Install gem locally
bundle exec rake build         # Build gem package
```

### Development Scripts

```bash
# Setup development environment
bin/setup

# Start interactive console
bin/console

# Run development server (if applicable)
bin/dev
```

### Continuous Integration

We use GitHub Actions for CI/CD:

- **Test matrix** across multiple Ruby versions
- **Code quality** checks with RuboCop
- **Security scanning** for dependencies
- **Automated releases** on merge to main

## Tips and Best Practices

### Development Workflow

1. **Keep main clean** - only merge tested code
2. **Feature branches** - work in isolated branches
3. **Small commits** - keep changes focused
4. **Test early** - write tests as you code
5. **Document as you go** - keep documentation current

### Performance Considerations

- **Profile code** for performance bottlenecks
- **Optimize file operations** - handle large files efficiently
- **Memory management** - be mindful of memory usage
- **Network operations** - handle network timeouts and retries

### Security Considerations

- **Input validation** - sanitize all user inputs
- **File paths** - handle path traversal attacks
- **Secrets management** - never commit secrets
- **Dependency scanning** - keep dependencies updated

---

Thank you for contributing to Gemkanbino! Your help makes this project better for everyone. If you have any questions about contributing, don't hesitate to ask in an issue or discussion.

🚀 Happy coding!