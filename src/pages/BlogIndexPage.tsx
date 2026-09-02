import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { AUTHORS } from '../seo/site';
import { POSTS } from '../generated/content';
import type { PageProps } from '../routes/AppRoutes';

/** /blog ↔ /en/blog — per-language index of the guide library. */

const copy = {
  es: {
    eyebrow: 'Blog',
    lede: 'Guías con datos reales — precios por m² documentados, procesos legales verificables y comparativas honestas — para decidir con información, no con folletos.',
    readingLabel: 'min de lectura',
    updatedLabel: 'Actualizado',
  },
  en: {
    eyebrow: 'Blog',
    lede: 'Guides built on real data — documented prices per m², verifiable legal processes and honest comparisons — so you decide on information, not brochures.',
    readingLabel: 'min read',
    updatedLabel: 'Updated',
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

export default function BlogIndexPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];
  const posts = POSTS.filter((p) => p.lang === lang);

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} />

      <section className="section">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.path} delay={(i % 3) * 60}>
                <article className="card-premium p-6 h-full flex flex-col">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-oro mb-3">
                    <time dateTime={post.updated}>
                      {c.updatedLabel} {formatDate(post.updated, lang)}
                    </time>
                    {' · '}
                    {post.readingMinutes} {c.readingLabel}
                  </div>
                  <h2 className="text-xl leading-snug mb-3">
                    <a href={post.path} className="hover:text-brand-verde transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-sm leading-relaxed text-brand-negro/75 mb-4 flex-1">
                    {post.description}
                  </p>
                  <div className="text-xs text-brand-gris pt-4 border-t border-brand-verde/10">
                    {AUTHORS[post.author].name} ·{' '}
                    {lang === 'es' ? AUTHORS[post.author].roleEs : AUTHORS[post.author].roleEn}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
