/**
 * SSR entry — bundled by `vite build --ssr` into dist-ssr/entry-server.js
 * and imported by scripts/prerender.mjs. Renders one route to an HTML
 * string and re-exports everything the prerenderer needs (route registry,
 * head renderer, site constants) so the Node script never parses TS.
 */

import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Writable } from 'node:stream';
import AppRoutes from '../routes/AppRoutes';

export { ALL_PAGES, STATIC_PAGES, getMeta } from '../seo/meta';
export { renderHeadTags } from '../seo/head';
export { PRICING, ORG, SITE_URL, absUrl, AUTHORS } from '../seo/site';
export { POSTS } from '../generated/content';
export { translations } from '../i18n/translations';
export { CENOTES, EXPERIENCIAS, SPOTS } from '../data/masterplan';

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk));
        cb();
      },
      final(cb) {
        resolve(Buffer.concat(chunks).toString('utf8'));
        cb();
      },
    });
    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </StrictMode>,
      {
        // onAllReady (not onShellReady): lazy route chunks must be fully
        // resolved so the output contains real content, never Suspense
        // fallbacks.
        onAllReady() {
          stream.pipe(sink);
        },
        onError(error) {
          reject(error);
        },
      },
    );
  });
}
