import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * The data page — /plusvalia-en-tulum ↔ /en/tulum-property-appreciation-data
 * Target queries: "plusvalía en tulum", "plusvalía tulum 2026" /
 * "tulum property appreciation", "tulum real estate appreciation data".
 * Centerpiece: the documented Selvadentro price series ($119 → $167 →
 * $280–360 projected), always labeled as first-party developer data.
 * Refreshed quarterly — keep the "Datos actualizados / Data updated"
 * line current on every revision.
 */

const copy = {
  es: {
    eyebrow: 'Los datos',
    updatedLine: 'Datos actualizados: septiembre de 2026 · Esta página se revisa cada trimestre.',
    lede: `En Tulum la plusvalía se promete mucho y se documenta poco. Esta página publica una serie verificable: en Selvadentro, el metro cuadrado pasó de $${PRICING.launchPricePerM2USD} USD en mayo de 2025 a $${PRICING.pricePerM2USD} USD hoy — +40% en doce meses — con proyección del desarrollador de $${PRICING.projectedClosePerM2USD} USD/m² al cierre.`,
    tableTitle: 'La serie de precios, documentada',
    tableHead: ['Momento', 'Fecha', 'Precio por m²', 'Qué es'],
    tableRows: [
      ['Lanzamiento', 'Mayo 2025', `$${PRICING.launchPricePerM2USD} USD`, 'Precio de lista del desarrollador'],
      ['Hoy', 'Septiembre 2026', `$${PRICING.pricePerM2USD} USD`, 'Precio de lista vigente · +40% en 12 meses'],
      ['Cierre del proyecto', 'Proyección', `$${PRICING.projectedClosePerM2USD} USD`, 'Proyección del desarrollador — escenario, no garantía'],
    ],
    tableNote:
      'Transparencia: esta es la serie de precios de un solo desarrollo — el nuestro —, no una estadística de todo el mercado de Tulum. La publicamos porque cada cifra tiene fecha y puede cotejarse contra listas de precios reales.',
    whyPara:
      'No existe un índice público de precios de tierra en Tulum ampliamente aceptado. Por eso los "promedios de mercado" que circulan rara vez traen fecha o fuente. Nuestra respuesta es publicar el dato que sí podemos firmar y decirte exactamente qué es: precios de lista de Selvadentro, en la Ruta de los Cenotes.',
    driversTitle: '¿Qué está impulsando la plusvalía en Tulum?',
    drivers: [
      {
        title: 'Infraestructura con fechas',
        body: 'El Tren Maya opera servicio de pasajeros desde diciembre de 2023. El Aeropuerto Internacional de Tulum abrió el 1 de diciembre de 2023. El Libramiento Playa-Cobá está en construcción. No son promesas de folleto: dos de las tres ya operan.',
      },
      {
        title: 'Oferta filtrada por ley',
        body: 'SEDETUS vigila activamente la oferta irregular: en septiembre de 2025 alertó sobre 26 desarrollos en Tulum y, tras revisión, su boletín actualizado del 16 de septiembre retiró a los 14 que acreditaron cumplimiento. Menos oferta informal significa más valor para la tierra en regla.',
        link: ['/es-seguro-invertir-en-tulum', 'Cómo verificar cualquier desarrollo →'],
      },
      {
        title: 'Escasez en la Ruta de los Cenotes',
        body: 'Del lado selva de Tulum, la tierra desarrollable está acotada por reservas naturales y cenotes protegidos. Esa escasez no es marketing: es geografía.',
      },
    ],
    driversImgAlt: 'Mapa de rutas de acceso a la Ruta de los Cenotes: Tren Maya, Aeropuerto de Tulum y Libramiento Playa-Cobá',
    brakesTitle: '¿Qué podría frenar la plusvalía? La parte que casi nadie escribe.',
    brakes: [
      ['Los ciclos turísticos', 'Tulum depende del turismo, y el turismo respira: años fuertes y años flojos. La tierra los atraviesa mejor que la renta vacacional, pero los atraviesa.'],
      ['Los titulares de sargazo', 'El sargazo no toca la selva ni los cenotes, pero sí la percepción del destino en las temporadas malas — y la percepción mueve demanda.'],
      ['El entorno de tasas', 'Cuando el dinero cuesta más, la segunda residencia se enfría en todo el mundo. Tulum no es la excepción.'],
    ],
    brakesNote:
      'Ninguno de estos factores se puede proyectar con seriedad en cifras. Los nombramos porque una página de plusvalía que no los nombra te está vendiendo, no informando.',
    guideTitle: 'Cómo leer una proyección de desarrollador, en 6 pasos',
    guide: [
      ['Pide la serie, no la promesa', 'Una proyección seria viene acompañada de precios pasados con fecha. Sin serie histórica, es solo un número atractivo.'],
      ['Distingue lista de reventa', 'Los precios de lista documentan cuánto sube lo que el desarrollador vende; el mercado de reventa es otra pregunta. No extrapoles sin confirmarlo.'],
      ['Busca el mecanismo', 'Un precio proyectado necesita una causa: fases que se agotan, infraestructura que abre, normativa que limita la oferta. "Tulum está de moda" no es un mecanismo.'],
      ['Verifica permisos primero', 'La plusvalía de un desarrollo irregular es cero. Consulta los boletines de SEDETUS y el Registro Público antes de hablar de rendimientos.'],
      ['Compara por m², no por lote', 'Los lotes cambian de tamaño; el metro cuadrado no. Toda comparación seria se hace en USD/m² y con fecha.'],
      [`Trátala como escenario`, `Nuestra proyección de $${PRICING.projectedClosePerM2USD} USD/m² al cierre es eso: el escenario del desarrollador, no una garantía. Exige el mismo trato a cualquier otro proyecto.`],
    ],
    linksTitle: 'Sigue explorando',
    links: [
      ['/lotes-en-venta-tulum', 'Lotes en venta: precios y condiciones hoy'],
      ['/inversion', 'La inversión en Selvadentro, en números'],
      ['/preventa-de-terrenos-en-tulum', 'Cómo funciona la preventa y el plan a 48 meses'],
      ['/es-seguro-invertir-en-tulum', '¿Es seguro invertir en Tulum? Due diligence'],
      ['/mercado-inmobiliario-tulum-2026', 'El reporte 2026 del mercado de Tulum'],
    ],
  },
  en: {
    eyebrow: 'The data',
    updatedLine: 'Data updated: September 2026 · This page is reviewed quarterly.',
    lede: `Tulum appreciation gets promised a lot and documented rarely. This page publishes a verifiable series: at Selvadentro, a square meter went from $${PRICING.launchPricePerM2USD} USD in May 2025 to $${PRICING.pricePerM2USD} USD today — up 40% in twelve months — with a developer projection of $${PRICING.projectedClosePerM2USD} USD/m² at project close.`,
    tableTitle: 'The price series, documented',
    tableHead: ['Milestone', 'Date', 'Price per m²', 'What it is'],
    tableRows: [
      ['Launch', 'May 2025', `$${PRICING.launchPricePerM2USD} USD`, 'Developer list price'],
      ['Today', 'September 2026', `$${PRICING.pricePerM2USD} USD`, 'Current list price · +40% in 12 months'],
      ['Project close', 'Projection', `$${PRICING.projectedClosePerM2USD} USD`, 'Developer projection — a scenario, not a guarantee'],
    ],
    tableNote:
      'Transparency: this is the price series of a single development — ours — not a market-wide statistic for Tulum. We publish it because every figure carries a date and can be checked against real price lists.',
    whyPara:
      'There is no widely accepted public index for land prices in Tulum, which is why the "market averages" in circulation rarely come with a date or a source. Our answer is to publish the number we can actually stand behind and tell you exactly what it is: Selvadentro list prices, on the Ruta de los Cenotes.',
    driversTitle: 'What is driving appreciation in Tulum?',
    drivers: [
      {
        title: 'Infrastructure with dates',
        body: 'The Maya Train has run passenger service since December 2023. Tulum International Airport opened December 1, 2023. The Playa-Cobá bypass is under construction. These are not brochure promises: two of the three are already operating.',
      },
      {
        title: 'Supply filtered by law',
        body: 'SEDETUS actively polices irregular supply: in September 2025 it flagged 26 Tulum developments, and its updated September 16 bulletin cleared the 14 that proved compliance after review. Less informal supply means more value for land that is fully permitted.',
        link: ['/en/is-it-safe-to-buy-property-in-tulum', 'How to verify any development →'],
      },
      {
        title: 'Scarcity on the cenote route',
        body: 'On Tulum’s jungle side, developable land is hemmed in by natural reserves and protected cenotes. That scarcity is not marketing. It is geography.',
      },
    ],
    driversImgAlt: 'Access-routes map for the Ruta de los Cenotes: Maya Train, Tulum airport and the Playa-Cobá bypass',
    brakesTitle: 'What could slow appreciation down? The part almost nobody writes.',
    brakes: [
      ['Tourism cycles', 'Tulum runs on tourism, and tourism breathes: strong years and soft years. Land rides those cycles better than vacation rentals do — but it still rides them.'],
      ['Sargassum headlines', 'Sargassum never touches the jungle or the cenotes, but it does touch the destination’s image in bad seasons — and image moves demand.'],
      ['The rate environment', 'When money costs more, second-home markets cool everywhere. Tulum is not the exception.'],
    ],
    brakesNote:
      'None of these factors can be seriously projected in numbers. We name them because an appreciation page that doesn’t is selling to you, not informing you.',
    guideTitle: 'How to read a developer projection, in 6 steps',
    guide: [
      ['Ask for the series, not the promise', 'A serious projection comes with dated past prices. Without a historical series, it is just an attractive number.'],
      ['Separate list prices from resale', 'List prices document how fast the developer’s own inventory reprices; the resale market is a different question. Don’t extrapolate without checking.'],
      ['Look for the mechanism', 'A projected price needs a cause: phases selling out, infrastructure opening, rules that cap supply. "Tulum is trending" is not a mechanism.'],
      ['Verify permits first', 'The appreciation of an unpermitted development is zero. Check SEDETUS bulletins and the Public Registry before anyone talks returns.'],
      ['Compare per m², not per lot', 'Lots vary in size; the square meter doesn’t. Every serious comparison is in USD/m², with a date attached.'],
      [`Treat it as a scenario`, `Our $${PRICING.projectedClosePerM2USD} USD/m² close projection is exactly that: the developer’s scenario, not a guarantee. Demand the same honesty from any other project.`],
    ],
    linksTitle: 'Keep exploring',
    links: [
      ['/en/tulum-land-for-sale', 'Lots for sale: today’s pricing and terms'],
      ['/en/investment', 'The Selvadentro investment, in numbers'],
      ['/en/pre-construction-lots-tulum', 'How pre-construction and the 48-month plan work'],
      ['/en/is-it-safe-to-buy-property-in-tulum', 'Is it safe to buy in Tulum? Due diligence'],
      ['/en/tulum-real-estate-market-2026', 'The 2026 Tulum market report'],
    ],
  },
} as const;

