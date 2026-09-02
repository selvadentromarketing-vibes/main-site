/**
 * Page-level SEO registry — the single source of truth for every static
 * route's path, language pairing, and head content. Consumed by:
 *   - src/routes/registry.tsx      (route table)
 *   - src/seo/head.ts              (title/description/canonical/hreflang/OG)
 *   - scripts/prerender.mjs        (route list + sitemap.xml)
 *   - scripts/check-static.mjs     (build-gate assertions)
 *   - src/i18n/useLang.ts          (language switcher via getAltPath)
 *
 * Slugs are LOCALIZED (the ES and EN slugs differ and each carries its
 * target query verbatim), so the es/en pairing is explicit via `altPath`
 * — never derived by prefixing/stripping `/en`.
 *
 * Anti-cannibalization rule: one search intent = one page per language.
 * Synonyms ("terrenos" vs "lotes") share a page via title/H1 — they never
 * get separate near-duplicate pages.
 */

import type { Lang } from '../i18n/translations';
import { DEFAULT_OG_IMAGE } from './site';
import { GUIDES, POSTS, TERMS, type ContentRecord } from '../generated/content';

export interface HeroImage {
  src: string;
  /** The crop's real pixel size on disk — check-static asserts it. */
  width: number;
  height: number;
  /**
   * What the crop actually depicts, per language. These heroes are project
   * photography and renders, not decoration, so they get real alt text
   * rather than alt="" — it is what puts them in image search, and an
   * empty alt on a meaningful image reads as a missing one to auditors.
   * Written from the files themselves; if a crop is re-cut, re-check the
   * sentence.
   */
  alt: { es: string; en: string };
}

export interface PageMeta {
  /** Joins the es/en pair, e.g. 'lots'. Also keys the component map. */
  key: string;
  lang: Lang;
  /** Route path, no trailing slash ('/' for the ES homepage). */
  path: string;
  /** The paired page in the other language, or null when unpaired. */
  altPath: string | null;
  title: string;
  description: string;
  /** Exact H1 text — pages render this; check-static asserts it. */
  h1: string;
  /** Site-relative OG image (1200×630 JPG); absolutized by head.ts. */
  ogImage: string;
  /** Manual ISO date → sitemap <lastmod>. Bump when content changes. */
  updated: string;
  /** Homepage only: emit the hero <link rel=preload>. */
  preloadHero?: boolean;
  /**
   * Photographic hero crop for the page band, with its real intrinsic size
   * so the <img> can declare honest width/height. Assigned from HERO_IMAGES
   * below, not written per entry. Absent on the editorial pages, which are
   * typographic by design.
   */
  heroImage?: HeroImage;
  /** Which JSON-LD graph schema.ts builds for the page. */
  schemaKey:
    | 'home'
    | 'lots'
    | 'cenotes'
    | 'faq'
    | 'article-page'
    | 'guide-page'
    | 'glossary-term'
    | 'blog-index'
    | 'default';
}

const UPDATED = '2026-09-01';

