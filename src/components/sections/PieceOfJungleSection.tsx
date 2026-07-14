import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

const LOTE_IMAGE_URL = '/lot-jungle.png';

export default function PieceOfJungleSection({ t, lang }: Props) {
  const tagLabel = lang === 'es' ? 'Tu lote' : 'Your homesite';
  const cta = lang === 'es' ? 'Recorrer 360°' : 'Take the 360° tour';
  const buildLabel = lang === 'es' ? 'Para construir' : 'To build on';
  const jungleLabel = lang === 'es' ? 'Selva privada — tuya, para siempre' : 'Private jungle — yours, forever';
  const regQuote =
    lang === 'es'
      ? 'Un reglamento de construcción que te permite el contacto con la naturaleza, exclusividad y privacidad.'
      : 'A building code designed for contact with nature, exclusivity, and privacy.';
  const regNote =
    lang === 'es'
      ? 'Retiros perimetrales que garantizan selva entre tú y tus vecinos — cada casa respira sola.'
      : 'Perimeter setbacks guarantee jungle between you and your neighbors — every home breathes on its own.';
  const imgAlt =
    lang === 'es'
      ? 'Vista del lote en Selvadentro — selva privada'
      : 'View of a Selvadentro lot — private jungle';

  return (
    <section className="bg-brand-crema py-12 sm:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT — unified copy */}
          <Reveal className="lg:col-span-6 order-2 lg:order-1">
            <div>
              <span className="eyebrow mb-3">{tagLabel}</span>
              <h2
                className="font-serif text-brand-verde-osc leading-tight mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}
              >
                {t.pieceOfJungle.eyebrow}
              </h2>

              <p
                className="font-serif text-brand-verde-osc leading-snug mb-4"
                style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)' }}
              >
                {t.pieceOfJungle.ratio}
              </p>
              <p className="text-brand-gris mb-8 max-w-md">
                {t.pieceOfJungle.lots}
              </p>

              {/* Subtle split-bar visualization */}
              <div className="mb-10 max-w-md">
                <div className="flex items-baseline justify-between text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-verde-osc/75 mb-2">
                  <span>
                    <span className="font-serif text-brand-verde-osc text-lg mr-2 not-italic">35%</span>
                    {buildLabel}
                  </span>
                  <span className="text-right">
                    <span className="font-serif text-brand-verde-osc text-lg mr-2 not-italic">65%</span>
                    {jungleLabel}
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden bg-brand-verde/10 flex"
                  role="img"
                  aria-label={`${buildLabel} 35% · ${jungleLabel} 65%`}
                >
                  <span className="bg-brand-oro/85" style={{ width: '35%' }} />
                  <span className="bg-brand-verde-osc/85" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="border-l-2 border-brand-oro/50 pl-5 mb-6">
                <p
                  className="font-serif italic text-brand-verde-osc leading-snug mb-3"
                  style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.35rem)' }}
                >
                  {regQuote}
                </p>
                <p className="text-brand-gris text-sm max-w-md">{regNote}</p>
              </div>

              <MagneticButton href="#tour-virtual" className="btn-ghost-dark">
                {cta}
              </MagneticButton>
            </div>
          </Reveal>

          {/* RIGHT — image (full-fit, never cropped) */}
          <Reveal delay={150} className="lg:col-span-6 order-1 lg:order-2 self-center">
            <img
              src={LOTE_IMAGE_URL}
              alt={imgAlt}
              className="block w-full h-auto max-w-full object-contain"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
