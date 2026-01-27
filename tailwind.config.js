/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./frontend/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'tech-blue': '#0f172a',
        'tech-cyan': '#06b6d4',
        'tech-purple': '#8b5cf6',
      },
    },
  },
  plugins: [],
}
