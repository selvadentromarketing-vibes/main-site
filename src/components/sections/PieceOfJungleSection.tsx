import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

/**
 * "Tu pedazo de selva" section — image on the RIGHT, copy on the LEFT
 * to visually differentiate from Suspiro (which has image on the left).
 * The 35/65 ratio bar is the section's identity — kept front and center.
 */
export default function PieceOfJungleSection({ t, lang }: Props) {
  const tagLabel = lang === 'es' ? 'Tu lote' : 'Your homesite';
  const cta = lang === 'es' ? 'Ver disponibilidad' : 'View availability';

  return (
    <section className="section bg-brand-crema">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Copy on the LEFT (7 cols) */}
        <Reveal className="lg:col-span-7 order-2 lg:order-1">
          <div>
            <span className="eyebrow mb-3">{tagLabel}</span>
            <h2
              className="font-serif text-brand-verde-osc leading-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}
            >
              {t.pieceOfJungle.eyebrow}
            </h2>

            {/* 35/65 ratio bar — hero visual of this section */}
            <div className="mb-8 max-w-md">
              <div className="flex h-4 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-brand-oro transition-all duration-1000 ease-out relative"
                  style={{ width: '35%' }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tracking-widest text-brand-verde-osc">
                    35%
                  </span>
                </div>
                <div
                  className="bg-brand-verde-osc transition-all duration-1000 ease-out relative"
                  style={{ width: '65%' }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tracking-widest text-brand-crema">
                    65%
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] tracking-widest uppercase">
                <span className="text-brand-oro font-semibold">
                  {lang === 'es' ? 'Para construir' : 'To build on'}
                </span>
                <span className="text-brand-verde-osc font-semibold">
                  {lang === 'es' ? 'Selva privada' : 'Private jungle'}
                </span>
              </div>
            </div>

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

        {/* Image on the RIGHT (5 cols) — lot diagram, smaller than Suspiro's entrance */}
        <Reveal delay={150} className="lg:col-span-5 order-1 lg:order-2">
          {/* PLACEHOLDER (low-res) — extracted from prototype HTML. Replace with high-res lot diagram when available. See ASSETS_PENDING.md. */}
          <div className="rounded-2xl overflow-hidden bg-brand-crema-osc ring-1 ring-brand-verde/10 p-4 shadow-lg">
            <img
              src="/lot-diagram.webp"
              alt="Diagrama de lote en Selvadentro"
              className="w-full h-auto block transition-transform duration-1000 hover:scale-105"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
