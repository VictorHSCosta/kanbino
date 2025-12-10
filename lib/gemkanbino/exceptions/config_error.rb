# frozen_string_literal: true

module Gemkanbino
  module Exceptions
    class ConfigError < StandardError
      attr_reader :config_key, :config_value

      def initialize(message, config_key = nil, config_value = nil)
        super(message)
        @config_key = config_key
        @config_value = config_value
      end

      def to_s
        if @config_key
          "#{super} (key: #{@config_key}, value: #{@config_value})"
        else
          super
        end
      end
    end
  end
end