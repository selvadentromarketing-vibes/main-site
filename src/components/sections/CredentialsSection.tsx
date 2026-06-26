import Reveal from '../Reveal';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

export default function CredentialsSection({ t, lang }: Props) {
  // Match the prototype's eyebrow phrasing
  const eyebrow = lang === 'es' ? 'Quiénes lo construyen' : 'Who builds it';

  const logos = [
    { name: 'JJF Creando', src: '/jjf-creando.webp', placeholder: false },
    // Per the redesign guide PENDIENTE list, these two logos are awaiting
    // upload from the design team. Placeholders match the prototype layout.
    { name: 'Maat Handasa', src: null, placeholder: true },
    { name: 'AMA Estudio', src: null, placeholder: true },
  ];

  return (
    <section id="credenciales" className="section bg-brand-crema">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow mb-3">{eyebrow}</span>
          <h2
            className="font-serif text-brand-verde-osc leading-tight mb-8 max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {t.credentials.headline}
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="text-brand-negro/80 leading-relaxed max-w-3xl mx-auto mb-10 text-left sm:text-justify">
            {t.credentials.body}
          </p>

          <p className="font-serif italic text-xl text-brand-verde-osc mb-12">
            {t.credentials.partners}
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="grid sm:grid-cols-3 gap-6 items-center justify-items-center">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="h-24 w-full flex items-center justify-center bg-brand-crema-osc/60 rounded-2xl border border-brand-verde/10"
              >
                {logo.placeholder ? (
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-gris">
                    {logo.name}
                  </span>
                ) : (
                  <img
                    src={logo.src!}
                    alt={logo.name}
                    className="h-16 w-auto transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
