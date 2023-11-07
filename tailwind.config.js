/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        blog: "url('/public/bg-img.jpg')",
      },
    },
    fontSize: {
      base: ["16px", "24px"],
      sm: [
        "12px",
        {
          lineHeight: "20px",
        },
      ],
      "2xl": [
        "24px",
        {
          letterSpacing: "-0.01em",
        },
      ],
      "3xl": [
        "32px",
        {
          letterSpacing: "-0.02em",
          lineHeight: "40px",
        },
      ],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
