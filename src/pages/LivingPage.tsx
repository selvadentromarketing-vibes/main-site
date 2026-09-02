import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * Top-funnel guide — /vivir-en-tulum ↔ /en/living-in-tulum-guide
 * Target queries: "vivir en tulum", "cómo es vivir en tulum" /
 * "living in tulum", "moving to tulum", "what is it like to live in tulum".
 * Angle: the two Tulums (tourist vs resident). Honest about climate,
 * sargassum, cost of living and who the town is NOT for. Soft close to
 * the gated-community and lots pages.
 */

const fmt = (n: number) => n.toLocaleString('en-US');

const copy = {
  es: {
    eyebrow: 'Guía 2026',
    lede: 'Vivir en Tulum es vivir en dos pueblos a la vez: el destino turístico de playa, con precios en dólares, y el pueblo tropical donde la vida real se paga en pesos. Esta guía cubre ambos — clima mes a mes, costo de vida sin maquillaje, las zonas donde viven los residentes y para quién es (y no es) Tulum.',
    dailyTitle: '¿Cómo es el día a día en Tulum?',
    dailyBody: [
      'La postal — beach clubs, boutiques, atardeceres — es real, pero pertenece a la economía turística. La mayoría de quienes viven en Tulum pasa su semana lejos de ella: en el pueblo, en La Veleta o del lado de la selva, donde el día empieza con pájaros y no con música de DJ.',
      'Del lado de la Ruta de los Cenotes el ritmo es otro: mañanas de selva, cenotes sin filas, noches donde el silencio no es promesa de folleto. A cambio, aceptas la logística de un pueblo tropical — calor, humedad, trámites que toman su tiempo. Ese intercambio, naturaleza por conveniencia inmediata, es la decisión central de vivir aquí.',
    ],
    dailyImgAlt: 'Sendero entre la selva conservada de Selvadentro, en la Ruta de los Cenotes de Tulum',
    climateTitle: 'El clima en Tulum, mes a mes',
    climateIntro:
      'Dos temporadas mandan: la seca (noviembre–abril) y la calurosa-húmeda (mayo–octubre). El sargazo llega a las playas aproximadamente de mayo a septiembre, y la temporada de huracanes del Atlántico corre de junio a noviembre. Así se ve un año típico:',
    climateHead: ['Mes', 'Temporada', 'Qué esperar (patrón típico)'],
    climateRows: [
      ['Enero', 'Seca', 'Días cálidos, noches frescas. Temporada alta.'],
      ['Febrero', 'Seca', 'Seco y templado; de los meses más cómodos del año.'],
      ['Marzo', 'Seca', 'Sube el calor. Vacaciones de primavera se sienten en todo el pueblo.'],
      ['Abril', 'Seca', 'Calor en aumento; últimas semanas secas.'],
      ['Mayo', 'Calurosa', 'Calor fuerte y humedad. Suele empezar el sargazo en las playas.'],
      ['Junio', 'Calurosa · lluvias', 'Lluvias por la tarde. Inicia la temporada de huracanes (jun–nov).'],
      ['Julio', 'Calurosa · lluvias', 'Calor intenso; sargazo variable según el año.'],
      ['Agosto', 'Calurosa · lluvias', 'Pico de calor, tormentas puntuales.'],
      ['Septiembre', 'Lluviosa', 'El mes más lluvioso; pico de la temporada de huracanes.'],
      ['Octubre', 'Lluviosa', 'Lluvias frecuentes; el calor empieza a ceder.'],
      ['Noviembre', 'Transición', 'Regresa el aire seco. Arranca la temporada alta.'],
      ['Diciembre', 'Seca', 'Templado y seco; máxima demanda turística.'],
    ],
    climateNote:
      'Patrones típicos de la región, no un pronóstico: cada año varía, el sargazo en particular. Dos matices: el sargazo afecta playas, no cenotes ni selva; y "temporada de huracanes" significa monitorear el pronóstico, no un huracán cada año.',
    connectTitle: '¿Qué tan conectado está Tulum en 2026?',
    connectBody: [
      'Mucho más que hace tres años, y el cambio tiene fechas. El Tren Maya opera servicio de pasajeros desde diciembre de 2023 y conecta Tulum con Playa del Carmen, Cancún y el resto de la península. El Aeropuerto Internacional de Tulum (Felipe Carrillo Puerto) abrió el 1 de diciembre de 2023, con vuelos nacionales e internacionales.',
      'El aeropuerto de Cancún — todavía el de mayor oferta de rutas — queda a unos 90 minutos por carretera, y el Libramiento Playa-Cobá, hoy en construcción, está pensado para sacar el tráfico de paso del centro de Tulum.',
    ],
    whoTitle: '¿Para quién es Tulum — y para quién no?',
    forTitle: 'Tulum es para ti si…',
    forItems: [
      'Trabajas remoto y quieres naturaleza sin desconectarte del mundo.',
      'Tu vida ideal sucede afuera: cenotes, mar, selva, deporte.',
      'Piensas en años, no en una temporada — para vivir o para invertir.',
      'Aceptas calor, humedad e insectos como parte del trato.',
    ],
    notForTitle: 'Probablemente no, si…',
    notForItems: [
      'Necesitas infraestructura de gran ciudad: hospitales de alta especialidad, oferta escolar amplia, agenda cultural intensa.',
      'El calor húmedo de mayo a octubre te parece un costo inaceptable.',
      'Esperas precios bajos en el destino de moda del Caribe mexicano.',
      'Te frustra que las cosas tarden: entregas, trámites, reparaciones.',
    ],
    zonesTitle: '¿Dónde viven realmente los residentes?',
    zones: [
      [
        'Zona hotelera (la playa)',
        'La postal y el motor turístico: hoteles, beach clubs, precios en dólares. Aquí casi nadie vive — se visita, se trabaja en ella y se vuelve a casa.',
      ],
      [
        'El centro (el pueblo)',
        'Mercados, fondas, ferreterías, trámites. La versión más real — y más ruidosa — de Tulum, con la vida cotidiana en pesos.',
      ],
      [
        'La Veleta y Aldea Zamá',
        'El Tulum residencial urbano que creció entre el pueblo y la playa: condominios, cafés, coworkings. Aldea Zamá — masterplan de la misma familia que hoy desarrolla Selvadentro — ordenó buena parte de ese crecimiento.',
      ],
      [
        'Las comunidades en la selva',
        'Del lado de la Ruta de los Cenotes la apuesta es distinta: tierra en lugar de condominio, espacio y silencio en lugar de esquina céntrica. Comunidades privadas como Selvadentro, con nueve cenotes y 65% de selva conservada, existen para ese cambio de escala.',
      ],
    ],
    costTitle: '¿Cuánto cuesta vivir en Tulum?',
    costBody: [
      'Menos de lo que cuesta vacacionar aquí, más de lo que costaba hace una década. Conviven dos economías: la turística — menús en dólares, playa, delivery — y la local — mercado, fondas, pesos. La misma semana puede costar el doble o la mitad según en cuál te muevas.',
      'Preferimos no publicar cifras que caducan en meses. Las variables que más pesan son constantes: dónde rentas o construyes, cuánto aire acondicionado usas en los meses de calor y qué tan seguido comes en la zona turística. Tulum no es barato; tampoco tiene por qué costarte como unas vacaciones permanentes.',
    ],
    closeTitle: '¿Y si tu Tulum es el de la selva?',
    closeBefore:
      'Si te reconoces en el lado tranquilo — espacio, cenotes, vecinos contados —, esa vida ya existe y está regulada para durar: ',
    closeLink1: ['/comunidad-privada-en-tulum', 'una comunidad privada en la selva de Tulum'],
    closeMid: ' con nueve cenotes dentro, y ',
    closeLink2: ['/lotes-en-venta-tulum', `lotes en venta desde $${fmt(PRICING.lotPriceFromUSD)} USD`],
    closeAfter: ' para construirla a tu ritmo.',
    linksTitle: 'Sigue explorando',
    links: [
      ['/comunidad-privada-en-tulum', 'La comunidad privada con 9 cenotes'],
      ['/lotes-en-venta-tulum', 'Lotes en venta: precios y condiciones'],
      ['/ubicacion', 'Ubicación y tiempos de traslado reales'],
      ['/cenotes', 'Los nueve cenotes del proyecto'],
      ['/mercado-inmobiliario-tulum-2026', 'El mercado inmobiliario de Tulum en 2026'],
    ],
  },
  en: {
    eyebrow: '2026 guide',
    lede: 'Living in Tulum means living in two towns at once: a beach destination priced in dollars, and a tropical town where daily life runs in pesos. This guide covers both — the month-by-month climate, honest cost-of-living talk, the neighborhoods where residents actually live, and who Tulum is (and isn’t) for.',
    dailyTitle: 'What is daily life in Tulum actually like?',
    dailyBody: [
      'The postcard — beach clubs, boutiques, sunsets — is real, but it belongs to the tourist economy. Most people who live in Tulum spend their week away from it: in town, in La Veleta, or out on the jungle side, where mornings start with birdsong rather than a DJ set.',
      'On the Ruta de los Cenotes side, the rhythm changes: jungle mornings, cenotes without lines, nights where silence is not a brochure promise. In exchange, you accept tropical-town logistics — heat, humidity, errands that take their time. That trade, nature for instant convenience, is the central decision of living here.',
    ],
    dailyImgAlt: 'Trail through the preserved jungle at Selvadentro, on Tulum’s Ruta de los Cenotes',
    climateTitle: 'Tulum’s climate, month by month',
    climateIntro:
      'Two seasons run the year: dry (November–April) and hot-humid (May–October). Sargassum seaweed reaches the beaches roughly May through September, and the Atlantic hurricane season runs June to November. Here is a typical year:',
    climateHead: ['Month', 'Season', 'What to expect (typical pattern)'],
    climateRows: [
      ['January', 'Dry', 'Warm days, cool nights. Peak tourist season.'],
      ['February', 'Dry', 'Dry and mild; among the most comfortable months.'],
      ['March', 'Dry', 'Heat picks up. Spring break is felt all over town.'],
      ['April', 'Dry', 'Rising heat; the last dry weeks.'],
      ['May', 'Hot', 'Strong heat and humidity. Sargassum usually begins on the beaches.'],
      ['June', 'Hot · rainy', 'Afternoon rains. Hurricane season begins (Jun–Nov).'],
      ['July', 'Hot · rainy', 'Intense heat; sargassum varies by year.'],
      ['August', 'Hot · rainy', 'Peak heat, scattered storms.'],
      ['September', 'Rainy', 'The wettest month; peak of hurricane season.'],
      ['October', 'Rainy', 'Frequent rain; the heat starts to ease.'],
      ['November', 'Transition', 'Dry air returns. High season begins.'],
      ['December', 'Dry', 'Mild and dry; peak tourist demand.'],
    ],
    climateNote:
      'Typical regional patterns, not a forecast — every year differs, sargassum especially. Two nuances: sargassum affects beaches, not cenotes or the jungle side; and "hurricane season" means watching the forecast, not a hurricane every year.',
    connectTitle: 'How connected is Tulum in 2026?',
    connectBody: [
      'Far more than three years ago, and the change has dates. The Maya Train has run passenger service since December 2023, linking Tulum to Playa del Carmen, Cancún and the rest of the peninsula. Tulum International Airport (Felipe Carrillo Puerto) opened December 1, 2023, with direct domestic and international flights.',
      'Cancún’s airport — still the region’s largest route map — sits about 90 minutes away by highway, and the Playa-Cobá bypass, now under construction, is designed to pull through-traffic out of downtown Tulum.',
    ],
    whoTitle: 'Who is Tulum for — and who is it not for?',
    forTitle: 'Tulum is for you if…',
    forItems: [
      'You work remotely and want nature without dropping off the map.',
      'Your ideal life happens outdoors: cenotes, sea, jungle, sport.',
      'You think in years, not in a season — as a resident or an investor.',
      'You can accept heat, humidity and insects as part of the deal.',
    ],
    notForTitle: 'Probably not, if…',
    notForItems: [
      'You need big-city infrastructure: specialty hospitals, broad school options, a dense cultural calendar.',
      'The humid heat from May to October sounds like a dealbreaker.',
      'You expect small-town prices in the Mexican Caribbean’s trendiest destination.',
      'Slow logistics frustrate you: deliveries, paperwork, repairs.',
    ],
    zonesTitle: 'Where do residents actually live?',
    zones: [
      [
        'The hotel zone (the beach)',
        'The postcard and the tourism engine: hotels, beach clubs, dollar pricing. Almost nobody lives here — you visit it, work in it, and head home.',
      ],
      [
        'Downtown (el pueblo)',
        'Markets, family-run restaurants, hardware stores, paperwork. The most real — and loudest — version of Tulum, with daily life in pesos.',
      ],
      [
        'La Veleta and Aldea Zamá',
        'Urban-residential Tulum, grown between town and beach: condos, cafés, coworking spaces. Aldea Zamá — master-planned by the same family now developing Selvadentro — brought order to much of that growth.',
      ],
      [
        'The jungle communities',
        'On the Ruta de los Cenotes side the bet is different: land instead of a condo, space and silence instead of a central corner. Private communities like Selvadentro — nine cenotes, 65% of the jungle preserved — exist for that change of scale.',
      ],
    ],
    costTitle: 'What does living in Tulum cost?',
    costBody: [
      'Less than vacationing here, more than it did a decade ago. Two economies coexist: the tourist one — dollar menus, beach, delivery — and the local one — markets, fondas, pesos. The same week can cost double or half depending on which one you live in.',
      'We would rather not publish figures that expire in months. The variables that matter most are constant: where you rent or build, how much air conditioning you run in the hot months, and how often you eat in the tourist zone. Tulum is not cheap; it also doesn’t have to cost you like a permanent vacation.',
    ],
    closeTitle: 'What if your Tulum is the jungle one?',
    closeBefore:
      'If you recognize yourself in the quiet side — space, cenotes, a handful of neighbors — that life already exists, and it is regulated to last: ',
    closeLink1: ['/en/gated-community-tulum', 'a gated community in the Tulum jungle'],
    closeMid: ' with nine cenotes inside, and ',
    closeLink2: ['/en/tulum-land-for-sale', `lots for sale from $${fmt(PRICING.lotPriceFromUSD)} USD`],
    closeAfter: ' to build at your own pace.',
    linksTitle: 'Keep exploring',
    links: [
      ['/en/gated-community-tulum', 'The gated community with 9 cenotes'],
      ['/en/tulum-land-for-sale', 'Lots for sale: pricing and terms'],
      ['/en/location', 'Location and real drive times'],
      ['/en/cenotes', 'The project’s nine cenotes'],
      ['/en/tulum-real-estate-market-2026', 'The Tulum real estate market in 2026'],
    ],
  },
} as const;

