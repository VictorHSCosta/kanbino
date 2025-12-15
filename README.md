# Gemkanbino

Uma ferramenta CLI abrangente para gerenciamento de arquivos, navegação e uploads para nuvem. O Gemkanbino permite navegar pelo sistema de arquivos, selecionar arquivos, criar cópias locais e enviá-los para serviços de nuvem diretamente do seu terminal.

## 📋 Sumário

- [🚀 Instalação](#-instalação)
- [🏁 Tutorial Rápido: Primeiros Passos](#-tutorial-rápido-primeiros-passos)
- [📂 Comandos Básicos](#-comandos-básicos)
- [💾 Gerenciamento de Armazenamento Local](#-gerenciamento-de-armazenamento-local)
- [☁️ Upload para Nuvem](#-upload-para-nuvem)
- [🎯 Exemplos Práticos e Casos de Uso](#-exemplos-práticos-e-casos-de-uso)
- [⚙️ Configuração Avançada](#️-configuração-avançada)
- [📖 Referência de Comandos](#-referência-de-comandos)
- [❓ Perguntas Frequentes (FAQ)](#-perguntas-frequentes-faq)
- [🔧 Solução de Problemas](#-solução-de-problemas)
- [🗺️ Roadmap e Funcionalidades Futuras](#️-roadmap-e-funcionalidades-futuras)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 🚀 Instalação

### Pré-requisitos

- Ruby 3.2.0 ou superior
- Bundler (recomendado)

### Instalação via Gem

```bash
# Instalar a gem diretamente do RubyGems
gem install gemkanbino

# Ou via Bundler (recomendado para projetos)
echo "gem 'gemkanbino'" >> Gemfile
bundle install
```

### Instalação a partir do código-fonte

```bash
# Clonar o repositório
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# Instalar dependências de desenvolvimento
bundle install

# Construir e instalar a gem localmente
rake build
gem install pkg/gemkanbino-*.gem

# Ou usar rake install para desenvolvimento
bundle exec rake install
```

### Verificar Instalação

```bash
# Verificar se a gem foi instalada corretamente
gem list gemkanbino

# Verificar versão instalada
gemkanbino version
# Saída esperada: "Gemkanbino version X.X.X"

# Verificar ajuda geral
gemkanbino --help

# Testar comando básico
gemkanbino pwd
# Deve mostrar o diretório atual
```

## 🏁 Tutorial Rápido: Primeiros Passos

### 1. Navegação Básica

```bash
# Mostrar diretório atual
gemkanbino pwd
# 📁 /home/user/Documents

# Listar arquivos no diretório atual
gemkanbino ls
# 📄 relatorio.pdf
# 📁 imagens/
# 📄 notas.txt
# 📄 projeto.zip

# Listar arquivos com detalhes (formato longo)
gemkanbino ls -l
# 📄 relatorio.pdf     1.2 MB  2024-01-15 14:30
# 📁 imagens/          -       2024-01-10 09:15
# 📄 notas.txt         2.5 KB  2024-01-14 16:45
# 📄 projeto.zip       15.8 MB 2024-01-12 11:20

# Listar todos os arquivos (incluindo ocultos)
gemkanbino ls -a
# 📄 relatorio.pdf
# 📁 .config/
# 📁 imagens/
# 📄 .gitignore
# 📄 notas.txt

# Mudar para um diretório
gemkanbino cd /home/user/Downloads
# 📁 Diretório alterado para /home/user/Downloads

# Listar arquivos em outro diretório sem mudar de pasta
gemkanbino ls /home/user/Pictures
# 📸 foto1.jpg
# 📸 vacation.png
```

### 2. Selecionar e Visualizar Arquivos

```bash
# Selecionar um arquivo específico
gemkanbino select arquivo.txt
# ✅ Arquivo 'arquivo.txt' selecionado com sucesso!

# Ver informações do arquivo selecionado
gemkanbino info
# 📄 Nome: arquivo.txt
# 📏 Tamanho: 2.5 KB
# 📅 Modificado: 2024-01-15 14:30:22
# 📁 Caminho: /home/user/documentos/arquivo.txt

# Ver informações de um arquivo sem selecioná-lo
gemkanbino info /caminho/do/arquivo.pdf
# 📄 Nome: relatorio.pdf
# 📏 Tamanho: 1.2 MB
# 📅 Modificado: 2024-01-10 09:15:33
# 📁 Caminho: /home/user/documentos/relatorio.pdf
```

### 3. Copiar para Armazenamento Local

```bash
# Copiar arquivo selecionado para armazenamento local
gemkanbino copy
# 💾 Arquivo copiado para ~/.gemkanbino/storage/

# Copiar arquivo específico para armazenamento
gemkanbino copy /caminho/do/arquivo.jpg
# 📸 'arquivo.jpg' copiado com sucesso!

# Copiar para um diretório específico no armazenamento
gemkanbino copy -t "imagens"
# 📁 Arquivo salvo em: ~/.gemkanbino/storage/imagens/arquivo.jpg

# Ver todos os arquivos armazenados
gemkanbino list
# 📋 Arquivos armazenados:
# 📄 arquivo.txt (2.5 KB) - 2024-01-15 14:30:22
# 📸 arquivo.jpg (450 KB) - 2024-01-15 14:31:45
```

### 4. Upload para Nuvem

```bash
# Upload do arquivo selecionado
gemkanbino upload
# 🚀 Fazendo upload com provedor padrão (fileio)...

# Upload com provedor específico
gemkanbino upload -p fileio
# ⬆️ Upload para file.io iniciado...
# 🔗 Link: https://file.io/abc123xyz
# ✅ Upload concluído!

# Upload direto de arquivo
gemkanbino upload /caminho/do/documento.pdf -p transfersh
# 📤 Enviando documento.pdf (1.2 MB) para transfer.sh...
# 🔗 Link: https://transfer.sh/documento.pdf
# ✅ Link válido por 30 dias
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

### Workflow de Backup Completo

```bash
# 1. Navegar até os documentos
gemkanbino cd ~/Documents
# 📁 Diretório alterado para /home/user/Documents

# 2. Listar arquivos PDF importantes
gemkanbino ls *.pdf
# 📄 relatorio_financeiro.pdf (2.1 MB)
# 📄 contrato_2024.pdf (450 KB)
# 📄 fatura_janeiro.pdf (125 KB)

# 3. Selecionar arquivo importante
gemkanbino select relatorio_financeiro.pdf
# ✅ Arquivo 'relatorio_financeiro.pdf' selecionado com sucesso!

# 4. Ver informações antes do backup
gemkanbino info
# 📄 Nome: relatorio_financeiro.pdf
# 📏 Tamanho: 2.1 MB
# 📅 Modificado: 2024-01-15 14:30:22

# 5. Fazer backup local organizado
gemkanbino copy -t "backups_2024"
# 💾 Arquivo salvo em: ~/.gemkanbino/storage/backups_2024/

# 6. Upload para nuvem para compartilhamento
gemkanbino upload -p fileio
# 🔗 Link gerado: https://file.io/abc123xyz
# ✅ Upload concluído! Link válido por 14 dias.
```

### Casos de Uso Específicos

#### Para Desenvolvedores
```bash
# Compartilhar código rapidamente
gemkanbino cd ~/Projects/myapp
gemkanbino select app.zip
gemkanbino upload -p transfersh
# 🔗 https://transfer.sh/app.zip (válido por 30 dias)

# Backup de versões antes de mudanças importantes
gemkanbino copy main.py -t "version_backups"
gemkanbino copy config.json -t "version_backups"
gemkanbino list
```

#### Para Estudantes
```bash
# Organizar trabalhos acadêmicos
gemkanbino cd ~/University/2024/Semester1
gemkanbino copy essay_final.pdf -t "academic_work"
gemkanbino copy research_data.xlsx -t "academic_work"

# Compartilhar trabalhos com professores
gemkanbino upload essay_final.pdf -p fileio
# 🔗 Link para enviar ao professor
```

#### Para Profissionais
```bash
# Gerenciar documentos de trabalho
gemkanbino cd ~/Work/Reports
gemkanbino select monthly_report_january.pdf
gemkanbino info
gemkanbino copy -t "work_reports_2024"
gemkanbino upload -p fileio

# Backup rápido antes de viajar
gemkanbino cd ~/Documents/Important
gemkanbino copy passport.pdf -t "travel_docs"
gemkanbino copy visa.pdf -t "travel_docs"
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
# 🎯 Bem-vindo ao modo interativo do Gemkanbino!
# Digite 'help' para ver comandos disponíveis ou 'exit' para sair.

# Dentro do modo interativo, você pode usar:
> pwd                    # Mostra diretório atual
> ls -la                 # Lista arquivos detalhados
> select arquivo.txt     # Seleciona arquivo
> info                   # Mostra informações
> upload -p fileio       # Faz upload
> copy -t backup         # Copia para diretório backup
> list                   # Lista arquivos armazenados
> exit                   # Sai do modo interativo
```

### Fluxo de Trabalho Completo

```bash
# Exemplo 1: Compartilhar um PDF rapidamente
gemkanbino cd ~/Documents
gemkanbino ls *.pdf
gemkanbino select relatorio_mensal.pdf
gemkanbino info
gemkanbino upload -p fileio
# 🔗 Link gerado: https://file.io/abc123

# Exemplo 2: Backup organizado de fotos
gemkanbino cd ~/Pictures
gemkanbino ls *.jpg
gemkanbino copy foto_vacacao.jpg -t "backup_2024"
gemkanbino copy foto_familia.jpg -t "backup_2024"
gemkanbino list
# 📋 Arquivos em backup_2024:
# 📸 foto_vacacao.jpg (2.1 MB)
# 📸 foto_familia.jpg (1.8 MB)

# Exemplo 3: Gerenciar arquivos de projeto
gemkanbino cd ~/Projects/myapp
gemkanbino ls
gemkanbino select projeto_final.zip
gemkanbino upload -p transfersh
gemkanbino copy -t "project_backups"
```

### Dicas e Truques

```bash
# Combinar comandos para fluxos eficientes
# 1. Ver informações antes de fazer upload
gemkanbino info arquivo_grande.iso
gemkanbino upload arquivo_grande.iso -p transfersh  # melhor para arquivos grandes

# 2. Usar atalhos para comandos frequentes
gemkanbino -v          # versão curta
gemkanbino -h          # ajuda curta

# 3. Navegação rápida
gemkanbino cd ~/Downloads  # vai para Downloads
gemkanbino pwd             # verifica onde está
gemkanbino ls -l           # vê detalhes dos arquivos

# 4. Backup antes de upload
gemkanbino select documento_importante.pdf
gemkanbino copy -t "antes_upload"
gemkanbino upload -p fileio

# 5. Verificar storage periodicamente
gemkanbino list
# 📋 Total de 12 arquivos armazenados (45.2 MB)
```

## ⚙️ Configuração Avançada

### Configurações Básicas

```bash
# Ver todas as configurações atuais
gemkanbino config
# ⚙️ Configurações atuais:
# 💾 storage.max_size: 1GB
# ☁️ upload.default_provider: fileio
# 📁 storage.path: ~/.gemkanbino/storage
# 🎨 ui.colors: true

# Ver configuração específica
gemkanbino config storage.max_size
# 💾 storage.max_size: 1GB

# Definir limite de armazenamento
gemkanbino config storage.max_size 5GB
# ✅ Limite de armazenamento definido para 5GB

# Definir provedor padrão de upload
gemkanbino config upload.default_provider fileio
# ✅ Provedor padrão definido como fileio

# Definir diretório de armazenamento customizado
gemkanbino config storage.path /custom/storage/path
# ✅ Diretório de armazenamento alterado

# Configurar compressão automática
gemkanbino config storage.auto_compress true
# ✅ Compressão automática ativada

# Definir tamanho máximo para upload
gemkanbino config upload.max_file_size 500MB
# ✅ Tamanho máximo de upload definido
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

## ❓ Perguntas Frequentes (FAQ)

### Dúvidas Gerais

**Q: Onde os arquivos são armazenados localmente?**
R: Os arquivos são copiados para `~/.gemkanbino/storage/` por padrão. Você pode alterar este diretório nas configurações.

**Q: Quais são os limites dos provedores de nuvem?**
R: File.io aceita até 2GB (14 dias de validade) e Transfer.sh aceita até 10GB (30 dias de validade).

**Q: Posso usar o Gemkanbino em múltiplos computadores?**
R: Sim! As configurações ficam em cada máquina, mas você pode sincronizar manualmente o diretório `~/.gemkanbino/`.

**Q: O Gemkanbino funciona no Windows?**
R: Sim! O Gemkanbino é compatível com Windows, macOS e Linux, desde que o Ruby 3.2+ esteja instalado.

### Dúvidas Técnicas

**Q: Como desinstalo completamente o Gemkanbino?**
R: Execute `gem uninstall gemkanbino` e remova o diretório `~/.gemkanbino/` se desejar limpar todos os dados.

**Q: Posso usar proxies ou VPNs?**
R: Sim, os uploads respeitarão as configurações de proxy do seu sistema operacional.

**Q: O Gemkanbino armazena minhas senhas?**
R: Não! O Gemkanbino não armazena credenciais. Os links de upload são gerados diretamente pelos provedores.

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

## 🗺️ Roadmap e Funcionalidades Futuras

### Planejado para Próximas Versões

- **Upload em lote**: Fazer upload de múltiplos arquivos simultaneamente
- **Histórico de uploads**: Registro dos links gerados e datas de expiração
- **Sincronização na nuvem**: Opção de sincronizar storage local com serviços como Google Drive, Dropbox
- **Interface gráfica (GUI)**: Versão visual para usuários que preferem interface gráfica
- **Integração com editores**: Plugin para VS Code, Vim e outros editores
- **Scripts automatizados**: Suporte a scripts para backups automáticos
- **Mais provedores**: Integração com WeTransfer, Imgur, GitHub Gist
- **Compressão automática**: Compressão de arquivos antes do upload
- **Criptografia**: Opção de criptografar arquivos antes de armazenar

### Funcionalidades em Desenvolvimento

- **Modo de observação**: Monitorar diretórios e automaticamente fazer backup de novos arquivos
- **Filtros avançados**: Busca e seleção de arquivos por padrões mais complexos
- **Estatísticas de uso**: Relatórios sobre espaço utilizado e frequência de uploads
- **Atalhos personalizados**: Criar atalhos para workflows frequentes
- **Integração com git**: Upload automático de artefatos de build

### Como Contribuir

Estamos sempre abertos a sugestões! Você pode:
- Abrir issues com novas ideias no [GitHub](https://github.com/VictorHSCosta/kanbino/issues)
- Enviar Pull Requests com novas funcionalidades
- Reportar bugs e problemas encontrados
- Sugerir melhorias na documentação

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