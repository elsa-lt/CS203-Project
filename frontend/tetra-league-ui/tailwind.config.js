/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#1E3A8A',
        customGreen: '#10B981',
        customGray: '#2E2E2E',
        customBronze: '#CD8E46',
        customSilver: '#9A9A9A',
        customGold: '#EFBE42',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'system-ui'],
        'helvetica-neue' : ['"Helvetica Neue"', 'system-ui'],
        'sans-serif' : ['"Jaro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}