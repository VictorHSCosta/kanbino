# Kanbino

Professional Node.js project with TypeScript and comprehensive testing suite.

## Tailwind CSS Setup

Este projeto utiliza [Tailwind CSS](https://tailwindcss.com/) para estilização frontend.

### Estrutura de Arquivos

```
src/
├── styles/
│   └── input.css           # Source CSS com diretivas Tailwind
├── public/
│   ├── css/
│   │   └── output.css      # CSS compilado (gerado automaticamente)
│   └── index.html          # Página de exemplo
```

### Comandos Disponíveis

#### Desenvolvimento

```bash
# Compilar CSS uma vez
npm run build:css

# Compilar CSS com modo watch (recompila automaticamente)
npm run build:css:watch

# Iniciar aplicação (compila CSS automaticamente via predev hook)
npm run dev
```

#### Produção

```bash
# Compilar CSS otimizado (minificado e purged)
npm run build:css:prod

# Build completo (TypeScript + CSS)
npm run build
```

### Como Usar

1. **Adicionar estilos customizados**:

   Edite `src/styles/input.css`:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer components {
     .btn-primary {
       @apply bg-indigo-600 text-white px-4 py-2 rounded;
     }
   }
   ```

2. **Usar classes Tailwind no HTML**:

   ```html
   <div class="bg-blue-500 text-white p-4 rounded-lg">
     Olá Tailwind!
   </div>
   ```

3. **Configurar Tailwind**:

   Edite `tailwind.config.js` para customizar tema:

   ```javascript
   theme: {
     extend: {
       colors: {
         brand: '#3b82f6',
       }
     }
   }
   ```

### Recursos

- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Tailwind Cheatsheet](https://tailwindcomponents.com/cheatsheet/)

## Desenvolvimento

### Pré-requisitos

- Node.js >= 20.0.0
- npm >= 9.0.0

### Instalação

```bash
# Install dependencies
npm install

# Install Tailwind CSS dependencies
npm install -D tailwindcss postcss autoprefixer postcss-cli
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia aplicação em modo desenvolvimento
npm run build            # Compila TypeScript
npm run start            # Inicia aplicação compilada

# Testes
npm test                 # Executa todos os testes
npm run test:unit        # Executa testes unitários
npm run test:integration # Executa testes de integração
npm run test:e2e         # Executa testes end-to-end
npm run test:coverage    # Executa testes com coverage
npm run test:watch       # Executa testes em modo watch

# Linting e Formatação
npm run lint             # Verifica problemas de linting
npm run lint:fix         # Corrige problemas de linting automaticamente
npm run format           # Formata código com Prettier
npm run format:check     # Verifica formatação do código

# Type Checking
npm run type-check       # Verifica tipos TypeScript sem compilar
```

## Licença

MIT
