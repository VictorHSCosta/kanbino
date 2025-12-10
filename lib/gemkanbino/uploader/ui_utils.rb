# frozen_string_literal: true

require "tty/progressbar"

module Gemkanbino
  module Uploader
    # UI utilities for upload operations
    module UiUtils
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

      def format_size(bytes)
        require "filesize"
        Filesize.new(bytes).pretty
      rescue
        "#{bytes}B"
      end
    end
  end
end