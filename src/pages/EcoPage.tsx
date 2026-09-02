import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /desarrollos-ecologicos-en-tulum ↔ /en/eco-friendly-developments-tulum
 * Target queries: "desarrollos ecológicos en tulum", "desarrollo sustentable
 * tulum" / "eco-friendly developments tulum", "sustainable development tulum".
 * Angle: the greenwashing antidote — how to tell marketing claims from
 * verifiable commitments, with Selvadentro's own commitments as the example.
 */

const copy = {
  es: {
    eyebrow: 'Ecología verificable',
    lede: `"Ecológico" es la palabra más usada del inmobiliario en Tulum — y la menos verificada. Un desarrollo ecológico real se reconoce en documentos, no en adjetivos: en Selvadentro, ${PRICING.jungleSharePercent}% de la selva conservada por masterplan, nueve cenotes mapeados con especialistas y construcción limitada al ${PRICING.cosPercent}% de cada lote.`,
    wordTitle: '¿Cómo saber si un desarrollo es ecológico de verdad?',
    wordBody: [
      'Casi todo lo que se construye en Tulum se anuncia como ecológico, sustentable o eco-chic. Algunos proyectos lo son. Muchos usan la palabra como acabado de marketing mientras el plano cuenta otra historia. Distinguirlos no requiere fe: requiere tres preguntas.',
      '¿El compromiso está escrito en un documento que obliga — el masterplan, el reglamento de construcción? ¿Es medible — un porcentaje, un límite, una altura? ¿Alguien externo lo ha documentado? Un eslogan no resiste esas tres preguntas. Un compromiso las resiste todas.',
    ],
    tableTitle: 'Lo que dice el marketing vs. lo que puedes verificar',
    tableHead: ['Afirmación de marketing', 'Compromiso verificable'],
    tableRows: [
      ['Branding "eco-chic" y renders con selva', `${PRICING.jungleSharePercent}% de la selva preservada, escrito en el masterplan`],
      ['Paneles solares en el clubhouse', `COS ${PRICING.cosPercent}% que obliga a cada lote: la densidad es la regla, no un gesto`],
      ['"Inspirado en los cenotes"', 'Nueve cenotes reales, mapeados con especialistas y con acceso administrado'],
      ['"Rodeado de naturaleza"', 'Altura máxima de dos niveles + roof deck, para que la selva domine el perfil'],
      ['"Diseño consciente"', 'Masterplan de Estudio AMA, documentado por prensa internacional de arquitectura'],
    ],
    tableNote: 'La columna izquierda describe fórmulas frecuentes del marketing inmobiliario en la región, no un proyecto en particular.',
    commitTitle: 'Los compromisos verificables de Selvadentro',
    commitCards: [
      [
        `${PRICING.jungleSharePercent}% de selva intacta`,
        'El masterplan reserva casi dos tercios del territorio como selva conservada. No es área verde ornamental: es el ecosistema original, sin tocar.',
      ],
      [
        'Nueve cenotes protegidos',
        'Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida y Caverna fueron mapeados con especialistas antes de trazar una sola vialidad. Las calles rodean el agua, no al revés.',
      ],
      [
        'Construir para preservar',
        `COS ${PRICING.cosPercent}%, CUS ${PRICING.cusPercent}% y dos niveles + roof deck. Las reglas obligan a todos los lotes y mantienen la carga sobre el acuífero al mínimo.`,
      ],
      [
        'Infraestructura de bajo impacto',
        'Energía sustentable y red de agua subterránea, con acceso controlado y vialidades definidas desde el plano — no añadidas después.',
      ],
      [
        'Documentado por terceros',
        'El masterplan de Estudio AMA ha sido publicado por ArchEyes, Archello y ADF Web Magazine: prensa internacional de arquitectura que no depende de nosotros.',
      ],
    ],
    lotImgAlt: 'Lote de Selvadentro: 35% construible y el resto selva privada conservada',
    verifyTitle: 'Cómo verificar cualquier desarrollo (incluido este)',
    verifySteps: [
      ['Pide el masterplan', 'Busca el porcentaje de conservación escrito en el plano, no en el folleto.'],
      ['Pregunta por la normativa', 'COS, CUS y altura máxima. Si no obligan a todos los lotes, es paisajismo, no preservación.'],
      ['Pregunta quién estudió el agua', 'En zona de cenotes, el desarrollador debe poder nombrar a los especialistas que mapearon el subsuelo.'],
      ['Busca fuentes externas', 'Prensa de arquitectura, registros públicos y un equipo desarrollador con nombre y trayectoria verificables.'],
    ],
    verifyClose:
      'Nosotros pasamos por ese filtro con gusto: el equipo y su trayectoria están en la página del desarrollador, y las guías del blog explican cómo investigar cualquier proyecto en Tulum antes de firmar.',
    linksTitle: 'Sigue explorando',
    links: [
      ['/cenotes', 'Los 9 cenotes y cómo se protegen'],
      ['/desarrollador', 'El equipo detrás de Selvadentro'],
      ['/comunidad-privada-en-tulum', 'La comunidad privada, explicada'],
      ['/lotes-en-venta-tulum', 'Lotes en venta: precios y disponibilidad'],
      ['/blog', 'Guías para invertir y vivir en Tulum'],
    ],
  },
  en: {
    eyebrow: 'Verifiable ecology',
    lede: `"Eco-friendly" is the most used — and least verified — word in Tulum real estate. A genuinely ecological development shows up in documents, not adjectives: at Selvadentro, ${PRICING.jungleSharePercent}% of the jungle is preserved by masterplan, nine cenotes are mapped with specialists, and construction is capped at ${PRICING.cosPercent}% of every lot.`,
    wordTitle: 'How do you tell a genuinely eco-friendly development?',
    wordBody: [
      'Nearly everything built in Tulum is marketed as eco-friendly, sustainable or eco-chic. Some projects are. Many use the word as a marketing finish while the site plan tells a different story. Telling them apart takes no faith — just three questions.',
      'Is the commitment written into a binding document — the masterplan, the building code? Is it measurable — a percentage, a cap, a height? Has anyone outside the sales office documented it? A slogan survives none of those questions. A commitment survives all three.',
    ],
    tableTitle: 'What the marketing says vs. what you can verify',
    tableHead: ['Marketing claim', 'Verifiable commitment'],
    tableRows: [
      ['"Eco-chic" branding and jungle renders', `${PRICING.jungleSharePercent}% of the jungle preserved, written into the masterplan`],
      ['Solar panels on the clubhouse', `${PRICING.cosPercent}% max lot coverage binding every lot: density is the rule, not a gesture`],
      ['"Cenote-inspired" theming', 'Nine real cenotes, mapped with specialists, with managed access'],
      ['"Surrounded by nature"', 'A two-level + roof deck height cap, so the jungle keeps the skyline'],
      ['"Conscious design"', 'An Estudio AMA masterplan, documented by international architecture press'],
    ],
    tableNote: 'The left column describes common formulas in the region’s real-estate marketing, not any particular project.',
    commitTitle: 'Selvadentro’s verifiable commitments',
    commitCards: [
      [
        `${PRICING.jungleSharePercent}% of the jungle intact`,
        'The masterplan reserves nearly two thirds of the territory as preserved jungle. Not ornamental green area — the original ecosystem, untouched.',
      ],
      [
        'Nine cenotes protected',
        'Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida and Caverna were mapped with specialists before a single road was drawn. The streets go around the water, not the other way.',
      ],
      [
        'Build-to-preserve rules',
        `${PRICING.cosPercent}% max lot coverage, ${PRICING.cusPercent}% buildable intensity, and two levels + roof deck. The rules bind every lot and keep pressure on the aquifer to a minimum.`,
      ],
      [
        'Low-impact infrastructure',
        'Sustainable energy and an underground water network, with controlled access and roads defined on the plan — not added afterward.',
      ],
      [
        'Documented by third parties',
        'The Estudio AMA masterplan has been published by ArchEyes, Archello and ADF Web Magazine — international architecture press that does not answer to us.',
      ],
    ],
    lotImgAlt: 'A Selvadentro lot: 35% buildable, the rest preserved private jungle',
    verifyTitle: 'How to verify any development (this one included)',
    verifySteps: [
      ['Ask for the masterplan', 'Look for the preservation percentage written on the plan, not in the brochure.'],
      ['Ask about the building rules', 'Lot coverage, buildable intensity, height caps. If they don’t bind every lot, it’s landscaping, not preservation.'],
      ['Ask who studied the water', 'In cenote country, a developer should be able to name the specialists who mapped the subsoil.'],
      ['Check outside sources', 'Architecture press, public registries, and a development team with a verifiable name and track record.'],
    ],
    verifyClose:
      'We are glad to be run through that filter: the team and its track record are on the developer page, and the blog covers how to research any Tulum project before you sign.',
    linksTitle: 'Keep exploring',
    links: [
      ['/en/cenotes', 'The 9 cenotes and how they are protected'],
      ['/en/developer', 'The team behind Selvadentro'],
      ['/en/gated-community-tulum', 'The gated community, explained'],
      ['/en/tulum-land-for-sale', 'Lots for sale: pricing and availability'],
      ['/en/blog', 'Guides to buying land and living in Tulum'],
    ],
  },
} as const;

