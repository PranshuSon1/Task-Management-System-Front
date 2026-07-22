export default {
  darkMode: 'class', // Enables toggling dark mode manually
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#eef2ff',
          300: '#c7d2fe',
          500: '#6366f1',
          700: '#4f46e5'
        },
        muted: {
          50: '#fbfbfc',
          100: '#f4f4f5',
          300: '#e6e7ea',
          700: '#6b7280'
        }
      },
      borderRadius: {
        '4xl': '2rem'
      },
      spacing: {
        '9': '2.25rem',
        '18': '4.5rem'
      },
      boxShadow: {
        'card': '0 25px 50px -20px rgba(15,23,42,0.25)'
      }
    },
  },
  plugins: [],
}