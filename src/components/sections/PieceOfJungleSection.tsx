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

  return (
    <section className="section bg-brand-crema-osc">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-verde/10 bg-brand-verde-osc/5">
            <img
              src="/render-mirador.webp"
              alt="Lote en Selvadentro"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div>
            <span className="eyebrow mb-3">{tagLabel}</span>
            <h2
              className="font-serif text-brand-verde-osc leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {t.pieceOfJungle.eyebrow}
            </h2>

            {/* 35/65 ratio bar — premium visual aid */}
            <div className="mb-6">
              <div className="flex h-3 rounded-full overflow-hidden shadow-inner">
                <div className="bg-brand-oro" style={{ width: '35%' }} />
                <div className="bg-brand-verde" style={{ width: '65%' }} />
              </div>
              <div className="flex justify-between mt-2 text-xs tracking-wider uppercase">
                <span className="text-brand-oro font-semibold">35%</span>
                <span className="text-brand-verde font-semibold">65%</span>
              </div>
            </div>

            <p
              className="font-serif text-brand-verde-osc leading-tight mb-6"
              style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)' }}
            >
              {t.pieceOfJungle.ratio}
            </p>
            <p className="text-brand-gris mb-8">{t.pieceOfJungle.lots}</p>

            <MagneticButton href="#contacto" className="btn-ghost-dark">
              {cta}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
