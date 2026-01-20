# Kanbino

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Boilerplate fullstack profissional em TypeScript com Node.js/Express, React/Vite, Tailwind CSS, autenticação OAuth (Google e LinkedIn) e suite completa de testes.

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

## Visão Geral

O Kanbino é um boilerplate fullstack moderno e profissional construído com as melhores práticas de desenvolvimento. Ele fornece uma base sólida para criar aplicações web escaláveis com TypeScript, React e Node.js, incluindo autenticação OAuth integrada com Google e LinkedIn.

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades, utilizando módulos ES modernos, TypeScript strict mode em todo o código, e uma suite de testes abrangente com 80% de cobertura mínima.

### Características Principais

- **TypeScript Fullstack**: Type-safety completo do backend ao frontend
- **React 18 + Vite**: Experiência de desenvolvimento extremamente rápida com Hot Module Replacement
- **Tailwind CSS**: Estilização utility-first com PostCSS e Autoprefixer
- **Autenticação OAuth**: Integração pronta com Google OAuth 2.0 e LinkedIn OAuth
- **Sessões Configuráveis**: Suporte a sessões com Express Session e Passport.js
- **Testes Completos**: Suite de testes com Jest (unitários, integração e e2e)
- **Code Quality**: ESLint, Prettier e Husky para automação de qualidade
- **API REST**: Backend Express com estrutura MVC organizada
- **Proxy Configurado**: Vite proxy para API backend em desenvolvimento
- **Graceful Shutdown**: Desligamento elegante do servidor
- **ESM Modules**: Suporte completo a módulos ES modernos

## Stack Tecnológico

### Backend

| Tecnologia | Versão | Propósito |
|------------|---------|-----------|
| Node.js | \>= 20.0.0 | Runtime environment |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| Express | 4.18.2 | Web framework |
| Passport | 0.7.0 | Middleware de autenticação |
| Passport Google OAuth | 2.0.0 | Autenticação Google |
| Passport LinkedIn OAuth | 2.0.0 | Autenticação LinkedIn |
| Express Session | 1.18.1 | Gerenciamento de sessões |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| dotenv | 16.4.5 | Gerenciamento de variáveis de ambiente |

### Frontend

| Tecnologia | Versão | Propósito |
|------------|---------|-----------|
| React | 18.2.0 | Biblioteca UI |
| Vite | 5.0.0 | Build tool e dev server |
| TypeScript | 5.6.3 | Type-safe JavaScript |
| Tailwind CSS | 3.4.17 | Framework CSS utility-first |
| PostCSS | 8.4.49 | Processamento de CSS |
| Autoprefixer | 10.4.20 | Prefixos CSS automáticos |

### Testing

| Tecnologia | Versão | Propósito |
|------------|---------|-----------|
| Jest | 29.7.0 | Framework de testes |
| ts-jest | 29.2.5 | Preprocessor TypeScript para Jest |
| @types/jest | 29.5.14 | Tipos TypeScript para Jest |

### Code Quality & Development

| Tecnologia | Versão | Propósito |
|------------|---------|-----------|
| ESLint | 9.17.0 | Linting de código |
| Prettier | 3.4.2 | Formatação de código |
| Husky | 9.1.7 | Git hooks automation |
| Nodemon | 3.1.9 | Auto-restart em desenvolvimento |
| Concurrently | 8.2.2 | Executar múltiplos comandos |
| ts-node | 10.9.2 | Execução TypeScript |

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

### Obrigatórios

- **Node.js** \>= 20.0.0
- **npm** \>= 9.0.0 (vem com o Node.js)
- **Git** (para clonar o repositório)

### Recomendados

- **VS Code** ou outro editor moderno
- **Extensões VS Code**:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

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

### Usando nvm (Recomendado)

Para gerenciar múltiplas versões do Node.js:

```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js 20
nvm install 20

# Usar Node.js 20
nvm use 20
```

### Verificar Instalação

```bash
node --version   # Deve ser v20.0.0 ou superior
npm --version    # Deve ser 9.0.0 ou superior
git --version    # Deve mostrar versão do git
```

