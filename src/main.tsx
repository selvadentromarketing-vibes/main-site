import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './index.css';

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
