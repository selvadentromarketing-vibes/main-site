import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { EXPERIENCIAS, spotDesc, spotLabel } from '../data/masterplan';
import { PRICING } from '../seo/site';
import type { PageProps } from '../routes/AppRoutes';

/**
 * /amenidades ↔ /en/amenities — the 12+ experiencias page.
 * Target queries: "amenidades selvadentro", "amenidades tulum desarrollo" /
 * "selvadentro amenities", "tulum community amenities".
 * Per-amenity copy comes from src/data/masterplan.ts (shared with the
 * masterplan explorer popups), so this page stays in sync with the map.
 */

/** Real intrinsic dimensions of the masterplan popup images (public/map-*.jpg). */
const MAP_IMG_DIMS: Record<string, [number, number]> = {
  '/map-acceso.jpg': [1200, 600],
  '/map-mirador.jpg': [1200, 900],
  '/map-kids-jungle.jpg': [1200, 761],
  '/map-pets-jungle.jpg': [1200, 771],
  '/map-jungle-gym.jpg': [1200, 675],
  '/map-padel.jpg': [1200, 675],
  '/map-pabellon.jpg': [1200, 900],
  '/map-village.jpg': [1200, 800],
  '/map-casa-arbol.jpg': [1200, 792],
  '/map-jungle-bar.jpg': [1200, 675],
  '/map-casa-cenotes.jpg': [1200, 675],
  '/map-wellness.jpg': [1200, 675],
};

interface GalleryItem {
  src: string;
  width: number;
  height: number;
  altEs: string;
  altEn: string;
  captionEs: string;
  captionEn: string;
  /** Panoramic assets span both grid columns. */
  wide?: boolean;
}

const GALLERY: GalleryItem[] = [
  {
    src: '/amenity-casa-cenotes.webp',
    width: 2060,
    height: 650,
    altEs: 'Casa de los Cenotes: restaurante y bar de alberca junto al agua en Selvadentro Tulum',
    altEn: 'Casa de los Cenotes: restaurant and pool bar beside the water at Selvadentro Tulum',
    captionEs: 'Casa de los Cenotes — el alma social del proyecto',
    captionEn: 'Casa de los Cenotes — the social heart of the project',
    wide: true,
  },
  {
    src: '/render-spa.webp',
    width: 1600,
    height: 1600,
    altEs: 'Wellness center de Selvadentro entre la selva de Tulum',
    altEn: 'Selvadentro wellness center within the Tulum jungle',
    captionEs: 'Wellness center',
    captionEn: 'Wellness center',
  },
  {
    src: '/render-jungle-bar.webp',
    width: 1080,
    height: 608,
    altEs: 'Jungle Bar de Selvadentro Tulum, rodeado de vegetación',
    altEn: 'The Selvadentro Tulum Jungle Bar, surrounded by vegetation',
    captionEs: 'Jungle Bar',
    captionEn: 'Jungle Bar',
  },
  {
    src: '/amenity-cenote-mirador.webp',
    width: 1010,
    height: 1110,
    altEs: 'Mirador suspendido sobre el Cenote Mirador en Selvadentro Tulum',
    altEn: 'Lookout suspended over Cenote Mirador at Selvadentro Tulum',
    captionEs: 'Mirador sobre el Cenote Mirador',
    captionEn: 'Lookout over Cenote Mirador',
  },
  {
    src: '/amenity-pabellon-holistico.webp',
    width: 1100,
    height: 1110,
    altEs: 'Pabellón Holístico de Selvadentro entre los árboles',
    altEn: 'The Selvadentro Holistic Pavilion among the trees',
    captionEs: 'Pabellón Holístico',
    captionEn: 'Holistic Pavilion',
  },
  {
    src: '/amenity-padel.webp',
    width: 2060,
    height: 580,
    altEs: 'Canchas de pádel y pickleball rodeadas de selva en Selvadentro Tulum',
    altEn: 'Padel and pickleball courts framed by jungle at Selvadentro Tulum',
    captionEs: 'Canchas de pádel y pickleball',
    captionEn: 'Padel & pickleball courts',
    wide: true,
  },
  {
    src: '/amenity-parque-ninos.webp',
    width: 1400,
    height: 460,
    altEs: 'Kids Jungle: el área de juegos infantiles de Selvadentro Tulum',
    altEn: 'Kids Jungle: the children’s play area at Selvadentro Tulum',
    captionEs: 'Kids Jungle',
    captionEn: 'Kids Jungle',
  },
  {
    src: '/amenity-parque-mascotas.webp',
    width: 710,
    height: 600,
    altEs: 'Pets Jungle: senderos y áreas para mascotas en Selvadentro Tulum',
    altEn: 'Pets Jungle: trails and pet areas at Selvadentro Tulum',
    captionEs: 'Pets Jungle',
    captionEn: 'Pets Jungle',
  },
];

