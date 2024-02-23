/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        "space-cadet": "#2B2D42",
        "cool-gray": "#8D99AE",
        "anti-flash-white": "#EDF2F4",
        "red-pantone": "#EF233C",
        "fire-engine-red": "#D90429",
        "bg-water": "#ADD8E6",
        "bg-fire": "#FFA500",
        "bg-grass": "#90EE90",
        "bg-electric": "#FFFF00",
        "bg-psychic": "#FFC0CB",
        "bg-fighting": "#FF0000",
        "bg-flying": "#87CEEB",
        "bg-bug": "#90EE90",
        "bg-poison": "#800080",
        "bg-ground": "#A52A2A",
        "bg-rock": "#A9A9A9",
        "bg-ice": "#ADD8E6",
        "bg-dragon": "#FF8C00",
        "bg-steel": "#D3D3D3",
        "bg-dark": "#000000",
        "bg-fairy": "#FFC0CB",
        "bg-normal": "#DEB887",
        // text
        "t-primary": "#000000",
        "t-secondary": "#FFFFFF",
      },
      fontFamily: {
        body: ["Nunito"],
      },
      borderWidth: {
        10: "10px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
