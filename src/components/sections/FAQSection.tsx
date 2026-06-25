import Accordion from '../Accordion';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function FAQSection({ t }: Props) {
  return (
    <section id="faq" className="section bg-brand-crema">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="eyebrow mb-3">{t.faq.eyebrow}</span>
          <h2
            className="font-serif text-brand-verde-osc leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {t.faq.headline}
          </h2>
        </div>

        <Accordion items={t.faq.items} />
      </div>
    </section>
  );
}
