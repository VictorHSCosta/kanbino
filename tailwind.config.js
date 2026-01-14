/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./frontend/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'tech-dark': '#0F172A',
        'tech-highlight': '#38BDF8',
        'tech-cta': '#818CF8',
        'tech-text': '#F8FAFC',
        'tech-muted': '#94A3B8',
      },
    },
  },
  plugins: [],
}
