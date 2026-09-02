import PageLayout from '../components/PageLayout';
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
      <section className="bg-brand-verde-osc text-brand-crema pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="breadcrumb" className="text-xs tracking-wide text-brand-crema/60 mb-5">
            <a href={blogPath} className="hover:text-brand-oro transition-colors">
              {l.blog}
            </a>
            <span className="mx-2">/</span>
            <span>{post.title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-brand-crema mb-6">
            {post.title}
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
              {l.updated}:{' '}
              <time dateTime={post.updated}>{formatDate(post.updated, lang)}</time>
            </span>
            <span>
              {post.readingMinutes} {l.reading}
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,68ch)_260px] lg:gap-12 lg:justify-center">
          <article
            className="prose prose-selva max-w-none prose-headings:scroll-mt-28"
            // Trusted build-time HTML from our own markdown files.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          {post.toc.length > 2 && (
            <aside className="hidden lg:block">
              <nav
                aria-label={l.toc}
                className="sticky top-28 bg-white/60 border border-brand-verde/10 rounded-2xl p-6 text-sm"
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
            <h2 className="text-2xl sm:text-3xl mb-8">{l.related}</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {fallbackRelated.map((p) => (
                <a
                  key={p.path}
                  href={p.path}
                  className="bg-white/70 border border-brand-verde/10 rounded-2xl p-5 hover:border-brand-oro/50 transition-colors"
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
