import { translations, type Lang } from './translations';
import { getAltPath } from '../seo/meta';

/**
 * Lang context for the main site. Lang and the current route's path are
 * passed from the router boundary (every page knows its path statically
 * from the SEO registry), so this hook stays render-pure — no window
 * access, which keeps server and client renders identical.
 *
 * Slugs are localized per language (e.g. /lotes-en-venta-tulum ↔
 * /en/tulum-land-for-sale), so the language switcher resolves its target
 * through the registry pairing instead of prefixing/stripping /en.
 */
export function useLang(lang: Lang, currentPath: string) {
  const t = translations[lang];
  const otherLang: Lang = lang === 'es' ? 'en' : 'es';
  const swapLangUrl = getAltPath(currentPath) ?? (lang === 'es' ? '/en' : '/');

  return { lang, t, otherLang, swapLangUrl };
}
