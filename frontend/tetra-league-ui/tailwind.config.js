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
      },
    },
  },
  plugins: [],
}
