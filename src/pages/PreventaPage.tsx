import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /preventa-de-terrenos-en-tulum ↔ /en/pre-construction-lots-tulum
 * Target queries: "preventa de terrenos en tulum", "preventa tulum" /
 * "pre construction lots tulum", "tulum pre sale land".
 *
 * The mechanics page: what preventa means for LAND (the lot already
 * exists — you buy early-phase pricing), Selvadentro's plan as the worked
 * example (price steps with dates, 48 months at 0%, 2029 delivery), and
 * the checklist to review before signing ANY pre-sale.
 */

const fmt = (n: number) => n.toLocaleString('en-US');

const copy = {
  es: {
    eyebrow: 'Preventa',
    lede: `Preventa de terrenos significa comprar tu lote en la fase temprana del desarrollo, a precio de fase temprana. En Selvadentro: lotes desde $${fmt(PRICING.lotPriceFromUSD)} USD, plan de pagos a ${PRICING.paymentPlanMonths} meses sin intereses directo con el desarrollador, entrega de Suspiro en ${PRICING.deliveryYear} y acceso a cenotes y amenidades desde el día de tu compra.`,
    whatTitle: '¿Qué es una preventa de terrenos? No es lo mismo que un condominio',
    whatBody: [
      'En una preventa de condominios compras un plano: el departamento no existe hasta que la torre se termina. En una preventa de terrenos, el lote ya existe — está trazado, medido y ubicado en el masterplan. Lo que compras “antes” no es el suelo: es el precio de la fase temprana y la libertad de elegir lote antes que la mayoría.',
      `Lo que sí se entrega después es lo que rodea al lote: infraestructura y amenidades. En Selvadentro esa entrega es ${PRICING.deliveryYear}, con una diferencia práctica: los nueve cenotes y las experiencias son de uso residencial desde el día de tu compra, no desde la entrega.`,
      'Por eso el riesgo de una preventa de tierra es de otra naturaleza — y menor en un punto clave: no dependes de que algo se construya para que tu propiedad exista. Dependes, como en cualquier compra, de que los papeles estén en orden. De eso trata el checklist de abajo.',
    ],
    imgAlt: 'Acceso de Suspiro, la privada activa de Selvadentro, ya construido entre la selva',
    planTitle: 'El plan de Selvadentro, con números y fechas',
    stepsHead: ['Etapa', 'Precio por m²', 'Fecha'],
    priceSteps: [
      ['Lanzamiento de Suspiro', `$${PRICING.launchPricePerM2USD} USD`, PRICING.launchDateLabelEs],
      ['Precio actual', `$${PRICING.pricePerM2USD} USD`, 'septiembre de 2026 · +40% en 12 meses'],
      ['Proyección al cierre', `$${PRICING.projectedClosePerM2USD} USD`, 'proyección del desarrollador, no una promesa'],
    ],
    termsRows: [
      ['Precio de lote', `Desde $${fmt(PRICING.lotPriceFromUSD)} USD · superficies de ${PRICING.lotSizeMinM2} a ${fmt(PRICING.lotSizeMaxM2)} m²`],
      ['Plan de pagos', `${PRICING.paymentPlanMonths} mensualidades sin intereses, directo con el desarrollador — sin banco de por medio`],
      ['Entrega', `Suspiro y sus amenidades: ${PRICING.deliveryYear}`],
      ['Acceso', 'Cenotes y experiencias en uso residencial desde el día de tu compra'],
      ['Escritura', 'Ante notario público; compradores extranjeros suman el fideicomiso bancario'],
    ],
    planOutro: {
      pre: `El plan a ${PRICING.paymentPlanMonths} meses convierte el precio de hoy en pagos distribuidos hacia la entrega: apartas a precio actual y terminas de pagar cerca de ${PRICING.deliveryYear}. Si el precio por etapas sigue el camino que lleva desde el lanzamiento, la diferencia entre entrar hoy o después es la que documentamos en `,
      linkLabel: 'plusvalía en Tulum',
      post: '.',
      href: '/plusvalia-en-tulum',
    },
    checkTitle: 'Qué revisar antes de firmar cualquier preventa (no solo la nuestra)',
    checkIntro:
      'Una preventa es tan sólida como sus documentos. Antes de firmar con cualquier desarrollador en Tulum, revisa estos cinco puntos:',
    checklist: [
      [
        'Los permisos del desarrollo',
        'Expediente estatal y municipal completo: uso de suelo, autorización de acciones urbanísticas y régimen de propiedad. Verifícalo con SEDETUS y el Registro Público, no solo con el vendedor.',
      ],
      [
        'La ruta hacia tu escritura',
        'Cómo y cuándo pasas del contrato a la escritura pública ante notario. Si eres extranjero, confirma desde el inicio el fideicomiso bancario.',
      ],
      [
        'Penalidades y cancelación',
        'Qué pasa si te atrasas en una mensualidad, qué pasa si cancelas, y qué asume el desarrollador si la entrega se retrasa. Todo por escrito, en el contrato.',
      ],
      [
        'Las obligaciones de entrega',
        'Qué infraestructura y amenidades se entregan, en qué fecha y en qué condiciones. Lo que no está en el contrato no existe.',
      ],
      [
        'La trayectoria del desarrollador',
        'Proyectos anteriores terminados y entregados, con nombre y apellido. En preventa, el historial pesa más que el render.',
      ],
    ],
    closingLine: {
      pre: 'En Selvadentro, ese expediente está documentado en público — con el episodio SEDETUS de 2025 incluido, con fechas y fuentes — en ',
      linkLabel: 'legalidad y permisos',
      post: '.',
      href: '/legalidad-y-permisos',
    },
    linksTitle: 'Sigue explorando',
    links: [
      ['/legalidad-y-permisos', 'Legalidad y permisos verificados ante SEDETUS'],
      ['/plusvalia-en-tulum', `La serie de precios: de $${PRICING.launchPricePerM2USD} a $${PRICING.pricePerM2USD} USD/m²`],
      ['/lotes-en-venta-tulum', 'Lotes disponibles en Suspiro'],
      ['/es-seguro-invertir-en-tulum', '¿Es seguro invertir en Tulum?'],
      ['/preguntas-frecuentes', 'Preguntas frecuentes'],
    ],
  },
  en: {
    eyebrow: 'Pre-construction',
    lede: `Buying pre-construction land means buying your lot in the development’s early phase, at early-phase pricing. At Selvadentro: lots from $${fmt(PRICING.lotPriceFromUSD)} USD, a ${PRICING.paymentPlanMonths}-month interest-free plan directly with the developer, Suspiro delivered in ${PRICING.deliveryYear}, and cenote and amenity access from the day you buy.`,
    whatTitle: 'What does pre-construction mean for land? Not what it means for condos',
    whatBody: [
      'In a condo pre-sale you buy a floor plan: the unit does not exist until the tower is finished. In a land pre-sale, the lot already exists — surveyed, measured and placed on the masterplan. What you buy “early” is not the ground itself: it is early-phase pricing, and the freedom to pick your lot before most people arrive.',
      `What arrives later is what surrounds the lot: infrastructure and amenities. At Selvadentro that delivery is ${PRICING.deliveryYear}, with one practical difference — the nine cenotes and the experiences are open to residents from the day of purchase, not from delivery day.`,
      'That is why the risk profile of land pre-construction is different — and smaller on one key point: you are not waiting for something to be built for your property to exist. What you depend on, as in any purchase, is the paperwork being in order. That is what the checklist below is for.',
    ],
    imgAlt: 'The Suspiro entrance at Selvadentro, already built within the jungle',
    planTitle: 'Selvadentro’s plan, in numbers and dates',
    stepsHead: ['Phase', 'Price per m²', 'Date'],
    priceSteps: [
      ['Suspiro launch', `$${PRICING.launchPricePerM2USD} USD`, PRICING.launchDateLabelEn],
      ['Current price', `$${PRICING.pricePerM2USD} USD`, 'September 2026 · +40% in 12 months'],
      ['Projected at close', `$${PRICING.projectedClosePerM2USD} USD`, 'a developer projection, not a promise'],
    ],
    termsRows: [
      ['Lot price', `From $${fmt(PRICING.lotPriceFromUSD)} USD · sizes from ${PRICING.lotSizeMinM2} to ${fmt(PRICING.lotSizeMaxM2)} m²`],
      ['Payment plan', `${PRICING.paymentPlanMonths} monthly payments at 0% interest, directly with the developer — no bank involved`],
      ['Delivery', `Suspiro and its amenities: ${PRICING.deliveryYear}`],
      ['Access', 'Cenotes and experiences open to residents from the day you buy'],
      ['Title', 'Deed before a Mexican notary; foreign buyers add the bank trust (fideicomiso)'],
    ],
    planOutro: {
      pre: `The ${PRICING.paymentPlanMonths}-month plan spreads today’s price toward delivery: you lock the current price and finish paying around ${PRICING.deliveryYear}. If phased pricing keeps following the path it has taken since launch, the difference between entering now and later is the one documented in `,
      linkLabel: 'the Tulum appreciation data',
      post: '.',
      href: '/en/tulum-property-appreciation-data',
    },
    checkTitle: 'What to review before signing any pre-sale (not just ours)',
    checkIntro:
      'A pre-sale is only as solid as its documents. Before signing with any developer in Tulum, review these five points:',
    checklist: [
      [
        'The development’s permits',
        'The full state and municipal file: land use, the urban development authorization and the property regime. Verify with SEDETUS and the Public Registry — not just with the salesperson.',
      ],
      [
        'The path to your deed',
        'How and when you go from contract to a notarized public deed. If you are a foreign buyer, confirm the bank trust (fideicomiso) from the start.',
      ],
      [
        'Penalties and cancellation',
        'What happens if you miss a payment, what happens if you cancel, and what the developer owes if delivery slips. All of it in writing, in the contract.',
      ],
      [
        'The delivery obligations',
        'Which infrastructure and amenities are delivered, by what date, and in what condition. If it is not in the contract, it does not exist.',
      ],
      [
        'The developer’s track record',
        'Previous projects finished and delivered, with names attached. In pre-construction, history outweighs renders.',
      ],
    ],
    closingLine: {
      pre: 'At Selvadentro, that file is documented in public — the 2025 SEDETUS episode included, with dates and sources — on the ',
      linkLabel: 'legal compliance page',
      post: '.',
      href: '/en/legal-compliance',
    },
    linksTitle: 'Keep exploring',
    links: [
      ['/en/legal-compliance', 'Permits verified before SEDETUS'],
      ['/en/tulum-property-appreciation-data', `The price series: $${PRICING.launchPricePerM2USD} to $${PRICING.pricePerM2USD} USD/m²`],
      ['/en/tulum-land-for-sale', 'Available lots in Suspiro'],
      ['/en/is-it-safe-to-buy-property-in-tulum', 'Is it safe to buy property in Tulum?'],
      ['/en/faq', 'Frequently asked questions'],
    ],
  },
} as const;

