import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import type { PageProps } from '../routes/AppRoutes';

/**
 * Trust page — /legalidad-y-permisos ↔ /en/legal-compliance
 * Target queries: "selvadentro tulum es legal", "selvadentro permisos",
 * "selvadentro sedetus" / "is selvadentro tulum legit", "selvadentro
 * legal status".
 *
 * Documentation tone, not marketing: dates, named laws, named press
 * sources, and self-serve verification steps. The September 2025 SEDETUS
 * episode is stated openly — the five-day clearance IS the trust story.
 */

const PRESS = {
  quintanarroense:
    'https://elquintanarroense.com.mx/2025/09/11/sedetus-alerta-sobre-26-desarrollos-inmobiliarios-en-tulum-que-operan-sin-permisos-oficiales/',
  quintafuerza:
    'https://quintafuerza.mx/quintana-roo/sedetus-alerta-sobre-26-desarrollos-inmobiliarios-en-tulum-que-operan-sin-permisos-oficiales/',
  reportur:
    'https://www.reportur.com/estados-unidos/2025/09/18/tulum-alertan-sobre-26-desarrollos-inmobiliarios-sin-permisos-oficiales/',
  // The clearance itself, dated and naming Selvadentro among the 14.
  tulumTimes:
    'https://tulumtimes.com/tulum-sedetus-cleared-developments-legal-update-2025',
} as const;

