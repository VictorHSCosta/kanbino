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
          bg: '#0f172a',
          card: 'rgba(30, 41, 59, 0.8)',
          accent: '#6366f1',
          text: '#f1f5f9',
        }
      }
    },
  },
  plugins: [],
}