## Quick Start

Coloque o projeto para rodar em minutos:

```bash
# 1. Clone o repositório
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# 2. Instale todas as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
cp frontend/.env.example frontend/.env.development

# 4. Configure as credenciais OAuth (opcional para desenvolvimento básico)
# Edite o arquivo .env e adicione suas credenciais do Google/LinkedIn

# 5. Inicie backend e frontend simultaneamente
npm run dev:all
```

Sua aplicação estará disponível em:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **Health Check**: http://localhost:3000/health

## Instalação Detalhada

### 1. Clonar o Repositório

```bash
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino
```

### 2. Instalar Dependências

```bash
npm install
```

Isso instala todas as dependências para backend e frontend, incluindo dependências de desenvolvimento e testes.

### 3. Configurar Variáveis de Ambiente

#### Backend (.env)

```bash
cp .env.example .env
```

Edite o arquivo `.env` criado na raiz do projeto e configure as variáveis necessárias.

#### Frontend

```bash
cp frontend/.env.example frontend/.env.development
```

### 4. Configurar OAuth (Opcional)

Para usar autenticação com Google e LinkedIn:

**Google OAuth:**
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto ou selecione um existente
3. Habilite Google+ API
4. Crie credenciais OAuth 2.0
5. Adicione URL de callback: `http://localhost:3000/api/auth/google/callback`
6. Copie Client ID e Client Secret para `.env`

