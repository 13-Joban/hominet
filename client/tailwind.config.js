/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#9cd8f8"
      },
      colors: {
        skyblue: '#D5E4F3',
        red: '#E26C66',
        neongreen: '#6BEC81',
        grey: '#707070',
        black: '#000000',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}