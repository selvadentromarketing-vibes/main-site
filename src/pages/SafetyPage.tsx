import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * Fear-query page — /es-seguro-invertir-en-tulum ↔
 * /en/is-it-safe-to-buy-property-in-tulum
 * Target queries: "es seguro invertir en tulum", "es seguro comprar
 * terreno en tulum" / "is it safe to buy property in tulum", "tulum real
 * estate scams".
 *
 * A buyer's GENERAL safety guide: red flags vs green flags, the SEDETUS
 * verification steps (the extractable asset), titling basics, and honest
 * market-risk framing. Selvadentro's own papers live on
 * /legalidad-y-permisos — this page teaches how to check anyone's.
 */

const copy = {
  es: {
    eyebrow: 'Guía de compra',
    lede: 'Sí, es seguro comprar terreno en Tulum — siempre que verifiques antes de firmar. Tres cosas deciden el riesgo: los permisos del desarrollo, la ruta hacia tu escritura y la trayectoria del desarrollador. Esta guía te da el checklist de verificación con SEDETUS y el Registro Público, y las señales que descartan un proyecto.',
    flagsTitle: '¿Cómo distingo un desarrollo confiable de uno riesgoso?',
    flagsIntro:
      'El riesgo en Tulum casi nunca está en la ciudad; está en el desarrollo que eliges. La mayoría de los problemas se anuncian desde la primera visita — si sabes qué mirar.',
    flagsHead: ['Señal de alerta', 'Señal de confianza'],
    flags: [
      [
        'Evade la pregunta cuando pides el expediente de permisos.',
        'Muestra permisos estatales y municipales completos, sin dudarlo.',
      ],
      [
        'Vende con contratos privados y “la escritura después”.',
        'Tiene una ruta clara a escritura pública ante notario — y fideicomiso si eres extranjero.',
      ],
      [
        'Promete rendimientos garantizados.',
        'Presenta las proyecciones como proyecciones, con fechas y fuentes.',
      ],
      [
        'Presiona a apartar “hoy mismo” con depósitos a cuentas personales.',
        'Formaliza cada pago con contrato, a nombre de la empresa desarrolladora.',
      ],
      [
        'No tiene trayectoria verificable ni proyectos entregados.',
        'Sus principales tienen nombre y proyectos terminados que puedes visitar.',
      ],
      [
        'Precios sin historial, que “cambian” según el cliente.',
        'Historial de precios documentado y condiciones por escrito.',
      ],
    ],
    stepsTitle: 'Cómo verificar un desarrollo en Tulum, paso a paso',
    stepsIntro:
      'Este es el proceso completo. Aplícalo a cualquier proyecto — incluido el nuestro.',
    steps: [
      [
        'Pide el expediente al desarrollador',
        'Permisos estatales y municipales, uso de suelo y autorización de acciones urbanísticas. Pídelo por escrito; la reacción a esa solicitud ya es información.',
      ],
      [
        'Consulta los boletines de SEDETUS Quintana Roo',
        'La secretaría publica alertas y actualizaciones sobre desarrollos en Tulum. Busca el nombre del proyecto en sus comunicados más recientes.',
      ],
      [
        'Verifica el predio en el Registro Público de la Propiedad',
        'Confirma que el desarrollador — o el fideicomiso que sostiene el proyecto — es dueño del terreno y que no existen gravámenes.',
      ],
      [
        'Revisa la ruta de escrituración con un notario independiente',
        'Un notario que tú elijas puede validar el expediente y decirte exactamente cómo y cuándo tendrías tu escritura.',
      ],
      [
        'Visita el proyecto y compara contra lo prometido',
        'Los accesos, la infraestructura y los avances existen o no existen. En sitio se resuelven más dudas que en cualquier brochure.',
      ],
    ],
    titleTitle: '¿Cómo protejo mi dinero al escriturar?',
    titleBody: [
      'Tu protección es la escritura pública: se firma ante notario y se inscribe en el Registro Público de la Propiedad. Hasta ese momento, un contrato privado es solo un contrato — útil, pero no un título. Todo desarrollo serio puede explicarte en qué fecha y bajo qué condiciones llegas a la escritura.',
      'Si eres extranjero, la franja de 50 km desde la costa se adquiere mediante fideicomiso bancario: un banco mexicano sostiene el título y tú eres el beneficiario, con plenos derechos de uso, renta, venta y herencia. Es la figura estándar desde la ley de inversión extranjera de 1973, actualizada en 1993, con plazos de 50 años renovables.',
      'Presupuesta los costos de cierre desde el inicio: en la Riviera Maya suelen ser del 6–8% del precio (impuesto de adquisición, registro, notario), más la constitución del fideicomiso y su anualidad bancaria, típicamente de $500 a $700 USD. Un desarrollador serio te los desglosa sin que lo pidas.',
    ],
    sedetusTitle: '¿El estado realmente vigila el mercado? El caso de 2025',
    sedetusBody: [
      'En septiembre de 2025, SEDETUS — la autoridad de desarrollo urbano de Quintana Roo — publicó una alerta con 26 desarrollos en Tulum señalados por presuntamente operar sin permisos. Cinco días después, su boletín actualizado retiró a los 14 que acreditaron cumplimiento total. Selvadentro estuvo en la primera lista y salió en la segunda.',
      'Para un comprador, el episodio deja dos lecciones. La primera: la autoridad revisa este mercado de forma activa y pública — eso protege a quien compra. La segunda: la diferencia entre un susto y un problema es el expediente. Los desarrollos con permisos lo demostraron en días.',
    ],
    sedetusLink: {
      pre: 'La documentación de Selvadentro — fechas, leyes y fuentes de prensa — está publicada en ',
      linkLabel: 'legalidad y permisos',
      post: '.',
      href: '/legalidad-y-permisos',
    },
    imgAlt: 'Vista aérea en render del masterplan de Selvadentro, entre la selva de Tulum',
    riskTitle: '¿Y el riesgo de mercado? Hablemos claro.',
    riskBody: [
      `Ningún checklist elimina el riesgo de mercado. En Selvadentro, el metro cuadrado pasó de $${PRICING.launchPricePerM2USD} USD en ${PRICING.launchDateLabelEs} a $${PRICING.pricePerM2USD} USD hoy — eso es historial documentado. La proyección de cierre de $${PRICING.projectedClosePerM2USD} USD/m² es exactamente eso: una proyección del desarrollador, no una promesa. Trátala así, aquí y en cualquier otro proyecto.`,
      'Compra con un horizonte que tolere ciclos, con números que entiendas y con papeles que ya verificaste. Esa es la diferencia entre invertir y apostar.',
    ],
    linksTitle: 'Para hacer tu propia verificación',
    links: [
      ['/legalidad-y-permisos', 'La documentación de Selvadentro ante SEDETUS'],
      ['/plusvalia-en-tulum', 'Plusvalía en Tulum: los datos, no la promesa'],
      ['/preventa-de-terrenos-en-tulum', 'Cómo funciona una preventa de terrenos'],
      ['/desarrollador', 'Quién desarrolla Selvadentro'],
      ['/preguntas-frecuentes', 'Preguntas frecuentes'],
    ],
  },
  en: {
    eyebrow: 'Buyer’s guide',
    lede: 'Yes — buying property in Tulum is safe, provided you verify before you sign. Three things decide the risk: the development’s permits, the path to your deed, and the developer’s track record. This guide gives you the verification checklist using SEDETUS and the Public Registry, plus the warning signs that rule a project out.',
    flagsTitle: 'How do I tell a solid development from a risky one?',
    flagsIntro:
      'The risk in Tulum is rarely the town; it is the development you choose. Most problems announce themselves on the first visit — if you know what to look for.',
    flagsHead: ['Red flag', 'Green flag'],
    flags: [
      [
        'Dodges the question when you ask for the permit file.',
        'Shows complete state and municipal permits without hesitation.',
      ],
      [
        'Sells on private contracts with “the deed comes later”.',
        'Has a clear path to a notarized public deed — and a fideicomiso if you are foreign.',
      ],
      [
        'Promises guaranteed returns.',
        'Labels projections as projections, with dates and sources.',
      ],
      [
        'Pushes you to reserve “today only”, wiring to personal accounts.',
        'Formalizes every payment with a contract, in the developer entity’s name.',
      ],
      [
        'No verifiable track record, no delivered projects.',
        'Named principals with finished projects you can go visit.',
      ],
      [
        'Prices with no history, “adjusted” per client.',
        'A documented price history and terms in writing.',
      ],
    ],
    stepsTitle: 'How to verify a Tulum development, step by step',
    stepsIntro:
      'This is the full process. Run it on any project — including ours.',
    steps: [
      [
        'Ask the developer for the permit file',
        'State and municipal permits, land use and the urban development authorization (the expediente). Ask in writing; the reaction to that request is information in itself.',
      ],
      [
        'Check the SEDETUS Quintana Roo bulletins',
        'The state’s urban development authority publishes alerts and updates on Tulum developments. Search for the project’s name in its most recent communications.',
      ],
      [
        'Search the parcel at the Public Registry of Property',
        'Confirm the developer — or the trust holding the project — actually owns the land, and that no liens sit on it.',
      ],
      [
        'Review the titling path with an independent notary',
        'A notary you choose can validate the file and tell you exactly how and when you would hold your deed.',
      ],
      [
        'Visit the project and compare against the pitch',
        'Access roads, infrastructure and progress either exist or they don’t. A site visit settles more doubts than any brochure.',
      ],
    ],
    titleTitle: 'How do I protect my money at closing?',
    titleBody: [
      'Your protection is the escritura pública — the deed signed before a Mexican notary and recorded at the Public Registry of Property. Until then, a private contract is just a contract: useful, but not a title. Any serious development can tell you on what date, and under what conditions, you reach the deed.',
      'If you are a foreign buyer, property within 50 km of the coast is held through a fideicomiso: a bank trust in which a Mexican bank holds the deed and you are the beneficiary, with full rights to use, rent, sell and inherit. It has been the standard structure since Mexico’s 1973 foreign investment law, updated in 1993, on 50-year renewable terms.',
      'Budget closing costs from the start: on the Riviera Maya they typically run 6–8% of the purchase price (acquisition tax, registry, notary), plus the fideicomiso setup and its bank annuity, typically $500–700 USD per year. A serious developer itemizes them before you ask.',
    ],
    sedetusTitle: 'Does the state actually police this market? The 2025 case',
    sedetusBody: [
      'In September 2025, SEDETUS — Quintana Roo’s urban development authority — published an alert listing 26 Tulum developments flagged for allegedly operating without permits. Five days later, its updated bulletin removed the 14 that proved full compliance. Selvadentro was on the first list and off the second.',
      'For a buyer, the episode carries two lessons. First: the authority reviews this market actively and in public — that protects you. Second: the difference between a scare and a problem is the permit file. The compliant developments proved it within days.',
    ],
    sedetusLink: {
      pre: 'Selvadentro’s own documentation — dates, laws and press sources — is published on the ',
      linkLabel: 'legal compliance page',
      post: '.',
      href: '/en/legal-compliance',
    },
    imgAlt: 'Aerial render of the Selvadentro masterplan within the Tulum jungle',
    riskTitle: 'And market risk? Let’s be honest.',
    riskBody: [
      `No checklist removes market risk. At Selvadentro, the square meter went from $${PRICING.launchPricePerM2USD} USD in ${PRICING.launchDateLabelEn} to $${PRICING.pricePerM2USD} USD today — that is documented history. The $${PRICING.projectedClosePerM2USD} USD/m² closing figure is exactly what it sounds like: a developer projection, not a promise. Treat it that way here, and everywhere else.`,
      'Buy with a horizon that tolerates cycles, with numbers you understand, and with papers you have already verified. That is the difference between investing and gambling.',
    ],
    linksTitle: 'For your own due diligence',
    links: [
      ['/en/legal-compliance', 'Selvadentro’s documentation before SEDETUS'],
      ['/en/tulum-property-appreciation-data', 'Tulum appreciation: the data, not the promise'],
      ['/en/pre-construction-lots-tulum', 'How land pre-construction works'],
      ['/en/developer', 'Who develops Selvadentro'],
      ['/en/faq', 'Frequently asked questions'],
    ],
  },
} as const;

