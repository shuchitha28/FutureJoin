module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",               
    "./src/**/*.{html,js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',  
        secondary: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      inset: {
        '1/10': '10%',
      },
      animation: {
        'spin-slower': 'spin 8s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),     
    require('@tailwindcss/typography') 
  ],
}
