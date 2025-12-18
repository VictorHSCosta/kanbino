# frozen_string_literal: true

module Gemkanbino
  module Formatters
    # Formatting utilities for story display
    class StoryFormatter
      attr_reader :pastel

      def initialize
        @pastel = Pastel.new
      end

      def format_story_list(stories, format = "detailed")
        case format.to_s.downcase
        when "compact"
          format_compact_list(stories)
        when "detailed"
          format_detailed_list(stories)
        when "full"
          format_full_list(stories)
        else
          format_detailed_list(stories)
        end
      end

      def format_story_preview(story_data, lines = 20)
        metadata = story_data[:metadata]
        first_chapter = story_data[:chapters].first

        output = []
        output << pastel.cyan("📖 #{metadata['title']}")
        output << "=" * 50

        # Basic info
        output << pastel.bold("Template:") + " #{metadata['template']}"
        output << pastel.bold("Created:") + " #{format_date(metadata['created_at'])}"
        output << pastel.bold("Chapters:") + " #{metadata['chapters']}"
        output << pastel.bold("Words:") + " #{format_number(metadata['word_count'])}"

        # Characters
        if metadata['characters'] && !metadata['characters'].empty?
          output << pastel.bold("Characters:") + " #{metadata['characters'].join(', ')}"
        end

        output << ""

        # First chapter preview
        if first_chapter
          output << pastel.bold("Chapter 1: #{first_chapter[:title]}")
          output << "-" * 30

          content_lines = first_chapter[:content].split("\n")
          preview_lines = content_lines.first(lines)

          preview_lines.each_with_index do |line, index|
            line_num = (index + 1).to_s.rjust(3)
            output << pastel.dim(line_num + ":") + " #{line}"
          end

          if content_lines.length > lines
            output << pastel.dim("... (#{content_lines.length - lines} more lines)")
          end
        end

        output << "=" * 50
        output.join("\n")
      end

      def format_story_summary(story_data)
        metadata = story_data[:metadata]

        summary = []
        summary << pastel.bold("Title:") + " #{metadata['title']}"
        summary << pastel.bold("Template:") + " #{metadata['template']}"
        summary << pastel.bold("Created:") + " #{format_date(metadata['created_at'])}"
        summary << pastel.bold("Chapters:") + " #{metadata['chapters']}"
        summary << pastel.bold("Word Count:") + " #{format_number(metadata['word_count'])}"

        if metadata['characters'] && !metadata['characters'].empty?
          summary << pastel.bold("Characters:") + " #{metadata['characters'].join(', ')}"
        end

        if metadata['genres'] && !metadata['genres'].empty?
          summary << pastel.bold("Genres:") + " #{metadata['genres'].join(', ')}"
        end

        if metadata['tags'] && !metadata['tags'].empty?
          summary << pastel.bold("Tags:") + " #{metadata['tags'].join(', ')}"
        end

        summary.join("\n")
      end

      def format_search_results(results, query)
        output = []
        output << pastel.cyan("🔍 Search Results for '#{query}' (#{results.length}):")
        output << "=" * 80

        results.each do |result|
          output << format_search_result_item(result)
        end

        output << "=" * 80
        output.join("\n")
      end

      def format_template_list(templates)
        output = []
        output << pastel.cyan("📋 Available Templates:")
        output << "=" * 50

        templates.each do |name, description|
          output << pastel.bold(name.ljust(30)) + " #{description}"
        end

        output << "=" * 50
        output.join("\n")
      end

      def format_storage_stats(stats)
        output = []
        output << pastel.cyan("📊 Story Storage Statistics:")
        output << "=" * 40

        output << pastel.bold("Total Stories:") + " #{stats[:total_stories]}"
        output << pastel.bold("Total Words:") + " #{format_number(stats[:total_words])}"
        output << pastel.bold("Total Chapters:") + " #{stats[:total_chapters]}"
        output << pastel.bold("Storage Location:") + " #{stats[:storage_location]}"

        if stats[:oldest_story]
          output << pastel.bold("Oldest Story:") + " #{format_date(stats[:oldest_story])}"
          output << pastel.bold("Newest Story:") + " #{format_date(stats[:newest_story])}"
        end

        if stats[:templates] && !stats[:templates].empty?
          output << pastel.bold("Templates Used:")
          stats[:templates].each do |template, count|
            output << "  • #{template}: #{count}"
          end
        end

        if stats[:index_size]
          output << pastel.bold("Index Size:") + " #{format_file_size(stats[:index_size])}"
        end

        output << "=" * 40
        output.join("\n")
      end

      def format_chapter_list(chapters)
        output = []
        output << pastel.cyan("📚 Chapters:")
        output << "-" * 30

        chapters.each_with_index do |chapter, index|
          word_count = chapter[:content].split.length
          output << "#{index + 1}. #{pastel.bold(chapter[:title])} (#{format_number(word_count)} words)"
        end

        output << "-" * 30
        output.join("\n")
      end

      def format_story_progress(story_data)
        metadata = story_data[:metadata]
        chapters = story_data[:chapters]

        output = []
        output << pastel.cyan("📈 Story Progress:")
        output << "-" * 30

        # Progress bar based on template expectations
        expected_chapters = get_expected_chapters_for_template(metadata['template'])
        progress = [chapters.length.to_f / expected_chapters, 1.0].min

        output << "Chapters: #{chapters.length} / #{expected_chapters}"
        output << format_progress_bar(progress, 20)

        # Word count progress
        expected_words = get_expected_words_for_template(metadata['template'])
        word_progress = [metadata['word_count'].to_f / expected_words, 1.0].min

        output << "Words: #{format_number(metadata['word_count'])} / #{format_number(expected_words)}"
        output << format_progress_bar(word_progress, 20)

        output << "-" * 30
        output.join("\n")
      end

      private

      def format_compact_list(stories)
        output = []
        output << pastel.cyan("📚 Stories (#{stories.length}):")
        output << "-" * 80

        stories.each do |story|
          metadata = story[:metadata]
          date_str = Date.parse(metadata["created_at"]).strftime("%m-%d")
          status = story[:exists] ? pastel.green("✓") : pastel.red("✗")

          line = "#{status} #{metadata["title"].ljust(25)} #{date_str} #{format_number(metadata["word_count"] || 0)}w"
          output << line
        end

        output << "-" * 80
        output.join("\n")
      end

      def format_detailed_list(stories)
        output = []
        output << pastel.cyan("📚 Stories (#{stories.length}):")
        output << "=" * 80

        stories.each do |story|
          metadata = story[:metadata]
          date_str = Date.parse(metadata["created_at"]).strftime("%Y-%m-%d")

          status = story[:exists] ? pastel.green("✓") : pastel.red("✗")
          chapters = metadata["chapters"] || 0
          word_count = metadata["word_count"] || 0

          puts_line = "#{status} #{metadata["title"].ljust(25)} #{metadata["template"].ljust(20)} #{chapters.to_s.rjust(3)}ch #{format_number(word_count).rjust(8)}w #{date_str}"
          output << puts_line
        end

        output << "=" * 80
        output.join("\n")
      end

      def format_full_list(stories)
        output = []
        output << pastel.cyan("📚 Stories (#{stories.length}):")
        output << "=" * 80

        stories.each do |story|
          metadata = story[:metadata]
          status = story[:exists] ? pastel.green("✓") : pastel.red("✗")

          output << status + " " + pastel.bold(metadata["title"])
          output << "  Template: #{metadata["template"]}"
          output << "  Created: #{format_date(metadata["created_at"])}"

          if metadata["characters"] && !metadata["characters"].empty?
            output << "  Characters: #{metadata["characters"].join(", ")}"
          end

          if metadata["genres"] && !metadata["genres"].empty?
            output << "  Genres: #{metadata["genres"].join(", ")}"
          end

          output << "  Stats: #{metadata["chapters"]} chapters, #{format_number(metadata["word_count"])} words"
          output << ""
        end

        output << "=" * 80
        output.join("\n")
      end

      def format_search_result_item(result)
        metadata = result[:metadata]
        matches = result[:matches]
        status = result[:exists] ? pastel.green("✓") : pastel.red("✗")

        # Match indicators
        match_indicators = matches.map { |match| match[0].upcase }.join(",")

        line = "#{status} #{metadata['title'].ljust(25)} [#{match_indicators}] #{format_date(metadata['created_at'])}"
        line += " (#{matches.join(', ')})" if matches.length > 1

        line
      end

      def format_date(date_string)
        Date.parse(date_string).strftime("%Y-%m-%d %H:%M")
      rescue
        date_string
      end

      def format_number(number)
        number.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse
      end

      def format_file_size(bytes)
        require "filesize"
        Filesize.new(bytes).pretty
      rescue
        "#{bytes}B"
      end

      def format_progress_bar(progress, width)
        filled = (progress * width).round
        empty = width - filled

        bar = pastel.green("█" * filled) + pastel.dim("░" * empty)
        percentage = (progress * 100).round

        "#{bar} #{percentage}%"
      end

      def get_expected_chapters_for_template(template_name)
        case template_name
        when "guerra_irmaos_planetas"
          5
        else
          10  # Default expectation
        end
      end

      def get_expected_words_for_template(template_name)
        case template_name
        when "guerra_irmaos_planetas"
          5000
        else
          10000  # Default expectation
        end
      end
    end
  end
end