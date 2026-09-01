import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import type { Translation, Lang } from '../i18n/translations';
import { COLLECTION_INDEXES, STATIC_PAGES } from '../seo/meta';

interface FooterProps {
  t: Translation;
  lang: Lang;
}

/**
 * Footer nav is the crawl path: every pillar and guide page must be
 * reachable from the homepages via plain <a href> links in the initial
 * HTML, or link-following crawlers treat them as orphans. Labels are
 * short nav names; paths resolve from the SEO registry so a slug change
 * there propagates here automatically.
 */
const NAV_SECTIONS: Array<{
  titleEs: string;
  titleEn: string;
  keys: string[];
  labels: Record<string, { es: string; en: string }>;
}> = [
  {
    titleEs: 'Explora',
    titleEn: 'Explore',
    keys: [
      'lots',
      'cenotes',
      'amenities',
      'location',
      'investment',
      'developer',
      'faq',
      'legal',
      'blog',
    ],
    labels: {
      lots: { es: 'Lotes en venta', en: 'Land for sale' },
      cenotes: { es: 'Los 9 cenotes', en: 'The 9 cenotes' },
      amenities: { es: 'Amenidades', en: 'Amenities' },
      location: { es: 'Ubicación', en: 'Location' },
      investment: { es: 'Inversión', en: 'Investment' },
      developer: { es: 'El desarrollador', en: 'The developer' },
      faq: { es: 'Preguntas frecuentes', en: 'FAQ' },
      legal: { es: 'Legalidad y permisos', en: 'Legal & permits' },
      blog: { es: 'Blog', en: 'Blog' },
    },
  },
  {
    titleEs: 'Guías',
    titleEn: 'Guides',
    keys: [
      'guide-index',
      'glossary-index',
      'cenote-land',
      'plusvalia',
      'preventa',
      'safety',
      'gated',
      'eco',
      'living',
      'market',
    ],
    labels: {
      'guide-index': { es: 'Guía del comprador', en: "Buyer's guide" },
      'glossary-index': { es: 'Glosario inmobiliario', en: 'Glossary' },
      'cenote-land': { es: 'Terrenos con cenote', en: 'Land with a cenote' },
      plusvalia: { es: 'Plusvalía en Tulum', en: 'Tulum appreciation' },
      preventa: { es: 'Preventa en Tulum', en: 'Pre-construction' },
      safety: { es: '¿Es seguro invertir?', en: 'Is it safe to buy?' },
      gated: { es: 'Comunidad privada', en: 'Gated community' },
      eco: { es: 'Desarrollo ecológico', en: 'Eco-friendly development' },
      living: { es: 'Vivir en Tulum', en: 'Living in Tulum' },
      market: { es: 'Mercado Tulum 2026', en: 'Tulum market 2026' },
    },
  },
];

const NAVIGABLE = [...STATIC_PAGES, ...COLLECTION_INDEXES];

function navLinks(lang: Lang, keys: string[]) {
  return keys
    .map((key) => NAVIGABLE.find((p) => p.key === key && p.lang === lang))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}

export default function Footer({ t, lang }: FooterProps) {
  const showroomLabel = 'Showroom';
  const showroomAddress = 'Loft Corporativo Sinergia, Av. Tulum, Tulum, México';

  return (
    <footer className="bg-brand-verde-osc text-brand-crema/75 pt-14 pb-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          <div>
            {/* Wordmark already carries the "tierra de cenotes" tagline —
                never repeat it as sibling text (see memory: logo is
                self-contained). */}
            <img
              src="/logo-cream.webp"
              alt="Selvadentro — tierra de cenotes"
              width={1754}
              height={625}
              className="h-12 w-auto"
            />
          </div>

          {NAV_SECTIONS.map((section) => (
            <nav
              key={section.titleEn}
              className="text-sm"
              aria-label={lang === 'es' ? section.titleEs : section.titleEn}
            >
              <h4 className="font-serif text-brand-oro tracking-wide mb-3">
                {lang === 'es' ? section.titleEs : section.titleEn}
              </h4>
              <ul className="space-y-2">
                {navLinks(lang, section.keys).map((page) => (
                  <li key={page.path}>
                    <a
                      href={page.path}
                      className="hover:text-brand-oro transition-colors"
                    >
                      {section.labels[page.key]?.[lang] ?? page.h1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="text-sm space-y-3">
            <h4 className="font-serif text-brand-oro tracking-wide mb-3">
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </h4>
            <a
              href={`mailto:${t.footer.contactEmail}`}
              className="flex items-center gap-2 hover:text-brand-oro transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t.footer.contactEmail}
            </a>
            <a
              href={`tel:${t.footer.contactPhone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 hover:text-brand-oro transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t.footer.contactPhone}
            </a>
            <a
              href="https://instagram.com/selvadentro.tulum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-brand-oro transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @selvadentro.tulum
            </a>
          </div>

          <div className="text-sm">
            <h4 className="font-serif text-brand-oro tracking-wide mb-3">
              {showroomLabel}
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 shrink-0" />
              <p className="leading-relaxed">{showroomAddress}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-crema/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-crema/50">
          <span>
            © {new Date().getFullYear()} Selvadentro · {t.footer.copyright}
          </span>
          <span className="tracking-[0.25em] uppercase">Selvadentrotulum.com</span>
        </div>
      </div>
    </footer>
  );
}
