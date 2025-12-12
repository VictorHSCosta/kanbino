# frozen_string_literal: true

require "spec_helper"
require "tempfile"
require "yaml"

RSpec.describe Gemkanbino::Config::WelcomeConfig do
  let(:config_dir) { Dir.mktmpdir }
  let(:config_file) { File.join(config_dir, "config.yml") }

  before do
    allow(Dir).to receive(:home).and_return(config_dir)
  end

  after do
    FileUtils.rm_rf(config_dir)
  end

  describe ".default_config" do
    it "returns the default configuration" do
      config = described_class.default_config
      expect(config).to be_a(Hash)
      expect(config).to have_key("welcome")
      expect(config["welcome"]).to have_key("enabled")
      expect(config["welcome"]["enabled"]).to be true
    end
  end

  describe ".validate_config" do
    let(:valid_config) { described_class.default_config }

    context "with valid configuration" do
      it "returns no errors" do
        errors = described_class.validate_config(valid_config)
        expect(errors).to be_empty
      end
    end

    context "with invalid boolean values" do
      it "returns error for invalid boolean" do
        config = {
          "welcome" => {
            "enabled" => "yes"  # Invalid: should be true/false
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome enabled must be true or false/)
      end
    end

    context "with invalid format" do
      it "returns error for invalid format" do
        config = {
          "welcome" => {
            "format" => "invalid_format"
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome format must be one of: auto, compact, detailed, minimal/)
      end
    end

    context "with invalid tips_frequency" do
      it "returns error for frequency out of range" do
        config = {
          "welcome" => {
            "tips_frequency" => 1.5  # Invalid: should be 0-1
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome tips_frequency must be a number between 0 and 1/)
      end

      it "returns error for non-numeric frequency" do
        config = {
          "welcome" => {
            "tips_frequency" => "high"  # Invalid: should be numeric
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome tips_frequency must be a number between 0 and 1/)
      end
    end

    context "with invalid max_tips" do
      it "returns error for non-positive max_tips" do
        config = {
          "welcome" => {
            "max_tips" => 0  # Invalid: should be > 0
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome max_tips must be a positive integer/)
      end
    end

    context "with invalid auto_timeout" do
      it "returns error for non-positive timeout" do
        config = {
          "welcome" => {
            "auto_timeout" => -5  # Invalid: should be > 0
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome auto_timeout must be a positive integer/)
      end
    end

    context "with invalid thresholds" do
      it "returns error for non-hash threshold" do
        config = {
          "welcome" => {
            "compact_threshold" => "invalid"  # Invalid: should be hash
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/compact_threshold must be a hash/)
      end

      it "returns error for missing threshold dimensions" do
        config = {
          "welcome" => {
            "compact_threshold" => {
              "min_width" => 80  # Missing min_height
            }
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/compact_threshold must include min_height/)
      end

      it "returns error for negative threshold values" do
        config = {
          "welcome" => {
            "minimal_threshold" => {
              "min_width" => -10,
              "min_height" => 5
            }
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/minimal_threshold min_width must be a positive integer/)
      end
    end

    context "with invalid custom_message" do
      it "returns error for message too long" do
        config = {
          "welcome" => {
            "custom_message" => "a" * 201  # Invalid: max 200 characters
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome custom_message must be a string with max 200 characters/)
      end

      it "returns error for non-string message" do
        config = {
          "welcome" => {
            "custom_message" => 123  # Invalid: should be string
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome custom_message must be a string/)
      end
    end

    context "with invalid custom_footer" do
      it "returns error for footer too long" do
        config = {
          "welcome" => {
            "custom_footer" => "a" * 301  # Invalid: max 300 characters
          }
        }
        errors = described_class.validate_config(config)
        expect(errors).to include(/Welcome custom_footer must be a string with max 300 characters/)
      end
    end
  end

  describe ".get_config" do
    context "when config file doesn't exist" do
      before do
        allow(File).to receive(:exist?).with(config_file).and_return(false)
      end

      it "returns default configuration" do
        config = described_class.get_config
        expect(config).to eq(described_class.default_config["welcome"])
      end
    end

    context "when config file exists" do
      let(:custom_config) do
        {
          "welcome" => {
            "enabled" => false,
            "format" => "compact"
          }
        }
      end

      before do
        File.write(config_file, YAML.dump(custom_config))
      end

      it "loads and merges configuration" do
        config = described_class.get_config
        expect(config["enabled"]).to be false
        expect(config["format"]).to eq("compact")
        # Should retain other default values
        expect(config["show_tips"]).to be true
      end
    end

    context "when config file is corrupted" do
      before do
        File.write(config_file, "invalid: yaml: content: [")
      end

      it "falls back to default configuration" do
        config = described_class.get_config
        expect(config).to eq(described_class.default_config["welcome"])
      end
    end
  end

  describe ".save_config" do
    let(:custom_config) do
      {
        "enabled" => false,
        "format" => "compact",
        "show_tips" => false
      }
    end

    it "saves configuration to file" do
      result = described_class.save_config(custom_config)
      expect(result).to be true

      saved_content = YAML.load_file(config_file)
      expect(saved_content["welcome"]).to eq(custom_config)
    end

    it "creates config directory if it doesn't exist" do
      # Remove directory to test creation
      FileUtils.rm_rf(config_dir)

      result = described_class.save_config(custom_config)
      expect(result).to be true
      expect(Dir.exist?(config_dir)).to be true
    end

    it "merges with existing configuration" do
      # Save initial config
      initial_config = { "enabled" => true }
      described_class.save_config(initial_config)

      # Save additional config
      result = described_class.save_config({ "format" => "compact" })
      expect(result).to be true

      # Check that both configs are present
      saved_config = YAML.load_file(config_file)
      expect(saved_config["welcome"]["enabled"]).to be true
      expect(saved_config["welcome"]["format"]).to eq("compact")
    end
  end

  describe ".reset_to_defaults" do
    it "resets configuration to defaults" do
      # Save custom config first
      custom_config = { "enabled" => false }
      described_class.save_config(custom_config)

      # Reset to defaults
      described_class.reset_to_defaults

      # Check that defaults are restored
      config = described_class.get_config
      expect(config["enabled"]).to be true
    end
  end

  describe ".should_show_welcome?" do
    before do
      allow(ENV).to receive(:[]).with('GEMKANBINO_NO_WELCOME').and_return(nil)
      allow(ENV).to receive(:[]).with('CI').and_return(nil)
      allow(ENV).to receive(:[]).with('GEMKANBINO_FORCE_WELCOME').and_return(nil)
      allow(STDOUT).to receive(:tty?).and_return(true)
    end

    it "returns true when welcome is enabled and should show on start" do
      config = { "enabled" => true, "show_on_start" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_welcome?).to be true
    end

    it "returns false when welcome is disabled" do
      config = { "enabled" => false, "show_on_start" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_welcome?).to be false
    end

    it "returns false when show_on_start is false" do
      config = { "enabled" => true, "show_on_start" => false }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_welcome?).to be false
    end

    it "returns true when GEMKANBINO_FORCE_WELCOME is set" do
      allow(ENV).to receive(:[]).with('GEMKANBINO_FORCE_WELCOME').and_return('1')
      config = { "enabled" => false, "show_on_start" => false }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_welcome?).to be true
    end

    it "returns false when GEMKANBINO_NO_WELCOME is set" do
      allow(ENV).to receive(:[]).with('GEMKANBINO_NO_WELCOME').and_return('1')
      config = { "enabled" => true, "show_on_start" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_welcome?).to be false
    end

    it "returns false when CI environment" do
      allow(ENV).to receive(:[]).with('CI').and_return('true')
      config = { "enabled" => true, "show_on_start" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_welcome?).to be false
    end

    it "returns false when STDOUT is not tty" do
      allow(STDOUT).to receive(:tty?).and_return(false)
      config = { "enabled" => true, "show_on_start" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_welcome?).to be false
    end
  end

  describe ".get_welcome_format" do
    before do
      allow(IO).to receive(:console).and_return(double("console", winsize: [24, 80]))
    end

    context "with auto format" do
      it "returns detailed for normal terminal size" do
        config = { "format" => "auto" }
        allow(described_class).to receive(:get_config).and_return(config)
        expect(described_class.get_welcome_format).to eq("detailed")
      end

      it "returns compact for smaller terminal" do
        config = { "format" => "auto" }
        allow(described_class).to receive(:get_config).and_return(config)
        allow(IO).to receive(:console).and_return(double("console", winsize: [12, 50]))
        expect(described_class.get_welcome_format).to eq("compact")
      end

      it "returns minimal for very small terminal" do
        config = { "format" => "auto" }
        allow(described_class).to receive(:get_config).and_return(config)
        allow(IO).to receive(:console).and_return(double("console", winsize: [8, 30]))
        expect(described_class.get_welcome_format).to eq("minimal")
      end
    end

    context "with specific format" do
      it "returns the specified format" do
        config = { "format" => "compact" }
        allow(described_class).to receive(:get_config).and_return(config)
        expect(described_class.get_welcome_format).to eq("compact")
      end
    end
  end

  describe ".should_show_tips?" do
    before do
      allow(ENV).to receive(:[]).with('GEMKANBINO_SHOW_TIPS').and_return(nil)
      allow(ENV).to receive(:[]).with('GEMKANBINO_NO_WELCOME').and_return(nil)
      allow(ENV).to receive(:[]).with('CI').and_return(nil)
    end

    it "returns false when tips are disabled" do
      config = { "enabled" => true, "show_tips" => false }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_tips?).to be false
    end

    it "returns true when GEMKANBINO_SHOW_TIPS is set" do
      allow(ENV).to receive(:[]).with('GEMKANBINO_SHOW_TIPS').and_return('1')
      config = { "enabled" => true, "show_tips" => false }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_tips?).to be true
    end

    it "returns true randomly based on frequency" do
      config = { "enabled" => true, "show_tips" => true, "tips_frequency" => 0.5 }
      allow(described_class).to receive(:get_config).and_return(config)
      # Test multiple times to ensure randomness works
      results = 10.times.map { described_class.should_show_tips? }
      expect(results.uniq.length).to be > 1  # Should have both true and false
    end
  end

  describe ".should_show_getting_started?" do
    it "returns false when getting started is disabled" do
      config = { "enabled" => true, "show_getting_started" => false }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_getting_started?).to be false
    end

    it "returns true on first run" do
      config = { "enabled" => true, "show_getting_started" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_getting_started?).to be true
    end

    it "returns false when not first run" do
      # Create the config directory to simulate not first run
      FileUtils.mkdir_p(config_dir)

      config = { "enabled" => true, "show_getting_started" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_show_getting_started?).to be false
    end
  end

  describe ".should_clear_screen?" do
    before do
      allow(ENV).to receive(:[]).with('NO_CLEAR').and_return(nil)
    end

    it "returns true when clear_screen is enabled" do
      config = { "enabled" => true, "clear_screen" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      allow(STDOUT).to receive(:tty?).and_return(true)
      expect(described_class.should_clear_screen?).to be true
    end

    it "returns false when clear_screen is disabled" do
      config = { "enabled" => true, "clear_screen" => false }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_clear_screen?).to be false
    end

    it "returns false when NO_CLEAR is set" do
      allow(ENV).to receive(:[]).with('NO_CLEAR').and_return('1')
      config = { "enabled" => true, "clear_screen" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      expect(described_class.should_clear_screen?).to be false
    end

    it "returns false when STDOUT is not tty" do
      config = { "enabled" => true, "clear_screen" => true }
      allow(described_class).to receive(:get_config).and_return(config)
      allow(STDOUT).to receive(:tty?).and_return(false)
      expect(described_class.should_clear_screen?).to be false
    end
  end
end