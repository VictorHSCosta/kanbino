# frozen_string_literal: true

require_relative "lib/gemkanbino/version"

Gem::Specification.new do |spec|
  spec.name = "gemkanbino"
  spec.version = Gemkanbino::VERSION
  spec.authors = ["VictorHSCosta"]
  spec.email = ["victorhenriquecosta23@gmail.com"]

  spec.summary = "A comprehensive CLI tool for file management, navigation, and cloud uploads"
  spec.description = "Gemkanbino is a powerful command-line interface tool that allows users to navigate the file system, select files, create local copies, and upload them to cloud services. Built with Ruby, it provides an intuitive way to manage files directly from your terminal."
  spec.homepage = "https://github.com/VictorHSCosta/kanbino"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.2.0"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage
  spec.metadata["changelog_uri"] = "#{spec.homepage}/blob/main/CHANGELOG.md"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  gemspec = File.basename(__FILE__)
  spec.files = IO.popen(%w[git ls-files -z], chdir: __dir__, err: IO::NULL) do |ls|
    ls.readlines("\x0", chomp: true).reject do |f|
      (f == gemspec) ||
        f.start_with?(*%w[bin/ Gemfile .gitignore .rspec spec/])
    end
  end
  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  # Runtime dependencies
  spec.add_dependency "thor", "~> 1.3"
  spec.add_dependency "httparty", "~> 0.21"
  spec.add_dependency "json", "~> 2.6"
  spec.add_dependency "pastel", "~> 0.8"
  spec.add_dependency "tty-progressbar", "~> 0.18"
  spec.add_dependency "tty-prompt", "~> 0.23"
  spec.add_dependency "filesize", "~> 0.2"
  spec.add_dependency "mime-types", "~> 3.4"

  # Development dependencies
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "rubocop", "~> 1.21"
  spec.add_development_dependency "factory_bot", "~> 6.2"

  # For more information and examples about making a new gem, check out our
  # guide at: https://bundler.io/guides/creating_gem.html
end
