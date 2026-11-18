import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand manual (Elementos Branding 2024) — digital palette.
        //   verde #465241 · olivo #65713F · terracota #CF8543 · arena #D9B37E
        // Terracota and arena are ACCENTS: neither reaches 4.5:1 as small
        // text on a light ground (terracota 2.61:1, arena 1.73:1 on crema),
        // so on light grounds small text uses verde (7.28:1) or olivo
        // (4.64:1 on crema, 5.27:1 on white). Arena is the accent on dark
        // grounds (6.66:1 on verde-osc); terracota is the accent for rules,
        // underlines, bullets and keylines on light grounds.
        brand: {
          verde: '#465241',         // manual: verde
          olivo: '#65713F',         // manual: olivo
          terracota: '#CF8543',     // manual: terracota (accent only)
          arena: '#D9B37E',         // manual: arena (accent only)
          // Deep shade of the manual verde (62% over black) for dark bands,
          // header, footer and heading text. The manual verde itself is too
          // light for those: muted crema text on it would drop to 3.8:1.
          'verde-osc': '#2B3328',
          // Historical name of the accent token, kept so existing classes
          // (and the untouched lead form) resolve to the manual arena.
          oro: '#D9B37E',
          crema: '#F5F0E8',         // warm cream background (neutral)
          'crema-osc': '#E8DFD0',   // tonal section divider (neutral)
          negro: '#1A1A1A',         // body text (neutral)
          gris: '#666666',          // muted text (neutral)
        },
      },
      fontFamily: {
        // Manual: Cardo (Bold) for titles, Lexend for text, menus, buttons
        // and forms. Self-hosted in public/fonts, declared in index.css.
        serif: ['Cardo', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Lexend', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        copy: '62ch',
      },
      // Blog article body (markdown-rendered HTML) — brand-mapped prose.
      typography: () => ({
        selva: {
          css: {
            '--tw-prose-body': '#1A1A1A',
            '--tw-prose-headings': '#2B3328',
            '--tw-prose-links': '#465241',
            '--tw-prose-bold': '#1A1A1A',
            // Ordered-list numbers are text: olivo (4.64:1 on crema), not an accent.
            '--tw-prose-counters': '#65713F',
            '--tw-prose-bullets': '#CF8543',
            '--tw-prose-hr': 'rgba(70, 82, 65, 0.15)',
            '--tw-prose-quotes': '#465241',
            '--tw-prose-quote-borders': '#CF8543',
            '--tw-prose-captions': '#666666',
            '--tw-prose-th-borders': 'rgba(70, 82, 65, 0.25)',
            '--tw-prose-td-borders': 'rgba(70, 82, 65, 0.12)',
            'h2, h3, h4': { fontFamily: 'Cardo, Georgia, serif', fontWeight: '700' },
            // Each H2 is announced by a short terracota rule — the one editorial
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
                backgroundColor: '#CF8543',
              },
            },
            h3: { fontSize: '1.28em', lineHeight: '1.3', letterSpacing: '-0.01em', marginTop: '2em' },
            p: { lineHeight: '1.75' },
            a: {
              textDecorationColor: '#CF8543',
              textUnderlineOffset: '4px',
              transition: 'color 200ms',
              '&:hover': { color: '#2B3328' },
            },
            strong: { color: '#2B3328', fontWeight: '600' },
            // Cardo, not italic sans. Set in Cardo Italic — the same voice as
            // the homepage testimonials, and the only non-bold Cardo face the
            // site ships (titles are Cardo Bold per the brand manual).
            blockquote: {
              fontFamily: 'Cardo, Georgia, serif',
              fontStyle: 'italic',
              fontWeight: '400',
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
              // Verde, not an accent: arena/terracota fail as small text on white.
              color: '#465241',
              paddingBottom: '0.7em',
            },
            'tbody td, tbody th': { paddingTop: '0.8em', paddingBottom: '0.8em', verticalAlign: 'top' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              backgroundColor: 'rgba(70, 82, 65, 0.07)',
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
