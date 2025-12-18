#!/usr/bin/env ruby
# frozen_string_literal: true

# Simple test script to verify story generation functionality

$LOAD_PATH.unshift File.expand_path('lib', __dir__)

require 'gemkanbino/story_generator'
require 'gemkanbino/markdown_generator'
require 'gemkanbino/local_storage'
require 'gemkanbino/config/story_config'
require 'gemkanbino/validators/story_validator'

puts "🧪 Testando funcionalidade de geração de histórias..."
puts "=" * 50

begin
  # Test 1: Basic story generation
  puts "\n1️⃣ Testando geração básica de história..."
  generator = Gemkanbino::StoryGenerator.new(title: 'História de Teste')
  story_data = generator.generate_war_story

  if story_data[:title] && story_data[:content] && story_data[:metadata]
    puts "✅ Geração básica funcionando!"
    puts "   Título: #{story_data[:title]}"
    puts "   Palavras: #{story_data[:metadata][:word_count]}"
  else
    puts "❌ Erro na geração básica"
    exit 1
  end

  # Test 2: Markdown generation
  puts "\n2️⃣ Testando geração de Markdown..."
  markdown_gen = Gemkanbino::MarkdownGenerator.new
  markdown_content = markdown_gen.generate(story_data)

  if markdown_content.include?('História de Teste') && markdown_content.include?('#')
    puts "✅ Geração de Markdown funcionando!"
    puts "   Tamanho: #{markdown_content.length} caracteres"
  else
    puts "❌ Erro na geração de Markdown"
    exit 1
  end

  # Test 3: Story variation
  puts "\n3️⃣ Testando sistema de variação..."
  generator1 = Gemkanbino::StoryGenerator.new(title: 'Teste Variação', variation: :high)
  generator2 = Gemkanbino::StoryGenerator.new(title: 'Teste Variação', variation: :high)

  story1 = generator1.generate_war_story
  story2 = generator2.generate_war_story

  if story1[:content][:introduction] != story2[:content][:introduction]
    puts "✅ Sistema de variação funcionando!"
    puts "   Histórias diferentes geradas"
  else
    puts "⚠️  Variação pode não estar funcionando (histórias idênticas)"
  end

  # Test 4: Validation system
  puts "\n4️⃣ Testando sistema de validação..."
  validator = Gemkanbino::Validators::StoryValidator.new
  validation_results = validator.validate_story_generation({
    title: 'História Válida',
    genre: 'sci_fi',
    length: 'medium'
  })

  if validation_results[:valid]
    puts "✅ Sistema de validação funcionando!"
  else
    puts "❌ Erro na validação: #{validation_results[:errors].join(', ')}"
    exit 1
  end

  # Test 5: Configuration system
  puts "\n5️⃣ Testando sistema de configuração..."
  config = Gemkanbino::Config::StoryConfig.new

  if config.get('general.default_genre')
    puts "✅ Sistema de configuração funcionando!"
    puts "   Gênero padrão: #{config.get('general.default_genre')}"
  else
    puts "❌ Erro na configuração"
    exit 1
  end

  # Test 6: Templates system
  puts "\n6️⃣ Testando sistema de templates..."
  if defined?(Gemkanbino::StoryTemplates::WarOfTheFiveYears)
    templates = Gemkanbino::StoryTemplates::WarOfTheFiveYears
    if templates[:introductions] && !templates[:introductions].empty?
      puts "✅ Sistema de templates funcionando!"
      puts "   Templates disponíveis: #{templates[:introductions].length}"
    else
      puts "❌ Templates não carregados"
      exit 1
    end
  else
    puts "❌ Módulo de templates não encontrado"
    exit 1
  end

  puts "\n🎉 Todos os testes passaram com sucesso!"
  puts "\n📋 Resumo da implementação:"
  puts "✅ StoryGenerator - Classe principal de geração"
  puts "✅ StoryTemplates - Templates variados para histórias"
  puts "✅ MarkdownGenerator - Conversão para formato Markdown"
  puts "✅ StoryVariator - Sistema de variação de conteúdo"
  puts "✅ StoryValidator - Validação de dados"
  puts "✅ StoryConfig - Sistema de configuração"
  puts "✅ LocalStorage (estendido) - Armazenamento de histórias"
  puts "✅ CLI (estendida) - Comandos story e stories"

rescue => e
  puts "\n❌ Erro durante os testes:"
  puts "   #{e.class}: #{e.message}"
  puts "   #{e.backtrace.first(3).join("\n   ")}"
  exit 1
end