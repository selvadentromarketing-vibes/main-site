/**
 * Bilingual copy for the Selvadentro main site.
 *
 * Source of truth: the approved redesign guide (Selvadentro_Guia_Rediseno_Web.docx,
 * June 2026). Every string here was copy-edited and signed off — don't change
 * tone, length, or structure without checking with marketing.
 */

export type Lang = 'es' | 'en';
export const LANGS: Lang[] = ['es', 'en'];
export const DEFAULT_LANG: Lang = 'es';

export interface Distance {
  label: string;
  minutes: number;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  photo: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface AmenityCard {
  title: string;
  image: string;
  items: string[];
}

export interface Translation {
  nav: {
    project: string;
    suspiro: string;
    masterplan: string;
    investment: string;
    testimonials: string;
    cta: string;
  };

  hero: {
    headline: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  stats: Stat[];

  about: {
    title: string;
    body: string;
    silence: string;
    videoTitle: string;
    videoFallback: string;
  };

  location: {
    title: string;
    distances: Distance[];
  };

  suspiro: {
    eyebrow: string;
    headline: string;
    body: string;
    pricing: string;
    protection: string;
    cta: string;
  };

  pieceOfJungle: {
    eyebrow: string;
    ratio: string;
    lots: string;
  };

  masterplan: {
    eyebrow: string;
    headline: string;
    bullets: string;
    cta: string;
    legendActive: string;
    legendSold: string;
    legendComingSoon: string;
  };

  amenities: {
    eyebrow: string;
    headline: string;
    cards: AmenityCard[];
  };

  investment: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    timeline: {
      milestone: string;
      sub: string;
    }[];
    cta: string;
  };

  credentials: {
    eyebrow: string;
    headline: string;
    body: string;
    partners: string;
  };

  testimonials: {
    eyebrow: string;
    headline: string;
    items: Testimonial[];
  };

  faq: {
    eyebrow: string;
    headline: string;
    items: FAQItem[];
  };

  finalCta: {
    eyebrow: string;
    headline: string;
    body: string;
    callCta: string;
    whatsappCta: string;
    formTitle: string;
    formName: string;
    formLastName: string;
    formPhone: string;
    formEmail: string;
    formBudget: string;
    formBudgetPlaceholder: string;
    formHorizon: string;
    formHorizonPlaceholder: string;
    horizonOptions: { value: string; label: string }[];
    formSubmit: string;
    formSubmitting: string;
    formSuccess: string;
    formError: string;
    formConsent: string;
  };

