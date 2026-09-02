import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * Annual report page — /mercado-inmobiliario-tulum-2026 ↔
 * /en/tulum-real-estate-market-2026. Target queries: "mercado inmobiliario
 * tulum", "tulum real estate market 2026". Refreshed yearly: new slug +
 * 301 from the old one. Every stat dated; first-party data disclosed.
 */

const copy = {
  es: {
    eyebrow: 'Reporte anual',
    lede: 'El mercado de tierra en Tulum entra a 2026 con la infraestructura ya operando — aeropuerto y Tren Maya desde diciembre de 2023 —, una autoridad que depura activamente la oferta irregular, y precios que siguen premiando la escasez regulada. Este es el estado del mercado en cinco secciones, con cada dato fechado.',
    sections: [
      {
        title: '1. Demanda: quién está comprando y por qué ahora',
        body: [
          'La demanda de tierra en Tulum llega por tres vías. Compradores estadounidenses y canadienses que ya no dependen de Cancún: el Aeropuerto Internacional de Tulum (Felipe Carrillo Puerto) opera desde el 1 de diciembre de 2023 con rutas internacionales directas. Compradores nacionales que buscan patrimonio en la Riviera Maya con escrituración directa. Y un tercer perfil creciente: quien trabaja a distancia y decide que su base sea la selva, no la ciudad.',
          'El patrón común de 2026: el comprador llega más informado, pregunta por permisos antes que por amenidades, y compara desarrollos por documentación — no solo por renders.',
        ],
      },
      {
        title: '2. Oferta: la depuración de SEDETUS cambió el tablero',
        body: [
          'En septiembre de 2025, SEDETUS publicó una alerta con 26 desarrollos en Tulum señalados por presuntamente operar sin permisos; su boletín actualizado del 16 de septiembre de 2025 retiró a 14 que acreditaron cumplimiento total — Selvadentro entre ellos. El efecto de mercado es profundo: la oferta "en regla" es más chica de lo que parece en los portales, y la autoridad demostró que publica tanto señalamientos como aclaraciones.',
          'Para el comprador, eso convierte la verificación documental en el primer filtro del mercado — y encarece, con razón, los proyectos que la superan.',
        ],
      },
      {
        title: '3. Precios: los puntos de referencia documentados',
        body: [
          'Los promedios de portal mezclan zonas y productos incomparables, así que este reporte usa un punto de referencia transparente y de primera mano: la serie de precios de Selvadentro, en la ruta de los cenotes (lado selva). La serie completa está abajo; la proyección de cierre es una proyección del desarrollador, no una garantía.',
        ],
      },
      {
        title: '4. Qué cambió frente a 2025',
        body: [
          'Tres cosas. El aeropuerto pasó de novedad a rutina operativa, normalizando el acceso internacional directo. El Tren Maya dejó de ser promesa y se volvió referencia de tiempos reales — la estación queda a 8 minutos de Selvadentro. Y la revisión de SEDETUS de septiembre de 2025 estableció un precedente público de depuración que en 2026 sigue filtrando la oferta.',
          'El Libramiento Playa-Cobá continúa en construcción: es el catalizador pendiente de la zona selva.',
        ],
      },
      {
        title: '5. Perspectiva 2026: honesta, no promocional',
        body: [
          'A favor: infraestructura operando, oferta regulada más escasa, y una marca turística global que sostiene la demanda de renta. En contra o por vigilar: los ciclos turísticos, la sobreoferta en el segmento de departamentos (distinto al de tierra), los titulares de sargazo en temporada, y el entorno de tasas que afecta al comprador financiado.',
          'Nuestra lectura de primera mano: la tierra regulada en zonas de baja densidad se comporta distinto al condominio genérico — la restricción es el producto, y la restricción no se puede sobreproducir.',
        ],
      },
    ],
    tableTitle: 'Serie de precios documentada (Selvadentro, lado selva)',
    tableHead: ['Fecha', 'Precio por m²', 'Nota'],
    tableRows: [
      ['Mayo 2025', `$${PRICING.launchPricePerM2USD} USD`, 'Lanzamiento de Suspiro'],
      ['Septiembre 2026', `$${PRICING.pricePerM2USD} USD`, '+40% en 12 meses · precio vigente'],
      ['Cierre del proyecto', `$${PRICING.projectedClosePerM2USD} USD`, 'Proyección del desarrollador — no es garantía'],
    ],
    tableNote:
      'Datos de primera mano, revelados como tales. Lotes desde $68,000 USD (400–1,673 m²), plan a 48 meses sin intereses, entrega 2029.',
    linksTitle: 'Profundiza en el mercado',
    links: [
      ['/plusvalia-en-tulum', 'Plusvalía en Tulum: la serie completa y sus motores'],
      ['/es-seguro-invertir-en-tulum', 'Cómo comprar sin riesgo: due diligence'],
      ['/legalidad-y-permisos', 'La documentación de Selvadentro, verificable'],
      ['/lotes-en-venta-tulum', 'Lotes disponibles y precios vigentes'],
      ['/blog/invertir-en-tulum-plusvalia', '¿Conviene invertir en Tulum en 2026?'],
    ],
    updatedLine: 'Datos actualizados: septiembre 2026 · próxima edición: 2027',
  },
  en: {
    eyebrow: 'Annual report',
    lede: 'Tulum’s land market enters 2026 with its infrastructure already operating — the airport and the Maya Train since December 2023 —, an authority actively filtering irregular supply, and prices that keep rewarding regulated scarcity. This is the state of the market in five sections, every figure dated.',
    sections: [
      {
        title: '1. Demand: who is buying, and why now',
        body: [
          'Demand for Tulum land arrives through three doors. US and Canadian buyers who no longer route through Cancún: Tulum International Airport (Felipe Carrillo Puerto) has operated direct international routes since December 1, 2023. Mexican buyers building patrimony on the Riviera Maya with direct titling. And a growing third profile: remote workers deciding their base should be jungle, not city.',
          'The common 2026 pattern: buyers arrive better informed, ask about permits before amenities, and compare developments by documentation — not just renders.',
        ],
      },
      {
        title: '2. Supply: the SEDETUS clean-up changed the board',
        body: [
          'In September 2025, SEDETUS published an alert listing 26 Tulum developments flagged for allegedly operating without permits; its updated bulletin of September 16, 2025 removed 14 that proved full compliance — Selvadentro among them. The market effect runs deep: compliant supply is smaller than listing portals suggest, and the authority proved it publishes both the flags and the clearances.',
          'For buyers, that makes document verification the market’s first filter — and it rightly makes the projects that pass it more valuable.',
        ],
      },
      {
        title: '3. Prices: the documented reference points',
        body: [
          'Portal averages blend incomparable zones and products, so this report uses a transparent, first-party reference point: Selvadentro’s price series on the cenote route (jungle side). The full series is below; the closing figure is a developer projection, not a guarantee.',
        ],
      },
      {
        title: '4. What changed versus 2025',
        body: [
          'Three things. The airport went from novelty to operating routine, normalizing direct international access. The Maya Train stopped being a promise and became a real-timetable reference — the station sits 8 minutes from Selvadentro. And the September 2025 SEDETUS review set a public precedent of supply filtering that keeps working through 2026.',
          'The Playa-Cobá bypass remains under construction — the jungle side’s pending catalyst.',
        ],
      },
      {
        title: '5. The 2026 outlook — honest, not promotional',
        body: [
          'In favor: operating infrastructure, scarcer regulated supply, and a global tourism brand sustaining rental demand. Against, or worth watching: tourism cycles, oversupply in the condo segment (a different market from land), seasonal sargassum headlines, and the rate environment for financed buyers.',
          'Our first-party read: regulated land in low-density zones behaves differently from the generic condo — the restriction is the product, and restrictions cannot be overbuilt.',
        ],
      },
    ],
    tableTitle: 'Documented price series (Selvadentro, jungle side)',
    tableHead: ['Date', 'Price per m²', 'Note'],
    tableRows: [
      ['May 2025', `$${PRICING.launchPricePerM2USD} USD`, 'Suspiro launch'],
      ['September 2026', `$${PRICING.pricePerM2USD} USD`, '+40% in 12 months · current price'],
      ['Project close', `$${PRICING.projectedClosePerM2USD} USD`, 'Developer projection — not a guarantee'],
    ],
    tableNote:
      'First-party data, disclosed as such. Lots from $68,000 USD (400–1,673 m²), 48-month interest-free plan, delivery 2029.',
    linksTitle: 'Go deeper on the market',
    links: [
      ['/en/tulum-property-appreciation-data', 'Tulum appreciation: the full series and its drivers'],
      ['/en/is-it-safe-to-buy-property-in-tulum', 'How to buy without risk: due diligence'],
      ['/en/legal-compliance', 'Selvadentro’s documentation, verifiable'],
      ['/en/tulum-land-for-sale', 'Available lots and current pricing'],
      ['/en/blog/tulum-real-estate-investment-2026', 'Is Tulum still a good investment in 2026?'],
    ],
    updatedLine: 'Data updated: September 2026 · next edition: 2027',
  },
} as const;

