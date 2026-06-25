import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function SuspiroSection({ t }: Props) {
  return (
    <section
      id="suspiro"
      className="relative section overflow-hidden text-brand-crema"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(28,46,28,0.85) 0%, rgba(28,46,28,0.92) 100%), url('/render-aerial.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative max-w-4xl mx-auto text-center">
        <span className="eyebrow text-brand-oro mb-4">{t.suspiro.eyebrow}</span>
        <h2
          className="font-serif leading-tight mb-7"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)' }}
        >
          {t.suspiro.headline}
        </h2>
        <p className="text-base sm:text-lg text-brand-crema/85 leading-relaxed mb-10 max-w-2xl mx-auto">
          {t.suspiro.body}
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-10 text-left">
          <div className="bg-brand-verde-osc/60 backdrop-blur-sm border border-brand-crema/15 rounded-2xl p-6">
            <p className="text-sm text-brand-crema/85 leading-relaxed">
              {t.suspiro.pricing}
            </p>
          </div>
          <div className="bg-brand-verde-osc/60 backdrop-blur-sm border border-brand-crema/15 rounded-2xl p-6">
            <p className="text-sm text-brand-crema/85 leading-relaxed">
              {t.suspiro.protection}
            </p>
          </div>
        </div>

        <a href="#contacto" className="btn-primary">
          {t.suspiro.cta}
        </a>
      </div>
    </section>
  );
}
