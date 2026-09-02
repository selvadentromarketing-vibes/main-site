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
            // Each H2 is announced by a short gold rule — the one editorial
            // signature that repeats down a long article and makes the
            // structure scannable without heavier dividers.
            h2: {
              position: 'relative',
              paddingTop: '0.85em',
              marginTop: '2.4em',
              marginBottom: '0.7em',
              fontSize: '1.6em',
              lineHeight: '1.18',
              letterSpacing: '-0.015em',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '2.25rem',
                height: '1px',
                backgroundColor: '#C8A96E',
              },
            },
            h3: { fontSize: '1.28em', lineHeight: '1.3', letterSpacing: '-0.01em', marginTop: '2em' },
            p: { lineHeight: '1.75' },
            a: {
              textDecorationColor: '#C8A96E',
              textUnderlineOffset: '4px',
              transition: 'color 200ms',
              '&:hover': { color: '#1C2E1C' },
            },
            strong: { color: '#1C2E1C', fontWeight: '600' },
            // Cardo, not italic sans: a quote should look set, not slanted.
            blockquote: {
              fontFamily: 'Cardo, Georgia, serif',
              fontStyle: 'normal',
              fontSize: '1.15em',
              lineHeight: '1.5',
              borderLeftWidth: '2px',
              paddingLeft: '1.4em',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            hr: { marginTop: '3em', marginBottom: '3em' },
            img: { borderRadius: '1rem' },
            // Markdown tables get the same editorial treatment as the
            // hand-built ones (see .table-premium in index.css).
            table: { fontSize: '0.925em', fontVariantNumeric: 'tabular-nums' },
            'thead th': {
              fontSize: '0.78em',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: '#C8A96E',
              paddingBottom: '0.7em',
            },
            'tbody td, tbody th': { paddingTop: '0.8em', paddingBottom: '0.8em', verticalAlign: 'top' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              backgroundColor: 'rgba(45, 74, 45, 0.07)',
              padding: '0.15em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
              fontSize: '0.9em',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
