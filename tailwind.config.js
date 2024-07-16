/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        vertical_carousel: "marquee_v 20s linear infinite",
        horizontal_carousel: "marquee_h 20s linear infinite",
        rtl_carousel: "marquee_h 20s linear infinite reverse",
      },
      keyframes: {
        marquee_v: {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" },
        },
        marquee_h: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(calc(-100% - 15.75px))" },
        }
      },
    },
  },
  plugins: [],
};
