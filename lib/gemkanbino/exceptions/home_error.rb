# frozen_string_literal: true

module Gemkanbino
  module Exceptions
    # Custom exception for home command errors
    class HomeError < StandardError
      attr_reader :details

      def initialize(message, details = nil)
        super(message)
        @details = details
      end
    end
  end
end