import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /inversion ↔ /en/investment — the full investment thesis in numbers.
 * Target queries: "invertir en selvadentro", "inversión terrenos tulum" /
 * "selvadentro investment", "invest in tulum land".
 * Deeper than the homepage InvestmentSection: price series, scarcity,
 * dated catalysts, payment-plan mechanics, protections, full cost table.
 * Pricing figures import from PRICING (src/seo/site.ts) — never hardcoded.
 */

const fmt = (n: number) => n.toLocaleString('en-US');

const copy = {
  es: {
    eyebrow: 'Inversión',
    lede: `En mayo de 2025, el m² en Selvadentro costaba $${PRICING.launchPricePerM2USD} USD. Hoy cuesta $${PRICING.pricePerM2USD} — +40% en doce meses — y el desarrollador proyecta cerrar el proyecto en $${PRICING.projectedClosePerM2USD} USD/m². Lotes desde $${fmt(PRICING.lotPriceFromUSD)} USD, con plan a ${PRICING.paymentPlanMonths} meses sin intereses, directo con el desarrollador.`,
    seriesTitle: 'La serie de precios, documentada',
    seriesHead: ['Momento', 'Precio por m²', 'Nota'],
    seriesRows: [
      [`Lanzamiento · ${PRICING.launchDateLabelEs}`, `$${PRICING.launchPricePerM2USD} USD`, 'Precio de salida de Selvadentro'],
      ['Hoy · septiembre 2026', `$${PRICING.pricePerM2USD} USD`, '+40% en 12 meses'],
      ['Cierre del proyecto', `$${PRICING.projectedClosePerM2USD} USD`, 'Proyección del desarrollador — no una garantía'],
    ],
    seriesNote:
      'Actualizado: septiembre 2026. La proyección de cierre es del desarrollador y depende del ritmo de ventas y de obra; la serie histórica ($119 → $167) sí es precio de lista documentado.',
    scarcityTitle: '¿Por qué sube? La escasez es geografía',
    scarcityBody: [
      'Selvadentro es el único desarrollo residencial privado sobre la Ruta de los Cenotes de Tulum. Alrededor no hay competencia construyéndose: hay reservas naturales y atracciones. Del lado selva de Tulum, la oferta comparable no puede crecer — y dentro del proyecto, dos de las tres privadas (Mirador y Refugio) ya se vendieron por completo. Queda Suspiro.',
      `A la escasez externa se suma la interna: los lotes van de ${PRICING.lotSizeMinM2} a ${fmt(PRICING.lotSizeMaxM2)} m² y la normativa impide densificar. Cada aumento de precio ha ocurrido sin que exista un producto vecino que lo presione a la baja.`,
    ],
    aerialAlt: 'Vista aérea de la selva de Selvadentro Tulum, rodeada de reservas naturales',
    catalystsTitle: 'Los catalizadores de infraestructura, con fechas',
    catalystsHead: ['Catalizador', 'Estado', 'Qué significa para el proyecto'],
    catalystsRows: [
      ['Tren Maya', 'Servicio de pasajeros desde diciembre de 2023', 'La estación Tulum queda a 8 minutos del proyecto'],
      ['Aeropuerto Internacional de Tulum (Felipe Carrillo Puerto)', 'Inaugurado el 1 de diciembre de 2023', 'Llegadas internacionales a 35 minutos'],
      ['Libramiento Playa-Cobá', 'En construcción, cerca del proyecto', 'Nuevo eje vial que descongestiona el acceso por la costa'],
    ],
    catalystsNote:
      'La tierra suele revalorizarse cuando la infraestructura llega después de la compra. Aquí, dos de los tres catalizadores ya operan.',
    planTitle: 'Cómo funciona el plan a 48 meses',
    planSteps: [
      ['Elige y aparta', 'Seleccionas tu lote en sitio o por videollamada sobre el masterplan, y lo apartas con la promesa de compraventa ante notario y un enganche inicial.'],
      ['Paga sin intereses', `El saldo se divide en mensualidades a ${PRICING.paymentPlanMonths} meses sin intereses, directo con el desarrollador — sin crédito bancario de por medio.`],
      ['Usa desde el día uno', `El acceso a los nueve cenotes y a las amenidades comienza con tu compra; la entrega de Suspiro terminado está programada para ${PRICING.deliveryYear}.`],
      ['Escritura', 'La operación cierra ante notario público. Si eres comprador extranjero, se suma el fideicomiso bancario — la figura estándar y legal para la zona costera de México.'],
    ],
    protectTitle: '¿Qué protege la inversión?',
    protectBody: [
      `La normativa de construcción es el candado: COS del ${PRICING.cosPercent}% (ocupación máxima del lote), CUS del ${PRICING.cusPercent}% y máximo dos niveles más roof deck. Aplica a todos los propietarios por igual, de modo que la baja densidad que hoy sostiene el valor no puede construirse en tu contra mañana. El ${PRICING.jungleSharePercent}% de la selva del proyecto permanece intacto por diseño.`,
      `El mantenimiento de largo plazo también está resuelto: una cuota de ${PRICING.hoaFeeLabelEs} más un fondo de reserva en fideicomiso. Y en septiembre de 2025, Selvadentro acreditó ante SEDETUS Quintana Roo el cumplimiento total de sus permisos — el detalle completo está en la página de legalidad y permisos.`,
    ],
    costsTitle: 'Los costos completos, sin sorpresas',
    costsHead: ['Concepto', 'Monto', 'Cuándo'],
    costsRows: [
      ['Precio del lote', `Desde $${fmt(PRICING.lotPriceFromUSD)} USD`, `Enganche + ${PRICING.paymentPlanMonths} mensualidades sin intereses`],
      ['Gastos de cierre (típico en la Riviera Maya)', '6–8% del precio', 'Al escriturar: ISABI, registro y notaría'],
      ['Fideicomiso (solo extranjeros)', 'Constitución aparte + anualidad bancaria típica de $500–700 USD', 'Al escriturar y cada año'],
      ['Mantenimiento', `${PRICING.hoaFeeLabelEs} + fondo de reserva`, 'Mensual, desde la entrega'],
    ],
    costsNote:
      'Los gastos de cierre y la anualidad del fideicomiso son rangos típicos del mercado en la Riviera Maya; tu notario confirma las cifras exactas de tu operación.',
    ctaTitle: 'Profundiza en los datos',
    ctaLinks: [
      ['/plusvalia-en-tulum', 'Plusvalía en Tulum: la serie completa'],
      ['/preventa-de-terrenos-en-tulum', 'La preventa y el plan de pagos, explicados'],
      ['/mercado-inmobiliario-tulum-2026', 'El mercado inmobiliario de Tulum en 2026'],
      ['/legalidad-y-permisos', 'Legalidad y permisos verificados por SEDETUS'],
      ['/lotes-en-venta-tulum', 'Lotes disponibles en Suspiro'],
    ],
  },
  en: {
    eyebrow: 'Investment',
    lede: `In May 2025, a square meter at Selvadentro cost $${PRICING.launchPricePerM2USD} USD. Today it costs $${PRICING.pricePerM2USD} — up 40% in twelve months — and the developer projects $${PRICING.projectedClosePerM2USD} USD/m² at project close. Lots start at $${fmt(PRICING.lotPriceFromUSD)} USD, on a ${PRICING.paymentPlanMonths}-month interest-free plan, directly with the developer.`,
    seriesTitle: 'The price series, documented',
    seriesHead: ['Point in time', 'Price per m²', 'Note'],
    seriesRows: [
      [`Launch · ${PRICING.launchDateLabelEn}`, `$${PRICING.launchPricePerM2USD} USD`, 'Selvadentro’s opening price'],
      ['Today · September 2026', `$${PRICING.pricePerM2USD} USD`, '+40% in 12 months'],
      ['Project close', `$${PRICING.projectedClosePerM2USD} USD`, 'Developer projection — not a guarantee'],
    ],
    seriesNote:
      'Updated: September 2026. The closing figure is the developer’s projection and depends on sales pace and construction; the historical series ($119 → $167) is documented list pricing.',
    scarcityTitle: 'Why does it rise? Scarcity is geography',
    scarcityBody: [
      'Selvadentro is the only private residential development on Tulum’s Ruta de los Cenotes. Nothing comparable is being built around it: the neighbors are nature reserves and attractions. On the jungle side of Tulum, comparable supply cannot grow — and inside the project, two of the three enclaves (Mirador and Refugio) are already fully sold. Suspiro is what remains.',
      `External scarcity is compounded by internal scarcity: lots run ${PRICING.lotSizeMinM2} to ${fmt(PRICING.lotSizeMaxM2)} m² and the building rules prevent densification. Every price increase so far has happened with no neighboring product to undercut it.`,
    ],
    aerialAlt: 'Aerial view of the Selvadentro Tulum jungle, surrounded by nature reserves',
    catalystsTitle: 'The infrastructure catalysts, with dates',
    catalystsHead: ['Catalyst', 'Status', 'What it means for the project'],
    catalystsRows: [
      ['Maya Train', 'Passenger service since December 2023', 'The Tulum station is 8 minutes from the project'],
      ['Tulum International Airport (Felipe Carrillo Puerto)', 'Opened December 1, 2023', 'International arrivals 35 minutes away'],
      ['Playa-Cobá bypass', 'Under construction nearby', 'A new road corridor relieving the coastal highway'],
    ],
    catalystsNote:
      'Land tends to appreciate when infrastructure arrives after you buy. Here, two of the three catalysts are already operating.',
    planTitle: 'How the 48-month plan works',
    planSteps: [
      ['Choose and reserve', 'Pick your lot on site or by video call over the masterplan, then reserve it with a purchase agreement before a notary and an initial down payment.'],
      ['Pay with no interest', `The balance splits into monthly payments over ${PRICING.paymentPlanMonths} months at 0% interest, directly with the developer — no bank financing involved.`],
      ['Use it from day one', `Access to the nine cenotes and the amenities starts with your purchase; delivery of the finished Suspiro is scheduled for ${PRICING.deliveryYear}.`],
      ['Close', 'The deal closes before a Mexican notary. Foreign buyers add the bank trust (fideicomiso) — the standard, fully legal structure for coastal Mexico.'],
    ],
    protectTitle: 'What protects the investment?',
    protectBody: [
      `The building code is the lock: ${PRICING.cosPercent}% COS (max lot coverage), ${PRICING.cusPercent}% CUS, and a cap of two levels plus roof deck. It binds every owner equally, so the low density that supports today’s value cannot be built away against you tomorrow. ${PRICING.jungleSharePercent}% of the project’s jungle stays untouched by design.`,
      `Long-term maintenance is also structured: a fee of ${PRICING.hoaFeeLabelEn} plus a trust reserve. And in September 2025, Selvadentro proved full permit compliance to SEDETUS Quintana Roo — the full record is on the legal compliance page.`,
    ],
    costsTitle: 'The complete costs, no surprises',
    costsHead: ['Item', 'Amount', 'When'],
    costsRows: [
      ['Lot price', `From $${fmt(PRICING.lotPriceFromUSD)} USD`, `Down payment + ${PRICING.paymentPlanMonths} interest-free installments`],
      ['Closing costs (typical for the Riviera Maya)', '6–8% of the price', 'At titling: acquisition tax (ISABI), registry and notary'],
      ['Fideicomiso (foreign buyers only)', 'Setup billed separately + a typical $500–700 USD yearly bank fee', 'At titling, then annually'],
      ['Maintenance (HOA)', `${PRICING.hoaFeeLabelEn} + trust reserve`, 'Monthly, from delivery'],
    ],
    costsNote:
      'Closing costs and the trust’s bank fee are typical market ranges for the Riviera Maya; your notary confirms the exact figures for your purchase.',
    ctaTitle: 'Go deeper into the data',
    ctaLinks: [
      ['/en/tulum-property-appreciation-data', 'Tulum appreciation: the full series'],
      ['/en/pre-construction-lots-tulum', 'Pre-construction and the payment plan, explained'],
      ['/en/tulum-real-estate-market-2026', 'The Tulum real estate market in 2026'],
      ['/en/legal-compliance', 'Legal status verified by SEDETUS'],
      ['/en/tulum-land-for-sale', 'Available lots in Suspiro'],
    ],
  },
} as const;

