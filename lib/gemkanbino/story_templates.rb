# frozen_string_literal: true

module Gemkanbino
  # Story template system
  module StoryTemplates
    @templates = {}

    class << self
      def register_template(name, template_class)
        @templates[name.to_s] = template_class
      end

      def get_template(name)
        template_class = @templates[name.to_s]
        return nil unless template_class

        template_class.new
      end

      def list_templates
        @templates.keys.sort
      end

      def list_templates_with_descriptions
        @templates.keys.map do |name|
          template_class = @templates[name]
          template = template_class.new
          [name, template.description]
        end
      end

      def load_builtin_templates
        require_relative "templates/guerra_irmaos_planetas"
        register_template("guerra_irmaos_planetas", GuerraIrmaosPlanetas)
      end
    end

    # Base template class
    class BaseTemplate
      def description
        raise NotImplementedError, "Subclass must implement description"
      end

      def generate_story(title, options = {})
        raise NotImplementedError, "Subclass must implement generate_story"
      end

      def get_user_options
        {}
      end

      protected

      def generate_character_names
        first_names = ["Alex", "Marcus", "Valerius", "Octavius", "Maximus", "Julius", "Constantine", "Theodore"]
        last_names = ["Stellaris", "Nebulae", "Cosmos", "Galaxius", "Planetos", "Universum", "Stellaron", "Celestia"]

        [
          "#{first_names.sample} #{last_names.sample}",
          "#{first_names.sample} #{last_names.sample}"
        ]
      end

      def generate_planet_names
        prefixes = ["Nova", "Alpha", "Beta", "Gamma", "Delta", "Omega", "Prime", "Centauri"]
        suffixes = ["Terra", "Prime", "Major", "Minor", "Nova", "Stellar", "Cosmos", "Genesis"]

        [
          "#{prefixes.sample} #{suffixes.sample}",
          "#{prefixes.sample} #{suffixes.sample}"
        ]
      end

      def format_chapter_content(content)
        content.strip
      end
    end
  end
end