# Kanbino

[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Professional full-stack Node.js project with TypeScript, React, Vite, and comprehensive testing suite.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Development](#development)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Additional Resources](#additional-resources)
- [License](#license)

## Overview

Kanbino is a professional full-stack application built with modern technologies and best practices. It provides a solid foundation for building scalable web applications with TypeScript, React, and Node.js.

### Key Features

- Full-stack TypeScript for type safety across the entire codebase
- Modern React 18 with Vite for fast development experience
- Tailwind CSS for utility-first styling
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

# Start both backend and frontend
npm run dev:all
```

Your application will be available at:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173

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

### Backend Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Application Environment
NODE_ENV=development        # development, production, or test

# Server Configuration
PORT=3000                   # HTTP server port

# Logging Configuration
LOG_LEVEL=info             # debug, info, warn, or error

# Database Configuration (Optional - uncomment if needed)
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=
# DATABASE_NAME=kanbino

# API Configuration
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000          # API timeout in milliseconds
```

### Frontend Environment Variables

Create `frontend/.env.development` with:

```bash
# API Configuration
VITE_API_BASE_URL=/api     # Proxied to http://localhost:3000/api
```

### Environment-Specific Values

| Variable | Development | Production | Test |
|----------|-------------|------------|------|
| NODE_ENV | development | production | test |
| LOG_LEVEL | debug | warn | error |
| PORT | 3000 | 80 or 443 | 3001 |

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
│   │   │   └── landing/          # Landing page components
│   │   ├── pages/                # Page components
│   │   │   └── LandingPage.tsx   # Main landing page
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

## Landing Page

The application includes a modern, responsive landing page built with React and Tailwind CSS.

### Routes

- **/ (root)**: Landing page with hero, features, about, and tech stack sections
- **/app**: Main application dashboard

### Landing Page Components

The landing page is composed of modular components located in `frontend/src/components/landing/`:

- **Navigation**: Sticky navbar with smooth scroll navigation
- **HeroSection**: Main hero section with gradient background and CTAs
- **FeaturesSection**: Grid of feature cards showcasing project capabilities
- **AboutSection**: Project description with architecture overview
- **TechStackSection**: Technology showcase organized by category
- **CTASection**: Call-to-action section with links to app and GitHub
- **Footer**: Footer with links, copyright, and technology badges

### Customization

To customize the landing page content:

1. **Text Content**: Edit text directly in component files
2. **Features**: Modify the `features` array in `FeaturesSection.tsx`
3. **Tech Stack**: Update the `techStack` array in `TechStackSection.tsx`
4. **Colors**: Adjust Tailwind classes for custom theming
5. **SEO**: Update metadata in `frontend/index.html`

### Styling

The landing page uses Tailwind CSS utility classes:
- Mobile-first responsive design (`sm:`, `md:`, `lg:` breakpoints)
- Smooth animations and transitions
- Gradient backgrounds and modern UI patterns
- Consistent spacing and typography scale

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