**LinkedIn OAuth:**
1. Acesse [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Crie uma aplicação
3. Configure OAuth 2.0 redirect URLs: `http://localhost:3000/api/auth/linkedin/callback`
4. Copie Client ID e Client Secret para `.env`

### 5. Verificar Instalação

```bash
# Verificar compilação TypeScript
npm run type-check

# Executar testes
npm test

# Iniciar desenvolvimento
npm run dev
```

## Configuração de Ambiente

### Variáveis de Ambiente do Backend (.env)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
# ===== Ambiente da Aplicação =====
NODE_ENV=development        # development, production ou test
PORT=3000                   # Porta do servidor HTTP

# ===== Logging =====
LOG_LEVEL=info             # debug, info, warn ou error

# ===== Banco de Dados (Opcional) =====
# Descomente e configure se necessário
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=
# DATABASE_NAME=kanbino

# ===== API =====
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000          # Timeout da API em milissegundos

# ===== Google OAuth 2.0 =====
GOOGLE_CLIENT_ID=seu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=seu_google_client_secret_aqui
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# ===== LinkedIn OAuth 2.0 =====
LINKEDIN_CLIENT_ID=seu_linkedin_client_id_aqui
LINKEDIN_CLIENT_SECRET=seu_linkedin_client_secret_aqui
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback

# ===== Configuração de Sessão =====
SESSION_SECRET=sua_chave_secreta_segura_aleatoria_mude_em_producao
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000   # 7 dias em milissegundos
```

### Variáveis de Ambiente do Frontend

Crie `frontend/.env.development` com:

```bash
# API Configuration
VITE_API_BASE_URL=/api
```

**Nota**: Variáveis no frontend precisam do prefixo `VITE_` para serem acessíveis.

### Valores por Ambiente

| Variável | Development | Production | Test |
|----------|-------------|------------|------|
| NODE_ENV | development | production | test |
| LOG_LEVEL | debug | warn | error |
| PORT | 3000 | 80 ou 443 | 3001 |

### Arquivos de Configuração Importantes

- **tsconfig.json**: Configuração TypeScript backend (NodeNext, strict mode)
- **frontend/tsconfig.json**: Configuração TypeScript frontend (ES2020, bundler mode)
- **vite.config.ts**: Configuração Vite com proxy para API backend
- **jest.config.js**: Configuração Jest com cobertura e módulos ES
- **.eslintrc.js**: Configuração ESLint com TypeScript strict rules
- **tailwind.config.js**: Configuração Tailwind CSS
- **postcss.config.js**: Configuração PostCSS

## Estrutura do Projeto

```
kanbino/
├── src/                          # Backend TypeScript
│   ├── auth/                     # Configuração Passport OAuth
│   │   ├── google.strategy.ts    # Estratégia Google OAuth
│   │   ├── linkedin.strategy.ts  # Estratégia LinkedIn OAuth
│   │   └── index.ts              # Export Passport
│   ├── config/                   # Configurações da aplicação
│   │   └── index.ts              # Config central
│   ├── controllers/              # Controllers da API
│   │   ├── api.controller.ts     # Controller principal
│   │   └── auth.controller.ts    # Controller de autenticação
│   ├── middleware/               # Middleware Express
│   │   ├── auth.middleware.ts    # Passport initialization
│   │   └── session.config.ts     # Session configuration
│   ├── models/                   # Models de dados
│   ├── public/                   # Arquivos estáticos
│   │   └── css/
│   │       └── output.css        # CSS compilado (gerado)
│   ├── routes/                   # Rotas da API
│   │   ├── api.routes.ts         # Rotas principais
│   │   └── auth.routes.ts        # Rotas de autenticação
│   ├── services/                 # Lógica de negócio
│   ├── styles/                   # CSS source (Tailwind)
│   │   └── input.css             # CSS com diretivas Tailwind
│   ├── types/                    # TypeScript types
│   ├── utils/                    # Utilitários
│   │   └── logger.ts             # Logger configurável
│   ├── index.ts                  # Entry point backend
│   └── server.ts                 # Configuração Express
│
├── frontend/                     # Frontend React
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── services/             # Services API
│   │   ├── types/                # TypeScript types
│   │   ├── App.tsx               # Componente principal
│   │   └── main.tsx              # Entry point React
│   ├── index.html                # HTML template
│   ├── .env.development          # Variáveis ambiente dev
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
├── .env.example                  # Template variáveis backend
├── .eslintrc.js                  # Configuração ESLint
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Configuração Prettier
├── package.json                  # Scripts npm e dependências
├── tsconfig.json                 # Config TypeScript backend
├── vite.config.ts                # Config Vite
├── tailwind.config.js            # Config Tailwind
├── postcss.config.js             # Config PostCSS
├── jest.config.js                # Config Jest
└── README.md                     # Esta documentação
```

### Diretórios Principais

- **src/**: Código backend TypeScript com Express
- **frontend/**: Frontend React com Vite
- **tests/**: Suite completa de testes organizados por tipo
- **src/styles/**: Arquivos CSS fonte com Tailwind
- **src/public/**: Assets estáticos servidos pelo Express

## Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev              # Inicia apenas backend (nodemon + ts-node)
npm run dev:frontend     # Inicia apenas frontend (Vite dev server)
npm run dev:all          # Inicia backend e frontend simultaneamente (recomendado)
```

**Portas:**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Build

```bash
npm run build            # Compila backend TypeScript
npm run build:frontend   # Compila frontend e cria bundle Vite
npm run build:all        # Compila backend e frontend
npm run build:css        # Compila CSS Tailwind (desenvolvimento)
npm run build:css:prod   # Compila CSS otimizado e minificado (produção)
npm run build:css:watch  # Watch mode para CSS
```

### Produção

```bash
npm start                # Inicia backend compilado (dist/index.js)
npm run start:dev        # Inicia backend com ts-node (sem compilar)
npm run preview:frontend # Preview do build frontend localmente
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
npm run test:coverage:watch  # Coverage com watch mode
npm run test:ci          # Para ambientes CI/CD
npm run test:debug       # Debug mode com inspector
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

5. **Commit** (Husky hooks executam testes automaticamente)

### Desenvolvimento Backend

**Adicionar Controllers:**
```typescript
// src/controllers/meu-controller.ts
import { Request, Response } from 'express';

export const minhaAction = (req: Request, res: Response): void => {
  res.json({ message: 'Hello' });
};
```

**Adicionar Rotas:**
```typescript
// src/routes/minha-rota.ts
import { Router } from 'express';
import * as controller from '../controllers/meu-controller.js';

const router = Router();
router.get('/minha-rota', controller.minhaAction);

export default router;
```

**Registrar rota em server.ts:**
```typescript
import minhaRota from './routes/minha-rota.js';
app.use('/api', minhaRota);
```

**Imports com Path Alias:**
```typescript
// Usa @/ para imports relativos a src/
import { minhaFuncao } from '@/utils/minha-funcao.js';
import { MeuController } from '@/controllers/meu-controller.js';
```

**Logger:**
```typescript
import { logger } from '@/utils/logger.js';

logger.debug('Informação de debug');
logger.info('Informação geral');
logger.warn('Aviso');
logger.error('Erro', error);
```

### Desenvolvimento Frontend

**Componentes:**
```typescript
// frontend/src/components/MeuComponente.tsx
import React from 'react';

interface Props {
  titulo: string;
}

export const MeuComponente: React.FC<Props> = ({ titulo }) => {
  return <div className="p-4 bg-white rounded">{titulo}</div>;
};
```

**Services API:**
```typescript
// frontend/src/services/api.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getData = async () => {
  const response = await fetch(`${API_BASE}/data`);
  return response.json();
};
```

**Usar Tailwind CSS:**
```tsx
// Classes utilitárias do Tailwind
<div className="flex items-center justify-center p-4 bg-blue-500 text-white">
  Conteúdo
