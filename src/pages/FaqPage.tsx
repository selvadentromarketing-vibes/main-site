import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Accordion from '../components/Accordion';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { fullFaq } from '../data/faq';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /preguntas-frecuentes ↔ /en/faq — the extended FAQ (base 5 from
 * translations.ts + EXTRA_FAQ). The FAQPage JSON-LD renders from the SAME
 * fullFaq() array via schema.ts, so markup and visible answers can't
 * drift. Answers stay in the DOM when collapsed (Accordion uses the
 * 0fr-grid trick), so crawlers read every answer.
 */

const copy = {
  es: {
    eyebrow: 'Preguntas frecuentes',
    lede: 'Precios, fideicomiso para extranjeros, permisos SEDETUS, reglas de construcción, cuotas, entrega y rentas: aquí están las respuestas directas. Si falta la tuya, un asesor te responde en menos de 24 horas.',
    moreTitle: '¿No encontraste tu pregunta?',
    moreLinks: [
      ['/legalidad-y-permisos', 'Documentación legal y permisos, en detalle'],
      ['/lotes-en-venta-tulum', 'Precios y disponibilidad actual'],
      ['/blog', 'Guías completas en el blog'],
    ],
  },
  en: {
    eyebrow: 'FAQ',
    lede: 'Pricing, the fideicomiso for foreign buyers, SEDETUS permits, building rules, fees, delivery and rentals: direct answers below. If yours is missing, an advisor replies within 24 hours.',
    moreTitle: 'Didn’t find your question?',
    moreLinks: [
      ['/en/legal-compliance', 'Legal documentation and permits, in detail'],
      ['/en/tulum-land-for-sale', 'Current pricing and availability'],
      ['/en/blog', 'Full guides on the blog'],
    ],
  },
} as const;

export default function FaqPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];
  const items = fullFaq(lang);

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} lang={lang} />

      <section className="section">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Accordion items={items} />
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="h2-section mb-6">{c.moreTitle}</h2>
          <ul className="space-y-3">
            {c.moreLinks.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="underline underline-offset-4 decoration-brand-oro hover:text-brand-verde transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
