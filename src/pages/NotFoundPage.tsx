import PageLayout from '../components/PageLayout';

/**
 * Bilingual 404 — prerendered to dist/404.html (scripts/prerender.mjs);
 * Netlify serves it with a real 404 status for any unknown path since no
 * SPA catch-all exists anymore. Rendered client-side too via the router's
 * `*` route, so dev behaves the same.
 */
export default function NotFoundPage() {
  return (
    <PageLayout lang="es" path="/404" cta={false}>
      <section className="bg-brand-verde-osc text-brand-crema pt-36 pb-20 px-4 sm:px-6 min-h-[70vh]">
        <div className="max-w-2xl mx-auto text-center">
          <span className="eyebrow">404</span>
          <h1 className="text-3xl sm:text-5xl mt-4 mb-6 text-brand-crema">
            Esta página no existe
            <span className="block text-brand-crema/60 text-2xl sm:text-3xl mt-2">
              This page does not exist
            </span>
          </h1>
          <p className="text-brand-crema/80 leading-relaxed mb-10">
            La selva se tragó esta URL. Vuelve al inicio o explora los cenotes.
            <br />
            The jungle swallowed this URL. Head back home or explore the cenotes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/" className="btn-primary">
              Inicio (ES)
            </a>
            <a href="/en" className="btn-secondary">
              Home (EN)
            </a>
            <a href="/cenotes" className="btn-secondary">
              Cenotes
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
