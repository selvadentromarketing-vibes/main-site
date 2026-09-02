import type { ReactNode } from 'react';

interface ArticleHeroProps {
  /** The collection this article belongs to (blog, guide, glossary). */
  hub: { label: string; href: string };
  /** Breadcrumb tail — the article's own title. */
  crumb: string;
  /** The page H1. Must match the registry `h1` (the build gate asserts it). */
  title: string;
  /** Byline · last-updated · reading-time row, rendered under a hairline. */
  meta?: ReactNode;
}

/**
 * Editorial header shared by the three article types. Deliberately
 * typographic — no photograph — so long-form reading pages read as a
 * journal and stay visually distinct from the photographic commercial
 * pages. Depth comes from the radial bloom (`.hero-editorial`) plus grain.
 */
export default function ArticleHero({ hub, crumb, title, meta }: ArticleHeroProps) {
  return (
    <section className="relative isolate overflow-hidden grain hero-editorial text-brand-crema pt-32 sm:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-10">
      <div className="relative max-w-3xl mx-auto">
        <nav
          aria-label="breadcrumb"
          className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-crema/50 mb-6"
        >
          <a href={hub.href} className="hover:text-brand-oro transition-colors">
            {hub.label}
          </a>
          <span className="mx-2.5 text-brand-oro/70" aria-hidden="true">
            /
          </span>
          <span className="font-normal normal-case tracking-normal text-xs text-brand-crema/70">
            {crumb}
          </span>
        </nav>
        <h1 className="display-lg font-serif text-brand-crema">{title}</h1>
        {meta && (
          <div className="mt-7 pt-5 border-t border-brand-crema/15 text-sm text-brand-crema/70 flex flex-wrap gap-x-5 gap-y-1.5">
            {meta}
          </div>
        )}
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-oro/40 to-transparent"
      />
    </section>
  );
}
