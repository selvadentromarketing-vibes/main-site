import Reveal from '../Reveal';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function PieceOfJungleSection({ t }: Props) {
  return (
    <section className="section bg-brand-crema-osc">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow mb-5">{t.pieceOfJungle.eyebrow}</span>
        </Reveal>

        <Reveal delay={100}>
          <div className="mb-12">
            <div className="flex h-3 max-w-2xl mx-auto rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-brand-oro transition-all duration-1000 ease-out"
                style={{ width: '35%' }}
              />
              <div
                className="bg-brand-verde transition-all duration-1000 ease-out"
                style={{ width: '65%' }}
              />
            </div>
            <div className="flex justify-between max-w-2xl mx-auto mt-2 text-xs tracking-wider uppercase">
              <span className="text-brand-oro font-semibold">35%</span>
              <span className="text-brand-verde font-semibold">65%</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p
            className="font-serif text-brand-verde-osc leading-tight max-w-3xl mx-auto mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.5rem)' }}
          >
            {t.pieceOfJungle.ratio}
          </p>
          <p className="text-brand-gris max-w-xl mx-auto">{t.pieceOfJungle.lots}</p>
        </Reveal>
      </div>
    </section>
  );
}
