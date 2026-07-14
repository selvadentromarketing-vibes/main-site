import { TrendingUp } from 'lucide-react';
import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

export default function InvestmentSection({ t, lang }: Props) {
  return (
    <section
      id="inversion"
      className="section bg-brand-verde-osc text-brand-crema"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="eyebrow text-brand-oro mb-3">{t.investment.eyebrow}</span>
            <h2
              className="font-serif leading-tight max-w-3xl mx-auto"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
            >
              {t.investment.headline}
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6 mb-14 relative">
          <div className="hidden sm:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-brand-crema/15 via-brand-oro to-brand-crema/15" />
          {t.investment.timeline.map((point, i) => (
            <Reveal key={i} delay={i * 200}>
              <div className="relative text-center group">
                <div className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-brand-verde border border-brand-oro/30 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:border-brand-oro/80 group-hover:shadow-[0_0_30px_rgba(200,169,110,0.35)]">
                  <TrendingUp className="w-6 h-6 text-brand-oro transition-transform duration-500 group-hover:rotate-12" />
                </div>
                <div className="font-serif text-2xl text-brand-oro mb-1">
                  {point.milestone}
                </div>
                <div className="text-xs uppercase tracking-widest text-brand-crema/60">
                  {point.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {t.investment.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-brand-crema/85 leading-relaxed text-base sm:text-lg">
                {p}
              </p>
            </Reveal>
          ))}

          {/* EN only: fideicomiso line — per the prototype */}
          {lang === 'en' && (
            <Reveal delay={400}>
              <p className="font-serif italic text-brand-crema/90 text-base sm:text-lg leading-relaxed">
                As a foreign buyer, you can own here securely through a bank trust
                (fideicomiso) — fully legal, fully protected.
              </p>
            </Reveal>
          )}

          <Reveal delay={500}>
            <div className="pt-6 text-center">
              <MagneticButton href="#contacto" className="btn-primary">
                {t.investment.cta}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
