import { TrendingUp } from 'lucide-react';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function InvestmentSection({ t }: Props) {
  return (
    <section
      id="inversion"
      className="section bg-brand-verde-osc text-brand-crema"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow text-brand-oro mb-3">{t.investment.eyebrow}</span>
          <h2
            className="font-serif leading-tight max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
          >
            {t.investment.headline}
          </h2>
        </div>

        {/* Timeline */}
        <div className="grid sm:grid-cols-3 gap-6 mb-14 relative">
          <div className="hidden sm:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-brand-crema/15 via-brand-oro to-brand-crema/15" />
          {t.investment.timeline.map((point, i) => (
            <div key={i} className="relative text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-brand-verde border border-brand-oro/30 relative z-10">
                <TrendingUp className="w-6 h-6 text-brand-oro" />
              </div>
              <div className="font-serif text-2xl text-brand-oro mb-1">
                {point.milestone}
              </div>
              <div className="text-xs uppercase tracking-widest text-brand-crema/60">
                {point.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {t.investment.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-brand-crema/85 leading-relaxed text-base sm:text-lg"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
