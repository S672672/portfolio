/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        ruge: ['Ruge Boogie', 'cursive'],
        jaini : ['Jaini']
      },
    },
  },
  theme: {
    extend: {
      animation: {
        swing: "swing 1.5s infinite",
      },
      keyframes: {
        swing: {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
      },
    },
  },
  plugins: [],
}