export const STATIC_PAGES: PageMeta[] = [
  // ─── Homepage ────────────────────────────────────────────────────
  {
    key: 'home',
    lang: 'es',
    path: '/',
    altPath: '/en',
    title: 'Selvadentro Tulum — tierra de cenotes | Lotes en la selva',
    description:
      'La única comunidad privada en Tulum con nueve cenotes dentro. Lotes residenciales desde $68,000 USD en privadas de baja densidad, con 65% de selva conservada.',
    h1: 'La única comunidad privada en Tulum con nueve cenotes dentro.',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    preloadHero: true,
    schemaKey: 'home',
  },
  {
    key: 'home',
    lang: 'en',
    path: '/en',
    altPath: '/',
    title: 'Selvadentro Tulum — Land of Cenotes | Jungle Lots for Sale',
    description:
      'The only private community in Tulum with nine cenotes within. Residential lots from $68,000 USD in low-density enclaves, with 65% of the jungle preserved.',
    h1: 'The only private community in Tulum with nine cenotes within.',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    preloadHero: true,
    schemaKey: 'home',
  },

  // ─── Money page: lots for sale ──────────────────────────────────
  {
    key: 'lots',
    lang: 'es',
    path: '/lotes-en-venta-tulum',
    altPath: '/en/tulum-land-for-sale',
    title: 'Lotes y terrenos en venta en Tulum desde $68,000 USD | Selvadentro',
    description:
      'Lotes residenciales de 400 a 1,673 m² en Suspiro, la privada activa de Selvadentro. Desde $68,000 USD ($167 USD/m²) con plan a 48 meses sin intereses.',
    h1: 'Lotes en venta en Tulum, dentro de una reserva de cenotes',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'lots',
  },
  {
    key: 'lots',
    lang: 'en',
    path: '/en/tulum-land-for-sale',
    altPath: '/lotes-en-venta-tulum',
    title: 'Tulum Land for Sale — Jungle Lots from $68,000 USD | Selvadentro',
    description:
      'Residential lots from 400 to 1,673 m² in Suspiro, Selvadentro’s active enclave. From $68,000 USD ($167 USD/m²) with a 48-month interest-free payment plan.',
    h1: 'Tulum land for sale, inside a private cenote reserve',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'lots',
  },

  // ─── Cenotes (signature entity page) ─────────────────────────────
  {
    key: 'cenotes',
    lang: 'es',
    path: '/cenotes',
    altPath: '/en/cenotes',
    title: 'Los 9 cenotes de Selvadentro Tulum — nombres, fotos y mapa',
    description:
      'Los nueve cenotes naturales dentro de Selvadentro —Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida y Caverna— y cómo se conservan.',
    h1: 'Nueve cenotes. Una sola comunidad.',
    ogImage: '/og/og-cenotes.jpg',
    updated: UPDATED,
    schemaKey: 'cenotes',
  },
  {
    key: 'cenotes',
    lang: 'en',
    path: '/en/cenotes',
    altPath: '/cenotes',
    title: 'The 9 Cenotes of Selvadentro Tulum — Names, Photos & Map',
    description:
      'The nine natural cenotes inside Selvadentro — Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida and Caverna — and how they are preserved.',
    h1: 'Nine cenotes. One community.',
    ogImage: '/og/og-cenotes.jpg',
    updated: UPDATED,
    schemaKey: 'cenotes',
  },

  // ─── Amenities ───────────────────────────────────────────────────
  {
    key: 'amenities',
    lang: 'es',
    path: '/amenidades',
    altPath: '/en/amenities',
    title: 'Amenidades de Selvadentro Tulum: +12 experiencias en la selva',
    description:
      'Casa de los Cenotes, Jungle Bar, wellness center, pádel, Kids Jungle, Pets Jungle y más: las 12+ experiencias entre la selva que incluye Selvadentro Tulum.',
    h1: 'Más de 12 experiencias entre la selva',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'default',
  },
  {
    key: 'amenities',
    lang: 'en',
    path: '/en/amenities',
    altPath: '/amenidades',
    title: 'Selvadentro Tulum Amenities: 12+ Experiences in the Jungle',
    description:
      'Casa de los Cenotes, Jungle Bar, wellness center, padel, Kids Jungle, Pets Jungle: the 12+ jungle experiences included at Selvadentro Tulum.',
    h1: '12+ experiences within the jungle',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'default',
  },

  // ─── Location ────────────────────────────────────────────────────
  {
    key: 'location',
    lang: 'es',
    path: '/ubicacion',
    altPath: '/en/location',
    title: 'Ubicación de Selvadentro Tulum — a 8 min del Tren Maya',
    description:
      'Selvadentro está en la Ruta de los Cenotes: a 8 minutos del Tren Maya, 20 de la Zona Hotelera y 35 del aeropuerto de Tulum. Rutas y tiempos reales.',
    h1: 'Dónde está Selvadentro: selva adentro, a minutos de todo',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'default',
  },
  {
    key: 'location',
    lang: 'en',
    path: '/en/location',
    altPath: '/ubicacion',
    title: 'Selvadentro Tulum Location — 8 Min from the Maya Train',
    description:
      'Selvadentro sits on Tulum’s cenote route: 8 minutes from the Maya Train, 20 from the Hotel Zone, 35 from the airport. Real routes and drive times.',
    h1: 'Where Selvadentro is: deep in the jungle, minutes from everything',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'default',
  },

  // ─── Investment ──────────────────────────────────────────────────
  {
    key: 'investment',
    lang: 'es',
    path: '/inversion',
    altPath: '/en/investment',
    title: 'Invertir en Selvadentro Tulum: de $119 a $167 USD/m² en 12 meses',
    description:
      'Los datos: de $119 USD/m² en mayo de 2025 a $167 hoy, con proyección de cierre en $280–360 USD/m². Tren Maya, aeropuerto y Libramiento.',
    h1: 'La inversión en números',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'default',
  },
  {
    key: 'investment',
    lang: 'en',
    path: '/en/investment',
    altPath: '/inversion',
    title: 'Investing in Selvadentro Tulum: $119 to $167 USD/m² in 12 Months',
    description:
      'The numbers: $119 USD/m² in May 2025 to $167 today, with a $280–360 closing projection. The Maya Train, Tulum airport and the bypass.',
    h1: 'The investment, in numbers',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'default',
  },

  // ─── FAQ ─────────────────────────────────────────────────────────
  {
    key: 'faq',
    lang: 'es',
    path: '/preguntas-frecuentes',
    altPath: '/en/faq',
    title: 'Preguntas frecuentes sobre Selvadentro Tulum',
    description:
      'Cuotas, entrega en 2029, rentas, fideicomiso para extranjeros, reglas de construcción y legalidad: las respuestas sobre Selvadentro Tulum.',
    h1: 'Preguntas frecuentes',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'faq',
  },
  {
    key: 'faq',
    lang: 'en',
    path: '/en/faq',
    altPath: '/preguntas-frecuentes',
    title: 'Selvadentro Tulum FAQ — Fees, Delivery, Rentals & Legal',
    description:
      'Fees, 2029 delivery, rentals, the fideicomiso for foreign buyers, construction rules and legal status: the answers about Selvadentro Tulum.',
    h1: 'Frequently asked questions',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'faq',
  },

  // ─── Legal / trust page ──────────────────────────────────────────
  {
    key: 'legal',
    lang: 'es',
    path: '/legalidad-y-permisos',
    altPath: '/en/legal-compliance',
    title: 'Legalidad y permisos de Selvadentro Tulum — verificado por SEDETUS',
    description:
      'Selvadentro acreditó cumplimiento total ante SEDETUS en septiembre de 2025. La documentación, la escrituración y cómo verificarlo tú mismo.',
    h1: 'Legalidad y permisos: verificable, no prometido',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'legal',
    lang: 'en',
    path: '/en/legal-compliance',
    altPath: '/legalidad-y-permisos',
    title: 'Is Selvadentro Tulum Legal? Permits & SEDETUS Verification',
    description:
      'Selvadentro proved full permit compliance to SEDETUS in September 2025. The documentation, the titling process, and how to verify it yourself.',
    h1: 'Legal status and permits: verifiable, not promised',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'article-page',
  },

  // ─── Developer / team (E-E-A-T anchor) ───────────────────────────
  {
    key: 'developer',
    lang: 'es',
    path: '/desarrollador',
    altPath: '/en/developer',
    title: 'Quién desarrolla Selvadentro: JJF Creando, Estudio AMA y Maat Handasa',
    description:
      'JJF Creando (Aldea Zamá, Yucatán Country Club) desarrolla Selvadentro, con arquitectura de Estudio AMA y Maat Handasa (Chablé Resort).',
    h1: 'El equipo detrás de Selvadentro',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'default',
  },
  {
    key: 'developer',
    lang: 'en',
    path: '/en/developer',
    altPath: '/desarrollador',
    title: 'The Developer Behind Selvadentro Tulum: JJF Creando & Partners',
    description:
      'JJF Creando (Aldea Zamá, Yucatán Country Club) develops Selvadentro, with architecture by Estudio AMA and Maat Handasa (Chablé Resort).',
    h1: 'The team behind Selvadentro',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'default',
  },

  // ─── Blog indexes ────────────────────────────────────────────────
  {
    key: 'blog',
    lang: 'es',
    path: '/blog',
    altPath: '/en/blog',
    title: 'Blog de Selvadentro — invertir y vivir en Tulum',
    description:
      'Guías con datos reales para comprar terreno e invertir en Tulum: precios por m², fideicomiso, legalidad SEDETUS, zonas, preventas y vida en la selva.',
    h1: 'Guías para invertir y vivir en Tulum',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'blog-index',
  },
  {
    key: 'blog',
    lang: 'en',
    path: '/en/blog',
    altPath: '/blog',
    title: 'Selvadentro Blog — Buying Land & Living in Tulum',
    description:
      'Data-driven guides to buying land in Tulum: prices per m², the fideicomiso, SEDETUS checks, neighborhoods, pre-construction and jungle living.',
    h1: 'Guides to buying land and living in Tulum',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'blog-index',
  },

  // ─── Query-matched landing layer ─────────────────────────────────
  {
    key: 'cenote-land',
    lang: 'es',
    path: '/terrenos-con-cenote-en-venta',
    altPath: '/en/land-with-cenote-for-sale-mexico',
    title: 'Terrenos con cenote en venta en Tulum | Selvadentro',
    description:
      'Terrenos residenciales dentro de una reserva privada con 9 cenotes naturales en Tulum. Desde $68,000 USD, con acceso a los cenotes desde el día de tu compra.',
    h1: 'Terrenos con cenote en venta: vivir junto al agua sagrada',
    ogImage: '/og/og-cenotes.jpg',
    updated: UPDATED,
    schemaKey: 'lots',
  },
  {
    key: 'cenote-land',
    lang: 'en',
    path: '/en/land-with-cenote-for-sale-mexico',
    altPath: '/terrenos-con-cenote-en-venta',
    title: 'Land with Cenote for Sale in Mexico — Selvadentro Tulum',
    description:
      'Residential land inside a private reserve with 9 natural cenotes in Tulum, Mexico. From $68,000 USD, with cenote access from the day you buy.',
    h1: 'Land with a cenote for sale: living beside sacred water',
    ogImage: '/og/og-cenotes.jpg',
    updated: UPDATED,
    schemaKey: 'lots',
  },
  {
    key: 'plusvalia',
    lang: 'es',
    path: '/plusvalia-en-tulum',
    altPath: '/en/tulum-property-appreciation-data',
    title: 'Plusvalía en Tulum 2026: datos reales de precio por m²',
    description:
      'Serie documentada: $119 USD/m² en mayo de 2025, $167 hoy (+40%). Qué impulsa la plusvalía en Tulum: Tren Maya, aeropuerto y Libramiento.',
    h1: 'Plusvalía en Tulum: los datos, no la promesa',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'plusvalia',
    lang: 'en',
    path: '/en/tulum-property-appreciation-data',
    altPath: '/plusvalia-en-tulum',
    title: 'Tulum Property Appreciation: Real Price Data 2025–2026',
    description:
      'A documented series: $119 USD/m² in May 2025, $167 today (+40%). What drives Tulum appreciation: the Maya Train, the airport and the bypass.',
    h1: 'Tulum property appreciation: the data, not the promise',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'preventa',
    lang: 'es',
    path: '/preventa-de-terrenos-en-tulum',
    altPath: '/en/pre-construction-lots-tulum',
    title: 'Preventa de terrenos en Tulum: 48 meses sin intereses | Selvadentro',
    description:
      'Cómo funciona la preventa: apartado, plan a 48 meses sin intereses, entrega 2029 y qué documentos revisar antes de firmar en Tulum.',
    h1: 'Preventa de terrenos en Tulum, explicada completa',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'preventa',
    lang: 'en',
    path: '/en/pre-construction-lots-tulum',
    altPath: '/preventa-de-terrenos-en-tulum',
    title: 'Pre-Construction Lots in Tulum: 48-Month 0% Plans | Selvadentro',
    description:
      'How pre-construction works: reservation, a 48-month interest-free plan, 2029 delivery, and which documents to review before signing in Tulum.',
    h1: 'Pre-construction lots in Tulum, explained end to end',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'safety',
    lang: 'es',
    path: '/es-seguro-invertir-en-tulum',
    altPath: '/en/is-it-safe-to-buy-property-in-tulum',
    title: '¿Es seguro invertir en Tulum? Guía para comprar sin riesgo',
    description:
      'Sí, si verificas permisos, escrituras y desarrollador. Checklist con SEDETUS y Registro Público, y las señales de alerta que descartan un proyecto.',
    h1: '¿Es seguro invertir en Tulum? Depende de cómo compres.',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'safety',
    lang: 'en',
    path: '/en/is-it-safe-to-buy-property-in-tulum',
    altPath: '/es-seguro-invertir-en-tulum',
    title: 'Is It Safe to Buy Property in Tulum? A Due-Diligence Guide',
    description:
      'Yes, if you verify permits, titles and the developer. A due-diligence checklist using SEDETUS and the Public Registry, plus the red flags.',
    h1: 'Is it safe to buy property in Tulum? It depends on how you buy.',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'gated',
    lang: 'es',
    path: '/comunidad-privada-en-tulum',
    altPath: '/en/gated-community-tulum',
    title: 'Comunidad privada en Tulum con 9 cenotes | Selvadentro',
    description:
      'Acceso controlado, seguridad 24/7, baja densidad garantizada por normativa y 65% de selva conservada: así es vivir en la comunidad privada de Selvadentro Tulum.',
    h1: 'Una comunidad privada dentro de la selva de Tulum',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'default',
  },
  {
    key: 'gated',
    lang: 'en',
    path: '/en/gated-community-tulum',
    altPath: '/comunidad-privada-en-tulum',
    title: 'Gated Community in Tulum with 9 Cenotes | Selvadentro',
    description:
      'Controlled access, 24/7 security, low density guaranteed by regulation and 65% of the jungle preserved: life inside a Tulum gated community.',
    h1: 'A gated community inside the Tulum jungle',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'default',
  },
  {
    key: 'eco',
    lang: 'es',
    path: '/desarrollos-ecologicos-en-tulum',
    altPath: '/en/eco-friendly-developments-tulum',
    title: 'Desarrollos ecológicos en Tulum: 65% de selva conservada',
    description:
      'Qué hace ecológico a un desarrollo de verdad: 65% de selva preservada, cenotes protegidos con especialistas y construcción limitada al 35% del lote.',
    h1: 'Desarrollo ecológico en Tulum: preservar no es un eslogan',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'eco',
    lang: 'en',
    path: '/en/eco-friendly-developments-tulum',
    altPath: '/desarrollos-ecologicos-en-tulum',
    title: 'Eco-Friendly Development in Tulum: 65% Jungle Preserved',
    description:
      'What makes a development genuinely eco-friendly: 65% of the jungle preserved, specialist-protected cenotes and construction capped at 35% per lot.',
    h1: 'Eco-friendly development in Tulum: preservation is not a slogan',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'living',
    lang: 'es',
    path: '/vivir-en-tulum',
    altPath: '/en/living-in-tulum-guide',
    title: 'Vivir en Tulum: guía honesta 2026 (clima, costos, zonas)',
    description:
      'Cómo es vivir en Tulum de verdad: clima mes a mes, costo de vida, zonas para residir, conectividad, y para quién sí y para quién no es.',
    h1: 'Vivir en Tulum: la guía honesta',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'living',
    lang: 'en',
    path: '/en/living-in-tulum-guide',
    altPath: '/vivir-en-tulum',
    title: 'Living in Tulum: An Honest Guide for 2026',
    description:
      'What living in Tulum is really like: month-by-month climate, cost of living, where residents actually live, connectivity — and who it is not for.',
    h1: 'Living in Tulum: the honest guide',
    ogImage: DEFAULT_OG_IMAGE,
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'market',
    lang: 'es',
    path: '/mercado-inmobiliario-tulum-2026',
    altPath: '/en/tulum-real-estate-market-2026',
    title: 'Mercado inmobiliario de Tulum 2026: precios, datos y tendencias',
    description:
      'Reporte 2026 del mercado de tierra en Tulum: precios por m² documentados, efecto del Tren Maya y el aeropuerto, y hacia dónde va la plusvalía.',
    h1: 'El mercado inmobiliario de Tulum en 2026',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'article-page',
  },
  {
    key: 'market',
    lang: 'en',
    path: '/en/tulum-real-estate-market-2026',
    altPath: '/mercado-inmobiliario-tulum-2026',
    title: 'Tulum Real Estate Market 2026: Prices, Data & Trends',
    description:
      'The 2026 Tulum land market report: documented prices per m², the Maya Train and airport effect, SEDETUS-regulated supply, and where appreciation is heading.',
    h1: 'The Tulum real estate market in 2026',
    ogImage: '/og/og-lots.jpg',
    updated: UPDATED,
    schemaKey: 'article-page',
  },
];