const copy = {
  es: {
    eyebrow: 'Documentación',
    lede: 'Sí: Selvadentro es un desarrollo legal y verificable. SEDETUS Quintana Roo lo incluyó en su alerta del 11 de septiembre de 2025 y lo retiró en el boletín actualizado del 16 de septiembre de 2025, entre 14 desarrollos que acreditaron cumplimiento total. Aquí están las fechas, las leyes, las fuentes y cómo verificarlo tú mismo.',
    sedetusTitle: '¿Qué pasó con SEDETUS en septiembre de 2025?',
    sedetusBody: [
      'El 11 de septiembre de 2025, la Secretaría de Desarrollo Territorial Urbano Sustentable de Quintana Roo (SEDETUS) publicó una alerta con 26 desarrollos inmobiliarios en Tulum señalados por presuntamente operar sin permisos oficiales. Selvadentro apareció en esa lista inicial. No lo ocultamos: está en la prensa y las ligas están abajo.',
      'Cinco días después, el 16 de septiembre de 2025, SEDETUS publicó un boletín actualizado que retiró de la lista a 14 desarrollos — Selvadentro entre ellos — tras acreditar el cumplimiento total de la Ley de Asentamientos Humanos, la Ley de Acciones Urbanísticas, la Ley de Propiedad en Condominio y la normativa relacionada.',
      'La revisión funcionó como debe funcionar: el estado publicó una lista, cada desarrollo tuvo que demostrar sus permisos con documentos, y solo quien los tenía fue retirado. Para quien compra en Tulum, ese proceso es una buena noticia — significa que la autoridad vigila este mercado de forma activa y pública.',
    ],
    timelineHead: ['Fecha', 'Hecho'],
    timeline: [
      [
        '11 de septiembre de 2025',
        'SEDETUS publica una alerta con 26 desarrollos inmobiliarios en Tulum señalados por presuntamente carecer de permisos estatales o municipales. Selvadentro aparece en la lista inicial.',
      ],
      [
        '16 de septiembre de 2025',
        'SEDETUS publica su boletín actualizado y retira a 14 desarrollos que acreditaron cumplimiento total — Selvadentro entre ellos.',
      ],
    ],
    bulletinNote:
      'La fuente primaria es el boletín actualizado de SEDETUS del 16 de septiembre de 2025; los reportes de prensa fechados que están abajo documentan su contenido.',
    sourcesTitle: 'Las fuentes, no nuestra palabra',
    sourcesIntro: 'La cobertura es pública. Léela directamente:',
    sources: [
      {
        name: 'El Quintanarroense',
        date: '11 de septiembre de 2025',
        label: '“SEDETUS alerta sobre 26 desarrollos inmobiliarios en Tulum que operan sin permisos oficiales”',
        href: PRESS.quintanarroense,
      },
      {
        name: 'Quinta Fuerza',
        date: 'septiembre de 2025',
        label: 'Cobertura de la alerta original de SEDETUS',
        href: PRESS.quintafuerza,
      },
      {
        name: 'Reportur',
        date: '18 de septiembre de 2025',
        label: '“Tulum: alertan sobre 26 desarrollos inmobiliarios sin permisos oficiales”',
        href: PRESS.reportur,
      },
      {
        name: 'Tulum Times',
        date: '16 de septiembre de 2025',
        label: '“SEDETUS Clears 14 Tulum Developments After Legal Review” — la nota que reporta el retiro de los 14 desarrollos, Selvadentro incluido',
        href: PRESS.tulumTimes,
      },
    ],
    permitsTitle: '¿Qué permisos necesita un desarrollo en Tulum?',
    permitsIntro:
      'En Quintana Roo, un desarrollo de lotes residenciales requiere autorizaciones en dos niveles. En el estatal, los instrumentos giran alrededor de la Ley de Acciones Urbanísticas: dictámenes y constancias que validan que el proyecto puede urbanizar el suelo donde está. En el municipal, el uso de suelo y las licencias que derivan de él deben ser compatibles con el programa de desarrollo urbano vigente.',
    permitsList: [
      [
        'Uso de suelo (municipal)',
        'El predio debe permitir el uso residencial que se está vendiendo, conforme al programa de desarrollo urbano vigente.',
      ],
      [
        'Dictámenes y constancias (estatales)',
        'Validan la congruencia del proyecto con el ordenamiento territorial de Quintana Roo.',
      ],
      [
        'Autorización de acciones urbanísticas',
        'El permiso estatal para subdividir, urbanizar y comercializar lotes.',
      ],
      [
        'Régimen de propiedad',
        'En comunidades privadas, la constitución del régimen bajo la Ley de Propiedad en Condominio.',
      ],
    ],
    permitsOutro:
      'Los nombres exactos de los trámites cambian con las reformas; la lógica no. Un desarrollo en regla puede mostrarte su expediente completo sin dudarlo.',
    titleTitle: '¿Cómo se escritura la propiedad?',
    titleBody: [
      'La compraventa se formaliza en escritura pública ante notario, inscrita en el Registro Público de la Propiedad. La escritura es el título: no un contrato privado, no una promesa — el documento público que te acredita como propietario.',
      'Si eres extranjero, la franja de 50 km desde la costa (la “zona restringida”) se adquiere a través de un fideicomiso bancario: un banco mexicano sostiene el título y tú eres el beneficiario, con plenos derechos de uso, renta, venta y herencia. Es la figura estándar desde la ley de inversión extranjera de 1973, actualizada en 1993, con plazos de 50 años renovables.',
      'En la Riviera Maya, los costos de cierre suelen rondar el 6–8% del precio de compra (impuesto de adquisición, registro, notario). La constitución del fideicomiso se paga aparte, con una anualidad bancaria que típicamente va de $500 a $700 USD.',
    ],
    verifyTitle: 'Cómo verificar cualquier desarrollo tú mismo',
    verifyIntro:
      'Estos cuatro pasos aplican a Selvadentro y a cualquier otro proyecto en Tulum:',
    verifySteps: [
      [
        'Pide el expediente completo',
        'Permisos estatales y municipales, uso de suelo, autorización de acciones urbanísticas y régimen condominal. Un desarrollador en regla lo entrega; la evasión ya es una respuesta.',
      ],
      [
        'Consulta los boletines de SEDETUS',
        'La secretaría publica alertas y actualizaciones sobre desarrollos en Tulum. El episodio de septiembre de 2025 demuestra que publica tanto los señalamientos como las aclaraciones.',
      ],
      [
        'Revisa el Registro Público de la Propiedad',
        'Confirma quién es el propietario del predio que sostiene el proyecto y si existen gravámenes sobre él.',
      ],
      [
        'Valida con un notario de tu confianza',
        'Un notario que tú elijas — no el que te asignen — puede revisar el expediente y la ruta de escrituración antes de que firmes nada.',
      ],
    ],
    devLine: {
      pre: 'Sobre la trayectoria: Selvadentro es desarrollado por JJF Creando, la alianza de las familias detrás de Aldea Zamá y Yucatán Country Club. ',
      linkLabel: 'Conoce al equipo y su historial completo',
      post: '.',
      href: '/desarrollador',
    },
    linksTitle: 'Sigue verificando',
    links: [
      ['/es-seguro-invertir-en-tulum', '¿Es seguro invertir en Tulum? La guía de due diligence'],
      ['/preventa-de-terrenos-en-tulum', 'Qué revisar antes de firmar una preventa'],
      ['/desarrollador', 'El equipo detrás de Selvadentro'],
      ['/lotes-en-venta-tulum', 'Lotes disponibles en Suspiro'],
      ['/preguntas-frecuentes', 'Preguntas frecuentes'],
    ],
  },
  en: {
    eyebrow: 'Documentation',
    lede: 'Yes — Selvadentro is a legal, verifiable development. SEDETUS Quintana Roo included it in its September 11, 2025 alert and removed it in the updated September 16, 2025 bulletin, among 14 developments that proved full compliance. Here are the dates, the named laws, the press sources, and how to verify all of it yourself.',
    sedetusTitle: 'What happened with SEDETUS in September 2025?',
    sedetusBody: [
      'On September 11, 2025, Quintana Roo’s urban development authority — SEDETUS, the Secretaría de Desarrollo Territorial Urbano Sustentable — published an alert listing 26 Tulum developments flagged for allegedly operating without official permits. Selvadentro was on that initial list. We don’t hide it: it is in the press, and the links are below.',
      'Five days later, on September 16, 2025, SEDETUS published an updated bulletin removing 14 developments from the list — Selvadentro among them — after they proved full compliance with the Ley de Asentamientos Humanos, the Ley de Acciones Urbanísticas, the Ley de Propiedad en Condominio and related regulations.',
      'The review worked the way a review should: the state published a list, every development had to prove its permits with documents, and only those that had them were removed. If you are buying in Tulum, that process is good news — it means the authority polices this market actively and in public.',
    ],
    timelineHead: ['Date', 'What happened'],
    timeline: [
      [
        'September 11, 2025',
        'SEDETUS publishes an alert listing 26 Tulum developments flagged for allegedly lacking state or municipal permits. Selvadentro appears on the initial list.',
      ],
      [
        'September 16, 2025',
        'SEDETUS publishes its updated bulletin and removes 14 developments that proved full compliance — Selvadentro among them.',
      ],
    ],
    bulletinNote:
      'The primary source is the updated SEDETUS bulletin of September 16, 2025; the dated press reports below document its contents.',
    sourcesTitle: 'The sources, not our word',
    sourcesIntro: 'The coverage is public. Read it directly:',
    sources: [
      {
        name: 'El Quintanarroense',
        date: 'September 11, 2025',
        label: '“SEDETUS alerta sobre 26 desarrollos inmobiliarios en Tulum que operan sin permisos oficiales” (Spanish)',
        href: PRESS.quintanarroense,
      },
      {
        name: 'Quinta Fuerza',
        date: 'September 2025',
        label: 'Coverage of the original SEDETUS alert (Spanish)',
        href: PRESS.quintafuerza,
      },
      {
        name: 'Reportur',
        date: 'September 18, 2025',
        label: '“Tulum: alertan sobre 26 desarrollos inmobiliarios sin permisos oficiales” (Spanish)',
        href: PRESS.reportur,
      },
      {
        name: 'Tulum Times',
        date: 'September 16, 2025',
        label: '“SEDETUS Clears 14 Tulum Developments After Legal Review” — the report naming the 14 cleared developments, Selvadentro among them',
        href: PRESS.tulumTimes,
      },
    ],
    permitsTitle: 'What permits does a Tulum development need?',
    permitsIntro:
      'In Quintana Roo, a residential land development needs authorizations at two levels. At the state level, the instruments revolve around the Ley de Acciones Urbanísticas: dictámenes (technical rulings) and constancias (certificates) confirming the project may urbanize the land it sits on. At the municipal level, the land-use designation — uso de suelo — and the licenses that flow from it must match the urban development program in force.',
    permitsList: [
      [
        'Land use (municipal)',
        'The parcel must allow the residential use being sold, under the current urban development program.',
      ],
      [
        'State rulings and certificates',
        'Dictámenes and constancias confirming the project is consistent with Quintana Roo’s territorial planning.',
      ],
      [
        'Urban development authorization',
        'The state permit to subdivide, urbanize and sell lots — the autorización de acciones urbanísticas.',
      ],
      [
        'Property regime',
        'For gated communities, the regime constituted under the Ley de Propiedad en Condominio.',
      ],
    ],
    permitsOutro:
      'The exact paperwork names shift with legal reforms; the logic does not. A compliant development can show you its full expediente — its permit file — without hesitation.',
    titleTitle: 'How is ownership titled?',
    titleBody: [
      'The purchase is formalized as an escritura pública — a deed signed before a Mexican notary and recorded at the Public Registry of Property. The deed is the title: not a private contract, not a promise, but the public document that makes you the owner.',
      'Foreign buyers within 50 km of the coast (the “restricted zone”) hold title through a fideicomiso: a bank trust in which a Mexican bank holds the deed and you are the beneficiary, with full rights to use, rent, sell and inherit. It has been the standard structure since Mexico’s 1973 foreign investment law, updated in 1993, on 50-year renewable terms.',
      'On the Riviera Maya, closing costs typically run 6–8% of the purchase price (acquisition tax, registry, notary). The fideicomiso setup is billed separately, with a bank annuity typically of $500–700 USD per year.',
    ],
    verifyTitle: 'How to verify any development yourself',
    verifyIntro:
      'These four steps apply to Selvadentro and to any other project in Tulum:',
    verifySteps: [
      [
        'Ask for the full expediente',
        'State and municipal permits, land use, the urban development authorization and the condominium regime. A compliant developer hands it over; evasion is an answer in itself.',
      ],
      [
        'Check the SEDETUS bulletins',
        'The authority publishes alerts and updates on Tulum developments. The September 2025 episode shows it publishes both the flags and the clearances.',
      ],
      [
        'Search the Public Registry of Property',
        'Confirm who owns the land under the project and whether any liens exist on it.',
      ],
      [
        'Validate with a notary you choose',
        'A notary of your own choosing — not one assigned to you — can review the file and the titling path before you sign anything.',
      ],
    ],
    devLine: {
      pre: 'On track record: Selvadentro is developed by JJF Creando, the alliance of the families behind Aldea Zamá and Yucatán Country Club. ',
      linkLabel: 'Meet the team and its full history',
      post: '.',
      href: '/en/developer',
    },
    linksTitle: 'Keep verifying',
    links: [
      ['/en/is-it-safe-to-buy-property-in-tulum', 'Is it safe to buy in Tulum? The due-diligence guide'],
      ['/en/pre-construction-lots-tulum', 'What to review before signing any pre-sale'],
      ['/en/developer', 'The team behind Selvadentro'],
      ['/en/tulum-land-for-sale', 'Available lots in Suspiro'],
      ['/en/faq', 'Frequently asked questions'],
    ],
  },
} as const;

