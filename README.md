# Gemkanbino

Gemkanbino é uma ferramenta de interface de linha de comando (CLI) abrangente para gerenciamento de arquivos, navegação no sistema de arquivos e uploads para a nuvem. Agora com suporte a interface web!

## Installation

Install the gem and add to the application's Gemfile by executing:

```bash
bundle add gemkanbino
```

If bundler is not being used to manage dependencies, install the gem by executing:

```bash
gem install gemkanbino
```

## Usage

### CLI Commands

#### Navegação e Gerenciamento de Arquivos

```bash
# Mostrar diretório atual
gemkanbino pwd

# Listar arquivos no diretório atual
gemkanbino ls

# Listar arquivos com opções
gemkanbino ls -l          # formato longo
gemkanbino ls -a          # mostrar arquivos ocultos
gemkanbino ls /path/to/dir

# Mudar de diretório
gemkanbino cd /path/to/directory

# Selecionar um arquivo para operações
gemkanbino select /path/to/file.txt

# Mostrar informações sobre o arquivo selecionado
gemkanbino info

# Mostrar informações sobre um arquivo específico
gemkanbino info /path/to/file.txt
```

#### Operações de Armazenamento

```bash
# Copiar arquivo selecionado para armazenamento local
gemkanbino copy

# Copiar arquivo específico
gemkanbino copy /path/to/file.txt

# Copiar para diretório personalizado
gemkanbino copy -t my_project

# Listar todos os arquivos armazenados
gemkanbino list
```

#### Upload para Nuvem

```bash
# Fazer upload do arquivo selecionado
gemkanbino upload

# Fazer upload de arquivo específico
gemkanbino upload /path/to/file.txt

# Especificar provedor de upload
gemkanbino upload -p fileio
gemkanbino upload -p transfersh
```

#### Modo Interativo

```bash
# Iniciar modo shell interativo
gemkanbino interactive
```

#### Interface Web

```bash
# Iniciar servidor web (porta padrão 4567)
gemkanbino server

# Iniciar em porta personalizada
gemkanbino server -p 8080

# Iniciar em host personalizado
gemkanbino server -H 127.0.0.1

# Combinar porta e host personalizados
gemkanbino server -p 3000 -H localhost
```

Depois de iniciar o servidor, acesse `http://localhost:4567` no seu navegador para ver a página inicial com a mensagem de boas-vindas.

#### Configuração

```bash
# Mostrar toda a configuração
gemkanbino config

# Mostrar configuração específica
gemkanbino config upload_provider

# Definir configuração
gemkanbino config upload_provider fileio
```

#### Informações

```bash
# Mostrar versão
gemkanbino version

# Mostrar ajuda
gemkanbino --help
```

### Interface Web

A interface web do Gemkanbino oferece:

- **Página Inicial**: Uma página simples com mensagem de boas-vindas centralizada
- **Health Check**: Endpoint `/health` para verificação de status do servidor
- **Design Responsivo**: Interface moderna que funciona em todos os dispositivos
- **Error Handling**: Tratamento de erros apropriado com respostas JSON

### Exemplos de Uso

#### Fluxo de Trabalho Típico

```bash
# Navegar até o diretório desejado
gemkanbino cd ~/Documents

# Listar arquivos
gemkanbino ls -l

# Selecionar um arquivo importante
gemkanbino select important_report.pdf

# Ver informações do arquivo
gemkanbino info

# Fazer uma cópia local
gemkanbino copy -t backup

# Fazer upload para a nuvem
gemkanbino upload -p fileio
```

#### Iniciar Interface Web

```bash
# Iniciar servidor web
gemkanbino server

# Output esperado:
# 🚀 Gemkanbino Web Server starting at http://0.0.0.0:4567
# == Sinatra (v3.0.0) has taken the stage on 4567 for production
# >> Thin web server (v1.8.1 codename Deep Fried)
# >> Maximum connections set to 1024
# >> Listening on 0.0.0.0:4567, CTRL+C to stop
```

Acesse `http://localhost:4567` no seu navegador para ver a página inicial.

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and the created tag, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/gemkanbino. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/[USERNAME]/gemkanbino/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Gemkanbino project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/[USERNAME]/gemkanbino/blob/master/CODE_OF_CONDUCT.md).
