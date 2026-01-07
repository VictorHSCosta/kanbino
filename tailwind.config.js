/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./frontend/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
