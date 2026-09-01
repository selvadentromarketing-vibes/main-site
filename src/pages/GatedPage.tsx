import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /comunidad-privada-en-tulum ↔ /en/gated-community-tulum
 * Target queries: "comunidad privada en tulum", "privada en tulum" /
 * "gated community tulum", "gated communities in tulum mexico".
 * Angle: what "gated" actually buys you here — controlled access plus
 * density guaranteed by regulation — with an honest "who this is not for".
 */

const fmt = (n: number) => n.toLocaleString('en-US');

const copy = {
  es: {
    eyebrow: 'Comunidad privada',
    lede: `Una comunidad privada en Tulum significa acceso controlado y seguridad 24/7. En Selvadentro significa algo más: baja densidad garantizada por reglamento — ${PRICING.cosPercent}% de ocupación máxima por lote, dos niveles —, ${PRICING.jungleSharePercent}% de selva conservada y nueve cenotes de uso residencial. Lotes desde $${fmt(PRICING.lotPriceFromUSD)} USD en Suspiro, la privada activa.`,
    meaningTitle: '¿Qué incluye una comunidad privada aquí?',
    meaningBody: [
      'Lo básico está resuelto: un solo ingreso con acceso controlado sobre la Avenida Selvadentro, seguridad 24/7, internet en áreas comunes, energía sustentable y una red de agua subterránea. Ese es el estándar que cualquier privada debería ofrecer.',
      `Lo que distingue a Selvadentro no es la caseta: es el reglamento. Cada lote puede construir como máximo el ${PRICING.cosPercent}% de su superficie (COS), con un CUS de ${PRICING.cusPercent}% y dos niveles más roof deck. Esas reglas obligan a todos los vecinos, hoy y en el futuro. La privacidad que compras no depende de la buena voluntad de nadie: está escrita.`,
    ],
    accessImgAlt: 'Acceso controlado de Selvadentro, enmarcado por la selva de Tulum',
    tableTitle: 'Condominio típico en Tulum vs. Selvadentro',
    tableHead: ['', 'Desarrollo de condominios típico', 'Selvadentro'],
    tableRows: [
      ['Producto', 'Departamentos en edificios compartidos', `Lotes residenciales de ${PRICING.lotSizeMinM2} a ${fmt(PRICING.lotSizeMaxM2)} m²`],
      ['Densidad', 'Suele maximizar unidades por terreno', `COS ${PRICING.cosPercent}%: solo un tercio de cada lote se construye`],
      ['Altura', 'Varios niveles, según cada proyecto', 'Dos niveles + roof deck, por reglamento'],
      ['Área verde', 'Jardines y amenidades ornamentales', `${PRICING.jungleSharePercent}% del territorio: selva conservada e intacta`],
      ['Vigencia de las reglas', 'Puede densificarse en fases futuras', 'La normativa obliga a cada lote del masterplan'],
    ],
    tableNote: 'La columna intermedia describe el formato típico del mercado de condominios en Tulum, no un desarrollo en particular.',
    privadasTitle: 'Tres privadas, un territorio',
    privadasBody: [
      `Selvadentro se organiza en privadas: enclaves con su propia calle interior dentro del territorio común. Mirador y Refugio, las dos primeras, se vendieron en su totalidad. Suspiro es la privada activa, con lotes desde ${PRICING.lotSizeMinM2} m² y plan de pagos a ${PRICING.paymentPlanMonths} meses sin intereses, directo con el desarrollador.`,
      `La entrega de Suspiro y sus amenidades está programada para ${PRICING.deliveryYear}, pero los residentes usan los cenotes y las áreas comunes desde el día de su compra.`,
    ],
    aerialImgAlt: 'Vista aérea del territorio de Selvadentro: selva conservada en Tulum',
    hoaTitle: '¿Cuánto cuesta mantener la comunidad?',
    hoaBody: [
      `La cuota de mantenimiento es de ${PRICING.hoaFeeLabelEs}. Cubre lo que hace funcionar la comunidad: seguridad y acceso controlado, vialidades internas, áreas comunes y amenidades, iluminación y paisajismo.`,
      'Además, el fideicomiso incluye una reserva de la asociación de colonos que garantiza el mantenimiento de amenidades y áreas comunes a largo plazo — para que el proyecto envejezca bien, no solo se entregue bien.',
    ],
    amenTitle: 'Vida en común, entre la selva',
    amenBody:
      'Más de 12 experiencias dentro del territorio: la Casa de los Cenotes — restaurante y bar de alberca —, el Jungle Bar, el wellness center, el Jungle Gym, la cancha de pádel y pickleball, el Pabellón Holístico, el Village Comercial, la Casa del Árbol, Kids Jungle, Pets Jungle, el mirador y los senderos entre la selva. Y los nueve cenotes, conservados para los residentes.',
    amenLinks: [
      ['/amenidades', 'Ver las +12 experiencias'],
      ['/cenotes', 'Conocer los 9 cenotes'],
    ],
    honestTitle: '¿Para quién no es?',
    honestBody: [
      'Selvadentro está del lado de la selva de Tulum, sobre la Ruta de los Cenotes. El atractivo aquí es el silencio: despertar con el sonido de los pájaros, nadar en un cenote antes del desayuno, cenar en comunidad sin salir del territorio.',
      'Si tu idea de Tulum es la vida de beach clubs y bares frente al mar, esa escena existe — la zona hotelera está a 20 minutos — pero no vivirás dentro de ella. Preferimos decirlo antes de que preguntes: esta comunidad es para quien busca calma, no fiesta.',
    ],
    linksTitle: 'Sigue explorando',
    links: [
      ['/lotes-en-venta-tulum', 'Lotes en venta: precios y disponibilidad'],
      ['/amenidades', 'Las +12 experiencias entre la selva'],
      ['/cenotes', 'Los 9 cenotes del proyecto'],
      ['/vivir-en-tulum', 'Vivir en Tulum: la guía honesta'],
      ['/preguntas-frecuentes', 'Preguntas frecuentes'],
    ],
  },
  en: {
    eyebrow: 'Gated community',
    lede: `A gated community in Tulum means controlled access and 24/7 security. At Selvadentro it means more: low density guaranteed by regulation — ${PRICING.cosPercent}% maximum lot coverage, two levels —, ${PRICING.jungleSharePercent}% of the jungle preserved, and nine cenotes for resident use. Lots from $${fmt(PRICING.lotPriceFromUSD)} USD in Suspiro, the active enclave.`,
    meaningTitle: 'What does a gated community include here?',
    meaningBody: [
      'The basics are covered: a single controlled entrance off Avenida Selvadentro, 24/7 security, internet in common areas, sustainable energy and an underground water network. That is the standard any gated community should meet.',
      `What sets Selvadentro apart is not the gatehouse — it is the rulebook. Each lot may build on at most ${PRICING.cosPercent}% of its surface, with a ${PRICING.cusPercent}% buildable-intensity cap and two levels plus roof deck. Those rules bind every neighbor, now and later. The privacy you buy does not depend on anyone’s goodwill; it is written down.`,
    ],
    accessImgAlt: 'Controlled entrance to Selvadentro, framed by the Tulum jungle',
    tableTitle: 'Typical Tulum condo development vs. Selvadentro',
    tableHead: ['', 'Typical condo development', 'Selvadentro'],
    tableRows: [
      ['Product', 'Apartments in shared buildings', `Residential lots from ${PRICING.lotSizeMinM2} to ${fmt(PRICING.lotSizeMaxM2)} m²`],
      ['Density', 'Typically maximizes units per parcel', `${PRICING.cosPercent}% max lot coverage: only a third of each lot is built`],
      ['Height', 'Several stories, project by project', 'Two levels + roof deck, by regulation'],
      ['Green area', 'Ornamental gardens and amenity decks', `${PRICING.jungleSharePercent}% of the territory: preserved, untouched jungle`],
      ['How long the rules hold', 'Later phases can densify', 'The rules bind every lot on the masterplan'],
    ],
    tableNote: 'The middle column describes the typical condo format in the Tulum market, not any particular development.',
    privadasTitle: 'Three enclaves, one territory',
    privadasBody: [
      `Selvadentro is organized into privadas — enclaves with their own interior street inside the shared territory. Mirador and Refugio, the first two, are fully sold. Suspiro is the active enclave, with lots from ${PRICING.lotSizeMinM2} m² and a ${PRICING.paymentPlanMonths}-month interest-free plan, directly with the developer.`,
      `Suspiro and its amenities are scheduled for delivery in ${PRICING.deliveryYear}, but residents use the cenotes and common areas from the day they buy. Foreign buyers own through a bank trust (fideicomiso) — the standard, fully established structure for coastal Mexico.`,
    ],
    aerialImgAlt: 'Aerial view of Selvadentro: preserved jungle in Tulum',
    hoaTitle: 'What does the HOA cost, and what does it maintain?',
    hoaBody: [
      `The maintenance fee is ${PRICING.hoaFeeLabelEn}. It covers what keeps the community running: security and access control, internal roads, common areas and amenities, lighting and landscaping.`,
      'On top of that, the trust includes a homeowners’ association reserve that guarantees long-term upkeep of the amenities and common areas — so the project ages well, not just delivers well.',
    ],
    amenTitle: 'Life in common, inside the jungle',
    amenBody:
      'More than 12 experiences within the territory: Casa de los Cenotes — restaurant and pool bar —, the Jungle Bar, the wellness center, the Jungle Gym, padel and pickleball courts, the Holistic Pavilion, the Commercial Village, the Treehouse, Kids Jungle, Pets Jungle, the lookout and the jungle trails. Plus the nine cenotes, preserved for residents.',
    amenLinks: [
      ['/en/amenities', 'See the 12+ experiences'],
      ['/en/cenotes', 'Meet the 9 cenotes'],
    ],
    honestTitle: 'Who is this not for?',
    honestBody: [
      'Selvadentro sits on Tulum’s jungle side, along the Ruta de los Cenotes. The draw here is quiet: waking to birdsong, swimming in a cenote before breakfast, dinner at the clubhouse without leaving the gates.',
      'If your Tulum is beach clubs and bars on the sand, that scene exists — the hotel zone is 20 minutes away — but you will not live inside it. We would rather say it before you ask: this community is for people who want calm, not a party.',
    ],
    linksTitle: 'Keep exploring',
    links: [
      ['/en/tulum-land-for-sale', 'Lots for sale: pricing and availability'],
      ['/en/amenities', 'The 12+ experiences in the jungle'],
      ['/en/cenotes', 'The project’s 9 cenotes'],
      ['/en/living-in-tulum-guide', 'Living in Tulum: the honest guide'],
      ['/en/faq', 'Frequently asked questions'],
    ],
  },
} as const;

