/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif']
      },
      colors: {
        ink: '#17202a',
        paper: '#f5f3ed',
        coral: '#ef6f61',
        teal: '#168b82',
        sun: '#f5c451'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(23, 32, 42, 0.12)'
      }
    }
  },
  plugins: []
};
