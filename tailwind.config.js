/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#0F141A',
          50: '#262D33',
          100: '#2F2F2F',
          200: '#307B23',
          300: '#57E140',
          400: '#B2EDA8',
          500: '#ffa726',
          600: '#f57c00'
        }
      }
    }
  },
  plugins: []
}
