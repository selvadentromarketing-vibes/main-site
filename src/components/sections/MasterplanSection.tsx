import { ExternalLink } from 'lucide-react';
import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import HotspotOverlay from '../MasterplanHotspots';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

export default function MasterplanSection({ t, lang }: Props) {
  const hint =
    lang === 'es'
      ? 'Pasa el mouse sobre los puntos para ver amenidades y cenotes'
      : 'Hover over the dots to explore amenities and cenotes';

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
          {/* PLACEHOLDER (low-res ~950KB) — extracted from prototype HTML. Replace with high-res masterplan render (013_260514_MP_AMENIDADES). See ASSETS_PENDING.md. */}
          <div className="relative bg-brand-crema-osc rounded-3xl overflow-hidden border border-brand-verde/10 shadow-xl">
            <img
              src="/masterplan.webp"
              alt="Masterplan Selvadentro"
              className="w-full h-auto block select-none"
              draggable={false}
            />
            {/* Interactive hotspot overlay — positions in MasterplanHotspots.tsx */}
            <HotspotOverlay lang={lang} />
          </div>
          <p className="text-center text-xs uppercase tracking-widest text-brand-gris mt-4">
            {hint}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-brand-oro rounded-full" />
              <span className="text-brand-gris">
                {lang === 'es' ? 'Amenidad' : 'Amenity'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-sky-400 rounded-full" />
              <span className="text-brand-gris">Cenote</span>
            </div>
          </div>

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
