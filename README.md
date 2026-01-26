# Kanbino

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Professional full-stack Node.js project with TypeScript, React, Vite, OAuth authentication, and comprehensive testing suite.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [OAuth Authentication Setup](#oauth-authentication-setup)
- [Authentication API Documentation](#authentication-api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Glossary](#glossary)
- [Setup Checklist](#setup-checklist)
- [Contributing](#contributing)
- [Additional Resources](#additional-resources)
- [License](#license)

## Overview

Kanbino is a professional full-stack application built with modern technologies and best practices. It provides a solid foundation for building scalable web applications with TypeScript, React, and Node.js, including OAuth authentication with Google and LinkedIn.

### Key Features

- Full-stack TypeScript for type safety across the entire codebase
- Modern React 18 with Vite for fast development experience
- Tailwind CSS for utility-first styling
- OAuth 2.0 authentication (Google & LinkedIn) with Passport.js
- Session-based authentication with secure cookie management
- Comprehensive testing suite with Jest (unit, integration, e2e)
- Hot module replacement for rapid development
- ESLint and Prettier for code quality
- Husky git hooks for automated checks
- ESM modules for modern JavaScript support

## Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | >= 20.0.0 | Runtime environment |
| TypeScript | 5.6+ | Type-safe JavaScript |
| Express | 4.18+ | Web framework |
| Passport.js | 0.7.0 | Authentication middleware |
| passport-google-oauth20 | 2.0.0 | Google OAuth strategy |
| passport-linkedin-oauth2 | 2.0.0 | LinkedIn OAuth strategy |
| express-session | 1.18.1 | Session management |
| Jest | 29.7+ | Testing framework |
| ts-node | 10.9+ | TypeScript execution |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2+ | UI library |
| Vite | 5.0+ | Build tool and dev server |
| TypeScript | 5.6+ | Type-safe JavaScript |
| Tailwind CSS | 3.4+ | Utility-first CSS framework |
| PostCSS | 8.4+ | CSS processing |

### Development Tools

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks automation
- **Nodemon**: Auto-restart on file changes
- **Concurrently**: Run multiple commands simultaneously

## Architecture

Kanbino follows a monorepo structure with separate backend and frontend applications:

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
│  │  • Passport.js   │◄────────┤  • TypeScript    │      │
│  │  • OAuth Auth    │ API     │  • Tailwind CSS  │      │
│  │  • Jest Tests    │         │                  │      │
│  │  └───────────────┘         │  └───────────────┘      │
│  │                  │         │                  │      │
│  │  ┌────────────┐  │         │                  │      │
│  │  │  Google    │  │         │                  │      │
│  │  │  LinkedIn  │──┼─────────┤  OAuth Flow      │      │
│  │  │  OAuth     │  │         │                  │      │
│  │  └────────────┘  │         │                  │      │
│  └──────────────────┘         └──────────────────┘      │
│                                                           │
│  API Proxy: Vite proxies /api → http://localhost:3000    │
│  Session: HTTP-only cookies for secure authentication   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Architecture Patterns

- **ESM Modules**: Uses ES modules (`"type": "module"` in package.json)
- **Path Aliases**: Clean imports with `@/*` for both backend and frontend
- **Separation of Concerns**: Distinct backend and frontend with clear API boundaries
- **Testing Pyramid**: Unit, integration, and e2e tests with 80% coverage threshold
- **Hot Reload**: Development servers with auto-reload capabilities
- **OAuth 2.0**: Third-party authentication with Google and LinkedIn
- **Session Management**: Server-side sessions with secure cookies

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** (for cloning the repository)

### Optional (for OAuth Authentication)

- **Google Account** (for Google OAuth setup)
- **LinkedIn Account** (for LinkedIn OAuth setup)

### Installing Node.js

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS (using Homebrew):**
```bash
brew install node@20
```

**Windows:**
Download and install from [nodejs.org](https://nodejs.org/)

### Verify Installation

```bash
node --version  # Should be v20.0.0 or higher
npm --version   # Should be 9.0.0 or higher
git --version   # Should show git version
```

### Important Notes

- Node.js 20+ is required for ESM module support
- The project uses ES modules, so all imports must use `.js` extensions
- Both backend and frontend use TypeScript with strict mode enabled
- OAuth authentication is optional - the app works without it

## Quick Start

Choose the setup path that matches your needs:

### Path 1: Basic Setup (No OAuth)

Get up and running without OAuth authentication:

```bash
# [REQUIRED] Clone the repository
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# [REQUIRED] Install all dependencies
npm install

# [REQUIRED] Set up environment files (without OAuth)
cp .env.example .env
cp frontend/.env.example frontend/.env.development

# [REQUIRED] Start both backend and frontend
npm run dev:all
```

**Expected Output:**
- Backend running at http://localhost:3000
- Frontend running at http://localhost:5173
- API accessible at http://localhost:3000/api

**Verification:**
```bash
# Test backend health
curl http://localhost:3000/health

# Test frontend accessibility
curl http://localhost:5173
```

### Path 2: Full Setup (With OAuth Authentication)

Complete setup including Google and LinkedIn OAuth:

```bash
# [REQUIRED] Clone the repository
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# [REQUIRED] Install all dependencies
npm install

# [REQUIRED] Set up environment files
cp .env.example .env
cp frontend/.env.example frontend/.env.development

# [OPTIONAL] Configure OAuth credentials
# Follow the OAuth Authentication Setup section below
# Edit .env and add your GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, etc.

# [REQUIRED] Start both backend and frontend
npm run dev:all
```

**Verification:**
```bash
# Test backend health
curl http://localhost:3000/health

# Check OAuth status (if configured)
curl http://localhost:3000/api/auth/status

# Test OAuth flow by visiting:
# http://localhost:5173 and clicking "Login with Google/LinkedIn"
```

**Your application will be available at:**
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **OAuth Login**: http://localhost:5173/auth/login

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino
```

### 2. Install Dependencies

```bash
npm install
```

This installs all dependencies for both backend and frontend.

### 3. Set Up Environment Variables

#### Backend Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and configure the variables (see [Configuration](#configuration)).

#### Frontend Environment Variables

```bash
cp frontend/.env.example frontend/.env.development
```

Edit `frontend/.env.development` as needed.

### 4. Verify Installation

```bash
# Check TypeScript compilation
npm run type-check

# Run tests
npm test

# Start development server
npm run dev
```

## Configuration

### Environment Variables Overview

The following tables describe all environment variables used in the project.

#### Core Application Settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | Yes | `development` | Application environment (`development`, `production`, `test`) |
| `PORT` | Yes | `3000` | HTTP server port |
| `LOG_LEVEL` | Yes | `info` | Logging level (`debug`, `info`, `warn`, `error`) |

#### OAuth Settings (Optional)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GOOGLE_CLIENT_ID` | No | - | Google OAuth 2.0 client ID |
| `GOOGLE_CLIENT_SECRET` | No | - | Google OAuth 2.0 client secret |
| `GOOGLE_CALLBACK_URL` | No | `http://localhost:3000/api/auth/google/callback` | OAuth callback URL |
| `LINKEDIN_CLIENT_ID` | No | - | LinkedIn OAuth 2.0 client ID |
| `LINKEDIN_CLIENT_SECRET` | No | - | LinkedIn OAuth 2.0 client secret |
| `LINKEDIN_CALLBACK_URL` | No | `http://localhost:3000/api/auth/linkedin/callback` | OAuth callback URL |

#### Session Configuration

| Variable | Required | Default | Description | Warning |
|----------|----------|---------|-------------|---------|
| `SESSION_SECRET` | Yes | `your_secure_session_secret_change_in_production` | Secret key for session encryption | ⚠️ **CHANGE IN PRODUCTION** |
| `SESSION_NAME` | No | `kanbino.sid` | Name of the session cookie | - |
| `SESSION_MAX_AGE` | No | `604800000` | Session max age in milliseconds (7 days) | - |

#### Database Configuration (Optional)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_HOST` | No | `localhost` | Database host |
| `DATABASE_PORT` | No | `5432` | Database port |
| `DATABASE_USERNAME` | No | `user` | Database username |
| `DATABASE_PASSWORD` | No | - | Database password |
| `DATABASE_NAME` | No | `kanbino` | Database name |

#### API Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `API_BASE_URL` | Yes | `http://localhost:3000` | API base URL |
| `API_TIMEOUT` | Yes | `30000` | API timeout in milliseconds |

### Backend Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# =====================================================
# Application Environment / Ambiente da Aplicação
# =====================================================
NODE_ENV=development        # development, production, or test

# =====================================================
# Server Configuration / Configuração do Servidor
# =====================================================
PORT=3000                   # HTTP server port / Porta do servidor HTTP

# =====================================================
# Logging Configuration / Configuração de Logs
# =====================================================
LOG_LEVEL=info             # debug, info, warn, or error / debug, info, warn ou error

# =====================================================
# Database Configuration (Optional) / Configuração de Banco de Dados (Opcional)
# =====================================================
# Uncomment if needed / Descomente se necessário
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=
# DATABASE_NAME=kanbino

# =====================================================
# API Configuration / Configuração da API
# =====================================================
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000          # API timeout in milliseconds / Timeout da API em milissegundos

# =====================================================
# Google OAuth Configuration (Optional) / Configuração Google OAuth (Opcional)
# =====================================================
# Get credentials from: https://console.cloud.google.com/
# Obtenha credenciais em: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# =====================================================
# LinkedIn OAuth Configuration (Optional) / Configuração LinkedIn OAuth (Opcional)
# =====================================================
# Get credentials from: https://www.linkedin.com/developers/
# Obtenha credenciais em: https://www.linkedin.com/developers/
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback

# =====================================================
# Session Configuration / Configuração de Sessão
# =====================================================
# ⚠️ SECURITY WARNING: Generate a secure random string for production!
# ⚠️ AVISO DE SEGURANÇA: Gere uma string segura aleatória para produção!
# Run: openssl rand -base64 32
SESSION_SECRET=your_secure_session_secret_change_in_production
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000  # 7 days in milliseconds / 7 dias em milissegundos
```

### Frontend Environment Variables

Create `frontend/.env.development` with:

```bash
# API Configuration / Configuração da API
VITE_API_BASE_URL=/api     # Proxied to http://localhost:3000/api
```

### Environment-Specific Values

| Variable | Development | Production | Test |
|----------|-------------|------------|------|
| NODE_ENV | development | production | test |
| LOG_LEVEL | debug | warn | error |
| PORT | 3000 | 80 or 443 | 3001 |

### Quick Copy Template

All variables commented for easy setup:

```bash
# Copy this entire block to your .env file and uncomment what you need

# NODE_ENV=development
# PORT=3000
# LOG_LEVEL=info
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=
# DATABASE_NAME=kanbino
# API_BASE_URL=http://localhost:3000
# API_TIMEOUT=30000
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
# LINKEDIN_CLIENT_ID=
# LINKEDIN_CLIENT_SECRET=
# LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
# SESSION_SECRET=your_secure_session_secret_change_in_production
# SESSION_NAME=kanbino.sid
# SESSION_MAX_AGE=604800000
```

## OAuth Authentication Setup

This section provides step-by-step instructions for configuring OAuth 2.0 authentication with Google and LinkedIn.

### Overview / Visão Geral

Kanbino supports OAuth 2.0 authentication with:
- **Google OAuth 2.0**: Sign in with Google account
- **LinkedIn OAuth 2.0**: Sign in with LinkedIn account

OAuth is **optional** - the application works without it. Configure only the providers you need.

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    OAuth Authentication Flow                        │
└─────────────────────────────────────────────────────────────────────┘

  User                      Frontend                 Backend              OAuth Provider
   │                          │                         │                      │
   │  1. Click "Login"        │                         │                      │
   │─────────────────────────>│                         │                      │
   │                          │                         │                      │
   │                          │  2. GET /api/auth/google│                      │
   │                          │────────────────────────>│                      │
   │                          │                         │                      │
   │                          │                         │  3. Redirect to OAuth│
   │                          │                         │─────────────────────>│
   │                          │                         │                      │
   │  4. User authorizes      │                         │                      │
   │<─────────────────────────────────────────────────────────────────────>│
   │                          │                         │                      │
   │                          │                         │  5. Callback with code│
   │                          │                         │<─────────────────────│
   │                          │                         │                      │
   │                          │                         │  6. Exchange code for │
   │                          │                         │     access token      │
   │                          │                         │─────────────────────>│
   │                          │                         │                      │
   │                          │                         │  7. Return user data  │
   │                          │                         │<─────────────────────│
   │                          │                         │                      │
   │                          │                         │  8. Create session    │
   │                          │                         │      (cookie set)     │
   │                          │<────────────────────────│                      │
   │                          │                         │                      │
   │  9. Redirect to success  │                         │                      │
   │<─────────────────────────│                         │                      │
   │                          │                         │                      │
   │ 10. Subsequent requests  │                         │                      │
   │    include session cookie│                         │                      │
   │─────────────────────────>│                         │                      │

Success Path: User is authenticated and redirected to dashboard
Failure Path: User is redirected to login with error message
```

### Google OAuth Setup / Configuração Google OAuth

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click **"Select a project"** → **"New Project"**
4. Enter project name (e.g., "Kanbino")
5. Click **"Create"**

#### Step 2: Enable Google+ API

1. In the Google Cloud Console, navigate to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"** or **"People API"**
3. Click on it and select **"Enable"**

#### Step 3: Configure OAuth 2.0 Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** user type (for development)
3. Fill in required information:
   - **App name**: Kanbino
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Click **"Save and Continue"**
5. Skip Scopes and Test users (not required for development)
6. Click **"Save and Continue"** → **"Back to Dashboard"**

#### Step 4: Create OAuth 2.0 Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth 2.0 Client ID"**
3. Select **"Web application"** as application type
4. Configure authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://yourdomain.com/api/auth/google/callback`
5. Click **"Create"**

#### Step 5: Copy Credentials to .env

You'll receive a popup with your credentials:

1. Copy the **Client ID** to `GOOGLE_CLIENT_ID` in your `.env`
2. Copy the **Client Secret** to `GOOGLE_CLIENT_SECRET` in your `.env`

```bash
# Add to your .env file
GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_actual_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

#### Step 6: Verify Configuration

Restart your backend server and test:

```bash
# Visit in browser
http://localhost:3000/api/auth/google

# Expected: Redirect to Google login page
```

### LinkedIn OAuth Setup / Configuração LinkedIn OAuth

#### Step 1: Create LinkedIn Application

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Sign in with your LinkedIn account
3. Click **"Create App"**
4. Fill in required information:
   - **App name**: Kanbino
   - **LinkedIn Page**: Select your company page (or create one)
   - **App logo**: Upload an image (optional)
   - **Description**: Describe your application
5. Check the boxes for:
   - ✅ **Sign In with LinkedIn**
   - ✅ **I agree to the LinkedIn API Terms of Use**
6. Click **"Create App"**

#### Step 2: Configure OAuth 2.0 Redirect URLs

1. In your app dashboard, go to **"Auth"** tab
2. Find **"OAuth 2.0 Redirect URLs"**
3. Add your callback URLs:
   - Development: `http://localhost:3000/api/auth/linkedin/callback`
   - Production: `https://yourdomain.com/api/auth/linkedin/callback`
4. Click **"Update"**

#### Step 3: Copy Credentials to .env

1. In the app dashboard, go to **"Auth"** tab
2. Copy **Client ID** to `LINKEDIN_CLIENT_ID` in your `.env`
3. Copy **Client Secret** to `LINKEDIN_CLIENT_SECRET` in your `.env`

```bash
# Add to your .env file
LINKEDIN_CLIENT_ID=your_actual_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_actual_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
```

#### Step 4: Verify Configuration

Restart your backend server and test:

```bash
# Visit in browser
http://localhost:3000/api/auth/linkedin

# Expected: Redirect to LinkedIn login page
```

### Callback URL Configuration

Callback URLs must match **exactly** between your OAuth provider settings and `.env` file.

#### Development URLs

```bash
# Google
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# LinkedIn
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
```

#### Production URLs

```bash
# Google
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback

# LinkedIn
LINKEDIN_CALLBACK_URL=https://yourdomain.com/api/auth/linkedin/callback
```

⚠️ **Important**: Don't forget trailing slashes and ensure the protocol (http/https) matches.

### Security Best Practices for OAuth

1. **Never commit `.env` files** to version control
2. **Use HTTPS in production** (OAuth providers require it)
3. **Restrict callback URLs** to only the domains you own
4. **Rotate client secrets** periodically for production apps
5. **Enable app verification** for production OAuth apps
6. **Monitor OAuth usage** for suspicious activity
7. **Use environment variables** in production, never hardcode credentials

### Troubleshooting OAuth Issues

See the [Troubleshooting](#troubleshooting) section for common OAuth issues and solutions.

## Authentication API Documentation

The authentication API provides endpoints for OAuth login, session management, and user profile retrieval.

### Base URL

- **Development**: `http://localhost:3000/api/auth`
- **Production**: `https://yourdomain.com/api/auth`

### Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/google` | Initiate Google OAuth flow | No |
| GET | `/google/callback` | Google OAuth callback handler | No |
| GET | `/linkedin` | Initiate LinkedIn OAuth flow | No |
| GET | `/linkedin/callback` | LinkedIn OAuth callback handler | No |
| GET | `/status` | Check authentication status | No |
| GET | `/me` | Get current user profile | Yes |
| POST | `/logout` | Logout user and clear session | Yes |
| GET | `/success` | Auth success redirect page | No |
| GET | `/failure` | Auth failure redirect page | No |

### Endpoint Details

#### 1. Initiate Google OAuth

**GET** `/api/auth/google`

Initiates the Google OAuth 2.0 authentication flow.

**Request:**
```bash
# Browser redirect
GET /api/auth/google
```

**Response:**
```
302 Redirect to Google OAuth consent screen
```

**Frontend Example:**
```typescript
// Redirect user to Google login
const handleGoogleLogin = () => {
  window.location.href = '/api/auth/google';
};
```

#### 2. Google OAuth Callback

**GET** `/api/auth/google/callback`

Handles the callback from Google after user authorization.

**Request:**
```bash
# OAuth provider redirects here
GET /api/auth/google/callback?code=...&state=...
```

**Response:**
```
302 Redirect to /auth/success or /auth/failure
```

**Note:** This endpoint is handled automatically by Passport.js.

#### 3. Initiate LinkedIn OAuth

**GET** `/api/auth/linkedin`

Initiates the LinkedIn OAuth 2.0 authentication flow.

**Request:**
```bash
# Browser redirect
GET /api/auth/linkedin
```

**Response:**
```
302 Redirect to LinkedIn OAuth consent screen
```

**Frontend Example:**
```typescript
// Redirect user to LinkedIn login
const handleLinkedInLogin = () => {
  window.location.href = '/api/auth/linkedin';
};
```

#### 4. LinkedIn OAuth Callback

**GET** `/api/auth/linkedin/callback`

Handles the callback from LinkedIn after user authorization.

**Request:**
```bash
# OAuth provider redirects here
GET /api/auth/linkedin/callback?code=...&state=...
```

**Response:**
```
302 Redirect to /auth/success or /auth/failure
```

#### 5. Check Authentication Status

**GET** `/api/auth/status`

Check if the current session is authenticated.

**Request:**
```bash
curl -X GET http://localhost:3000/api/auth/status \
  -H "Content-Type: application/json" \
  --cookie "connect.sid=..."
```

**Response (Authenticated):**
```json
{
  "authenticated": true,
  "provider": "google" | "linkedin"
}
```

**Response (Not Authenticated):**
```json
{
  "authenticated": false
}
```

**Frontend Example:**
```typescript
const checkAuthStatus = async () => {
  const response = await fetch('/api/auth/status', {
    credentials: 'include' // Important: include cookies
  });
  const data = await response.json();
  return data.authenticated;
};
```

#### 6. Get Current User Profile

**GET** `/api/auth/me`

Get the profile of the currently authenticated user.

**Request:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Content-Type: application/json" \
  --cookie "connect.sid=..."
```

**Response (Success):**
```json
{
  "id": "123456789",
  "displayName": "John Doe",
  "email": "john.doe@example.com",
  "provider": "google",
  "photos": [
    {
      "value": "https://lh3.googleusercontent.com/..."
    }
  ]
}
```

**Response (Not Authenticated):**
```json
{
  "error": "Not authenticated"
}
```

**Frontend Example:**
```typescript
const getUserProfile = async () => {
  const response = await fetch('/api/auth/me', {
    credentials: 'include'
  });

  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    return null;
  }
};
```

#### 7. Logout User

**POST** `/api/auth/logout`

Logout the current user and clear the session.

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Content-Type: application/json" \
  --cookie "connect.sid=..."
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Frontend Example:**
```typescript
const handleLogout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    // Redirect to login page
    window.location.href = '/login';
  }
};
```

#### 8. Auth Success Redirect

**GET** `/api/auth/success`

Internal endpoint for successful authentication redirect.

**Response:**
```
302 Redirect to frontend success page
```

#### 9. Auth Failure Redirect

**GET** `/api/auth/failure`

Internal endpoint for failed authentication redirect.

**Request:**
```bash
GET /api/auth/failure?message=...
```

**Response:**
```
302 Redirect to frontend failure page with error message
```

### Frontend Integration Example

Complete React component for authentication:

```typescript
import { useEffect, useState } from 'react';

interface User {
  id: string;
  displayName: string;
  email: string;
  provider: string;
  photos?: { value: string }[];
}

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (provider: 'google' | 'linkedin') => {
    window.location.href = `/api/auth/${provider}`;
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <img
          src={user.photos?.[0]?.value}
          alt={user.displayName}
          className="w-8 h-8 rounded-full"
        />
        <span>{user.displayName}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => handleLogin('google')}>
        Login with Google
      </button>
      <button onClick={() => handleLogin('linkedin')}>
        Login with LinkedIn
      </button>
    </div>
  );
}
```

### Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `EBADCSRFTOKEN` | Invalid CSRF token | Ensure session cookie is being sent |
| `EAUTHFAILED` | OAuth authentication failed | Check OAuth credentials and callback URLs |
| `ENOSESSION` | No active session | User needs to authenticate again |
| `EPROVIDERERROR` | OAuth provider error | Check provider status and credentials |

## Project Structure

```
kanbino/
├── src/                          # Backend source code
│   ├── config/                   # Configuration files
│   │   └── index.ts              # Centralized config loading
│   ├── controllers/              # Route controllers (MVC)
│   │   └── auth.controller.ts    # Authentication controller
│   ├── middleware/               # Express middleware
│   │   └── session.config.ts     # Session middleware config
│   ├── models/                   # Data models and schemas
│   ├── routes/                   # API route definitions
│   │   ├── auth.routes.ts        # Authentication routes
│   │   └── api.routes.ts         # Main API routes
│   ├── auth/                     # Authentication module
│   │   ├── strategies/           # Passport OAuth strategies
│   │   │   ├── google.strategy.ts    # Google OAuth
│   │   │   ├── linkedin.strategy.ts  # LinkedIn OAuth
│   │   │   └── index.ts             # Strategy registry
│   │   └── user.service.ts       # User service logic
│   ├── services/                 # Business logic layer
│   ├── utils/                    # Utility functions
│   ├── styles/                   # Tailwind CSS source
│   │   └── input.css             # CSS with Tailwind directives
│   ├── public/                   # Static assets
│   │   └── css/
│   │       └── output.css        # Compiled CSS (auto-generated)
│   ├── index.ts                  # Backend entry point
│   └── server.ts                 # Express server setup
│
├── frontend/                     # Frontend application
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── services/             # API services
│   │   ├── types/                # TypeScript type definitions
│   │   ├── App.tsx               # Root React component
│   │   └── main.tsx              # React entry point
│   ├── index.html                # HTML template
│   ├── .env.development          # Frontend env variables
│   └── dist/                     # Built frontend (generated)
│
├── tests/                        # Test files
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   ├── e2e/                      # End-to-end tests
│   ├── fixtures/                 # Test fixtures and data
│   ├── helpers/                  # Test helper functions
│   └── mocks/                    # Mocks and stubs
│
├── scripts/                      # Utility scripts
│   ├── setup-env.sh              # Environment setup helper
│   ├── verify-oauth.sh           # OAuth verification script
│   └── generate-secret.sh        # Session secret generator
│
├── docs/                         # Additional documentation
│
├── .env.example                  # Backend environment template
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── .gitignore                    # Git ignore rules
├── package.json                  # Root package.json
├── tsconfig.json                 # Backend TypeScript config
├── frontend/tsconfig.json        # Frontend TypeScript config
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── jest.config.js                # Jest testing configuration
└── README.md                     # This file
```

### Key Directories Explained

- **src/**: Backend TypeScript source code with Express server
- **src/auth/**: OAuth authentication module with Passport strategies
- **frontend/**: React frontend built with Vite
- **tests/**: Comprehensive test suite organized by type
- **src/styles/**: Tailwind CSS source files
- **src/public/**: Static assets served by Express
- **scripts/**: Utility scripts for setup and verification

## Development

### Development Workflows

#### Workflow 1: Full Stack Development (Backend + Frontend)

Start both backend and frontend concurrently:

```bash
npm run dev:all
```

This starts:
- Backend on http://localhost:3000
- Frontend on http://localhost:5173
- Vite proxies `/api` requests to backend

#### Workflow 2: Backend Development Only

```bash
npm run dev
```

Backend runs on http://localhost:3000 with hot reload.

#### Workflow 3: Frontend Development Only

```bash
npm run dev:frontend
```

Frontend runs on http://localhost:5173 with API proxy to backend.

#### Workflow 4: CSS Development with Watch Mode

For focused Tailwind CSS development:

```bash
# Terminal 1: Watch CSS compilation
npm run build:css:watch

# Terminal 2: Run application
npm run dev
```

#### Workflow 5: TDD (Test-Driven Development)

```bash
# Terminal 1: Test watch mode
npm run test:watch

# Terminal 2: Development
npm run dev:all
```

### Hot Module Replacement

Both development servers support hot reload:
- **Backend**: Automatically restarts on file changes (via Nodemon)
- **Frontend**: Instant HMR for React components and styles

## Available Scripts

### Development

```bash
npm run dev              # Start backend in development mode
npm run dev:frontend     # Start frontend in development mode
npm run dev:all          # Start both backend and frontend
```

### Build

```bash
npm run build            # Compile TypeScript for backend
npm run build:frontend   # Build frontend for production
npm run build:all        # Build both backend and frontend
npm run build:css        # Compile Tailwind CSS (development)
npm run build:css:prod   # Compile Tailwind CSS (production, minified)
npm run build:css:watch  # Watch CSS compilation
```

### Production

```bash
npm start                # Start compiled backend
npm run preview:frontend # Preview built frontend
```

### Testing

```bash
npm test                 # Run all tests
npm run test:unit        # Run unit tests only
npm run test:integration # Run integration tests only
npm run test:e2e         # Run end-to-end tests only
npm run test:coverage    # Run tests with coverage report
npm run test:watch       # Run tests in watch mode
npm run test:ci          # Run tests for CI/CD
npm run test:debug       # Run tests with debugger
npm run test:verbose     # Run tests with verbose output
npm run test:silent      # Run tests with minimal output
```

### Code Quality

```bash
npm run lint             # Check for linting issues
npm run lint:fix         # Fix linting issues automatically
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Check TypeScript types (backend)
npm run type-check:frontend # Check TypeScript types (frontend)
```

### Utility Scripts

```bash
npm run setup            # Interactive environment setup
npm run verify:oauth     # Verify OAuth configuration
npm run generate:secret  # Generate secure session secret
```

### Git Hooks

```bash
npm run prepare          # Install Husky git hooks
```

## Testing

### Testing Strategy

Kanbino uses a three-tier testing approach:

1. **Unit Tests**: Test individual functions and classes in isolation
2. **Integration Tests**: Test interactions between components
3. **E2E Tests**: Test complete user flows

### Coverage Requirements

The project enforces **80% minimum code coverage** across:
- Statements
- Branches
- Functions
- Lines

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode (interactive)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Writing Tests

#### Test File Naming

```
tests/unit/example.test.ts
tests/integration/api.test.ts
tests/e2e/user-flow.test.ts
```

#### Example Test Structure

```typescript
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

### Best Practices

- Follow the AAA pattern: Arrange, Act, Assert
- Write descriptive test names
- Mock external dependencies
- Test edge cases and error scenarios
- Keep tests independent and isolated
- Use fixtures for test data

## Building for Production

### Pre-Build Checklist

Before building for production:

```bash
# 1. Check TypeScript types
npm run type-check
npm run type-check:frontend

# 2. Run linter
npm run lint

# 3. Run all tests
npm test

# 4. Check test coverage
npm run test:coverage
```

### Build Process

#### 1. Set Production Environment

```bash
# Linux/macOS
export NODE_ENV=production

# Windows (Command Prompt)
set NODE_ENV=production

# Windows (PowerShell)
$env:NODE_ENV="production"
```

#### 2. Build Backend

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

#### 3. Build Frontend

```bash
npm run build:frontend
```

This creates an optimized production build in `frontend/dist/`.

#### 4. Build All

```bash
npm run build:all
```

This builds both backend and frontend in one command.

### Build Output

- **Backend**: `dist/` directory with compiled JavaScript
- **Frontend**: `frontend/dist/` directory with minified assets
- **CSS**: `src/public/css/output.css` (minified in production)

### Running Production Build

```bash
# Start backend
NODE_ENV=production npm start

# Or serve frontend static files
npm run preview:frontend
```

## Deployment

### Production Environment Variables

Configure these in your hosting platform's environment:

#### Required Variables

```bash
NODE_ENV=production
LOG_LEVEL=warn
PORT=3000
API_BASE_URL=https://yourdomain.com
API_TIMEOUT=30000
SESSION_SECRET=<generate secure random string>
```

#### Optional OAuth Variables

```bash
# Google OAuth (if using Google login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback

# LinkedIn OAuth (if using LinkedIn login)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=https://yourdomain.com/api/auth/linkedin/callback
```

#### Database Variables (if applicable)

```bash
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_USERNAME=your-user
DATABASE_PASSWORD=your-password
DATABASE_NAME=kanbino
```

### OAuth Production Configuration

#### Update OAuth Callback URLs

When deploying to production, you must update the OAuth callback URLs:

**Google Cloud Console:**
1. Go to [APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Edit your OAuth 2.0 Client ID
3. Add production callback URL:
   ```
   https://yourdomain.com/api/auth/google/callback
   ```

**LinkedIn Developer Portal:**
1. Go to your app dashboard
2. Navigate to **Auth** tab
3. Update **OAuth 2.0 Redirect URLs**:
   ```
   https://yourdomain.com/api/auth/linkedin/callback
   ```

#### CORS Configuration

Update `src/server.ts` to whitelist your production domain:

```typescript
// Update CORS origins in src/server.ts:22
const allowedOrigins = [
  'http://localhost:5173',              // Development
  'https://yourdomain.com',             // Production
  'https://staging.yourdomain.com'      // Staging (if applicable)
];
```

#### Session Security

Ensure session cookies are secure in production:

```typescript
// src/middleware/session.config.ts
cookie: {
  secure: true,        // Must be true in production (requires HTTPS)
  httpOnly: true,      // Prevents client-side JavaScript access
  sameSite: 'lax',     // CSRF protection
  maxAge: SESSION_MAX_AGE
}
```

### Deployment Options

#### Backend Deployment

**Recommended Platforms:**
- AWS EC2 or ECS
- Heroku
- Railway
- Render
- DigitalOcean App Platform

**Process:**
1. Push code to repository
2. Connect hosting platform to GitHub
3. Configure environment variables (see above)
4. Deploy automatically on push to main branch

**Environment Variables Setup:**

**Heroku Example:**
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=443
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
heroku config:set GOOGLE_CLIENT_ID=your_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_client_secret
```

**Railway Example:**
```bash
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set SESSION_SECRET=$(openssl rand -base64 32)
```

#### Frontend Deployment

**Recommended Platforms:**
- Vercel (optimized for React/Vite)
- Netlify
- AWS S3 + CloudFront
- Cloudflare Pages

**Process:**
1. Build frontend: `npm run build:frontend`
2. Deploy `frontend/dist/` directory
3. Configure build settings if using platform's CI

**Vercel Example:**
```json
// vercel.json
{
  "buildCommand": "npm run build:frontend",
  "outputDirectory": "frontend/dist",
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://your-backend-api.com/api/:path*" }
  ]
}
```

#### Monorepo vs Separate Deployment

You can deploy:
- **Together**: Deploy backend and frontend as one unit
- **Separately**: Deploy backend and frontend independently (recommended for scalability)

### Health Checks

Implement a health check endpoint:

```typescript
// Backend health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```

Configure monitoring for:
- Application uptime
- Response times
- Error rates
- Database connectivity
- OAuth success rates

### CI/CD Pipeline

Example GitHub Actions workflow:

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

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Add deployment commands here
          echo "Deploying to production..."
```

### HTTPS Setup

HTTPS is **required** for OAuth in production.

**Using Let's Encrypt (Certbot):**

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal (configured automatically)
sudo certbot renew --dry-run
```

**Platform-Managed HTTPS:**

Most modern platforms handle HTTPS automatically:
- **Vercel**: Automatic HTTPS with custom domains
- **Netlify**: Automatic HTTPS with Let's Encrypt
- **Heroku**: Automatic HTTPS with *.herokuapp.com domains

## Security Best Practices

### Session Security

#### Generate Secure Session Secret

⚠️ **CRITICAL**: Always use a strong, random session secret in production.

```bash
# Generate a secure random string
npm run generate:secret

# Or use OpenSSL directly
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add the generated value to your production environment:

```bash
SESSION_SECRET=<generated_secret_here>
```

#### Session Cookie Configuration

Ensure session cookies are configured securely:

```typescript
// src/middleware/session.config.ts
cookie: {
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
  httpOnly: true,      // Prevents XSS attacks
  sameSite: 'lax',     // CSRF protection
  maxAge: SESSION_MAX_AGE,
  domain: undefined    // Use default to prevent subdomain issues
}
```

### OAuth Security

1. **HTTPS Required**: Always use HTTPS in production for OAuth flows
2. **Callback URL Validation**: Ensure callback URLs match exactly
3. **State Parameter**: Passport.js automatically handles OAuth state to prevent CSRF
4. **Token Storage**: Never store OAuth tokens in frontend or localStorage
5. **Credential Rotation**: Rotate client secrets periodically in production
6. **Scope Limitation**: Request only necessary OAuth scopes
7. **Domain Verification**: Verify your domain in Google Cloud Console for production

### Environment Variable Protection

1. **Never commit `.env` files** to version control
2. **Use platform environment variables** in production (Heroku config vars, Railway variables, etc.)
3. **Rotate secrets regularly** (session secret, OAuth client secrets)
4. **Limit access** to production credentials
5. **Use different secrets** for development, staging, and production
6. **Audit access logs** for credential usage

### CORS Configuration

Properly configure CORS to prevent unauthorized access:

```typescript
// src/server.ts
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // Required for cookies
}));
```

### Security Headers

Add security headers using Helmet.js:

```bash
npm install helmet
```

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### Input Validation

Validate all user inputs:

```typescript
import { body, validationResult } from 'express-validator';