const copy = {
  es: {
    eyebrow: 'Amenidades',
    lede: 'Selvadentro incluye más de 12 amenidades entre la selva: Casa de los Cenotes — restaurante y bar de alberca —, Jungle Bar, wellness center, Jungle Gym, canchas de pádel y pickleball, Pabellón Holístico, Village Comercial, Casa del Árbol, Kids Jungle, Pets Jungle, mirador y senderos. Se entregan con Suspiro en 2029, y el acceso a cenotes y amenidades comienza el día de tu compra.',
    introTitle: '¿Qué amenidades incluye Selvadentro?',
    introBody: [
      'Aquí las amenidades no se concentran en una sola casa club. Se dispersan por el masterplan, entre los nueve cenotes y la selva que el proyecto conserva — el 65% del territorio permanece intacto por diseño. Cada experiencia se insertó donde la selva lo permitió, no donde convenía al plano.',
      'La arquitectura de las amenidades está a cargo de Maat Handasa, el despacho que construyó Chablé Resort — ganador del AHEAD Americas 2017. El resultado son tres mundos: naturaleza viva (cenotes, senderos, miradores, Casa del Árbol), cuerpo y movimiento (wellness center, Jungle Gym, pádel, Pabellón Holístico) y vida en comunidad (Casa de los Cenotes, Jungle Bar, Village Comercial, Kids Jungle, Pets Jungle).',
    ],
    introImgAlt: 'Alberca de la Casa de los Cenotes fundiéndose con la selva en Selvadentro Tulum',
    gridTitle: 'Las 12 experiencias, una por una',
    gridNote: 'Las descripciones provienen del brochure oficial de Suspiro; son las mismas que verás en el masterplan interactivo.',
    galleryTitle: 'Así se ven: renders del proyecto',
    accessTitle: '¿Desde cuándo puedes usarlas?',
    accessBody: [
      `El acceso a los cenotes y a las amenidades comienza el día de tu compra — no cuando termina la obra. La entrega de Suspiro con sus amenidades concluidas está programada para ${PRICING.deliveryYear}. Es la misma lógica del proyecto completo: primero la selva y el agua, después lo construido.`,
      'Las dos primeras privadas, Mirador y Refugio, ya se vendieron en su totalidad; Suspiro es la privada activa. Los precios y condiciones vigentes están en la página de lotes en venta.',
    ],
    hoaTitle: '¿Quién mantiene todo esto?',
    hoaBody: [
      `El mantenimiento se cubre con una cuota de ${PRICING.hoaFeeLabelEs} por lote, más un fondo de reserva en fideicomiso pensado para el mantenimiento de largo plazo. La infraestructura del proyecto — energía sustentable, red de agua subterránea, acceso controlado, seguridad 24/7 e internet en áreas comunes — es parte de lo que esa cuota sostiene.`,
    ],
    ctaTitle: 'Sigue explorando',
    ctaLinks: [
      ['/cenotes', 'Los 9 cenotes del proyecto'],
      ['/comunidad-privada-en-tulum', 'Cómo es la comunidad privada'],
      ['/lotes-en-venta-tulum', 'Lotes en venta: precios y condiciones'],
      ['/ubicacion', 'Dónde está Selvadentro'],
      ['/preguntas-frecuentes', 'Preguntas frecuentes'],
    ],
  },
  en: {
    eyebrow: 'Amenities',
    lede: 'Selvadentro includes 12+ amenities woven through the jungle: the Casa de los Cenotes clubhouse with restaurant and pool bar, Jungle Bar, wellness center, Jungle Gym, padel and pickleball courts, Holistic Pavilion, Commercial Village, treehouse, Kids Jungle, Pets Jungle, a lookout and jungle trails. They are delivered with Suspiro in 2029 — and resident access starts the day you buy.',
    introTitle: 'What amenities does Selvadentro include?',
    introBody: [
      'The amenities here are not stacked into a single clubhouse. They are scattered across the masterplan, between the nine cenotes and the jungle the project preserves — 65% of the land stays untouched by design. Each experience was placed where the jungle allowed it, not where the drawing found it convenient.',
      'The amenity architecture is by Maat Handasa, the firm that built Chablé Resort — winner of AHEAD Americas 2017. The result is three worlds: living nature (cenotes, trails, lookouts, the treehouse), body and movement (wellness center, Jungle Gym, padel, the Holistic Pavilion), and community life (Casa de los Cenotes, Jungle Bar, the Commercial Village, Kids Jungle and Pets Jungle).',
    ],
    introImgAlt: 'The Casa de los Cenotes pool merging into the jungle at Selvadentro Tulum',
    gridTitle: 'All 12 experiences, one by one',
    gridNote: 'Descriptions come from the official Suspiro brochure — the same ones you will find on the interactive masterplan.',
    galleryTitle: 'What they look like: project renders',
    accessTitle: 'When can you start using them?',
    accessBody: [
      `Access to the cenotes and amenities starts the day you buy — not when construction wraps. Delivery of Suspiro with its finished amenities is scheduled for ${PRICING.deliveryYear}. It follows the project’s own logic: the jungle and the water come first, the built layer after.`,
      'The first two enclaves, Mirador and Refugio, are fully sold; Suspiro is the active one. Current pricing and terms live on the land-for-sale page.',
    ],
    hoaTitle: 'Who maintains all of this?',
    hoaBody: [
      `Maintenance is funded by a fee of ${PRICING.hoaFeeLabelEn} per lot, plus a trust reserve set aside for long-term upkeep. The project infrastructure — sustainable energy, an underground water network, controlled access, 24/7 security and internet in common areas — is part of what that fee sustains.`,
    ],
    ctaTitle: 'Keep exploring',
    ctaLinks: [
      ['/en/cenotes', 'The project’s 9 cenotes'],
      ['/en/gated-community-tulum', 'Inside the gated community'],
      ['/en/tulum-land-for-sale', 'Lots for sale: pricing and terms'],
      ['/en/location', 'Where Selvadentro is'],
      ['/en/faq', 'Frequently asked questions'],
    ],
  },
} as const;

