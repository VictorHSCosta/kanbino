# Gemkanbino

Uma ferramenta CLI abrangente para gerenciamento de arquivos, navegação, uploads para nuvem e criação de histórias. O Gemkanbino permite navegar pelo sistema de arquivos, selecionar arquivos, criar cópias locais, enviá-los para serviços de nuvem e criar histórias fictícias diretamente do seu terminal.

## 📋 Sumário

- [Instalação](#instalação)
- [Tutorial Rápido](#tutorial-rápido-primeiros-passos)
- [Comandos Básicos](#comandos-básicos)
- [Gerenciamento de Armazenamento Local](#gerenciamento-de-armazenamento-local)
- [Upload para Nuvem](#upload-para-nuvem)
- [Criação de Histórias](#criação-de-histórias)
- [Exemplos Práticos](#exemplos-práticos-e-casos-de-uso)
- [Configuração Avançada](#configuração-avançada)
- [Referência de Comandos](#referência-de-comandos)
- [Solução de Problemas](#solução-de-problemas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🚀 Instalação

### Pré-requisitos

- Ruby 3.2.0 ou superior
- Bundler (recomendado)

### Instalação via Gem

```bash
# Instalar a gem diretamente
gem install gemkanbino

# Ou via Bundler (recomendado)
echo "gem 'gemkanbino'" >> Gemfile
bundle install
```

### Instalação a partir do código-fonte

```bash
# Clonar o repositório
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# Instalar dependências
bundle install

# Instalar a gem localmente
bundle exec rake install
```

### Verificar Instalação

```bash
# Verificar versão
gemkanbino version

# Verificar ajuda
gemkanbino --help
```

## 🏁 Tutorial Rápido: Primeiros Passos

### 1. Navegação Básica

```bash
# Mostrar diretório atual
gemkanbino pwd

# Listar arquivos no diretório atual
gemkanbino ls

# Listar arquivos com detalhes
gemkanbino ls -l

# Mudar para um diretório
gemkanbino cd /caminho/para/diretorio
```

### 2. Selecionar e Visualizar Arquivos

```bash
# Selecionar um arquivo específico
gemkanbino select arquivo.txt

# Ver informações do arquivo selecionado
gemkanbino info

# Ver informações de um arquivo sem selecioná-lo
gemkanbino info /caminho/do/arquivo.pdf
```

### 3. Copiar para Armazenamento Local

```bash
# Copiar arquivo selecionado para armazenamento local
gemkanbino copy

# Copiar arquivo específico para armazenamento
gemkanbino copy /caminho/do/arquivo.jpg

# Copiar para um diretório específico no armazenamento
gemkanbino copy -t "imagens"
```

### 4. Upload para Nuvem

```bash
# Upload do arquivo selecionado
gemkanbino upload

# Upload com provedor específico
gemkanbino upload -p fileio

# Upload direto de arquivo
gemkanbino upload /caminho/do/documento.pdf -p transfersh
```

### 5. Criação de Histórias

```bash
# Criar história com template padrão
gemkanbino create_story "A Guerra dos Irmãos"

# Criar história com template específico
gemkanbino create_story "Aventura Espacial" -t guerra_irmaos_planetas

# Criar história em modo interativo
gemkanbino create_story -i

# Listar histórias criadas
gemkanbino list_stories

# Mostrar uma história completa
gemkanbino show_story "A Guerra dos Irmãos"

# Buscar histórias por conteúdo
gemkanbino search_stories "planetas"

# Exportar história para diferentes formatos
gemkanbino export_story "A Guerra dos Irmãos" -f markdown
gemkanbino export_story "A Guerra dos Irmãos" -f pdf -d ./exports/
```

## 📂 Comandos Básicos

### Navegação

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `pwd` | Mostra diretório atual | `gemkanbino pwd` |
| `ls [PATH]` | Lista arquivos e diretórios | `gemkanbino ls /home/user` |
| `cd PATH` | Muda de diretório | `gemkanbino cd Documents` |

**Opções do comando `ls`:**
- `-a, --all`: Mostra arquivos ocultos
- `-l, --long`: Usa formato de listagem longo

### Gerenciamento de Arquivos

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `select FILE` | Seleciona um arquivo para operações | `gemkanbino select arquivo.txt` |
| `info [FILE]` | Mostra informações detalhadas | `gemkanbino info arquivo.pdf` |
| `copy [FILE]` | Copia arquivo para armazenamento local | `gemkanbino copy -t backup` |
| `upload [FILE]` | Faz upload para nuvem | `gemkanbino upload -p fileio` |

**Opções do comando `copy`:**
- `-t, --target`: Nome do diretório de destino

**Opções do comando `upload`:**
- `-p, --provider`: Provedor de upload (fileio, transfersh)

### Criação de Histórias

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `create_story TITLE` | Cria uma nova história | `gemkanbino create_story "Minha História"` |
| `list_stories [FILTER]` | Lista todas as histórias armazenadas | `gemkanbino list_stories` |
| `show_story TITLE` | Mostra uma história completa | `gemkanbino show_story "Minha História"` |
| `delete_story TITLE` | Remove uma história | `gemkanbino delete_story "Velha História"` |
| `search_stories QUERY` | Busca histórias por conteúdo | `gemkanbino search_stories "guerra"` |
| `export_story TITLE` | Exporta história em diferentes formatos | `gemkanbino export_story "Minha História" -f pdf` |
| `list_templates` | Lista templates disponíveis | `gemkanbino list_templates` |
| `story_info TITLE` | Mostra informações detalhadas da história | `gemkanbino story_info "Minha História"` |
| `story_stats` | Exibe estatísticas do armazenamento de histórias | `gemkanbino story_stats` |

**Opções do comando `create_story`:**
- `-t, --template`: Template da história (padrão: guerra_irmaos_planetas)
- `-i, --interactive`: Modo de criação interativo

**Opções do comando `show_story`:**
- `-p, --preview`: Mostra apenas preview
- `-l, --lines`: Número de linhas do preview (padrão: 20)

**Opções do comando `export_story`:**
- `-f, --format`: Formato de exportação (markdown, html, pdf, txt)
- `-d, --destination`: Diretório ou arquivo de destino

### Utilidades

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `list` | Lista todos os arquivos armazenados | `gemkanbino list` |
| `config [KEY] [VALUE]` | Mostra ou define configurações | `gemkanbino config storage.max_size 1GB` |
| `interactive` | Inicia modo shell interativo | `gemkanbino interactive` |
| `version` | Mostra versão do gemkanbino | `gemkanbino version` |
| `cleanup_stories` | Limpa armazenamento de histórias | `gemkanbino cleanup_stories` |

## 💾 Gerenciamento de Armazenamento Local

O Gemkanbino mantém um armazenamento local para cópias de arquivos. Os comandos disponíveis são:

```bash
# Listar arquivos armazenados
gemkanbino list

# Ver informações do arquivo selecionado
gemkanbino info

# Copiar arquivo para armazenamento local
gemkanbino copy arquivo.txt

# Copiar para diretório específico no armazenamento
gemkanbino copy -t "backups"

# Nota: Comandos avançados de storage estarão disponíveis em versões futuras
```

## ☁️ Upload para Nuvem

O Gemkanbino suporta múltiplos provedores de upload na nuvem:

```bash
# Upload do arquivo selecionado
gemkanbino upload

# Upload com provedor específico
gemkanbino upload -p fileio

# Upload direto de arquivo
gemkanbino upload /caminho/do/arquivo.pdf

# Upload com provedor específico
gemkanbino upload /caminho/arquivo.txt -p transfersh
```

### Provedores Disponíveis

| Provedor | Limite | Expiração | Descrição |
|----------|--------|-----------|-----------|
| `fileio` | 2GB | 14 dias | Upload rápido e simples |
| `transfersh` | 10GB | 30 dias | Ideal para arquivos grandes |

### Opções de Upload

| Opção | Descrição |
|-------|-----------|
| `-p, --provider`: Provedor de upload (fileio, transfersh) |

**Nota:** Funcionalidades avançadas como upload em lote, histórico e estatísticas estarão disponíveis em versões futuras.

## 📖 Criação de Histórias

O Gemkanbino inclui um sistema completo de criação de histórias fictícias com templates personalizáveis. A funcionalidade principal atualmente disponível é o template "Guerra dos Irmãos".

### Template: Guerra dos Irmãos

Cria uma história fictícia sobre dois irmãos que brigaram por 5 anos pelo controle dos maiores planetas do universo.

```bash
# Criar história básica
gemkanbino create_story "A Guerra dos Planetas"

# Criar com opções personalizadas em modo interativo
gemkanbino create_story -i

# Ver templates disponíveis
gemkanbino list_templates
```

### Características do Template

- **5 Capítulos**: Cada capítulo representa um ano da guerra
- **Personagens Personalizáveis**: Nomes dos irmãos e planetas
- **Múltiplos Finais**: Escolha entre reconciliação, vitória, tragédia ou mistério
- **Gênero**: Ficção Científica, Drama, Guerra
- **Word Count**: ~5000 palavras

### Workflow Completo de Criação

```bash
# 1. Listar templates disponíveis
gemkanbino list_templates

# 2. Criar história em modo interativo
gemkanbino create_story -i
# Ou criar diretamente com template padrão
gemkanbino create_story "Minha Guerra Espacial"

# 3. Listar todas as histórias
gemkanbino list_stories

# 4. Ver preview de uma história
gemkanbino show_story "Minha Guerra Espacial" -p -l 10

# 5. Ler a história completa
gemkanbino show_story "Minha Guerra Espacial"

# 6. Buscar histórias por conteúdo
gemkanbino search_stories "irmãos"
gemkanbino search_stories "planetas"

# 7. Ver informações detalhadas
gemkanbino story_info "Minha Guerra Espacial"

# 8. Exportar para diferentes formatos
gemkanbino export_story "Minha Guerra Espacial" -f markdown
gemkanbino export_story "Minha Guerra Espacial" -f html
gemkanbino export_story "Minha Guerra Espacial" -f pdf -d ./exports/

# 9. Ver estatísticas do armazenamento
gemkanbino story_stats

# 10. Limpar histórias corrompidas (se necessário)
gemkanbino cleanup_stories
```

### Formatos de Exportação

| Formato | Extensão | Descrição |
|---------|----------|-----------|
| `markdown` | `.md` | Formato Markdown ideal para leitura |
| `html` | `.html` | Página web com formatação avançada |
| `pdf` | `.pdf` | Documento PDF (requere ferramentas adicionais) |
| `txt` | `.txt` | Texto puro sem formatação |

### Estrutura de Armazenamento

As histórias são salvas em `~/.gemkanbino/stories/` com a seguinte estrutura:

```
~/.gemkanbino/stories/
├── stories_index.json          # Índice de todas as histórias
└── minha_guerra_espacial/     # Diretório da história
    ├── minha_guerra_espacial.md    # Versão Markdown
    ├── metadata.json               # Metadados da história
    └── story_data.json             # Dados estruturados
```

### Configurações de Histórias

```bash
# Ver configurações de histórias
gemkanbino config stories

# Configurar diretório de armazenamento
gemkanbino config stories.directory /custom/stories/path

# Definir template padrão
gemkanbino config stories.default_template guerra_irmaos_planetas

# Configurar formato de exportação padrão
gemkanbino config stories.export_format pdf

# Limitar tamanho do título
gemkanbino config stories.max_title_length 100
```

## 🎯 Exemplos Práticos e Casos de Uso

### Workflow de Backup

```bash
# 1. Navegar até os documentos
gemkanbino cd ~/Documents

# 2. Listar arquivos PDF
gemkanbino ls *.pdf

# 3. Selecionar arquivo importante
gemkanbino select relatorio_financeiro.pdf

# 4. Fazer backup local
gemkanbino copy -t "backups_2024"

# 5. Upload para nuvem
gemkanbino upload -p fileio
```

### Compartilhamento de Arquivos

```bash
# Upload rápido para compartilhar
gemkanbino upload apresentacao.pptx -p transfersh

# Upload de arquivo específico
gemkanbino upload /caminho/do/projeto.zip -p fileio
```

### Gerenciamento de Armazenamento

```bash
# Ver arquivos armazenados
gemkanbino list

# Selecionar e copiar arquivo para backup
gemkanbino select documento_importante.pdf
gemkanbino copy -t "backups_2024"

# Ver informações do arquivo
gemkanbino info
```

### Criação de Histórias

```bash
# Criar história rápida
gemkanbino create_story "A Batalha de Andrômeda"

# Criar história personalizada
gemkanbino create_story "Guerra dos Gêmeos" -i

# Ver todas as histórias
gemkanbino list_stories

# Buscar histórias sobre guerra
gemkanbino search_stories "guerra"

# Ler uma história
gemkanbino show_story "A Batalha de Andrômeda"

# Exportar história para PDF
gemkanbino export_story "A Batalha de Andrômeda" -f pdf -d ./exports/
```

### Workflow de Escrita Criativa

```bash
# 1. Explorar templates disponíveis
gemkanbino list_templates

# 2. Criar múltiplas histórias com variações
gemkanbino create_story "Versão 1: Reconciliação"
gemkanbino create_story "Versão 2: Tragédia"

# 3. Comparar histórias
gemkanbino list_stories -f detailed

# 4. Preview das histórias
gemkanbino show_story "Versão 1: Reconciliação" -p -l 15
gemkanbino show_story "Versão 2: Tragédia" -p -l 15

# 5. Exportar para diferentes formatos
gemkanbino export_story "Versão 1: Reconciliação" -f html
gemkanbino export_story "Versão 2: Tragédia" -f markdown

# 6. Ver estatísticas
gemkanbino story_stats
```

### Modo Interativo

```bash
# Iniciar modo interativo
gemkanbino interactive

# Dentro do modo interativo, você pode usar:
> pwd                    # Mostra diretório atual
> ls -la                 # Lista arquivos detalhados
> select arquivo.txt     # Seleciona arquivo
> info                   # Mostra informações
> upload -p fileio       # Faz upload
> create_story "Nova"    # Cria nova história
> list_stories           # Lista histórias
> show_story "História"  # Mostra história
> exit                   # Sai do modo interativo
```

## ⚙️ Configuração Avançada

### Configurações Básicas

```bash
# Ver todas as configurações
gemkanbino config

# Ver configuração específica
gemkanbino config storage.max_size

# Definir limite de armazenamento
gemkanbino config storage.max_size 5GB

# Definir provedor padrão de upload
gemkanbino config upload.default_provider fileio

# Definir diretório de armazenamento customizado
gemkanbino config storage.path /custom/storage/path
```

### Arquivo de Configuração

As configurações são armazenadas em `~/.gemkanbino/config.yml`:

```yaml
storage:
  max_size: "1GB"
  path: "~/.gemkanbino/storage"
  auto_compress: true
  compress_after_days: 30

upload:
  default_provider: "fileio"
  max_file_size: "100MB"
  history_size: 100

ui:
  colors: true
  progress_bars: true
  confirm_deletions: true

providers:
  fileio:
    enabled: true
    api_key: null
  transfersh:
    enabled: true
    base_url: "https://transfer.sh"
```

### Configurações de Provedores

```bash
# Testar provedor
gemkanbino upload test fileio

# Ver provedores disponíveis
gemkanbino upload providers

# Configurar API key (se necessário)
gemkanbino config providers.fileio.api_key SUA_API_KEY
```

## 📖 Referência de Comandos

### Estrutura de Comandos

```
gemkanbino
├── Comandos Principais
│   ├── pwd                      # Mostrar diretório atual
│   ├── ls [PATH]               # Listar arquivos
│   ├── cd PATH                 # Mudar diretório
│   ├── select FILE             # Selecionar arquivo
│   ├── info [FILE]             # Informações do arquivo
│   ├── copy [FILE]             # Copiar para armazenamento
│   ├── upload [FILE]           # Upload para nuvem
│   ├── list                    # Listar arquivos armazenados
│   ├── config [KEY] [VALUE]    # Configurações
│   ├── interactive             # Modo interativo
│   └── version                 # Versão
│
├── Comandos de Histórias
│   ├── create_story TITLE      # Criar nova história
│   ├── list_stories [FILTER]   # Listar histórias
│   ├── show_story TITLE        # Mostrar história
│   ├── delete_story TITLE      # Deletar história
│   ├── search_stories QUERY    # Buscar histórias
│   ├── export_story TITLE      # Exportar história
│   ├── list_templates          # Listar templates
│   ├── story_info TITLE        # Informações da história
│   ├── story_stats             # Estatísticas de histórias
│   └── cleanup_stories         # Limpar armazenamento
│
└── Atalhos
    ├── -v, --version           # Mostrar versão
    ├── -h, --help              # Mostrar ajuda
    └── help [comando]          # Ajuda de comando específico
```

### Atalhos

```bash
# Versão
gemkanbino -v
gemkanbino --version

# Ajuda
gemkanbino -h
gemkanbino --help
gemkanbino help [comando]
```

## 🔧 Solução de Problemas

### Problemas Comuns

#### 1. Gem não encontrada
```bash
# Verificar instalação
gem list gemkanbino

# Reinstalar se necessário
gem uninstall gemkanbino
gem install gemkanbino
```

#### 2. Permissões negadas
```bash
# Verificar permissões do diretório de armazenamento
ls -la ~/.gemkanbino/

# Corrigir permissões
chmod 755 ~/.gemkanbino/
chmod 644 ~/.gemkanbino/storage/*
```

#### 3. Upload falha
```bash
# Verificar tamanho do arquivo
gemkanbino info arquivo_grande.iso

# Tentar com provedor diferente
gemkanbino upload arquivo.txt -p transfersh

# Verificar se arquivo existe
gemkanbino ls /caminho/do/arquivo
```

#### 4. Problemas com armazenamento local
```bash
# Ver arquivos armazenados
gemkanbino list

# Verificar espaço em disco
df -h

# Limpar arquivos antigos manualmente se necessário
rm -rf ~/.gemkanbino/storage/*
```

#### 5. Problemas com Criação de Histórias

```bash
# Ver se templates estão carregados
gemkanbino list_templates

# Verificar armazenamento de histórias
gemkanbino story_stats

# Limpar histórias corrompidas
gemkanbino cleanup_stories

# Verificar permissões do diretório de histórias
ls -la ~/.gemkanbino/stories/

# Recriar diretório se necessário
mkdir -p ~/.gemkanbino/stories
chmod 755 ~/.gemkanbino/stories
```

#### 6. Erro na Exportação de Histórias

```bash
# Para PDF export, verificar se há ferramentas instaladas
which wkhtmltopdf
which pandoc
which chrome

# Instalar ferramentas se necessário (ex: Ubuntu/Debian)
sudo apt update
sudo apt install wkhtmltopdf pandoc

# Tentar exportar em outro formato
gemkanbino export_story "Minha História" -f markdown
gemkanbino export_story "Minha História" -f html
```

### Modo Verbose

Para debug avançado, execute com variáveis de ambiente:

```bash
# Ativar logs detalhados
GEMKANBINO_DEBUG=1 gemkanbino [comando]

# Desativar cores
GEMKANBINO_NO_COLOR=1 gemkanbino [comando]

# Modo silencioso
GEMKANBINO_QUIET=1 gemkanbino [comando]
```

### Reset de Configuração

```bash
# Remover configuração (cuidado!)
rm -rf ~/.gemkanbino/

# Recriar configuração padrão
gemkanbino config
```

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Desenvolvimento

```bash
# Clonar repositório
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# Instalar dependências
bundle install

# Executar testes
bundle exec rake

# Executar linting
bundle exec rubocop

# Instalar localmente para desenvolvimento
bundle exec rake install
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🔗 Links Úteis

- [Repositório Principal](https://github.com/VictorHSCosta/kanbino)
- [Issues e Bug Reports](https://github.com/VictorHSCosta/kanbino/issues)
- [Guia de Testes](TESTING.md)
- [Changelog](CHANGELOG.md)

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:

- Abra uma issue no [GitHub](https://github.com/VictorHSCosta/kanbino/issues)
- Consulte o [Guia de Testes](TESTING.md) para desenvolvimento
- Verifique a [solução de problemas](#solução-de-problemas) acima

---

**Gemkanbino** - Gerenciamento de arquivos simples e eficiente direto do seu terminal!