import { MapPin } from 'lucide-react';
import Reveal from '../Reveal';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

export default function LocationSection({ t, lang }: Props) {
  const mapAlt =
    lang === 'es'
      ? 'Rutas de acceso a Suspiro — Carretera Federal, Tren Maya y Libramiento'
      : 'Access routes to Suspiro — Federal Highway, Maya Train and bypass road';

  return (
    <section id="ubicacion" className="section bg-brand-crema-osc">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <h2
            className="font-serif text-brand-verde-osc leading-tight mb-12 max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)' }}
          >
            {t.location.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 max-w-5xl mx-auto mb-12">
          {t.location.distances.map((d, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-brand-verde/10 transition-all duration-500 hover:bg-white hover:-translate-y-1 hover:shadow-lg hover:border-brand-oro/40">
                <MapPin className="w-5 h-5 text-brand-oro mx-auto mb-2 transition-transform duration-500 group-hover:scale-125" />
                <div className="font-serif text-2xl text-brand-verde-osc mb-1">
                  {d.minutes}
                  <span className="text-xs text-brand-gris ml-1">min</span>
                </div>
                <div className="text-xs text-brand-gris leading-snug">
                  {d.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rutas de acceso map — extracted from Suspiro brochure p.5 */}
        <Reveal delay={350}>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-verde/10 max-w-5xl mx-auto">
            <img
              src="https://assets.cdn.filesafe.space/crN2IhAuOBAl7D8324yI/media/6a51171ac36eb22215043337.jpeg"
              alt={mapAlt}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
