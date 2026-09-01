/**
 * JSON-LD builders — one @graph per route, emitted into the prerendered
 * <head> by src/seo/head.ts. All data flows from the same sources that
 * render the visible page (translations.ts, site.ts, data/masterplan.ts,
 * generated content), so markup can never drift from what users see.
 *
 * Deliberately omitted: Review / AggregateRating on our own organization —
 * self-serving review markup is against Google's structured-data
 * guidelines and risks a manual action. Testimonials stay visible-only.
 */

import { translations, type Lang } from '../i18n/translations';
import { fullFaq } from '../data/faq';
import { CENOTES, spotDesc, spotLabel } from '../data/masterplan';
import { absUrl, AUTHORS, ORG, PRICING, SITE_URL } from './site';
import type { PageMeta } from './meta';
import type { BlogPost } from '../generated/content';

type JsonLd = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function realEstateAgent(lang: Lang): JsonLd {
  return {
    '@type': 'RealEstateAgent',
    '@id': ORG_ID,
    name: ORG.name,
    alternateName: ORG.alternateName,
    description:
      lang === 'es'
        ? 'La única comunidad privada en Tulum con nueve cenotes dentro. Privadas exclusivas de baja densidad en el corazón de la selva.'
        : 'The only private community in Tulum with nine cenotes within. Exclusive low-density enclaves in the heart of the jungle.',
    url: `${SITE_URL}/`,
    logo: ORG.logo,
    image: ORG.image,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Tulum, Quintana Roo, México',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.showroom.streetAddress,
      addressLocality: ORG.showroom.addressLocality,
      addressRegion: ORG.showroom.addressRegion,
      addressCountry: ORG.showroom.addressCountry,
    },
    ...(ORG.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: ORG.geo.latitude,
            longitude: ORG.geo.longitude,
          },
        }
      : {}),
    hasMap: ORG.mapsUrl,
    email: ORG.email,
    telephone: ORG.telephone,
    sameAs: [ORG.instagram, ORG.whatsapp],
  };
}

export function webSite(lang: Lang): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'Selvadentro Tulum',
    inLanguage: lang === 'es' ? 'es-MX' : 'en',
    publisher: { '@id': ORG_ID },
  };
}

/** Product + Offer for the lots — matches the visible pricing exactly. */
export function lotProduct(lang: Lang, pageUrl: string): JsonLd {
  return {
    '@type': 'Product',
    name:
      lang === 'es'
        ? 'Lotes residenciales en Selvadentro Tulum (privada Suspiro)'
        : 'Residential lots at Selvadentro Tulum (Suspiro enclave)',
    description:
      lang === 'es'
        ? `Lotes de ${PRICING.lotSizeMinM2} a ${PRICING.lotSizeMaxM2.toLocaleString('en-US')} m² dentro de una comunidad privada con ${PRICING.cenoteCount} cenotes naturales y ${PRICING.jungleSharePercent}% de selva conservada. Plan de pagos a ${PRICING.paymentPlanMonths} meses sin intereses; entrega en ${PRICING.deliveryYear}.`
        : `Lots from ${PRICING.lotSizeMinM2} to ${PRICING.lotSizeMaxM2.toLocaleString('en-US')} m² inside a private community with ${PRICING.cenoteCount} natural cenotes and ${PRICING.jungleSharePercent}% of the jungle preserved. ${PRICING.paymentPlanMonths}-month interest-free payment plan; delivery in ${PRICING.deliveryYear}.`,
    image: ORG.image,
    brand: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      price: PRICING.lotPriceFromUSD,
      priceCurrency: PRICING.currency,
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
    },
  };
}

