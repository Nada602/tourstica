/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c0442a",
        "dark-brown": "#1a120b",
        sand: "#f9f7f4",
       
      },
      fontFamily: {
        serif: ["Ancizar Serif", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
