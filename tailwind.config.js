/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette from the approved redesign guide.
        brand: {
          verde: '#2D4A2D',         // deep jungle green
          'verde-osc': '#1C2E1C',   // darker green for sections / footer
          crema: '#F5F0E8',         // warm cream background
          'crema-osc': '#E8DFD0',   // tonal section divider
          oro: '#C8A96E',           // gold accent
          negro: '#1A1A1A',         // body text
          gris: '#666666',          // muted text
        },
      },
      fontFamily: {
        // Serif for headings (editorial / premium tone), sans-serif for body.
        serif: ['Cardo', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'Lexend', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        copy: '62ch',
      },
    },
  },
  plugins: [],
};
