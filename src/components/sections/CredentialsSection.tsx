import Reveal from '../Reveal';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function CredentialsSection({ t }: Props) {
  return (
    <section id="credenciales" className="section bg-brand-crema">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow mb-3">{t.credentials.eyebrow}</span>
          <h2
            className="font-serif text-brand-verde-osc leading-tight mb-8 max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {t.credentials.headline}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex justify-center mb-8">
            <img
              src="/jjf-creando.webp"
              alt="JJF Creando"
              className="h-20 w-auto transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-brand-negro/80 leading-relaxed max-w-3xl mx-auto mb-8 text-left sm:text-justify">
            {t.credentials.body}
          </p>

          <p className="font-serif italic text-xl text-brand-verde-osc">
            {t.credentials.partners}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