  footer: {
    tagline: string;
    copyright: string;
    contactEmail: string;
    contactPhone: string;
  };
}

export const translations: Record<Lang, Translation> = {
  es: {
    nav: {
      project: 'Proyecto',
      suspiro: 'Suspiro',
      masterplan: 'Masterplan',
      investment: 'Inversión',
      testimonials: 'Testimonios',
      cta: 'Ver disponibilidad',
    },

    hero: {
      headline: 'La única comunidad privada en Tulum con nueve cenotes dentro.',
      subhead:
        'Privadas exclusivas de baja densidad en el corazón de la selva. Acceso limitado.',
      ctaPrimary: 'Ver disponibilidad',
      ctaSecondary: 'Recorrer el proyecto',
    },

    stats: [
      { number: '9', label: 'Cenotes naturales dentro del proyecto' },
      { number: '65%', label: 'De la selva conservada e intacta' },
      { number: 'Últimos', label: 'Lotes en Suspiro' },
      { number: '2', label: 'Privadas ya vendidas en su totalidad' },
    ],

    about: {
      title: 'Selvadentro no es un desarrollo. Es un territorio.',
      body: 'Una comunidad privada de baja densidad en el corazón de la selva de Tulum, construida sobre 9 cenotes naturales y diseñada para conservar el 65% de la selva intacta. Aquí no se tala para construir — se construye para preservar.',
      silence:
        'Silencio real. Privacidad real. Una conexión con la tierra que cada vez es más difícil de encontrar.',
      videoTitle: 'Conoce Selvadentro',
      videoFallback:
        'Película institucional próximamente. Mientras tanto, mira el corto:',
    },

    location: {
      title:
        'Despiertas con el sonido de la selva. En minutos, estás en todo lo que importa.',
      distances: [
        { label: 'Tren Maya', minutes: 8 },
        { label: 'Bahía Solimán', minutes: 10 },
        { label: 'Xel-Há', minutes: 10 },
        { label: 'Zona Hotelera', minutes: 20 },
        { label: 'Aeropuerto Tulum', minutes: 35 },
        { label: 'Playa del Carmen', minutes: 40 },
        { label: 'Aeropuerto Cancún', minutes: 90 },
      ],
    },

    suspiro: {
      eyebrow: 'La privada activa',
      headline: 'Suspiro',
      body: 'Hay lugares donde llegar a casa se siente como exhalar después de un día largo. Suspiro es ese lugar. Una privada de baja densidad diseñada para quienes buscan una vida más ligera — en conexión con la naturaleza, con sus cenotes, con su propia calma.',
      pricing:
        'Lotes desde $68,000 USD — desde $167 USD/m² · Plan de pagos a 48 meses sin intereses',
      protection:
        'Lo que protege tu inversión: COS 35% · CUS 70% · Dos niveles + roof deck. Normativa de construcción que garantiza baja densidad para siempre.',
      cta: 'Cotizar Suspiro',
    },

    pieceOfJungle: {
      eyebrow: 'Tu pedazo de selva',
      ratio:
        'El 35% es tuyo para construir. El 65% restante es selva privada — intacta, tuya, para siempre.',
      lots: 'Lotes desde 400 m² hasta 1,673 m². Dos niveles + roof deck.',
    },

    masterplan: {
      eyebrow: 'Masterplan',
      headline:
        'Un proyecto diseñado para preservar la selva — y crecer en valor.',
      bullets: '9 cenotes · +12 experiencias únicas',
      cta: 'Recorrer el proyecto',
      legendActive: 'Disponible',
      legendSold: 'Vendida',
      legendComingSoon: 'Próximamente',
    },

    amenities: {
      eyebrow: 'Amenidades',
      headline: '+12 experiencias entre la selva',
      cards: [
        {
          title: 'Naturaleza viva',
          image: '/amenity-naturaleza.webp',
          items: [
            '9 cenotes',
            'Senderos entre la selva',
            'Miradores',
            'Casa del Árbol',
          ],
        },
        {
          title: 'Cuerpo y movimiento',
          image: '/amenity-cuerpo.webp',
          items: [
            'Wellness center',
            'Jungle Gym',
            'Cancha de pádel y pickleball',
            'Pabellón Holístico',
          ],
        },
        {
          title: 'Vida en comunidad',
          image: '/amenity-comunidad.webp',
          items: [
            'Casa de los Cenotes',
            'Jungle Bar',
            'Village Comercial',
            'Kids Jungle',
            'Pets Jungle',
          ],
        },
      ],
    },

    investment: {
      eyebrow: 'Inversión',
      headline: 'El momento de entrar es ahora.',
      paragraphs: [
        'En mayo de 2025, un metro cuadrado en Selvadentro costaba $119 USD. Hoy cuesta $167 USD. La trayectoria es clara.',
        'Selvadentro es el único desarrollo residencial privado en la Ruta de los Cenotes de Tulum. Lo que nos rodea son reservas naturales y atracciones — no competencia. Esa escasez no es marketing. Es geografía.',
        'Con el Libramiento Playa-Cobá en construcción y el Tren Maya a minutos, la infraestructura que multiplica el valor ya está llegando.',
        'Proyectamos cerrar el proyecto en +$360 USD/m². Quien entra hoy, entra antes de que eso ocurra.',
      ],
      timeline: [
        { milestone: '$119 USD/m²', sub: 'Mayo 2025 · Lanzamiento' },
        { milestone: '$167 USD/m²', sub: 'Hoy · +40% en 12 meses' },
        { milestone: '+$360 USD/m²', sub: 'Proyección al cierre' },
      ],
      cta: 'Habla con un asesor',
    },

    credentials: {
      eyebrow: 'Credenciales',
      headline: 'Construido sobre décadas de trayectoria.',
      body: 'Selvadentro es el primer proyecto de JJF Creando — una alianza entre dos familias con historia comprobada en el desarrollo inmobiliario premium del sureste mexicano. Juan Enrique Cámara Solís lleva décadas desarrollando proyectos de referencia en la región: Aldea Zamá y Yucatán Country Club, entre otros. Fernando Martínez Zurita, a través de Mazza Capital, ha estructurado y desarrollado proyectos de alto valor con enfoque boutique en Yucatán. Selvadentro es dirigido por Juan Esteban Cámara Cámara — segunda generación, con la visión de llevar ese legado a su expresión más ambiciosa. El diseño y arquitectura a cargo de Maat Handasa y AMA Estudio — dos despachos de referencia en la región.',
      partners: 'Certeza jurídica. Trayectoria real. Un equipo que ya lo ha hecho antes.',
    },

    testimonials: {
      eyebrow: 'Testimonios',
      headline: 'Quienes ya eligieron Selvadentro',
      items: [
        {
          name: 'Shawn Khodadad',
          quote:
            'En un mundo que va demasiado rápido, Selvadentro se siente como paz construida dentro de la selva.',
          photo: '/testimonial-shawn.webp',
        },
        {
          name: 'Angela Epstein',
          quote:
            'Selvadentro nos recordó la magia de México y la conexión tan especial con la naturaleza.',
          photo: '/testimonial-angela.webp',
        },
        {
          name: 'Ricardo Garza',
          quote:
            'La seguridad que sentí en el proyecto y la experiencia de recorrer Selvadentro hicieron que tomara la decisión.',
          photo: '/testimonial-ricardo.webp',
        },
      ],
    },

    faq: {
      eyebrow: 'Preguntas frecuentes',
      headline: 'Lo que necesitas saber',
      items: [
        {
          q: '¿Cuándo puedo construir mi casa?',
          a: 'Tú decides cuándo. No hay presión para iniciar. Nuestras normas de construcción protegen a toda la comunidad —ruido, densidad e integración con la selva—, así que el conjunto se mantiene siempre. Una vez que inicias obra, el plazo máximo para terminar es de 2 años.',
        },
        {
          q: '¿Hay cuota de mantenimiento?',
          a: 'Sí, aproximadamente 5 pesos por m² al mes. Además, el fideicomiso incluye una reserva de la asociación de colonos que garantiza el mantenimiento correcto de las amenidades y áreas comunes a largo plazo.',
        },
        {
          q: '¿Cuándo se entregan los lotes y amenidades?',
          a: 'Suspiro y sus amenidades se entregan en 2029. Sin embargo, los residentes de Selvadentro disfrutan el proyecto desde el momento de su compra: acceso a los cenotes, áreas comunes y experiencias.',
        },
        {
          q: '¿Puedo rentar mi propiedad?',
          a: 'Sí. Trabajamos con los mejores property managers para asegurar la mejor ocupación y el cuidado de tu residencia. Selvadentro ofrece lo que el viajero de Tulum busca —experiencias, lujo descalzo, desconectar para conectar—, lo que se traduce en mejores tarifas y ocupación.',
        },
        {
          q: '¿Qué incluye la infraestructura?',
          a: 'Energía sustentable, red de agua subterránea, acceso controlado, seguridad 24/7, internet en áreas comunes, iluminación y paisajismo integrado, además de la Avenida Selvadentro y la calle interior de Suspiro.',
        },
      ],
    },

    finalCta: {
      eyebrow: 'Cierre',
      headline: 'El momento de entrar es hoy.',
      body: 'Mirador y Refugio ya no están disponibles. Suspiro es la privada activa — con lotes limitados y precio que sigue creciendo. Habla con un asesor y descubre qué lote es el tuyo.',
      callCta: 'Agendar llamada',
      whatsappCta: 'Escribir por WhatsApp',
      formTitle: 'Déjanos tus datos y te contactamos en menos de 24 horas.',
      formName: 'Nombre',
      formLastName: 'Apellido',
      formPhone: 'Teléfono',
      formEmail: 'Correo',
      formBudget: 'Presupuesto',
      formBudgetPlaceholder: 'Selecciona un rango',
      formHorizon: 'Plazo de inversión',
      formHorizonPlaceholder: 'Selecciona un plazo',
      horizonOptions: [
        { value: 'Immediately', label: 'Inmediatamente' },
        { value: '0-3 meses', label: '0-3 meses' },
        { value: '3-6 meses', label: '3-6 meses' },
        { value: '6-12 meses', label: '6-12 meses' },
        { value: '12+ meses', label: '12+ meses' },
      ],
      formSubmit: 'Ver disponibilidad y precios',
      formSubmitting: 'Enviando...',
      formSuccess:
        '¡Listo! Un asesor de Selvadentro te contactará en menos de 24 horas.',
      formError:
        'No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos a info@selvadentrotulum.com.',
      formConsent:
        'Al enviar aceptas que un asesor de Selvadentro te contacte. No compartimos tus datos.',
    },

    footer: {
      tagline: 'tierra de cenotes',
      copyright: 'Todos los derechos reservados',
      contactEmail: 'info@selvadentrotulum.com',
      contactPhone: '+52 999 489 0828',
    },
  },

  // ──────────────────────────────────────────────────────────────────
  // ENGLISH
  // ──────────────────────────────────────────────────────────────────
  en: {
    nav: {
      project: 'Project',
      suspiro: 'Suspiro',
      masterplan: 'Masterplan',
      investment: 'Investment',
      testimonials: 'Testimonials',
      cta: 'View availability',
    },

    hero: {
      headline: 'The only private community in Tulum with nine cenotes within.',
      subhead:
        'Exclusive low-density enclaves in the heart of the jungle. Limited access.',
      ctaPrimary: 'View availability',
      ctaSecondary: 'Take the tour',
    },

    stats: [
      { number: '9', label: 'Natural cenotes within the project' },
      { number: '65%', label: 'Of the jungle preserved and untouched' },
      { number: 'Final', label: 'Lots in Suspiro' },
      { number: '2', label: 'Enclaves already fully sold' },
    ],

    about: {
      title: 'Selvadentro is not a development. It is a territory.',
      body: 'A private, low-density community in the heart of the Tulum jungle, built around 9 natural cenotes and designed to keep 65% of the jungle untouched. Here we don’t clear to build — we build to preserve.',
      silence:
        'Real silence. Real privacy. A connection to the land that is increasingly rare to find.',
      videoTitle: 'Meet Selvadentro',
      videoFallback: 'Press play to watch the short film:',
    },

    location: {
      title:
        'Wake up to the sound of the jungle. Minutes from everything that matters.',
      distances: [
        { label: 'Maya Train', minutes: 8 },
        { label: 'Bahía Solimán', minutes: 10 },
        { label: 'Xel-Há', minutes: 10 },
        { label: 'Hotel Zone', minutes: 20 },
        { label: 'Tulum Airport', minutes: 35 },
        { label: 'Playa del Carmen', minutes: 40 },
        { label: 'Cancún Airport', minutes: 90 },
      ],
    },

    suspiro: {
      eyebrow: 'The active enclave',
      headline: 'Suspiro',
      body: 'There are places where coming home feels like exhaling after a long day. Suspiro is that place. A low-density enclave designed for those seeking a lighter life — in connection with nature, with its cenotes, with their own calm.',
      pricing:
        'Lots from $68,000 USD — from $167 USD/m² · 48-month interest-free payment plan',
      protection:
        'What protects your investment: Build up to two levels + rooftop. Only 35% lot coverage — by regulation, guaranteeing low density forever. As a foreign buyer, you can own here securely through a bank trust (fideicomiso) — fully legal, fully protected.',
      cta: 'Price Suspiro',
    },

    pieceOfJungle: {
      eyebrow: 'Your piece of jungle',
      ratio:
        '35% is yours to build on. The remaining 65% is private jungle — untouched, yours, forever.',
      lots: 'Lots from 400 m² up to 1,673 m². Two levels + roof deck.',
    },

    masterplan: {
      eyebrow: 'Masterplan',
      headline: 'A project designed to preserve the jungle — and grow in value.',
      bullets: '9 cenotes · 12+ unique experiences',
      cta: 'Explore the project',
      legendActive: 'Available',
      legendSold: 'Sold',
      legendComingSoon: 'Coming soon',
    },

    amenities: {
      eyebrow: 'Amenities',
      headline: '12+ experiences within the jungle',
      cards: [
        {
          title: 'Living nature',
          image: '/amenity-naturaleza.webp',
          items: ['9 cenotes', 'Jungle trails', 'Lookouts', 'Treehouse'],
        },
        {
          title: 'Body & movement',
          image: '/amenity-cuerpo.webp',
          items: ['Wellness center', 'Jungle Gym', 'Padel & pickleball court', 'Holistic pavilion'],
        },
        {
          title: 'Community life',
          image: '/amenity-comunidad.webp',
          items: [
            'Cenote House',
            'Jungle Bar',
            'Village Commercial',
            'Kids Jungle',
            'Pets Jungle',
          ],
        },
      ],
    },

    investment: {
      eyebrow: 'Investment',
      headline: 'The moment to enter is now.',
      paragraphs: [
        'In May 2025, a square meter in Selvadentro cost $119 USD. Today it costs $167 USD. The trajectory is clear.',
        'Selvadentro is the only private residential development on Tulum’s Ruta de los Cenotes. What surrounds us are nature reserves and attractions — not competition. That scarcity isn’t marketing. It’s geography.',
        'With the Playa-Cobá bypass under construction and the Maya Train minutes away, the infrastructure that multiplies value is already arriving.',
        'We project closing the project at +$360 USD/m². Whoever enters today, enters before that happens.',
      ],
      timeline: [
        { milestone: '$119 USD/m²', sub: 'May 2025 · Launch' },
        { milestone: '$167 USD/m²', sub: 'Today · +40% in 12 months' },
        { milestone: '+$360 USD/m²', sub: 'Closing projection' },
      ],
      cta: 'Talk to an advisor',
    },

    credentials: {
      eyebrow: 'Credentials',
      headline: 'Built on decades of track record.',
      body: 'Selvadentro is JJF Creando’s first project — an alliance between two families with a proven history in premium real estate development in southeast Mexico. Juan Enrique Cámara Solís has spent decades developing reference projects in the region: Aldea Zamá and Yucatán Country Club, among others. Fernando Martínez Zurita, through Mazza Capital, has structured and developed high-value projects with a boutique focus in Yucatán. Selvadentro is led by Juan Esteban Cámara Cámara — second generation, with the vision of bringing that legacy to its most ambitious expression. Design and architecture by Maat Handasa and AMA Estudio — two reference firms in the region.',
      partners: 'Legal certainty. Real track record. A team that has done this before.',
    },

    testimonials: {
      eyebrow: 'Testimonials',
      headline: 'Those who already chose Selvadentro',
      items: [
        {
          name: 'Shawn Khodadad',
          quote:
            'In a world moving too fast, Selvadentro Tulum feels like peace built into the jungle.',
          photo: '/testimonial-shawn.webp',
        },
        {
          name: 'Angela Epstein',
          quote:
            'Selvadentro reminded us of the magic of Mexico and the special connection with nature.',
          photo: '/testimonial-ricardo.webp',
        },
        {
          name: 'Ricardo Garza',
          quote:
            'The confidence I felt in the project and the experience of walking through Selvadentro made me make the decision.',
          photo: '/testimonial-ricardo.webp',
        },
      ],
    },

    faq: {
      eyebrow: 'Frequently asked questions',
      headline: 'What you need to know',
      items: [
        {
          q: 'When can I build my home?',
          a: 'You decide when. There is no pressure to start. Our construction rules protect the entire community — noise, density and integration with the jungle — so the whole holds together over time. Once you start, the maximum build time is 2 years.',
        },
        {
          q: 'Is there a maintenance fee?',
          a: 'Yes, approximately 5 pesos per m² per month. The trust also includes a homeowners-association reserve that ensures proper long-term maintenance of amenities and common areas.',
        },
        {
          q: 'When are lots and amenities delivered?',
          a: 'Suspiro and its amenities are delivered in 2029. However, Selvadentro residents enjoy the project from the moment they buy — access to the cenotes, common areas and experiences.',
        },
        {
          q: 'Can I rent my property?',
          a: 'Yes. We work with the best property managers to ensure maximum occupancy and care of your residence. Selvadentro offers exactly what the Tulum traveler is looking for — experiences, barefoot luxury, disconnecting to connect — which translates into better rates and occupancy.',
        },
        {
          q: 'What does the infrastructure include?',
          a: 'Sustainable energy, an underground water network, controlled access, 24/7 security, internet in common areas, integrated lighting and landscaping, plus Avenida Selvadentro and Suspiro’s interior street.',
        },
      ],
    },

    finalCta: {
      eyebrow: 'Closing',
      headline: 'The moment to enter is today.',
      body: 'Mirador and Refugio are no longer available. Suspiro is the active enclave — with limited lots and a price that keeps growing. Talk to an advisor and discover which lot is yours.',
      callCta: 'Schedule a call',
      whatsappCta: 'Message on WhatsApp',
      formTitle: 'Leave us your details and we’ll be in touch within 24 hours.',
      formName: 'First name',
      formLastName: 'Last name',
      formPhone: 'Phone',
      formEmail: 'Email',
      formBudget: 'Budget',
      formBudgetPlaceholder: 'Select a range',
      formHorizon: 'Investment horizon',
      formHorizonPlaceholder: 'Select a horizon',
      horizonOptions: [
        { value: 'Immediately', label: 'Immediately' },
        { value: '0-3 meses', label: '0–3 months' },
        { value: '3-6 meses', label: '3–6 months' },
        { value: '6-12 meses', label: '6–12 months' },
        { value: '12+ meses', label: '12+ months' },
      ],
      formSubmit: 'View availability & pricing',
      formSubmitting: 'Sending...',
      formSuccess:
        'All set! A Selvadentro advisor will be in touch within 24 hours.',
      formError:
        'We couldn’t send your request. Please try again or email info@selvadentrotulum.com.',
      formConsent:
        'By submitting you agree to be contacted by a Selvadentro advisor. We never share your data.',
    },

    footer: {
      tagline: 'tierra de cenotes',
      copyright: 'All rights reserved',
      contactEmail: 'info@selvadentrotulum.com',
      contactPhone: '+52 999 489 0828',
    },
  },
};
