import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  /** The page H1 — must equal the registry entry's `h1` exactly
      (scripts/check-static.mjs asserts it). */
  title: string;
  /**
   * The answer-first block: a direct 40–60 word answer to the query the
   * page targets, rendered immediately under the H1 where AI extractors
   * look for it.
   */
  lede?: ReactNode;
  children?: ReactNode;
}

/** Dark-green intro band for subpages (offsets the fixed header). */
export default function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <section className="bg-brand-verde-osc text-brand-crema pt-32 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl mt-4 mb-6 text-brand-crema">
          {title}
        </h1>
        {lede && (
          <p className="text-lg sm:text-xl leading-relaxed text-brand-crema/85 max-w-copy">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
