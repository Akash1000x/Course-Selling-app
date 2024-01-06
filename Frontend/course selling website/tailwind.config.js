/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#2D2F31',
        customColorHover: '#2d2f31ea',
        bgcolor:'#F7F9FA',
      },
    },
  },
  plugins: [],
}