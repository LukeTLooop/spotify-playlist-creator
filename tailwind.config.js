/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        "101": "1.01",
        "99": "0.99"
      }
    },
  },
  plugins: [],
}

