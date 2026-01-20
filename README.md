# Kanbino

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Jest](https://img.shields.io/badge/Jest-29.7-c21325)](https://jestjs.io/)

Boilerplate fullstack profissional com Node.js/Express, React/Vite, Tailwind CSS, autenticação OAuth e suite completa de testes.

## Índice

- [Visão Geral](#visão-geral)
- [Características Principais](#características-principais)
- [Stack Tecnológico](#stack-tecnológico)
- [Pré-requisitos](#pré-requisitos)
- [Quick Start](#quick-start)
- [Instalação Detalhada](#instalação-detalhada)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Endpoints da API](#endpoints-da-api)
- [Testes](#testes)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Links Úteis](#links-úteis)

## Visão Geral

Kanbino é uma aplicação fullstack moderna construída com as melhores práticas de desenvolvimento. Fornece uma base sólida para criar aplicações web escaláveis com TypeScript em todo o código, React no frontend e Express.js no backend.

### Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

- **Backend**: API REST com Node.js, Express e TypeScript
- **Frontend**: SPA (Single Page Application) com React 18 e Vite
- **Autenticação**: OAuth 2.0 com Google e LinkedIn
- **Testes**: Estratégia completa com unitários, integração e e2e
- **Estilização**: Tailwind CSS com PostCSS

## Características Principais

- ✨ **TypeScript Fullstack**: Tipagem estática em todo o códigobase
- ⚛️ **React 18**: Hooks modernos e componentes funcionais
- ⚡ **Vite**: Desenvolvimento extremamente rápido com HMR
- 🎨 **Tailwind CSS**: Estilização utility-first
- 🧪 **Jest**: Suite completa de testes com 80% de cobertura
- 🔐 **OAuth 2.0**: Autenticação com Google e LinkedIn
- 🔒 **Express Sessions**: Gerenciamento de sessões seguro
- 🚀 **Hot Reload**: Desenvolvimento rápido com recarga automática
- 📦 **ESLint + Prettier**: Código limpo e formatado automaticamente
- 🪝 **Husky**: Git hooks para validação automática
- 🌐 **CORS Configurado**: Comunicação frontend-backend otimizada
- 📊 **Graceful Shutdown**: Desligamento elegante do servidor

## Stack Tecnológico

### Backend

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| Node.js | >= 20.0.0 | Runtime environment |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| Express | 4.18.2 | Web framework |
| Passport | 0.7.0 | Autenticação |
| Passport Google OAuth | 2.0.0 | Autenticação Google |
| Passport LinkedIn OAuth | 2.0.0 | Autenticação LinkedIn |
| Express Session | 1.18.1 | Gerenciamento de sessões |
| CORS | 2.8.5 | Cross-origin resource sharing |
| dotenv | 16.4.5 | Variáveis de ambiente |

### Frontend

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| React | 18.2.0 | Biblioteca UI |
| Vite | 5.0.0 | Build tool e dev server |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| Tailwind CSS | 3.4.17 | Framework CSS utility-first |
| PostCSS | 8.4.49 | Processamento CSS |
| Autoprefixer | 10.4.20 | Prefixos CSS automáticos |

### Testes

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| Jest | 29.7.0 | Framework de testes |
| ts-jest | 29.2.5 | TypeScript preprocessor |
| Coverage Threshold | 80% | Cobertura mínima obrigatória |

### Desenvolvimento

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| ESLint | 9.17.0 | Linting de código |
| Prettier | 3.4.2 | Formatação de código |
| Husky | 9.1.7 | Git hooks |
| Nodemon | 3.1.9 | Auto-restart em desenvolvimento |
| Concurrently | 8.2.2 | Execução paralela de comandos |
| ts-node | 10.9.2 | Execução TypeScript |

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatório

- **Node.js** >= 20.0.0
  - [Download](https://nodejs.org/)
  - Recomendado usar [nvm](https://github.com/nvm-sh/nvm) (Linux/macOS) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) para gerenciar versões

- **npm** >= 9.0.0 (vem com o Node.js)
  - Verificar: `npm --version`

- **Git**
  - [Download](https://git-scm.com/)
  - Verificar: `git --version`

### Editor de Código Recomendado

- **VS Code** com as seguintes extensões:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)

### Verificar Instalação

```bash
node --version    # v20.0.0 ou superior
npm --version     # 9.0.0 ou superior
git --version     # 2.x.x
```

### Sistemas Operacionais Suportados

- Linux (Ubuntu, Debian, Fedora, etc)
- macOS (10.15+)
- Windows (10/11 com WSL recomendado)

## Quick Start

Configure e inicie o projeto em menos de 5 minutos:

```bash
# 1. Clone o repositório
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
cp frontend/.env.example frontend/.env

# 4. Inicie backend e frontend simultaneamente
npm run dev:all
```

Seu aplicativo estará disponível em:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173

## Instalação Detalhada

### 1. Clonar o Repositório

```bash
# Via HTTPS
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# Ou via SSH (se configurado)
git clone git@github.com:VictorHSCosta/kanbino.git
cd kanbino
```

### 2. Instalar Dependências

```bash
npm install
```

Isso instala todas as dependências de desenvolvimento e produção para backend e frontend.

**Tempo estimado**: 2-5 minutos dependendo da conexão

### 3. Configurar Variáveis de Ambiente

#### Backend (.env)

```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário (veja [Configuração de Ambiente](#configuração-de-ambiente)).

#### Frontend (frontend/.env)

```bash
cp frontend/.env.example frontend/.env
```

### 4. Verificar Instalação

```bash
# Verificar compilação TypeScript
npm run type-check

# Executar testes
npm test

# Iniciar servidor de desenvolvimento
npm run dev
```

## Configuração de Ambiente

### Variáveis de Ambiente do Backend (.env)

Crie um arquivo `.env` na raiz do projeto:

```bash
# ===== Ambiente da Aplicação =====
NODE_ENV=development          # development, production, test
PORT=3000                     # Porta do servidor HTTP

# ===== Logging =====
LOG_LEVEL=info               # debug, info, warn, error

# ===== Database (Opcional) =====
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=
# DATABASE_NAME=kanbino

# ===== API Configuration =====
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000            # Timeout em milissegundos

# ===== Google OAuth =====
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# ===== LinkedIn OAuth =====
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback

# ===== Session Configuration =====
SESSION_SECRET=your_secure_session_secret_change_in_production
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000    # 7 dias em milissegundos
```

### Variáveis de Ambiente do Frontend (frontend/.env)

Crie um arquivo `frontend/.env`:

```bash
# ===== API Configuration =====
VITE_API_BASE_URL=/api       # Proxied para http://localhost:3000/api
```

**Importante**: Variáveis do frontend Vite DEVEM começar com `VITE_`

### Configurar Google OAuth (Opcional)

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Habilite "Google+ API"
4. Crie credenciais OAuth 2.0
5. Adicione URLs autorizadas:
   - http://localhost:3000/api/auth/google/callback (desenvolvimento)
   - https://seudominio.com/api/auth/google/callback (produção)
6. Copie Client ID e Client Secret para `.env`

### Configurar LinkedIn OAuth (Opcional)

1. Acesse [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Crie um novo aplicativo
3. Configure OAuth 2.0 redirect URLs:
   - http://localhost:3000/api/auth/linkedin/callback (desenvolvimento)
   - https://seudominio.com/api/auth/linkedin/callback (produção)
4. Copie Client ID e Client Secret para `.env`

### Valores por Ambiente

| Variável | Development | Production | Test |
|----------|-------------|------------|------|
| NODE_ENV | development | production | test |
| LOG_LEVEL | debug | warn | error |
| PORT | 3000 | 80 ou 443 | 3001 |

## Estrutura do Projeto

```
kanbino/
├── src/                            # Backend TypeScript
│   ├── config/                     # Configurações da aplicação
│   │   └── index.ts                # Config central
│   ├── controllers/                # Controllers da API (MVC)
│   │   ├── api.controller.ts       # API endpoints
│   │   └── auth.controller.ts      # Auth endpoints
│   ├── middleware/                 # Middleware Express
│   │   ├── auth.middleware.ts      # Passport auth
│   │   └── session.config.ts       # Session config
│   ├── models/                     # Models de dados
│   ├── routes/                     # Rotas da API
│   │   ├── api.routes.ts           # API routes
│   │   └── auth.routes.ts          # Auth routes
│   ├── services/                   # Lógica de negócio
│   ├── utils/                      # Utilitários
│   │   └── logger.ts               # Logger Winston
│   ├── auth/                       # Autenticação
│   │   ├── google.strategy.ts      # Google OAuth
│   │   └── linkedin.strategy.ts    # LinkedIn OAuth
│   ├── styles/                     # CSS source
│   │   └── input.css               # Tailwind directives
│   ├── public/                     # Arquivos estáticos
│   │   └── css/
│   │       └── output.css          # CSS compilado (gerado)
│   ├── index.ts                    # Entry point
│   └── server.ts                   # Configuração Express
│
├── frontend/                       # Frontend React
│   ├── src/
│   │   ├── components/             # Componentes React
│   │   ├── services/               # Services API
│   │   ├── types/                  # TypeScript types
│   │   ├── App.tsx                 # Componente principal
│   │   ├── main.tsx                # Entry point React
│   │   └── index.css               # Estilos globais
│   ├── index.html                  # HTML template
│   ├── .env.example                # Variáveis ambiente frontend
│   └── dist/                       # Build output (gerado)
│
├── tests/                          # Testes
│   ├── unit/                       # Testes unitários
│   ├── integration/                # Testes de integração
│   ├── e2e/                        # Testes end-to-end
│   ├── fixtures/                   # Fixtures de teste
│   ├── helpers/                    # Helpers de teste
│   └── mocks/                      # Mocks
│
├── dist/                           # Build output backend (gerado)
├── node_modules/                   # Dependências (gerado)
├── .env.example                    # Variáveis ambiente backend
├── .eslintrc.js                    # Config ESLint
├── .prettierrc                     # Config Prettier
├── .gitignore                      # Git ignore rules
├── package.json                    # Config npm
├── tsconfig.json                   # Config TypeScript backend
├── frontend/tsconfig.json          # Config TypeScript frontend
├── vite.config.ts                  # Config Vite (proxy)
├── jest.config.js                  # Config Jest
├── tailwind.config.js              # Config Tailwind
├── postcss.config.js               # Config PostCSS
└── README.md                       # Esta documentação
```

### Diretórios Principais Explicados

- **src/**: Código fonte backend TypeScript com servidor Express
- **frontend/**: Aplicação React construída com Vite
- **tests/**: Suite de testes completa organizada por tipo
- **src/styles/**: Arquivos fonte Tailwind CSS
- **src/public/**: Assets estáticos servidos pelo Express

## Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev              # Inicia backend (nodemon + ts-node)
npm run dev:frontend     # Inicia frontend (Vite)
npm run dev:all          # Inicia backend e frontend simultaneamente
```

**Portas padrão**:
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

**Recomendação**: Use `npm run dev:all` para desenvolvimento fullstack

### Build

```bash
npm run build            # Compila backend TypeScript
npm run build:frontend   # Compila frontend TypeScript + bundle Vite
npm run build:all        # Compila backend e frontend
npm run build:css        # Compila CSS Tailwind (desenvolvimento)
npm run build:css:prod   # Compila CSS otimizado (produção)
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
npm run test:watch:all   # Watch mode para todos os testes
npm run test:coverage    # Com relatório de cobertura (threshold: 80%)
npm run test:coverage:watch # Coverage com watch
npm run test:ci          # Para ambientes CI/CD
npm run test:debug       # Debug mode com inspector
npm run test:verbose     # Output verbose
npm run test:silent      # Output minimal
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
npm run prepare          # Instala git hooks Husky
```

## Guia de Desenvolvimento

### Fluxo de Trabalho Recomendado

1. **Crie uma branch** a partir de `main`
   ```bash
   git checkout -b feature/nova-feature
   ```

2. **Inicie o desenvolvimento**:
   ```bash
   npm run dev:all
   ```
   - Backend em http://localhost:3000
   - Frontend em http://localhost:5173
   - Hot reload habilitado em ambos

3. **Faça alterações e teste**

4. **Execute verificações** antes de commit:
   ```bash
   npm run lint           # Verifica linting
   npm run type-check     # Verifica tipos
   npm test               # Executa testes
   ```

5. **Commit com mensagem clara**:
   ```bash
   git add .
   git commit -m "feat: adicionar nova funcionalidade"
   ```

6. **Husky hooks** executam testes automaticamente no pre-commit

### Desenvolvimento Backend

#### Adicionar Novos Controllers

```typescript
// src/controllers/meu-controller.ts
import { Request, Response } from 'express';

export const minhaFuncao = (req: Request, res: Response): void => {
  // Sua lógica aqui
  res.json({ message: 'Olá do controller!' });
};
```

#### Adicionar Novas Rotas

```typescript
// src/routes/minha-rota.ts
import { Router } from 'express';
import * as meuController from '../controllers/meu-controller.js';

const router = Router();

router.get('/endpoint', meuController.minhaFuncao);

export default router;
```

#### Registrar Rota no Server

```typescript
// src/server.ts
import minhaRota from './routes/minha-rota.js';

app.use('/api/minha-rota', minhaRota);
```

#### Convenções Backend

- Use `@/` para imports relativos a `src/`
- TypeScript strict mode habilitado
- Logger disponível em `src/utils/logger.ts`
- Adicione testes para cada novo controller
- Use JSDoc para funções exportadas

### Desenvolvimento Frontend

#### Estrutura de Componentes

```typescript
// frontend/src/components/MeuComponente.tsx
interface MeuComponenteProps {
  titulo: string;
  aoClicar?: () => void;
}

export function MeuComponente({ titulo, aoClicar }: MeuComponenteProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{titulo}</h2>
      <button onClick={aoClicar}>Clique aqui</button>
    </div>
  );
}
```

#### Services API

```typescript
// frontend/src/services/api.ts
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const fetchData = async () => {
  const response = await api.get('/data');
  return response.data;
};
```

#### Estilos com Tailwind

```tsx
// Classes utilitárias Tailwind
<div className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-lg">
  <h1 className="text-2xl font-bold">Título</h1>
  <button className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-50">
    Botão
  </button>
</div>
```

#### Convenções Frontend

- Componentes em `frontend/src/components/`
- Services API em `frontend/src/services/`
- Types TypeScript em `frontend/src/types/`
- Use Tailwind CSS para estilos
- CSS customizado em `frontend/src/index.css`
- API calls via `frontend/src/services/api.ts`
- Proxy configurado: `/api` → `http://localhost:3000`

### Convenções de Código

#### TypeScript/JavaScript

- Sempre use TypeScript strict mode
- Prefira `const` sobre `let`
- Use arrow functions para callbacks
- Use tipos explícitos para parâmetros e retornos
- Adicione JSDoc para funções complexas

#### React

- Use componentes funcionais com hooks
- Prefira composição sobre herança
- Use TypeScript para props
- Mantenha componentes pequenos e focados
- Use hooks customizados para lógica reutilizável

#### Nomes de Arquivos

- Componentes: `PascalCase.tsx` (ex: `MeuComponente.tsx`)
- Utilitários: `camelCase.ts` (ex: `meuUtilitario.ts`)
- Types: `camelCase.types.ts`
- Testes: `*.test.ts` ou `*.spec.ts`

#### Commits

Use convenção de commits semântica:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` manutenção

## Endpoints da API

### Endpoints Disponíveis

#### Health Check

```http
GET /health
```

**Response 200**:
```json
{
  "status": "ok",
  "timestamp": "2025-01-20T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

#### Status da Aplicação

```http
GET /api/status
```

**Response 200**:
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

**Response 200**:
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

### Autenticação OAuth

#### Google OAuth

```http
GET /api/auth/google
```
Inicia fluxo de autenticação Google. Redireciona para Google.

```http
GET /api/auth/google/callback
```
Callback OAuth do Google. Redireciona para `/api/auth/success` ou `/api/auth/failure`.

#### LinkedIn OAuth

```http
GET /api/auth/linkedin
```
Inicia fluxo de autenticação LinkedIn.

```http
GET /api/auth/linkedin/callback
```
Callback OAuth do LinkedIn.

#### Status de Autenticação

```http
GET /api/auth/status
```

**Response 200**:
```json
{
  "authenticated": true,
  "provider": "google"
}
```

#### Usuário Atual

```http
GET /api/auth/me
```

**Response 200**:
```json
{
  "id": "123456789",
  "displayName": "John Doe",
  "email": "john@example.com",
  "provider": "google"
}
```

#### Logout

```http
POST /api/auth/logout
```

**Response 200**:
```json
{
  "message": "Logged out successfully"
}
```

### Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | Success |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

### CORS

CORS está configurado para permitir requests do frontend em desenvolvimento:

```typescript
// src/server.ts
origin: ['http://localhost:5173', 'http://localhost:3000']
```

**Produção**: Configure origins específicas em `src/server.ts`.

## Testes

### Estrutura de Testes

Kanbino usa uma estratégia de três camadas:

1. **Unitários** (`tests/unit/`): Testam funções/classes isoladas
2. **Integração** (`tests/integration/`): Testam interações entre componentes
3. **E2E** (`tests/e2e/`): Testam fluxos completos de usuário

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

# Coverage (80% mínimo)
npm run test:coverage

# CI/CD
npm run test:ci
```

### Escrever Testes

#### Nome do Arquivo

Use sufixo `.test.ts` ou `.spec.ts`:

```
tests/unit/utils.test.ts
tests/integration/api.test.ts
tests/e2e/user-flow.test.ts
```

#### Estrutura de Teste

```typescript
import { minhaFuncao } from '@/utils/minha-funcao.js';

describe('minhaFuncao', () => {
  it('deve retornar o valor esperado', () => {
    // Arrange
    const input = 'teste';

    // Act
    const result = minhaFuncao(input);

    // Assert
    expect(result).toBe('valor-esperado');
  });

  it('deve lançar erro com input inválido', () => {
    expect(() => minhaFuncao('')).toThrow();
  });
});
```

### Configuração Jest

O projeto usa Jest com suporte ESM:

- **Arquivo**: `jest.config.js`
- **Preset**: `ts-jest/presets/default-esm`
- **Path mapping**: `@/` → `src/`, `@tests/` → `tests/`
- **Timeout**: 10000ms
- **Coverage threshold**: 80%

### Melhores Práticas

- Siga padrão AAA: Arrange, Act, Assert
- Use nomes descritivos para testes
- Mock dependências externas
- Test edge cases e cenários de erro
- Mantenha testes independentes
- Use fixtures para dados de teste
- Mantém coverage acima de 80%

### Fixtures e Helpers

Use fixtures e helpers disponíveis:

```typescript
// tests/fixtures/test-data.ts
export const mockUser = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com'
};

// tests/helpers/test-setup.ts
export const setupTestApp = async () => {
  const app = createTestServer();
  return app;
};
```

## Deploy

### Build para Produção

#### Checklist Pré-Build

```bash
# 1. Verificar tipos TypeScript
npm run type-check
npm run type-check:frontend

# 2. Verificar linting
npm run lint

# 3. Executar testes
npm test

# 4. Verificar coverage
npm run test:coverage
```

#### Processo de Build

```bash
# Build completo (backend + frontend)
npm run build:all

# Ou separadamente
npm run build           # Backend
npm run build:frontend  # Frontend
npm run build:css:prod  # CSS otimizado
```

#### Output do Build

- **Backend**: `dist/` com JavaScript compilado
- **Frontend**: `frontend/dist/` com assets otimizados
- **CSS**: `src/public/css/output.css` (minificado)

### Variáveis de Produção

Configure no ambiente de hosting:

```bash
NODE_ENV=production
LOG_LEVEL=warn
PORT=3000

# Google OAuth (se usado)
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
GOOGLE_CALLBACK_URL=https://seudominio.com/api/auth/google/callback

# LinkedIn OAuth (se usado)
LINKEDIN_CLIENT_ID=seu_client_id
LINKEDIN_CLIENT_SECRET=seu_client_secret
LINKEDIN_CALLBACK_URL=https://seudominio.com/api/auth/linkedin/callback

# Session
SESSION_SECRET=string_segura_aleatória_muito_longa
```

### Executar em Produção

```bash
# Iniciar servidor
NODE_ENV=production npm start
```

O servidor irá:
- Servir frontend estático em `/`
- API disponível em `/api`
- Health check em `/health`
- SPA fallback para rotas React

### Considerações de Produção

#### Segurança

1. **Variáveis de ambiente**: Nunca commit `.env` files
2. **HTTPS**: Sempre use HTTPS em produção
3. **CORS**: Configure origins específicas em `src/server.ts`
4. **Security headers**: Considere usar Helmet.js
5. **Rate limiting**: Implemente rate limiting para API
6. **Input validation**: Valide todos os inputs de usuário
7. **Session secret**: Use string forte e aleatória
8. **Dependencies**: Execute `npm audit` regularmente

#### Performance

1. **CDN**: Use CDN para assets estáticos
2. **Compression**: Habilite gzip/brotli
3. **Caching**: Configure cache headers apropriadas
4. **Database**: Use connection pooling
5. **Monitoring**: Configure monitoring e alertas

#### Process Managers

Recomendado usar process manager:

**PM2**:
```bash
npm install -g pm2
pm2 start dist/index.js --name kanbino
pm2 startup
pm2 save
```

**Systemd** (Linux):
```ini
[Unit]
Description=Kanbino Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/kanbino
ExecStart=/usr/bin/node /var/www/kanbino/dist/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

### Plataformas de Deploy

#### Backend

- **AWS**: EC2, ECS, Elastic Beanstalk
- **Heroku**: Configurar buildpack Node.js
- **Railway**: Deploy automático do GitHub
- **Render**: Web service com PostgreSQL
- **DigitalOcean**: App Platform

#### Frontend

- **Vercel**: Otimizado para React/Vite
- **Netlify**: Deploy contínuo com preview
- **AWS S3 + CloudFront**: Hosting estático
- **Cloudflare Pages**: CDN global

#### Monorepo vs Deploy Separado

- **Junto**: Backend e frontend em um servidor
- **Separado** (recomendado): Backend em um serviço, frontend em outro

### CI/CD

#### GitHub Actions Example

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run build:all

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Comandos de deploy
```

### Health Checks

Configure monitoramento para:

- Uptime da aplicação
- Tempo de resposta
- Taxa de erros
- Conectividade de database (se aplicável)
- Uso de memória e CPU

Endpoint de health: `GET /health`

## Troubleshooting

### Problemas Comuns

#### Backend não inicia

**Sintomas**: Porta em uso, erro ao conectar

**Soluções**:

1. Verifique se porta 3000 está livre:
   ```bash
   # Linux/macOS
   lsof -ti:3000 | xargs kill -9

   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. Verifique `.env`:
   ```bash
   cat .env
   ```

3. Verifique NODE_ENV:
   ```bash
   echo $NODE_ENV
   ```

#### Frontend não conecta ao backend

**Sintomas**: 404, CORS errors, network errors

**Soluções**:

1. Inicie o backend:
   ```bash
   npm run dev
   ```

2. Verifique proxy em `vite.config.ts`:
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

3. Verifique se backend está respondendo:
   ```bash
   curl http://localhost:3000/health
   ```

#### Módulo não encontrado

**Erro**: `Cannot find module 'module-name'`

**Solução**:
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

#### Erros de TypeScript

**Erro**: `TS2307: Cannot find module`

**Soluções**:

1. Use extensões `.js` em imports (ESM):
   ```typescript
   import { myFunc } from './utils.js';  // ✅
   import { myFunc } from './utils';     // ❌
   ```

2. Rebuild TypeScript:
   ```bash
   npm run build
   ```

3. Limpe cache TypeScript:
   ```bash
   rm -rf dist
   npm run build
   ```

#### Tailwind CSS não funciona

**Sintomas**: Estilos não aplicados, classes não geradas

**Soluções**:

1. Verifique compilação CSS:
   ```bash
   npm run build:css
   ```

2. Verifique arquivo de output:
   ```bash
   ls -la src/public/css/output.css
   ```

3. Verifique diretivas em `src/styles/input.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Use watch mode:
   ```bash
   npm run build:css:watch
   ```

#### Hot reload não funciona

**Sintomas**: Alterações não refletem automaticamente

**Soluções**:

1. Verifique instalação:
   ```bash
   npm ls nodemon vite
   ```

2. Reinicie servidores:
   ```bash
   # Pare e inicie novamente
   npm run dev:all
   ```

3. Limpe cache do Vite:
   ```bash
   rm -rf frontend/node_modules/.vite
   ```

#### Erro de CORS

**Sintomas**: CORS errors no console do browser

**Soluções**:

1. Verifique configuração CORS em `src/server.ts`:
   ```typescript
   app.use(cors({
     origin: ['http://localhost:5173', 'http://localhost:3000'],
     credentials: true,
   }));
   ```

2. Adicione origin se necessário:
   ```typescript
   origin: ['http://localhost:5173', 'http://seu-dominio.com']
   ```

#### Testes falham

**Sintomas**: Testes quebram, errors de import

**Soluções**:

1. Verifique se backend está rodando (para integration tests):
   ```bash
   npm run dev
   ```

2. Verifique mocks:
   ```bash
   cat tests/mocks/*.ts
   ```

3. Execute em modo debug:
   ```bash
   npm run test:debug
   ```

#### Porta já em uso

**Erro**: `EADDRINUSE: address already in use :::3000`

**Soluções**:

1. Mude a porta em `.env`:
   ```bash
   PORT=3001
   ```

2. Ou mate o processo:
   ```bash
   # Linux/macOS
   lsof -ti:3000 | xargs kill -9

   # Windows PowerShell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
   ```

#### OAuth não funciona

**Sintomas**: Callback errors, authentication fails

**Soluções**:

1. Verifique variáveis `.env`:
   ```bash
   cat .env | grep GOOGLE
   ```

2. Verifique URLs de callback no console do provider:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://seudominio.com/api/auth/google/callback`

3. Verifique se `SESSION_SECRET` está definido

### Logs e Debugging

#### Logger

O projeto usa um logger configurável em `src/utils/logger.ts`:

```typescript
import { logger } from '@/utils/logger.js';

logger.debug('Mensagem de debug');
logger.info('Mensagem informativa');
logger.warn('Aviso');
logger.error('Erro', error);
```

#### Nível de Log

Configure em `.env`:
```bash
LOG_LEVEL=debug    # Development
LOG_LEVEL=info     # Production
LOG_LEVEL=error    # Test
```

#### Debug Mode

```bash
# Ativar debug mode
NODE_ENV=development npm run dev

# Com logs verbose
LOG_LEVEL=debug npm run dev
```

### Recursos de Ajuda

Se encontrar problemas não documentados:

1. **GitHub Issues**: https://github.com/VictorHSCosta/kanbino/issues
2. **Documentação**:
   - [Node.js Docs](https://nodejs.org/docs)
   - [React Docs](https://react.dev)
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)
   - [Vite Guide](https://vitejs.dev/guide/)
   - [Tailwind Docs](https://tailwindcss.com/docs)

3. **Stack Overflow** (tags: `nodejs`, `react`, `typescript`, `express`)

4. **Discord Communities**:
   - [TypeScript Discord](https://discord.gg/typescript)
   - [React Discord](https://discord.gg/react)

Ao criar uma issue, inclua:
- Mensagem de erro completa
- Passos para reproduzir
- Ambiente (OS, Node version)
- Comportamento esperado vs atual

## Contribuição

Contribuições são bem-vindas! Por favor, siga estas diretrizes.

### Como Contribuir

1. **Fork o repositório**
   ```bash
   # Clique em "Fork" no GitHub
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/SEU_USUARIO/kanbino.git
   cd kanbino
   ```

3. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/nova-feature
   ```

   Convenções de nome:
   - `feature/` - Novas funcionalidades
   - `fix/` - Correções de bugs
   - `docs/` - Mudanças na documentação
   - `refactor/` - Refatoração de código
   - `test/` - Adicionar ou atualizar testes

4. **Faça suas alterações**
   - Escreva código limpo seguindo convenções do projeto
   - Adicione testes para novas funcionalidades
   - Atualize documentação se necessário

5. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adicionar nova funcionalidade"
   ```

6. **Push para seu fork**
   ```bash
   git push origin feature/nova-feature
   ```

7. **Crie um Pull Request**
   - Vá ao GitHub e clique em "Compare & pull request"
   - Forneça descrição clara das mudanças
   - Link issues relacionadas se houver
   - Certifique-se que todos os checks CI passam

### Convenções de Commit

Use [conventional commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, missing semicolons, etc
- `refactor`: Refatoração de código
- `test`: Adicionar ou atualizar testes
- `chore`: Tarefas de manutenção

**Exemplos**:
```
feat(auth): adicionar suporte a LinkedIn OAuth

Implementa autenticação OAuth 2.0 com LinkedIn usando Passport.

Closes #123
```

```
fix(api): corrigir erro de parsing no endpoint /data

Corrige bug que causava crash quando recebia dados vazios.
```

### Requisitos para Pull Request

Antes de submeter um PR, verifique:

- [ ] Código segue estilo do projeto (ESLint + Prettier)
- [ ] Testes passam localmente (`npm test`)
- [ ] Linting passa (`npm run lint`)
- [ ] TypeScript compila (`npm run type-check`)
- [ ] Coverage mantém 80%+ (`npm run test:coverage`)
- [ ] Novas funcionalidades incluem testes
- [ ] Documentação atualizada se necessário
- [ ] Commits seguem convenção
- [ ] PR descreve claramente as mudanças

### Processo de Review

1. **CI Checks**:
   - Linting automático
   - Testes executados
   - Type checking

2. **Code Review**:
   - Mantenedores revisam em até 48 horas
   - Feedback construtivo é bem-vindo
   - Mantenha discussões profissionais

3. **Aprovação**:
   - Mínimo uma aprovação necessária
   - Todas as checks CI devem passar
   - Resolva todos os comments solicitados

### Estilo de Código

#### TypeScript/JavaScript

```typescript
// ✅ Bom
interface UserProps {
  name: string;
  age: number;
}

export function User({ name, age }: UserProps) {
  return <div>{name}: {age}</div>;
}

// ❌ Ruim
export function User(props: any) {
  return <div>{props.name}: {props.age}</div>;
}
```

#### React

```typescript
// ✅ Bom - Componente funcional com hooks
export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// ❌ Ruim - Class component desnecessário
export class Counter extends Component {
  // ...
}
```

#### Testes

```typescript
// ✅ Bom - AAA pattern claro
describe('add', () => {
  it('deve somar dois números', () => {
    // Arrange
    const a = 2;
    const b = 3;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(5);
  });
});
```

### Direitos e Responsabilidades

- **Respeito**: Mantenha discussões profissionais e respeitosas
- **Colaboração**: Trabalhe junto com mantenedores e outros contribuidores
- **Qualidade**: Mantenha padrões altos de código e documentação
- **Testes**: Sempre adicione testes para novas funcionalidades
- **Documentação**: Atualize docs quando mudar comportamento

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

**Resumo**:
- ✅ Uso comercial permitido
- ✅ Modificação permitida
- ✅ Distribuição permitida
- ✅ Uso privado permitido
- ⚠️ Licença e copyright notice devem ser incluídos

## Links Úteis

### Repositório e Issues

- **GitHub Repository**: https://github.com/VictorHSCosta/kanbino
- **Issue Tracker**: https://github.com/VictorHSCosta/kanbino/issues
- **Pull Requests**: https://github.com/VictorHSCosta/kanbino/pulls

### Documentação Oficial

- [Node.js Documentation](https://nodejs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Passport.js](http://www.passportjs.org/docs/)

### OAuth Providers

- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [LinkedIn Authentication](https://learn.microsoft.com/en-us/linkedin/shared/references/v2/authentication)

### Tutoriais Recomendados

- [TypeScript Best Practices](https://github.com/typescript-cheatsheets/react)
- [React Hooks Guide](https://react.dev/reference/react)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

### Comunidade

- [Stack Overflow - Node.js](https://stackoverflow.com/questions/tagged/node.js)
- [Stack Overflow - React](https://stackoverflow.com/questions/tagged/react)
- [Stack Overflow - TypeScript](https://stackoverflow.com/questions/tagged/typescript)
- [TypeScript Community Discord](https://discord.gg/typescript)
- [React Discord](https://discord.gg/react)

### Ferramentas

#### VS Code Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)

#### Browser Extensions

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Tailwind DevTools](https://chrome.google.com/webstore/detail/tailwind-devtools/)

---

**Última atualização**: Janeiro 2025

**Feito com ❤️ pela equipe Kanbino**

Para mais informações, visite [GitHub Repository](https://github.com/VictorHSCosta/kanbino)
