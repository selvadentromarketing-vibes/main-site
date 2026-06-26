import { MapPin } from 'lucide-react';
import Reveal from '../Reveal';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

export default function LocationSection({ t, lang }: Props) {
  const mapHeading = lang === 'es' ? 'El mapa va aquí' : 'Map goes here';
  const mapBody =
    lang === 'es'
      ? 'Mapa del brochure de Suspiro mostrando la relación con la playa, el Tren Maya y el pueblo. Pendiente de subir.'
      : 'Suspiro brochure map showing the relationship with the beach, the Maya Train and town. Pending upload.';

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

        {/* Map placeholder — per the redesign guide PENDIENTE list */}
        <Reveal delay={350}>
          <div className="bg-white/60 border-2 border-dashed border-brand-verde/25 rounded-2xl p-12 max-w-4xl mx-auto">
            <div className="text-4xl mb-3">📍</div>
            <div className="font-serif text-xl text-brand-verde-osc mb-2">
              {mapHeading}
            </div>
            <div className="text-sm text-brand-gris max-w-md mx-auto leading-relaxed">
              {mapBody}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
