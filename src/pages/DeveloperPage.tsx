import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { AUTHORS } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /desarrollador ↔ /en/developer — the E-E-A-T anchor page.
 * Target queries: "quién desarrolla selvadentro", "jjf creando" /
 * "selvadentro developer", "who is behind selvadentro tulum".
 * Blog bylines deep-link to the #juan-camara / #omar-curi author sections
 * below — those ids are load-bearing, do not rename them.
 */

const PRINCIPALS = [
  {
    nameEs: 'Juan Enrique Cámara Solís',
    nameEn: 'Juan Enrique Cámara Solís',
    bodyEs:
      'Décadas desarrollando proyectos de referencia en el sureste mexicano: Aldea Zamá en Tulum y Yucatán Country Club en Mérida, entre otros. Su trayectoria es la columna vertebral de la alianza.',
    bodyEn:
      'Decades spent developing benchmark projects across southeast Mexico: Aldea Zamá in Tulum and Yucatán Country Club in Mérida, among others. His track record is the backbone of the alliance.',
  },
  {
    nameEs: 'Fernando Martínez Zurita',
    nameEn: 'Fernando Martínez Zurita',
    bodyEs:
      'A través de Mazza Capital ha estructurado y desarrollado proyectos boutique de alto valor en Yucatán — la disciplina financiera y el enfoque de detalle detrás de Selvadentro.',
    bodyEn:
      'Through Mazza Capital he has structured and developed boutique, high-value projects in Yucatán — the financial discipline and eye for detail behind Selvadentro.',
  },
  {
    nameEs: 'Juan Esteban Cámara Cámara',
    nameEn: 'Juan Esteban Cámara Cámara',
    bodyEs:
      'Segunda generación. Dirige Selvadentro con la encomienda de llevar el legado familiar a su expresión más ambiciosa: una comunidad construida alrededor de nueve cenotes.',
    bodyEn:
      'Second generation. He leads Selvadentro with the mandate of taking the family legacy to its most ambitious expression: a community built around nine cenotes.',
  },
] as const;

const PORTFOLIO = [
  {
    src: '/portfolio-aldea-zama.webp',
    width: 1040,
    height: 640,
    captionEs: 'Aldea Zamá, Tulum — desarrollado por la familia Cámara',
    captionEn: 'Aldea Zamá, Tulum — developed by the Cámara family',
    altEs: 'Aldea Zamá en Tulum, proyecto previo del equipo de JJF Creando',
    altEn: 'Aldea Zamá in Tulum, a previous project by the JJF Creando team',
  },
  {
    src: '/portfolio-yucatan-country-club.webp',
    width: 1000,
    height: 420,
    captionEs: 'Yucatán Country Club, Mérida — desarrollado por la familia Cámara',
    captionEn: 'Yucatán Country Club, Mérida — developed by the Cámara family',
    altEs: 'Yucatán Country Club en Mérida, proyecto previo del equipo de JJF Creando',
    altEn: 'Yucatán Country Club in Mérida, a previous project by the JJF Creando team',
  },
  {
    src: '/portfolio-chable-resort.webp',
    width: 990,
    height: 680,
    captionEs: 'Chablé Resort — obra de Maat Handasa, AHEAD Americas 2017',
    captionEn: 'Chablé Resort — built by Maat Handasa, AHEAD Americas 2017',
    altEs: 'Chablé Resort, construido por Maat Handasa, arquitectos de las amenidades de Selvadentro',
    altEn: 'Chablé Resort, built by Maat Handasa, architects of the Selvadentro amenities',
  },
  {
    src: '/portfolio-casa-chacala.webp',
    width: 1000,
    height: 660,
    captionEs: 'Casa Chacala — Estudio AMA',
    captionEn: 'Casa Chacala — Estudio AMA',
    altEs: 'Casa Chacala, proyecto de Estudio AMA, autores del masterplan de Selvadentro',
    altEn: 'Casa Chacala, a project by Estudio AMA, authors of the Selvadentro masterplan',
  },
] as const;

