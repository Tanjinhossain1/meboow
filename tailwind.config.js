/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "inherit", // Set the base font size to inherit the default browser font size
      },
      colors: {
        topTableCustomGreen: "#e8f6e9", // custom color
        topTableCustomBlue: "#e8eff6", // custom color
        topTableHeadCustomGreen: "#a4c08d", // custom color
        topTableHeadCustomBlue: "#82a2bd", // custom color
      },

      keyframes: {
        "circle-animation": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        slideInFromTop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutToTop: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "circle-delay-1": "circle-animation 1.5s infinite 0s ease-in-out",
        "circle-delay-2": "circle-animation 1.5s infinite 0.5s ease-in-out",
        "circle-delay-3": "circle-animation 1.5s infinite 1s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideInFromTop: "slideInFromTop 0.5s ease-out forwards",
        slideOutToTop: "slideOutToTop 0.5s ease-in forwards",
      },
    },
  },
  plugins: [],
};
