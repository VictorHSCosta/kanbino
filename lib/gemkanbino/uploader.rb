# frozen_string_literal: true

require "httparty"
require "json"
require "pastel"
require "tty/prompt"
require "tty/progressbar"

module Gemkanbino
  # Handles file uploads to various cloud services
  class Uploader
    attr_reader :pastel, :prompt

    def initialize
      @pastel = Pastel.new
      @prompt = TTY::Prompt.new
    end

    def upload_file(file_path, provider_name = nil)
      file_path = File.expand_path(file_path)

      # Validate file exists and is readable
      unless File.exist?(file_path)
        raise "File does not exist: #{file_path}"
      end

      unless File.readable?(file_path)
        raise "File is not readable: #{file_path}"
      end

      # Get provider
      provider = get_provider(provider_name)
      provider_name ||= provider.name

      puts pastel.cyan("📤 Uploading file to #{provider_name}...")
      puts pastel.dim("File: #{File.basename(file_path)}")
      puts pastel.dim("Size: #{format_file_size(File.size(file_path))}")

      begin
        # Show progress bar
        progress = create_progress_bar

        # Upload file
        result = provider.upload(file_path, &progress_block(progress))

        # Handle result
        if result[:success]
          display_upload_result(result, provider_name)
          save_upload_history(file_path, provider_name, result)
          result[:url]
        else
          display_upload_error(result, provider_name)
          nil
        end
      rescue => e
        puts pastel.red("❌ Upload failed: #{e.message}")
        nil
      end
    end

    def upload_selected_file(provider_name = nil)
      manager = FileManager.new
      current_file = manager.current_selection

      if current_file.nil?
        puts pastel.yellow("No file selected. Use 'select <file>' first.")
        return false
      end

      upload_file(current_file, provider_name)
    end

    def upload_multiple_files(file_paths, provider_name = nil)
      provider = get_provider(provider_name)
      provider_name ||= provider.name

      results = []
      total_files = file_paths.length

      puts pastel.cyan("📤 Uploading #{total_files} files to #{provider_name}...")

      file_paths.each_with_index do |file_path, index|
        puts "\n" + pastel.dim("File #{index + 1}/#{total_files}")

        result = upload_file(file_path, provider_name)
        results << { file: file_path, url: result }

        # Small delay between uploads to avoid rate limiting
        sleep(1) if index < total_files - 1
      end

      display_multiple_upload_results(results, provider_name)
      results
    end

    def list_providers
      puts pastel.cyan("🌐 Available Upload Providers:")
      puts "=" * 50

      providers.each do |provider|
        status = provider.available? ? pastel.green("✓") : pastel.red("✗")
        puts "#{status} #{provider.name.ljust(15)} #{provider.description}"
      end

      puts "=" * 50
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

    def test_provider(provider_name)
      provider = get_provider(provider_name)

      puts pastel.cyan("🧪 Testing provider: #{provider.name}")

      if provider.test_connection
        puts pastel.green("✓ Provider is working correctly")
        true
      else
        puts pastel.red("✗ Provider test failed")
        false
      end
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

    private

    def providers
      [
        UploadProviders::FileIO.new,
        UploadProviders::TransferSh.new
      ]
    end

    def get_provider(name)
      if name.nil?
        # Let user choose
        choices = providers.map do |provider|
          {
            name: provider.name,
            value: provider.class.name.split("::").last.downcase
          }
        end

        provider_name = @prompt.select("Choose upload provider:", choices)
        find_provider_by_name(provider_name)
      else
        find_provider_by_name(name.downcase)
      end
    end

    def find_provider_by_name(name)
      provider = providers.find { |p| p.name.downcase == name || p.class.name.split("::").last.downcase == name }

      if provider.nil?
        puts pastel.red("Unknown provider: #{name}")
        puts "Available providers: #{providers.map(&:name).join(', ')}"
        raise "Unknown provider: #{name}"
      end

      provider
    end

    def create_progress_bar
      bar = TTY::ProgressBar.new("Uploading [:bar] :percent", total: 100, width: 40)
      bar
    end

    def progress_block(bar)
      proc { |progress| bar.progress = progress * 100 }
    end

    def display_upload_result(result, provider_name)
      puts pastel.green("✓ Upload successful!")
      puts pastel.cyan("🔗 URL: #{result[:url]}")

      if result[:expires_at]
        puts pastel.yellow("⏰ Expires: #{result[:expires_at]}")
      end

      if result[:delete_url]
        puts pastel.dim("🗑️ Delete URL: #{result[:delete_url]}")
      end

      puts pastel.dim("💡 URL copied to clipboard (if clipboard is available)")

      # Try to copy to clipboard
      copy_to_clipboard(result[:url])
    end

    def display_upload_error(result, provider_name)
      puts pastel.red("❌ Upload failed!")
      puts pastel.red("Error: #{result[:error]}")

      if result[:details]
        puts pastel.dim("Details: #{result[:details]}")
      end
    end

    def display_multiple_upload_results(results, provider_name)
      successful = results.count { |r| r[:url] }
      failed = results.count { |r| !r[:url] }

      puts "\n" + pastel.cyan("📊 Upload Summary:")
      puts "=" * 40
      puts pastel.green("✓ Successful: #{successful}")
      puts pastel.red("✗ Failed: #{failed}")

      if successful > 0
        puts "\n" + pastel.cyan("🔗 Upload URLs:")
        results.each do |result|
          if result[:url]
            puts pastel.green("✓") + " #{File.basename(result[:file])}: #{result[:url]}"
          else
            puts pastel.red("✗") + " #{File.basename(result[:file])}: Failed"
          end
        end
      end

      puts "=" * 40
    end

    def copy_to_clipboard(text)
      begin
        # Try different clipboard methods
        if system("which pbcopy > /dev/null 2>&1")
          # macOS
          system("echo '#{text}' | pbcopy")
        elsif system("which xclip > /dev/null 2>&1")
          # Linux with xclip
          system("echo '#{text}' | xclip -selection clipboard")
        elsif system("which clip.exe > /dev/null 2>&1")
          # Windows
          system("echo '#{text}' | clip.exe")
        end
      rescue
        # Clipboard not available, ignore
      end
    end

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

      save_upload_history(history)
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

    def save_upload_history(history)
      history_file = get_history_file_path
      FileUtils.mkdir_p(File.dirname(history_file))
      File.write(history_file, JSON.pretty_generate(history))
    end

    def get_history_file_path
      config_dir = File.join(Dir.home, ".gemkanbino")
      File.join(config_dir, "upload_history.json")
    end

    def format_size(bytes)
      require "filesize"
      Filesize.new(bytes).pretty
    rescue
      "#{bytes}B"
    end
  end
end