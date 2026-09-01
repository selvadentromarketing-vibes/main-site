import { useEffect, type ReactNode } from 'react';
import { useLang } from '../i18n/useLang';
import { captureTrackingParams } from '../utils/tracking';
import type { Lang } from '../i18n/translations';
import Header from './Header';
import Footer from './Footer';
import WhatsappSticky from './WhatsappSticky';
import FinalCTASection from './sections/FinalCTASection';

interface PageLayoutProps {
  lang: Lang;
  /** The page's own route path (from the SEO registry). */
  path: string;
  children: ReactNode;
  /** The lead form renders on every page by default (gives each page the
      #contacto anchor the header CTA targets). */
  cta?: boolean;
}

/**
 * Shared chrome for every non-homepage route: solid header (subpages sit
 * on cream, where the transparent-over-hero treatment is illegible),
 * footer with the pillar nav, WhatsApp FAB, and the same lead form the
 * homepage converts with.
 */
export default function PageLayout({ lang, path, children, cta = true }: PageLayoutProps) {
  const { t, otherLang, swapLangUrl } = useLang(lang, path);

  // Capture ad attribution once on load (persisted for the contact form).
  useEffect(() => {
    captureTrackingParams();
  }, []);

  return (
    <div className="bg-brand-crema text-brand-negro">
      <Header
        t={t}
        lang={lang}
        otherLang={otherLang}
        swapLangUrl={swapLangUrl}
        solid
        isHome={false}
      />
      <main>
        {children}
        {cta && <FinalCTASection t={t} lang={lang} />}
      </main>
      <Footer t={t} lang={lang} />
      <WhatsappSticky lang={lang} />
    </div>
  );
}