app.post('/api/endpoint',
  body('email').isEmail().normalizeEmail(),
  body('name').trim().isLength({ min: 2, max: 50 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
);
```

### Rate Limiting

Implement rate limiting to prevent abuse:

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### SQL Injection Prevention

If using a database, always use parameterized queries:

```typescript
// ❌ BAD - Vulnerable to SQL injection
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ GOOD - Parameterized query
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);
```

### Production Security Checklist

Before deploying to production:

- [ ] Change `SESSION_SECRET` to a strong random value
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Update OAuth callback URLs to production domain
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS to allow only production domains
- [ ] Enable security headers (Helmet.js)
- [ ] Implement rate limiting
- [ ] Set up logging and monitoring
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Enable database backups (if applicable)
- [ ] Review OAuth scopes and permissions
- [ ] Test OAuth flow in production environment
- [ ] Set up automated security audits (npm audit)
- [ ] Configure web application firewall (WAF)
- [ ] Implement database connection encryption
- [ ] Set up intrusion detection system

## Troubleshooting

### Common Issues and Solutions

#### OAuth Authentication Issues

##### Issue: redirect_uri_mismatch Error

**Error Message:**
```
Error: redirect_uri_mismatch
The redirect URI in the request, http://localhost:3000/callback, does not match the ones authorized for the OAuth client.
```

**Root Cause:**
The callback URL in your `.env` file doesn't match exactly what's configured in your OAuth provider's console.

**Solution:**

1. **Check your `.env` file:**
   ```bash
   # Verify the callback URL
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
   ```

2. **Check Google Cloud Console:**
   - Go to [APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
   - Edit your OAuth 2.0 Client ID
   - Verify the authorized redirect URIs include:
     ```
     http://localhost:3000/api/auth/google/callback
     ```

3. **Common mistakes:**
   - Missing `/api` prefix
   - Using `https` instead of `http` in development
   - Trailing slashes or missing slashes
   - Wrong port number

4. **Restart your server** after updating `.env`:
   ```bash
   npm run dev
   ```

##### Issue: Unauthorized Client Error

**Error Message:**
```
Error: unauthorized_client
The client is unauthorized to retrieve access tokens using this method.
```

**Root Cause:**
OAuth application is not properly configured or client ID/secret is incorrect.

**Solution:**

1. **Verify credentials in `.env`:**
   ```bash
   # Check for typos or extra spaces
   GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_actual_client_secret
   ```

2. **Check OAuth application status:**
   - Google Cloud Console: Verify app is not in testing mode (or add your email as test user)
   - LinkedIn: Verify app is in "Live" status

3. **Regenerate credentials** (if needed):
   - Delete existing OAuth client
   - Create new OAuth client
   - Update `.env` with new credentials

##### Issue: Session Not Persisting

**Symptoms:**
- User appears authenticated immediately after login
- After refresh or navigation, user is logged out
- `/api/auth/me` returns "Not authenticated"

**Root Cause:**
Session configuration issue or cookie not being sent/received.

**Solution:**

1. **Check session secret is set:**
   ```bash
   # .env file
   SESSION_SECRET=your_secure_session_secret_change_in_production
   ```

2. **Verify session middleware is initialized:**
   ```typescript
   // src/server.ts
   app.use(sessionMiddleware);
   app.use(passport.initialize());
   app.use(passport.session());
   ```

3. **Check cookie settings in frontend:**
   ```typescript
   // Ensure credentials are included
   fetch('/api/auth/me', {
     credentials: 'include'  // ⚠️ Required for cookies
   });
   ```

4. **Verify CORS credentials:**
   ```typescript
   // src/server.ts
   app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true  // ⚠️ Required for cookies
   }));
   ```

5. **Check browser console** for cookie-related errors:
   - Open DevTools → Application → Cookies
   - Verify `connect.sid` cookie exists

##### Issue: CORS Errors During OAuth Flow

**Error Message:**
```
Access to XMLHttpRequest at 'https://accounts.google.com/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Root Cause:**
OAuth flow should use browser redirects, not AJAX requests.

