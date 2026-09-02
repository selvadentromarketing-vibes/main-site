import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import { CENOTES, spotDesc, spotLabel } from '../data/masterplan';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /terrenos-con-cenote-en-venta ↔ /en/land-with-cenote-for-sale-mexico
 * Target queries: "terrenos con cenote en venta", "terreno con cenote" /
 * "land with cenote for sale", "cenote property mexico".
 * Angle: lots that literally contain a cenote almost never trade — the
 * practical path is buying INTO a community that preserves nine of them
 * collectively. No legal claims; protection framed generally.
 */

const fmt = (n: number) => n.toLocaleString('en-US');

/** The three showcased cenotes (real render dims verified via sharp). */
const HIGHLIGHTS = [
  { id: 'cenote-mirador', w: 900, h: 1200 },
  { id: 'cenote-piedra', w: 1200, h: 800 },
  { id: 'cenote-caverna', w: 1024, h: 768 },
] as const;

const copy = {
  es: {
    eyebrow: 'Terrenos con cenote',
    lede: `Comprar un terreno que contiene su propio cenote es casi imposible: son ecosistemas protegidos que rara vez llegan al mercado. La vía realista existe en Tulum: lotes residenciales desde $${fmt(PRICING.lotPriceFromUSD)} USD dentro de una reserva privada que conserva nueve cenotes, con acceso para residentes desde el día de la compra.`,
    whyTitle: '¿Por qué casi nadie vende un terreno con cenote?',
    whyBody: [
      'Un cenote no es un estanque en el jardín. Es una ventana abierta al acuífero de la península de Yucatán — la red de ríos subterráneos más grande del planeta. El agua que ves en la superficie conecta, bajo tierra, con la de muchos otros cenotes. Lo que ocurre en uno alcanza a los demás.',
      'Por eso los cenotes suelen estar sujetos a protección ambiental, y los pocos que están en manos privadas casi nunca cambian de dueño. En la Riviera Maya operan típicamente como atracciones públicas o dentro de reservas, no como parte de un lote residencial. Y cuando un terreno con cenote llega a ofrecerse, suele implicar estudios especializados, obligaciones de conservación y una responsabilidad que recae completa en un solo propietario.',
      'La pregunta honesta, entonces, no es dónde comprar un cenote. Es cómo vivir junto a uno sin ponerlo en riesgo.',
    ],
    modelTitle: '¿Cómo funciona la reserva compartida?',
    modelBody: [
      'En Selvadentro no compras un cenote. Compras un lote residencial dentro de una comunidad que conserva nueve de forma colectiva: Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida y Caverna. Antes de trazar el masterplan, Estudio AMA y especialistas en hidrología mapearon cada cuerpo de agua; las vialidades y amenidades se acomodaron alrededor.',
      `La conservación no depende de la buena voluntad de nadie: el ${PRICING.jungleSharePercent}% de la selva permanece intacta por diseño, y la normativa — ${PRICING.cosPercent}% de ocupación máxima por lote, dos niveles de altura — obliga a todos los vecinos. Tú obtienes el acceso desde el día de tu compra; la comunidad carga con la preservación, por reglamento.`,
    ],
    compareTitle: 'Comprar un cenote vs. comprar dentro de una reserva',
    compareHead: ['', 'Lote que contiene un cenote', 'Lote en una reserva de cenotes'],
    compareRows: [
      ['Disponibilidad', 'Casi nula: rara vez salen al mercado', `Suspiro, la privada activa, con lotes desde ${PRICING.lotSizeMinM2} m²`],
      ['Cenotes', 'Uno, bajo tu entera responsabilidad', 'Nueve, conservados por la comunidad'],
      ['Conservación', 'Estudios y cuidado por tu cuenta', 'Mapeo con especialistas y normativa que obliga a todos'],
      ['Acceso al agua', 'Inmediato, pero aislado', 'Desde el día de tu compra, con amenidades alrededor'],
      ['Responsabilidad', 'Concentrada en un solo dueño', 'Compartida y regulada por el reglamento de la comunidad'],
    ],
    compareNote: 'La columna intermedia describe el escenario típico de un cenote en propiedad individual en la región, no una oferta concreta.',
    highlightsTitle: 'Tres de los nueve',
    highlightsIntro: 'Cada cenote tiene carácter propio: uno se contempla desde una torre, otro es una caverna, otro guarda una playa de arena. Estos son tres.',
    highlightsLink: ['/cenotes', 'Conoce los nueve cenotes'],
    cenoteAltSuffix: 'uno de los nueve cenotes dentro de Selvadentro Tulum',
    priceTitle: '¿Cuánto cuesta un lote en la reserva de cenotes?',
    priceRows: [
      ['Precio de lote', `Desde $${fmt(PRICING.lotPriceFromUSD)} USD`],
      ['Precio por m²', `Desde $${PRICING.pricePerM2USD} USD (lanzamiento en ${PRICING.launchDateLabelEs}: $${PRICING.launchPricePerM2USD} USD)`],
      ['Superficies', `${PRICING.lotSizeMinM2} – ${fmt(PRICING.lotSizeMaxM2)} m²`],
      ['Plan de pagos', `${PRICING.paymentPlanMonths} meses sin intereses, directo con el desarrollador`],
      ['Acceso a cenotes', `Desde el día de tu compra · entrega de Suspiro en ${PRICING.deliveryYear}`],
    ],
    priceNote: 'Actualizado: septiembre 2026. Precios, disponibilidad y el proceso de compra completo están en',
    priceNoteLink: ['/lotes-en-venta-tulum', 'la página de lotes en venta'],
    accessTitle: 'Acceso desde el día uno',
    accessBody:
      'La entrega de Suspiro está programada para 2029, pero el acceso a los cenotes y a las áreas comunes empieza cuando compras. La vida alrededor del agua ya está trazada: la Casa de los Cenotes — restaurante y bar de alberca junto al agua —, el Jungle Bar, el wellness center y los senderos entre la selva son parte de las más de 12 experiencias del proyecto.',
    accessLink: ['/amenidades', 'Ver todas las amenidades'],
    linksTitle: 'Sigue explorando',
    links: [
      ['/cenotes', 'Los 9 cenotes: nombres, fotos y cómo se protegen'],
      ['/lotes-en-venta-tulum', 'Lotes en venta: precios y disponibilidad'],
      ['/amenidades', 'Las +12 experiencias entre la selva'],
      ['/preguntas-frecuentes', 'Preguntas frecuentes'],
    ],
  },
  en: {
    eyebrow: 'Land with a cenote',
    lede: `Buying a lot that contains its own cenote is nearly impossible: cenotes are protected ecosystems that rarely reach the market. The realistic path is in Tulum, Mexico: residential lots from $${fmt(PRICING.lotPriceFromUSD)} USD inside a private reserve that preserves nine cenotes, with resident access from the day you buy.`,
    whyTitle: 'Why is land with a cenote almost never for sale?',
    whyBody: [
      'A cenote is not a pond in the backyard. It is an open window into the Yucatán Peninsula’s aquifer — the largest network of underground rivers on the planet. The water you see at the surface connects, underground, with many other cenotes. What happens in one reaches the others.',
      'That is why cenotes are typically under environmental protection, and the few in private hands almost never change owners. On the Riviera Maya they usually operate as public attractions or inside reserves — not as part of a residential lot. When land containing a cenote does come up for sale, it tends to carry specialist studies, conservation obligations and a responsibility that falls entirely on one owner.',
      'So the honest question is not where to buy a cenote. It is how to live beside one without putting it at risk.',
    ],
    modelTitle: 'How the shared-reserve model works',
    modelBody: [
      'At Selvadentro you do not buy a cenote. You buy a residential lot inside a community that preserves nine of them collectively: Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida and Caverna. Before the masterplan was drawn, Estudio AMA and hydrology specialists mapped every body of water; roads and amenities were arranged around them.',
      `Preservation does not depend on anyone’s goodwill: ${PRICING.jungleSharePercent}% of the jungle stays untouched by design, and the building rules — ${PRICING.cosPercent}% maximum lot coverage, a two-level height cap — bind every neighbor. You get the access from the day of purchase; the community carries the preservation, by regulation.`,
      'For foreign buyers, the ownership structure is the familiar one for coastal Mexico: a renewable bank trust (fideicomiso), the standard vehicle since the 1970s, with full rights to use, rent, sell and inherit. The cenotes themselves remain under the community’s collective care — which is precisely the point.',
    ],
    compareTitle: 'Owning a cenote vs. buying inside a reserve',
    compareHead: ['', 'Lot that contains a cenote', 'Lot inside a cenote reserve'],
    compareRows: [
      ['Availability', 'Close to none: they rarely reach the market', `Suspiro, the active enclave, with lots from ${PRICING.lotSizeMinM2} m²`],
      ['Cenotes', 'One, entirely your responsibility', 'Nine, preserved by the community'],
      ['Conservation', 'Studies and stewardship on your own', 'Specialist mapping and rules that bind every owner'],
      ['Water access', 'Immediate, but isolated', 'From the day you buy, with amenities around the water'],
      ['Responsibility', 'Concentrated in a single owner', 'Shared and governed by the community bylaws'],
    ],
    compareNote: 'The middle column describes the typical scenario for a privately held cenote in the region, not a specific offering.',
    highlightsTitle: 'Three of the nine',
    highlightsIntro: 'Each cenote has a character of its own: one is contemplated from a tower, one is a cavern, one hides a sand beach. Here are three.',
    highlightsLink: ['/en/cenotes', 'Meet all nine cenotes'],
    cenoteAltSuffix: 'one of the nine cenotes inside Selvadentro Tulum',
    priceTitle: 'What does a lot in the cenote reserve cost?',
    priceRows: [
      ['Lot price', `From $${fmt(PRICING.lotPriceFromUSD)} USD`],
      ['Price per m²', `From $${PRICING.pricePerM2USD} USD (${PRICING.launchDateLabelEn} launch: $${PRICING.launchPricePerM2USD} USD)`],
      ['Lot sizes', `${PRICING.lotSizeMinM2} – ${fmt(PRICING.lotSizeMaxM2)} m²`],
      ['Payment plan', `${PRICING.paymentPlanMonths} months at 0% interest, directly with the developer`],
      ['Cenote access', `From the day you buy · Suspiro delivery in ${PRICING.deliveryYear}`],
    ],
    priceNote: 'Updated: September 2026. Full pricing, availability and the buying process live on',
    priceNoteLink: ['/en/tulum-land-for-sale', 'the land-for-sale page'],
    accessTitle: 'Access from day one',
    accessBody:
      'Suspiro is scheduled for delivery in 2029, but access to the cenotes and common areas starts the day you buy. Life around the water is already drawn: Casa de los Cenotes — a restaurant and pool bar beside the water —, the Jungle Bar, the wellness center and the jungle trails are part of the project’s 12+ experiences.',
    accessLink: ['/en/amenities', 'See all the amenities'],
    linksTitle: 'Keep exploring',
    links: [
      ['/en/cenotes', 'The 9 cenotes: names, photos and how they are protected'],
      ['/en/tulum-land-for-sale', 'Lots for sale: pricing and availability'],
      ['/en/is-it-safe-to-buy-property-in-tulum', 'Is it safe to buy property in Tulum? A due-diligence guide'],
      ['/en/faq', 'Frequently asked questions'],
    ],
  },
} as const;

