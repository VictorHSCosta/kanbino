# frozen_string_literal: true

require "bundler/gem_tasks"
require "rspec/core/rake_task"
require "rubocop/rake_task"

RSpec::Core::RakeTask.new(:spec)
RuboCop::RakeTask.new

# Define a test task that runs both tests and linting
desc "Run tests and linting"
task test: [:spec, :rubocop]

# Default task runs both tests and linting
task default: :test