export default function GatedPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} />

      {/* What "gated" means here */}
      <section className="section">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-5">{c.meaningTitle}</h2>
            {c.meaningBody.map((p, i) => (
              <p key={i} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <img
              src="/map-acceso.jpg"
              alt={c.accessImgAlt}
              width={1200}
              height={600}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Comparison table: typical condo vs Selvadentro */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-6">{c.tableTitle}</h2>
            <div className="overflow-x-auto rounded-2xl border border-brand-verde/15 bg-white/60">
              <table className="w-full text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-brand-verde/15">
                    {c.tableHead.map((h, i) => (
                      <th key={i} scope="col" className="py-3.5 px-4 sm:px-6 font-medium text-brand-verde-osc">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.tableRows.map(([k, a, b]) => (
                    <tr key={k} className="border-b border-brand-verde/10 last:border-0">
                      <th scope="row" className="py-3.5 px-4 sm:px-6 font-medium text-brand-verde-osc whitespace-nowrap align-top">
                        {k}
                      </th>
                      <td className="py-3.5 px-4 sm:px-6 align-top">{a}</td>
                      <td className="py-3.5 px-4 sm:px-6 align-top">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-brand-gris mt-3">{c.tableNote}</p>
          </Reveal>
        </div>
      </section>

      {/* The privadas structure */}
      <section className="section">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <img
              src="/render-aerial.webp"
              alt={c.aerialImgAlt}
              width={1600}
              height={1200}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-2xl sm:text-3xl mb-5">{c.privadasTitle}</h2>
            {c.privadasBody.map((p, i) => (
              <p key={i} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOA */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-5">{c.hoaTitle}</h2>
            {c.hoaBody.map((p, i) => (
              <p key={i} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Community amenities */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-5">{c.amenTitle}</h2>
            <p className="leading-relaxed max-w-copy mb-5">{c.amenBody}</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {c.amenLinks.map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="underline underline-offset-4 decoration-brand-oro/70 text-brand-verde-osc hover:text-brand-verde transition-colors"
                  >
                    {label} →
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Honest section: who this is NOT for */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-5">{c.honestTitle}</h2>
            {c.honestBody.map((p, i) => (
              <p key={i} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Closing links */}
      <section className="section bg-brand-verde-osc text-brand-crema">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6 text-brand-crema">{c.linksTitle}</h2>
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
