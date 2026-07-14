import { useEffect } from 'react';
import { useLang } from './i18n/useLang';
import { captureTrackingParams } from './utils/tracking';
import type { Lang } from './i18n/translations';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsappSticky from './components/WhatsappSticky';
import ScheduleSection from './components/sections/ScheduleSection';

interface Props {
  lang: Lang;
}

export default function SchedulePage({ lang }: Props) {
  const { t, otherLang, swapLangUrl } = useLang(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === 'es'
        ? 'Agenda tu llamada — Selvadentro'
        : 'Schedule your call — Selvadentro';
  }, [lang]);

  // Same attribution capture as the main App so the schedule form's payload
  // carries UTMs / gclid / fbclid when the visitor lands here from an ad.
  useEffect(() => {
    captureTrackingParams();
  }, []);

  return (
    <div className="bg-brand-crema text-brand-negro">
      <Header t={t} lang={lang} otherLang={otherLang} swapLangUrl={swapLangUrl} />
      <main>
        <ScheduleSection lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
      <WhatsappSticky lang={lang} />
    </div>
  );
}