const copy = {
  es: {
    eyebrow: 'El desarrollador',
    lede: 'Selvadentro es el primer proyecto de JJF Creando: la alianza de las familias detrás de Aldea Zamá en Tulum y Yucatán Country Club en Mérida, junto con Mazza Capital. El masterplan es de Estudio AMA y la arquitectura de amenidades de Maat Handasa, el despacho que construyó Chablé Resort.',
    whoTitle: '¿Quién es JJF Creando?',
    whoBody: [
      'JJF Creando es una alianza entre dos familias con historia comprobada en el desarrollo inmobiliario premium del sureste mexicano, junto con Mazza Capital. No es un nombre con décadas de antigüedad — es un equipo con décadas de obra entregada que se unió para un solo propósito: Selvadentro.',
      'Esa distinción importa cuando compras tierra en preventa. Lo que respalda la promesa de entrega en 2029 no es un logotipo: son Aldea Zamá, Yucatán Country Club y un portafolio boutique en Yucatán — proyectos que ya existen, ya se entregaron y ya se pueden visitar.',
    ],
    jjfLogoAlt: 'Logotipo de JJF Creando, desarrollador de Selvadentro Tulum',
    principalsTitle: 'Tres trayectorias al frente',
    portfolioTitle: 'El portafolio que respalda',
    portfolioNote:
      'Proyectos entregados por el equipo desarrollador y sus despachos de arquitectura. La mejor referencia de lo que será Selvadentro es lo que este equipo ya construyó.',
    archTitle: 'Los arquitectos: Estudio AMA y Maat Handasa',
    archBody: [
      'El masterplan de Selvadentro es de Estudio AMA. Antes de trazar una sola vialidad, los nueve cenotes se maparon con especialistas y el plano se acomodó alrededor del agua — el 65% de la selva permanece intacto. Ese enfoque llevó al masterplan a la prensa internacional de arquitectura: ArchEyes, Archello, ADF Web Magazine y Amazing Architecture lo han publicado.',
      'La arquitectura de las amenidades es de Maat Handasa, el despacho que construyó Chablé Resort — ganador del AHEAD Americas 2017. Es el estándar de hospitalidad que llega a la Casa de los Cenotes, el wellness center y las demás experiencias del proyecto.',
    ],
    amaLogoAlt: 'Logotipo de Estudio AMA, autores del masterplan de Selvadentro',
    maatLogoAlt: 'Logotipo de Maat Handasa, arquitectos de las amenidades de Selvadentro',
    authorsTitle: 'Quiénes firman lo que lees',
    authorsIntro:
      'Los contenidos de este sitio — las guías, los datos, el blog — los firman dos personas del equipo, no una redacción anónima. Puedes escribirles directamente.',
    authorBios: {
      'juan-camara':
        'Juan Cámara encabeza la Dirección General de Selvadentro. Supervisa la ejecución del masterplan y los compromisos del proyecto — de la conservación del 65% de la selva a la entrega de Suspiro en 2029. En este sitio firma los contenidos sobre el proyecto, su legalidad y el mercado de tierra en Tulum.',
      'omar-curi':
        'Omar Curi encabeza la Dirección Comercial de Selvadentro. Acompaña a los compradores en todo el proceso: la elección del lote, el plan de pagos a 48 meses y la escrituración. En este sitio firma las guías sobre el proceso de compra y la inversión en Tulum.',
    },
    contactLabel: 'Contacto:',
    ctaTitle: 'Verifícalo tú mismo',
    ctaLinks: [
      ['/legalidad-y-permisos', 'Legalidad y permisos verificados por SEDETUS'],
      ['/inversion', 'La inversión en números'],
      ['/desarrollos-ecologicos-en-tulum', 'El enfoque ecológico del masterplan'],
      ['/lotes-en-venta-tulum', 'Lotes en venta en Suspiro'],
      ['/blog', 'Las guías firmadas por el equipo'],
    ],
  },
  en: {
    eyebrow: 'The developer',
    lede: 'Selvadentro is the first project by JJF Creando: an alliance of the families behind Aldea Zamá in Tulum and Yucatán Country Club in Mérida, together with Mazza Capital. The masterplan is by Estudio AMA, and the amenity architecture by Maat Handasa — the firm that built Chablé Resort.',
    whoTitle: 'Who is JJF Creando?',
    whoBody: [
      'JJF Creando is an alliance between two families with a proven history in premium real estate across southeast Mexico, together with Mazza Capital. It is not a decades-old name — it is a team with decades of delivered work, assembled for a single purpose: Selvadentro.',
      'That distinction matters when you buy pre-construction land. What backs the 2029 delivery promise is not a logo: it is Aldea Zamá, Yucatán Country Club and a boutique portfolio in Yucatán — projects that already exist, were already delivered, and can be visited today.',
    ],
    jjfLogoAlt: 'JJF Creando logo, developer of Selvadentro Tulum',
    principalsTitle: 'Three track records at the helm',
    portfolioTitle: 'The portfolio behind the promise',
    portfolioNote:
      'Projects delivered by the development team and its architecture firms. The best reference for what Selvadentro will be is what this team has already built.',
    archTitle: 'The architects: Estudio AMA and Maat Handasa',
    archBody: [
      'Selvadentro’s masterplan is by Estudio AMA. Before a single road was drawn, the nine cenotes were mapped with specialists and the plan was arranged around the water — 65% of the jungle stays untouched. That approach carried the masterplan into the international architecture press: ArchEyes, Archello, ADF Web Magazine and Amazing Architecture have all covered it.',
      'The amenity architecture is by Maat Handasa, the firm that built Chablé Resort — winner of AHEAD Americas 2017. That is the hospitality standard arriving at the Casa de los Cenotes, the wellness center and the project’s other experiences.',
    ],
    amaLogoAlt: 'Estudio AMA logo, authors of the Selvadentro masterplan',
    maatLogoAlt: 'Maat Handasa logo, architects of the Selvadentro amenities',
    authorsTitle: 'Who signs what you read',
    authorsIntro:
      'The content on this site — the guides, the data, the blog — is signed by two people on the team, not an anonymous newsroom. You can write to them directly.',
    authorBios: {
      'juan-camara':
        'Juan Cámara leads Selvadentro’s General Direction. He oversees the execution of the masterplan and the project’s commitments — from preserving 65% of the jungle to delivering Suspiro in 2029. On this site he signs the content about the project, its legal standing and the Tulum land market.',
      'omar-curi':
        'Omar Curi leads Selvadentro’s Commercial Direction. He walks buyers through the entire process: choosing a lot, the 48-month payment plan and titling. On this site he signs the guides on the buying process and investing in Tulum.',
    },
    contactLabel: 'Contact:',
    ctaTitle: 'Verify it yourself',
    ctaLinks: [
      ['/en/legal-compliance', 'Legal status verified by SEDETUS'],
      ['/en/investment', 'The investment, in numbers'],
      ['/en/eco-friendly-developments-tulum', 'The masterplan’s ecological approach'],
      ['/en/tulum-land-for-sale', 'Lots for sale in Suspiro'],
      ['/en/blog', 'The guides signed by the team'],
    ],
  },
} as const;

