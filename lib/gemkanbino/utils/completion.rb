# frozen_string_literal: true

module Gemkanbino
  module Utils
    module Completion
      def self.available_commands
        %w[
          upload
          storage
          config
          help
          version
        ]
      end

      def self.complete_command(partial)
        available_commands.select { |cmd| cmd.start_with?(partial) }
      end

      def self.complete_file_path(partial)
        return [] unless partial

        dir = File.dirname(partial)
        prefix = File.basename(partial)

        return [] unless Dir.exist?(dir)

        Dir.glob("#{dir}#{prefix}*").map do |path|
          File.directory?(path) ? "#{path}/" : path
        end
      end
    end
  end
end