export default function LivingPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} />

      {/* Daily life */}
      <section className="section">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="h2-section mb-5">{c.dailyTitle}</h2>
            {c.dailyBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <img
              src="/amenity-naturaleza.webp"
              alt={c.dailyImgAlt}
              width={1200}
              height={900}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Climate table */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-4">{c.climateTitle}</h2>
            <p className="leading-relaxed mb-6">{c.climateIntro}</p>
            <div className="table-shell lg:-mx-24 xl:-mx-32">
              <table className="table-premium text-sm sm:text-base">
                <thead>
                  <tr>
                    {c.climateHead.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.climateRows.map(([month, season, note]) => (
                    <tr key={month}>
                      <th scope="row" className="font-medium text-brand-verde-osc sm:whitespace-nowrap align-top">
                        {month}
                      </th>
                      <td className="sm:whitespace-nowrap align-top">{season}</td>
                      <td>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-brand-gris mt-3">{c.climateNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Connectivity */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.connectTitle}</h2>
            {c.connectBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Who it's for / not for */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.whoTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            <Reveal>
              <div className="card-premium p-6 h-full">
                <h3 className="text-xl mb-4">{c.forTitle}</h3>
                <ul className="space-y-3">
                  {c.forItems.map((it) => (
                    <li key={it.slice(0, 24)} className="text-sm leading-relaxed text-brand-negro/80 pl-4 border-l-2 border-brand-oro/60">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="card-premium p-6 h-full">
                <h3 className="text-xl mb-4">{c.notForTitle}</h3>
                <ul className="space-y-3">
                  {c.notForItems.map((it) => (
                    <li key={it.slice(0, 24)} className="text-sm leading-relaxed text-brand-negro/80 pl-4 border-l-2 border-brand-gris/40">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.zonesTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {c.zones.map(([name, body], i) => (
              <Reveal key={name} delay={(i % 2) * 80}>
                <article className="card-premium p-6 h-full">
                  <h3 className="text-xl mb-2">{name}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cost of living */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.costTitle}</h2>
            {c.costBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Soft close */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.closeTitle}</h2>
            <p className="leading-relaxed">
              {c.closeBefore}
              <a href={c.closeLink1[0]} className="underline underline-offset-4 decoration-brand-oro/70 hover:text-brand-verde transition-colors">
                {c.closeLink1[1]}
              </a>
              {c.closeMid}
              <a href={c.closeLink2[0]} className="underline underline-offset-4 decoration-brand-oro/70 hover:text-brand-verde transition-colors">
                {c.closeLink2[1]}
              </a>
              {c.closeAfter}
            </p>
          </Reveal>
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
