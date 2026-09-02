import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * Money page — /lotes-en-venta-tulum ↔ /en/tulum-land-for-sale
 * Target queries: "terrenos en venta en tulum", "lotes en venta tulum" /
 * "tulum land for sale", "tulum lots for sale", "buy land in tulum".
 * One intent (buy a lot), synonyms consolidated here — never split into
 * near-duplicate pages.
 */

const fmt = (n: number) => n.toLocaleString('en-US');

const copy = {
  es: {
    eyebrow: 'Disponibilidad',
    lede: `En Selvadentro hay lotes residenciales en venta desde $${fmt(PRICING.lotPriceFromUSD)} USD — desde $${PRICING.pricePerM2USD} USD por m² — dentro de la única comunidad privada de Tulum con nueve cenotes. Superficies de ${PRICING.lotSizeMinM2} a ${fmt(PRICING.lotSizeMaxM2)} m², plan a ${PRICING.paymentPlanMonths} meses sin intereses y entrega en ${PRICING.deliveryYear}.`,
    tableTitle: 'Precios y condiciones (Suspiro, la privada activa)',
    tableNote: `Actualizado: septiembre 2026. Mirador y Refugio, las dos primeras privadas, ya se vendieron en su totalidad.`,
    rows: [
      ['Precio de lote', `Desde $${fmt(PRICING.lotPriceFromUSD)} USD`],
      ['Precio por m²', `Desde $${PRICING.pricePerM2USD} USD (lanzamiento may 2025: $${PRICING.launchPricePerM2USD} USD)`],
      ['Superficies', `${PRICING.lotSizeMinM2} – ${fmt(PRICING.lotSizeMaxM2)} m²`],
      ['Plan de pagos', `${PRICING.paymentPlanMonths} meses sin intereses, directo con el desarrollador`],
      ['Entrega', `${PRICING.deliveryYear} · acceso a cenotes y amenidades desde tu compra`],
      ['Mantenimiento', PRICING.hoaFeeLabelEs],
      ['Normativa', `COS ${PRICING.cosPercent}% · CUS ${PRICING.cusPercent}% · 2 niveles + roof deck`],
    ],
    whatTitle: '¿Qué compras exactamente?',
    whatBody: [
      `Un lote residencial escriturado dentro de una privada con acceso controlado, en la Ruta de los Cenotes de Tulum. Del total de tu lote, el ${PRICING.cosPercent}% es construible; el resto permanece como selva privada tuya. La normativa aplica a todos los vecinos, así que la baja densidad que compras hoy no puede desaparecer mañana.`,
      `La infraestructura incluye energía sustentable, red de agua subterránea, seguridad 24/7, internet en áreas comunes y las vialidades internas del proyecto. Los nueve cenotes y las +12 experiencias — Casa de los Cenotes, Jungle Bar, wellness center, pádel — son de uso residencial desde el día de tu compra.`,
    ],
    stepsTitle: 'Cómo comprar, en cuatro pasos',
    steps: [
      ['Elige tu lote', 'En sitio o por videollamada sobre el masterplan interactivo, con un asesor.'],
      ['Firma y aparta', 'Promesa de compraventa ante notario y enganche inicial.'],
      ['Paga a tu ritmo', `Mensualidades a ${PRICING.paymentPlanMonths} meses sin intereses.`],
      ['Escritura', 'Ante notario público; compradores extranjeros suman el fideicomiso bancario.'],
    ],
    linksTitle: 'Antes de decidir, revisa',
    links: [
      ['/cenotes', 'Los 9 cenotes del proyecto'],
      ['/plusvalia-en-tulum', 'La plusvalía documentada: de $119 a $167 USD/m²'],
      ['/preventa-de-terrenos-en-tulum', 'Cómo funciona la preventa y el plan de pagos'],
      ['/legalidad-y-permisos', 'Permisos verificados por SEDETUS'],
      ['/preguntas-frecuentes', 'Preguntas frecuentes'],
    ],
    imgAlt: 'Acceso a Suspiro, la privada activa de Selvadentro Tulum',
  },
  en: {
    eyebrow: 'Availability',
    lede: `Selvadentro has residential lots for sale from $${fmt(PRICING.lotPriceFromUSD)} USD — from $${PRICING.pricePerM2USD} USD per m² — inside the only private community in Tulum with nine cenotes. Lot sizes run ${PRICING.lotSizeMinM2} to ${fmt(PRICING.lotSizeMaxM2)} m², with a ${PRICING.paymentPlanMonths}-month interest-free plan and ${PRICING.deliveryYear} delivery.`,
    tableTitle: 'Pricing and terms (Suspiro, the active enclave)',
    tableNote: 'Updated: September 2026. Mirador and Refugio, the first two enclaves, are fully sold.',
    rows: [
      ['Lot price', `From $${fmt(PRICING.lotPriceFromUSD)} USD`],
      ['Price per m²', `From $${PRICING.pricePerM2USD} USD (May 2025 launch: $${PRICING.launchPricePerM2USD} USD)`],
      ['Lot sizes', `${PRICING.lotSizeMinM2} – ${fmt(PRICING.lotSizeMaxM2)} m²`],
      ['Payment plan', `${PRICING.paymentPlanMonths} months at 0% interest, directly with the developer`],
      ['Delivery', `${PRICING.deliveryYear} · cenote and amenity access starts at purchase`],
      ['Maintenance (HOA)', PRICING.hoaFeeLabelEn],
      ['Building rules', `${PRICING.cosPercent}% max lot coverage · ${PRICING.cusPercent}% CUS · 2 levels + roof deck`],
    ],
    whatTitle: 'What exactly are you buying?',
    whatBody: [
      `A titled residential lot inside a gated enclave on Tulum’s Ruta de los Cenotes. Of your lot, ${PRICING.cosPercent}% is buildable; the rest remains your own private jungle. The rules bind every neighbor, so the low density you buy today cannot be built away tomorrow. Foreign buyers own securely through a bank trust (fideicomiso) — the standard, fully legal structure for coastal Mexico.`,
      `Infrastructure includes sustainable energy, an underground water network, 24/7 security, internet in common areas and the project’s internal roads. The nine cenotes and 12+ experiences — Casa de los Cenotes clubhouse, Jungle Bar, wellness center, padel — are for resident use from the day you buy.`,
    ],
    stepsTitle: 'How to buy, in four steps',
    steps: [
      ['Choose your lot', 'On site or by video call over the interactive masterplan, with an advisor.'],
      ['Sign and reserve', 'Purchase agreement before a notary and the initial down payment.'],
      ['Pay at your pace', `Monthly payments over ${PRICING.paymentPlanMonths} months at 0% interest.`],
      ['Close', 'Before a Mexican notary; foreign buyers add the bank trust (fideicomiso).'],
    ],
    linksTitle: 'Before you decide, review',
    links: [
      ['/en/cenotes', 'The project’s 9 cenotes'],
      ['/en/tulum-property-appreciation-data', 'Documented appreciation: $119 to $167 USD/m²'],
      ['/en/pre-construction-lots-tulum', 'How pre-construction and the payment plan work'],
      ['/en/legal-compliance', 'Permits verified by SEDETUS'],
      ['/en/faq', 'Frequently asked questions'],
    ],
    imgAlt: 'Entrance to Suspiro, the active enclave at Selvadentro Tulum',
  },
} as const;

