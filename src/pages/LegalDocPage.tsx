import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import { getMeta } from '../seo/meta';
import { LEGAL_DOCS } from '../generated/content';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /privacy-policy/ and /terms-and-conditions/ — the owner's legal text,
 * rendered verbatim from content/legal (scripts/build-content.mjs).
 * Editorial, so typographic: no hero photograph, one reading column.
 */
export default function LegalDocPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const doc = LEGAL_DOCS.find((d) => `/${d.slug}/` === path);
  if (!doc) return null; // registry and content build together — cannot happen

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow="Legal" title={meta.h1} lang={lang} />
      <section className="section">
        <article
          className="prose prose-selva lg:prose-lg prose-legal max-w-prose mx-auto"
          // Trusted build-time HTML from our own markdown files.
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </section>
    </PageLayout>
  );
}
