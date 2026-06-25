import { ArrowDown } from 'lucide-react';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function HeroSection({ t }: Props) {
  return (
    <section
      className="relative min-h-[100svh] flex items-end overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(28,46,28,0.35) 0%, rgba(28,46,28,0.45) 60%, rgba(28,46,28,0.85) 100%), url('/hero-cenote.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-20 sm:pb-28 pt-32 w-full">
        <div className="max-w-3xl text-brand-crema">
          <h1
            className="font-serif leading-[1.05] mb-6 text-brand-crema"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}
          >
            {t.hero.headline}
          </h1>
          <p className="text-lg sm:text-xl text-brand-crema/85 max-w-2xl mb-10 leading-relaxed">
            {t.hero.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contacto" className="btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#acerca" className="btn-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#stats"
        aria-label="Scroll"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand-crema/70 hover:text-brand-crema animate-pulse"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  );
}
