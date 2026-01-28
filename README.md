# Kanbino

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![OAuth](https://img.shields.io/badge/OAuth-Google%20%7C%20LinkedIn-blue)](#oauth-setup-guide)

Professional full-stack Node.js project with TypeScript, React, Vite, and comprehensive testing suite.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Environment Variables Reference](#environment-variables-reference)
  - [OAuth Setup Guide](#oauth-setup-guide)
- [Development Setup](#development-setup)
- [Configuration Examples](#configuration-examples)
- [Setup Checklist](#setup-checklist)
- [Project Structure](#project-structure)
- [Development](#development)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
  - [Configuration Issues](#configuration-issues)
- [Contributing](#contributing)
- [Additional Resources](#additional-resources)
- [License](#license)

## Overview

Kanbino is a professional full-stack application built with modern technologies and best practices. It provides a solid foundation for building scalable web applications with TypeScript, React, and Node.js.

### Key Features

- Full-stack TypeScript for type safety across the entire codebase
- Modern React 18 with Vite for fast development experience
- Tailwind CSS for utility-first styling
- OAuth 2.0 authentication (Google and LinkedIn)
- Profile photo upload functionality
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
| passport-google-oauth20 | 2.0+ | Google OAuth 2.0 |
| passport-linkedin-oauth2 | 1.0+ | LinkedIn OAuth 2.0 |
| express-session | 1.18+ | Session management |
| Multer | 1.4.5+ | File upload handling |
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
│  │  • TypeScript    │◄────────┤  • TypeScript    │      │
│  │  • Jest Tests    │ API     │  • Tailwind CSS  │      │
│  │                  │         │                  │      │
│  └──────────────────┘         └──────────────────┘      │
│                                                           │
│  API Proxy: Vite proxies /api → http://localhost:3000    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Architecture Patterns

- **ESM Modules**: Uses ES modules (`"type": "module"` in package.json)
- **Path Aliases**: Clean imports with `@/*` for both backend and frontend
- **Separation of Concerns**: Distinct backend and frontend with clear API boundaries
- **Testing Pyramid**: Unit, integration, and e2e tests with 80% coverage threshold
- **Hot Reload**: Development servers with auto-reload capabilities

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** (for cloning the repository)

### Optional (for OAuth features)

- **Google Account** (for Google OAuth setup)
- **LinkedIn Account** (for LinkedIn OAuth setup)

### Recommended

- **VS Code** (with extensions: ESLint, Prettier, Tailwind CSS IntelliSense)

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

## Quick Start

> ⏱️ **Estimated setup time:** 15-30 minutes

Get up and running in minutes:

```bash
# Clone the repository
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino

# Install all dependencies
npm install

# Set up environment files
cp .env.example .env
cp frontend/.env.example frontend/.env.development

# Configure minimum required variables in .env
# (see Configuration section below for details)

# Start both backend and frontend
npm run dev:all
```

✅ **Your application will be available at:**
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173

📋 **Quick Verification Checklist:**
- [ ] Backend server starts without errors
- [ ] Frontend loads in browser
- [ ] API proxy is working (check browser console for CORS errors)
- [ ] Health check responds: `curl http://localhost:3000/health`

> **⚠️ Important:** For detailed configuration options, OAuth setup, and troubleshooting, see the [Configuration](#configuration) section below.

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/VictorHSCosta/kanbino.git
cd kanbino
```

### 2. Verify Node.js Version

```bash
# Check Node.js version (must be >= 20.0.0)
node --version

# Check npm version (must be >= 9.0.0)
npm --version
```

If versions are too old, see [Installing Node.js](#installing-nodejs) in Prerequisites.

### 3. Install Dependencies

```bash
npm install
```

This installs all dependencies for both backend and frontend, including:
- Backend dependencies (Express, Passport, TypeScript, etc.)
- Frontend dependencies (React, Vite, Tailwind CSS, etc.)
- Development tools (Jest, ESLint, Prettier, Husky, etc.)

**Expected output:** Creates `node_modules/` directory with ~500+ packages.

### 4. Set Up Environment Variables

#### Backend Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and configure the variables. For detailed configuration, see [Configuration](#configuration) and [Development Setup](#development-setup).

#### Frontend Environment Variables

```bash
cp frontend/.env.example frontend/.env.development
```

Edit `frontend/.env.development` as needed.

> **Note:** OAuth configuration is optional. The application will run without OAuth credentials, but authentication features will be disabled.

### 5. Verify Installation

```bash
# Check TypeScript compilation
npm run type-check

# Run tests
npm test

# Start development server
npm run dev
```

For more detailed setup guidance, see [Development Setup](#development-setup).

## Configuration

This section covers all aspects of configuring the Kanbino application, from basic setup to OAuth authentication.

### Overview

Kanbino uses environment variables for configuration. You'll need to set up:

1. **Backend configuration** (`.env` in root directory)
2. **Frontend configuration** (`frontend/.env.development`)
3. **OAuth credentials** (optional, for authentication features)

For quick setup examples, see [Configuration Examples](#configuration-examples).

For step-by-step guidance, see [Development Setup](#development-setup).

### Environment Variables Reference

#### Backend Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

| Variable | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `NODE_ENV` | string | `development` | No | Environment: `development`, `production`, or `test` |
| `PORT` | number | `3000` | No | HTTP server port |
| `LOG_LEVEL` | string | `info` | No | Logging level: `debug`, `info`, `warn`, or `error` |
| `API_BASE_URL` | string | `http://localhost:3000` | No | Base URL for API calls |
| `API_TIMEOUT` | number | `30000` | No | API timeout in milliseconds |
| `SESSION_SECRET` | string | - | Yes* | Secret for session encryption (generate secure random string) |
| `SESSION_NAME` | string | `kanbino.sid` | No | Name of the session cookie |
| `SESSION_MAX_AGE` | number | `604800000` | No | Session max age in milliseconds (7 days) |
| `GOOGLE_CLIENT_ID` | string | - | No† | Google OAuth 2.0 Client ID |
| `GOOGLE_CLIENT_SECRET` | string | - | No† | Google OAuth 2.0 Client Secret |
| `GOOGLE_CALLBACK_URL` | string | `http://localhost:3000/api/auth/google/callback` | No† | Google OAuth callback URL |
| `LINKEDIN_CLIENT_ID` | string | - | No† | LinkedIn OAuth 2.0 Client ID |
| `LINKEDIN_CLIENT_SECRET` | string | - | No† | LinkedIn OAuth 2.0 Client Secret |
| `LINKEDIN_CALLBACK_URL` | string | `http://localhost:3000/api/auth/linkedin/callback` | No† | LinkedIn OAuth callback URL |
| `DATABASE_HOST` | string | - | No‡ | Database host (optional) |
| `DATABASE_PORT` | number | `5432` | No‡ | Database port (optional) |
| `DATABASE_USERNAME` | string | - | No‡ | Database username (optional) |
| `DATABASE_PASSWORD` | string | - | No‡ | Database password (optional) |
| `DATABASE_NAME` | string | `kanbino` | No‡ | Database name (optional) |

\* Required if using session-based authentication
† Required only for OAuth features
‡ Optional database configuration (for future use)

#### Frontend Environment Variables

Create `frontend/.env.development`:

| Variable | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `VITE_API_BASE_URL` | string | `/api` | No | API base URL (proxied to backend in development) |

#### Environment-Specific Values

| Variable | Development | Production | Test |
|----------|-------------|------------|------|
| `NODE_ENV` | `development` | `production` | `test` |
| `LOG_LEVEL` | `debug` or `info` | `warn` or `error` | `error` |
| `PORT` | `3000` | `80` or `443` | `3001` |
| `API_BASE_URL` | `http://localhost:3000` | `https://yourdomain.com` | `http://localhost:3001` |
| `VITE_API_BASE_URL` | `/api` | Full production URL | `/api` |

> **⚠️ Security Warning:** Never commit `.env` files to version control. Always use `.env.example` as a template and keep actual credentials secure.

> **💡 Tip:** Generate a secure `SESSION_SECRET` with: `openssl rand -base64 32`

### Environment Variable Categories

#### Core Application Variables

**Required for basic operation:**
```bash
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
```

**Required for session management:**
```bash
SESSION_SECRET=<generate-with-openssl-rand-base64-32>
SESSION_NAME=kanbino.sid
SESSION_MAX_AGE=604800000
```

#### OAuth Variables (Optional)

**Google OAuth:**
```bash
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

**LinkedIn OAuth:**
```bash
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
```

> **Note:** OAuth credentials are optional. The application will run without them, but authentication features will be disabled. See [OAuth Setup Guide](#oauth-setup-guide) for detailed setup instructions.

#### Database Variables (Optional - Future Use)

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=user
DATABASE_PASSWORD=
DATABASE_NAME=kanbino
```

#### API Configuration Variables

```bash
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000
```

### Configuration File Locations

```
kanbino/
├── .env                      # Backend environment variables (create from .env.example)
├── .env.example              # Backend environment template
├── frontend/
│   ├── .env.development      # Frontend development variables (create from frontend/.env.example)
│   └── .env.example          # Frontend environment template
```

### Loading Order

Environment variables are loaded in this order (later overrides earlier):

1. Default values in `src/config/index.ts`
2. Variables from `.env` file
3. System environment variables

This allows you to override specific variables without editing the `.env` file.

### Validating Configuration

After setting up your environment variables, verify they're loaded correctly:

```bash
# Start the backend
npm run dev

# Check the console output for configuration logs
# Should show: "Environment: development", "Port: 3000", etc.

# Test health endpoint
curl http://localhost:3000/health

# Expected response: {"status":"healthy","timestamp":"..."}
```

If configuration fails, see [Configuration Issues](#configuration-issues) in Troubleshooting.

## OAuth Setup Guide

This guide provides step-by-step instructions for configuring OAuth 2.0 authentication with Google and LinkedIn.

> **⏱️ Time required:** ~15-30 minutes per provider
>
> **Prerequisites:** Google Account or LinkedIn Account (depending on which provider you want to configure)

### Overview

Kanbino supports OAuth 2.0 authentication with:
- **Google OAuth 2.0** - Users can sign in with their Google account
- **LinkedIn OAuth 2.0** - Users can sign in with their LinkedIn account

Both providers are **optional**. The application will function without them, but authentication features will be disabled.

### OAuth Flow Architecture

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   Browser   │         │  Kanbino    │         │   OAuth      │
│  (Frontend) │────────▶│  (Backend)  │────────▶│   Provider   │
│             │         │   Express    │         │ (Google/     │
│             │         │   Passport   │         │  LinkedIn)   │
└─────────────┘         └─────────────┘         └──────────────┘
       │                       │                        │
       │  1. Click "Sign in"   │                        │
       │──────────────────────▶│                        │
       │                       │                        │
       │                       │  2. Redirect to OAuth  │
       │                       │───────────────────────▶│
       │                       │                        │
       │                       │  3. User approves      │
       │                       │◀───────────────────────│
       │                       │                        │
       │                       │  4. Exchange code for  │
       │                       │     access token       │
       │                       │───────────────────────▶│
       │                       │                        │
       │                       │  5. Return user profile │
       │                       │◀───────────────────────│
       │                       │                        │
       │  6. Create session    │                        │
       │◀──────────────────────│                        │
       │                       │                        │
       │  7. Redirect to home  │                        │
       │◀──────────────────────│                        │
```

### Google OAuth Setup

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click **"New Project"**
5. Enter project name (e.g., "Kanbino")
6. Click **"Create"**
7. Wait for project to be created (takes ~10-30 seconds)

#### Step 2: Enable Google+ API

1. In the Google Cloud Console, make sure your new project is selected
2. Navigate to **"APIs & Services"** → **"Library"**
3. Search for **"Google+ API"** or **"People API"**
4. Click on it and press **"Enable"**

> **Note:** Google+ API is deprecated, but the API name remains in some documentation. You may need to enable "People API" instead.

#### Step 3: Configure OAuth Consent Screen

1. Navigate to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** user type (for testing) or **"Internal"** (for organization only)
3. Click **"Create"**
4. Fill in the required information:
   - **App name**: Kanbino
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click **"Save and Continue"**
6. Skip the "Scopes" section (click **"Save and Continue"**)
7. Add test users (your email address) in the "Test users" section
8. Click **"Save and Continue"**
9. Review and click **"Back to Dashboard"**

#### Step 4: Create OAuth 2.0 Credentials

1. Navigate to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** → **"OAuth 2.0 Client ID"**
3. Select **"Web application"** as application type
4. Configure the application:
   - **Name**: Kanbino Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/google/callback` (development)
     - `https://yourdomain.com/api/auth/google/callback` (production)
5. Click **"Create"**
6. **Copy the Client ID and Client Secret** (you'll need them for the next step)

#### Step 5: Configure Environment Variables

Add the following to your `.env` file:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

Replace the placeholder values with:
- `your-google-client-id.apps.googleusercontent.com` - The Client ID from Google Cloud Console
- `your-google-client-secret` - The Client Secret from Google Cloud Console

#### Step 6: Test Google OAuth

1. Restart the backend server:
   ```bash
   npm run dev
   ```

2. Visit the authentication URL:
   ```
   http://localhost:3000/api/auth/google
   ```

3. **Expected flow:**
   - Redirects to Google sign-in page
   - After signing in, redirects back to `http://localhost:3000/api/auth/google/callback`
   - Session is created
   - Redirects to application home page

4. If successful, you should be logged in with your Google account.

#### Troubleshooting Google OAuth

**Error: redirect_uri_mismatch**
- Cause: The redirect URL in `.env` doesn't match what's configured in Google Cloud Console
- Solution: Ensure exact match, including protocol (`http` vs `https`) and port number

**Error: unauthorized_client**
- Cause: OAuth consent screen not set up or app not verified
- Solution: Complete OAuth consent screen setup and add your email as a test user

**Error: access_denied**
- Cause: User denied permission or app not in testing list
- Solution: Add your email to test users in OAuth consent screen

### LinkedIn OAuth Setup

#### Step 1: Create LinkedIn Application

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Sign in with your LinkedIn account
3. Click **"Create App"**
4. Fill in the required information:
   - **App name**: Kanbino
   - **LinkedIn Page**: Select your company page (or create a new one)
   - **App logo**: Upload an app logo (128x128px recommended)
   - **Description**: Brief description of your application
5. Check the box to agree to the LinkedIn API Terms of Use
6. Click **"Create App"**

#### Step 2: Configure OAuth 2.0 Settings

1. In the LinkedIn Developer Portal, select your newly created app
2. Navigate to **"Auth"** tab
3. Scroll to **"OAuth 2.0 Redirect URLs"**
4. Add the following redirect URLs:
   - `http://localhost:3000/api/auth/linkedin/callback` (development)
   - `https://yourdomain.com/api/auth/linkedin/callback` (production)
5. Click **"Update"**

#### Step 3: Configure Permissions

1. In the **"Auth"** tab, scroll to **"Default Application Permissions"**
2. Add the following scopes:
   - `r_liteprofile` - Basic profile information
   - `r_emailaddress` - Email address
3. Click **"Update"**

> **Note:** LinkedIn may require additional verification steps for production use. During development, you can use the app in "Test Mode" with a limited number of users.

#### Step 4: Get Credentials

1. In the LinkedIn Developer Portal, navigate to your app
2. Go to the **"Auth"** tab
3. Copy the **Client ID** and **Client Secret**

#### Step 5: Configure Environment Variables

Add the following to your `.env` file:

```bash
# LinkedIn OAuth Configuration
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
```

Replace the placeholder values with:
- `your-linkedin-client-id` - The Client ID from LinkedIn Developer Portal
- `your-linkedin-client-secret` - The Client Secret from LinkedIn Developer Portal

#### Step 6: Test LinkedIn OAuth

1. Restart the backend server:
   ```bash
   npm run dev
   ```

2. Visit the authentication URL:
   ```
   http://localhost:3000/api/auth/linkedin
   ```

3. **Expected flow:**
   - Redirects to LinkedIn sign-in page
   - After signing in, asks for permission to access profile
   - After granting permission, redirects back to `http://localhost:3000/api/auth/linkedin/callback`
   - Session is created
   - Redirects to application home page

4. If successful, you should be logged in with your LinkedIn account.

#### Troubleshooting LinkedIn OAuth

**Error: Invalid redirect_uri**
- Cause: The redirect URL in `.env` doesn't match what's configured in LinkedIn Developer Portal
- Solution: Ensure exact match, including protocol (`http` vs `https`), port number, and path

**Error: unauthorized_client**
- Cause: OAuth app not properly configured or not in test mode
- Solution: Verify app settings and ensure you're using a test account

**Error: access_denied**
- Cause: User denied permission or invalid scopes
- Solution: Ensure correct permissions (`r_liteprofile`, `r_emailaddress`) are configured

### Testing OAuth Locally

#### Manual Testing with Browser

1. Start the application:
   ```bash
   npm run dev:all
   ```

2. Open your browser and navigate to the frontend:
   ```
   http://localhost:5173
   ```

3. Test Google OAuth:
   - Click "Sign in with Google" button (or navigate to `/api/auth/google`)
   - Complete the OAuth flow
   - Verify you're redirected back to the application
   - Check browser console for any errors

4. Test LinkedIn OAuth:
   - Click "Sign in with LinkedIn" button (or navigate to `/api/auth/linkedin`)
   - Complete the OAuth flow
   - Verify you're redirected back to the application
   - Check browser console for any errors

#### Testing with cURL

You can test OAuth endpoints directly:

```bash
# Test Google OAuth initiation
curl -I http://localhost:3000/api/auth/google

# Test LinkedIn OAuth initiation
curl -I http://localhost:3000/api/auth/linkedin

# Test callback endpoint (should redirect if not authenticated)
curl -I http://localhost:3000/api/auth/google/callback
curl -I http://localhost:3000/api/auth/linkedin/callback
```

#### Verifying Session

After successful OAuth, verify the session is created:

```bash
# Check session cookie
curl -v http://localhost:3000/api/auth/check 2>&1 | grep -i "cookie"

# Should show: Set-Cookie: kanbino.sid=...
```

### OAuth in Production

When deploying to production, update your OAuth configuration:

#### 1. Update Callback URLs

**Google Cloud Console:**
- Add production redirect URI: `https://yourdomain.com/api/auth/google/callback`
- Remove or keep development URLs for testing

**LinkedIn Developer Portal:**
- Add production redirect URL: `https://yourdomain.com/api/auth/linkedin/callback`
- Remove or keep development URLs for testing

#### 2. Update Environment Variables

```bash
# Production .env
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
LINKEDIN_CALLBACK_URL=https://yourdomain.com/api/auth/linkedin/callback
```

#### 3. Security Best Practices

- **Use HTTPS in production** - OAuth providers require HTTPS for production apps
- **Set cookie security flags** - Ensure `secure: true` and `httpOnly: true` for cookies in production
- **Rotate secrets regularly** - Change `CLIENT_SECRET` values periodically
- **Monitor OAuth usage** - Set up alerts for suspicious authentication activity
- **Limit redirect URIs** - Only add necessary and trusted redirect URLs

#### 4. Domain Verification

Some OAuth providers require domain verification:

- **Google**: Verify domain in Google Search Console
- **LinkedIn**: Add domain verification in LinkedIn Developer Portal

#### 5. App Verification (For Public Apps)

For production apps accessible to the public:

- **Google**: Submit app for verification if accessing sensitive scopes
- **LinkedIn**: Apply for production access and complete verification process

> **⚠️ Warning:** Unverified apps have usage limits (usually 100 test users). For public deployment, complete the verification process.

### Disabling OAuth

If you don't need OAuth authentication, simply:

1. Leave OAuth environment variables empty or remove them from `.env`
2. The application will run without authentication features
3. Users will access the application without login requirements

### OAuth Configuration Summary

| Provider | Client ID | Client Secret | Callback URL | Scopes |
|----------|-----------|---------------|--------------|--------|
| Google | `GOOGLE_CLIENT_ID` | `GOOGLE_CLIENT_SECRET` | `/api/auth/google/callback` | profile, email |
| LinkedIn | `LINKEDIN_CLIENT_ID` | `LINKEDIN_CLIENT_SECRET` | `/api/auth/linkedin/callback` | r_liteprofile, r_emailaddress |

### Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [LinkedIn Authentication Guide](https://learn.microsoft.com/en-us/linkedin/shared/references/v2/authentication/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [OAuth 2.0 Simplified](https://oauth2simplified.com/)

## Development Setup

This section provides detailed, step-by-step instructions for setting up a complete development environment for Kanbino.

> **⏱️ Estimated time:** 20-40 minutes
>
> **Difficulty:** Beginner-friendly

### Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js** >= 20.0.0 installed
- [ ] **npm** >= 9.0.0 available
- [ ] **Git** installed and configured
- [ ] **Code editor** (VS Code recommended)
- [ ] **Terminal/Command Prompt** access
- [ ] (Optional) **Google Account** for Google OAuth
- [ ] (Optional) **LinkedIn Account** for LinkedIn OAuth

### Step 1: Verify System Requirements

#### Check Node.js Version

```bash
node --version
# Expected output: v20.0.0 or higher

npm --version
# Expected output: 9.0.0 or higher
```

**If Node.js is not installed or version is too old:**

<details>
<summary><strong>Install Node.js on Linux (Ubuntu/Debian)</strong></summary>

```bash
# Remove old versions (if any)
sudo apt-get remove nodejs npm

# Add NodeSource repository for Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

</details>

<details>
<summary><strong>Install Node.js on macOS</strong></summary>

**Using Homebrew (recommended):**
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js 20
brew install node@20

# Link the installation
brew link node@20

# Verify installation
node --version
npm --version
```

**Using official installer:**
Download from [nodejs.org](https://nodejs.org/)

</details>

<details>
<summary><strong>Install Node.js on Windows</strong></summary>

1. Download the Windows installer from [nodejs.org](https://nodejs.org/)
2. Run the installer with default options
3. Restart your terminal/command prompt
4. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

</details>

#### Check Git Installation

```bash
git --version
# Expected output: git version 2.x.x or higher
```

**If Git is not installed:**

<details>
<summary><strong>Install Git</strong></summary>

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install git
```

**macOS:**
```bash
# macOS usually comes with Git pre-installed
# Or install via Homebrew:
brew install git
```

**Windows:**
Download from [git-scm.com](https://git-scm.com/downloads)

</details>

### Step 2: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/VictorHSCosta/kanbino.git

# Navigate into the project directory
cd kanbino

# Verify you're in the right directory
pwd
# Expected: .../kanbino
```

### Step 3: Install Dependencies

```bash
# Install all dependencies (backend and frontend)
npm install
```

**What happens during `npm install`:**
- Downloads and installs ~500+ packages
- Creates `node_modules/` directory
- Generates `package-lock.json` for reproducible builds
- Installs backend dependencies (Express, Passport, TypeScript, etc.)
- Installs frontend dependencies (React, Vite, Tailwind CSS, etc.)
- Installs development tools (Jest, ESLint, Prettier, Husky, etc.)

**Expected time:** 1-3 minutes (depending on internet connection)

**Verify installation:**
```bash
# Check node_modules exists
ls node_modules | wc -l
# Expected: 500+ directories

# Check package versions
npm list --depth=0
```

**Troubleshooting:**

If installation fails, try:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Step 4: Create Environment Files

#### Backend Environment File

```bash
# Copy the example file
cp .env.example .env

# Verify the file was created
ls -la .env
# Expected: -rw-r--r-- ... .env
```

#### Frontend Environment File

```bash
# Create frontend directory if it doesn't exist
mkdir -p frontend

# Copy the example file
cp frontend/.env.example frontend/.env.development

# Verify the file was created
ls -la frontend/.env.development
# Expected: -rw-r--r-- ... frontend/.env.development
```

### Step 5: Configure Environment Variables

#### Minimum Required Configuration

For a basic development setup, configure these variables in `.env`:

```bash
# .env - Minimum configuration
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
SESSION_SECRET=dev-secret-change-in-production
```

**Explanation:**
- `NODE_ENV`: Set to `development` for verbose logging
- `PORT`: Backend server port (default: 3000)
- `LOG_LEVEL`: Logging verbosity (`debug`, `info`, `warn`, `error`)
- `SESSION_SECRET`: Secret for session encryption (change for production)

#### Generate Secure Session Secret

For development, you can use a simple secret. For production, generate a secure one:

```bash
# Generate a secure random secret
openssl rand -base64 32

# Copy the output to your .env file
# Example output: xK9mN2pQ4rT7vY1zA3bC5dE6fG8hJ0kL=
```

#### Optional: Configure OAuth (for authentication features)

If you want to enable OAuth authentication, see [OAuth Setup Guide](#oauth-setup-guide) for detailed instructions.

For now, you can leave OAuth variables empty or commented out.

### Step 6: Configure Frontend

The frontend configuration is minimal:

```bash
# frontend/.env.development
VITE_API_BASE_URL=/api
```

**Explanation:**
- `VITE_API_BASE_URL`: API base URL (uses Vite proxy in development)
- `/api` proxies to `http://localhost:3000/api` via Vite

### Step 7: Verify Project Structure

After completing the above steps, your project structure should look like this:

```bash
# Verify important files exist
ls -la

# Expected output should include:
# .env                  (your environment configuration)
# .env.example          (environment template)
# package.json          (backend dependencies)
# tsconfig.json         (TypeScript config)
# vite.config.ts        (Vite build config)
# src/                  (backend source code)
# frontend/             (frontend source code)
# tests/                (test files)
```

```bash
# Verify frontend structure
ls -la frontend/

# Expected output should include:
# .env.development      (frontend environment config)
# .env.example          (frontend environment template)
# src/                  (React source code)
# index.html            (HTML template)
# package.json          (frontend dependencies)
# tsconfig.json         (frontend TypeScript config)
```

### Step 8: Verify TypeScript Configuration

```bash
# Check backend TypeScript
npm run type-check

# Expected output: No errors
# Should show: "✓ TypeScript compilation successful"

# Check frontend TypeScript
npm run type-check:frontend

# Expected output: No errors
# Should show: "✓ Frontend TypeScript compilation successful"
```

**If TypeScript errors occur:**

<details>
<summary><strong>Common TypeScript issues</strong></summary>

**Issue: TS2307 Cannot find module**
- **Cause:** Missing `.js` extension in imports (ESM requirement)
- **Solution:** Add `.js` extension to all relative imports
  ```typescript
  // Correct
  import { myFunc } from './utils.js';

  // Incorrect
  import { myFunc } from './utils';
  ```

**Issue: Cannot find type definitions**
- **Solution:** Install missing type definitions
  ```bash
  npm install --save-dev @types/node
  ```

</details>

### Step 9: Run Linter and Formatter

```bash
# Check for linting issues
npm run lint

# Expected output: No errors or warnings

# Format code
npm run format

# Expected output: No errors
```

### Step 10: Start Development Servers

#### Option 1: Start Both Backend and Frontend (Recommended)

```bash
npm run dev:all
```

This starts:
- Backend on http://localhost:3000
- Frontend on http://localhost:5173
- Vite proxy for `/api` → `http://localhost:3000/api`

#### Option 2: Start Backend Only

```bash
npm run dev
```

Backend runs on http://localhost:3000 with hot reload (Nodemon).

#### Option 3: Start Frontend Only

```bash
npm run dev:frontend
```

Frontend runs on http://localhost:5173 with API proxy to backend.

### Step 11: Verify Setup

#### Check Backend Health

```bash
# In a new terminal, test the backend
curl http://localhost:3000/health

# Expected response:
# {"status":"healthy","timestamp":"2024-01-15T10:30:00.000Z"}
```

#### Check Frontend

1. Open your browser
2. Navigate to: http://localhost:5173
3. Verify the application loads
4. Open browser DevTools (F12)
5. Check console for errors (should be none)

#### Check API Proxy

```bash
# Test API proxy through frontend
curl http://localhost:5173/api/health

# Expected response:
# {"status":"healthy","timestamp":"2024-01-15T10:30:00.000Z"}
```

### Step 12: Run Tests (Optional but Recommended)

```bash
# Run all tests
npm test

# Expected: All tests pass
# Should see: "Test Suites: X passed, X total"
```

### Common Setup Issues and Solutions

<details>
<summary><strong>Issue: Port already in use (EADDRINUSE)</strong></summary>

**Error message:**
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
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

**Option 2: Change port in .env**
```bash
# Edit .env
PORT=3001
```

</details>

<details>
<summary><strong>Issue: Module not found</strong></summary>

**Error message:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

</details>

<details>
<summary><strong>Issue: Environment variables not loading</strong></summary>

**Symptoms:** Configuration shows default values

**Solution:**
```bash
# Verify .env file exists
cat .env

# Check file is named correctly (not .env.example)
ls -la | grep "\.env$"

# Restart the server after changing .env
npm run dev
```

</details>

### Development Setup Verification Checklist

After completing the setup, verify:

- [ ] Node.js version is >= 20.0.0
- [ ] npm version is >= 9.0.0
- [ ] Repository cloned successfully
- [ ] Dependencies installed (`node_modules/` exists)
- [ ] `.env` file created and configured
- [ ] `frontend/.env.development` file created
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Linter passes (`npm run lint`)
- [ ] Backend starts on port 3000
- [ ] Frontend starts on port 5173
- [ ] Health check endpoint responds: `curl http://localhost:3000/health`
- [ ] Frontend loads in browser
- [ ] API proxy works (no CORS errors in console)

### What's Next?

After completing the development setup:

1. **Configure OAuth** (optional) - See [OAuth Setup Guide](#oauth-setup-guide)
2. **Explore the codebase** - See [Project Structure](#project-structure)
3. **Start development** - See [Development](#development)
4. **Write tests** - See [Testing](#testing)
5. **Build for production** - See [Building for Production](#building-for-production)

### Recommended VS Code Extensions

For the best development experience, install these extensions:

- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** - JavaScript/TypeScript linting
- **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** - Code formatting
- **[TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)** - Auto-import TypeScript modules
- **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** - Tailwind CSS autocompletion
- **[Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)** - Auto rename paired HTML tags
- **[Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)** - Colorize matching brackets

### Getting Help

If you encounter issues during setup:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [Configuration Issues](#configuration-issues) subsection
3. Search existing [GitHub Issues](https://github.com/VictorHSCosta/kanbino/issues)
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - System information (OS, Node version, npm version)
   - What you expected vs what actually happened

## Project Structure

```
kanbino/
├── src/                          # Backend source code
│   ├── config/                   # Configuration files
│   ├── controllers/              # Route controllers (MVC)
│   ├── middleware/               # Express middleware
│   ├── models/                   # Data models and schemas
│   ├── routes/                   # API route definitions
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
- **frontend/**: React frontend built with Vite
- **tests/**: Comprehensive test suite organized by type
- **src/styles/**: Tailwind CSS source files
- **src/public/**: Static assets served by Express

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

Configure these in your hosting environment:

```bash
NODE_ENV=production
LOG_LEVEL=warn
PORT=3000

# Database (if applicable)
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_USERNAME=your-user
DATABASE_PASSWORD=your-password
DATABASE_NAME=kanbino

# API
API_BASE_URL=https://your-domain.com
API_TIMEOUT=30000
```

### Security Considerations

#### Critical Security Practices

1. **Never commit `.env` files** - Use environment variables in your hosting platform
2. **Use HTTPS in production** - Required for secure data transmission
3. **Configure CORS properly** - Whitelist allowed origins only
4. **Enable security headers** - Use Helmet.js or similar middleware
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Rate limiting** - Implement API rate limiting
7. **Input validation** - Validate all user inputs
8. **SQL Injection prevention** - Use parameterized queries

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
3. Configure environment variables
4. Deploy automatically on push to main branch

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

#### Monorepo vs Separate Deployment

You can deploy:
- **Together**: Deploy backend and frontend as one unit
- **Separately**: Deploy backend and frontend independently (recommended for scalability)

### Health Checks

Implement a health check endpoint:

```typescript
// Backend health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});
```

Configure monitoring for:
- Application uptime
- Response times
- Error rates
- Database connectivity

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
```

## Troubleshooting

### Common Issues and Solutions

#### Issue: Port Already in Use

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

#### Issue: Module Not Found

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

#### Issue: TypeScript Compilation Errors

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

#### Issue: Tailwind CSS Not Working

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

#### Issue: Vite Proxy Not Working

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

#### Issue: Tests Failing with Import Errors

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

#### Issue: Husky Hooks Not Running

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

#### Issue: ESLint/Prettier Conflicts

**Symptoms:**
- Code formatting inconsistencies
- Linting errors after formatting

**Solutions:**

1. **Run both commands in order:**
   ```bash
   npm run format
   npm run lint:fix
   ```

2. **Check configurations are compatible** in `.eslintrc.js` and `.prettierrc`

3. **Disable specific Prettier rules in ESLint:**
   ```javascript
   // .eslintrc.js
   {
     rules: {
       'prettier/prettier': 'error',
     },
   }
   ```

#### Issue: Build Fails in Production

**Error:**
```
Build failed with exit code 1
```

**Solutions:**

1. **Set NODE_ENV correctly:**
   ```bash
   export NODE_ENV=production
   ```

2. **Check all environment variables are set:**
   ```bash
   cat .env
   ```

3. **Verify TypeScript compiles:**
   ```bash
   npm run type-check
   ```

4. **Check disk space:**
   ```bash
   df -h
   ```

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/VictorHSCosta/kanbino/issues)
2. Review the [Additional Resources](#additional-resources)
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version)
   - Expected vs actual behavior

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

### Recommended Tutorials

- [TypeScript Best Practices](https://github.com/typescript-cheatsheets/react)
- [React Hooks Guide](https://react.dev/reference/react)
- [Testing React Components](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

### Community Resources

- [Stack Overflow - Node.js](https://stackoverflow.com/questions/tagged/node.js)
- [Stack Overflow - React](https://stackoverflow.com/questions/tagged/react)
- [TypeScript Community Discord](https://discord.gg/typescript)
- [React Discord](https://discord.gg/react)

### Tools and Extensions

#### VS Code Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

#### Browser Extensions

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Tailwind DevTools](https://chrome.google.com/webstore/detail/tailwind-devtools/)

### Related Projects

- [Create React App](https://create-react-app.dev/)
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Kanbino Team**

For more information, visit [GitHub Repository](https://github.com/VictorHSCosta/kanbino)