export default function CenoteLandPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} />

      {/* Why lots containing a cenote rarely trade */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.whyTitle}</h2>
            {c.whyBody.map((p, i) => (
              <p key={i} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* The shared-reserve model + comparison table */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.modelTitle}</h2>
            {c.modelBody.map((p, i) => (
              <p key={i} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <h3 className="text-xl sm:text-2xl mt-10 mb-4">{c.compareTitle}</h3>
            <div className="table-shell lg:-mx-24 xl:-mx-32">
              <table className="table-premium text-sm sm:text-base">
                <thead>
                  <tr>
                    {c.compareHead.map((h, i) => (
                      <th key={i} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.compareRows.map(([k, a, b]) => (
                    <tr key={k}>
                      <th scope="row" className="font-medium text-brand-verde-osc sm:whitespace-nowrap align-top">
                        {k}
                      </th>
                      <td className="align-top">{a}</td>
                      <td className="align-top">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-brand-gris mt-3">{c.compareNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Three cenote highlights (data + renders from the masterplan) */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-4">{c.highlightsTitle}</h2>
            <p className="leading-relaxed mb-8 max-w-copy">{c.highlightsIntro}</p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {HIGHLIGHTS.map(({ id, w, h }, i) => {
              const cenote = CENOTES.find((s) => s.id === id)!;
              return (
                <Reveal key={id} delay={i * 80}>
                  <article className="card-premium overflow-hidden h-full flex flex-col">
                    <img
                      src={cenote.images[0]}
                      alt={`${spotLabel(cenote, lang)} — ${c.cenoteAltSuffix}`}
                      width={w}
                      height={h}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="p-6 flex-1">
                      <h3 className="text-xl mb-2">{spotLabel(cenote, lang)}</h3>
                      <p className="text-sm leading-relaxed text-brand-negro/80">
                        {spotDesc(cenote, lang)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={240}>
            <p className="mt-8">
              <a
                href={c.highlightsLink[0]}
                className="underline underline-offset-4 decoration-brand-oro/70 text-brand-verde-osc hover:text-brand-verde transition-colors"
              >
                {c.highlightsLink[1]} →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing block */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-6">{c.priceTitle}</h2>
            <div className="table-shell lg:-mx-24 xl:-mx-32">
              <table className="table-premium text-sm sm:text-base">
                <tbody>
                  {c.priceRows.map(([k, v]) => (
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
            <p className="text-sm text-brand-gris mt-3">
              {c.priceNote}{' '}
              <a href={c.priceNoteLink[0]} className="underline underline-offset-4 decoration-brand-oro/70 hover:text-brand-verde transition-colors">
                {c.priceNoteLink[1]}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Access from day one */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.accessTitle}</h2>
            <p className="leading-relaxed mb-4">{c.accessBody}</p>
            <p>
              <a
                href={c.accessLink[0]}
                className="underline underline-offset-4 decoration-brand-oro/70 text-brand-verde-osc hover:text-brand-verde transition-colors"
              >
                {c.accessLink[1]} →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Closing links */}
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
