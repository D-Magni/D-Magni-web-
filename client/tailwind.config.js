/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color" : "#800020",
        "sec-color" :"#008060",
        "overlay" : "#14141480"
      }
    },
  },
  plugins: [],
}