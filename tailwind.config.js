/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        'dark-blue': 'hsl(var(--dark-blue))',
        'very-dark-blue': 'hsl(var(--very-dark-blue))',
        'very-dark-blue-text': 'hsl(var(--very-dark-blue-text))',
        'dark-gray': 'hsl(var(--dark-gray))',
        'very-light-gray': 'hsl(var(--very-light-gray))'
      }
    }
  },
  plugins: []
}
