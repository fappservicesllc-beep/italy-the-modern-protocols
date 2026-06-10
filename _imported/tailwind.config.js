
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: '#0F3D2E', // Primary dark green
        },
        ivory: {
          DEFAULT: '#F5EFE3', // Warm cream background
          100: '#FAF8F5',
        },
        gold: {
          DEFAULT: '#C9A961', // Antique gold accent
          600: '#B3934D',
        },
        charcoal: {
          DEFAULT: '#1F2937', // Near black for text
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
