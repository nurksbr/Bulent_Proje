/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          light: 'rgb(var(--primary-light))',
          dark: 'rgb(var(--primary-dark))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          light: 'rgb(var(--secondary-light))',
          dark: 'rgb(var(--secondary-dark))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
} 