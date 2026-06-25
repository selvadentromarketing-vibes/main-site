import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function AmenitiesSection({ t }: Props) {
  return (
    <section id="amenidades" className="section bg-brand-crema-osc">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3">{t.amenities.eyebrow}</span>
          <h2
            className="font-serif text-brand-verde-osc leading-tight max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {t.amenities.headline}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {t.amenities.cards.map((card, i) => (
            <article
              key={i}
              className="group bg-brand-crema rounded-2xl overflow-hidden border border-brand-verde/10 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl text-brand-verde-osc mb-4">
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-brand-gris text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-oro shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
