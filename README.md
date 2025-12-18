# Gemkanbino

Uma ferramenta CLI abrangente para gerenciamento de arquivos, navegação, uploads para nuvem e geração de histórias ficcionais. O Gemkanbino permite navegar pelo sistema de arquivos, selecionar arquivos, criar cópias locais, enviá-los para serviços de nuvem e gerar histórias criativas sobre a guerra dos 5 anos entre dois irmãos pelos maiores planetas do universo.

## 📋 Sumário

- [Instalação](#instalação)
- [Tutorial Rápido](#tutorial-rápido-primeiros-passos)
- [Comandos Básicos](#comandos-básicos)
- [Geração de Histórias](#geração-de-histórias)
- [Gerenciamento de Armazenamento Local](#gerenciamento-de-armazenamento-local)
- [Upload para Nuvem](#upload-para-nuvem)
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

### Geração de Histórias

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `story` | Gera história sobre a guerra dos 5 anos | `gemkanbino story` |
| `stories` | Gerencia histórias salvas | `gemkanbino stories --action list` |

**Opções do comando `story`:**
- `-t, --title`: Título personalizado para a história
- `-g, --genre`: Gênero da história (sci_fi, fantasy, drama)
- `-l, --length`: Comprimento da história (short, medium, long)
- `-i, --interactive`: Modo interativo com personalização
- `-s, --save`: Salvar história no armazenamento local
- `--variation`: Nível de variação de conteúdo (none, low, medium, high)

**Opções do comando `stories`:**
- `-a, --action`: Ação a executar (list, show, delete)
- `-t, --title`: Título da história para ações show/delete

### Utilidades

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `list` | Lista todos os arquivos armazenados | `gemkanbino list` |
| `config [KEY] [VALUE]` | Mostra ou define configurações | `gemkanbino config storage.max_size 1GB` |
| `interactive` | Inicia modo shell interativo | `gemkanbino interactive` |
| `version` | Mostra versão do gemkanbino | `gemkanbino version` |

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

## 📚 Geração de Histórias

O Gemkanbino possui um gerador de histórias ficcionais criativas sobre "a guerra dos 5 anos entre dois irmãos pelos maiores planetas do mundo". Esta funcionalidade utiliza templates variados e inteligência artificial para criar narrativas únicas e envolventes.

### História Padrão

```bash
# Gerar história básica
gemkanbino story

# Gerar com título personalizado
gemkanbino story -t "A Batalha dos Titãs Cósmicos"

# Gerar com gênero específico
gemkanbino story -g fantasy

# Gerar com diferentes comprimentos
gemkanbino story -l short
gemkanbino story -l long
```

### Modo Interativo

```bash
# Iniciar modo interativo com personalização
gemkanbino story -i

# O modo interativo solicitará:
# - Nome do irmão mais velho
# - Nome do irmão mais novo
# - Nome do primeiro planeta
# - Nome do segundo planeta
# - Nome da galáxia
```

### Variação de Conteúdo

```bash
# Gerar história com baixa variação
gemkanbino story --variation low

# Gerar com alta variação (mais diferente)
gemkanbino story --variation high

# Sem variação (reproduzível)
gemkanbino story --variation none
```

### Salvar e Gerenciar Histórias

```bash
# Gerar e salvar automaticamente
gemkanbino story -s -t "Minha História Épica"

# Listar todas as histórias salvas
gemkanbino stories --action list

# Visualizar uma história específica
gemkanbino stories --action show -t "Minha História Épica"

# Excluir uma história
gemkanbino stories --action delete -t "História Antiga"
```

### Estrutura da História Gerada

Cada história gerada segue uma estrutura narrativa completa:

1. **Introdução** - Contexto inicial do universo
2. **Personagens** - Dois irmãos com descrições detalhadas
3. **Cenário** - Planetas, galáxia e período temporal
4. **O Conflito** - Causa, escalada e consequências
5. **Desenvolvimento** - Cronologia dos 5 anos de guerra
6. **O Clímax** - Momento decisivo da narrativa
7. **Resolução** - Desfecho do conflito
8. **Epílogo** - Reflexão final e consequências

### Formatos de Saída

As histórias são geradas em formato Markdown com:

- **Títulos e subtítulos** hierarquicamente organizados
- **Metadados** completos (gênero, data de criação, tags)
- **Índice** navegável
- **Formatação** profissional com negritos e listas
- **Rodapé** com informações de autoria

### Exemplo de Uso Completo

```bash
# Workflow completo de criação de história
gemkanbino story \
  -t "A Guerra dos Planetas Gêmeos" \
  -g sci_fi \
  -l medium \
  --variation high \
  -s

# Gerenciar história criada
gemkanbino stories --action list
gemkanbino stories --action show -t "A Guerra dos Planetas Gêmeos"
```

### Configuração de Histórias

As configurações do gerador de histórias podem ser personalizadas:

```bash
# Ver configurações de histórias
gemkanbino config

# Definir gênero padrão
gemkanbino config general.default_genre fantasy

# Configurar diretório de histórias
gemkanbino config storage.stories_directory /path/to/stories
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
│   ├── story                   # Gerar história fictícia
│   ├── stories                 # Gerenciar histórias salvas
│   ├── config [KEY] [VALUE]    # Configurações
│   ├── interactive             # Modo interativo
│   └── version                 # Versão
│
├── Gerador de Histórias
│   ├── story -t TITLE          # Gerar com título personalizado
│   ├── story -g GENRE          # Especificar gênero (sci_fi, fantasy, drama)
│   ├── story -l LENGTH         # Comprimento (short, medium, long)
│   ├── story -i                # Modo interativo
│   ├── story -s                # Salvar história
│   ├── story --variation LEVEL # Nível de variação (none, low, medium, high)
│   │
│   └── stories --action ACTION # Gerenciar histórias
│       ├── list               # Listar histórias salvas
│       ├── show -t TITLE      # Mostrar história específica
│       └── delete -t TITLE    # Excluir história
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