export default function PreventaPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} />

      {/* (a) What preventa means for land */}
      <section className="section">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-5">{c.whatTitle}</h2>
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

      {/* (b) Selvadentro's plan as the worked example */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-6">{c.planTitle}</h2>
            <div className="overflow-x-auto rounded-2xl border border-brand-verde/15 bg-white/60">
              <table className="w-full text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-brand-verde/15">
                    {c.stepsHead.map((h) => (
                      <th key={h} scope="col" className="py-3.5 px-4 sm:px-6 font-medium text-brand-verde-osc">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.priceSteps.map(([phase, price, date]) => (
                    <tr key={phase} className="border-b border-brand-verde/10 last:border-0">
                      <th scope="row" className="py-3.5 px-4 sm:px-6 font-medium text-brand-verde-osc align-top whitespace-nowrap">
                        {phase}
                      </th>
                      <td className="py-3.5 px-4 sm:px-6 align-top whitespace-nowrap">{price}</td>
                      <td className="py-3.5 px-4 sm:px-6 align-top">{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="overflow-x-auto rounded-2xl border border-brand-verde/15 bg-white/60 mt-5">
              <table className="w-full text-left text-sm sm:text-base">
                <tbody>
                  {c.termsRows.map(([k, v]) => (
                    <tr key={k} className="border-b border-brand-verde/10 last:border-0">
                      <th scope="row" className="py-3.5 px-4 sm:px-6 font-medium text-brand-verde-osc whitespace-nowrap align-top">
                        {k}
                      </th>
                      <td className="py-3.5 px-4 sm:px-6">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="leading-relaxed mt-6 max-w-copy">
              {c.planOutro.pre}
              <a
                href={c.planOutro.href}
                className="underline underline-offset-4 decoration-brand-oro/70 text-brand-verde-osc hover:text-brand-verde transition-colors"
              >
                {c.planOutro.linkLabel}
              </a>
              {c.planOutro.post}
            </p>
          </Reveal>
        </div>
      </section>

      {/* (c) The before-you-sign checklist */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl mb-3">{c.checkTitle}</h2>
            <p className="leading-relaxed mb-8 max-w-copy">{c.checkIntro}</p>
          </Reveal>
          <ol className="space-y-5">
            {c.checklist.map(([title, body], i) => (
              <Reveal key={title} delay={i * 80}>
                <li className="flex gap-4 sm:gap-5 bg-white/70 border border-brand-verde/10 rounded-2xl p-6">
                  <span className="shrink-0 w-9 h-9 rounded-full border border-brand-verde/30 flex items-center justify-center font-serif text-brand-verde">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl mb-1.5">{title}</h3>
                    <p className="text-sm leading-relaxed text-brand-negro/80">{body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* (d) Closing line + related pages */}
      <section className="section bg-brand-verde-osc text-brand-crema">
        <div className="max-w-4xl mx-auto">
          <p className="leading-relaxed mb-8 max-w-copy text-brand-crema/85">
            {c.closingLine.pre}
            <a
              href={c.closingLine.href}
              className="underline underline-offset-4 decoration-brand-oro/70 hover:text-brand-oro transition-colors"
            >
              {c.closingLine.linkLabel}
            </a>
            {c.closingLine.post}
          </p>
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
