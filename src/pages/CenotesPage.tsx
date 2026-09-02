import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { CENOTES, SPOT_IMAGE_DIMS, spotDesc, spotLabel } from '../data/masterplan';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /cenotes ↔ /en/cenotes — the signature entity page. Surfaces the nine
 * cenotes' descriptions (shared with the masterplan explorer popups) as
 * crawlable prose; the JSON-LD ItemList of Places comes from the same
 * data via schema.ts.
 */

const copy = {
  es: {
    eyebrow: 'Los cenotes',
    lede: 'Selvadentro es la única comunidad privada de Tulum construida alrededor de nueve cenotes naturales: Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida y Caverna. Fueron mapeados con especialistas, se conservan intactos, y los residentes tienen acceso a ellos desde el día de su compra.',
    whatTitle: '¿Qué es un cenote?',
    whatBody: [
      'Un cenote es un pozo natural de agua dulce, formado cuando el techo de piedra caliza de un río subterráneo colapsa y deja el agua al descubierto. La península de Yucatán concentra la mayor red de cenotes y ríos subterráneos del planeta, y para la cultura maya eran portales sagrados al inframundo — fuentes de agua y de sentido.',
      'Casi todos los cenotes que puedes visitar en la Riviera Maya son atracciones públicas. Lo excepcional de Selvadentro es la figura inversa: nueve cenotes dentro de una comunidad privada, conservados para sus residentes, con la selva que los alimenta protegida por normativa — el 65% del territorio permanece intacto.',
    ],
    gridTitle: 'Los nueve, uno por uno',
    protectTitle: 'Cómo se protegen',
    protectBody:
      'Antes de trazar el masterplan, Estudio AMA y especialistas en hidrología mapearon cada cenote y su flujo subterráneo. Las vialidades y amenidades se acomodaron alrededor del agua — no al revés — y las normas de construcción (35% de ocupación máxima por lote, dos niveles de altura) mantienen la carga sobre el acuífero al mínimo. La prensa de arquitectura internacional ha documentado este enfoque: la selva dictó el plano.',
    ctaLinks: [
      ['/terrenos-con-cenote-en-venta', 'Terrenos con cenote en venta'],
      ['/lotes-en-venta-tulum', 'Precios y disponibilidad de lotes'],
      ['/blog/que-es-un-cenote', 'Guía completa: ¿qué es un cenote?'],
    ],
    ctaTitle: 'Sigue explorando',
  },
  en: {
    eyebrow: 'The cenotes',
    lede: 'Selvadentro is the only private community in Tulum built around nine natural cenotes: Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida and Caverna. Mapped with specialists and preserved untouched, they are open to residents from the day of purchase.',
    whatTitle: 'What is a cenote?',
    whatBody: [
      'A cenote is a natural freshwater sinkhole, formed when the limestone roof of an underground river collapses and exposes the water below. The Yucatán Peninsula holds the largest network of cenotes and subterranean rivers on the planet, and to the Maya they were sacred portals to the underworld — sources of water and of meaning.',
      'Nearly every cenote you can visit on the Riviera Maya is a public attraction. Selvadentro inverts that: nine cenotes inside a private community, preserved for residents, with the jungle that feeds them protected by regulation — 65% of the land stays untouched.',
    ],
    gridTitle: 'All nine, one by one',
    protectTitle: 'How they are protected',
    protectBody:
      'Before the masterplan was drawn, Estudio AMA and hydrology specialists mapped every cenote and its underground flow. Roads and amenities were arranged around the water — not the other way around — and the building rules (35% max lot coverage, two-level height cap) keep pressure on the aquifer to a minimum. International architecture press has documented the approach: the jungle dictated the plan.',
    ctaLinks: [
      ['/en/land-with-cenote-for-sale-mexico', 'Land with a cenote for sale'],
      ['/en/tulum-land-for-sale', 'Lot pricing and availability'],
      ['/en/blog/what-is-a-cenote-tulum', 'Full guide: what is a cenote?'],
    ],
    ctaTitle: 'Keep exploring',
  },
} as const;

export default function CenotesPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} lang={lang} />

      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.whatTitle}</h2>
            {c.whatBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.gridTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CENOTES.map((cenote, i) => (
              <Reveal key={cenote.id} delay={(i % 3) * 80}>
                <article className="card-premium overflow-hidden h-full flex flex-col">
                  {cenote.images[0] ? (
                    <img
                      src={cenote.images[0]}
                      alt={`${spotLabel(cenote, lang)} — Selvadentro Tulum`}
                      width={SPOT_IMAGE_DIMS[cenote.images[0]]?.width}
                      height={SPOT_IMAGE_DIMS[cenote.images[0]]?.height}
                      loading="lazy"
                      // The four photographs have four different aspects,
                      // one of them portrait; imagePosition says which part
                      // of each must survive the 8:5 card crop.
                      style={{ objectPosition: cenote.imagePosition ?? 'center' }}
                      className="w-full aspect-[8/5] object-cover"
                    />
                  ) : (
                    /* Five of the nine have not been photographed yet. A
                       designed plate — ripples, the shape of a cenote seen
                       from above — keeps the grid regular instead of
                       leaving a stretched blank card, and never implies a
                       photograph of one cenote is of another. */
                    <div className="hero-editorial grain relative w-full aspect-[8/5] flex items-center justify-center overflow-hidden">
                      <svg
                        viewBox="0 0 64 64"
                        aria-hidden="true"
                        className="relative w-20 h-20 text-brand-oro"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="32" cy="32" r="5.5" strokeWidth="1.5" opacity="0.95" />
                        <circle cx="32" cy="32" r="13" strokeWidth="1" opacity="0.7" />
                        <circle cx="32" cy="32" r="21" strokeWidth="1" opacity="0.48" />
                        <circle cx="32" cy="32" r="29" strokeWidth="1" opacity="0.3" />
                      </svg>
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <h3 className="text-xl mb-2">{spotLabel(cenote, lang)}</h3>
                    <p className="text-sm leading-relaxed text-brand-negro/80">
                      {spotDesc(cenote, lang)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-prose mx-auto">
          <Reveal>
            <h2 className="h2-section mb-5">{c.protectTitle}</h2>
            <p className="leading-relaxed">{c.protectBody}</p>
          </Reveal>
        </div>
      </section>

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
