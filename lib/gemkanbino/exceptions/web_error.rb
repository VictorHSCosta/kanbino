# frozen_string_literal: true

module Gemkanbino
  module Exceptions
    class WebError < Error
      attr_reader :error_code, :details

      def initialize(message, error_code: nil, details: {})
        super(message)
        @error_code = error_code
        @details = details
      end

      def to_hash
        {
          error: self.class.name,
          message: message,
          error_code: error_code,
          details: details
        }
      end
    end

    class ServerStartError < WebError
      def initialize(message, port: nil, host: nil)
        details = {}
        details[:port] = port if port
        details[:host] = host if host

        super(message, error_code: 'SERVER_START_FAILED', details: details)
      end
    end

    class PortConflictError < WebError
      def initialize(port, host = '0.0.0.0')
        super(
          "Port #{port} is already in use on #{host}",
          error_code: 'PORT_CONFLICT',
          details: { port: port, host: host }
        )
      end
    end

    class RouteNotFoundError < WebError
      def initialize(path)
        super(
          "Route not found: #{path}",
          error_code: 'ROUTE_NOT_FOUND',
          details: { path: path }
        )
      end
    end

    class TemplateNotFoundError < WebError
      def initialize(template_name)
        super(
          "Template not found: #{template_name}",
          error_code: 'TEMPLATE_NOT_FOUND',
          details: { template: template_name }
        )
      end
    end
  end
end