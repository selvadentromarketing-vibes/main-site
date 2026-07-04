import { ExternalLink } from 'lucide-react';
import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import MasterplanExplorer from '../MasterplanExplorer';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

export default function MasterplanSection({ t, lang }: Props) {
  const hint =
    lang === 'es'
      ? 'Arrastra para explorar · scroll o clic para acercar · toca los puntos'
      : 'Drag to explore · scroll or click to zoom · tap the dots';

  return (
    <section id="masterplan" className="section bg-brand-crema">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <span className="eyebrow mb-3">{t.masterplan.eyebrow}</span>
            <h2
              className="font-serif text-brand-verde-osc leading-tight mb-5 max-w-3xl mx-auto"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {t.masterplan.headline}
            </h2>
            <p className="text-brand-gris">{t.masterplan.bullets}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* Map asset is the prototype-extracted render cropped to the map band.
              Swap for high-res 013_260514_MP_AMENIDADES when it arrives. See ASSETS_PENDING.md. */}
          <MasterplanExplorer lang={lang} />
          <p className="text-center text-xs uppercase tracking-widest text-brand-gris mt-6">
            {hint}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="text-center mt-10">
            <MagneticButton
              href="https://eva3d.com/recorridos-virtuales-360/jjf-creando/selvadentro/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-dark"
            >
              {t.masterplan.cta}
              <ExternalLink className="w-4 h-4" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
