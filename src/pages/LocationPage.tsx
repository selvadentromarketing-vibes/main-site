import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { translations } from '../i18n/translations';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /ubicacion ↔ /en/location — where Selvadentro actually is.
 * Target queries: "dónde está selvadentro tulum", "ubicación selvadentro" /
 * "selvadentro tulum location", "where is selvadentro".
 * Drive times come from translations[lang].location.distances so the page
 * and the homepage section can never drift apart.
 */

const copy = {
  es: {
    eyebrow: 'Ubicación',
    lede: 'Selvadentro está del lado selva de Tulum, sobre la Ruta de los Cenotes: a 8 minutos de la estación del Tren Maya, 20 de la Zona Hotelera, 35 del Aeropuerto Internacional de Tulum y 90 del de Cancún. Selva profunda para vivir; minutos de manejo para todo lo demás.',
    tableTitle: '¿A cuánto está Selvadentro de todo?',
    tableHeadDest: 'Destino',
    tableHeadTime: 'Tiempo en auto',
    tableNote: 'Tiempos de manejo aproximados en condiciones normales de tráfico.',
    minutes: 'min',
    sideTitle: '¿Qué significa estar en la Ruta de los Cenotes?',
    sideBody: [
      'Tulum tiene dos caras. Una es la costa: la Zona Hotelera, la playa, la densidad turística. La otra es la selva: el lado interior, donde el terreno se abre hacia los cenotes y las reservas naturales. Selvadentro está en esa segunda cara — el único desarrollo residencial privado sobre la Ruta de los Cenotes de Tulum.',
      'Eso define la vida diaria y también la inversión. Lo que rodea al proyecto son reservas y atracciones naturales, no otros desarrollos: el silencio es real y la oferta vecina no puede crecer. La playa, los restaurantes y el pueblo quedan a 20 minutos; la selva queda en casa.',
    ],
    mapAlt: 'Mapa de rutas de acceso a Selvadentro: Carretera Federal 307, Tren Maya y Libramiento Playa-Cobá',
    mapCaption: 'Las rutas de acceso a Selvadentro, del brochure oficial de Suspiro.',
    routesTitle: 'Cómo llegar a Selvadentro',
    routes: [
      [
        'Por carretera',
        'Desde la Carretera Federal 307 (Cancún–Tulum) se toma el acceso hacia la Ruta de los Cenotes. Cerca del proyecto avanza la construcción del Libramiento Playa-Cobá, el nuevo eje que descongestionará el acceso por la costa. Adentro, la Avenida Selvadentro y la calle interior de Suspiro conectan cada privada, con acceso controlado.',
      ],
      [
        'En Tren Maya',
        'La estación Tulum del Tren Maya queda a 8 minutos del proyecto. El servicio de pasajeros opera desde diciembre de 2023 y conecta Tulum con Cancún, Playa del Carmen, Chichén Itzá y Mérida.',
      ],
      [
        'Por aire',
        'El Aeropuerto Internacional de Tulum (Felipe Carrillo Puerto), inaugurado el 1 de diciembre de 2023, queda a 35 minutos. El Aeropuerto de Cancún, con su conectividad internacional completa, a 90.',
      ],
    ],
    visitTitle: '¿Quieres conocerlo en persona?',
    visitBody:
      'El showroom de Selvadentro está en Loft Corporativo Sinergia, sobre la Avenida Tulum, en el pueblo. Desde ahí se coordinan los recorridos al proyecto — en sitio o por videollamada sobre el masterplan interactivo. Escríbenos por WhatsApp al +52 999 489 0828 o agenda con el formulario de esta página.',
    ctaTitle: 'Sigue explorando',
    ctaLinks: [
      ['/vivir-en-tulum', 'Cómo es vivir en Tulum: la guía honesta'],
      ['/cenotes', 'Los 9 cenotes dentro del proyecto'],
      ['/amenidades', 'Las +12 experiencias entre la selva'],
      ['/lotes-en-venta-tulum', 'Lotes en venta: precios y condiciones'],
      ['/inversion', 'La inversión en números'],
    ],
  },
  en: {
    eyebrow: 'Location',
    lede: 'Selvadentro sits on the jungle side of Tulum, along the Ruta de los Cenotes: 8 minutes from the Maya Train station, 20 from the Hotel Zone, 35 from Tulum International Airport and 90 from Cancún’s. Deep jungle to live in; a short drive to everything else.',
    tableTitle: 'How far is Selvadentro from everything?',
    tableHeadDest: 'Destination',
    tableHeadTime: 'Drive time',
    tableNote: 'Approximate drive times under normal traffic conditions.',
    minutes: 'min',
    sideTitle: 'What does “on the Ruta de los Cenotes” mean?',
    sideBody: [
      'Tulum has two faces. One is the coast: the Hotel Zone, the beach, the tourist density. The other is the jungle: the inland side, where the land opens toward cenotes and nature reserves. Selvadentro is on that second face — the only private residential development on Tulum’s Ruta de los Cenotes.',
      'That shapes daily life, and it shapes the investment. What surrounds the project are reserves and natural attractions, not other developments: the silence is real, and the neighboring supply cannot grow. The beach, the restaurants and the town are 20 minutes away; the jungle is home.',
    ],
    mapAlt: 'Access-route map for Selvadentro: Federal Highway 307, the Maya Train and the Playa-Cobá bypass',
    mapCaption: 'Access routes to Selvadentro, from the official Suspiro brochure.',
    routesTitle: 'How to get to Selvadentro',
    routes: [
      [
        'By road',
        'From Federal Highway 307 (Cancún–Tulum), take the turnoff toward the Ruta de los Cenotes. Nearby, construction is advancing on the Playa-Cobá bypass, the new corridor that will relieve the coastal highway. Inside the project, Avenida Selvadentro and Suspiro’s interior street connect each enclave, behind controlled access.',
      ],
      [
        'By Maya Train',
        'The Tulum station of the Maya Train is 8 minutes from the project. Passenger service has run since December 2023, linking Tulum with Cancún, Playa del Carmen, Chichén Itzá and Mérida.',
      ],
      [
        'By air',
        'Tulum International Airport (Felipe Carrillo Puerto), opened December 1, 2023, is 35 minutes away. Cancún International, with its full international connectivity, is 90.',
      ],
    ],
    visitTitle: 'Want to see it in person?',
    visitBody:
      'The Selvadentro showroom is at Loft Corporativo Sinergia on Avenida Tulum, in town. Project tours are arranged from there — on site, or by video call over the interactive masterplan. Message us on WhatsApp at +52 999 489 0828 or book through the form on this page.',
    ctaTitle: 'Keep exploring',
    ctaLinks: [
      ['/en/living-in-tulum-guide', 'What living in Tulum is really like'],
      ['/en/cenotes', 'The 9 cenotes inside the project'],
      ['/en/amenities', 'The 12+ experiences in the jungle'],
      ['/en/tulum-land-for-sale', 'Lots for sale: pricing and terms'],
      ['/en/investment', 'The investment, in numbers'],
    ],
  },
} as const;