export default function DeveloperPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];
  const es = lang === 'es';

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} />

      {/* 1. Who is JJF Creando */}
      <section className="section">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <Reveal>
            <h2 className="h2-section mb-5">{c.whoTitle}</h2>
            {c.whoBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <img
              src="/jjf-creando.webp"
              alt={c.jjfLogoAlt}
              width={1080}
              height={1080}
              loading="lazy"
              className="w-40 sm:w-52 h-auto mx-auto"
            />
          </Reveal>
        </div>
      </section>

      {/* 2. The three principals */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.principalsTitle}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {PRINCIPALS.map((p, i) => (
              <Reveal key={p.nameEs} delay={i * 80}>
                <article className="card-premium p-6 h-full">
                  <h3 className="text-xl mb-3">{es ? p.nameEs : p.nameEn}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">
                    {es ? p.bodyEs : p.bodyEn}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Portfolio */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-3">{c.portfolioTitle}</h2>
            <p className="text-sm text-brand-gris mb-8 max-w-copy">{c.portfolioNote}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {PORTFOLIO.map((item, i) => (
              <Reveal key={item.src} delay={(i % 2) * 80}>
                <figure>
                  <img
                    src={item.src}
                    alt={es ? item.altEs : item.altEn}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="rounded-2xl w-full aspect-[3/2] object-cover"
                  />
                  <figcaption className="text-sm text-brand-gris mt-2">
                    {es ? item.captionEs : item.captionEn}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The architects */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.archTitle}</h2>
            {c.archBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 mt-8">
              <img
                src="/ama-estudio.svg"
                alt={c.amaLogoAlt}
                width={560}
                height={90}
                loading="lazy"
                className="h-8 w-auto"
              />
              <img
                src="/maat-handasa.webp"
                alt={c.maatLogoAlt}
                width={380}
                height={119}
                loading="lazy"
                className="h-10 w-auto"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Authors — anchor targets for blog bylines (#juan-camara / #omar-curi) */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-4">{c.authorsTitle}</h2>
            <p className="leading-relaxed mb-8 max-w-copy">{c.authorsIntro}</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {(Object.keys(AUTHORS) as Array<keyof typeof AUTHORS>).map((id, i) => {
              const author = AUTHORS[id];
              return (
                <Reveal key={id} delay={i * 80}>
                  <section
                    id={id}
                    className="card-premium p-6 h-full scroll-mt-28"
                  >
                    <span className="eyebrow">{es ? author.roleEs : author.roleEn}</span>
                    <h3 className="text-xl mt-2 mb-3">{author.name}</h3>
                    <p className="text-sm leading-relaxed text-brand-negro/80 mb-4">
                      {c.authorBios[id]}
                    </p>
                    <p className="text-sm text-brand-gris">
                      {c.contactLabel}{' '}
                      <a
                        href="mailto:info@selvadentrotulum.com"
                        className="underline underline-offset-4 decoration-brand-oro/70 hover:text-brand-verde-osc transition-colors"
                      >
                        info@selvadentrotulum.com
                      </a>
                    </p>
                  </section>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Keep exploring */}
      <section className="section bg-brand-verde-osc text-brand-crema">
        <div className="max-w-4xl mx-auto">
          <h2 className="h2-section mb-6 text-brand-crema">{c.ctaTitle}</h2>
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
