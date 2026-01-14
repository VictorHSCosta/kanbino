/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./frontend/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'tech-primary': '#0ea0e9',    // Sky blue - primary tech color
        'tech-secondary': '#8a5cf6',  // Violet - cyberpunk accent
        'tech-accent': '#07b6d4',     // Cyan - bright accent
        'tech-success': '#70b981',    // Emerald green - success states
        'tech-bg-dark': '#0f172a',    // Slate 900 - dark background
        'tech-bg-light': '#f1f5f9',   // Slate 100 - light background
        'tech-text': '#334155',       // Slate 700 - primary text
      },
    },
  },
  plugins: [],
}
