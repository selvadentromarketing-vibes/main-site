import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './index.css';

// Netlify 301s /page.html to /page (pretty_urls in netlify.toml), but if a
// request ever arrives at the .html twin the router has no route for it and
// would render the 404 page over correct prerendered content. Normalise the
// path before the router reads it. Browser-only entry, so touching history
// here is safe — nothing in render() reads location.
const { pathname, search, hash } = window.location;
if (pathname.endsWith('.html')) {
  const clean = pathname === '/index.html' ? '/' : pathname.slice(0, -'.html'.length);
  window.history.replaceState(null, '', `${clean}${search}${hash}`);
}

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

// Production pages are prerendered (scripts/prerender.mjs marks #root) and
// hydrate; the dev server serves the empty shell and mounts fresh. The
// recoverable-error logger stays permanently — it is how hydration
// mismatches get caught in production builds.
if (container.dataset.prerendered) {
  hydrateRoot(container, app, {
    onRecoverableError: (error) => console.error('[hydration]', error),
  });
} else {
  createRoot(container).render(app);
}
