import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

interface Stat {
  value: string;
  labelEs: string;
  labelEn: string;
}

const STATS: Stat[] = [
  { value: '71',       labelEs: 'lotes exclusivos',      labelEn: 'exclusive lots' },
  { value: '20/60/20', labelEs: 'esquema de pagos',      labelEn: 'payment schedule' },
  { value: '$167',     labelEs: 'USD por m²',            labelEn: 'USD per m²' },
  { value: '48',       labelEs: 'meses sin intereses',   labelEn: 'interest-free months' },
  { value: '2029',     labelEs: 'entrega',               labelEn: 'delivery' },
  { value: '100%',     labelEs: 'certeza jurídica',      labelEn: 'legal certainty' },
];

interface Service {
  es: string;
  en: string;
}

const SERVICES: Service[] = [
  { es: 'Avenida Selvadentro',              en: 'Selvadentro Avenue' },
  { es: 'Calle Suspiro',                    en: 'Suspiro Street' },
  { es: 'Energía eléctrica sustentable',    en: 'Sustainable electric power' },
  { es: 'Red de agua subterránea',          en: 'Underground water network' },
  { es: 'Acceso controlado',                en: 'Controlled access' },
  { es: 'Seguridad 24/7',                   en: '24/7 security' },
  { es: 'Internet wifi en áreas comunes',   en: 'Wi-Fi in common areas' },
  { es: 'Iluminación de bajo impacto',      en: 'Low-impact lighting' },
];

export default function SuspiroSection({ t, lang }: Props) {
  const privLabel = lang === 'es' ? 'Una privada de Selvadentro' : 'A private enclave of Selvadentro';
  const priceLarge = lang === 'es' ? 'Lotes desde $68,000 USD' : 'Lots from $68,000 USD';
  const priceSub =
    lang === 'es'
      ? 'desde $167 USD/m² · Plan de pagos a 48 meses sin intereses'
      : 'from $167 USD/m² · 48-month interest-free payment plan';
  const protectLabel = lang === 'es' ? 'Lo que protege tu inversión' : 'What protects your investment';
  const servicesTitle = lang === 'es' ? 'Servicios e infraestructura' : 'Services & infrastructure';

  return (
    <section id="suspiro" className="section bg-brand-crema">
      <div className="max-w-7xl mx-auto">
        {/* Row 1 — image + copy (unchanged) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-verde/10">
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

        {/* Row 2 — stats grid */}
        <Reveal delay={200}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-brand-verde/10 rounded-2xl overflow-hidden border border-brand-verde/10">
            {STATS.map((s) => (
              <div
                key={s.value + s.labelEs}
                className="bg-white p-5 lg:p-6 flex flex-col items-center justify-center text-center min-h-[120px]"
              >
                <div className="font-serif text-2xl lg:text-3xl text-brand-verde-osc leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-brand-gris leading-tight">
                  {lang === 'es' ? s.labelEs : s.labelEn}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Row 3 — services checklist */}
        <Reveal delay={300}>
          <div className="mt-14 bg-white/60 rounded-3xl border border-brand-verde/10 p-8 lg:p-10">
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-oro mb-6 text-center">
              {servicesTitle}
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
              {SERVICES.map((s) => (
                <li key={s.es} className="flex items-start gap-3 text-sm text-brand-negro/85">
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-brand-verde/10 text-brand-verde-osc flex items-center justify-center"
                  >
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  </span>
                  <span className="leading-snug">{lang === 'es' ? s.es : s.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
