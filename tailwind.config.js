import typography from '@tailwindcss/typography';

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
      // Blog article body (markdown-rendered HTML) — brand-mapped prose.
      typography: () => ({
        selva: {
          css: {
            '--tw-prose-body': '#1A1A1A',
            '--tw-prose-headings': '#1C2E1C',
            '--tw-prose-links': '#2D4A2D',
            '--tw-prose-bold': '#1A1A1A',
            '--tw-prose-counters': '#C8A96E',
            '--tw-prose-bullets': '#C8A96E',
            '--tw-prose-hr': 'rgba(45, 74, 45, 0.15)',
            '--tw-prose-quotes': '#2D4A2D',
            '--tw-prose-quote-borders': '#C8A96E',
            '--tw-prose-captions': '#666666',
            '--tw-prose-th-borders': 'rgba(45, 74, 45, 0.25)',
            '--tw-prose-td-borders': 'rgba(45, 74, 45, 0.12)',
            'h2, h3, h4': { fontFamily: 'Cardo, Georgia, serif', fontWeight: '400' },
            a: { textDecorationColor: '#C8A96E', textUnderlineOffset: '4px' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
