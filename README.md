# Kanbino

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Fullstack TypeScript boilerplate com Node.js/Express, React/Vite, Tailwind CSS, autenticação OAuth (Google e LinkedIn) e suite de testes completa.

## Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológico](#stack-tecnológico)
- [Pré-requisitos](#pré-requisitos)
- [Quick Start](#quick-start)
- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação OAuth](#autenticação-oauth)
- [Testes](#testes)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

Kanbino é um boilerplate fullstack profissional construído com tecnologias modernas e melhores práticas. Fornece uma base sólida para construir aplicações web escaláveis com TypeScript, React, Node.js e autenticação OAuth integrada.

### Características Principais

- **TypeScript Fullstack**: Type safety em todo o codebase (backend e frontend)
- **React 18 com Vite**: Experiência de desenvolvimento extremamente rápida com Hot Module Replacement
- **Tailwind CSS**: Estilização utility-first com configuração otimizada
- **Autenticação OAuth**: Suporte integrado para Google e LinkedIn OAuth 2.0
- **Sessões Seguras**: Gerenciamento de sessões com express-session
- **Suite de Testes Completa**: Jest com testes unitários, integração e e2e (80% coverage)
- **ESLint + Prettier**: Qualidade de código com formatação automática
- **Husky Git Hooks**: Checks automatizados no pre-commit
- **Arquitetura em Camadas**: Controllers, Services, Models, Middleware bem organizados
- **Graceful Shutdown**: Desligamento elegante do servidor
- **CORS Configurado**: Controle de origins para desenvolvimento e produção
- **ESM Modules**: Suporte a módulos ES modernos

### Arquitetura

O projeto segue uma estrutura monorepo com backend e frontend separados:

```
┌─────────────────────────────────────────────────────────┐
│                     Kanbino Project                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────┐         ┌──────────────────┐      │
│  │   Backend (3000) │         │  Frontend (5173) │      │
│  │                  │         │                  │      │
│  │  • Node.js 20+   │         │  • React 18      │      │
│  │  • Express       │         │  • Vite          │      │
│  │  • TypeScript    │◄────────┤  • TypeScript    │      │
│  │  • OAuth (G+L)   │ API     │  • Tailwind CSS  │      │
│  │  • Jest Tests    │         │  • Hot Reload    │      │
│  │                  │         │                  │      │
│  └──────────────────┘         └──────────────────┘      │
│                                                           │
│  API Proxy: Vite proxies /api → http://localhost:3000    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Stack Tecnológico

### Backend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Node.js | >= 20.0.0 | Runtime environment |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| Express | 4.18.2 | Web framework |
| Passport | 0.7.0 | Autenticação middleware |
| passport-google-oauth20 | 2.0.0 | Google OAuth 2.0 |
| passport-linkedin-oauth2 | 2.0.0 | LinkedIn OAuth 2.0 |
| express-session | 1.18.1 | Gerenciamento de sessões |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| dotenv | 16.4.5 | Variáveis de ambiente |
| Jest | 29.7.0 | Framework de testes |
| ts-node | 10.9.2 | Execução TypeScript |

### Frontend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.2.0 | UI library |
| Vite | 5.0.0 | Build tool e dev server |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| Tailwind CSS | 3.4.17 | Utility-first CSS framework |
| PostCSS | 8.4.49 | Processamento CSS |
| Autoprefixer | 10.4.20 | Prefixos CSS automáticos |

### Desenvolvimento e Qualidade

| Ferramenta | Versão | Propósito |
|------------|--------|-----------|
| ESLint | 9.17.0 | Linting JavaScript/TypeScript |
| Prettier | 3.4.2 | Formatação de código |
| Husky | 9.1.7 | Git hooks automation |
| Nodemon | 3.1.9 | Auto-restart em mudanças |
| Concurrently | 8.2.2 | Executar múltiplos comandos |
| ts-jest | 29.2.5 | TypeScript preset para Jest |

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatório

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0 (vem com Node.js)
- **Git** (para clonar o repositório)

### Instalando Node.js

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS (usando Homebrew):**
```bash
brew install node@20
```

**Windows:**
Baixe e instale em [nodejs.org](https://nodejs.org/)

**Usando nvm (recomendado):**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20
nvm use 20
```

### Editor de Código Recomendado

- **VS Code** com as extensões:
  - ESLint
  - Prettier
  - TypeScript
  - Tailwind CSS IntelliSense
  - TypeScript Importer

### Verificar Instalação

```bash
node --version   # Deve ser v20.0.0 ou superior
npm --version    # Deve ser 9.0.0 ou superior
git --version    # Deve mostrar versão do git
```

## Quick Start

Coloque o projeto para rodar em minutos:

```bash
# Clone o repositório
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# Instale todas as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
cp frontend/.env.example frontend/.env

# Inicie backend e frontend simultaneamente
npm run dev:all
```

Sua aplicação estará disponível em:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **Health Check**: http://localhost:3000/health

## Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino
```

### 2. Instale as Dependências

```bash
npm install
```

Isso instala todas as dependências para backend e frontend.

### 3. Configure as Variáveis de Ambiente

#### Backend

```bash
cp .env.example .env
```

Edite `.env` e configure as variáveis (veja [Configuração do Ambiente](#configuração-do-ambiente)).

#### Frontend

```bash
cp frontend/.env.example frontend/.env
```

Edite `frontend/.env` conforme necessário.

### 4. Verifique a Instalação

```bash
# Verifique compilação TypeScript
npm run type-check

# Execute os testes
npm test

# Inicie o servidor de desenvolvimento
npm run dev
```

## Configuração do Ambiente

### Variáveis de Ambiente do Backend (.env)

Crie um arquivo `.env` na raiz do projeto:

```bash
# Ambiente da Aplicação
NODE_ENV=development        # development, production ou test

# Configuração do Servidor
PORT=3000                   # Porta do servidor HTTP

# Configuração de Logging
LOG_LEVEL=info             # debug, info, warn ou error

# Configuração de Database (Opcional - descomente se necessário)
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=
# DATABASE_NAME=kanbino

# Configuração da API
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000          # Timeout da API em milissegundos

# Configuração do Google OAuth
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Configuração do LinkedIn OAuth
LINKEDIN_CLIENT_ID=seu_linkedin_client_id
LINKEDIN_CLIENT_SECRET=seu_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback

# Configuração de Sessão
SESSION_SECRET=sua_chave_secreta_segura_aleatoria_mude_em_producao
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000   # 7 dias em milissegundos
```

**Nota importante**: Para usar OAuth, você precisa configurar as credenciais no Google Cloud Console e LinkedIn Developer Portal.

### Variáveis de Ambiente do Frontend (frontend/.env)

Crie `frontend/.env`:

```bash
# Configuração da API
VITE_API_BASE_URL=/api     # Proxy para http://localhost:3000/api
```

**Nota**: Variáveis no frontend devem sempre começar com `VITE_`.

### Valores Específicos por Ambiente

| Variável | Development | Production | Test |
|----------|-------------|------------|------|
| NODE_ENV | development | production | test |
| LOG_LEVEL | debug | warn | error |
| PORT | 3000 | 80 ou 443 | 3001 |

### Arquivos de Configuração Principais

- **tsconfig.json**: Configuração TypeScript backend (NodeNext module resolution)
- **frontend/tsconfig.json**: Configuração TypeScript frontend (ESNext + bundler)
- **vite.config.ts**: Configuração Vite com proxy para API backend
- **jest.config.js**: Configuração Jest com path mapping e coverage
- **.eslintrc.js**: Configuração ESLint com TypeScript strict rules
- **tailwind.config.js**: Configuração Tailwind CSS
- **postcss.config.js**: Configuração PostCSS

## Estrutura do Projeto

```
kanbino/
├── src/                          # Backend TypeScript
│   ├── config/                   # Configurações da aplicação
│   │   └── index.ts              # Config centralizada
│   ├── controllers/              # Controllers da API (MVC)
│   │   ├── api.controller.ts     # Controller principal
│   │   └── auth.controller.ts    # Controller de autenticação
│   ├── middleware/               # Middleware Express
│   │   ├── auth.middleware.ts    # Passport.js middleware
│   │   └── session.config.ts     # Sessão express
│   ├── models/                   # Models de dados
│   ├── routes/                   # Rotas da API
│   │   ├── api.routes.ts         # Rotas principais
│   │   └── auth.routes.ts        # Rotas de OAuth
│   ├── services/                 # Lógica de negócio
│   ├── auth/                     # Configuração Passport
│   │   └── index.ts              # Estratégias OAuth
│   ├── utils/                    # Utilitários
│   │   └── logger.ts             # Logger Winston
│   ├── styles/                   # CSS source (Tailwind)
│   │   └── input.css             # CSS com diretivas Tailwind
│   ├── public/                   # Arquivos estáticos
│   │   └── css/
│   │       └── output.css        # CSS compilado (auto-gerado)
│   ├── index.ts                  # Entry point backend
│   └── server.ts                 # Configuração Express
│
├── frontend/                     # Frontend React
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── services/             # Services de API
│   │   ├── types/                # TypeScript types
│   │   ├── App.tsx               # Componente principal
│   │   └── main.tsx              # Entry point React
│   ├── index.html                # HTML template
│   ├── .env                      # Variáveis ambiente frontend
│   └── dist/                     # Build output (gerado)
│
├── tests/                        # Testes
│   ├── unit/                     # Testes unitários
│   ├── integration/              # Testes de integração
│   ├── e2e/                      # Testes end-to-end
│   ├── fixtures/                 # Fixtures de teste
│   ├── helpers/                  # Helpers de teste
│   └── mocks/                    # Mocks de dependências
│
├── dist/                         # Build output backend (gerado)
├── node_modules/                 # Dependências (gerado)
├── .env.example                  # Variáveis ambiente backend template
├── package.json                  # Configuração npm
├── tsconfig.json                 # Config TypeScript backend
├── frontend/tsconfig.json        # Config TypeScript frontend
├── vite.config.ts                # Config Vite
├── jest.config.js                # Config Jest
├── tailwind.config.js            # Config Tailwind
├── postcss.config.js             # Config PostCSS
├── .eslintrc.js                  # Config ESLint
└── README.md                     # Esta documentação
```

### Diretórios Principais Explicados

- **src/**: Backend TypeScript com Express, Passport, e OAuth
- **frontend/**: Frontend React com Vite e Tailwind CSS
- **tests/**: Suite de testes organizada por tipo (unit, integration, e2e)
- **src/styles/**: Arquivos CSS fonte com diretivas Tailwind
- **src/public/**: Assets estáticos servidos pelo Express

## Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev              # Inicia apenas backend (nodemon + ts-node)
npm run dev:frontend     # Inicia apenas frontend (Vite)
npm run dev:all          # Inicia backend e frontend simultaneamente (recomendado)
```

**Portas:**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- Vite proxy: `/api` → `http://localhost:3000`

### Build

```bash
npm run build            # Compila backend TypeScript
npm run build:frontend   # Compila frontend TypeScript + bundle Vite
npm run build:all        # Compila backend e frontend
npm run build:css        # Compila CSS Tailwind (desenvolvimento)
npm run build:css:prod   # Compila CSS otimizado para produção
npm run build:css:watch  # Watch CSS compilation
```

### Produção

```bash
npm start                # Inicia backend compilado
npm run start:dev        # Inicia backend com ts-node
npm run preview:frontend # Preview do build frontend
```

### Testes

```bash
npm test                 # Executa todos os testes
npm run test:unit        # Testes unitários apenas
npm run test:integration # Testes de integração apenas
npm run test:e2e         # Testes e2e apenas
npm run test:watch       # Modo watch interativo
npm run test:watch:all   # Watch mode com todos os testes
npm run test:coverage    # Com relatório de cobertura (threshold: 80%)
npm run test:coverage:watch # Coverage com watch mode
npm run test:ci          # Para ambientes CI/CD
npm run test:debug       # Run tests com debugger
npm run test:verbose     # Output verboso
npm run test:silent      # Output mínimo
```

### Qualidade de Código

```bash
npm run lint             # Verifica problemas ESLint
npm run lint:fix         # Corrige problemas automaticamente
npm run format           # Formata código com Prettier
npm run format:check     # Verifica formatação
npm run type-check       # Verifica tipos TypeScript backend
npm run type-check:frontend # Verifica tipos TypeScript frontend
```

### Git Hooks

```bash
npm run prepare          # Instala hooks Husky
```

## Guia de Desenvolvimento

### Fluxo de Trabalho Recomendado

1. **Crie uma branch** a partir de `main`
   ```bash
   git checkout -b feature/nova-feature
   ```

2. **Inicie o desenvolvimento**
   ```bash
   npm run dev:all
   ```
   - Backend em http://localhost:3000
   - Frontend em http://localhost:5173
   - Hot reload habilitado em ambos

3. **Faça alterações** e teste em tempo real

4. **Execute verificações** antes de commit
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```

5. **Commit** as mudanças
   ```bash
   git add .
   git commit -m "feat: adicione nova feature"
   ```
   - Husky hooks executam testes automaticamente no pre-commit

### Desenvolvimento Backend

**Adicionar Novas Funcionalidades:**

1. **Controller** (`src/controllers/`):
   ```typescript
   import { Request, Response } from 'express';

   export const myAction = (req: Request, res: Response): void => {
     res.json({ message: 'Hello from backend' });
   };
   ```

2. **Rotas** (`src/routes/`):
   ```typescript
   import { Router } from 'express';
   import * as controller from '../controllers/my.controller.js';

   const router = Router();
   router.get('/endpoint', controller.myAction);

   export default router;
   ```

3. **Registrar no servidor** (`src/server.ts`):
   ```typescript
   import myRoutes from './routes/my.routes.js';
   app.use('/api/my', myRoutes);
   ```

**Boas Práticas:**
- Use `@/` para imports relativos a `src/`
- TypeScript strict mode habilitado
- Logger disponível em `src/utils/logger.ts`
- Adicione JSDoc para funções exportadas
- Trate erros adequadamente

### Desenvolvimento Frontend

**Estrutura de Componentes:**

```typescript
// frontend/src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};
```

**Adicionar Estilos Tailwind:**

```typescript
// Classes utilitárias do Tailwind
<div className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
  {/* conteúdo */}
</div>
```

**API Calls:**

```typescript
// frontend/src/services/api.ts
export const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};
```

**Boas Práticas:**
- Componentes em `frontend/src/components/`
- Services API em `frontend/src/services/`
- Types em `frontend/src/types/`
- Use Tailwind CSS para estilos
- CSS customizado em `frontend/src/index.css`
- Vite proxy: `/api` → `http://localhost:3000`

### Convenções de Código

**TypeScript/JavaScript:**
- Use `const` sobre `let`
- Arrow functions para callbacks
- TypeScript strict mode
- Imports com extensões `.js` (ESM)

**React:**
- Functional components com hooks
- TypeScript para props
- Componentes pequenos e focados
- Compose sobre inheritance

**Nomenclatura:**
- Arquivos: kebab-case para componentes (`my-component.tsx`)
- Utilitários: camelCase (`myUtils.ts`)
- Testes: `.test.ts` ou `.spec.ts`
- Commits: `type: description` (feat:, fix:, docs:, etc.)

## Endpoints da API

### Endpoints Disponíveis

#### Health Check
```http
GET /health
```

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2025-01-20T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

#### Status da API
```http
GET /api/status
```

**Response (200):**
```json
{
  "status": "running",
  "version": "1.0.0",
  "features": {
    "frontend": "React + Vite + TypeScript",
    "backend": "Node.js + Express + TypeScript",
    "styling": "Tailwind CSS"
  }
}
```

#### Dados de Exemplo
```http
GET /api/data
```

**Response (200):**
```json
{
  "message": "Data from backend",
  "items": [
    { "id": 1, "name": "React", "type": "frontend" },
    { "id": 2, "name": "Node.js", "type": "backend" },
    { "id": 3, "name": "TypeScript", "type": "language" }
  ],
  "timestamp": "2025-01-20T12:00:00.000Z"
}
```

### Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | Success |
| 404 | Not Found |
| 500 | Internal Server Error |

### CORS

- **Development**: Origins permitidas - `http://localhost:5173`, `http://localhost:3000`
- **Production**: Configure origins específicas em `src/server.ts`

## Autenticação OAuth

Kanbino vem com autenticação OAuth 2.0 configurada para Google e LinkedIn.

### Configuração do Google OAuth

1. **Acesse** [Google Cloud Console](https://console.cloud.google.com/)
2. **Crie** um novo projeto
3. **Habilite** Google+ API
4. **Crie** credenciais OAuth 2.0
5. **Configure** redirects:
   - `http://localhost:3000/api/auth/google/callback` (development)
   - `https://seu-dominio.com/api/auth/google/callback` (production)
6. **Copie** Client ID e Client Secret para `.env`:
   ```bash
   GOOGLE_CLIENT_ID=seu_client_id
   GOOGLE_CLIENT_SECRET=seu_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
   ```

### Configuração do LinkedIn OAuth

1. **Acesse** [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. **Crie** uma nova aplicação
3. **Configure** OAuth 2.0 redirect URLs:
   - `http://localhost:3000/api/auth/linkedin/callback` (development)
   - `https://seu-dominio.com/api/auth/linkedin/callback` (production)
4. **Copie** Client ID e Client Secret para `.env`:
   ```bash
   LINKEDIN_CLIENT_ID=seu_client_id
   LINKEDIN_CLIENT_SECRET=seu_client_secret
   LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
   ```

### Endpoints de Autenticação

#### Google OAuth
```http
GET /api/auth/google
```
Inicia o fluxo de login com Google.

```http
GET /api/auth/google/callback
```
Callback do Google OAuth (redireciona pelo Google).

#### LinkedIn OAuth
```http
GET /api/auth/linkedin
```
Inicia o fluxo de login com LinkedIn.

```http
GET /api/auth/linkedin/callback
```
Callback do LinkedIn OAuth (redireciona pelo LinkedIn).

#### Status de Autenticação
```http
GET /api/auth/status
```
Verifica se o usuário está autenticado.

```http
GET /api/auth/me
```
Retorna dados do usuário autenticado.

```http
POST /api/auth/logout
```
Encerra a sessão do usuário.

#### Páginas de Redirecionamento
```http
GET /api/auth/success
```
Página de sucesso após autenticação.

```http
GET /api/auth/failure
```
Página de falha na autenticação.

### Configuração de Sessão

As sessões são gerenciadas com `express-session`:

```bash
SESSION_SECRET=sua_chave_secreta_muito_segura
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000  # 7 dias
```

**Importante**: Use uma `SESSION_SECRET` forte e aleatória em produção!

## Testes

### Estrutura de Testes

Kanbino usa uma abordagem de três níveis:

1. **Unitários** (`tests/unit/`): Testam funções/classes isoladas
2. **Integração** (`tests/integration/`): Testam interações entre componentes
3. **E2E** (`tests/e2e/`): Testam fluxos completos do usuário

**Diretórios de Apoio:**
- `tests/fixtures/`: Dados de teste
- `tests/helpers/`: Funções auxiliares
- `tests/mocks/`: Mocks de dependências externas

### Executar Testes

```bash
# Todos os testes
npm test

# Por tipo
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode (interativo)
npm run test:watch

# Coverage (threshold: 80%)
npm run test:coverage

# CI/CD
npm run test:ci
```

### Escrever Testes

**Nomenclatura de Arquivos:**
```
tests/unit/myFunction.test.ts
tests/integration/api.test.ts
tests/e2e/user-flow.test.ts
```

**Exemplo de Teste Unitário:**

```typescript
describe('myFunction', () => {
  it('should return expected value', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = myFunction(input);

    // Assert
    expect(result).toBe('expected');
  });

  it('should handle errors', () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

### Configuração Jest

Arquivo: `jest.config.js`

- **Módulos ES**: `useESM: true`
- **Path mapping**: `@/` → `src/`
- **Timeout**: 10000ms
- **Coverage threshold**: 80%

### Melhores Práticas

- Siga o padrão AAA: Arrange, Act, Assert
- Nomes de testes descritivos
- Mock dependências externas
- Teste edge cases e cenários de erro
- Mantenha testes independentes
- Use fixtures para dados de teste

## Deploy

### Build para Produção

#### Checklist Pré-Build

```bash
# 1. Verifique tipos TypeScript
npm run type-check
npm run type-check:frontend

# 2. Execute o linter
npm run lint

# 3. Execute todos os testes
npm test

# 4. Verifique coverage
npm run test:coverage
```

#### Processo de Build

**1. Configure Ambiente de Produção:**
```bash
# Linux/macOS
export NODE_ENV=production

# Windows (Command Prompt)
set NODE_ENV=production

# Windows (PowerShell)
$env:NODE_ENV="production"
```

**2. Build Backend:**
```bash
npm run build
```
Compila TypeScript para JavaScript em `dist/`.

**3. Build Frontend:**
```bash
npm run build:frontend
```
Cria build otimizado em `frontend/dist/`.

**4. Build Completo:**
```bash
npm run build:all
```
Compila backend e frontend em um comando.

### Outputs do Build

- **Backend**: `dist/` (JavaScript compilado)
- **Frontend**: `frontend/dist/` (assets otimizados)
- **CSS**: `src/public/css/output.css` (minificado em produção)

### Executar em Produção

```bash
# Iniciar backend
NODE_ENV=production npm start
```

O servidor backend:
- Serve frontend estático em `/`
- API em `/api`
- Health check em `/health`
- SPA fallback para rotas frontend

### Variáveis de Produção

Configure no seu ambiente de hosting:

```bash
NODE_ENV=production
LOG_LEVEL=warn
PORT=3000

# Opcional: Database
DATABASE_HOST=seu-db-host
DATABASE_PORT=5432
DATABASE_USERNAME=seu-usuario
DATABASE_PASSWORD=sua-senha
DATABASE_NAME=kanbino

# API
API_BASE_URL=https://seu-dominio.com
API_TIMEOUT=30000

# OAuth
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
GOOGLE_CALLBACK_URL=https://seu-dominio.com/api/auth/google/callback

LINKEDIN_CLIENT_ID=seu_linkedin_client_id
LINKEDIN_CLIENT_SECRET=seu_linkedin_client_secret
LINKEDIN_CALLBACK_URL=https://seu-dominio.com/api/auth/linkedin/callback

# Sessão
SESSION_SECRET=sua_chave_secreta_forte_e_aleatoria
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000
```

### Considerações de Produção

**Segurança:**
- Configure CORS para origins específicas
- Use HTTPS obrigatoriamente
- Implemente rate limiting
- Valide todos os inputs
- Use `SESSION_SECRET` forte
- Nunca commite `.env` files

**Performance:**
- Use process manager (PM2, systemd, Docker)
- Configure cache adequado
- Implemente CDN para assets estáticos
- Monitore uptime e performance

**Monitoring:**
- Configure logs em produção
- Monitore métricas de uptime
- Alertas para erros
- Health checks em `/health`

### Plataformas de Deploy

**Backend:**
- AWS EC2/ECS
- Heroku
- Railway
- Render
- DigitalOcean App Platform

**Frontend:**
- Vercel (otimizado para React/Vite)
- Netlify
- AWS S3 + CloudFront
- Cloudflare Pages

**Docker (opcional):**
```dockerfile
# Dockerfile example
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:all
CMD ["npm", "start"]
```

## Troubleshooting

### Problemas Comuns

#### Backend não inicia

**Sintomas:** Erro ao executar `npm run dev`

**Soluções:**

1. **Verifique se a porta está livre:**
   ```bash
   # Linux/macOS
   lsof -ti:3000 | xargs kill -9

   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Verifique NODE_ENV:**
   ```bash
   cat .env | grep NODE_ENV
   ```

3. **Verifique arquivo .env:**
   ```bash
   # Deve existir
   ls -la .env
   ```

#### Frontend não conecta no backend

**Sintomas:** Erro de CORS ou 404 nas chamadas de API

**Soluções:**

1. **Execute o backend:**
   ```bash
   npm run dev
   ```

2. **Verifique proxy Vite** em `vite.config.ts`:
   ```typescript
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3000',
         changeOrigin: true,
       }
     }
   }
   ```

3. **Verifique variável frontend:**
   ```bash
   # frontend/.env
   VITE_API_BASE_URL=/api
   ```

#### Módulo não encontrado

**Erro:** `Cannot find module 'module-name'`

**Solução:**
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

#### Erro de TypeScript

**Erro:** `TS2307: Cannot find module '...'`

**Soluções:**

1. **Use `.js` em imports** (requerido para ESM):
   ```typescript
   import { myFunc } from './utils.js';  // ✅
   import { myFunc } from './utils';     // ❌
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Limpe cache TypeScript:**
   ```bash
   rm -rf dist
   npm run build
   ```

#### Tailwind CSS não funciona

**Sintomas:** Estilos não aplicados

**Soluções:**

1. **Compile CSS:**
   ```bash
   npm run build:css
   ```

2. **Verifique output:**
   ```bash
   ls -la src/public/css/output.css
   ```

3. **Verifique diretivas** em `src/styles/input.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Use watch mode:**
   ```bash
   npm run build:css:watch
   ```

#### Erro de CORS

**Sintomas:** Erro CORS no console do browser

**Soluções:**

1. **Verifique configuração CORS** em `src/server.ts`:
   ```typescript
   app.use(cors({
     origin: config.env === 'production'
       ? ['https://seu-dominio.com']
       : ['http://localhost:5173', 'http://localhost:3000'],
     credentials: true,
   }));
   ```

2. **Adicione origin se necessário**

#### Hot reload não funciona

**Sintomas:** Mudanças não refletem em tempo real

**Solução:**

1. **Verifique se nodemon/vite estão instalados:**
   ```bash
   npm ls nodemon vite
   ```

2. **Reinicie servidores:**
   ```bash
   # Ctrl+C e execute novamente
   npm run dev:all
   ```

#### Testes falham

**Sintomas:** Testes quebrando com erros

**Soluções:**

1. **Verifique se backend está rodando** (para testes de integração)

2. **Verifique mocks** em `tests/mocks/`

3. **Verifique fixtures** em `tests/fixtures/`

4. **Rode com verbose:**
   ```bash
   npm run test:verbose
   ```

#### Erro de OAuth

**Sintomas:** Callback OAuth falhando

**Soluções:**

1. **Verifique credenciais** no `.env`:
   ```bash
   cat .env | grep GOOGLE_CLIENT_ID
   cat .env | grep LINKEDIN_CLIENT_ID
   ```

2. **Verifique URLs de callback** no painel OAuth (Google/LinkedIn)

3. **Verifique CORS** e origins permitidas

### Logs e Debugging

**Logs do sistema:**
```bash
# Nível de log configurado em .env
LOG_LEVEL=debug  # development
LOG_LEVEL=warn   # production
```

**Debug mode:**
```bash
NODE_ENV=development npm run dev
```

**Console logs:**
- Use `console.log()` para debugging rápido
- Logger disponível em `src/utils/logger.ts`

### Recursos de Ajuda

Se encontrar problemas não cobertos aqui:

1. **GitHub Issues**: https://github.com/VictorHSCosta/kanbino/issues
2. **Documentação das tecnologias**:
   - [Node.js Docs](https://nodejs.org/docs)
   - [React Docs](https://react.dev)
   - [TypeScript Docs](https://www.typescriptlang.org/docs)
   - [Vite Docs](https://vitejs.dev)
   - [Tailwind Docs](https://tailwindcss.com/docs)
   - [Express Docs](https://expressjs.com)
   - [Passport.js](http://www.passportjs.org)
3. **Stack Overflow** (tags: nodejs, react, typescript, express, oauth)

## Contribuição

Contribuições são bem-vindas! Por favor, siga estas diretrizes.

### Fluxo de Contribuição

1. **Fork o repositório**
   ```bash
   # Clique em "Fork" no GitHub
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/SEU_USUARIO/kanbino.git
   cd kanbino
   ```

3. **Crie uma branch de feature**
   ```bash
   git checkout -b feature/amazing-feature
   ```

   **Convenções de nome:**
   - `feature/` - Novas funcionalidades
   - `fix/` - Correção de bugs
   - `docs/` - Mudanças na documentação
   - `refactor/` - Refatoração de código
   - `test/` - Adição ou atualização de testes

4. **Faça suas alterações**
   - Escreva código limpo seguindo convenções
   - Adicione testes para novas funcionalidades
   - Atualize documentação se necessário

5. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adicione amazing feature"
   ```

   **Formato de mensagem de commit:**
   - `feat:` - Nova funcionalidade
   - `fix:` - Correção de bug
   - `docs:` - Mudanças na documentação
   - `style:` - Mudanças de estilo (formatação)
   - `refactor:` - Refatoração de código
   - `test:` - Adição ou atualização de testes
   - `chore:` - Tarefas de manutenção

6. **Push para seu fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Crie um Pull Request**
   - Vá ao GitHub e clique em "Compare & pull request"
   - Forneça descrição clara das mudanças
   - Link issues relacionadas se houver
   - Certifique-se que todos os checks CI passam

### Convenções de Código

**TypeScript/JavaScript:**
- TypeScript strict mode habilitado
- Prefira `const` sobre `let`
- Arrow functions para callbacks
- Siga regras ESLint (`npm run lint`)

**React:**
- Functional components com hooks
- TypeScript para props
- Componentes pequenos e focados
- Compose sobre inheritance

**Testes:**
- Mantenha coverage acima de 80%
- Escreva testes para novas features
- Siga padrão AAA (Arrange, Act, Assert)
- Nomes descritivos para testes

**Git:**
- Commits atômicos (uma mudança lógica por commit)
- Mensagens de commit claras e descritivas
- Squash commits relacionados antes do PR
- Use `git rebase` para resolver conflitos

### Checklist para Pull Request

Antes de submeter um PR, certifique-se:

- [ ] Código segue convenções de estilo do projeto
- [ ] Testes passam localmente (`npm test`)
- [ ] Linting passa (`npm run lint`)
- [ ] TypeScript compila (`npm run type-check`)
- [ ] Novas funcionalidades incluem testes
- [ ] Documentação está atualizada
- [ ] Mensagens de commit seguem convenções
- [ ] PR descreve claramente as mudanças

### Processo de Review

1. Checks CI automatizados rodam em todos os PRs
2. Maintainers revisam código em até 48 horas
3. Responda feedback do review prontamente
4. PRs requerem pelo menos uma aprovação para merge

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Links Úteis

- **Repositório GitHub**: https://github.com/VictorHSCosta/kanbino
- **Issues**: https://github.com/VictorHSCosta/kanbino/issues
- **Documentação Node.js**: https://nodejs.org/docs
- **Documentação React**: https://react.dev
- **Documentação TypeScript**: https://www.typescriptlang.org/docs
- **Documentação Vite**: https://vitejs.dev
- **Documentação Tailwind**: https://tailwindcss.com/docs
- **Documentação Express**: https://expressjs.com
- **Documentação Passport.js**: http://www.passportjs.org
- **Documentação Jest**: https://jestjs.io/docs/getting-started

---

**Feito com ❤️ pelo time Kanbino**

Para mais informações, visite [GitHub Repository](https://github.com/VictorHSCosta/kanbino)
