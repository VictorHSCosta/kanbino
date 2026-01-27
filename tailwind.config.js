/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./frontend/index.html",
  ],
  theme: {
    extend: {
      colors: {
        tech: {
          background: '#0a0e27',      // Azul muito escuro/quase preto
          surface: '#151932',          // Azul escuro para cards
          surfaceLight: '#1f294a',     // Azul médio para hover states
          primary: '#3b82f6',          // Azul vibrante (tech blue)
          secondary: '#06b6d4',        // Ciano (modern tech)
          accent: '#8b5cf6',           // Roxo (innovation)
          text: '#e2e8f0',             // Texto claro
          textMuted: '#94a3b8',        // Texto secundário
          success: '#10b981',          // Verde para success states
          error: '#ef4444',            // Vermelho para error states
        }
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, #0a0e27 0%, #151932 100%)',
        'tech-card': 'linear-gradient(145deg, #151932 0%, #1f294a 100%)',
      }
    },
  },
  plugins: [],
}