export default function LotsPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} />

      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-6">{c.tableTitle}</h2>
            <div className="table-shell lg:-mx-24 xl:-mx-32">
              <table className="table-premium text-sm sm:text-base">
                <tbody>
                  {c.rows.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row" className="font-medium text-brand-verde-osc sm:whitespace-nowrap align-top">
                        {k}
                      </th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-brand-gris mt-3">{c.tableNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="h2-section mb-5">{c.whatTitle}</h2>
            {c.whatBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <img
              src="/suspiro-entrance.webp"
              alt={c.imgAlt}
              width={1600}
              height={900}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.stepsTitle}</h2>
          </Reveal>
          <ol className="grid sm:grid-cols-2 gap-5">
            {c.steps.map(([title, body], i) => (
              <Reveal key={title} delay={i * 80}>
                <li className="card-premium p-6 h-full">
                  <span className="eyebrow">{lang === 'es' ? 'Paso' : 'Step'} {i + 1}</span>
                  <h3 className="text-xl mt-2 mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">{body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-brand-verde-osc text-brand-crema">
        <div className="max-w-4xl mx-auto">
          <h2 className="h2-section mb-6 text-brand-crema">{c.linksTitle}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {c.links.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="underline underline-offset-4 decoration-brand-oro/70 hover:text-brand-oro transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