export default function AmenitiesPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} />

      {/* Intro: philosophy + who designed them */}
      <section className="section">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="h2-section mb-5">{c.introTitle}</h2>
            {c.introBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <img
              src="/render-pool.webp"
              alt={c.introImgAlt}
              width={1600}
              height={800}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* The 12 experiencias, from the shared masterplan data */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-3">{c.gridTitle}</h2>
            <p className="text-sm text-brand-gris mb-8 max-w-copy">{c.gridNote}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERIENCIAS.map((exp, i) => {
              const img = exp.images[0];
              const dims = img ? MAP_IMG_DIMS[img] : undefined;
              return (
                <Reveal key={exp.id} delay={(i % 3) * 80}>
                  <article className="card-premium overflow-hidden h-full flex flex-col">
                    {img && dims && (
                      <img
                        src={img}
                        alt={`${spotLabel(exp, lang)} — Selvadentro Tulum`}
                        width={dims[0]}
                        height={dims[1]}
                        loading="lazy"
                        className="w-full aspect-[8/5] object-cover"
                      />
                    )}
                    <div className="p-6 flex-1">
                      <h3 className="text-xl mb-2">{spotLabel(exp, lang)}</h3>
                      <p className="text-sm leading-relaxed text-brand-negro/80">
                        {spotDesc(exp, lang)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Render gallery */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="h2-section mb-8">{c.galleryTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={(i % 2) * 80} className={g.wide ? 'sm:col-span-2' : ''}>
                <figure>
                  <img
                    src={g.src}
                    alt={lang === 'es' ? g.altEs : g.altEn}
                    width={g.width}
                    height={g.height}
                    loading="lazy"
                    className={`rounded-2xl w-full object-cover ${g.wide ? 'aspect-[3/1]' : 'aspect-[4/3]'}`}
                  />
                  <figcaption className="text-sm text-brand-gris mt-2">
                    {lang === 'es' ? g.captionEs : g.captionEn}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Practical: access from purchase + maintenance */}
      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <Reveal>
            <h2 className="h2-section mb-5">{c.accessTitle}</h2>
            {c.accessBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <h2 className="h2-section mb-5">{c.hoaTitle}</h2>
            {c.hoaBody.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed mb-4 max-w-copy">
                {p}
              </p>
            ))}
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
