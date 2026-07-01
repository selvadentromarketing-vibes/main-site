import { useState } from 'react';
import type { Lang } from '../i18n/translations';

/**
 * Data model for a hoverable amenity on the masterplan image.
 *
 * Coordinates are percentages of the image container so the layout scales
 * naturally on resize. Positions are approximate — fine-tune by opening
 * `/#masterplan` and nudging x/y until each dot lands on its numeric label
 * in the masterplan render.
 *
 * Copy sourced from the Suspiro Español brochure (June 2026).
 */
export interface Hotspot {
  id: string;
  x: number;      // % from left
  y: number;      // % from top
  labelEs: string;
  labelEn: string;
  descEs?: string;
  descEn?: string;
  category: 'amenity' | 'cenote';
  images: string[]; // 1-2 render paths
}

export const HOTSPOTS: Hotspot[] = [
  // ─── Amenidades (12 numbered items in the render) ────────────
  {
    id: 'acceso',
    x: 7, y: 65,
    labelEs: 'Acceso', labelEn: 'Access',
    descEs: 'Un ingreso enmarcado por la selva — donde comienza otra manera de llegar a casa.',
    descEn: 'A jungle-framed arrival — where a new way of coming home begins.',
    category: 'amenity',
    images: ['/suspiro-entrance.webp'],
  },
  {
    id: 'mirador',
    x: 15, y: 45,
    labelEs: 'Mirador', labelEn: 'Lookout tower',
    descEs: 'Un mirador suspendido entre la selva y el cenote, donde cada paso revela una nueva perspectiva.',
    descEn: 'A lookout suspended between jungle and cenote, where every step reveals a new perspective.',
    category: 'amenity',
    images: ['/amenity-cenote-mirador.webp'],
  },
  {
    id: 'kids-jungle',
    x: 22, y: 60,
    labelEs: 'Parque de niños', labelEn: 'Kids park',
    descEs: 'Un pequeño mundo dentro de la selva, donde jugar, explorar y descubrir se vuelve parte de cada día.',
    descEn: 'A little world within the jungle, where playing, exploring, and discovering become part of every day.',
    category: 'amenity',
    images: ['/amenity-parque-ninos.webp'],
  },
  {
    id: 'pets-jungle',
    x: 28, y: 55,
    labelEs: 'Parque de mascotas', labelEn: 'Pets park',
    descEs: 'Es libertad entre árboles, senderos que invitan a explorar y momentos simples que se sienten más.',
    descEn: 'Freedom between trees, trails that invite exploration, and simple moments that feel like more.',
    category: 'amenity',
    images: ['/amenity-parque-mascotas.webp'],
  },
  {
    id: 'jungle-gym',
    x: 35, y: 40,
    labelEs: 'Jungle Gym', labelEn: 'Jungle Gym',
    descEs: 'Un espacio para el cuerpo, rodeado de selva viva.',
    descEn: 'A space for the body, surrounded by living jungle.',
    category: 'amenity',
    images: ['/render-spa.webp'],
  },
  {
    id: 'padel',
    x: 42, y: 50,
    labelEs: 'Canchas de pádel y pickleball', labelEn: 'Pádel & pickleball courts',
    descEs: 'Un espacio donde la energía y la naturaleza se encuentran. Canchas rodeadas de selva, pensadas para disfrutar el juego a otro ritmo.',
    descEn: 'Where energy meets nature. Courts framed by jungle — designed to play at a different pace.',
    category: 'amenity',
    images: ['/amenity-padel.webp'],
  },
  {
    id: 'pabellon-holistico',
    x: 50, y: 45,
    labelEs: 'Pabellón Holístico', labelEn: 'Holistic pavilion',
    descEs: 'Cada rincón fue pensado para sentirse. Aquí, la naturaleza no rodea, abraza.',
    descEn: 'Every corner designed to be felt. Here, nature doesn’t surround — it embraces.',
    category: 'amenity',
    images: ['/amenity-pabellon-holistico.webp'],
  },
  {
    id: 'village-comercial',
    x: 58, y: 55,
    labelEs: 'Village Comercial', labelEn: 'Commercial Village',
    descEs: 'Un pequeño pueblo dentro de la selva — servicios y encuentros a un paso de casa.',
    descEn: 'A little village within the jungle — services and encounters a step from home.',
    category: 'amenity',
    images: ['/render-jungle-bar.webp'],
  },
  {
    id: 'casa-arbol',
    x: 66, y: 40,
    labelEs: 'Casa del Árbol', labelEn: 'Treehouse',
    descEs: 'Un refugio elevado entre las ramas — para contemplar la selva desde adentro.',
    descEn: 'An elevated refuge among the branches — to contemplate the jungle from within.',
    category: 'amenity',
    images: ['/amenity-naturaleza.webp'],
  },
  {
    id: 'jungle-bar',
    x: 73, y: 50,
    labelEs: 'Jungle Bar', labelEn: 'Jungle Bar',
    descEs: 'Cócteles artesanales y textura natural — el punto de encuentro sin prisa.',
    descEn: 'Craft cocktails and natural texture — the unhurried meeting point.',
    category: 'amenity',
    images: ['/render-jungle-bar.webp'],
  },
  {
    id: 'casa-cenotes',
    x: 80, y: 45,
    labelEs: 'Casa de los Cenotes', labelEn: 'Cenote House',
    descEs: 'El alma social del entorno — restaurante, bar alberca y playas. Una alberca que se funde con los cenotes.',
    descEn: 'The social heart — restaurant, pool bar, and beaches. A pool that merges with the cenotes.',
    category: 'amenity',
    images: ['/amenity-casa-cenotes.webp', '/amenity-comunidad.webp'],
  },
  {
    id: 'wellness',
    x: 88, y: 50,
    labelEs: 'Wellness', labelEn: 'Wellness',
    descEs: 'Refugios escondidos entre la selva, donde el agua cristalina y el silencio crean un momento de calma absoluta.',
    descEn: 'Hidden refuges within the jungle, where crystalline water and silence create a moment of absolute calm.',
    category: 'amenity',
    images: ['/amenity-cuerpo.webp', '/render-spa.webp'],
  },

  // ─── 9 Cenotes naturales (from brochure page 7) ─────────────
  {
    id: 'cenote-mirador',
    x: 18, y: 35,
    labelEs: 'Cenote Mirador', labelEn: 'Cenote Mirador',
    descEs: 'Un cenote contemplado desde una torre suspendida entre la selva.',
    descEn: 'A cenote contemplated from a tower suspended in the jungle.',
    category: 'cenote',
    images: ['/amenity-cenote-mirador.webp'],
  },
  {
    id: 'cenote-piedra',
    x: 25, y: 25,
    labelEs: 'Cenote Piedra', labelEn: 'Cenote Piedra',
    descEs: 'El silencio de la roca antigua y el reflejo cristalino del agua.',
    descEn: 'The silence of ancient rock and the crystalline reflection of water.',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-madera',
    x: 35, y: 30,
    labelEs: 'Cenote Madera', labelEn: 'Cenote Madera',
    descEs: 'Espacios donde desconectas del exterior para conectar contigo.',
    descEn: 'Spaces where you disconnect from the outside to connect with yourself.',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-caverna',
    x: 45, y: 28,
    labelEs: 'Cenote Caverna', labelEn: 'Cenote Caverna',
    descEs: 'Una catedral de piedra donde la luz y el agua se encuentran.',
    descEn: 'A cathedral of stone where light and water meet.',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-selva',
    x: 55, y: 32,
    labelEs: 'Cenote Selva', labelEn: 'Cenote Selva',
    descEs: 'Enterrado entre raíces — cada gota, un eco de la selva.',
    descEn: 'Buried among roots — each drop, an echo of the jungle.',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-vida',
    x: 62, y: 26,
    labelEs: 'Cenote Vida', labelEn: 'Cenote Vida',
    descEs: 'Un pulso azul que respira con la selva.',
    descEn: 'A blue pulse breathing with the jungle.',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-playa',
    x: 72, y: 30,
    labelEs: 'Cenote Playa', labelEn: 'Cenote Playa',
    descEs: 'Un refugio natural donde la arena, la luz y el silencio crean un paisaje que se siente más que se observa.',
    descEn: 'A natural refuge where sand, light, and silence create a landscape felt more than observed.',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-azul',
    x: 82, y: 28,
    labelEs: 'Cenote Azul', labelEn: 'Cenote Azul',
    descEs: 'El azul más profundo de Selvadentro — inmersión total.',
    descEn: 'The deepest blue in Selvadentro — total immersion.',
    category: 'cenote',
    images: ['/hero-cenote.webp'],
  },
  {
    id: 'cenote-luz',
    x: 90, y: 32,
    labelEs: 'Cenote Luz', labelEn: 'Cenote Luz',
    descEs: 'Donde el rayo del sol descubre el agua a mediodía.',
    descEn: 'Where the sun’s ray reveals the water at noon.',
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
 * tap (mobile) and shows label, description, and images.
 */
export default function HotspotOverlay({ lang }: HotspotOverlayProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {HOTSPOTS.map((h) => {
        const isOpen = openId === h.id;
        const label = lang === 'es' ? h.labelEs : h.labelEn;
        const desc = lang === 'es' ? h.descEs : h.descEn;
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
              <span
                className={`absolute inset-0 rounded-full ${isCenote ? 'bg-sky-400' : 'bg-brand-oro'} opacity-40 animate-ping`}
                style={{ animationDuration: '2.5s' }}
              />
            </button>

            {isOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -translate-y-full -mt-3 pointer-events-none"
                style={{ minWidth: '260px', maxWidth: '320px' }}
              >
                <div className="bg-white rounded-xl shadow-2xl border border-brand-verde/10 overflow-hidden pointer-events-auto">
                  <div className={`h-1 ${isCenote ? 'bg-sky-400' : 'bg-brand-oro'}`} />
                  <div className={`grid ${h.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-px bg-brand-crema-osc`}>
                    {h.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={label}
                        className="w-full h-28 object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="p-3.5">
                    <div className="text-[10px] uppercase tracking-widest text-brand-gris mb-1">
                      {isCenote ? 'Cenote' : lang === 'es' ? 'Amenidad' : 'Amenity'}
                    </div>
                    <div className="font-serif text-base text-brand-verde-osc leading-tight mb-2">
                      {label}
                    </div>
                    {desc && (
                      <p className="text-xs text-brand-gris leading-relaxed">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-3 h-3 bg-white border-r border-b border-brand-verde/10 rotate-45 mx-auto -mt-1.5" />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
