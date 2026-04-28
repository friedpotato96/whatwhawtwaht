/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        glow: {
          lemon: "#f8df3d",
          sun: "#ffd84d",
          coral: "#f56551",
          teal: "#1fb6a6",
          ink: "#161616",
          pearl: "#fbfcf8",
        },
      },
    },
  },
  plugins: [],
};
