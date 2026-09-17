/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        grade: '#3b9cdc',
      },
      boxShadow: {
        panel: '0 18px 45px rgba(0,0,0,.14)',
      },
    },
  },
  plugins: [],
}