**Solution:**

**❌ WRONG - Don't use fetch for OAuth initiation:**
```typescript
// This will cause CORS errors
fetch('/api/auth/google', { method: 'GET' });
```

**✅ CORRECT - Use window.location for OAuth:**
```typescript
// This redirects the browser (no CORS issues)
window.location.href = '/api/auth/google';
```

##### Issue: Callback URL Not Reachable

**Symptoms:**
- OAuth provider shows error after authorization
- Browser can't reach callback URL
- Network timeout or connection refused

**Solution:**

1. **Verify backend is running:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Check port is correct:**
   ```bash
   # Verify .env PORT matches
   PORT=3000
   ```

3. **Test callback URL manually:**
   ```bash
   # Visit in browser
   http://localhost:3000/api/auth/google/callback
   ```

4. **Check firewall settings** (if deploying to production)

#### General Development Issues

##### Issue: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Option 1: Kill process on port**
```bash
# Linux/macOS
lsof -ti:3000 | xargs kill -9

# Windows (Command Prompt)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

**Option 2: Change port in `.env`**
```bash
# Edit .env
PORT=3001
```

##### Issue: Module Not Found

**Error:**
```
Cannot find module 'module-name'
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# If using frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

##### Issue: TypeScript Compilation Errors

**Error:**
```
TS2307: Cannot find module '...'
```

