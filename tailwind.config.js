/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        stage: "0 0 80px 20px rgba(251, 191, 36, 0.12)",
      },
    },
  },
  plugins: [],
};
