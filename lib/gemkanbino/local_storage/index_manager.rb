# frozen_string_literal: true

require "json"

module Gemkanbino
  module LocalStorage
    # Handles file index operations for local storage
    module IndexManager
      private

      def load_index
        if File.exist?(@index_file)
          begin
            @index = JSON.parse(File.read(@index_file))
          rescue JSON::ParserError
            puts pastel.yellow("Warning: Corrupted index file, creating new one.")
            @index = {}
          end
        else
          @index = {}
        end
      end

      def save_index
        File.write(@index_file, JSON.pretty_generate(@index))
      end

      def add_to_index(name, metadata)
        @index[name] = metadata
        save_index
      end

      def filter_files(index, filter)
        return index unless filter

        filter = filter.downcase
        index.select do |name, metadata|
          name.downcase.include?(filter) ||
            metadata["original_name"].downcase.include?(filter) ||
            metadata["content_type"]&.downcase&.include?(filter)
        end
      end

      def calculate_total_size
        @index.values.sum { |metadata| metadata["size"] || 0 }
      end
    end
  end
end