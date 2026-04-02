/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        thin: ["Roboto-Thin"],
        light: ["Roboto-Light"],
        regular: ["Roboto-Regular"],
        medium: ["Roboto-Medium"],
        semibold: ["Roboto-SemiBold"],
        bold: ["Roboto-Bold"],
        black: ["Roboto-Black"],
      },
      fontSize: {
        title: "64px",
        heading1: "24px",
        heading2: "18px",
        heading3: "16px",
        body: "12px",
        caption: "8px",
        mini: "6px",
      },
      colors: {
        black: "#1E1E1E",
        white: "#FFFFFF",
        primary: "#4FA9C8",
        green: "#81C84F",
        wish: "#0D58BE",
        wishLight: "#4780D7",
        gray: {
          50: "#F4F5F6",
          100: "#E6E8EA",
          200: "#CDD1D5",
          300: "#B1B8BE",
          400: "#8A949E",
          500: "#6D7882",
          600: "#58616A",
          700: "#464C53",
          800: "#34363D",
          900: "#1F2124",
          DEFAULT: "#F5F5F5",
        },
        border: {
          gray: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
