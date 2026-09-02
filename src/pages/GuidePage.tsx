import PageLayout from '../components/PageLayout';
import ArticleHero from '../components/ArticleHero';
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
      <ArticleHero
        hub={{ label: l.hub, href: hubPath }}
        crumb={guide.title}
        title={guide.title}
        meta={
          <>
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
          </>
        }
      />

      <section className="section">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,68ch)_260px] lg:gap-12 lg:justify-center">
          <article
            className="prose prose-selva lg:prose-lg prose-answer max-w-none prose-headings:scroll-mt-28"
            // Trusted build-time HTML from our own markdown files.
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />
          {guide.toc.length > 2 && (
            <aside className="hidden lg:block">
              <nav
                aria-label={l.toc}
                className="sticky top-28 panel-premium p-6 text-sm"
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
            <h2 className="h2-section mb-8">{l.related}</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {fallbackRelated.map((g) => (
                <a
                  key={g.path}
                  href={g.path}
                  className="card-premium p-5"
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