**Solutions:**

1. **Check imports use `.js` extensions** (required for ESM):
   ```typescript
   import { myFunc } from './utils.js';  // ✅
   import { myFunc } from './utils';     // ❌
   ```

2. **Rebuild TypeScript:**
   ```bash
   npm run build
   ```

3. **Clear TypeScript cache:**
   ```bash
   rm -rf dist
   npm run build
   ```

##### Issue: Tailwind CSS Not Working

**Symptoms:**
- Styles not applied
- No classes generated

**Solutions:**

1. **Verify CSS compilation:**
   ```bash
   npm run build:css
   ```

2. **Check output file exists:**
   ```bash
   ls -la src/public/css/output.css
   ```

3. **Verify Tailwind directives in `src/styles/input.css`:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Rebuild CSS with watch mode:**
   ```bash
   npm run build:css:watch
   ```

##### Issue: Vite Proxy Not Working

**Symptoms:**
- API calls failing with 404
- CORS errors in browser console

**Solutions:**

1. **Verify backend is running:**
   ```bash
   curl http://localhost:3000
   ```

2. **Check `vite.config.ts` proxy configuration:**
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

3. **Verify frontend env variable:**
   ```bash
   # frontend/.env.development
   VITE_API_BASE_URL=/api
   ```

##### Issue: Tests Failing with Import Errors

