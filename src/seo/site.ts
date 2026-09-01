/**
 * Site-wide SEO constants — the single source of truth for the canonical
 * origin, organization identity, and pricing facts. Consumed by:
 *   - src/seo/head.ts    (canonical / hreflang / OG URLs)
 *   - src/seo/schema.ts  (JSON-LD Organization + Offer)
 *   - src/pages/*        (pricing figures rendered in copy)
 *   - scripts/build-content.mjs (generates public/pricing.md)
 *
 * Update PRICING here and the schema Offer, the Investment page, and
 * pricing.md all stay in sync.
 */

export const SITE_URL = 'https://selvadentrotulum.com';

export const ORG = {
  name: 'Selvadentro',
  alternateName: 'Selvadentro Tulum',
  legalDeveloper: 'JJF Creando',
  email: 'info@selvadentrotulum.com',
  telephone: '+52 999 489 0828',
  whatsapp: 'https://wa.me/529994890828',
  instagram: 'https://www.instagram.com/selvadentro.tulum',
  logo: `${SITE_URL}/logo-cream.webp`,
  image: `${SITE_URL}/hero-cenote.webp`,
  showroom: {
    streetAddress: 'Loft Corporativo Sinergia, Av. Tulum',
    addressLocality: 'Tulum',
    addressRegion: 'Quintana Roo',
    addressCountry: 'MX',
  },
  // Coordinates of the "Selvadentro" pin on the project's Google Maps
  // listing (provided by the owner, Sept 2026).
  geo: { latitude: 20.3053142, longitude: -87.4341667 } as {
    latitude: number;
    longitude: number;
  } | null,
  mapsUrl: 'https://maps.app.goo.gl/mKX3H1a3zaYZfAxT9',
} as const;

export const PRICING = {
  currency: 'USD',
  lotPriceFromUSD: 68000,
  pricePerM2USD: 167,
  launchPricePerM2USD: 119, // May 2025
  launchDateLabelEs: 'mayo de 2025',
  launchDateLabelEn: 'May 2025',
  projectedClosePerM2USD: '280–360',
  lotSizeMinM2: 400,
  lotSizeMaxM2: 1673,
  paymentPlanMonths: 48,
  paymentPlanInterest: 0,
  deliveryYear: 2029,
  hoaFeeLabelEs: '≈ 5 MXN por m² al mes',
  hoaFeeLabelEn: '≈ 5 MXN per m² per month',
  cosPercent: 35, // max lot coverage
  cusPercent: 70, // max buildable intensity
  jungleSharePercent: 65,
  cenoteCount: 9,
} as const;

/** Named authors for blog/E-E-A-T content. Bios render on /desarrollador. */
export const AUTHORS = {
  'juan-camara': {
    id: 'juan-camara',
    name: 'Juan Cámara',
    roleEs: 'Dirección General',
    roleEn: 'General Director',
  },
  'omar-curi': {
    id: 'omar-curi',
    name: 'Omar Curi',
    roleEs: 'Dirección Comercial',
    roleEn: 'Commercial Director',
  },
} as const;

export type AuthorId = keyof typeof AUTHORS;

export const DEFAULT_OG_IMAGE = '/og/og-home.jpg';

/** Absolute URL for a site path ('' → homepage). No trailing slash. */
export function absUrl(path: string): string {
  if (path === '/' || path === '') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}
