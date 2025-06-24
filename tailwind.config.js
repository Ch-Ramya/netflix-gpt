/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        84: "21rem",
        76: "19rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};