export default function SafetyPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} lang={lang} />

      {/* (a) Red flags vs green flags */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.flagsTitle}</h2>
            <p className="leading-relaxed mb-6">{c.flagsIntro}</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="table-shell lg:-mx-24 xl:-mx-32">
              <table className="table-premium text-sm sm:text-base">
                <thead>
                  <tr>
                    {c.flagsHead.map((h) => (
                      <th key={h} scope="col" className="w-1/2">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.flags.map(([red, green]) => (
                    <tr key={red}>
                      <td className="align-top text-brand-negro/80">{red}</td>
                      <td className="align-top text-brand-verde-osc">{green}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* (b) The SEDETUS verification steps — the extractable asset */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-3">{c.stepsTitle}</h2>
            <p className="leading-relaxed mb-8 max-w-copy">{c.stepsIntro}</p>
          </Reveal>
          <ol className="space-y-5">
            {c.steps.map(([title, body], i) => (
              <Reveal key={title} delay={i * 80}>
                <li className="flex gap-4 sm:gap-5 card-premium p-6">
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

      {/* (c) Title, closing costs and the fideicomiso */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.titleTitle}</h2>
            {c.titleBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* (d) The 2025 SEDETUS episode: the state polices the market */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="h2-section mb-5">{c.sedetusTitle}</h2>
            {c.sedetusBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
            <p className="leading-relaxed max-w-copy">
              {c.sedetusLink.pre}
              <a
                href={c.sedetusLink.href}
                className="underline underline-offset-4 decoration-brand-oro/70 text-brand-verde-osc hover:text-brand-verde transition-colors"
              >
                {c.sedetusLink.linkLabel}
              </a>
              {c.sedetusLink.post}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <img
              src="/render-aerial.webp"
              alt={c.imgAlt}
              width={1600}
              height={1200}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* (e) Market-risk honesty */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.riskTitle}</h2>
            {c.riskBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
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
