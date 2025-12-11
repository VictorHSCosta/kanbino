# frozen_string_literal: true

module Gemkanbino
  # Class for handling git commit history operations
  class CommitHistory
    attr_reader :pastel

    def initialize(pastel = nil)
      @pastel = pastel || Pastel.new
    end

    # Get all commits with various formatting options
    def get_commits(options = {})
      validate_git_repository!

      command_options = extract_command_options(options)
      command = build_git_log_command(
        command_options[:limit],
        command_options[:oneline],
        command_options[:author],
        command_options[:since],
        command_options[:until_date],
        command_options[:format]
      )

      execute_git_command(command, command_options[:oneline])
    end

    # Get commit count
    def get_commit_count(options = {})
      validate_git_repository!

      command_options = extract_count_options(options)
      command = build_count_command(command_options)

      execute_count_command(command)
    end

    # Extract count options from hash
    def extract_count_options(options)
      {
        author: options[:author],
        since: options[:since],
        until_date: options[:until]
      }
    end

    # Build count command
    def build_count_command(options)
      command = "git rev-list --count HEAD"
      command += " --author=#{options[:author]}" if options[:author]
      command += " --since=#{options[:since]}" if options[:since]
      command += " --until=#{options[:until_date]}" if options[:until_date]
      command
    end

    # Execute count command
    def execute_count_command(command)
      begin
        result = `#{command}`
        unless $?.success?
          raise GitError, "Failed to count commits"
        end
        result.strip.to_i
      rescue => e
        raise GitError, "Error counting commits: #{e.message}"
      end
    end

    # Extract command options from hash
    def extract_command_options(options)
      {
        limit: options[:limit],
        oneline: options[:oneline] || false,
        author: options[:author],
        since: options[:since],
        until_date: options[:until],
        format: options[:format]
      }
    end

    # Execute git command and format output
    def execute_git_command(command, oneline)
      begin
        result = `#{command}`
        unless $?.success?
          raise GitError, "Failed to retrieve commit history"
        end

        format_output(result.strip, oneline)
      rescue => e
        raise GitError, "Error executing git command: #{e.message}"
      end
    end

    # Format oneline output
    def format_oneline_output(output)
      lines = output.split("\n")
      formatted_lines = lines.map do |line|
        commit_hash, message = line.split(" ", 2)
        "#{pastel.cyan(commit_hash)} #{message}" if commit_hash && message
      end.compact
      formatted_lines.join("\n")
    end

    # Format detailed output
    def format_detailed_output(output)
      lines = output.split("\n")
      formatted_lines = []

      lines.each do |line|
        if line =~ /^([0-9a-f]+)\s*-\s*(.+?)\s*\(([^)]+)\):\s*(.+)$/
          formatted_lines << format_commit_line($1, $2, $3, $4)
        else
          formatted_lines << line
        end
      end

      formatted_lines.join("\n")
    end

    # Format a single commit line
    def format_commit_line(commit_hash, author_info, date_info, message)
      pastel.cyan(commit_hash) + " - " +
        pastel.green(author_info) + " " +
        pastel.yellow("(#{date_info})") + ": " +
        message
    end

    # Check if current directory is a git repository
    def git_repository?
      system("git rev-parse --git-dir > /dev/null 2>&1")
    end

    private

    def validate_git_repository!
      unless git_repository?
        raise GitError, "Not a git repository. Please run this command in a git repository."
      end
    end

    def build_git_log_command(limit, oneline, author, since, until_date, format)
      command = "git log"

      command += " --oneline" if oneline
      command += " --author=#{author}" if author
      command += " --since=#{since}" if since
      command += " --until=#{until_date}" if until_date
      command += " -n #{limit}" if limit && limit > 0

      # Custom format
      if format
        case format
        when "short"
          command += " --format=\"%h %an %s\""
        when "full"
          command += " --format=\"%H %an <%ae> %ad %s%n%b\" --date=short"
        when "stat"
          command += " --stat"
        else
          command += " --format=\"#{format}\""
        end
      elsif !oneline
        # Default format for detailed view
        command += " --format=\"%h - %an (%ar): %s\""
      end

      command
    end

    def format_output(output, oneline)
      return "" if output.empty?

      if oneline
        format_oneline_output(output)
      else
        format_detailed_output(output)
      end
    end
  end
end