import type { Config } from "tailwindcss";

export default {
  content: ["./client/index.html", "./client/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: "#0F3D2E",
          950: "#0A2C20",
        },
        ivory: {
          DEFAULT: "#F5EFE3",
          100: "#FAF8F5",
        },
        gold: {
          DEFAULT: "#C9A961",
          600: "#B3934D",
        },
        charcoal: {
          DEFAULT: "#1F2937",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