**Error:**
```
Jest encountered an unexpected token
```

**Solutions:**

1. **Check Jest configuration** supports ESM in `jest.config.js`:
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

2. **Use `.js` extensions in test imports:**
   ```typescript
   import { myFunc } from '../src/utils.js';
   ```

##### Issue: Husky Hooks Not Running

**Symptoms:**
- Pre-commit hooks not executing
- Lint not running on commit

**Solutions:**

1. **Reinstall Husky:**
   ```bash
   npm run prepare
   # or
   npx husky install
   ```

2. **Check git hooks permissions:**
   ```bash
   ls -la .git/hooks/
   ```

3. **Verify Husky is installed:**
   ```bash
   npm ls husky
   ```

### Debugging OAuth Issues

#### Enable Debug Logging

```bash
# Set debug log level in .env
LOG_LEVEL=debug

# Restart server
npm run dev
```

#### Check Environment Variables

```bash
# Verify OAuth variables are loaded
node -e "console.log(require('dotenv').config())"
```

#### Verify Passport Strategy Registration

```typescript
// Add this to src/server.ts temporarily
console.log('Google strategy configured:', !!passport._strategies.google);
console.log('LinkedIn strategy configured:', !!passport._strategies.linkedin);
```

#### Test OAuth Flow Manually

