/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #f0f7f0, #e8f5e9)",
      },
      colors: {
        lightGreen: "#f0f7f0",
        paleGreen: "#e8f5e9",
        darkGreen: "#1b5e20",
      },
      fontFamily: {
        sans: ["Lora", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-to-br":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
