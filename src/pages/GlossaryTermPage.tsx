import PageLayout from '../components/PageLayout';
import ArticleHero from '../components/ArticleHero';
import { TERMS } from '../generated/content';
import type { PageProps } from '../routes/AppRoutes';

/**
 * Glossary term — /glosario/[slug] and /en/glossary/[slug]. The first
 * paragraph is the definition (styled as a definition box; also emitted
 * as DefinedTerm JSON-LD via schema.ts).
 */

const labels = {
  es: {
    hub: 'Glosario',
    related: 'Términos relacionados',
    updated: 'Actualizado',
    all: 'Ver todos los términos',
  },
  en: {
    hub: 'Glossary',
    related: 'Related terms',
    updated: 'Updated',
    all: 'See every term',
  },
} as const;

export default function GlossaryTermPage({ lang, path }: PageProps) {
  const entry = TERMS.find((t) => t.path === path);
  if (!entry) return null; // registry and content build together — cannot happen
  const l = labels[lang];
  const hubPath = lang === 'es' ? '/glosario' : '/en/glossary';
  const related = TERMS.filter(
    (t) => t.lang === lang && t.path !== entry.path && t.tags.some((tag) => entry.tags.includes(tag)),
  ).slice(0, 6);

  return (
    <PageLayout lang={lang} path={path}>
      <ArticleHero
        hub={{ label: l.hub, href: hubPath }}
        crumb={entry.term ?? entry.title}
        title={entry.title}
      />

      <section className="section">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-selva prose-definition max-w-copy mx-auto"
            // Trusted build-time HTML from our own markdown files.
            dangerouslySetInnerHTML={{ __html: entry.html }}
          />
        </div>
      </section>

      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-3xl mx-auto">
          {related.length > 0 && (
            <>
              <h2 className="h2-section mb-6">{l.related}</h2>
              <ul className="flex flex-wrap gap-3 mb-8">
                {related.map((t) => (
                  <li key={t.path}>
                    <a
                      href={t.path}
                      className="inline-block bg-white border border-brand-verde/15 rounded-full px-4 py-2 text-sm shadow-[0_1px_2px_rgb(28_46_28_/_0.05)] hover:border-brand-oro/60 hover:text-brand-verde transition-colors"
                    >
                      {t.term}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <a
            href={hubPath}
            className="underline underline-offset-4 decoration-brand-oro hover:text-brand-verde transition-colors"
          >
            {l.all}
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
