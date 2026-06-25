import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Translation } from '../i18n/translations';
import type { Lang } from '../i18n/translations';

interface HeaderProps {
  t: Translation;
  lang: Lang;
  otherLang: Lang;
  swapLangUrl: string;
}

const NAV_LINKS: Array<{ id: string; key: keyof Translation['nav'] }> = [
  { id: 'acerca', key: 'project' },
  { id: 'suspiro', key: 'suspiro' },
  { id: 'masterplan', key: 'masterplan' },
  { id: 'inversion', key: 'investment' },
  { id: 'testimonios', key: 'testimonials' },
];

export default function Header({ t, lang, otherLang, swapLangUrl }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-verde-osc/95 backdrop-blur-md py-3 shadow-lg shadow-black/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
        <a
          href={lang === 'en' ? '/en' : '/'}
          aria-label="Selvadentro"
          className="shrink-0"
        >
          <img
            src="/logo-cream.webp"
            alt="Selvadentro · tierra de cenotes"
            className="h-10 sm:h-12 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 text-brand-crema/85 text-sm tracking-wide">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="hover:text-brand-oro transition-colors"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={swapLangUrl}
            className="text-[11px] font-semibold tracking-[0.2em] text-brand-crema/70 hover:text-brand-crema transition-colors"
          >
            {lang.toUpperCase()} ·{' '}
            <span className="text-brand-oro underline">{otherLang.toUpperCase()}</span>
          </a>
          <a href="#contacto" className="btn-primary text-sm">
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-brand-crema p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden bg-brand-verde-osc/98 backdrop-blur-md border-t border-brand-crema/10">
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-5 text-brand-crema">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="text-lg font-serif hover:text-brand-oro transition-colors"
              >
                {t.nav[link.key]}
              </a>
            ))}
            <a
              href={swapLangUrl}
              className="text-sm tracking-[0.2em] text-brand-crema/70 hover:text-brand-crema"
            >
              {lang.toUpperCase()} ·{' '}
              <span className="text-brand-oro underline">{otherLang.toUpperCase()}</span>
            </a>
            <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary mt-2">
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
