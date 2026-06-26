import Reveal from '../Reveal';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function StatsBarSection({ t }: Props) {
  return (
    <section id="stats" className="bg-brand-verde-osc text-brand-crema">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
          {t.stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="border-l md:border-l-0 md:border-r border-brand-crema/15 md:last:border-r-0 first:border-l-0 px-4">
                <div className="font-serif text-3xl sm:text-5xl text-brand-oro mb-2 transition-transform duration-500 hover:scale-110 inline-block">
                  {s.number}
                </div>
                <div className="text-xs sm:text-sm text-brand-crema/80 leading-snug tracking-wide">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
