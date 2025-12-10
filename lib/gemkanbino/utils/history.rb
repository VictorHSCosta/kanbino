# frozen_string_literal: true

module Gemkanbino
  module Utils
    module History
      def self.initialize
        history_dir = File.join(Dir.home, '.kanbino')
        @history_file = File.join(history_dir, 'history.log')

        Dir.mkdir(history_dir) unless Dir.exist?(history_dir)

        File.write(@history_file, '') unless File.exist?(@history_file)
      end

      def self.add_entry(entry_type, message, metadata = {})
        initialize unless @history_file

        timestamp = Time.now.strftime('%Y-%m-%d %H:%M:%S')
        log_entry = {
          timestamp: timestamp,
          type: entry_type,
          message: message,
          metadata: metadata
        }

        File.open(@history_file, 'a') do |file|
          file.puts("#{timestamp} [#{entry_type.upcase}] #{message}")
          metadata.each { |k, v| file.puts("  #{k}: #{v}") }
          file.puts
        end
      end

      def self.get_history(limit = 50)
        initialize unless @history_file

        return [] unless File.exist?(@history_file)

        lines = File.readlines(@history_file)
        entries = []
        current_entry = {}

        lines.each do |line|
          line = line.strip
          next if line.empty?

          if line.match?(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
            entries << current_entry if current_entry.any?

            match = line.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] (.*)$/)
            if match
              current_entry = {
                timestamp: match[1],
                type: match[2],
                message: match[3],
                metadata: {}
              }
            end
          elsif line.start_with?('  ')
            key_value = line[2..].split(': ')
            current_entry[:metadata][key_value[0]] = key_value[1] if key_value.size == 2
          end
        end

        entries << current_entry if current_entry.any?
        entries.last(limit)
      end

      def self.clear_history
        initialize unless @history_file
        File.write(@history_file, '')
      end
    end
  end
end