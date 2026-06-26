import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

export default function SuspiroSection({ t, lang }: Props) {
  // Lang-aware sub-eyebrow + protection label
  const privLabel = lang === 'es' ? 'Una privada de Selvadentro' : 'A private enclave of Selvadentro';
  const priceLarge = lang === 'es' ? 'Lotes desde $68,000 USD' : 'Lots from $68,000 USD';
  const priceSub =
    lang === 'es'
      ? 'desde $167 USD/m² · Plan de pagos a 48 meses sin intereses'
      : 'from $167 USD/m² · 48-month interest-free payment plan';
  const protectLabel =
    lang === 'es' ? 'Lo que protege tu inversión' : 'What protects your investment';

  return (
    <section id="suspiro" className="section bg-brand-crema">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-verde/10">
            {/* PLACEHOLDER (low-res) — extracted from prototype HTML. Replace with high-res render when available. See ASSETS_PENDING.md. */}
            <img
              src="/suspiro-entrance.webp"
              alt="Acceso Suspiro"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-oro mb-3">
              {privLabel}
            </div>
            <h2
              className="font-serif text-brand-verde-osc leading-tight mb-6"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)' }}
            >
              {t.suspiro.headline}
            </h2>
            <p className="text-brand-negro/85 leading-relaxed mb-5 max-w-copy">
              {t.suspiro.body}
            </p>

            <div className="font-serif text-3xl sm:text-4xl text-brand-verde-osc mt-8 mb-1">
              {priceLarge}
            </div>
            <div className="text-sm text-brand-gris mb-8">{priceSub}</div>

            <div className="bg-brand-crema-osc rounded-xl p-5 mb-8 border border-brand-verde/10">
              <div className="text-xs font-semibold tracking-wider uppercase text-brand-verde-osc mb-2">
                {protectLabel}
              </div>
              <p className="text-sm text-brand-negro/80 leading-relaxed">
                {t.suspiro.protection}
              </p>
            </div>

            <MagneticButton href="#contacto" className="btn-ghost-dark">
              {t.suspiro.cta}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
