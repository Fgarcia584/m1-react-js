/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins:[require("daisyui")],
  daisyui: {
    themes: [{
      automn: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "rgb(255, 97, 88)",
        secondary: "teal",
      },
    },],
  },
}

