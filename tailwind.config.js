/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // habilita dark mode via classe .dark
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./frontend/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Cores para light mode
        primary: {
          light: '#4F46E5', // indigo-600
          DEFAULT: '#4F46E5',
          dark: '#6366F1', // indigo-500
        },
        background: {
          light: '#F9FAFB', // gray-50
          DEFAULT: '#F9FAFB',
          dark: '#111827', // gray-900
        },
        surface: {
          light: '#FFFFFF', // white
          DEFAULT: '#FFFFFF',
          dark: '#1F2937', // gray-800
        },
        text: {
          primary: {
            light: '#111827', // gray-900
            DEFAULT: '#111827',
            dark: '#F9FAFB', // gray-50
          },
          secondary: {
            light: '#6B7280', // gray-500
            DEFAULT: '#6B7280',
            dark: '#9CA3AF', // gray-400
          }
        }
      }
    }
  },
  plugins: [],
}