export default function LocationPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];
  const distances = translations[lang].location.distances;

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} lang={lang} />

      {/* Drive-times table (single source: translations[lang].location.distances) */}
      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-6">{c.tableTitle}</h2>
            <div className="table-shell lg:-mx-24 xl:-mx-32">
              <table className="table-premium text-sm sm:text-base">
                <thead>
                  <tr>
                    <th scope="col">
                      {c.tableHeadDest}
                    </th>
                    <th scope="col">
                      {c.tableHeadTime}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {distances.map((d) => (
                    <tr key={d.label}>
                      <th scope="row" className="font-normal align-top">
                        {d.label}
                      </th>
                      <td className="sm:whitespace-nowrap">
                        {d.minutes} {c.minutes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-brand-gris mt-3">{c.tableNote}</p>
          </Reveal>
        </div>
      </section>

      {/* The jungle side vs the hotel zone */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.sideTitle}</h2>
            {c.sideBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <figure className="mt-6">
              <img
                src="/rutas-acceso.webp"
                alt={c.mapAlt}
                width={2206}
                height={1265}
                loading="lazy"
                className="rounded-2xl w-full h-auto"
              />
              <figcaption className="text-sm text-brand-gris mt-2">{c.mapCaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Access routes */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.routesTitle}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {c.routes.map(([title, body], i) => (
              <Reveal key={title} delay={i * 80}>
                <article className="card-premium p-6 h-full">
                  <h3 className="text-xl mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-negro/80">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.visitTitle}</h2>
            <p className="leading-relaxed">{c.visitBody}</p>
          </Reveal>
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
