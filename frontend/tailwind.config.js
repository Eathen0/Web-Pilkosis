/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('./src/Assets/login-bg.png')",
      },
    },
  },
  plugins: [require("daisyui")],
};
