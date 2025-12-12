# frozen_string_literal: true

module Gemkanbino
  module Exceptions
    # Exceção para erros relacionados ao gerenciamento de configurações
    class ConfigError < StandardError
      def initialize(message = 'Erro de configuração')
        super(message)
      end
    end
  end
end