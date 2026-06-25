import { translations, type Lang } from './translations';

/**
 * Lang context for the main site. Lang is passed from the router at the App
 * boundary, so this hook just returns the right translation bundle + a
 * helper for swapping languages while preserving the URL.
 */
export function useLang(lang: Lang) {
  const t = translations[lang];
  const otherLang: Lang = lang === 'es' ? 'en' : 'es';
  const swapLangUrl = (() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (lang === 'es') {
      // ES is at root; switching to EN prepends /en
      return path === '/' ? '/en' : `/en${path}`;
    }
    // EN strips the /en prefix
    return path.replace(/^\/en/, '') || '/';
  })();

  return { lang, t, otherLang, swapLangUrl };
}
