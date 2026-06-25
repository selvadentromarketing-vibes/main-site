import { MapPin } from 'lucide-react';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function LocationSection({ t }: Props) {
  return (
    <section id="ubicacion" className="section bg-brand-crema-osc">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="font-serif text-brand-verde-osc leading-tight mb-12 max-w-3xl mx-auto"
          style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)' }}
        >
          {t.location.title}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
          {t.location.distances.map((d, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-brand-verde/10"
            >
              <MapPin className="w-5 h-5 text-brand-oro mx-auto mb-2" />
              <div className="font-serif text-2xl text-brand-verde-osc mb-1">
                {d.minutes}
                <span className="text-xs text-brand-gris ml-1">min</span>
              </div>
              <div className="text-xs text-brand-gris leading-snug">
                {d.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