1. **Visit the auth endpoint directly:**
   ```
   http://localhost:3000/api/auth/google
   ```

2. **Check browser console** for errors

3. **Check network tab** for failed requests

4. **Verify session cookie** is set after callback:
   - DevTools → Application → Cookies
   - Look for `connect.sid`

#### Common OAuth Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `redirect_uri_mismatch` | Callback URL doesn't match | Update OAuth provider settings |
| `unauthorized_client` | Wrong client ID/secret | Verify credentials in `.env` |
| `access_denied` | User denied authorization | User must authorize the app |
| `invalid_client` | Client ID doesn't exist | Create OAuth client in provider console |
| `EBADCSRFTOKEN` | Invalid session/CSRF token | Clear cookies and retry |

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/VictorHSCosta/kanbino/issues)
2. Review the [FAQ](#faq) section
3. Verify your configuration against the [Setup Checklist](#setup-checklist)
4. Create a new issue with:
   - Error message (full stack trace)
   - Steps to reproduce
   - Environment details (OS, Node version, OAuth provider)
   - Expected vs actual behavior
   - Your `.env` configuration (with sensitive values redacted)

## FAQ

### General Setup Questions

**Q: Do I need to configure OAuth to run the project?**

A: No, OAuth authentication is optional. The application works without it. You can run the API and frontend without configuring Google or LinkedIn OAuth. However, users won't be able to sign in with social accounts.

**Q: Can I use only one OAuth provider?**

A: Yes, you can configure only the providers you need. For example, you can use only Google OAuth and leave LinkedIn credentials empty. The application will only show the login button for configured providers.

**Q: How do I reset the session secret?**

A: Generate a new secure random string:
```bash
npm run generate:secret
# or
openssl rand -base64 32
```

Then update your `.env` file:
```bash
SESSION_SECRET=<new_secret_here>
```

Restart the server. Note: This will invalidate all existing user sessions.

**Q: Why does OAuth fail in development?**

A: Common causes:
- Callback URL mismatch between provider settings and `.env`
- Using `https` instead of `http` in callback URL (development uses `http`)
- Missing or incorrect OAuth credentials
- Backend server not running
- CORS misconfiguration

**Q: Can I deploy frontend and backend separately?**

A: Yes, but you need to:
1. Update CORS settings to allow your production domain
2. Update OAuth callback URLs to production domain
3. Configure frontend to use absolute API URL instead of proxy
4. Ensure session cookie domain is set correctly

**Q: How do I debug OAuth issues?**

A: Follow these steps:
1. Enable debug logging: `LOG_LEVEL=debug` in `.env`
2. Check browser console for JavaScript errors
3. Check browser network tab for failed requests
4. Verify environment variables are loaded correctly
5. Test OAuth endpoint directly in browser
6. Check session cookies in DevTools

### OAuth-Specific Questions

**Q: Is session data secure?**

A: Yes, sessions are server-side. Only the session ID is stored in a cookie. Actual user data is never exposed to the client. The session cookie is HTTP-only, preventing JavaScript access.

**Q: Can I add more OAuth providers?**

A: Yes! To add a new provider:
1. Install the Passport strategy: `npm install passport-<provider>-oauth2`
2. Create strategy file in `src/auth/strategies/<provider>.strategy.ts`
3. Register strategy in `src/auth/strategies/index.ts`
4. Add routes in `src/routes/auth.routes.ts`
5. Add environment variables to `.env.example`

**Q: How do I handle expired OAuth tokens?**

A: This project uses session-based authentication, not token-based. OAuth tokens are used only during the initial authentication flow. The session doesn't store OAuth tokens, so token expiration is not an issue.

**Q: What if user denies authorization?**

A: The user will be redirected to `/api/auth/failure` with an error message. The frontend should handle this gracefully and show an appropriate error message or redirect back to the login page.

**Q: Can I use OAuth for API authentication only (no frontend)?**

A: Yes, you can use the OAuth flow for pure API clients (mobile apps, CLI tools). The OAuth flow remains the same, but your client will handle redirects differently. Check the [OAuth provider's documentation](https://oauth.net/2/) for PKCE flow recommendations.

### Development Questions

**Q: Why do I need to use `.js` extensions in imports?**

A: The project uses ESM modules (`"type": "module"` in package.json). In ESM, file extensions are required. TypeScript transpiles `.ts` files to `.js`, so imports must reference the `.js` extension.

**Q: How do I add a new API endpoint?**

A: Follow these steps:
1. Create controller function in `src/controllers/`
2. Add route in `src/routes/`
3. Register route in `src/server.ts`
4. Add tests in `tests/`
5. Update API documentation

**Q: Why is my Tailwind CSS not working?**

A: Common causes:
- Forgot to compile CSS: `npm run build:css`
- Missing Tailwind directives in `src/styles/input.css`
- Not importing compiled CSS in HTML
- Incorrect Tailwind configuration

### Production Questions

**Q: Do I need HTTPS in production?**

A: **Yes**, HTTPS is required for OAuth in production. Most OAuth providers (Google, LinkedIn) block HTTP requests in production. Use Let's Encrypt for free SSL certificates.

**Q: How do I handle environment variables in production?**

A: Never use `.env` files in production. Instead:
- Use platform environment variables (Heroku config vars, Railway variables, etc.)
- Use a secrets manager (AWS Secrets Manager, HashiCorp Vault)
- Never commit secrets to version control

**Q: Can I use a custom domain?**

A: Yes, you'll need to:
1. Update OAuth callback URLs in provider consoles
2. Update CORS origins in `src/server.ts`
3. Configure DNS to point to your server
4. Set up SSL certificate for your domain

**Q: How do I scale the application?**

A: For scaling:
1. **Backend**: Use a load balancer with multiple instances
2. **Session Store**: Use Redis or similar for shared sessions
3. **Database**: Use managed database service (RDS, MongoDB Atlas)
4. **Frontend**: Use CDN (Vercel, Netlify, Cloudflare)

### Security Questions

**Q: What's the best way to generate a session secret?**

A: Use a cryptographically secure random generator:
```bash
openssl rand -base64 32
# or
npm run generate:secret
```

Never use dictionary words or predictable strings.

**Q: Should I implement rate limiting?**

A: Yes, especially for:
- Authentication endpoints (prevent brute force)
- API endpoints (prevent abuse)
- OAuth endpoints (prevent CSRF attacks)

Use `express-rate-limit` middleware.

**Q: How do I prevent CSRF attacks?**

A: The project uses:
1. SameSite cookie policy (`sameSite: 'lax'`)
2. Passport.js OAuth state parameter
3. CORS configuration
4. HTTP-only session cookies

For additional protection, implement CSRF tokens for state-changing operations.

## Glossary

### Technical Terms / Termos Técnicos

| Term / Termo | Definition / Definição |
|--------------|----------------------|
| **OAuth** | Open Authorization protocol for third-party authentication. Protocolo de autorização aberta para autenticação de terceiros. |
| **OAuth 2.0** | The current version of OAuth, providing secure authorization flows. Versão atual do OAuth, fornece fluxos de autorização seguros. |
| **Passport.js** | Authentication middleware for Node.js. Middleware de autenticação para Node.js. |
| **Callback URL** | Endpoint where OAuth provider sends user after authorization. Endpoint onde o provedor OAuth envia o usuário após autorização. |
| **Session** | Server-side user state storage. Armazenamento de estado do usuário no servidor. |
| **Session Secret** | Cryptographic key used to sign session cookies. Chave criptográfica usada para assinar cookies de sessão. |
| **ESM** | ECMAScript Modules, modern JavaScript module system. Sistema de módulos JavaScript moderno (ECMAScript Modules). |
| **Monorepo** | Repository containing multiple projects. Repositório contendo múltiplos projetos. |
| **Proxy** | Intermediary that forwards requests to backend. Intermediário que encaminha requisições para o backend. |
| **CORS** | Cross-Origin Resource Sharing policy. Política de compartilhamento de recursos entre origens. |
| **HMR** | Hot Module Replacement - instant updates without page refresh. Substituição a quente de módulos - atualizações instantâneas sem recarregar página. |
| **TypeScript** | Superset of JavaScript with type annotations. Superset do JavaScript com anotações de tipo. |
| **Vite** | Next-generation frontend build tool. Ferramenta de build frontend de nova geração. |
| **Tailwind CSS** | Utility-first CSS framework. Framework CSS com foco em classes utilitárias. |
| **Express** | Web application framework for Node.js. Framework de aplicações web para Node.js. |
| **Middleware** | Functions that have access to req, res, and next in Express. Funções que têm acesso a req, res e next no Express. |
| **HTTP-only Cookie** | Cookie inaccessible to client-side JavaScript. Cookie inacessível para JavaScript do lado do cliente. |
| **SameSite** | Cookie attribute that prevents CSRF attacks. Atributo de cookie que previne ataques CSRF. |
| **SSL/TLS** | Secure Sockets Layer / Transport Layer Security for HTTPS. Camada de soquetes seguros / Camada de transporte de segurança para HTTPS. |
| **Environment Variables** | Configuration values stored outside code. Valores de configuração armazenados fora do código. |
| **Client Secret** | Secret key used by OAuth client to authenticate with provider. Chave secreta usada pelo cliente OAuth para autenticar com provedor. |
| **Client ID** | Public identifier for OAuth application. Identificador público para aplicação OAuth. |

## Setup Checklist

Use this checklist to ensure proper setup of your Kanbino project.

### Prerequisites / Pré-requisitos

- [ ] Node.js 20+ installed / Instalado
- [ ] npm 9+ installed / Instalado
- [ ] Git installed / Instalado
- [ ] Google account (for OAuth, optional) / Conta Google (para OAuth, opcional)
- [ ] LinkedIn account (for OAuth, optional) / Conta LinkedIn (para OAuth, opcional)

### Initial Setup / Configuração Inicial

- [ ] Clone repository / Clone repositório
  ```bash
  git clone https://github.com/VictorHSCosta/kanbino.git
  cd kanbino
  ```
- [ ] Install dependencies / Instale dependências
  ```bash
  npm install
  ```
- [ ] Copy backend environment file / Copie arquivo de ambiente backend
  ```bash
  cp .env.example .env
  ```
- [ ] Copy frontend environment file / Copie arquivo de ambiente frontend
  ```bash
  cp frontend/.env.example frontend/.env.development
  ```
- [ ] Update `.env` with basic configuration / Atualize `.env` com configuração básica

### OAuth Setup (Optional) / Configuração OAuth (Opcional)

#### Google OAuth / Google OAuth

- [ ] Create Google Cloud project / Crie projeto Google Cloud
  1. Visit: https://console.cloud.google.com/
  2. Create new project / Criar novo projeto
- [ ] Enable Google+ API / Habilite Google+ API
  1. APIs & Services → Library / APIs e Serviços → Biblioteca
  2. Search "Google+ API" / Pesquisar "Google+ API"
  3. Click Enable / Clique em Habilitar
- [ ] Configure OAuth consent screen / Configure tela de consentimento OAuth
  1. APIs & Services → OAuth consent screen / APIs e Serviços → Tela de consentimento OAuth
  2. Fill required fields / Preencher campos obrigatórios
- [ ] Create OAuth 2.0 credentials / Crie credenciais OAuth 2.0
  1. APIs & Services → Credentials / APIs e Serviços → Credenciais
  2. Create Credentials → OAuth 2.0 Client ID / Criar Credenciais → ID de cliente OAuth 2.0
  3. Add callback URL: `http://localhost:3000/api/auth/google/callback`
- [ ] Copy credentials to `.env` / Copie credenciais para `.env`
  ```bash
  GOOGLE_CLIENT_ID=your_client_id
  GOOGLE_CLIENT_SECRET=your_client_secret
  GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
  ```

#### LinkedIn OAuth / LinkedIn OAuth

- [ ] Create LinkedIn Application / Crie Aplicação LinkedIn
  1. Visit: https://www.linkedin.com/developers/
  2. Create App / Criar App
- [ ] Configure OAuth redirect URLs / Configure URLs de redirecionamento OAuth
  1. Auth tab → OAuth 2.0 Redirect URLs / Aba Auth → URLs de Redirecionamento OAuth 2.0
  2. Add: `http://localhost:3000/api/auth/linkedin/callback`
- [ ] Copy credentials to `.env` / Copie credenciais para `.env`
  ```bash
  LINKEDIN_CLIENT_ID=your_client_id
  LINKEDIN_CLIENT_SECRET=your_client_secret
  LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
  ```

### Security Configuration / Configuração de Segurança

- [ ] Generate secure session secret / Gere segredo de sessão seguro
  ```bash
  npm run generate:secret
  # or / ou
  openssl rand -base64 32
  ```
- [ ] Update SESSION_SECRET in `.env` / Atualize SESSION_SECRET no `.env`
  ```bash
  SESSION_SECRET=<generated_secret>
  ```
- [ ] Verify callback URLs match exactly / Verifique que URLs de callback correspondem exatamente
- [ ] Check CORS configuration / Verifique configuração CORS

### Verification / Verificação

- [ ] Run TypeScript type check / Execute verificação de tipos TypeScript
  ```bash
  npm run type-check
  ```
- [ ] Run linter / Execute linter
  ```bash
  npm run lint
  ```
- [ ] Run tests / Execute testes
  ```bash
  npm test
  ```
- [ ] Build CSS / Construa CSS
  ```bash
  npm run build:css
  ```
- [ ] Start backend / Inicie backend
  ```bash
  npm run dev
  ```
- [ ] Start frontend (in another terminal) / Inicie frontend (em outro terminal)
  ```bash
  npm run dev:frontend
  ```
- [ ] Or start both together / Ou inicie ambos juntos
  ```bash
  npm run dev:all
  ```

### Testing OAuth Flow / Teste Fluxo OAuth (se configurado)

- [ ] Visit backend health endpoint / Visite endpoint de saúde do backend
  ```bash
  curl http://localhost:3000/health
  ```
- [ ] Check frontend accessibility / Verifique acessibilidade do frontend
  ```bash
  curl http://localhost:5173
  ```
- [ ] Check OAuth status / Verifique status OAuth
  ```bash
  curl http://localhost:3000/api/auth/status
  ```
- [ ] Visit Google OAuth endpoint / Visite endpoint Google OAuth
  ```
  http://localhost:3000/api/auth/google
  ```
- [ ] Visit LinkedIn OAuth endpoint / Visite endpoint LinkedIn OAuth
  ```
  http://localhost:3000/api/auth/linkedin
  ```
- [ ] Complete OAuth flow / Complete fluxo OAuth
- [ ] Verify user profile endpoint / Verifique endpoint de perfil de usuário
  ```bash
  curl http://localhost:3000/api/auth/me --cookie "connect.sid=..."
  ```
- [ ] Test logout / Teste logout
  ```bash
  curl -X POST http://localhost:3000/api/auth/logout --cookie "connect.sid=..."
  ```

### Production Deployment Checklist / Checklist para Produção

Before deploying to production / Antes de implantar em produção:

- [ ] Set `NODE_ENV=production` / Defina `NODE_ENV=production`
- [ ] Generate new SESSION_SECRET / Gere novo SESSION_SECRET
- [ ] Update OAuth callback URLs to HTTPS / Atualize URLs de callback OAuth para HTTPS
- [ ] Configure SSL/TLS certificate / Configure certificado SSL/TLS
- [ ] Update CORS origins / Atualize origens CORS
- [ ] Set up monitoring / Configure monitoramento
- [ ] Enable security headers / Habilite headers de segurança
- [ ] Configure rate limiting / Configure limitação de taxa
- [ ] Set up database backups (if applicable) / Configure backups de banco de dados (se aplicável)
- [ ] Test OAuth flow in production / Teste fluxo OAuth em produção
- [ ] Review error logging / Revise logs de erro
- [ ] Set up alerts / Configure alertas

### Troubleshooting / Solução de Problemas

If issues occur / Se ocorrerem problemas:

- [ ] Check environment variables are loaded / Verifique que variáveis de ambiente foram carregadas
- [ ] Verify ports are not in use / Verifique que portas não estão em uso
- [ ] Clear cache and reinstall / Limpe cache e reinstale
  ```bash
  rm -rf node_modules dist package-lock.json
  npm install
  ```
- [ ] Check browser console for errors / Verifique console do navegador para erros
- [ ] Check network tab for failed requests / Verifique aba de rede para requisições falhadas
- [ ] Review logs in terminal / Revise logs no terminal
- [ ] Try OAuth endpoints directly in browser / Tente endpoints OAuth diretamente no navegador
- [ ] Consult [Troubleshooting](#troubleshooting) section / Consulte seção [Troubleshooting](#troubleshooting)
- [ ] Check [FAQ](#faq) for common issues / Verifique [FAQ](#faq) para problemas comuns

### Estimated Time / Tempo Estimado

- Basic setup (no OAuth) / Configuração básica (sem OAuth): **10-15 minutes**
- OAuth setup / Configuração OAuth: **20-30 minutes** per provider
- Production deployment / Implantação em produção: **1-2 hours**

## Contributing

We welcome contributions! Please follow these guidelines.

### Contribution Workflow

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/kanbino.git
   cd kanbino
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

   Branch naming convention:
   - `feature/` - New features
   - `fix/` - Bug fixes
   - `docs/` - Documentation changes
   - `refactor/` - Code refactoring
   - `test/` - Adding or updating tests

4. **Make your changes**
   - Write clean code following project conventions
   - Add tests for new functionality
   - Update documentation as needed

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Commit message format:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request**
   - Go to GitHub and click "Compare & pull request"
   - Provide a clear description of changes
   - Link any related issues
   - Ensure all CI checks pass

### Code Style Guidelines

#### TypeScript/JavaScript

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Follow ESLint rules (`npm run lint`)
- Use `.js` extensions in imports (ESM requirement)

#### React

- Use functional components with hooks
- Prefer composition over inheritance
- Use TypeScript for props
- Keep components small and focused

#### Testing

- Maintain test coverage above 80%
- Write tests for new features
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names

#### Git Workflow

- Keep commits atomic (one logical change per commit)
- Write clear, descriptive commit messages
- Squash related commits before submitting PR
- Resolve merge conflicts using `git rebase`

### Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] Tests pass locally (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compiles (`npm run type-check`)
- [ ] New features include tests
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] PR description clearly explains changes

### Review Process

1. Automated CI checks run on all PRs
2. Maintainers review code within 48 hours
3. Address review feedback promptly
4. PRs require at least one approval to merge

## Additional Resources

### Official Documentation

- [Node.js Documentation](https://nodejs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Passport.js Documentation](http://www.passportjs.org/docs/)
- [OAuth 2.0 Specification](https://oauth.net/2/)

### OAuth Provider Documentation

- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [LinkedIn OAuth 2.0 Guide](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow)
- [Google Cloud Console](https://console.cloud.google.com/)
- [LinkedIn Developer Portal](https://www.linkedin.com/developers/)

### Recommended Tutorials

- [TypeScript Best Practices](https://github.com/typescript-cheatsheets/react)
- [React Hooks Guide](https://react.dev/reference/react)
- [Testing React Components](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [OAuth 2.0 Deep Dive](https://www.oauth.com/oauth2-servers/)

### Community Resources

- [Stack Overflow - Node.js](https://stackoverflow.com/questions/tagged/node.js)
- [Stack Overflow - React](https://stackoverflow.com/questions/tagged/react)
- [Stack Overflow - Passport.js](https://stackoverflow.com/questions/tagged/passport.js)
- [TypeScript Community Discord](https://discord.gg/typescript)
- [React Discord](https://discord.gg/react)

### Tools and Extensions

#### VS Code Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

#### Browser Extensions

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Tailwind DevTools](https://chrome.google.com/webstore/detail/tailwind-devtools/)

### Related Projects

- [Create React App](https://create-react-app.dev/)
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Express.js](https://expressjs.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Kanbino Team**

For more information, visit [GitHub Repository](https://github.com/VictorHSCosta/kanbino)

---

[⬆ Back to Top](#table-of-contents)
