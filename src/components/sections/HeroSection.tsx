import { ArrowDown } from 'lucide-react';
import MagneticButton from '../MagneticButton';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

const COTIZADOR_URL =
  'https://app.adaracrm.com/empresa/selvadentro/cotizador/selvadentro-tulum/selvadentro-tulum/etapa-suspiro';

export default function HeroSection({ t }: Props) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-brand-verde-osc">
      {/* Static background image, anchored top-right */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-cenote.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Static gradient veil for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(28,46,28,0.30) 0%, rgba(28,46,28,0.35) 55%, rgba(28,46,28,0.88) 100%)',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-32 flex items-center justify-center">
        <div className="max-w-3xl text-brand-crema text-center mx-auto flex flex-col items-center">
          <h1
            className="font-serif leading-[1.05] mb-6 text-brand-crema drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)]"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}
          >
            {t.hero.headline}
          </h1>
          <p className="text-lg sm:text-xl text-brand-crema/90 max-w-2xl mb-10 leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
            {t.hero.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href={COTIZADOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t.hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton href="#tour-virtual" className="btn-secondary">
              {t.hero.ctaSecondary}
            </MagneticButton>
          </div>
        </div>
      </div>

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