export default function EcoPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} lang={lang} />

      {/* The three-question test */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.wordTitle}</h2>
            {c.wordBody.map((p, i) => (
              <p key={i} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Claim vs commitment checklist table */}
      <section className="section bg-brand-crema-osc/40">
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
                  {c.tableRows.map(([claim, commitment]) => (
                    <tr key={claim}>
                      <td className="align-top text-brand-negro/70">{claim}</td>
                      <td className="align-top font-medium text-brand-verde-osc">{commitment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-brand-gris mt-3">{c.tableNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Verifiable commitments grid + lot image */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.commitTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.commitCards.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 3) * 80}>
                <article className="card-premium p-6 h-full">
                  <h3 className="text-xl mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">{body}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <img
                src="/lot-jungle.webp"
                alt={c.lotImgAlt}
                width={1600}
                height={1261}
                loading="lazy"
                className="rounded-2xl w-full h-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* How to verify — numbered process */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.verifyTitle}</h2>
          </Reveal>
          <ol className="grid sm:grid-cols-2 gap-5">
            {c.verifySteps.map(([title, body], i) => (
              <Reveal key={title} delay={i * 80}>
                <li className="card-premium p-6 h-full">
                  <span className="eyebrow">{lang === 'es' ? 'Paso' : 'Step'} {i + 1}</span>
                  <h3 className="text-xl mt-2 mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">{body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={240}>
            <p className="leading-relaxed max-w-copy mt-8">{c.verifyClose}</p>
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
