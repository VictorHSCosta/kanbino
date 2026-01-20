# Kanbino

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Fullstack TypeScript boilerplate com Node.js/Express, React/Vite, Tailwind CSS e suite de testes completa.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológico](#stack-tecnológico)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Endpoints da API](#endpoints-da-api)
- [Testes](#testes)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

Kanbino é um boilerplate fullstack profissional construído com tecnologias modernas e melhores práticas. Fornece uma base sólida para construir aplicações web escaláveis com TypeScript, React e Node.js.

O projeto implementa uma arquitetura em camadas clara com backend API REST (Express) e frontend SPA (React/Vite), organizados em estrutura monorepo. Inclui autenticação OAuth (Google e LinkedIn), suporte a sessões, testes abrangentes, e ferramentas de desenvolvimento configuradas.

### Características Principais

- **Fullstack TypeScript**: Tipagem segura em todo o codebase (backend + frontend)
- **React 18 com Vite**: Experiência de desenvolvimento rápida com Hot Module Replacement
- **Tailwind CSS**: Estilização utility-first com PostCSS
- **Autenticação OAuth**: Suporte integrado para Google e LinkedIn
- **Testes Completos**: Jest para unitários, integração e e2e (cobertura mínima 80%)
- **Code Quality**: ESLint, Prettier e Husky para automação
- **Sessões**: Express-session configurado com gerenciamento seguro
- **Graceful Shutdown**: Desligamento elegante do servidor
- **Proxy Configurado**: Vite proxy para `/api` → backend
- **Path Mapping**: Imports limpos com `@/` para ambos os lados

## Stack Tecnológico

### Backend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Node.js | >= 20.0.0 | Runtime environment |
| Express | 4.18.2 | Web framework |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| Passport | 0.7.0 | Autenticação |
| express-session | 1.18.1 | Gerenciamento de sessões |
| CORS | 2.8.5 | Cross-origin resource sharing |
| dotenv | 16.4.5 | Variáveis de ambiente |

### Frontend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.2.0 | UI library |
| Vite | 5.0.0 | Build tool e dev server |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| Tailwind CSS | 3.4.17 | Framework CSS utility-first |
| PostCSS | 8.4.49 | Processamento CSS |
| Autoprefixer | 10.4.20 | Vendor prefixes automático |

### Testes

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Jest | 29.7.0 | Framework de testes |
| ts-jest | 29.2.5 | Preset TypeScript para Jest |
| Coverage Threshold | 80% | Mínimo de cobertura exigido |

### Code Quality

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| ESLint | 9.17.0 | Linting JavaScript/TypeScript |
| Prettier | 3.4.2 | Formatação de código |
| Husky | 9.1.7 | Git hooks automation |

### Development Tools

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| nodemon | 3.1.9 | Auto-restart em mudanças |
| concurrently | 8.2.2 | Executar múltiplos comandos |
| ts-node | 10.9.2 | Execução TypeScript |

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

### Obrigatório

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0 (vem com Node.js)
- **Git** (para clonar o repositório)

### Editor de Código Recomendado

VS Code com as seguintes extensões:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

### Sistema Operacional

- Linux (qualquer distribuição)
- macOS
- Windows (WSL recomendado)

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
Faça download e instale em [nodejs.org](https://nodejs.org/)

**Usando nvm (recomendado):**
```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js 20
nvm install 20
nvm use 20
```

### Verificar Instalação

```bash
node --version   # Deve ser v20.0.0 ou superior
npm --version    # Deve ser 9.0.0 ou superior
git --version    # Deve mostrar versão do git
```

## Instalação

### Quick Start (Setup Rápido)

Setup completo em 3 passos:

```bash
# 1. Clone o repositório
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
cp frontend/.env.example frontend/.env.development

# 4. Inicie backend e frontend
npm run dev:all
```

Aplicação disponível em:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **Health Check**: http://localhost:3000/health

### Instalação Detalhada

#### 1. Clonar o Repositório

```bash
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino
```

#### 2. Instalar Dependências

```bash
npm install
```

Isso instala todas as dependências para backend e frontend.

#### 3. Configurar Variáveis de Ambiente

**Backend (.env):**
```bash
cp .env.example .env
```

**Frontend:**
```bash
cp frontend/.env.example frontend/.env.development
```

Edite os arquivos conforme necessário (veja seção [Configuração](#configuração)).

#### 4. Verificar Instalação

```bash
# Verificar compilação TypeScript
npm run type-check

# Executar testes
npm test

# Iniciar servidor de desenvolvimento
npm run dev
```

## Configuração

### Variáveis de Ambiente do Backend (.env)

Crie um arquivo `.env` na raiz do projeto:

```bash
# Ambiente da Aplicação
NODE_ENV=development           # development, production, ou test

# Configuração do Servidor
PORT=3000                      # Porta HTTP (padrão: 3000)

# Configuração de Logging
LOG_LEVEL=info                # debug, info, warn, ou error

# Configuração de Database (Opcional - descomente se necessário)
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=
# DATABASE_NAME=kanbino

# Configuração da API
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000             # Timeout da API em milissegundos

# Configuração do Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Configuração do LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback

# Configuração de Sessão
SESSION_SECRET=your_secure_session_secret_change_in_production
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000     # 7 dias em milissegundos
```

### Variáveis de Ambiente do Frontend (frontend/.env.development)

Crie um arquivo `frontend/.env.development`:

```bash
# Configuração da API
VITE_API_BASE_URL=/api        # Proxy para http://localhost:3000/api
```

**Nota:** Variáveis no frontend precisam do prefixo `VITE_` para serem acessíveis.

### Valores Específicos por Ambiente

| Variável | Development | Production | Test |
|----------|-------------|------------|------|
| NODE_ENV | development | production | test |
| LOG_LEVEL | debug | warn | error |
| PORT | 3000 | 80 ou 443 | 3001 |

### Arquivos de Configuração Principais

- **tsconfig.json**: Configuração TypeScript backend (NodeNext, strict mode)
- **frontend/tsconfig.json**: Configuração TypeScript frontend (ESNext, JSX)
- **vite.config.ts**: Configuração Vite com proxy API
- **jest.config.js**: Configuração Jest (coverage threshold 80%, ESM)
- **.eslintrc.js**: Configuração ESLint (TypeScript strict rules)
- **tailwind.config.js**: Configuração Tailwind CSS
- **postcss.config.js**: Configuração PostCSS

## Estrutura do Projeto

```
kanbino/
├── src/                           # Backend TypeScript
│   ├── config/                    # Configurações da aplicação
│   ├── controllers/               # Controllers da API
│   ├── middleware/                # Middleware Express
│   │   ├── auth.middleware.ts     # Passport configuration
│   │   └── session.config.ts      # Session configuration
│   ├── models/                    # Models de dados
│   ├── routes/                    # Rotas da API
│   │   ├── api.routes.ts          # API routes
│   │   └── auth.routes.ts         # Auth routes (OAuth)
│   ├── services/                  # Lógica de negócio
│   ├── utils/                     # Utilitários
│   │   └── logger.ts              # Logger configurado
│   ├── auth/                      # Autenticação
│   │   └── index.ts               # Passport strategies
│   ├── styles/                    # CSS source (Tailwind input)
│   │   └── input.css              # CSS com diretivas Tailwind
│   ├── public/                    # Arquivos estáticos
│   │   └── css/
│   │       └── output.css         # CSS compilado (auto-gerado)
│   ├── index.ts                   # Entry point backend
│   └── server.ts                  # Configuração Express
│
├── frontend/                      # Frontend React
│   ├── src/
│   │   ├── components/            # Componentes React
│   │   ├── services/              # Services API
│   │   ├── types/                 # TypeScript types
│   │   ├── App.tsx                # Componente principal
│   │   ├── main.tsx               # Entry point React
│   │   └── index.css              # Estilos globais
│   ├── index.html                 # HTML template
│   ├── .env.development           # Variáveis ambiente (dev)
│   └── dist/                      # Build output (gerado)
│
├── tests/                         # Testes
│   ├── unit/                      # Testes unitários
│   ├── integration/               # Testes de integração
│   ├── e2e/                       # Testes end-to-end
│   ├── fixtures/                  # Fixtures de teste
│   ├── helpers/                   # Helpers de teste
│   └── mocks/                     # Mocks
│
├── dist/                          # Build output backend (gerado)
├── node_modules/                  # Dependências (gerado)
├── .env.example                   # Variáveis ambiente backend
├── package.json                   # Configuração npm
├── tsconfig.json                  # Config TypeScript backend
├── frontend/tsconfig.json         # Config TypeScript frontend
├── vite.config.ts                 # Config Vite
├── jest.config.js                 # Config Jest
├── tailwind.config.js             # Config Tailwind
└── README.md                      # Esta documentação
```

### Diretórios Importantes Explicados

- **src/**: Código fonte backend com Express, TypeScript, Passport
- **frontend/**: Aplicação React com Vite
- **tests/**: Suite de testes organizada por tipo (unit, integration, e2e)
- **src/styles/**: Arquivos fonte CSS com diretivas Tailwind
- **src/public/**: Assets estáticos servidos pelo Express
- **dist/**: TypeScript compilado para JavaScript (gerado no build)
- **frontend/dist/**: Frontend compilado para produção (gerado no build)

## Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev              # Inicia apenas backend (nodemon + ts-node)
npm run dev:frontend     # Inicia apenas frontend (Vite)
npm run dev:all          # Inicia backend e frontend simultaneamente (recomendado)
```

**Portas padrão:**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Build

```bash
npm run build            # Compila backend TypeScript
npm run build:frontend   # Compila frontend TypeScript e bundle Vite
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
npm run test:watch:all   # Watch mode com todos os testes
npm run test:coverage    # Com relatório de cobertura (threshold: 80%)
npm run test:coverage:watch # Coverage com watch
npm run test:ci          # Para ambientes CI/CD
npm run test:debug       # Executa com debugger
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
npm run prepare          # Instala Husky git hooks
```

## Guia de Desenvolvimento

### Fluxo de Trabalho Recomendado

1. **Criar branch** a partir de `main`
   ```bash
   git checkout -b feature/nova-feature
   ```

2. **Iniciar desenvolvimento**
   ```bash
   npm run dev:all
   ```
   - Backend em http://localhost:3000
   - Frontend em http://localhost:5173
   - Hot reload habilitado em ambos

3. **Fazer alterações** e testar

4. **Verificar qualidade** antes de commit
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```

5. **Commit** (Husky hooks executam testes automaticamente no pre-commit)

### Desenvolvimento Backend

**Adicionar Nova Funcionalidade:**

1. **Controller** em `src/controllers/`
   ```typescript
   import { Request, Response } from 'express';

   export const myController = (req: Request, res: Response): void => {
     res.json({ message: 'Hello from controller' });
   };
   ```

2. **Rota** em `src/routes/`
   ```typescript
   import { Router } from 'express';
   import * as myController from '../controllers/my.controller.js';

   const router = Router();
   router.get('/my-endpoint', myController.myController);

   export default router;
   ```

3. **Registrar** rota em `src/server.ts`
   ```typescript
   import myRoutes from './routes/my.routes.js';
   app.use('/api/my', myRoutes);
   ```

4. **Service** em `src/services/` (lógica de negócio)
5. **Model** em `src/models/` (schemas/typings)

**Convenções:**
- Usar `@/` para imports relativos a `src/`
- TypeScript strict mode habilitado
- Adicionar extensão `.js` em imports (ESM)
- Logger disponível em `src/utils/logger.ts`
- Usar JSDoc para funções exportadas

### Desenvolvimento Frontend

**Adicionar Componente:**

1. **Componente** em `frontend/src/components/`
   ```tsx
   import React from 'react';

   interface MyComponentProps {
     title: string;
   }

   export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
     return <div className="p-4">{title}</div>;
   };
   ```

2. **Usar Tailwind CSS** para estilos
   ```tsx
   <div className="flex items-center justify-center bg-blue-500 text-white">
     Content
   </div>
   ```

3. **API Service** em `frontend/src/services/`
   ```typescript
   const API_BASE = import.meta.env.VITE_API_BASE_URL;

   export const fetchData = async () => {
     const response = await fetch(`${API_BASE}/data`);
     return response.json();
   };
   ```

**Convenções:**
- Componentes em `frontend/src/components/`
- Types TypeScript em `frontend/src/types/`
- CSS customizado em `frontend/src/index.css`
- Configurar Tailwind em `tailwind.config.js`
- API proxy: `/api` → `http://localhost:3000`

### Convenções de Código

**TypeScript/JavaScript:**
- Seguir regras ESLint (TypeScript recommended + strict)
- Usar `const` sobre `let`
- Arrow functions para callbacks
- Tipos explícitos para funções exportadas

**React:**
- Functional components com hooks
- TypeScript para props
- Manter componentes pequenos e focados
- Composition over inheritance

**Nomes de Arquivos:**
- Components: `PascalCase.tsx` (ex: `UserProfile.tsx`)
- Utils: `camelCase.ts` (ex: `dateFormatter.ts`)
- Services: `camelCase.service.ts`
- Types: `camelCase.types.ts`

**Git Commits:**
- Formato: `type: description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Ex: `feat: add user authentication`

## Endpoints da API

### Endpoints Disponíveis

#### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

#### API Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

#### Status da Aplicação

```http
GET /api/status
```

**Response:**
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

**Response:**
```json
{
  "message": "Data from backend",
  "items": [
    { "id": 1, "name": "React", "type": "frontend" },
    { "id": 2, "name": "Node.js", "type": "backend" },
    { "id": 3, "name": "TypeScript", "type": "language" }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Autenticação OAuth

**Google OAuth:**
```http
GET /api/auth/google
```
Inicia fluxo de autenticação Google.

```http
GET /api/auth/google/callback
```
Callback de autenticação Google.

**LinkedIn OAuth:**
```http
GET /api/auth/linkedin
```
Inicia fluxo de autenticação LinkedIn.

```http
GET /api/auth/linkedin/callback
```
Callback de autenticação LinkedIn.

### Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | Success |
| 404 | Not Found |
| 500 | Internal Server Error |

### CORS

**Development:**
- Origins permitidas: `http://localhost:5173`, `http://localhost:3000`
- Credentials: habilitado

**Production:**
- Configurar origins específicas em `src/server.ts`

### Adicionar Novos Endpoints

1. Criar controller em `src/controllers/`
2. Adicionar rota em `src/routes/api.routes.ts`
3. Registrar em `src/server.ts` se necessário
4. Adicionar testes em `tests/integration/` ou `tests/e2e/`

## Testes

### Estrutura de Testes

```
tests/
├── unit/              # Testam funções/classes isoladas
├── integration/       # Testam interações entre componentes
├── e2e/               # Testam fluxos completos
├── fixtures/          # Dados de teste
├── helpers/           # Funções auxiliares
└── mocks/             # Mocks de dependências
```

### Executar Testes

```bash
# Todos os testes
npm test

# Por tipo
npm run test:unit          # Unitários apenas
npm run test:integration   # Integração apenas
npm run test:e2e           # E2E apenas

# Watch mode (interativo)
npm run test:watch

# Coverage
npm run test:coverage      # Threshold: 80%

# CI/CD
npm run test:ci            # MaxWorkers: 2
```

### Escrever Testes

**Nome do Arquivo:**
- `.test.ts` ou `.spec.ts`

**Exemplo de Teste Unitário:**

```typescript
import { myFunction } from '../src/utils/myFunction.js';

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

**Boas Práticas:**
- Seguir padrão AAA: Arrange, Act, Assert
- Nomes descritivos para testes
- Mockar dependências externas
- Testar edge cases e cenários de erro
- Manter testes independentes
- Usar fixtures e helpers

### Configuração Jest

**Arquivo:** `jest.config.js`

**Configurações principais:**
- Preset: `ts-jest/presets/default-esm` (ESM habilitado)
- Path mapping: `@/` → `src/`, `@tests/` → `tests/`
- Coverage threshold: 80% (statements, branches, functions, lines)
- Timeout: 10000ms
- MaxWorkers: 50% (ou 2 para CI)

### Coverage Report

Gerar relatório HTML:
```bash
npm run test:coverage
```

Abrir `coverage/lcov-report/index.html` no navegador para visualização detalhada.

## Deploy

### Build para Produção

#### Pre-build Checklist

```bash
# 1. Verificar tipos
npm run type-check
npm run type-check:frontend

# 2. Executar linter
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
```

**Outputs:**
- Backend: `dist/` (TypeScript compilado)
- Frontend: `frontend/dist/` (bundle otimizado)
- CSS: `src/public/css/output.css` (minificado em produção)

#### Build Individual

```bash
# Backend apenas
npm run build

# Frontend apenas
npm run build:frontend
```

### Variáveis de Produção

Configurar no ambiente de hosting:

```bash
NODE_ENV=production
LOG_LEVEL=warn
PORT=3000

# Database (se aplicável)
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_USERNAME=your-user
DATABASE_PASSWORD=your-password
DATABASE_NAME=kanbino

# OAuth (se aplicável)
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
LINKEDIN_CLIENT_ID=your_production_client_id
LINKEDIN_CLIENT_SECRET=your_production_client_secret

# Sessão
SESSION_SECRET=strong_random_secret_for_production
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000

# API
API_BASE_URL=https://yourdomain.com
API_TIMEOUT=30000
```

### Executar em Produção

```bash
# Iniciar backend
NODE_ENV=production npm start
```

Backend serve frontend estático em `/` com SPA fallback.

### Considerações de Produção

**Segurança:**
- Configurar CORS para origins específicas
- Usar HTTPS
- Implementar rate limiting
- Validar inputs
- Usar Helmet.js para headers de segurança
- Manter dependências atualizadas (`npm audit`)

**Process Management:**
- **PM2** (recomendado):
  ```bash
  npm install -g pm2
  pm2 start dist/index.js --name kanbino
  pm2 startup
  pm2 save
  ```

- **Docker**:
  ```dockerfile
  FROM node:20-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  COPY dist ./dist
  COPY frontend/dist ./frontend/dist
  EXPOSE 3000
  CMD ["node", "dist/index.js"]
  ```

- **systemd** (Linux):
  ```ini
  [Unit]
  Description=Kanbino Backend
  After=network.target

  [Service]
  Type=simple
  User=nodejs
  WorkingDirectory=/var/www/kanbino
  Environment=NODE_ENV=production
  ExecStart=/usr/bin/node /var/www/kanbino/dist/index.js

  [Install]
  WantedBy=multi-user.target
  ```

**Monitoring:**
- Health check: `GET /health`
- Logs configurados via `LOG_LEVEL`
- Implementar monitors (Uptime, Response times, Error rates)

### Plataformas de Deploy

**Backend:**
- AWS EC2, ECS
- Heroku
- Railway
- Render
- DigitalOcean App Platform

**Frontend:**
- Vercel (otimizado para React/Vite)
- Netlify
- AWS S3 + CloudFront
- Cloudflare Pages

**Ou Monorepo:**
- Deploy backend e frontend como uma unidade
- Backend serve frontend estático em produção

### CI/CD

Exemplo GitHub Actions:

```yaml
name: CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run build:all
```

## Troubleshooting

### Problemas Comuns

#### Backend não inicia

**Sintomas:**
- Erro ao executar `npm run dev`
- Mensagem "Port already in use"

**Soluções:**

1. **Verificar porta:**
   ```bash
   # Linux/macOS
   lsof -ti:3000 | xargs kill -9

   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Verificar NODE_ENV:**
   ```bash
   cat .env | grep NODE_ENV
   ```

3. **Verificar arquivo .env:**
   ```bash
   ls -la .env
   ```

#### Frontend não conecta ao backend

**Sintomas:**
- API calls falham com 404
- CORS errors no console

**Soluções:**

1. **Verificar se backend está rodando:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Verificar proxy Vite:**
   ```typescript
   // vite.config.ts
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3000',
         changeOrigin: true,
       }
     }
   }
   ```

3. **Iniciar backend:**
   ```bash
   npm run dev
   ```

#### Erro de módulo não encontrado

**Sintomas:**
```
Cannot find module 'module-name'
```

**Soluções:**

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### Erro de TypeScript

**Sintomas:**
```
TS2307: Cannot find module '...'
```

**Soluções:**

1. **Verificar imports usam `.js`:**
   ```typescript
   import { myFunc } from './utils.js';  // ✅
   import { myFunc } from './utils';     // ❌
   ```

2. **Rebuild:**
   ```bash
   rm -rf dist
   npm run build
   ```

3. **Type-check:**
   ```bash
   npm run type-check
   ```

#### Tailwind não funciona

**Sintomas:**
- Styles não aplicados
- Classes não geradas

**Soluções:**

1. **Compilar CSS:**
   ```bash
   npm run build:css
   ```

2. **Verificar arquivo output:**
   ```bash
   ls -la src/public/css/output.css
   ```

3. **Verificar diretivas Tailwind:**
   ```css
   /* src/styles/input.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Watch mode:**
   ```bash
   npm run build:css:watch
   ```

#### Hot reload não funciona

**Sintomas:**
- Mudanças não refletem automaticamente

**Soluções:**

1. **Verificar instalação:**
   ```bash
   npm ls nodemon
   npm ls vite
   ```

2. **Reiniciar servidores:**
   ```bash
   # Parar e rodar novamente
   npm run dev:all
   ```

#### Erro de CORS

**Sintomas:**
- "CORS policy" no console

**Soluções:**

1. **Verificar configuração CORS em `src/server.ts`:**
   ```typescript
   app.use(cors({
     origin: config.env === 'production'
       ? ['https://yourdomain.com']
       : ['http://localhost:5173', 'http://localhost:3000'],
     credentials: true,
   }));
   ```

2. **Adicionar origin se necessário**

#### Testes falham

**Sintomas:**
- Testes não passam
- Erros de import

**Soluções:**

1. **Verificar se backend está rodando** (para integration/e2e)
2. **Verificar mocks:** `tests/mocks/`
3. **Verificar fixtures:** `tests/fixtures/`
4. **Executar com verbose:**
   ```bash
   npm run test:verbose
   ```

#### Porta já em uso

**Sintomas:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Soluções:**

1. **Matar processo na porta:**
   ```bash
   # Linux/macOS
   lsof -ti:3000 | xargs kill

   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Ou mudar porta em `.env`:**
   ```bash
   PORT=3001
   ```

### Logs e Debugging

**Logger disponível:**
```typescript
import { logger } from './utils/logger.js';

logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
```

**Nível configurado em:**
```bash
LOG_LEVEL=debug  # development
LOG_LEVEL=warn   # production
```

**Debug mode:**
```bash
NODE_ENV=development npm run dev
```

### Recursos de Ajuda

- **Issues no GitHub:** https://github.com/VictorHSCosta/kanbino/issues
- **Documentação Node.js:** https://nodejs.org/docs
- **Documentação React:** https://react.dev
- **Documentação TypeScript:** https://www.typescriptlang.org/docs
- **Stack Overflow:** Tags `nodejs`, `react`, `typescript`, `express`

## Contribuição

Contribuições são bem-vindas! Por favor, siga estas diretrizes.

### Como Contribuir

1. **Fork o repositório**
   ```bash
   # Clique no botão "Fork" no GitHub
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/SEU_USUARIO/kanbino.git
   cd kanbino
   ```

3. **Crie uma branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

   Convenções de nome:
   - `feature/` - Novas funcionalidades
   - `fix/` - Bug fixes
   - `docs/` - Mudanças na documentação
   - `refactor/` - Refatoração de código
   - `test/` - Adicionar ou atualizar testes

4. **Faça as mudanças**
   - Escreva código limpo seguindo convenções
   - Adicione testes para novas funcionalidades
   - Atualize documentação se necessário

5. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Formato de commit message:
   - `feat:` - Nova funcionalidade
   - `fix:` - Bug fix
   - `docs:` - Mudanças na documentação
   - `style:` - Mudanças de style (formatação)
   - `refactor:` - Refatoração de código
   - `test:` - Adicionar ou atualizar testes
   - `chore:` - Tarefas de manutenção

6. **Push para seu fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Crie um Pull Request**
   - Vá ao GitHub e clique em "Compare & pull request"
   - Forneça descrição clara das mudanças
   - Link issues relacionadas se aplicável
   - Garanta que todos os checks CI passem

### Convenções de Commit

**Formato:**
```
type: subject

body (opcional)

footer (opcional)
```

**Types:**
- `feat`: Nova funcionalidade
- `fix`: Bug fix
- `docs`: Mudanças na documentação
- `style`: Mudanças de formatação (não afetam código)
- `refactor`: Refatoração de código
- `test`: Adicionar ou atualizar testes
- `chore`: Tarefas de manutenção

**Exemplo:**
```
feat: add user authentication with Google OAuth

- Implement Passport.js with Google strategy
- Add session management with express-session
- Create auth routes (/api/auth/google, /api/auth/google/callback)
- Add authentication middleware

Closes #123
```

### Requisitos para PR

Antes de submeter uma PR, certifique-se de:

- [ ] Código segue convenções de style (`npm run lint`)
- [ ] Testes passam localmente (`npm test`)
- [ ] TypeScript compila sem erros (`npm run type-check`)
- [ ] Novas funcionalidades incluem testes
- [ ] Coverage mantém threshold 80%
- [ ] Documentação atualizada se necessário
- [ ] Commit messages seguem convenções
- [ ] PR descreve claramente as mudanças

### Code Review

1. CI checks automáticos rodam em todas as PRs
2. Maintainers revisam código dentro de 48 horas
3. Responda feedback prontamente
4. PRs requerem pelo menos uma aprovação para merge

### Código de Conduta

- Seja respeitoso e inclusivo
- Fofoque no que é melhor para a comunidade
- Aceite feedback construtivo
- Mostre empatia towards other community members

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Links Úteis

- **Repositório GitHub:** https://github.com/VictorHSCosta/kanbino
- **Issues:** https://github.com/VictorHSCosta/kanbino/issues
- **Documentação Node.js:** https://nodejs.org/docs
- **Documentação React:** https://react.dev
- **Documentação TypeScript:** https://www.typescriptlang.org/docs
- **Documentação Vite:** https://vitejs.dev
- **Documentação Tailwind:** https://tailwindcss.com/docs
- **Documentação Express:** https://expressjs.com/en/guide/routing.html
- **Documentação Jest:** https://jestjs.io/docs/getting-started

## Agradecimentos

Construído com as excelentes tecnologias open-source:

- Node.js & npm
- React & Vite
- TypeScript
- Express
- Tailwind CSS
- Jest
- E muitas outras...

---

Última atualização: Janeiro 2026

**Feito com ❤️ pela equipe Kanbino**

Para mais informações, visite [GitHub Repository](https://github.com/VictorHSCosta/kanbino)