/**
 * Which pages carry a photograph in their hero band. Commercial and
 * place pages are photographic; the editorial ones — FAQ, the legal
 * record, the market and appreciation data reports, and the four
 * collection indexes — are deliberately typographic (see the
 * `.hero-editorial` treatment in index.css). Keyed by registry `key`, so
 * both languages of a pair share the crop. Crops are generated by
 * scripts/optimize-images.mjs into public/hero/, which prints this block —
 * the sizes are NOT uniform (withoutEnlargement keeps a small source at its
 * own size), so they are recorded here and asserted by check-static.
 */
const HERO_IMAGES: Record<string, HeroImage> = {
  lots: {
    src: '/hero/lots.webp',
    width: 1600,
    height: 800,
    alt: {
      es: 'Acceso a Suspiro en Selvadentro: el letrero de piedra entre la selva de la Ruta de los Cenotes',
      en: 'The entrance to Suspiro at Selvadentro: the stone sign in the jungle on the Ruta de los Cenotes',
    },
  },
  cenotes: {
    src: '/hero/cenotes.webp',
    width: 1010,
    height: 800,
    alt: {
      es: 'Render del Cenote Mirador: una torre de madera suspendida sobre el agua entre raíces',
      en: 'Render of Cenote Mirador: a timber tower suspended above the water among hanging roots',
    },
  },
  'cenote-land': {
    src: '/hero/cenote-land.webp',
    width: 1024,
    height: 768,
    alt: {
      es: 'Interior de un cenote de caverna en Selvadentro, con estalactitas sobre agua turquesa',
      en: 'Inside a cavern cenote at Selvadentro, stalactites above turquoise water',
    },
  },
  amenities: {
    src: '/hero/amenities.webp',
    width: 1600,
    height: 800,
    alt: {
      es: 'Render del pabellón de alberca de techo a dos aguas y palapa, entre la selva de Selvadentro',
      en: 'Render of the A-frame thatched pool pavilion in the jungle at Selvadentro',
    },
  },
  location: {
    src: '/hero/location.webp',
    width: 1600,
    height: 800,
    alt: {
      es: 'Vista aérea del Pabellón Holístico circular y los senderos de madera entre la selva conservada',
      en: 'Aerial view of the circular Holistic Pavilion and timber boardwalks in the preserved jungle',
    },
  },
  investment: {
    src: '/hero/investment.webp',
    width: 1260,
    height: 618,
    alt: {
      es: 'Vista aérea de Casa de los Cenotes, su alberca y un cenote abierto en la selva de Suspiro',
      en: 'Aerial view of Casa de los Cenotes, its pool and an open cenote in the Suspiro jungle',
    },
  },
  gated: {
    src: '/hero/gated.webp',
    width: 1080,
    height: 608,
    alt: {
      es: 'Render del Jungle Bar: mesas y lámparas de papel bajo una techumbre abierta entre palmas',
      en: 'Render of the Jungle Bar: tables and paper lanterns under an open canopy among palms',
    },
  },
  eco: {
    src: '/hero/eco.webp',
    width: 1200,
    height: 800,
    alt: {
      es: 'Vista aérea nocturna de tres pabellones circulares iluminados junto a un cenote',
      en: 'Aerial night view of three lit circular pavilions beside a cenote',
    },
  },
  living: {
    src: '/hero/living.webp',
    width: 1600,
    height: 800,
    alt: {
      es: 'Roca caliza y enredaderas bajo la bóveda de selva conservada de Selvadentro',
      en: 'Limestone rock and hanging vines under the preserved jungle canopy at Selvadentro',
    },
  },
  developer: {
    src: '/hero/developer.webp',
    width: 990,
    height: 680,
    alt: {
      es: 'Chablé Resort en Yucatán, obra de Maat Handasa, una de las firmas detrás de Selvadentro',
      en: 'Chablé Resort in Yucatán, built by Maat Handasa, one of the firms behind Selvadentro',
    },
  },
  preventa: {
    src: '/hero/preventa.webp',
    width: 1200,
    height: 800,
    alt: {
      es: 'Render del pabellón restaurante junto a la alberca, en la selva de Selvadentro',
      en: 'Render of the restaurant pavilion beside the pool, in the jungle at Selvadentro',
    },
  },
};

