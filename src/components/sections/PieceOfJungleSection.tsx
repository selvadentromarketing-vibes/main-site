import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

export default function PieceOfJungleSection({ t, lang }: Props) {
  const tagLabel = lang === 'es' ? 'Tu lote' : 'Your homesite';
  const cta = lang === 'es' ? 'Ver disponibilidad' : 'View availability';
  const buildLabel = lang === 'es' ? 'Para construir' : 'To build on';
  const jungleLabel = lang === 'es' ? 'Selva privada' : 'Private jungle';
  const forever = lang === 'es' ? 'Tuya, para siempre' : 'Yours, forever';
  // Reglamento copy + lot diagram from Suspiro brochure p.19
  const regQuote =
    lang === 'es'
      ? 'Un reglamento de construcción que te permite el contacto con la naturaleza, exclusividad y privacidad.'
      : 'A building code designed for contact with nature, exclusivity, and privacy.';
  const regNote =
    lang === 'es'
      ? 'Retiros perimetrales que garantizan selva entre tú y tus vecinos — cada casa respira sola.'
      : 'Perimeter setbacks guarantee jungle between you and your neighbors — every home breathes on its own.';
  const diagramAlt =
    lang === 'es'
      ? 'Diagrama de lote C-60 con retiros de construcción'
      : 'Lot C-60 diagram with building setbacks';

  return (
    <section className="section bg-brand-crema">
      <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Copy — LEFT (7 cols) */}
        <Reveal className="lg:col-span-7 order-2 lg:order-1">
          <div>
            <span className="eyebrow mb-3">{tagLabel}</span>
            <h2
              className="font-serif text-brand-verde-osc leading-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}
            >
              {t.pieceOfJungle.eyebrow}
            </h2>

            <p
              className="font-serif text-brand-verde-osc leading-tight mb-6"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 1.9rem)' }}
            >
              {t.pieceOfJungle.ratio}
            </p>
            <p className="text-brand-gris mb-8 max-w-md">{t.pieceOfJungle.lots}</p>

            <MagneticButton href="#contacto" className="btn-ghost-dark">
              {cta}
            </MagneticButton>
          </div>
        </Reveal>

        {/* Ratio visualization — RIGHT (5 cols) */}
        <Reveal delay={150} className="lg:col-span-5 order-1 lg:order-2">
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-brand-verde/10 flex flex-col"
            style={{ aspectRatio: '4 / 5' }}
          >
            {/* 35% — construir */}
            <div
              className="relative bg-brand-oro flex items-center justify-center"
              style={{ flexBasis: '35%' }}
            >
              <div className="text-center px-4">
                <div
                  className="font-serif text-brand-verde-osc leading-none"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
                >
                  35%
                </div>
                <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-brand-verde-osc/85 font-semibold">
                  {buildLabel}
                </div>
              </div>
            </div>

            {/* 65% — selva */}
            <div
              className="relative bg-brand-verde-osc flex items-center justify-center"
              style={{ flexBasis: '65%' }}
            >
              <div className="text-center px-4">
                <div
                  className="font-serif text-brand-crema leading-none"
                  style={{ fontSize: 'clamp(3.6rem, 8vw, 6.5rem)' }}
                >
                  65%
                </div>
                <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-brand-crema/85 font-semibold">
                  {jungleLabel}
                </div>
                <div className="mt-6 font-serif italic text-brand-crema/70 text-sm">
                  {forever}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Row 2 — lot diagram + reglamento (brochure p.19) */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-16 lg:mt-24">
        <Reveal className="lg:col-span-7">
          <div className="rounded-2xl overflow-hidden bg-white/50 ring-1 ring-brand-verde/10 shadow-lg">
            <img
              src="/lot-diagram-c60.webp"
              alt={diagramAlt}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5">
          <div>
            <p
              className="font-serif text-brand-verde-osc leading-snug mb-6"
              style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)' }}
            >
              {regQuote}
            </p>
            <p className="text-brand-gris max-w-md">{regNote}</p>
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
