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

      limit = options[:limit]
      oneline = options[:oneline] || false
      author = options[:author]
      since = options[:since]
      until_date = options[:until]
      format = options[:format]

      # Build git log command
      command = build_git_log_command(limit, oneline, author, since, until_date, format)

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

    # Get commit count
    def get_commit_count(options = {})
      validate_git_repository!

      author = options[:author]
      since = options[:since]
      until_date = options[:until]

      command = "git rev-list --count HEAD"
      command += " --author=#{author}" if author
      command += " --since=#{since}" if since
      command += " --until=#{until_date}" if until_date

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
          command += " --format='%h %an %s'"
        when "full"
          command += " --format='%H %an <%ae> %ad %s%n%b' --date=short"
        when "stat"
          command += " --stat"
        else
          command += " --format='#{format}'"
        end
      elsif !oneline
        # Default format for detailed view
        command += " --format='%h - %an (%ar): %s'"
      end

      command
    end

    def format_output(output, oneline)
      return "" if output.empty?

      if oneline
        lines = output.split("\n")
        formatted_lines = lines.map do |line|
          commit_hash, message = line.split(" ", 2)
          "#{pastel.cyan(commit_hash)} #{message}" if commit_hash && message
        end.compact
        formatted_lines.join("\n")
      else
        # Format detailed output
        lines = output.split("\n")
        formatted_lines = []

        lines.each do |line|
          if line =~ /^([0-9a-f]+)\s*-\s*(.+?)\s*\(([^)]+)\):\s*(.+)$/
            commit_hash = $1
            author_info = $2
            date_info = $3
            message = $4

            formatted_lines << pastel.cyan(commit_hash) + " - " +
                              pastel.green(author_info) + " " +
                              pastel.yellow("(#{date_info})") + ": " +
                              message
          else
            formatted_lines << line
          end
        end

        formatted_lines.join("\n")
      end
    end
  end
end