for (const page of STATIC_PAGES) {
  const hero = HERO_IMAGES[page.key];
  if (hero) page.heroImage = hero;
}


/** Hub index pages for the markdown collections. */
export const COLLECTION_INDEXES: PageMeta[] = [
  {
    key: 'guide-index',
    lang: 'es',
    path: '/guia',
    altPath: '/en/guide',
    title: 'Guía del comprador — respuestas directas sobre Tulum',
    description:
      'Ejidos, notarios, impuestos, huracanes, seguridad, financiamiento: cada pregunta real de un comprador en Tulum respondida en una página directa y honesta.',
    h1: 'Guía del comprador: tus preguntas, respondidas',
    ogImage: DEFAULT_OG_IMAGE,
    updated: '2026-09-01',
    schemaKey: 'blog-index',
  },
  {
    key: 'guide-index',
    lang: 'en',
    path: '/en/guide',
    altPath: '/guia',
    title: "Tulum Buyer's Guide — Straight Answers to Real Questions",
    description:
      'Ejido land, notarios, taxes, hurricanes, safety, financing: every real question a Tulum buyer asks, answered on one direct, honest page each.',
    h1: "The buyer's guide: your questions, answered",
    ogImage: DEFAULT_OG_IMAGE,
    updated: '2026-09-01',
    schemaKey: 'blog-index',
  },
  {
    key: 'glossary-index',
    lang: 'es',
    path: '/glosario',
    altPath: '/en/glossary',
    title: 'Glosario inmobiliario de México — términos explicados',
    description:
      'Fideicomiso, ejido, escritura, ISABI, COS, dominio pleno: el glosario claro de los términos que vas a firmar al comprar propiedad en México.',
    h1: 'Glosario inmobiliario: los términos que vas a firmar',
    ogImage: DEFAULT_OG_IMAGE,
    updated: '2026-09-01',
    schemaKey: 'blog-index',
  },
  {
    key: 'glossary-index',
    lang: 'en',
    path: '/en/glossary',
    altPath: '/glosario',
    title: 'Mexico Real Estate Glossary — Every Term, Explained',
    description:
      'Fideicomiso, ejido, escritura, notario, ISABI, dominio pleno: clear definitions of the Spanish terms you will sign when buying property in Mexico.',
    h1: 'The Mexico real estate glossary',
    ogImage: DEFAULT_OG_IMAGE,
    updated: '2026-09-01',
    schemaKey: 'blog-index',
  },
];

