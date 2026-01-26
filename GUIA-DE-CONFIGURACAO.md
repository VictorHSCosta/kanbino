# 🚀 Guia de Configuração do Kanbino

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)

Este guia fornece instruções passo a passo para configurar o ambiente de desenvolvimento do **Kanbino** do zero. Siga este documento para preparar seu ambiente e iniciar o desenvolvimento.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente)
- [Configuração do Google OAuth](#configuração-do-google-oauth)
- [Configuração do LinkedIn OAuth](#configuração-do-linkedin-oauth)
- [Scripts de Desenvolvimento](#scripts-de-desenvolvimento)
- [Verificação da Instalação](#verificação-da-instalação)
- [Solução de Problemas](#solução-de-problemas)
- [Próximos Passos](#próximos-passos)
- [Recursos Adicionais](#recursos-adicionais)

---

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

### ✅ Obrigatório

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0 (vem com o Node.js)
- **Git** (para clonar o repositório)

### 🔧 Como Instalar o Node.js 20+

#### Linux (Ubuntu/Debian)

```bash
# Adicionar repositório do NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar o Node.js
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

#### macOS (usando Homebrew)

```bash
# Instalar o Homebrew (se ainda não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js 20
brew install node@20

# Verificar instalação
node --version
npm --version
```

#### Windows

1. Acesse [nodejs.org](https://nodejs.org/)
2. Baixe o instalador LTS versão 20 ou superior
3. Execute o instalador com as opções padrão
4. Reinicie o terminal/computador
5. Verifique a instalação:

```bash
node --version
npm --version
```

### 🔍 Verificar Instalação

Execute os seguintes comandos para verificar se tudo está instalado corretamente:

```bash
# Verificar versão do Node.js (deve ser >= 20.0.0)
node --version

# Verificar versão do npm (deve ser >= 9.0.0)
npm --version

# Verificar versão do Git
git --version
```

### ⚠️ Nota Importante sobre ESM

O Kanbino utiliza **ESM Modules** (EcmaScript Modules). Por isso:

- **Node.js 20+ é obrigatório** para suporte completo a ESM
- Todos os imports TypeScript devem usar extensões `.js`
- O projeto está configurado com `"type": "module"` no package.json

---

## Instalação

Siga estes passos para configurar o projeto do zero:

### 1. Clone o Repositório

```bash
# Clonar o repositório
git clone https://github.com/VictorHSCosta/kanbino.git

# Entrar no diretório do projeto
cd kanbino
```

### 2. Instale as Dependências

```bash
# Instalar todas as dependências (backend e frontend)
npm install
```

Este comando irá:
- Instalar dependências do backend (Express, TypeScript, Jest, etc.)
- Instalar dependências do frontend (React, Vite, Tailwind CSS, etc.)
- Configurar automaticamente todos os pacotes necessários

**Tempo estimado:** 2-5 minutos (dependendo da sua conexão com a internet)

### 3. Crie os Arquivos de Ambiente

#### Backend (.env)

```bash
# Copiar o template de exemplo
cp .env.example .env
```

#### Frontend (.env.development)

```bash
# Copiar o template de exemplo
cp frontend/.env.example frontend/.env.development
```

### 4. Configure as Variáveis de Ambiente

Edite o arquivo `.env` recém-criado e configure as variáveis necessárias. Veja a seção [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente) para detalhes.

**Mínimo para desenvolvimento local:**

```bash
# .env
NODE_ENV=development
PORT=3000
SESSION_SECRET=alguma_string_segura_aqui
```

### 5. Instale os Hooks Git (Opcional)

```bash
# Instalar Husky para git hooks
npm run prepare
```

Isso configurará hooks automáticos para lint e testes antes de commits.

---

## Configuração das Variáveis de Ambiente

O Kanbino utiliza variáveis de ambiente para configuração. Todas as variáveis estão documentadas no arquivo `.env.example`.

### 📝 Variáveis do Backend (.env)

#### Configuração Básica da Aplicação

```bash
# Ambiente da aplicação
NODE_ENV=development        # Valores: development, production, test

# Porta do servidor HTTP
PORT=3000                   # Porta padrão para desenvolvimento local

# Nível de log
LOG_LEVEL=info             # Valores: debug, info, warn, error
```

#### Configuração da API

```bash
# URL base da API
API_BASE_URL=http://localhost:3000

# Timeout da API em milissegundos
API_TIMEOUT=30000          # 30 segundos
```

#### Configuração do Google OAuth

```bash
# Client ID do Google OAuth 2.0
GOOGLE_CLIENT_ID=seu_google_client_id_aqui

# Client Secret do Google OAuth 2.0
GOOGLE_CLIENT_SECRET=seu_google_client_secret_aqui

# URL de callback do Google OAuth
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

**Como obter credenciais do Google:** Veja a seção [Configuração do Google OAuth](#configuração-do-google-oauth)

#### Configuração do LinkedIn OAuth

```bash
# Client ID do LinkedIn OAuth 2.0
LINKEDIN_CLIENT_ID=seu_linkedin_client_id_aqui

# Client Secret do LinkedIn OAuth 2.0
LINKEDIN_CLIENT_SECRET=seu_linkedin_client_secret_aqui

# URL de callback do LinkedIn OAuth
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
```

**Como obter credenciais do LinkedIn:** Veja a seção [Configuração do LinkedIn OAuth](#configuração-do-linkedin-oauth)

#### Configuração de Sessão

```bash
# Segredo da sessão (MUITO IMPORTANTE: use uma string segura em produção!)
SESSION_SECRET=alguma_string_segura_aleatoria_muito_longa_e_complexa

# Nome do cookie de sessão
SESSION_NAME=kanbino.sid

# Tempo de vida da sessão em milissegundos (7 dias)
SESSION_MAX_AGE=604800000
```

**⚠️ AVISO DE SEGURANÇA:** Nunca use o valor padrão de `SESSION_SECRET` em produção. Gere uma string segura aleatória:

```bash
# Linux/macOS
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Configuração de Banco de Dados (Opcional)

```bash
# Descomente estas variáveis se for usar banco de dados
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=
# DATABASE_NAME=kanbino
```

**Nota:** O banco de dados é opcional. O projeto pode funcionar sem banco de dados para desenvolvimento básico.

### 📝 Variáveis do Frontend (frontend/.env.development)

```bash
# API Configuration
# URL base da API (será proxied pelo Vite para http://localhost:3000)
VITE_API_BASE_URL=/api
```

**Nota:** A variável `VITE_API_BASE_URL` usa `/api` como valor. O Vite configurará o proxy automaticamente para `http://localhost:3000/api`.

---

## Configuração do Google OAuth

Para habilitar autenticação com Google, você precisa criar um projeto no Google Cloud Console e obter credenciais OAuth.

### 📋 Passo a Passo

#### 1. Acessar o Google Cloud Console

1. Acesse [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Faça login com sua conta Google
3. Crie um novo projeto ou selecione um existente

#### 2. Criar um Projeto (se necessário)

1. Clique no dropdown de projetos na parte superior
2. Clique em **"NEW PROJECT"**
3. Dê um nome ao projeto (ex: "Kanbino Dev")
4. Clique em **"CREATE"**

#### 3. Configurar Tela de Consentimento OAuth

1. No menu lateral, vá para **"APIs & Services"** > **"OAuth consent screen"**
2. Escolha **"External"** (para desenvolvimento) e clique em **"CREATE"**
3. Preencha as informações obrigatórias:
   - **App name**: Kanbino
   - **User support email**: seu email
   - **Developer contact email**: seu email
4. Clique em **"SAVE AND CONTINUE"**
5. Pule as seções "Scopes" e "Test users" clicando em **"SAVE AND CONTINUE"**
6. Clique em **"BACK TO DASHBOARD"**

#### 4. Criar Credenciais OAuth 2.0

1. No menu lateral, vá para **"APIs & Services"** > **"Credentials"**
2. Clique em **"+ CREATE CREDENTIALS"**
3. Selecione **"OAuth client ID"**
4. Escolha o tipo de aplicação: **"Web application"**
5. Configure:
   - **Name**: Kanbino Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (frontend Vite)
     - `http://localhost:3000` (backend)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/google/callback`
6. Clique em **"CREATE"**

#### 5. Copiar Credenciais

Após criar, uma janela aparecerá com suas credenciais:

1. **Client ID**: Copie este valor para `GOOGLE_CLIENT_ID` no `.env`
2. **Client Secret**: Clique em "SHOW" e copie para `GOOGLE_CLIENT_SECRET` no `.env`

#### 6. Verificar Arquivo .env

Seu arquivo `.env` deve conter:

```bash
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz123456
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

#### 7. Ativar APIs Necessárias (se necessário)

1. No menu lateral, vá para **"APIs & Services"** > **"Library"**
2. Procure por "Google+ API" ou "People API"
3. Clique na API e depois em **"ENABLE"**

### ✅ Testar Autenticação Google

1. Inicie o servidor: `npm run dev`
2. Acesse `http://localhost:3000/api/auth/google` no navegador
3. Faça login com sua conta Google
4. Você deve ser redirecionado para a callback URL com sucesso

---

## Configuração do LinkedIn OAuth

Para habilitar autenticação com LinkedIn, você precisa criar um aplicativo no LinkedIn Developer Portal.

### 📋 Passo a Passo

#### 1. Acessar o LinkedIn Developer Portal

1. Acesse [https://www.linkedin.com/developers/](https://www.linkedin.com/developers/)
2. Faça login com sua conta LinkedIn

#### 2. Criar um Novo Aplicativo

1. Clique em **"Create App"** no canto superior direito
2. Preencha as informações obrigatórias:
   - **App name**: Kanbino Dev
   - **LinkedIn Page**: Selecione sua página ou crie uma nova
   - **App logo**: Faça upload de um logo (opcional)
3. Clique em **"Create App"**

#### 3. Configurar Informações do Aplicativo

Preencha as seguintes seções:

**Auth:**
- **Redirect URLs**: Adicione as seguintes URLs:
  - `http://localhost:3000/api/auth/linkedin/callback`
- **Default Auto-redirect URL**: `http://localhost:3000/api/auth/linkedin/callback`

**Application Permissions:**
- Selecione os seguintes escopos OAuth:
  - `r_liteprofile` (ou `profile` para informações completas)
  - `r_emailaddress` (para acessar o email)

#### 4. Copiar Credenciais

1. Na seção **"Auth"**, você encontrará:
   - **Client ID**: Copie para `LINKEDIN_CLIENT_ID` no `.env`
   - **Client Secret**: Clique em "Show" e copie para `LINKEDIN_CLIENT_SECRET` no `.env`

#### 5. Verificar Arquivo .env

Seu arquivo `.env` deve conter:

```bash
LINKEDIN_CLIENT_ID=86abc123defg4567
LINKEDIN_CLIENT_SECRET=abcdefgh12345678
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
```

#### 6. Aguardar Aprovação (Opcional)

Para desenvolvimento, as permissões básicas (`r_liteprofile`, `r_emailaddress`) geralmente são aprovadas automaticamente. Para produção, você pode precisar solicitar permissões adicionais que passam por revisão da LinkedIn.

### ✅ Testar Autenticação LinkedIn

1. Inicie o servidor: `npm run dev`
2. Acesse `http://localhost:3000/api/auth/linkedin` no navegador
3. Faça login com sua conta LinkedIn
4. Autorize o aplicativo
5. Você deve ser redirecionado para a callback URL com sucesso

---

## Scripts de Desenvolvimento

O Kanbino vem com vários scripts npm para facilitar o desenvolvimento.

### 🚀 Scripts Principais

#### Desenvolvimento Full Stack (Recomendado)

```bash
npm run dev:all
```

**O que faz:** Inicia o backend e o frontend simultaneamente
- Backend em http://localhost:3000
- Frontend em http://localhost:5173
- Hot reload automático em ambos

**Quando usar:** Para desenvolvimento full stack completo

#### Desenvolvimento Backend Apenas

```bash
npm run dev
```

**O que faz:** Inicia apenas o servidor backend com hot reload (nodemon)

**Quando usar:** Quando está trabalhando apenas no backend

#### Desenvolvimento Frontend Apenas

```bash
npm run dev:frontend
```

**O que faz:** Inicia apenas o servidor frontend com Vite HMR

**Quando usar:** Quando está trabalhando apenas no frontend

### 🏗️ Scripts de Build

```bash
# Compilar TypeScript do backend
npm run build

# Build do frontend para produção
npm run build:frontend

# Build de ambos (backend + frontend)
npm run build:all

# Compilar Tailwind CSS (desenvolvimento)
npm run build:css

# Compilar Tailwind CSS (produção, minificado)
npm run build:css:prod

# Watch mode para CSS (recompila ao salvar)
npm run build:css:watch
```

### 🧪 Scripts de Testes

```bash
# Executar todos os testes
npm test

# Executar apenas testes unitários
npm run test:unit

# Executar apenas testes de integração
npm run test:integration

# Executar apenas testes e2e
npm run test:e2e

# Testes em modo watch (interativo)
npm run test:watch

# Testes com relatório de cobertura
npm run test:coverage

# Testes verbosos (mais detalhes)
npm run test:verbose

# Testes silenciosos (menos output)
npm run test:silent

# Testes para CI/CD
npm run test:ci

# Testes com debugger
npm run test:debug
```

### 🔍 Scripts de Qualidade de Código

```bash
# Verificar problemas de linting
npm run lint

# Corrigir problemas de linting automaticamente
npm run lint:fix

# Format código com Prettier
npm run format

# Verificar formatação do código
npm run format:check

# Verificar tipos TypeScript (backend)
npm run type-check

# Verificar tipos TypeScript (frontend)
npm run type-check:frontend
```

### 🏃 Scripts de Produção

```bash
# Iniciar backend compilado
npm start

# Preview do frontend buildado
npm run preview:frontend
```

### Fluxos de Trabalho Recomendados

#### Fluxo 1: Desenvolvimento Full Stack

```bash
# Terminal 1
npm run dev:all
```

#### Fluxo 2: TDD (Test-Driven Development)

```bash
# Terminal 1: Testes em modo watch
npm run test:watch

# Terminal 2: Servidor de desenvolvimento
npm run dev:all
```

#### Fluxo 3: Desenvolvimento de CSS

```bash
# Terminal 1: Watch do CSS
npm run build:css:watch

# Terminal 2: Servidor
npm run dev:all
```

---

## Verificação da Instalação

Após configurar tudo, verifique se a instalação está funcionando corretamente.

### ✅ Checklist de Verificação

#### 1. Verificar Compilação TypeScript

```bash
# Backend
npm run type-check

# Frontend
npm run type-check:frontend
```

**Esperado:** Nenhum erro de TypeScript

#### 2. Verificar Linting

```bash
npm run lint
```

**Esperado:** Nenhum erro de linting (avisos são aceitáveis)

#### 3. Executar Testes

```bash
npm test
```

**Esperado:** Todos os testes passam

#### 4. Iniciar Servidor de Desenvolvimento

```bash
npm run dev:all
```

**Esperado:**
```
[backend] Server running on http://localhost:3000
[frontend] ➜  Local:   http://localhost:5173/
[frontend] ➜  Network: use --host to expose
```

#### 5. Acessar Backend

Abra no navegador ou use curl:

```bash
curl http://localhost:3000
```

**Esperado:** Resposta do servidor (JSON ou HTML)

#### 6. Acessar Frontend

Abra no navegador: [http://localhost:5173](http://localhost:5173)

**Esperado:** Página do Kanbino carrega corretamente

#### 7. Verificar API Proxy (do Frontend)

Com o frontend e backend rodando, acesse:
[http://localhost:5173/api/status](http://localhost:5173/api/status)

**Esperado:** Status da API retornada via proxy

#### 8. Verificar CSS do Tailwind

```bash
# Verificar se o CSS compilado existe
ls -la src/public/css/output.css
```

**Esperado:** Arquivo existe e contém classes do Tailwind

#### 9. Testar Upload de Arquivo (Opcional)

Se você implementou upload de fotos de perfil:

1. Acesse a página de perfil
2. Faça upload de uma imagem
3. Verifique se a imagem foi salva corretamente

#### 10. Verificar Cobertura de Testes

```bash
npm run test:coverage
```

**Esperado:** Cobertura >= 80% nas métricas principais

### 📊 Relatório de Verificação

Se todos os passos acima passaram, sua instalação está completa! 🎉

Se algo falhou, consulte a seção [Solução de Problemas](#solução-de-problemas).

---

## Solução de Problemas

Esta seção cobre problemas comuns e suas soluções.

### 🔧 Problema: Porta Já Em Uso

**Erro:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solução 1: Matar processo na porta 3000**

```bash
# Linux/macOS
lsof -ti:3000 | xargs kill -9

# Windows (Command Prompt)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

**Solução 2: Mudar a porta no .env**

```bash
# Editar .env
PORT=3001
```

### 🔧 Problema: Módulo Não Encontrado

**Erro:**
```
Cannot find module 'nome-do-modulo'
```

**Solução: Limpar cache e reinstalar**

```bash
# Remover node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar dependências
npm install

# Se o problema persistir no frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
```

### 🔧 Problema: Erros de Compilação TypeScript

**Erro:**
```
TS2307: Cannot find module './utils'
```

**Solução 1: Verificar extensões .js em imports**

O projeto usa ESM, então todos os imports devem usar `.js`:

```typescript
// ❌ ERRADO
import { myFunc } from './utils';

// ✅ CORRETO
import { myFunc } from './utils.js';
```

**Solução 2: Limpar cache do TypeScript**

```bash
# Remover diretório dist
rm -rf dist

# Rebuild
npm run build
```

**Solução 3: Verificar tsconfig.json**

Certifique-se de que `tsconfig.json` está correto:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### 🔧 Problema: Tailwind CSS Não Funciona

**Sintomas:**
- Estilos não são aplicados
- Classes do Tailwind não funcionam

**Solução 1: Compilar CSS**

```bash
npm run build:css
```

**Solução 2: Verificar arquivo de input**

Certifique-se de que `src/styles/input.css` contém:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Solução 3: Verificar arquivo de output**

```bash
# Verificar se output.css existe
cat src/public/css/output.css
```

Deve conter muitas classes CSS geradas pelo Tailwind.

**Solução 4: Usar modo watch**

```bash
npm run build:css:watch
```

### 🔧 Problema: Proxy Vite Não Funciona

**Sintomas:**
- Chamadas de API falham com 404
- Erros de CORS no console do navegador

**Solução 1: Verificar se backend está rodando**

```bash
curl http://localhost:3000
```

**Solução 2: Verificar configuração do proxy**

Verifique `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

**Solução 3: Verificar variável de ambiente do frontend**

`frontend/.env.development`:

```bash
VITE_API_BASE_URL=/api
```

### 🔧 Problema: OAuth Callback URL Incorreta

**Sintomas:**
- Erro "redirect_uri_mismatch" do Google
- Erro "invalid_redirect_uri" do LinkedIn

**Solução:**

1. **Verifique a URL no .env:**
   ```bash
   # Deve ser exatamente igual à configurada no console do provedor OAuth
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
   LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
   ```

2. **Verifique a configuração no console do provedor:**
   - Google Cloud Console > APIs & Services > Credentials
   - LinkedIn Developer Portal > Auth > Redirect URLs

3. **Certifique-se de não usar barra no final:**
   - ✅ `http://localhost:3000/api/auth/google/callback`
   - ❌ `http://localhost:3000/api/auth/google/callback/`

### 🔧 Problema: Testes Falhando

**Sintomas:**
- Testes falham com erros de import
- Erro "Jest encountered an unexpected token"

**Solução 1: Verificar configuração do Jest**

`jest.config.js` deve ter:

```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
```

**Solução 2: Usar .js em imports nos testes**

```typescript
// ❌ ERRADO
import { myFunc } from '../src/utils';

// ✅ CORRETO
import { myFunc } from '../src/utils.js';
```

**Solução 3: Limpar cache do Jest**

```bash
rm -rf node_modules/.cache
npm test
```

### 🔧 Problema: Husky Hooks Não Executam

**Sintomas:**
- Pre-commit hooks não são executados
- Lint não roda antes de commits

**Solução 1: Reinstalar Husky**

```bash
npm run prepare
# ou
npx husky install
```

**Solução 2: Verificar permissões**

```bash
ls -la .git/hooks/
```

Os arquivos devem ter permissão de execução.

**Solução 3: Verificar instalação**

```bash
npm ls husky
```

Deve mostrar a versão do Husky instalada.

### 🔧 Problema: CORS Errors

**Sintomas:**
- Erro "No 'Access-Control-Allow-Origin' header"
- Chamadas de API bloqueadas pelo navegador

**Solução 1: Verificar se backend está rodando**

```bash
npm run dev
```

**Solução 2: Verificar configuração de CORS**

No código do backend (`src/server.ts` ou similar):

```typescript
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
```

**Solução 3: Usar proxy do Vite**

Em vez de chamar `http://localhost:3000/api` diretamente, use `/api` e deixe o Vite fazer o proxy.

### 🔧 Problema: Build Falha em Produção

**Erro:**
```
Build failed with exit code 1
```

**Solução 1: Definir NODE_ENV**

```bash
# Linux/macOS
export NODE_ENV=production

# Windows (Command Prompt)
set NODE_ENV=production

# Windows (PowerShell)
$env:NODE_ENV="production"
```

**Solução 2: Verificar todas as variáveis de ambiente**

```bash
cat .env
```

Certifique-se de que todas as variáveis necessárias estão definidas.

**Solução 3: Executar pré-build checks**

```bash
npm run type-check
npm run lint
npm test
```

**Solução 4: Verificar espaço em disco**

```bash
df -h
```

Certifique-se de que há espaço suficiente em disco.

### 🆘 Ainda com Problemas?

Se você não conseguiu resolver o problema:

1. **Verifique os logs:** Veja se há mensagens de erro mais detalhadas
2. **Pesquise no GitHub:** [github.com/VictorHSCosta/kanbino/issues](https://github.com/VictorHSCosta/kanbino/issues)
3. **Crie uma nova issue** com:
   - Mensagem de erro completa
   - Passos para reproduzir
   - Seu sistema operacional
   - Versões do Node.js e npm
   - Comandos que você executou

---

## Próximos Passos

Parabéns! 🎉 Se você chegou até aqui e tudo está funcionando, seu ambiente está configurado e pronto para desenvolvimento.

### 📚 Onde Começar

#### 1. Explorar a Estrutura do Projeto

```bash
# Estrutura de diretórios
tree -L 2 -I 'node_modules|dist'
# ou
ls -R
```

**Diretórios importantes:**
- `src/` - Código fonte do backend
- `frontend/src/` - Código fonte do frontend React
- `tests/` - Suíte de testes
- `src/styles/` - Estilos Tailwind CSS

#### 2. Entender o Fluxo da Aplicação

**Backend:**
1. `src/index.ts` - Ponto de entrada do backend
2. `src/server.ts` - Configuração do Express
3. `src/routes/` - Definição de rotas da API
4. `src/controllers/` - Lógica de controle das rotas
5. `src/services/` - Lógica de negócio

**Frontend:**
1. `frontend/src/main.tsx` - Ponto de entrada do React
2. `frontend/src/App.tsx` - Componente principal
3. `frontend/src/components/` - Componentes React
4. `frontend/src/services/` - Clientes API

#### 3. Começar a Desenvolver

**Modo de desenvolvimento full stack:**

```bash
# Iniciar ambos os servidores
npm run dev:all
```

Agora você pode:
- Acessar o backend em http://localhost:3000
- Acessar o frontend em http://localhost:5173
- Fazer mudanças e ver hot reload automático

#### 4. Adicionar uma Nova Funcionalidade

**Exemplo: Adicionar uma nova página**

1. Criar componente em `frontend/src/pages/NovaPagina.tsx`
2. Adicionar rota no `App.tsx`
3. Criar serviço API em `frontend/src/services/novaPaginaService.ts`
4. Adicionar rota backend em `src/routes/novaPaginaRoutes.ts`
5. Adicionar controller em `src/controllers/novaPaginaController.ts`
6. Testar com testes unitários e de integração

#### 5. Executar Testes Durante Desenvolvimento

```bash
# Terminal 1: Testes em modo watch
npm run test:watch

# Terminal 2: Servidor de desenvolvimento
npm run dev:all
```

#### 6. Commit de Mudanças

```bash
# Verificar mudanças
git status

# Adicionar arquivos
git add .

# Commitar (Husky irá executar lint e testes automaticamente)
git commit -m "feat: adicionar nova funcionalidade"
```

#### 7. Criar uma Branch para Nova Funcionalidade

```bash
# Criar e mudar para nova branch
git checkout -b feature/minha-nova-funcionalidade

# Fazer mudanças...

# Commitar mudanças
git add .
git commit -m "feat: implementar nova funcionalidade"

# Push para origin
git push origin feature/minha-nova-funcionalidade
```

### 📖 Documentação Adicional

- **README.md** - Documentação completa do projeto (em inglês)
- **Arquivos de código** - Todos os arquivos estão comentados
- **Testes** - Os próprios testes servem como documentação de uso

### 🤝 Contribuindo com o Projeto

Se você quer contribuir com o Kanbino:

1. Leia o **README.md** para entender as convenções do projeto
2. Siga o fluxo de trabalho descrito na seção "Contributing" do README
3. Mantenha a cobertura de testes acima de 80%
4. Siga os padrões de código estabelecidos
5. Escreva mensagens de commit claras e descritivas

### 🎯 Recomendações de Desenvolvimento

#### Boas Práticas

1. **Use TypeScript strict mode** - O projeto já está configurado
2. **Escreva testes primeiro** (TDD) quando possível
3. **Commits pequenos e frequentes** - Melhor para revisão e debug
4. **Use branches para features** - Nunca commit direto na main
5. **Mantenha o estilo** - Use Prettier e ESLint
6. **Documente seu código** - Comentários onde a lógica não é óbvia

#### Ferramentas Recomendadas

- **VS Code** - Editor recomendado
- **ESLint extension** - Linting em tempo real
- **Prettier extension** - Formatação automática
- **Tailwind CSS IntelliSense** - Autocomplete para classes Tailwind
- **React Developer Tools** - Debug de componentes React

### 🚀 Próximos Passos no Aprendizado

1. **Aprofundar em TypeScript:** [TypeScript Handbook](https://www.typescriptlang.org/docs/)
2. **Melhorar habilidades React:** [React Documentation](https://react.dev/)
3. **Aprender sobre Testes:** [Jest Documentation](https://jestjs.io/docs/getting-started)
4. **Dominar Tailwind CSS:** [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## Recursos Adicionais

### 📚 Documentação Oficial

- **Node.js:** [https://nodejs.org/docs](https://nodejs.org/docs)
- **TypeScript:** [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **React:** [https://react.dev/](https://react.dev/)
- **Vite:** [https://vitejs.dev/guide/](https://vitejs.dev/guide/)
- **Tailwind CSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Express:** [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)
- **Jest:** [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)

### 🔗 Links Úteis para Configuração

#### Google OAuth
- **Google Cloud Console:** [https://console.cloud.google.com/](https://console.cloud.google.com/)
- **Guia OAuth 2.0:** [https://developers.google.com/identity/protocols/oauth2](https://developers.google.com/identity/protocols/oauth2)

#### LinkedIn OAuth
- **LinkedIn Developers:** [https://www.linkedin.com/developers/](https://www.linkedin.com/developers/)
- **Guia OAuth 2.0:** [https://learn.microsoft.com/en-us/linkedin/shared/references/v2/authentication/oauthentication-2-0](https://learn.microsoft.com/en-us/linkedin/shared/references/v2/authentication/oauthentication-2-0)

### 🛠️ Ferramentas de Desenvolvimento

#### VS Code Extensions
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [React/Redux snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

#### Browser Extensions
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Tailwind DevTools](https://chrome.google.com/webstore/detail/tailwind-devtools/)

### 📖 Tutoriais e Guias

- [TypeScript Best Practices](https://github.com/typescript-cheatsheets/react)
- [React Hooks Guide](https://react.dev/reference/react)
- [Testing React Components](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

### 💡 Comunidade

- **Stack Overflow (Node.js):** [https://stackoverflow.com/questions/tagged/node.js](https://stackoverflow.com/questions/tagged/node.js)
- **Stack Overflow (React):** [https://stackoverflow.com/questions/tagged/react](https://stackoverflow.com/questions/tagged/react)
- **TypeScript Community Discord:** [https://discord.gg/typescript](https://discord.gg/typescript)
- **React Discord:** [https://discord.gg/react](https://discord.gg/react)

### 📦 Projetos Relacionados

- [Create React App](https://create-react-app.dev/)
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)

---

## 🤝 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. **Leia este guia novamente** - A resposta pode estar aqui
2. **Consulte o README.md** - Documentação completa em inglês
3. **Pesquise Issues existentes** - [github.com/VictorHSCosta/kanbino/issues](https://github.com/VictorHSCosta/kanbino/issues)
4. **Crie uma nova Issue** - Se o problema não foi reportado

Ao criar uma issue, inclua:
- Mensagem de erro completa
- Passos para reproduzir o problema
- Seu sistema operacional e versão
- Versões do Node.js e npm (`node --version && npm --version`)
- Comandos que você executou

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Feito com ❤️ pela equipe Kanbino**

Para mais informações, visite o [Repositório GitHub](https://github.com/VictorHSCosta/kanbino)
