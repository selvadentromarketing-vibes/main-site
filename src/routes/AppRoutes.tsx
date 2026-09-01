import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import { ALL_PAGES, type PageMeta } from '../seo/meta';
import type { Lang } from '../i18n/translations';

/**
 * Route table driven by the SEO registry (src/seo/meta.ts) — adding a page
 * there plus a component here is all it takes for routing, prerendering,
 * sitemap and hreflang to pick it up.
 *
 * The homepage stays a static import so its bundle is unchanged; every
 * other page is lazy so the money page pays zero cost for the new routes.
 * Navigation between pages is plain <a href> (full document loads of
 * prerendered files) — React Router only matters for the initial mount.
 */

export interface PageProps {
  lang: Lang;
  path: string;
}

type PageComponent = LazyExoticComponent<ComponentType<PageProps>>;

const PAGES: Record<string, PageComponent> = {
  lots: lazy(() => import('../pages/LotsPage')),
  cenotes: lazy(() => import('../pages/CenotesPage')),
  amenities: lazy(() => import('../pages/AmenitiesPage')),
  location: lazy(() => import('../pages/LocationPage')),
  investment: lazy(() => import('../pages/InvestmentPage')),
  faq: lazy(() => import('../pages/FaqPage')),
  legal: lazy(() => import('../pages/LegalPage')),
  developer: lazy(() => import('../pages/DeveloperPage')),
  blog: lazy(() => import('../pages/BlogIndexPage')),
  'cenote-land': lazy(() => import('../pages/CenoteLandPage')),
  plusvalia: lazy(() => import('../pages/PlusvaliaPage')),
  preventa: lazy(() => import('../pages/PreventaPage')),
  safety: lazy(() => import('../pages/SafetyPage')),
  gated: lazy(() => import('../pages/GatedPage')),
  eco: lazy(() => import('../pages/EcoPage')),
  living: lazy(() => import('../pages/LivingPage')),
  market: lazy(() => import('../pages/MarketPage')),
};

const BlogPostPage = lazy(() => import('../pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function elementFor(meta: PageMeta) {
  if (meta.key === 'home') return <App lang={meta.lang} />;
  if (meta.key.startsWith('post:')) {
    return <BlogPostPage lang={meta.lang} path={meta.path} />;
  }
  const Page = PAGES[meta.key];
  if (!Page) throw new Error(`No component registered for page key "${meta.key}"`);
  return <Page lang={meta.lang} path={meta.path} />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {ALL_PAGES.map((meta) => (
          <Route key={meta.path} path={meta.path} element={elementFor(meta)} />
        ))}
        {/* /agendar + /en/agendar are Netlify 301s now (netlify.toml). */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