export default function LegalPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} lang={lang} />

      {/* (a) The direct answer, with dates, laws and sources */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.sedetusTitle}</h2>
            {c.sedetusBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={80}>
            <div className="table-shell lg:-mx-24 xl:-mx-32 mt-6">
              <table className="table-premium text-sm sm:text-base">
                <thead>
                  <tr>
                    {c.timelineHead.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.timeline.map(([date, event]) => (
                    <tr key={date}>
                      <th scope="row" className="font-medium text-brand-verde-osc sm:whitespace-nowrap align-top">
                        {date}
                      </th>
                      <td>{event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* SEDETUS does not publish these bulletins at a stable public URL and
                the owner could not obtain the PDF, so the citation chain rests on
                the four dated press reports below — which is what bulletinNote now
                says. Closed deliberately: do not reopen without the document. */}
            <p className="text-sm text-brand-gris mt-3">{c.bulletinNote}</p>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="font-serif text-xl sm:text-2xl text-brand-verde-osc mt-10 mb-3">
              {c.sourcesTitle}
            </h3>
            <p className="leading-relaxed mb-4">{c.sourcesIntro}</p>
            <ul className="space-y-3">
              {c.sources.map((s) => (
                <li key={s.name} className="text-sm sm:text-base leading-relaxed">
                  <span className="font-medium text-brand-verde-osc">{s.name}</span>
                  <span className="text-brand-gris"> · {s.date} — </span>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-brand-oro/70 hover:text-brand-verde transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* (b) What permits a Tulum development needs */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.permitsTitle}</h2>
            <p className="leading-relaxed mb-6 max-w-copy">{c.permitsIntro}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {c.permitsList.map(([term, def], i) => (
              <Reveal key={term} delay={i * 80}>
                <div className="card-premium p-6 h-full">
                  <h3 className="text-lg sm:text-xl mb-2">{term}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">{def}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <p className="leading-relaxed mt-6 max-w-copy">{c.permitsOutro}</p>
          </Reveal>
        </div>
      </section>

      {/* (c) How ownership is titled */}
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

      {/* (d) How to verify it yourself */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-3">{c.verifyTitle}</h2>
            <p className="leading-relaxed mb-8 max-w-copy">{c.verifyIntro}</p>
          </Reveal>
          <ol className="space-y-5">
            {c.verifySteps.map(([title, body], i) => (
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

      {/* (e) Developer track record + keep-verifying links */}
      <section className="section bg-brand-verde-osc text-brand-crema">
        <div className="max-w-4xl mx-auto">
          <p className="leading-relaxed mb-8 max-w-copy text-brand-crema/85">
            {c.devLine.pre}
            <a
              href={c.devLine.href}
              className="underline underline-offset-4 decoration-brand-oro/70 hover:text-brand-oro transition-colors"
            >
              {c.devLine.linkLabel}
            </a>
            {c.devLine.post}
          </p>
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
