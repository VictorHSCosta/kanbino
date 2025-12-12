# Gemkanbino

Uma poderosa ferramenta CLI Ruby para gerenciamento de arquivos e uploads na nuvem.

[![Gem Version](https://badge.fury.io/rb/gemkanbino.svg)](https://badge.fury.io/rb/gemkanbino)
[![Build Status](https://github.com/VictorHSCosta/kanbino/workflows/CI/badge.svg)](https://github.com/VictorHSCosta/kanbino/actions)

## 🌟 Recursos Principais

- **📁 Navegação de Arquivos**: Liste, navegue e gerencie diretórios e arquivos facilmente
- **📋 Seleção Inteligente**: Selecione arquivos para operações subsequentes
- **💾 Armazenamento Local**: Copie e organize arquivos em storage local
- **☁️ Upload para Nuvem**: Envie arquivos para provedores como File.io e Transfer.sh
- **⚙️ Configuração Flexível**: Personalize o comportamento da ferramenta
- **🎨 Interface Rica**: Terminal colorido e responsivo com ASCII art
- **🔧 Modo Interativo**: Shell interativo para operações contínuas
- **👋 Tela de Boas-vindas**: Interface amigável para novos usuários

## 📥 Instalação

Adicione esta linha ao Gemfile da sua aplicação:

```ruby
gem 'gemkanbino'
```

E execute:

```bash
$ bundle install
```

Ou instale diretamente:

```bash
$ gem install gemkanbino
```

## 🚀 Primeiros Passos

### Início Rápido

Após a instalação, simplesmente execute:

```bash
$ gemkanbino
```

Você verá uma tela de boas-vindas com informações básicas sobre a ferramenta e comandos principais.

### Comandos Essenciais

```bash
# Ver arquivos no diretório atual
$ gemkanbino ls

# Navegar para um diretório
$ gemkanbino cd /caminho/do/diretorio

# Selecionar um arquivo
$ gemkanbino select arquivo.txt

# Fazer upload do arquivo selecionado
$ gemkanbino upload

# Ver ajuda completa
$ gemkanbino --help
```

## 📖 Comandos Disponíveis

### Navegação e Gerenciamento de Arquivos

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `ls [PATH]` | Lista arquivos e diretórios | `gemkanbino ls -la` |
| `cd PATH` | Muda para diretório especificado | `gemkanbino cd ~/Documents` |
| `pwd` | Mostra diretório atual | `gemkanbino pwd` |
| `select FILE` | Seleciona um arquivo para operações | `gemkanbino select relatorio.pdf` |
| `info [FILE]` | Exibe informações detalhadas do arquivo | `gemkanbino info` |

### Armazenamento e Upload

| Comando | Descrição | Opções |
|---------|-----------|--------|
| `copy [FILE]` | Copia arquivo para storage local | `-t, --target DIR` |
| `upload [FILE]` | Envia arquivo para nuvem | `-p, --provider PROVIDER` |
| `list` | Lista todos os arquivos armazenados | - |

### Configuração e Ajuda

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `config [KEY] [VALUE]` | Mostra ou define configurações | `gemkanbino config upload_provider fileio` |
| `welcome` | Exibe tela de boas-vindas | `gemkanbino welcome --format compact` |
| `version` | Mostra versão atual | `gemkanbino version` |
| `interactive` | Inicia modo interativo | `gemkanbino interactive` |

## 🎨 Tela de Boas-vindas

O Gemkanbino inclui uma tela de boas-vindas personalizada que aparece ao executar o comando sem argumentos.

### Formatos Disponíveis

```bash
# Formato automático (adapta ao tamanho do terminal)
$ gemkanbino welcome --format auto

# Formato compacto
$ gemkanbino welcome --format compact

# Formato detalhado com informações do sistema
$ gemkanbino welcome --format detailed

# Formato mínimo
$ gemkanbino welcome --format minimal
```

### Opções Adicionais

```bash
# Exibir dicas rápidas
$ gemkanbino welcome --tips

# Mostrar guia de primeiros passos
$ gemkanbino welcome --help

# Não limpar a tela
$ gemkanbino welcome --no-clear
```

## ⚙️ Configuração

### Configurações de Boas-vindas

Personalize a tela de boas-vindas através do arquivo `~/.gemkanbino/config.yml`:

```yaml
welcome:
  enabled: true                    # Habilitar tela de boas-vindas
  show_on_start: true             # Mostrar ao iniciar sem argumentos
  format: "auto"                  # Formato: auto, compact, detailed, minimal
  clear_screen: true              # Limpar tela antes de exibir
  show_tips: true                 # Mostrar dicas aleatórias
  show_getting_started: true      # Mostrar guia de primeiros passos
  tips_frequency: 0.3            # Frequência de exibição de dicas (0-1)
  max_tips: 4                    # Máximo de dicas exibidas
  colors_enabled: true           # Habilitar cores
  ascii_art: true                # Exibir arte ASCII
  compact_threshold:
    min_width: 60                # Largura mínima para formato compacto
    min_height: 15               # Altura mínima para formato compacto
  minimal_threshold:
    min_width: 40                # Largura mínima para formato mínimo
    min_height: 10               # Altura mínima para formato mínimo
```

### Configurações de Storage

```yaml
storage:
  directory: "~/.gemkanbino/storage"    # Diretório de armazenamento
  max_size: 1073741824                  # Tamanho máximo (1GB)
  compression_enabled: true             # Habilitar compressão
  cleanup_on_startup: false             # Limpar ao iniciar
```

### Configurações de Upload

```yaml
upload:
  default_provider: "fileio"            # Provedor padrão
  timeout: 30                          # Timeout em segundos
```

## 🌐 Provedores de Upload

### File.io
- Upload rápido e anônimo
- Links temporários (expiram após download)
- Limite: 2GB por arquivo

```bash
$ gemkanbino upload --provider fileio
```

### Transfer.sh
- Upload gratuito
- Links expiram em 14 dias
- Suporta múltiplos formatos

```bash
$ gemkanbino upload --provider transfersh
```

## 🔧 Modo Interativo

O modo interativo permite operações contínuas sem precisar digitar `gemkanbino` toda vez:

```bash
$ gemkanbino interactive
```

No modo interativo:

- Use `help` para ver comandos disponíveis
- Use `exit` ou `quit` para sair
- Use `clear` para limpar a tela
- Navegação com setas e autocompletar com Tab

## 🌍 Variáveis de Ambiente

- `GEMKANBINO_NO_WELCOME=1` - Desabilitar tela de boas-vindas
- `GEMKANBINO_FORCE_WELCOME=1` - Forçar exibição da tela de boas-vindas
- `GEMKANBINO_SHOW_TIPS=1` - Forçar exibição de dicas
- `NO_COLOR=1` - Desabilitar cores
- `NO_CLEAR=1` - Não limpar tela

## 🐛 Solução de Problemas

### Terminal Pequeno

Se seu terminal for muito pequeno, o Gemkanbino automaticamente:
- Reduz para formato compacto
- Usa formato mínimo para terminais muito pequenos
- Desabilita arte ASCII

### Problemas com Cores

Se as cores não aparecerem:
1. Verifique se seu terminal suporta cores
2. Use `NO_COLOR=1` para forçar modo monocromático
3. Verifique a configuração `colors_enabled: false`

### Upload Falhando

1. Verifique sua conexão com a internet
2. Tente um provedor diferente
3. Verifique o tamanho do arquivo
4. Verifique as configurações de timeout

## 🧪 Desenvolvimento

Após clonar o repositório:

```bash
$ bundle install
$ bundle exec rspec  # Rodar testes
$ bundle exec rake  # Rodar tarefas padrão
$ bin/console       # Console interativo
```

### Estrutura do Projeto

```
├── lib/
│   └── gemkanbino/
│       ├── cli.rb                    # Interface CLI principal
│       ├── welcome_service.rb        # Serviço de boas-vindas
│       ├── ui/                       # Componentes de UI
│       │   ├── banner_renderer.rb
│       │   └── terminal_helper.rb
│       ├── config/                   # Configurações
│       │   ├── storage_config.rb
│       │   ├── upload_config.rb
│       │   └── welcome_config.rb
│       └── ...
├── spec/                             # Testes
└── exe/gemkanbino                    # Executável principal
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para o branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Mantenha a compatibilidade com Ruby >= 3.2.0
- Documente mudanças relevantes no README

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 🙏 Agradecimentos

- [Thor](https://github.com/rails/thor) - Framework CLI
- [Pastel](https://github.com/piotrmurach/pastel) - Cores no terminal
- [TTY Toolkit](https://ttytoolkit.org/) - Componentes de terminal

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/VictorHSCosta/kanbino/issues)
- **Discussions**: [GitHub Discussions](https://github.com/VictorHSCosta/kanbino/discussions)
- **Email**: victorhs.costa@gmail.com

---

**Gemkanbino** - Gerenciamento de arquivos simplificado com estilo 🚀