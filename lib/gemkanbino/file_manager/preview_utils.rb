# frozen_string_literal: true

module Gemkanbino
  module FileManager
    # Preview functionality for different file types
    module PreviewUtils
      def preview_text_file(file_path, lines)
        puts pastel.cyan("\n📖 Preview: #{File.basename(file_path)}")
        puts "-" * 50

        file_lines = File.readlines(file_path, encoding: "UTF-8")
        total_lines = file_lines.length
        preview_lines = [lines, total_lines].min

        puts pastel.dim("Showing #{preview_lines} of #{total_lines} lines:")
        puts

        file_lines.first(preview_lines).each_with_index do |line, index|
          line_num = (index + 1).to_s.rjust(4)
          content = line.chomp
          puts pastel.dim(line_num + ":") + " " + content
        end

        if total_lines > lines
          puts pastel.dim("\n... (#{total_lines - lines} more lines)")
        end

        puts "-" * 50
      end

      def preview_image_file(file_path)
        puts pastel.cyan("\n🖼️ Image Information:")
        puts "-" * 50
        puts pastel.bold("File:") + " " + File.basename(file_path)
        puts pastel.bold("Path:") + " " + file_path
        puts pastel.bold("Size:") + " " + format_file_size(File.size(file_path))
        puts pastel.bold("Type:") + " " + get_content_type(file_path) || "Unknown"
        puts pastel.yellow("Image preview not available in terminal mode")
        puts "-" * 50
      end

      def display_file_info(file_path, stat)
        puts pastel.cyan("\n📄 File Information:")
        puts "=" * 50
        puts pastel.bold("Name:") + " " + File.basename(file_path)
        puts pastel.bold("Path:") + " " + file_path
        puts pastel.bold("Size:") + " " + format_file_size(stat.size)
        puts pastel.bold("Type:") + " " + get_content_description(file_path)
        puts pastel.bold("Permissions:") + " " + format_permissions(stat.mode)
        puts pastel.bold("Created:") + " " + stat.ctime.strftime("%Y-%m-%d %H:%M:%S")
        puts pastel.bold("Modified:") + " " + stat.mtime.strftime("%Y-%m-%d %H:%M:%S")
        puts pastel.bold("Accessed:") + " " + stat.atime.strftime("%Y-%m-%d %H:%M:%S")

        if File.size(file_path) < 1_000_000 # Less than 1MB
          md5 = calculate_file_hash(file_path, "MD5")
          puts pastel.bold("MD5:") + " " + md5
        end

        puts "=" * 50
      end
    end
  end
end