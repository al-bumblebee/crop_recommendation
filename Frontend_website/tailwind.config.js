/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-input": "#13170D",
        "placeholder-color": "#6E6E6E",
        "tagline": "#272E1B",
      }
    },
  },
  plugins: [],
}