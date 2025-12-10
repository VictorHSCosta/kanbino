# frozen_string_literal: true

require "json"
require "fileutils"

module Gemkanbino
  module Uploader
    # Manages upload history and statistics
    module HistoryManager
      def save_upload_history(file_path, provider_name, result)
        history = load_upload_history

        entry = {
          "file_name" => File.basename(file_path),
          "file_path" => file_path,
          "file_size" => File.size(file_path),
          "provider" => provider_name,
          "url" => result[:url],
          "uploaded_at" => Time.now.iso8601,
          "expires_at" => result[:expires_at]
        }

        history.unshift(entry)
        history = history.first(100) # Keep only last 100 uploads

        save_upload_history_to_file(history)
      end

      def load_upload_history
        history_file = get_history_file_path

        if File.exist?(history_file)
          begin
            JSON.parse(File.read(history_file))
          rescue JSON::ParserError
            []
          end
        else
          []
        end
      end

      def save_upload_history_to_file(history)
        history_file = get_history_file_path
        FileUtils.mkdir_p(File.dirname(history_file))
        File.write(history_file, JSON.pretty_generate(history))
      end

      def get_history_file_path
        config_dir = File.join(Dir.home, ".gemkanbino")
        File.join(config_dir, "upload_history.json")
      end

      def get_upload_stats
        history = load_upload_history

        return { total_uploads: 0 } if history.empty?

        uploads_by_provider = Hash.new(0)
        total_size = 0

        history.each do |entry|
          uploads_by_provider[entry["provider"]] += 1
          total_size += entry["file_size"]
        end

        {
          total_uploads: history.length,
          total_size: total_size,
          total_size_formatted: format_size(total_size),
          uploads_by_provider: uploads_by_provider,
          most_recent_upload: history.first["uploaded_at"],
          oldest_upload: history.last["uploaded_at"]
        }
      end

      def show_upload_history(limit = 10)
        history = load_upload_history

        if history.empty?
          puts pastel.yellow("No upload history found.")
          return
        end

        puts pastel.cyan("📋 Recent Uploads (#{history.length} total):")
        puts "=" * 80

        history.first(limit).each_with_index do |entry, index|
          date = Date.parse(entry["uploaded_at"]).strftime("%Y-%m-%d %H:%M")
          size = format_size(entry["file_size"])

          puts "#{(index + 1).to_s.rjust(2)}. #{entry["file_name"].ljust(25)} #{entry["provider"].ljust(12)} #{size.rjust(8)} #{date}"
          puts "     #{pastel.dim(entry["url"])}" if entry["url"]
        end

        puts "=" * 80
      end

      def show_upload_stats
        stats = get_upload_stats

        puts pastel.cyan("📊 Upload Statistics:")
        puts "=" * 40
        puts pastel.bold("Total Uploads:") + " #{stats[:total_uploads]}"
        puts pastel.bold("Total Size:") + " #{stats[:total_size_formatted]}" if stats[:total_size] > 0

        if stats[:uploads_by_provider].any?
          puts pastel.bold("By Provider:")
          stats[:uploads_by_provider].each do |provider, count|
            puts "  #{provider}: #{count}"
          end
        end

        if stats[:most_recent_upload]
          puts pastel.bold("Recent Upload:") + " #{Date.parse(stats[:most_recent_upload]).strftime('%Y-%m-%d')}"
        end

        puts "=" * 40
      end
    end
  end
end