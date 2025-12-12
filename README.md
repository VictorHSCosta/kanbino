# Gemkanbino

Gemkanbino é uma ferramenta CLI abrangente para gerenciamento de arquivos, navegação e uploads para nuvem, construída com Ruby e framework Thor. Fornece uma maneira intuitiva de gerenciar arquivos diretamente do seu terminal.

## Installation

Adicione esta linha ao Gemfile da sua aplicação:

```ruby
gem 'gemkanbino'
```

E então execute:

```bash
$ bundle install
```

Ou instale manualmente:

```bash
$ gem install gemkanbino
```

## Usage

### Comandos Principais

#### Página Inicial
```bash
gemkanbino inicio
```
Exibe uma página inicial com mensagem de boas-vindas centralizada no terminal.

**Aliases disponíveis:**
- `gemkanbino welcome`
- `gemkanbino home`
- `gemkanbino start`
- `gemkanbino bemvindo`

#### Navegação de Arquivos
```bash
gemkanbino pwd                    # Mostra diretório atual
gemkanbino ls [caminho]           # Lista arquivos e diretórios
gemkanbino cd <caminho>           # Muda de diretório
gemkanbino select <arquivo>       # Seleciona um arquivo para operações
gemkanbino info [arquivo]         # Mostra informações detalhadas
```

#### Gerenciamento de Arquivos
```bash
gemkanbino copy [arquivo]         # Copia arquivo para armazenamento local
gemkanbino upload [arquivo]       # Faz upload para nuvem
gemkanbino list                   # Lista arquivos armazenados
```

#### Configuração
```bash
gemkanbino config [chave] [valor] # Mostra ou define configurações
gemkanbino version                # Exibe versão
gemkanbino help                   # Mostra ajuda
```

#### Modo Interativo
```bash
gemkanbino interactive            # Inicia modo shell interativo
```

### Exemplo de Uso

```bash
# Exibir página de boas-vindas
$ gemkanbino inicio

✨✨
➤ Bem-vindo ✨
✨✨

         Use 'gemkanbino help' para ver todos os comandos
```

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and the created tag, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/gemkanbino. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/[USERNAME]/gemkanbino/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Gemkanbino project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/[USERNAME]/gemkanbino/blob/master/CODE_OF_CONDUCT.md).
