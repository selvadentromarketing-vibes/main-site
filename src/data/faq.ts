import { translations, type Lang, type FAQItem } from '../i18n/translations';

/**
 * Extended FAQ — renders on /preguntas-frecuentes and /en/faq ONLY, and
 * feeds that page's FAQPage JSON-LD (src/seo/schema.ts) so the markup can
 * never drift from the visible answers. The homepage keeps the original
 * 5-item set from translations.ts.
 *
 * Numbers here must match src/seo/site.ts PRICING. Market-wide figures
 * (closing costs, trust fees) are stated as typical ranges, not promises.
 */

export const EXTRA_FAQ: Record<Lang, FAQItem[]> = {
  es: [
    {
      q: '¿Cuánto cuesta un lote en Selvadentro?',
      a: 'Los lotes de Suspiro, la privada activa, parten de $68,000 USD — desde $167 USD por m². Hay lotes desde 400 m² hasta 1,673 m², con plan de pagos a 48 meses sin intereses directamente con el desarrollador.',
    },
    {
      q: '¿Pueden comprar extranjeros?',
      a: 'Sí. Tulum está dentro de la zona restringida (a menos de 50 km de la costa), por lo que un comprador extranjero adquiere a través de un fideicomiso bancario: el banco sostiene el título y tú conservas todos los derechos de uso, renta, venta y herencia. Es la figura legal estándar en la Riviera Maya desde hace décadas; la renovación es por periodos de 50 años.',
    },
    {
      q: '¿Selvadentro tiene todos sus permisos en regla?',
      a: 'Sí, y es verificable: en septiembre de 2025 la SEDETUS de Quintana Roo confirmó públicamente el cumplimiento total de Selvadentro tras revisar su documentación urbana y ambiental. Puedes consultar los boletines oficiales de SEDETUS o pedirnos el expediente completo — dictámenes, constancias y autorizaciones estatales y municipales.',
    },
    {
      q: '¿Cómo es el proceso de compra?',
      a: 'En cuatro pasos: (1) eliges tu lote con un asesor — en sitio o por videollamada con el masterplan interactivo; (2) firmas promesa de compraventa y das el enganche; (3) pagas en mensualidades a 48 meses sin intereses; (4) escrituras ante notario público. Un comprador extranjero suma la constitución del fideicomiso, que gestiona la notaría.',
    },
    {
      q: '¿Qué costos de cierre debo presupuestar?',
      a: 'Como en toda compra inmobiliaria en Quintana Roo: impuesto de adquisición (ISABI), derechos de registro y honorarios notariales. En el mercado de la Riviera Maya el total suele ubicarse entre 6% y 8% del valor. Un comprador extranjero agrega la apertura del fideicomiso y su anualidad bancaria (típicamente $500–700 USD al año).',
    },
    {
      q: '¿Qué normas de construcción protegen mi inversión?',
      a: 'COS de 35% (solo puedes cubrir el 35% de tu lote), CUS de 70% y altura máxima de dos niveles más roof deck. Estas normas aplican a todos los vecinos por reglamento, así que la baja densidad y la selva que compraste no pueden desaparecer después.',
    },
    {
      q: '¿Puedo visitar el proyecto antes de comprar?',
      a: 'Sí, y lo recomendamos. Agenda una visita al showroom (Loft Corporativo Sinergia, Av. Tulum) y un recorrido en sitio por los cenotes y la privada Suspiro. Si aún no estás en México, hacemos recorridos por videollamada con el tour virtual 360°.',
    },
    {
      q: '¿Los cenotes se pueden usar?',
      a: 'Sí — son el corazón del proyecto. Los nueve cenotes fueron mapeados con especialistas y se conservan con acceso para residentes: áreas de nado, miradores y espacios contemplativos, cada uno con vocación propia. El acceso comienza desde tu compra, sin esperar la entrega de 2029.',
    },
    {
      q: '¿Qué plusvalía ha tenido el proyecto?',
      a: 'El precio por m² pasó de $119 USD en el lanzamiento (mayo de 2025) a $167 USD hoy: +40% en doce meses. La proyección del desarrollador al cierre del proyecto es de $280–360 USD por m², apoyada en el Tren Maya, el aeropuerto de Tulum y el Libramiento Playa-Cobá.',
    },
    {
      q: '¿Quién desarrolla Selvadentro?',
      a: 'JJF Creando: la alianza de las familias detrás de Aldea Zamá y Yucatán Country Club junto con Mazza Capital. El masterplan es de Estudio AMA y el diseño arquitectónico de amenidades de Maat Handasa (Chablé Resort). Décadas de trayectoria verificable en el sureste mexicano.',
    },
  ],
  en: [
    {
      q: 'How much does a lot at Selvadentro cost?',
      a: 'Lots in Suspiro, the active enclave, start at $68,000 USD — from $167 USD per m². Sizes run from 400 m² to 1,673 m², with a 48-month interest-free payment plan directly with the developer.',
    },
    {
      q: 'Can foreigners buy land at Selvadentro?',
      a: 'Yes. Tulum sits inside Mexico’s restricted zone (within 50 km of the coast), so foreign buyers purchase through a fideicomiso — a bank trust where the bank holds title and you keep every right to use, rent, sell, remodel or pass the property to heirs. It has been the standard legal structure across the Riviera Maya for decades and renews in 50-year terms.',
    },
    {
      q: 'Does Selvadentro have all its permits?',
      a: 'Yes, and it is verifiable: in September 2025 SEDETUS, Quintana Roo’s urban development ministry, publicly confirmed Selvadentro’s full compliance after reviewing its urban and environmental documentation. You can check the official SEDETUS bulletins or ask us for the complete file — state and municipal approvals included.',
    },
    {
      q: 'What does the buying process look like?',
      a: 'Four steps: (1) choose your lot with an advisor — on site or by video call over the interactive masterplan; (2) sign the purchase agreement and pay the down payment; (3) pay monthly over 48 months at 0% interest; (4) close before a Mexican notary. Foreign buyers add the fideicomiso setup, which the notary manages.',
    },
    {
      q: 'What closing costs should I budget?',
      a: 'The same as any Quintana Roo property purchase: acquisition tax (ISABI), registry fees and notary fees — across the Riviera Maya the total typically lands between 6% and 8% of the price. Foreign buyers add the fideicomiso setup plus its bank annuity, typically $500–700 USD per year.',
    },
    {
      q: 'Which building rules protect my investment?',
      a: 'A 35% lot-coverage cap (COS), 70% buildable intensity (CUS) and a two-levels-plus-roof-deck height limit. The rules bind every neighbor by regulation, so the low density and the jungle you bought into cannot be built away later.',
    },
    {
      q: 'Can I visit before buying?',
      a: 'Yes — we recommend it. Book a showroom visit (Loft Corporativo Sinergia, Av. Tulum) and an on-site tour of the cenotes and the Suspiro enclave. Not in Mexico yet? We run video-call tours over the 360° virtual tour.',
    },
    {
      q: 'Can residents actually use the cenotes?',
      a: 'Yes — they are the heart of the project. The nine cenotes were mapped with specialists and are preserved with resident access: swimming areas, lookouts and contemplative spaces, each with its own character. Access starts the day you buy, without waiting for the 2029 delivery.',
    },
    {
      q: 'How has the project appreciated so far?',
      a: 'The price per m² went from $119 USD at launch (May 2025) to $167 USD today — +40% in twelve months. The developer’s closing projection is $280–360 USD per m², supported by the Maya Train, Tulum International Airport and the Playa-Cobá bypass.',
    },
    {
      q: 'Who is developing Selvadentro?',
      a: 'JJF Creando: the alliance of the families behind Aldea Zamá and Yucatán Country Club together with Mazza Capital. The masterplan is by Estudio AMA and the amenity architecture by Maat Handasa (Chablé Resort) — decades of verifiable track record in southeast Mexico.',
    },
  ],
};

/** Full set rendered (and marked up) on the FAQ pages. */
export function fullFaq(lang: Lang): FAQItem[] {
  return [...translations[lang].faq.items, ...EXTRA_FAQ[lang]];
}
