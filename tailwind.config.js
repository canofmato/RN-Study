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
        h1: "24px",
        h2: "18px",
        h3: "16px",
        label: ["12px", { fontFamily: "Roboto-Regular" }],
        caption: ["8px", { fontFamily: "Roboto-Regular" }],
        mini: ["6px", { fontFamily: "Roboto-Regular" }],
      },
      colors: {
        black: "#1E1E1E",
        white: "#FFFFFF",
        primary: "#4FA9C8",
        green: "#81C84F",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
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