function contentPages(
  records: ContentRecord[],
  keyPrefix: string,
  schemaKey: PageMeta['schemaKey'],
): PageMeta[] {
  return records.map((r) => ({
    key: `${keyPrefix}:${r.translationKey}`,
    lang: r.lang,
    path: r.path,
    altPath: r.altPath,
    title: r.metaTitle,
    description: r.description,
    h1: r.title,
    ogImage: r.ogImage ?? DEFAULT_OG_IMAGE,
    updated: r.updated,
    schemaKey,
  }));
}

/** Markdown-driven pages (paths built from generated content). */
export const POST_PAGES: PageMeta[] = contentPages(POSTS, 'post', 'article-page');
export const GUIDE_PAGES: PageMeta[] = contentPages(GUIDES, 'guide', 'guide-page');
export const TERM_PAGES: PageMeta[] = contentPages(TERMS, 'term', 'glossary-term');

export const ALL_PAGES: PageMeta[] = [
  ...STATIC_PAGES,
  ...COLLECTION_INDEXES,
  ...POST_PAGES,
  ...GUIDE_PAGES,
  ...TERM_PAGES,
];

const byPath = new Map(ALL_PAGES.map((p) => [p.path, p]));

export function getMeta(path: string): PageMeta | undefined {
  return byPath.get(path);
}

/** The paired URL in the other language, for the ES · EN switcher. */
export function getAltPath(path: string): string | null {
  return byPath.get(path)?.altPath ?? null;
}
