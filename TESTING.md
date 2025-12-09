# Guia de Testes - gemkanbino

Este documento descreve como executar e trabalhar com as ferramentas de teste configuradas para o projeto gemkanbino.

## 🛠️ Ferramentas Configuradas

### 1. RSpec
Framework de testes para Ruby, usado para testes unitários e de integração.

### 2. RuboCop
Ferramenta de análise estática de código Ruby que verifica a conformidade com as diretrizes de estilo e melhores práticas.

### 3. Factory Bot
Biblioteca para criação de objetos de teste, facilitando a setup de dados para testes.

## 🚀 Comandos Úteis

### Executar Testes
```bash
# Executar todos os testes
bundle exec rspec

# Executar testes com formatação detalhada
bundle exec rspec --format documentation

# Executar um arquivo de teste específico
bundle exec rspec spec/gemkanbino_spec.rb

# Executar testes em modo de verbose
bundle exec rspec --format documentation
```

### Análise de Código com RuboCop
```bash
# Executar análise de código em todos os arquivos
bundle exec rubocop

# Executar análise em arquivos específicos
bundle exec rubocop lib/gemkanbino.rb

# Exibir informações detalhadas sobre as violações
bundle exec rubocop --display-cop-names

# Gerar configuração de seções novas
bundle exec rubocop --auto-gen-config
```

### Usando Rake Tasks
```bash
# Executar testes (padrão)
bundle exec rake

# Executar apenas testes RSpec
bundle exec rake spec

# Executar apenas análise RuboCop
bundle exec rake rubocop

# Executar testes e linting
bundle exec rake test
```

### Gerenciamento de Dependências
```bash
# Instalar dependências
bundle install

# Atualizar dependências
bundle update

# Verificar dependências desatualizadas
bundle outdated
```

## 📝 Exemplos de Uso do Factory Bot

### Criar Objetos de Teste
```ruby
# Criar uma instância (sem persistir)
error = build(:gemkanbino_error)

# Criar uma instância (com persistir, para ActiveRecord)
error = create(:gemkanbino_error)

# Obter atributos como Hash
attrs = attributes_for(:gemkanbino_error)

# Criar múltiplas instâncias
errors = build_list(:gemkanbino_error, 3)
```

### Customizar Factories
```ruby
# Criar com atributos customizados
error = build(:gemkanbino_error, initialize_with: Gemkanbino::Error.new("Custom message"))

# Criar com traits (quando configurado)
# error = build(:gemkanbino_error, :custom_trait)
```

## 🔧 Estrutura de Testes

```
spec/
├── factories/
│   ├── gemkanbino.rb         # Factories do projeto
│   └── ...                   # Outras factories
├── spec_helper.rb            # Configuração do RSpec e Factory Bot
├── gemkanbino_spec.rb        # Testes principais
├── gemkanbino_factory_spec.rb # Exemplos com Factory Bot
└── ...                       # Outros arquivos de teste
```

## 📋 Configuração

### RSpec
Configurado em `spec/spec_helper.rb` com:
- Persistência de status de testes
- Sintaxe expect
- Integração com Factory Bot

### RuboCop
Configurado em `.rubocop.yml` com:
- Ruby 3.2 como alvo
- Comprimento máximo de linha: 120 caracteres
- Exclusão automática de diretórios irrelevantes

### Factory Bot
Configurado com:
-autoload automático de factories
- Sintaxe methods incluída nos testes

## 🐛 Debugging de Testes

### Adicionar Debug
```ruby
# Adicionar `binding.irb` para inspecionar variáveis
it "should debug" do
  result = some_method
  binding.irb  # Pausa execução para inspecionar
  expect(result).to be_truthy
end
```

### Executar com Linha de Comando
```bash
# Executar com debugging
bundle exec rspec --require debugger spec/your_spec.rb

# Executar testes específicos por linha
bundle exec rspec spec/gemkanbino_spec.rb:5
```

## 🎯 Boas Práticas

### 1. Convenções de Nomenclatura
- Nomeie arquivos de teste como `*_spec.rb`
- Nomeie factories usando o nome do modelo
- Use descrições claras nos `describe` e `context`

### 2. Testes Limpos
- Um teste por comportamento
- Use `let` para setup de dados
- Evite lógica complexa nos testes

### 3. Factory Bot
- Crie factories reutilizáveis
- Use traits para variações
- Mantenha factories simples

### 4. RuboCop
- Configure automaticamente no seu editor
- Execute antes de commits
- Corrija violações automaticamente quando possível

## 📚 Recursos Adicionais

- [RSpec Documentation](https://rspec.info/documentation/)
- [RuboCop Documentation](https://docs.rubocop.org/)
- [Factory Bot Documentation](https://github.com/thoughtbot/factory_bot)
- [Ruby Style Guide](https://rubystyle.guide/)