function DataTable({
  head,
  rows,
  note,
}: {
  head: readonly string[];
  rows: readonly (readonly string[])[];
  note: string;
}) {
  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-brand-verde/15 bg-white/60">
        <table className="w-full text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b border-brand-verde/15">
              {head.map((h) => (
                <th key={h} scope="col" className="py-3.5 px-4 sm:px-6 font-medium text-brand-verde-osc">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-brand-verde/10 last:border-0">
                <th scope="row" className="py-3.5 px-4 sm:px-6 font-medium text-brand-verde-osc align-top">
                  {r[0]}
                </th>
                {r.slice(1).map((cell) => (
                  <td key={cell} className="py-3.5 px-4 sm:px-6 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-brand-gris mt-3">{note}</p>
    </>
  );
}

export default function InvestmentPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} />

      {/* 1. Price series */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-6">{c.seriesTitle}</h2>
            <DataTable head={c.seriesHead} rows={c.seriesRows} note={c.seriesNote} />
          </Reveal>
        </div>
      </section>

      {/* 2. Scarcity */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-5">{c.scarcityTitle}</h2>
            {c.scarcityBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <img
              src="/render-aerial.webp"
              alt={c.aerialAlt}
              width={1600}
              height={1200}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* 3. Catalysts */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-6">{c.catalystsTitle}</h2>
            <DataTable head={c.catalystsHead} rows={c.catalystsRows} note={c.catalystsNote} />
          </Reveal>
        </div>
      </section>

      {/* 4. Payment plan mechanics */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-8">{c.planTitle}</h2>
          </Reveal>
          <ol className="grid sm:grid-cols-2 gap-5">
            {c.planSteps.map(([title, body], i) => (
              <Reveal key={title} delay={i * 80}>
                <li className="bg-white/70 border border-brand-verde/10 rounded-2xl p-6 h-full">
                  <span className="eyebrow">{lang === 'es' ? 'Paso' : 'Step'} {i + 1}</span>
                  <h3 className="text-xl mt-2 mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">{body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Protections */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-5">{c.protectTitle}</h2>
            {c.protectBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 6. Full cost table */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-6">{c.costsTitle}</h2>
            <DataTable head={c.costsHead} rows={c.costsRows} note={c.costsNote} />
          </Reveal>
        </div>
      </section>

      {/* Keep exploring */}
      <section className="section bg-brand-verde-osc text-brand-crema">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6 text-brand-crema">{c.ctaTitle}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {c.ctaLinks.map(([href, label]) => (
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
