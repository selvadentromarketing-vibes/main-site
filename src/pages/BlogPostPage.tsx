import PageLayout from '../components/PageLayout';
import ArticleHero from '../components/ArticleHero';
import { AUTHORS } from '../seo/site';
import { POSTS } from '../generated/content';
import type { PageProps } from '../routes/AppRoutes';

/**
 * Blog article — /blog/[slug] and /en/blog/[slug]. The body is
 * markdown-rendered HTML from src/generated/content.ts (built by
 * scripts/build-content.mjs); BlogPosting + BreadcrumbList JSON-LD comes
 * from the same post record via schema.ts.
 */

const labels = {
  es: {
    blog: 'Blog',
    published: 'Publicado',
    updated: 'Última actualización',
    reading: 'min de lectura',
    toc: 'En esta guía',
    related: 'Guías relacionadas',
    byline: 'Por',
  },
  en: {
    blog: 'Blog',
    published: 'Published',
    updated: 'Last updated',
    reading: 'min read',
    toc: 'In this guide',
    related: 'Related guides',
    byline: 'By',
  },
} as const;

function formatDate(iso: string, lang: 'es' | 'en') {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export default function BlogPostPage({ lang, path }: PageProps) {
  const post = POSTS.find((p) => p.path === path);
  if (!post) return null; // registry and content are built together — cannot happen
  const l = labels[lang];
  const author = AUTHORS[post.author];
  const blogPath = lang === 'es' ? '/blog' : '/en/blog';
  const related = POSTS.filter(
    (p) =>
      p.lang === lang &&
      p.path !== post.path &&
      p.tags.some((t) => post.tags.includes(t)),
  ).slice(0, 3);
  const fallbackRelated =
    related.length > 0
      ? related
      : POSTS.filter((p) => p.lang === lang && p.path !== post.path).slice(0, 3);

  return (
    <PageLayout lang={lang} path={path}>
      <ArticleHero
        hub={{ label: l.blog, href: blogPath }}
        crumb={post.title}
        title={post.title}
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
              {l.updated}:{' '}
              <time dateTime={post.updated}>{formatDate(post.updated, lang)}</time>
            </span>
            <span>
              {post.readingMinutes} {l.reading}
            </span>
          </>
        }
      />

      <section className="section">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,68ch)_260px] lg:gap-12 lg:justify-center">
          <article
            className="prose prose-selva lg:prose-lg max-w-none prose-headings:scroll-mt-28"
            // Trusted build-time HTML from our own markdown files.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          {post.toc.length > 2 && (
            <aside className="hidden lg:block">
              <nav
                aria-label={l.toc}
                className="sticky top-28 panel-premium p-6 text-sm"
              >
                <span className="eyebrow">{l.toc}</span>
                <ul className="mt-3 space-y-2">
                  {post.toc
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
              {fallbackRelated.map((p) => (
                <a
                  key={p.path}
                  href={p.path}
                  className="card-premium p-5"
                >
                  <h3 className="text-lg leading-snug mb-2">{p.title}</h3>
                  <p className="text-xs text-brand-gris">
                    {p.readingMinutes} {l.reading}
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
