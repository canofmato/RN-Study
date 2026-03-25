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
        title: ["64px", { fontFamily: "Roboto-SemiBold" }],
        label: ["12px", { fontFamily: "Roboto-SemiBold" }],
        caption: ["8px", { fontFamily: "Roboto-SemiBold" }],
        mini: ["6px", { fontFamily: "Roboto-SemiBold" }],
      },
      colors: {
        black: "#1E1E1E",
        primary: "#4FA9C8",
        green: "#81C84F",
        gray: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
