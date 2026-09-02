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
  /**
   * Site-relative hero crop (`/hero/*.webp`, 1600×800) from the page's
   * registry entry. Commercial pages are photographic; editorial pages
   * (guides, glossary, FAQ) deliberately get none and fall back to the
   * typographic treatment — that contrast is the point.
   */
  image?: string;
  /** Alt text for the hero photograph. Decorative by default. */
  imageAlt?: string;
  children?: ReactNode;
}

/**
 * Premium intro band for subpages (also offsets the fixed header).
 *
 * Photographic variant: the crop sits under a two-layer green veil so
 * cream text keeps contrast at any crop, plus a grain layer so the fill
 * reads as print rather than flat digital colour.
 * Editorial variant: a radial green bloom with a gold hint — considered,
 * not unfinished.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  children,
}: PageHeroProps) {
  return (
    <section
      className={`relative isolate overflow-hidden grain text-brand-crema
                  pt-32 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-10
                  ${image ? 'bg-brand-verde-osc' : 'hero-editorial'}`}
    >
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt ?? ''}
            width={1600}
            height={800}
            aria-hidden={imageAlt ? undefined : true}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            {...{ fetchpriority: 'high' }}
          />
          <div className="hero-veil absolute inset-0 -z-10" />
        </>
      )}

      <div className="relative max-w-4xl mx-auto">
        <span className="eyebrow">{eyebrow}</span>
        <span className="rule-oro mt-3 mb-5" />
        <h1 className="display-xl font-serif text-brand-crema mb-6">{title}</h1>
        {lede && (
          <p className="text-lg sm:text-xl leading-relaxed text-brand-crema/85 max-w-copy">
            {lede}
          </p>
        )}
        {children}
      </div>

      {/* Hairline that hands the band off to the cream page body. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-oro/40 to-transparent"
      />
    </section>
  );
}
