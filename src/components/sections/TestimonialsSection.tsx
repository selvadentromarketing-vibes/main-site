import VideoEmbed from '../VideoEmbed';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function TestimonialsSection({ t }: Props) {
  return (
    <section id="testimonios" className="section bg-brand-crema-osc">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3">{t.testimonials.eyebrow}</span>
          <h2
            className="font-serif text-brand-verde-osc leading-tight max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {t.testimonials.headline}
          </h2>
        </div>

        <div className="mb-14 max-w-4xl mx-auto">
          <VideoEmbed
            youtubeId="wY7KfUCTXPE"
            title="Selvadentro testimonials"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((tm, i) => (
            <figure
              key={i}
              className="bg-brand-crema rounded-2xl p-7 border border-brand-verde/10 shadow-sm"
            >
              <img
                src={tm.photo}
                alt={tm.name}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover mb-5 ring-2 ring-brand-oro/30"
              />
              <blockquote className="font-serif italic text-brand-verde-osc text-base leading-relaxed mb-5">
                “{tm.quote}”
              </blockquote>
              <figcaption className="text-xs uppercase tracking-widest text-brand-gris">
                {tm.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