/** FAQPage generated from the SAME arrays the accordions render. */
export function faqPage(
  lang: Lang,
  pageUrl: string,
  items: Array<{ q: string; a: string }> = translations[lang].faq.items,
): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    inLanguage: lang === 'es' ? 'es-MX' : 'en',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** The nine cenotes as an ItemList of Places — the signature entity set. */
export function cenoteList(lang: Lang, pageUrl: string): JsonLd {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#cenotes`,
    name:
      lang === 'es'
        ? 'Los 9 cenotes de Selvadentro Tulum'
        : 'The 9 cenotes of Selvadentro Tulum',
    numberOfItems: CENOTES.length,
    itemListElement: CENOTES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Place',
        name: spotLabel(c, lang),
        description: spotDesc(c, lang),
        containedInPlace: { '@id': ORG_ID },
        ...(c.images[0] ? { image: absUrl(c.images[0]) } : {}),
      },
    })),
  };
}

export function videoObjects(lang: Lang): JsonLd[] {
  return [
    {
      '@type': 'VideoObject',
      name: lang === 'es' ? 'Conoce Selvadentro' : 'Meet Selvadentro',
      description:
        lang === 'es'
          ? 'Recorrido por Selvadentro, la comunidad privada de Tulum construida alrededor de nueve cenotes naturales.'
          : 'A tour of Selvadentro, the private Tulum community built around nine natural cenotes.',
      thumbnailUrl: 'https://img.youtube.com/vi/CGl3Omh5rlU/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/CGl3Omh5rlU',
      uploadDate: '2026-06-01',
      publisher: { '@id': ORG_ID },
    },
  ];
}

export function breadcrumbList(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function blogPosting(post: BlogPost): JsonLd {
  const author = AUTHORS[post.author];
  return {
    '@type': 'BlogPosting',
    '@id': `${absUrl(post.path)}#article`,
    headline: post.title,
    description: post.description,
    inLanguage: post.lang === 'es' ? 'es-MX' : 'en',
    datePublished: post.datePublished,
    dateModified: post.updated,
    mainEntityOfPage: absUrl(post.path),
    image: absUrl(post.ogImage ?? '/og/og-home.jpg'),
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: post.lang === 'es' ? author.roleEs : author.roleEn,
      url: absUrl(post.lang === 'es' ? '/desarrollador' : '/en/developer'),
      worksFor: { '@id': ORG_ID },
    },
    publisher: { '@id': ORG_ID },
  };
}

/**
 * The per-route graph. `post` is provided for blog article routes.
 */
export function graphFor(meta: PageMeta, post?: BlogPost): JsonLd {
  const lang = meta.lang;
  const pageUrl = absUrl(meta.path);
  const nodes: JsonLd[] = [realEstateAgent(lang), webSite(lang)];

  switch (meta.schemaKey) {
    case 'home':
      nodes.push(faqPage(lang, pageUrl), ...videoObjects(lang));
      break;
    case 'lots':
      nodes.push(lotProduct(lang, pageUrl));
      break;
    case 'cenotes':
      nodes.push(cenoteList(lang, pageUrl));
      break;
    case 'faq':
      // The FAQ page renders the extended set (base + EXTRA_FAQ).
      nodes.push(faqPage(lang, pageUrl, fullFaq(lang)));
      break;
    case 'blog-index':
      nodes.push({
        '@type': 'CollectionPage',
        '@id': pageUrl,
        name: meta.title,
        description: meta.description,
        inLanguage: lang === 'es' ? 'es-MX' : 'en',
        isPartOf: { '@id': WEBSITE_ID },
      });
      break;
    case 'article-page':
      if (post) {
        nodes.push(
          blogPosting(post),
          breadcrumbList([
            {
              name: 'Blog',
              path: lang === 'es' ? '/blog' : '/en/blog',
            },
            { name: post.title, path: post.path },
          ]),
        );
      } else {
        // Standalone guide-style landing page.
        nodes.push({
          '@type': 'WebPage',
          '@id': pageUrl,
          name: meta.title,
          description: meta.description,
          inLanguage: lang === 'es' ? 'es-MX' : 'en',
          dateModified: meta.updated,
          isPartOf: { '@id': WEBSITE_ID },
        });
      }
      break;
    default:
      break;
  }

  return { '@context': 'https://schema.org', '@graph': nodes };
}