export default function PlusvaliaPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} lang={lang}>
        <p className="text-sm text-brand-crema/60 mt-5">{c.updatedLine}</p>
      </PageHero>

      {/* The documented price series */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-6">{c.tableTitle}</h2>
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
                  {c.tableRows.map(([k, date, price, what]) => (
                    <tr key={k}>
                      <th scope="row" className="font-medium text-brand-verde-osc sm:whitespace-nowrap align-top">
                        {k}
                      </th>
                      <td className="sm:whitespace-nowrap align-top">{date}</td>
                      <td className="sm:whitespace-nowrap align-top">{price}</td>
                      <td>{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-brand-gris mt-3">{c.tableNote}</p>
            <p className="leading-relaxed mt-6">{c.whyPara}</p>
          </Reveal>
        </div>
      </section>

      {/* Drivers */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.driversTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.drivers.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 80}>
                <article className="card-premium p-6 h-full flex flex-col">
                  <h3 className="text-xl mb-2">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80 flex-1">{d.body}</p>
                  {'link' in d && (
                    <a
                      href={d.link[0]}
                      className="text-sm mt-4 underline underline-offset-4 decoration-brand-oro/70 text-brand-verde-osc hover:text-brand-verde transition-colors"
                    >
                      {d.link[1]}
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
          {/* No stable public URL exists for the SEDETUS bulletin and the owner
              could not obtain the PDF; the dated press reports on
              /legalidad-y-permisos carry the citation. Closed deliberately. */}
          <Reveal delay={160}>
            <img
              src="/rutas-acceso.webp"
              alt={c.driversImgAlt}
              width={2206}
              height={1265}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover mt-8"
            />
          </Reveal>
        </div>
      </section>

      {/* Honest brakes */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.brakesTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {c.brakes.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 3) * 80}>
                <article className="card-premium p-6 h-full">
                  <h3 className="text-xl mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <p className="text-sm text-brand-gris mt-6 max-w-copy">{c.brakesNote}</p>
          </Reveal>
        </div>
      </section>

      {/* How to read a developer projection */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.guideTitle}</h2>
          </Reveal>
          <ol className="grid sm:grid-cols-2 gap-5">
            {c.guide.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 80}>
                <li className="card-premium p-6 h-full">
                  <span className="eyebrow">{i + 1}</span>
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
