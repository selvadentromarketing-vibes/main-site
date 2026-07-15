import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { Translation } from '../i18n/translations';
import type { Lang } from '../i18n/translations';

interface HeaderProps {
  t: Translation;
  lang: Lang;
  otherLang: Lang;
  swapLangUrl: string;
}

interface NavLink {
  id: string;
  key?: keyof Translation['nav'];
  label?: string;
  href?: string;
  external?: boolean;
  children?: Array<{ label: string; href: string; external?: boolean }>;
}

// Route the CTAs to the qualified form inside the site (#contacto) so
// budget + investment horizon get captured on every conversion, and the
// Meta Pixel Lead event fires. Adara CRM and GHL are separate systems —
// sending traffic to Adara used to split the funnel and drop attribution.

export default function Header({ t, lang, otherLang, swapLangUrl }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const virtualTourLabel = lang === 'en' ? 'Virtual tour' : 'Tour virtual';

  const NAV_LINKS: NavLink[] = [
    { id: 'acerca', key: 'project' },
    { id: 'suspiro', key: 'suspiro' },
    {
      id: 'masterplan',
      key: 'masterplan',
      children: [
        { label: t.nav.masterplan, href: '#masterplan' },
        { label: virtualTourLabel, href: '#tour-virtual' },
      ],
    },
    { id: 'inversion', key: 'investment' },
    { id: 'testimonios', key: 'testimonials' },
    {
      id: 'jjf-creando',
      label: 'JJF Creando',
      href: 'https://jjfcreando.com/',
      external: true,
    },
  ];

  const linkText = (link: NavLink) =>
    link.label ?? (link.key ? t.nav[link.key] : link.id);

  const scheduleClose = () => {
    if (dropdownTimer.current) window.clearTimeout(dropdownTimer.current);
    dropdownTimer.current = window.setTimeout(() => setOpenDropdown(null), 140);
  };
  const cancelClose = () => {
    if (dropdownTimer.current) window.clearTimeout(dropdownTimer.current);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-verde-osc/95 backdrop-blur-md py-3 shadow-lg shadow-black/10'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
        <a
          href={lang === 'en' ? '/en' : '/'}
          aria-label="Selvadentro"
          className="shrink-0"
        >
          <img
            src="/logo-cream.webp"
            alt="Selvadentro · tierra de cenotes"
            className="h-[2.8125rem] sm:h-[3.375rem] w-auto block"
          />
        </a>

        {/* Desktop nav + lang + CTA — all right-aligned */}
        <div className="hidden lg:flex items-center gap-8 ml-auto">
          <nav className="flex items-center gap-8 text-brand-crema/85 text-[15px] font-medium uppercase tracking-[0.14em]">
            {NAV_LINKS.map((link) => {
              if (link.children) {
                const isOpen = openDropdown === link.id;
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenDropdown(link.id);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-brand-oro transition-colors uppercase tracking-[0.14em]"
                      onClick={() => setOpenDropdown(isOpen ? null : link.id)}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                    >
                      {linkText(link)}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
                        isOpen
                          ? 'opacity-100 visible'
                          : 'opacity-0 invisible pointer-events-none'
                      }`}
                    >
                      <div
                        role="menu"
                        className="min-w-[220px] bg-brand-verde-osc/98 backdrop-blur-md border border-brand-crema/10 rounded-xl shadow-xl shadow-black/25 py-2"
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            target={child.external ? '_blank' : undefined}
                            rel={child.external ? 'noopener noreferrer' : undefined}
                            className="block px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] text-brand-crema/85 hover:bg-brand-crema/5 hover:text-brand-oro transition-colors"
                            onClick={() => setOpenDropdown(null)}
                            role="menuitem"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={link.id}
                  href={link.href ?? `#${link.id}`}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="hover:text-brand-oro transition-colors uppercase tracking-[0.14em]"
                >
                  {linkText(link)}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.18em]">
            <a
              href={lang === 'es' ? '#' : swapLangUrl}
              aria-current={lang === 'es' ? 'true' : undefined}
              className={
                lang === 'es'
                  ? 'text-brand-oro underline underline-offset-4 decoration-brand-oro decoration-[1.5px]'
                  : 'text-brand-crema/60 hover:text-brand-crema transition-colors'
              }
            >
              ES
            </a>
            <span className="text-brand-crema/40">·</span>
            <a
              href={lang === 'en' ? '#' : swapLangUrl}
              aria-current={lang === 'en' ? 'true' : undefined}
              className={
                lang === 'en'
                  ? 'text-brand-oro underline underline-offset-4 decoration-brand-oro decoration-[1.5px]'
                  : 'text-brand-crema/60 hover:text-brand-crema transition-colors'
              }
            >
              EN
            </a>
          </div>

          <a href="#contacto" className="btn-primary text-sm">
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-brand-crema p-2 mr-1"
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
              <div key={link.id} className="flex flex-col gap-3">
                <a
                  href={link.href ?? `#${link.id}`}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setOpen(false)}
                  className="text-base font-semibold uppercase tracking-[0.14em] hover:text-brand-oro transition-colors"
                >
                  {linkText(link)}
                </a>
                {link.children && (
                  <div className="flex flex-col gap-2 pl-4 border-l border-brand-crema/15">
                    {link.children
                      .filter((c) => c.external)
                      .map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="text-sm uppercase tracking-[0.14em] text-brand-crema/80 hover:text-brand-oro transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em]">
              <a
                href={lang === 'es' ? '#' : swapLangUrl}
                className={
                  lang === 'es'
                    ? 'text-brand-oro underline underline-offset-4 decoration-brand-oro'
                    : 'text-brand-crema/60'
                }
              >
                ES
              </a>
              <span className="text-brand-crema/40">·</span>
              <a
                href={lang === 'en' ? '#' : swapLangUrl}
                className={
                  lang === 'en'
                    ? 'text-brand-oro underline underline-offset-4 decoration-brand-oro'
                    : 'text-brand-crema/60'
                }
              >
                EN
              </a>
            </div>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