</div>
```

**Proxy Configurado:**
- Todas as requests para `/api/*` são automaticamente proxadas para `http://localhost:3000/api/*`
- Sem necessidade de configurar CORS no desenvolvimento

### Convenções de Código

**TypeScript:**
- Usar tipos explícitos
- Strict mode habilitado
- Interfaces para props de componentes
- Types para dados complexos

**Nomenclatura:**
- Arquivos: `kebab-case` para componentes, `camelCase` para utilitários
- Variáveis: `camelCase`
- Classes/Types: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`

**Commits:**
```
feat: add nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatora código
test: adiciona testes
chore: tarefas de manutenção
```

## Endpoints da API

### Endpoints de Saúde e Status

#### GET /health
Health check da aplicação

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

#### GET /api/status
Status detalhado da aplicação

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

### Endpoints de API

#### GET /api/data
Dados de exemplo

**Response:**
```json
{
  "message": "Data from backend",
  "items": [
    { "id": 1, "name": "React", "type": "frontend" },
    { "id": 2, "name": "Node.js", "type": "backend" }
  ],
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

### Endpoints de Autenticação

#### Google OAuth

##### GET /api/auth/google
Inicia fluxo de login com Google

**Redirect:** Para página de consentimento do Google

##### GET /api/auth/google/callback
Callback do Google após autenticação

**Redirect:** `/api/auth/success` ou `/api/auth/failure`

#### LinkedIn OAuth

##### GET /api/auth/linkedin
Inicia fluxo de login com LinkedIn

**Redirect:** Para página de consentimento do LinkedIn

##### GET /api/auth/linkedin/callback
Callback do LinkedIn após autenticação

**Redirect:** `/api/auth/success` ou `/api/auth/failure`

#### Endpoints Comuns

##### GET /api/auth/status
Verifica status de autenticação

**Response (Autenticado):**
```json
{
  "authenticated": true,
  "user": {
    "id": "123456789",
    "displayName": "João Silva",
    "email": "joao@example.com",
    "provider": "google"
  }
}
```

**Response (Não Autenticado):**
```json
{
  "authenticated": false,
  "user": null
}
```

##### GET /api/auth/me
Obtém usuário atual autenticado

**Response:**
```json
{
  "id": "123456789",
  "displayName": "João Silva",
  "email": "joao@example.com",
  "provider": "google",
  "photos": [
    {
      "value": "https://example.com/photo.jpg"
    }
  ]
}
```

##### POST /api/auth/logout
Faz logout do usuário

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

##### GET /api/auth/success
Redirect interno após autenticação bem-sucedida

##### GET /api/auth/failure
Redirect interno após falha na autenticação

### Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | Success |
| 404 | Not Found |
| 500 | Internal Server Error |

### CORS

CORS está habilitado e configurado:

**Development:**
- `http://localhost:5173`
- `http://localhost:3000`

**Production:**
- Configure origins específicas em `src/server.ts`

## Testes

### Estrutura de Testes

```
tests/
├── unit/              # Testes unitários (funções/classes isoladas)
├── integration/       # Testes de integração (interações entre componentes)
├── e2e/               # Testes end-to-end (fluxos completos)
├── fixtures/          # Dados de teste
├── helpers/           # Funções auxiliares de teste
└── mocks/             # Mocks de dependências externas
```

### Executar Testes

```bash
# Todos os testes
npm test

# Por tipo
npm run test:unit
npm run test:integration
npm run test:e2e

# Com coverage
npm run test:coverage

# Watch mode
npm run test:watch

# CI environment
npm run test:ci
```

### Escrever Testes

**Estrutura:**
```typescript
// tests/unit/example.test.ts
describe('MyFunction', () => {
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

**Melhores Práticas:**
- Padrão AAA: Arrange, Act, Assert
- Nomes descritivos para testes
- Mockar dependências externas
- Testar edge cases
- Manter testes independentes

### Configuração Jest

**Arquivo:** `jest.config.js`

**Configurações principais:**
- Preset ESM habilitado
- Path mapping `@/` → `src/`
- Timeout: 10000ms
- Coverage threshold: 80%

## Deploy

### Build para Produção

#### 1. Preparação

```bash
# Verificar tipos
npm run type-check
npm run type-check:frontend

# Verificar lint
npm run lint

# Executar testes
npm test

# Verificar coverage
npm run test:coverage
```

#### 2. Build

```bash
# Build completo
npm run build:all
```

**Outputs:**
- Backend: `dist/`
- Frontend: `frontend/dist/`
- CSS: `src/public/css/output.css`

### Variáveis de Produção

Configure no ambiente de produção:

```bash
NODE_ENV=production
LOG_LEVEL=warn
PORT=3000

# OAuth
GOOGLE_CLIENT_ID=seu_client_id_producao
GOOGLE_CLIENT_SECRET=seu_client_secret_producao
GOOGLE_CALLBACK_URL=https://seudominio.com/api/auth/google/callback

LINKEDIN_CLIENT_ID=seu_client_id_producao
LINKEDIN_CLIENT_SECRET=seu_client_secret_producao
LINKEDIN_CALLBACK_URL=https://seudominio.com/api/auth/linkedin/callback

# Sessão
SESSION_SECRET=chave_secreta_forte_e_aleatoria
SESSION_MAX_AGE=604800000
```

### Executar em Produção

```bash
NODE_ENV=production npm start
```

**Features de Produção:**
- Frontend servido estaticamente em `/`
- SPA fallback para rotas React
- Health check em `/health`
- Error handling sem mensagens detalhadas
- CORS configurado para domínios específicos

### Considerações de Produção

#### Segurança

- [ ] Configurar CORS para origins específicas
- [ ] Usar HTTPS obrigatoriamente
- [ ] Implementar rate limiting
- [ ] Configurar security headers (Helmet.js)
- [ ] Validar todos os inputs
- [ ] Usar variáveis de ambiente (nunca commitar .env)
- [ ] Manter dependências atualizadas (`npm audit`)
- [ ] Implementar rate limiting na API

#### Performance

- [ ] Usar CDN para assets estáticos
- [ ] Implementar cache HTTP
- [ ] Comprimir responses (gzip/brotli)
- [ ] Otimizar imagens
- [ ] Monitorar performance

#### Monitoramento

- [ ] Configurar logs estruturados
- [ ] Implementar health checks
- [ ] Monitorar uptime
- [ ] Track erros (Sentry, etc)
- [ ] Monitorar métricas de API

#### Process Manager

Usar PM2, systemd ou Docker:

**PM2:**
```bash
npm install -g pm2
pm2 start dist/index.js --name kanbino
pm2 startup
pm2 save
```

**Docker:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Plataformas de Deploy

**Backend:**
- AWS EC2 / ECS
- Heroku
- Railway
- Render
- DigitalOcean App Platform

**Frontend:**
- Vercel (otimizado para React/Vite)
- Netlify
- AWS S3 + CloudFront
- Cloudflare Pages

## Troubleshooting

### Problemas Comuns

#### Backend não inicia

**Sintomas:** Erro ao executar `npm run dev`

**Soluções:**
1. Verificar se porta 3000 está livre:
   ```bash
   lsof -ti:3000 | xargs kill -9  # Linux/Mac
   ```
2. Verificar NODE_ENV no .env
3. Verificar se todas as dependências foram instaladas:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

#### Frontend não conecta ao backend

**Sintomas:** Erros de CORS ou 404 nas chamadas de API

**Soluções:**
1. Verificar se backend está rodando:
   ```bash
   curl http://localhost:3000/health
   ```
2. Verificar configuração do proxy em `vite.config.ts`
3. Verificar variável `VITE_API_BASE_URL` em `frontend/.env.development`

#### Erro de módulo não encontrado

**Sintomas:** `Cannot find module 'module-name'`

**Soluções:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpar build
rm -rf dist
npm run build
```

#### Erro de TypeScript

**Sintomas:** Erros de compilação TS

**Soluções:**
1. Verificar se imports usam `.js` (ESM requirement):
   ```typescript
   import { func } from './utils.js';  // ✅
   import { func } from './utils';     // ❌
   ```
2. Limpar cache do TypeScript:
   ```bash
   rm -rf dist
   npm run build
   ```
3. Executar type-check:
   ```bash
   npm run type-check
   ```

#### Erro de ESLint

**Sintomas:** Erros de linting

**Soluções:**
```bash
# Auto-fix
npm run lint:fix

# Verificar configuração
cat .eslintrc.js
```

#### Testes falham

**Sintomas:** Testes retornam erro

**Soluções:**
1. Verificar se backend está rodando (para testes de integração)
2. Verificar mocks em `tests/mocks/`
3. Verificar fixtures em `tests/fixtures/`
4. Executar com verbose:
   ```bash
   npm run test:verbose
   ```

#### Tailwind CSS não funciona

**Sintomas:** Estilos não aplicados

**Soluções:**
1. Compilar CSS:
   ```bash
   npm run build:css
   ```
2. Verificar se output.css existe:
   ```bash
   ls -la src/public/css/output.css
   ```
3. Verificar diretivas em `src/styles/input.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Usar watch mode:
   ```bash
   npm run build:css:watch
   ```

#### Hot reload não funciona

**Sintomas:** Alterações não refletem automaticamente

**Soluções:**
1. Verificar se nodemon/vite estão instalados:
   ```bash
   npm ls nodemon vite
   ```
2. Reiniciar servidores:
   ```bash
   # Parar (Ctrl+C) e reiniciar
   npm run dev:all
   ```

#### Erro de CORS

**Sintomas:** Erro de CORS no browser

**Soluções:**
1. Verificar configuração CORS em `src/server.ts`
2. Adicionar origin se necessário:
   ```typescript
   app.use(cors({
     origin: ['http://localhost:5173', 'https://seu-dominio.com'],
     credentials: true,
   }));
   ```

#### Porta já em uso

**Sintomas:** `EADDRINUSE: address already in use :::3000`

**Soluções:**
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows (CMD)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Ou mudar porta no .env
PORT=3001
```

#### OAuth não funciona

**Sintomas:** Erro ao tentar autenticar

**Soluções:**
1. Verificar credenciais no `.env`
2. Verificar URLs de callback configuradas no provedor OAuth
3. Verificar se CALLBACK_URL no .env bate com configurada no provedor
4. Verificar logs do backend para erros específicos

### Logs e Debugging

**Logs:**
```bash
# Nível de log configurado em .env
LOG_LEVEL=debug  # Mais verboso
LOG_LEVEL=error  # Menos verboso
```

**Debug mode:**
```bash
NODE_ENV=development npm run dev
```

**Ver logs:**
- Logs do console para debugging rápido
- Logger em `src/utils/logger.ts`
- Estruturação de logs por nível

### Recursos de Ajuda

1. **GitHub Issues:** https://github.com/VictorHSCosta/kanbino/issues
2. **Documentação Oficial:**
   - [Node.js](https://nodejs.org/docs)
   - [React](https://react.dev)
   - [TypeScript](https://www.typescriptlang.org/docs)
   - [Vite](https://vitejs.dev)
   - [Tailwind](https://tailwindcss.com/docs)
3. **Stack Overflow** (tags: nodejs, react, typescript, express)

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

3. **Crie uma branch**
   ```bash
   git checkout -b feature/nova-feature
   ```

   **Convenções de nome:**
   - `feature/` - Novas funcionalidades
   - `fix/` - Correção de bugs
   - `docs/` - Mudanças na documentação
   - `refactor/` - Refatoração de código
   - `test/` - Adição ou atualização de testes

4. **Faça suas alterações**
   - Escreva código limpo seguindo convenções do projeto
   - Adicione testes para novas funcionalidades
   - Atualize documentação se necessário

5. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: add nova feature"
   ```

   **Formato de commit:**
   - `feat:` - Nova feature
   - `fix:` - Correção de bug
   - `docs:` - Mudanças na documentação
   - `style:` - Mudanças de estilo (formatação)
   - `refactor:` - Refatoração de código
   - `test:` - Adição ou atualização de testes
   - `chore:` - Tarefas de manutenção

6. **Push para seu fork**
   ```bash
   git push origin feature/nova-feature
   ```

7. **Crie um Pull Request**
   - Vá ao GitHub e clique em "Compare & pull request"
   - Forneça uma descrição clara das mudanças
   - Link issues relacionadas se houver
   - Garanta que todos os checks CI passem

### Convenções de Código

**TypeScript/JavaScript:**
- Usar TypeScript strict mode
- Preferir `const` sobre `let`
- Usar arrow functions para callbacks
- Seguir regras ESLint (`npm run lint`)
- Tipos explícitos para props e parâmetros

**React:**
- Usar functional components com hooks
- Preferir composition sobre inheritance
- Usar TypeScript para props
- Manter componentes pequenos e focados

**Testes:**
- Manter coverage acima de 80%
- Escrever testes para novas features
- Seguir padrão AAA (Arrange, Act, Assert)
- Usar nomes descritivos para testes

**Git:**
- Commits atômicos (uma mudança lógica por commit)
- Mensagens de commit claras e descritivas
- Fazer squash de commits relacionados antes do PR
- Resolver conflitos usando `git rebase`

### Checklist para Pull Request

Antes de submeter um PR, verifique:

- [ ] Código segue convenções de estilo do projeto
- [ ] Testes passam localmente (`npm test`)
- [ ] Linting passa (`npm run lint`)
- [ ] TypeScript compila (`npm run type-check`)
- [ ] Novas features incluem testes
- [ ] Documentação está atualizada
- [ ] Commits seguem convenções
- [ ] Descrição do PR explica claramente as mudanças

### Processo de Review

1. Checks CI automáticos rodam em todos os PRs
2. Mantenedores revisam o código em até 48 horas
3. Responda ao feedback de review prontamente
4. PRs requerem pelo menos uma aprovação para merge
5. Mantenha discussões profissionais e respeitosas

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

**Resumo:**
- ✅ Uso comercial permitido
- ✅ Modificação permitida
- ✅ Distribuição permitida
- ✅ Uso privado permitido
- ❌ Liability e Warranty desclaimeds

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
- **Documentação Passport:** http://www.passportjs.org/docs/

## Agradecimentos

Desenvolvido com as seguintes tecnologias open-source:

- [Node.js](https://nodejs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [Passport.js](http://www.passportjs.org/)
- [Jest](https://jestjs.io/)

---

**Desenvolvido com ❤️ pela equipe Kanbino**

Para mais informações, visite [GitHub Repository](https://github.com/VictorHSCosta/kanbino)

**Última atualização:** Janeiro 2026
