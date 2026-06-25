import { useEffect } from 'react';
import { useLang } from './i18n/useLang';
import type { Lang } from './i18n/translations';

import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import StatsBarSection from './components/sections/StatsBarSection';
import AboutSection from './components/sections/AboutSection';
import LocationSection from './components/sections/LocationSection';
import SuspiroSection from './components/sections/SuspiroSection';
import PieceOfJungleSection from './components/sections/PieceOfJungleSection';
import MasterplanSection from './components/sections/MasterplanSection';
import AmenitiesSection from './components/sections/AmenitiesSection';
import InvestmentSection from './components/sections/InvestmentSection';
import CredentialsSection from './components/sections/CredentialsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import FAQSection from './components/sections/FAQSection';
import FinalCTASection from './components/sections/FinalCTASection';

interface AppProps {
  lang: Lang;
}

export default function App({ lang }: AppProps) {
  const { t, otherLang, swapLangUrl } = useLang(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === 'es'
        ? 'Selvadentro — tierra de cenotes'
        : 'Selvadentro — land of cenotes';
  }, [lang]);

  return (
    <div className="bg-brand-crema text-brand-negro">
      <Header t={t} lang={lang} otherLang={otherLang} swapLangUrl={swapLangUrl} />
      <main>
        <HeroSection t={t} />
        <StatsBarSection t={t} />
        <AboutSection t={t} />
        <LocationSection t={t} />
        <SuspiroSection t={t} />
        <PieceOfJungleSection t={t} />
        <MasterplanSection t={t} />
        <AmenitiesSection t={t} />
        <InvestmentSection t={t} />
        <CredentialsSection t={t} />
        <TestimonialsSection t={t} />
        <FAQSection t={t} />
        <FinalCTASection t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
