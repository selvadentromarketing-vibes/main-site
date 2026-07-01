import { useState } from 'react';
import type { Lang } from '../i18n/translations';

/**
 * Data model for a hoverable amenity on the masterplan image.
 *
 * Coordinates are percentages of the image container so the layout scales
 * naturally on resize. Positions are approximate — fine-tune by opening
 * `/#masterplan` and nudging x/y until each dot lands on its numeric label
 * in the masterplan render.
 */
export interface Hotspot {
  id: string;
  x: number;      // % from left
  y: number;      // % from top
  labelEs: string;
  labelEn: string;
  category: 'amenity' | 'cenote';
  images: string[]; // 1-2 render paths
}

/**
 * Positions are ROUGH first-pass estimates over the current
 * public/masterplan.webp (extracted from the prototype). They need a visual
 * pass on the live site: open the section, hover each dot, adjust x/y until
 * it aligns with the corresponding number/marker on the render.
 */
export const HOTSPOTS: Hotspot[] = [
  // ─── Amenidades (numbered 1-12 in the render legend) ───────────
  {
    id: 'acceso',
    x: 7, y: 65,
    labelEs: 'Acceso',
    labelEn: 'Access',
    category: 'amenity',
    images: ['/suspiro-entrance.webp'],
  },
  {
    id: 'mirador',
    x: 15, y: 45,
    labelEs: 'Mirador',
    labelEn: 'Lookout tower',
    category: 'amenity',
    images: ['/render-mirador.webp'],
  },
  {
    id: 'kids-jungle',
    x: 22, y: 60,
    labelEs: 'Kids Jungle',
    labelEn: 'Kids Jungle',
    category: 'amenity',
    images: ['/render-aerial.webp'],
  },
  {
    id: 'pets-jungle',
    x: 28, y: 55,
    labelEs: 'Pets Jungle',
    labelEn: 'Pets Jungle',
    category: 'amenity',
    images: ['/render-aerial.webp'],
  },
  {
    id: 'jungle-gym',
    x: 35, y: 40,
    labelEs: 'Jungle Gym',
    labelEn: 'Jungle Gym',
    category: 'amenity',
    images: ['/render-spa.webp'],
  },
  {
    id: 'padel',
    x: 42, y: 50,
    labelEs: 'Canchas de Pádel',
    labelEn: 'Pádel courts',
    category: 'amenity',
    images: ['/render-padel.webp'],
  },
  {
    id: 'pabellon-holistico',
    x: 50, y: 45,
    labelEs: 'Pabellón Holístico',
    labelEn: 'Holistic pavilion',
    category: 'amenity',
    images: ['/amenity-cuerpo.webp'],
  },
  {
    id: 'village-comercial',
    x: 58, y: 55,
    labelEs: 'Village Comercial',
    labelEn: 'Commercial Village',
    category: 'amenity',
    images: ['/render-jungle-bar.webp'],
  },
  {
    id: 'casa-arbol',
    x: 66, y: 40,
    labelEs: 'Casa del Árbol',
    labelEn: 'Treehouse',
    category: 'amenity',
    images: ['/amenity-naturaleza.webp'],
  },
  {
    id: 'jungle-bar',
    x: 73, y: 50,
    labelEs: 'Jungle Bar',
    labelEn: 'Jungle Bar',
    category: 'amenity',
    images: ['/render-jungle-bar.webp'],
  },
  {
    id: 'casa-cenotes',
    x: 80, y: 45,
    labelEs: 'Casa de los Cenotes',
    labelEn: 'Cenote House',
    category: 'amenity',
    images: ['/amenity-comunidad.webp', '/render-pool.webp'],
  },
  {
    id: 'wellness',
    x: 88, y: 50,
    labelEs: 'Wellness',
    labelEn: 'Wellness',
    category: 'amenity',
    images: ['/amenity-cuerpo.webp', '/render-spa.webp'],
  },

  // ─── Cenotes (blue dots on the render) ─────────────────────────
  {
    id: 'cenote-mirador',
    x: 18, y: 35,
    labelEs: 'Cenote Mirador',
    labelEn: 'Cenote Mirador',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-playa',
    x: 30, y: 30,
    labelEs: 'Cenote Playa',
    labelEn: 'Cenote Playa',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-piedra',
    x: 45, y: 28,
    labelEs: 'Cenote Piedra',
    labelEn: 'Cenote Piedra',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-selva',
    x: 60, y: 32,
    labelEs: 'Cenote Selva',
    labelEn: 'Cenote Selva',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-caverna',
    x: 82, y: 30,
    labelEs: 'Cenote Caverna',
    labelEn: 'Cenote Caverna',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
];

interface HotspotOverlayProps {
  lang: Lang;
}

/**
 * Renders every hotspot as an absolutely-positioned dot over its parent.
 * Parent must be `position: relative`. Popup opens on hover (desktop) or
 * tap (mobile) and shows label + images.
 */
export default function HotspotOverlay({ lang }: HotspotOverlayProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {HOTSPOTS.map((h) => {
        const isOpen = openId === h.id;
        const label = lang === 'es' ? h.labelEs : h.labelEn;
        const isCenote = h.category === 'cenote';

        return (
          <div
            key={h.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <button
              type="button"
              onMouseEnter={() => setOpenId(h.id)}
              onMouseLeave={() => setOpenId(null)}
              onFocus={() => setOpenId(h.id)}
              onBlur={() => setOpenId(null)}
              onClick={() => setOpenId(isOpen ? null : h.id)}
              aria-label={label}
              className={`group relative w-4 h-4 sm:w-5 sm:h-5 rounded-full ring-2 ring-white/90 shadow-md transition-all duration-300 focus:outline-none ${
                isCenote ? 'bg-sky-400 hover:bg-sky-300' : 'bg-brand-oro hover:bg-brand-oro/90'
              } hover:scale-125 hover:shadow-lg`}
            >
              {/* Pulse ring for extra visibility */}
              <span
                className={`absolute inset-0 rounded-full ${isCenote ? 'bg-sky-400' : 'bg-brand-oro'} opacity-40 animate-ping`}
                style={{ animationDuration: '2.5s' }}
              />
            </button>

            {/* Popup card */}
            {isOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -translate-y-full -mt-3 pointer-events-none"
                style={{ minWidth: '220px', maxWidth: '280px' }}
              >
                <div className="bg-white rounded-xl shadow-2xl border border-brand-verde/10 overflow-hidden pointer-events-auto">
                  <div className={`h-1 ${isCenote ? 'bg-sky-400' : 'bg-brand-oro'}`} />
                  <div className={`grid ${h.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-px bg-brand-crema-osc`}>
                    {h.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={label}
                        className="w-full h-24 object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] uppercase tracking-widest text-brand-gris">
                      {isCenote
                        ? lang === 'es' ? 'Cenote' : 'Cenote'
                        : lang === 'es' ? 'Amenidad' : 'Amenity'}
                    </div>
                    <div className="font-serif text-base text-brand-verde-osc leading-tight">
                      {label}
                    </div>
                  </div>
                </div>
                {/* Little tail */}
                <div className="w-3 h-3 bg-white border-r border-b border-brand-verde/10 rotate-45 mx-auto -mt-1.5" />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