export default function MarketPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage}>
        <p className="mt-6 text-sm tracking-wide text-brand-crema/60">{c.updatedLine}</p>
      </PageHero>

      {/* One continuous report rather than six tinted bands: numbered
          parts on a single reading measure, separated by hairlines. Short
          sections in their own full-height sections read as empty stripes. */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          {c.sections.map((section, i) => (
            <Reveal key={section.title}>
              <div
                className={
                  i > 0 ? 'mt-14 pt-14 border-t border-brand-verde/15' : ''
                }
              >
                <h2 className="h2-section mb-5">{section.title}</h2>
                {section.body.map((p) => (
                  <p key={p.slice(0, 24)} className="leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {i === 2 && (
                  <div className="mt-9">
                    <h3 className="font-serif text-xl sm:text-2xl text-brand-verde-osc mb-4">
                      {c.tableTitle}
                    </h3>
                    {/* The series needs more width than the measure: let it
                        bleed past the column on wide screens. */}
                    <div className="table-shell lg:-mx-24 xl:-mx-32">
                      <table className="table-premium text-sm sm:text-base">
                        <thead>
                          <tr>
                            {c.tableHead.map((h) => (
                              <th key={h} scope="col">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {c.tableRows.map(([date, price, note]) => (
                            <tr key={date}>
                              <th scope="row" className="font-medium text-brand-verde-osc sm:whitespace-nowrap align-top">
                                {date}
                              </th>
                              <td className="sm:whitespace-nowrap">{price}</td>
                              <td>{note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-brand-gris mt-3">{c.tableNote}</p>
                    {/* TODO(owner): add 2-3 third-party market datapoints (e.g.
                        Lamudi/Properstar averages) with links when available. */}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
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
