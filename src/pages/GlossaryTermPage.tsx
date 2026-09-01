import PageLayout from '../components/PageLayout';
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
      <section className="bg-brand-verde-osc text-brand-crema pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="breadcrumb" className="text-xs tracking-wide text-brand-crema/60 mb-5">
            <a href={hubPath} className="hover:text-brand-oro transition-colors">
              {l.hub}
            </a>
            <span className="mx-2">/</span>
            <span>{entry.term}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-brand-crema">
            {entry.title}
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-selva max-w-copy [&>p:first-of-type]:text-lg [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:bg-white/70 [&>p:first-of-type]:border [&>p:first-of-type]:border-brand-oro/40 [&>p:first-of-type]:rounded-2xl [&>p:first-of-type]:p-6 [&>p:first-of-type]:text-brand-verde-osc"
            // Trusted build-time HTML from our own markdown files.
            dangerouslySetInnerHTML={{ __html: entry.html }}
          />
        </div>
      </section>

      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-3xl mx-auto">
          {related.length > 0 && (
            <>
              <h2 className="text-2xl sm:text-3xl mb-6">{l.related}</h2>
              <ul className="flex flex-wrap gap-3 mb-8">
                {related.map((t) => (
                  <li key={t.path}>
                    <a
                      href={t.path}
                      className="inline-block bg-white/70 border border-brand-verde/15 rounded-full px-4 py-2 text-sm hover:border-brand-oro/60 hover:text-brand-verde transition-colors"
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
