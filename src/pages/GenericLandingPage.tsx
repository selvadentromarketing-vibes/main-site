import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import { getMeta } from '../seo/meta';
import type { PageProps } from '../routes/AppRoutes';
import type { ReactNode } from 'react';

/**
 * Minimal valid landing page: hero with the registry H1 + description
 * lede, then whatever sections the concrete page provides. Concrete
 * pages (src/pages/*Page.tsx) compose this so a page is never shipped
 * without its SEO skeleton, even before its full copy lands.
 */
export default function GenericLandingPage({
  lang,
  path,
  eyebrow,
  lede,
  children,
}: PageProps & { eyebrow?: string; lede?: ReactNode; children?: ReactNode }) {
  const meta = getMeta(path)!;
  return (
    <PageLayout lang={lang} path={path}>
      <PageHero
        eyebrow={eyebrow ?? (lang === 'es' ? 'Selvadentro Tulum' : 'Selvadentro Tulum')}
        title={meta.h1}
        lede={lede ?? meta.description}
      />
      {children}
    </PageLayout>
  );
}
