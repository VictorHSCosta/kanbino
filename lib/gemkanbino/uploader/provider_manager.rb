# frozen_string_literal: true

module Gemkanbino
  module Uploader
    # Manages upload providers
    module ProviderManager
      def providers
        [
          UploadProviders::FileIO.new,
          UploadProviders::TransferSh.new
        ]
      end

      def get_provider(name)
        if name.nil?
          # Let user choose
          choices = providers.map do |provider|
            {
              name: provider.name,
              value: provider.class.name.split("::").last.downcase
            }
          end

          provider_name = @prompt.select("Choose upload provider:", choices)
          find_provider_by_name(provider_name)
        else
          find_provider_by_name(name.downcase)
        end
      end

      def find_provider_by_name(name)
        provider = providers.find { |p| p.name.downcase == name || p.class.name.split("::").last.downcase == name }

        if provider.nil?
          puts pastel.red("Unknown provider: #{name}")
          puts "Available providers: #{providers.map(&:name).join(', ')}"
          raise Exceptions::UploadError, "Unknown provider: #{name}"
        end

        provider
      end

      def list_providers
        puts pastel.cyan("🌐 Available Upload Providers:")
        puts "=" * 50

        providers.each do |provider|
          status = provider.available? ? pastel.green("✓") : pastel.red("✗")
          puts "#{status} #{provider.name.ljust(15)} #{provider.description}"
        end

        puts "=" * 50
      end

      def test_provider(provider_name)
        provider = get_provider(provider_name)

        puts pastel.cyan("🧪 Testing provider: #{provider.name}")

        if provider.test_connection
          puts pastel.green("✓ Provider is working correctly")
          true
        else
          puts pastel.red("✗ Provider test failed")
          false
        end
      end
    end
  end
end