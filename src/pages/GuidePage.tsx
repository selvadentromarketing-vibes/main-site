import PageLayout from '../components/PageLayout';
import { AUTHORS } from '../seo/site';
import { GUIDES } from '../generated/content';
import type { PageProps } from '../routes/AppRoutes';

/**
 * Buyer's-guide Q&A article — /guia/[slug] and /en/guide/[slug].
 * One real buyer question answered per page; the first paragraph is the
 * extractable answer (also emitted as FAQPage JSON-LD via schema.ts).
 */

const labels = {
  es: {
    hub: 'Guía del comprador',
    updated: 'Última actualización',
    reading: 'min de lectura',
    toc: 'En esta respuesta',
    related: 'Otras preguntas de compradores',
    byline: 'Por',
  },
  en: {
    hub: "Buyer's guide",
    updated: 'Last updated',
    reading: 'min read',
    toc: 'In this answer',
    related: 'More buyer questions',
    byline: 'By',
  },
} as const;

function formatDate(iso: string, lang: 'es' | 'en') {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export default function GuidePage({ lang, path }: PageProps) {
  const guide = GUIDES.find((g) => g.path === path);
  if (!guide) return null; // registry and content build together — cannot happen
  const l = labels[lang];
  const author = AUTHORS[guide.author];
  const hubPath = lang === 'es' ? '/guia' : '/en/guide';
  const related = GUIDES.filter(
    (g) => g.lang === lang && g.path !== guide.path && g.tags.some((t) => guide.tags.includes(t)),
  ).slice(0, 3);
  const fallbackRelated =
    related.length > 0
      ? related
      : GUIDES.filter((g) => g.lang === lang && g.path !== guide.path).slice(0, 3);

  return (
    <PageLayout lang={lang} path={path}>
      <section className="bg-brand-verde-osc text-brand-crema pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="breadcrumb" className="text-xs tracking-wide text-brand-crema/60 mb-5">
            <a href={hubPath} className="hover:text-brand-oro transition-colors">
              {l.hub}
            </a>
            <span className="mx-2">/</span>
            <span>{guide.title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-brand-crema mb-6">
            {guide.title}
          </h1>
          <div className="text-sm text-brand-crema/70 flex flex-wrap gap-x-4 gap-y-1">
            <span>
              {l.byline}{' '}
              <a
                href={lang === 'es' ? '/desarrollador' : '/en/developer'}
                className="text-brand-oro hover:underline underline-offset-4"
              >
                {author.name}
              </a>
              {' · '}
              {lang === 'es' ? author.roleEs : author.roleEn}
            </span>
            <span>
              {l.updated}: <time dateTime={guide.updated}>{formatDate(guide.updated, lang)}</time>
            </span>
            <span>
              {guide.readingMinutes} {l.reading}
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
          <article
            className="prose prose-selva max-w-copy prose-headings:scroll-mt-28 [&>p:first-of-type]:text-lg [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:border-l-4 [&>p:first-of-type]:border-brand-oro [&>p:first-of-type]:pl-5 [&>p:first-of-type]:text-brand-verde-osc"
            // Trusted build-time HTML from our own markdown files.
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />
          {guide.toc.length > 2 && (
            <aside className="hidden lg:block">
              <nav
                aria-label={l.toc}
                className="sticky top-28 bg-white/60 border border-brand-verde/10 rounded-2xl p-6 text-sm"
              >
                <span className="eyebrow">{l.toc}</span>
                <ul className="mt-3 space-y-2">
                  {guide.toc
                    .filter((t) => t.level === 2)
                    .map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="text-brand-verde-osc/80 hover:text-brand-verde transition-colors leading-snug block"
                        >
                          {t.text}
                        </a>
                      </li>
                    ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </section>

      {fallbackRelated.length > 0 && (
        <section className="section bg-brand-crema-osc/40">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl mb-8">{l.related}</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {fallbackRelated.map((g) => (
                <a
                  key={g.path}
                  href={g.path}
                  className="bg-white/70 border border-brand-verde/10 rounded-2xl p-5 hover:border-brand-oro/50 transition-colors"
                >
                  <h3 className="text-lg leading-snug mb-2">{g.title}</h3>
                  <p className="text-xs text-brand-gris">
                    {g.readingMinutes} {l.reading}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
