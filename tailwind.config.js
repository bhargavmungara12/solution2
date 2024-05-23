/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "340px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      secondary: "#EBEBEB",
      "grey-250": "#F2F2F2",
      "grey-300": "#EFEFEF",
      "grey-350": "#F5F5F5",
      "grey-400": "#D9D9D9",
      "grey-450": "#CECECE",
      "grey-500": "#C1C1C1",
      "grey-550": "#F3F3F3",
      "grey-575": "#DDDDDD",
      "grey-600": "#A6A6A6",
      "grey-650": "#F8F8F8",
      "grey-700": "#868686",
      "grey-750": "#7C7C7C",
      "grey-800": "#6A6A6A",
      "grey-850": "#615F5F",
      "grey-875": "#535353",
      "grey-900": "#404040",
      "black-500": "#1E1E1E",
      "white": '#FFFFFF'
    }
  },
  plugins: [],
};
