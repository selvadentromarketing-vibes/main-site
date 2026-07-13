import { useEffect, useMemo, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import type { Lang } from '../i18n/translations';

/**
 * Interactive masterplan explorer — pan (drag/touch), zoom (wheel/pinch/
 * buttons), numbered dots matching the render's printed legend, and an HTML
 * legend synced with the map (hover highlights, click flies to the spot).
 *
 * Asset: public/masterplan-map.webp — the map band cropped out of the full
 * brochure sheet (original 2400×1552, crop y 130-1085 → 2400×955). Dot
 * positions are PIXEL coordinates on that crop, read off the render at 4×
 * zoom. If the asset is replaced, re-verify positions.
 *
 * On the printed map: cyan dots = CENOTES 1-9, dark dots = EXPERIENCIAS
 * 1-12. Some experiencias repeat at several locations (Kids Jungle ×5,
 * Pets Jungle ×4, Pabellón Holístico ×2) — each printed dot is a hotspot.
 *
 * Copy sourced from the Suspiro Español brochure (June 2026).
 */

const MAP_SRC = '/masterplan-map.jpg';
// Logical coordinate space (dot positions are calibrated against this) —
// SPOTS[] px/py are integer pixels on a 2400×955 crop. Kept as the reference
// system so dot placements work with any higher-res reissue that preserves
// the same framing.
const MAP_W = 2400;
const MAP_H = 955;
// Physical image dimensions on disk. The transformed layer is sized to
// MAP_W_PHYS×MAP_H_PHYS so the GPU compositor rasterizes it at native source
// resolution — otherwise zooming pixelates because the raster gets stretched
// beyond its capture size.
const MAP_W_PHYS = 3840;
const MAP_H_PHYS = 1528;
const RATIO = MAP_W / MAP_H;
const MAX_SCALE = 5;

export interface Spot {
  id: string;
  n: number;              // printed number on the map legend
  px: number;             // x in pixels on the 2400×955 crop
  py: number;             // y in pixels on the 2400×955 crop
  labelEs: string;
  labelEn: string;
  descEs?: string;
  descEn?: string;
  category: 'experiencia' | 'cenote';
  images: string[];       // 0-2 renders; [] → text-only popup
}

// Shared copy for experiencias printed at several locations
const KIDS = {
  labelEs: 'Kids Jungle', labelEn: 'Kids Jungle',
  descEs: 'Un pequeño mundo dentro de la selva, donde jugar, explorar y descubrir se vuelve parte de cada día.',
  descEn: 'A little world within the jungle, where playing, exploring, and discovering become part of every day.',
  images: ['/map-kids-jungle.jpg'],
};
const PETS = {
  labelEs: 'Pets Jungle', labelEn: 'Pets Jungle',
  descEs: 'Es libertad entre árboles, senderos que invitan a explorar y momentos simples que se sienten más.',
  descEn: 'Freedom between trees, trails that invite exploration, and simple moments that feel like more.',
  images: ['/map-pets-jungle.jpg'],
};
const PABELLON = {
  labelEs: 'Pabellón Holístico', labelEn: 'Holistic Pavilion',
  descEs: 'Cada rincón fue pensado para sentirse. Aquí, la naturaleza no rodea, abraza.',
  descEn: 'Every corner designed to be felt. Here, nature doesn’t surround — it embraces.',
  images: ['/map-pabellon.jpg'],
};

export const SPOTS: Spot[] = [
  // ─── EXPERIENCIAS (dark dots 1-12) ───────────────────────────
  {
    id: 'acceso', n: 1, px: 2352, py: 523,
    labelEs: 'Acceso', labelEn: 'Access',
    descEs: 'Un ingreso enmarcado por la selva — donde comienza otra manera de llegar a casa.',
    descEn: 'A jungle-framed arrival — where a new way of coming home begins.',
    category: 'experiencia', images: ['/map-acceso.jpg'],
  },
  {
    id: 'mirador', n: 2, px: 2283, py: 664,
    labelEs: 'Mirador', labelEn: 'Lookout',
    descEs: 'Un mirador suspendido entre la selva y el cenote, donde cada paso revela una nueva perspectiva.',
    descEn: 'A lookout suspended between jungle and cenote, where every step reveals a new perspective.',
    category: 'experiencia', images: ['/map-mirador.jpg'],
  },
  { id: 'kids-1', n: 3, px: 359,  py: 460, category: 'experiencia', ...KIDS },
  { id: 'kids-2', n: 3, px: 933,  py: 488, category: 'experiencia', ...KIDS },
  { id: 'kids-3', n: 3, px: 1480, py: 480, category: 'experiencia', ...KIDS },
  { id: 'kids-4', n: 3, px: 1925, py: 453, category: 'experiencia', ...KIDS },
  { id: 'kids-5', n: 3, px: 2117, py: 466, category: 'experiencia', ...KIDS },
  { id: 'pets-1', n: 4, px: 382,  py: 486, category: 'experiencia', ...PETS },
  { id: 'pets-2', n: 4, px: 934,  py: 531, category: 'experiencia', ...PETS },
  { id: 'pets-3', n: 4, px: 1480, py: 512, category: 'experiencia', ...PETS },
  { id: 'pets-4', n: 4, px: 1924, py: 492, category: 'experiencia', ...PETS },
  {
    id: 'jungle-gym', n: 5, px: 1828, py: 471,
    labelEs: 'Jungle Gym', labelEn: 'Jungle Gym',
    descEs: 'Un espacio para el cuerpo, rodeado de selva viva.',
    descEn: 'A space for the body, surrounded by living jungle.',
    category: 'experiencia', images: ['/map-jungle-gym.jpg'],
  },
  {
    id: 'padel', n: 6, px: 1713, py: 470,
    labelEs: 'Cancha de pádel y pickleball', labelEn: 'Padel & pickleball court',
    descEs: 'Un espacio donde la energía y la naturaleza se encuentran. Canchas rodeadas de selva, pensadas para disfrutar el juego a otro ritmo.',
    descEn: 'Where energy meets nature. Courts framed by jungle — designed to play at a different pace.',
    category: 'experiencia', images: ['/map-padel.jpg'],
  },
  { id: 'pabellon-1', n: 7, px: 850,  py: 586, category: 'experiencia', ...PABELLON },
  { id: 'pabellon-2', n: 7, px: 1545, py: 460, category: 'experiencia', ...PABELLON },
  {
    id: 'village-comercial', n: 8, px: 1396, py: 456,
    labelEs: 'Village Comercial', labelEn: 'Commercial Village',
    descEs: 'Un pequeño pueblo dentro de la selva — servicios y encuentros a un paso de casa.',
    descEn: 'A little village within the jungle — services and encounters a step from home.',
    category: 'experiencia', images: ['/map-village.jpg'],
  },
  {
    id: 'casa-arbol', n: 9, px: 764, py: 570,
    labelEs: 'Casa del Árbol', labelEn: 'Treehouse',
    descEs: 'Un refugio elevado entre las ramas — para contemplar la selva desde adentro.',
    descEn: 'An elevated refuge among the branches — to contemplate the jungle from within.',
    category: 'experiencia', images: ['/map-casa-arbol.jpg'],
  },
  {
    id: 'jungle-bar', n: 10, px: 764, py: 611,
    labelEs: 'Jungle Bar', labelEn: 'Jungle Bar',
    descEs: 'Cócteles artesanales y textura natural — el punto de encuentro sin prisa.',
    descEn: 'Craft cocktails and natural texture — the unhurried meeting point.',
    category: 'experiencia', images: ['/map-jungle-bar.jpg'],
  },
  {
    id: 'casa-cenotes', n: 11, px: 514, py: 420,
    labelEs: 'Casa de los Cenotes', labelEn: 'Casa de los Cenotes',
    descEs: 'El alma social del entorno — restaurante, bar alberca y playas. Una alberca que se funde con los cenotes.',
    descEn: 'The social heart — restaurant, pool bar, and beaches. A pool that merges with the cenotes.',
    category: 'experiencia', images: ['/map-casa-cenotes.jpg'],
  },
  {
    id: 'wellness', n: 12, px: 421, py: 395,
    labelEs: 'Wellness center', labelEn: 'Wellness center',
    descEs: 'Refugios escondidos entre la selva, donde el agua cristalina y el silencio crean un momento de calma absoluta.',
    descEn: 'Hidden refuges within the jungle, where crystalline water and silence create a moment of absolute calm.',
    category: 'experiencia', images: ['/map-wellness.jpg'],
  },

  // ─── CENOTES (cyan dots 1-9) ─────────────────────────────────
  {
    id: 'cenote-mirador', n: 1, px: 2181, py: 684,
    labelEs: 'Cenote Mirador', labelEn: 'Cenote Mirador',
    descEs: 'Un cenote contemplado desde una torre suspendida entre la selva.',
    descEn: 'A cenote contemplated from a tower suspended in the jungle.',
    category: 'cenote', images: ['/map-cenote-mirador.webp'],
  },
  {
    id: 'cenote-playa', n: 2, px: 824, py: 500,
    labelEs: 'Cenote Playa', labelEn: 'Cenote Playa',
    descEs: 'Un refugio natural donde la arena, la luz y el silencio crean un paisaje que se siente más que se observa.',
    descEn: 'A natural refuge where sand, light, and silence create a landscape felt more than observed.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-piedra', n: 3, px: 672, py: 600,
    labelEs: 'Cenote Piedra', labelEn: 'Cenote Piedra',
    descEs: 'El silencio de la roca antigua y el reflejo cristalino del agua.',
    descEn: 'The silence of ancient rock and the crystalline reflection of water.',
    category: 'cenote', images: ['/map-cenote-piedra.jpg'],
  },
  {
    id: 'cenote-luz', n: 4, px: 686, py: 680,
    labelEs: 'Cenote Luz', labelEn: 'Cenote Luz',
    descEs: 'Donde el rayo del sol descubre el agua a mediodía.',
    descEn: 'Where the sun’s ray reveals the water at noon.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-azul', n: 5, px: 565, py: 730,
    labelEs: 'Cenote Azul', labelEn: 'Cenote Azul',
    descEs: 'El azul más profundo de Selvadentro — inmersión total.',
    descEn: 'The deepest blue in Selvadentro — total immersion.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-selva', n: 6, px: 609, py: 624,
    labelEs: 'Cenote Selva', labelEn: 'Cenote Selva',
    descEs: 'Enterrado entre raíces — cada gota, un eco de la selva.',
    descEn: 'Buried among roots — each drop, an echo of the jungle.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-madera', n: 7, px: 456, py: 445,
    labelEs: 'Cenote Madera', labelEn: 'Cenote Madera',
    descEs: 'Espacios donde desconectas del exterior para conectar contigo.',
    descEn: 'Spaces where you disconnect from the outside to connect with yourself.',
    category: 'cenote', images: ['/map-cenote-madera.jpg'],
  },
  {
    id: 'cenote-vida', n: 8, px: 527, py: 357,
    labelEs: 'Cenote Vida', labelEn: 'Cenote Vida',
    descEs: 'Un pulso azul que respira con la selva.',
    descEn: 'A blue pulse breathing with the jungle.',
    category: 'cenote', images: [],
  },
  {
    id: 'cenote-caverna', n: 9, px: 408, py: 357,
    labelEs: 'Cenote Caverna', labelEn: 'Cenote Caverna',
    descEs: 'Una catedral de piedra donde la luz y el agua se encuentran.',
    descEn: 'A cathedral of stone where light and water meet.',
    category: 'cenote', images: ['/map-cenote-caverna.jpg'],
  },
];

interface View { s: number; tx: number; ty: number }

interface Props {
  lang: Lang;
}

export default function MasterplanExplorer({ lang }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ s: 1, tx: 0, ty: 0 });
  const [openId, setOpenId] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<string | null>(null); // `${category}-${n}`

  // Pointer tracking (drag + pinch) — refs to avoid re-renders per move
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const moved = useRef(false);

  const dims = () => {
    const el = containerRef.current;
    if (!el) return { W: 1, Hc: 1, Hl: 1 };
    const r = el.getBoundingClientRect();
    return { W: r.width, Hc: r.height, Hl: r.width / RATIO };
  };

  const minScale = () => {
    const { Hc, Hl } = dims();
    return Math.max(1, Hc / Hl);
  };

  const clamp = (v: View): View => {
    const { W, Hc, Hl } = dims();
    const s = Math.min(Math.max(v.s, minScale()), MAX_SCALE);
    const minTx = W - W * s;
    const minTy = Hc - Hl * s;
    return {
      s,
      tx: minTx >= 0 ? minTx / 2 : Math.min(0, Math.max(minTx, v.tx)),
      ty: minTy >= 0 ? minTy / 2 : Math.min(0, Math.max(minTy, v.ty)),
    };
  };

  // Zoom keeping the container point (cx, cy) fixed
  const zoomAt = (cx: number, cy: number, factor: number) => {
    setView((v) => {
      const s = Math.min(Math.max(v.s * factor, minScale()), MAX_SCALE);
      const k = s / v.s;
      return clamp({ s, tx: cx - (cx - v.tx) * k, ty: cy - (cy - v.ty) * k });
    });
  };

  const flyTo = (spot: Spot) => {
    const { W, Hc, Hl } = dims();
    const s = Math.max(2.2, minScale() * 1.8);
    setView(clamp({
      s,
      tx: W / 2 - (spot.px / MAP_W) * W * s,
      ty: Hc / 2 - (spot.py / MAP_H) * Hl * s,
    }));
    setOpenId(spot.id);
  };

  const reset = () => {
    setView(clamp({ s: minScale(), tx: 0, ty: 0 }));
    setOpenId(null);
  };

  // Initial fit + keep clamped on resize; non-passive wheel listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setView(clamp({ s: minScale(), tx: 0, ty: 0 }));
    const ro = new ResizeObserver(() => setView((v) => clamp(v)));
    ro.observe(el);
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.18 : 1 / 1.18);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => { ro.disconnect(); el.removeEventListener('wheel', onWheel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = pointers.current.get(e.pointerId);
    if (!p) return;
    const pts = pointers.current;
    if (pts.size === 1) {
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved.current = true;
      setView((v) => clamp({ ...v, tx: v.tx + dx, ty: v.ty + dy }));
    } else if (pts.size === 2) {
      // Pinch: zoom about the midpoint by the distance ratio
      const [a, b] = [...pts.entries()];
      const other = a[0] === e.pointerId ? b[1] : a[1];
      const dPrev = Math.hypot(p.x - other.x, p.y - other.y);
      const dNow = Math.hypot(e.clientX - other.x, e.clientY - other.y);
      if (dPrev > 0) {
        const el = containerRef.current!;
        const r = el.getBoundingClientRect();
        const mx = (e.clientX + other.x) / 2 - r.left;
        const my = (e.clientY + other.y) / 2 - r.top;
        zoomAt(mx, my, dNow / dPrev);
      }
      moved.current = true;
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
  };

  const { W, Hc, Hl } = dims();

  // Legend: cenotes are unique; experiencias dedup by number
  const legendCenotes = useMemo(
    () => SPOTS.filter((s) => s.category === 'cenote').sort((a, b) => a.n - b.n),
    [],
  );
  const legendExp = useMemo(() => {
    const byN = new Map<number, Spot>();
    SPOTS.filter((s) => s.category === 'experiencia').forEach((s) => {
      if (!byN.has(s.n)) byN.set(s.n, s);
    });
    return [...byN.values()].sort((a, b) => a.n - b.n);
  }, []);

  const legendItem = (spot: Spot) => {
    const key = `${spot.category}-${spot.n}`;
    const label = lang === 'es' ? spot.labelEs : spot.labelEn;
    const isCenote = spot.category === 'cenote';
    return (
      <button
        key={key}
        type="button"
        onMouseEnter={() => setHighlight(key)}
        onMouseLeave={() => setHighlight(null)}
        onClick={() => flyTo(spot)}
        className="flex items-center gap-2.5 py-1 text-left group"
      >
        <span
          className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-semibold shrink-0 transition-transform duration-200 group-hover:scale-110 ${
            isCenote ? 'bg-[#8fcdd4] text-brand-verde-osc' : 'bg-[#3d4b43] text-brand-crema'
          }`}
        >
          {spot.n}
        </span>
        <span className="text-sm text-brand-negro/80 group-hover:text-brand-verde-osc transition-colors duration-200 whitespace-nowrap">
          {label}
        </span>
      </button>
    );
  };

  const openSpot = openId ? SPOTS.find((s) => s.id === openId) ?? null : null;

  return (
    <div>
      {/* ─── Map viewport + popup overlay ─── */}
      <div className="relative">
        <div
          ref={containerRef}
          className="relative h-[340px] sm:h-auto sm:aspect-[2400/955] rounded-3xl overflow-hidden border border-brand-verde/10 shadow-xl bg-[#5c6b52] cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'none' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="absolute top-0 left-0 origin-top-left will-change-transform"
            style={{
              width: MAP_W_PHYS,
              height: MAP_H_PHYS,
              // baseFit maps the natural-pixel layer to the container width,
              // then view.s applies user zoom on top of that. Rendering at
              // native resolution keeps the source pixels available to the
              // GPU when the user zooms in.
              transform: `translate(${view.tx}px, ${view.ty}px) scale(${(W / MAP_W_PHYS) * view.s})`,
            }}
          >
            <img
              src={MAP_SRC}
              alt="Masterplan Selvadentro"
              className="w-full h-full block pointer-events-none"
              style={{ imageRendering: 'high-quality' as const }}
              draggable={false}
              loading="lazy"
            />

            {SPOTS.map((spot) => {
              const isOpen = openId === spot.id;
              const isHi = highlight === `${spot.category}-${spot.n}`;
              const label = lang === 'es' ? spot.labelEs : spot.labelEn;
              const isCenote = spot.category === 'cenote';
              return (
                <div
                  key={spot.id}
                  className="absolute z-10"
                  style={{
                    left: `${(spot.px / MAP_W) * 100}%`,
                    top: `${(spot.py / MAP_H) * 100}%`,
                    // Counter-scale keeps dot buttons at a constant 24px on
                    // screen regardless of the parent's total scale factor.
                    transform: `translate(-50%, -50%) scale(${MAP_W_PHYS / (W * view.s)})`,
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setOpenId(spot.id)}
                    onMouseLeave={() => setOpenId((cur) => (cur === spot.id ? null : cur))}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!moved.current) setOpenId(isOpen ? null : spot.id);
                    }}
                    aria-label={label}
                    className={`flex items-center justify-center w-6 h-6 rounded-full shadow-md transition-all duration-300 focus:outline-none hover:scale-125 ${
                      isCenote ? 'bg-[#8fcdd4] text-brand-verde-osc' : 'bg-[#3d4b43] text-brand-crema'
                    } ${isHi ? 'scale-[1.4] ring-4 ring-brand-oro/70' : ''}`}
                  >
                    <span className="text-[11px] font-semibold leading-none select-none">
                      {spot.n}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-30">
          {[
            { icon: Plus, fn: () => zoomAt(W / 2, Hc / 2, 1.4), label: 'Zoom in' },
            { icon: Minus, fn: () => zoomAt(W / 2, Hc / 2, 1 / 1.4), label: 'Zoom out' },
            { icon: RotateCcw, fn: reset, label: 'Reset' },
          ].map(({ icon: Icon, fn, label }) => (
            <button
              key={label}
              type="button"
              onClick={fn}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/95 text-brand-verde-osc shadow-md hover:bg-white transition-colors"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        </div>

        {/* ─── Popup overlay (outside overflow-hidden so it never clips) ─── */}
        {openSpot && (() => {
          const spot = openSpot;
          const label = lang === 'es' ? spot.labelEs : spot.labelEn;
          const desc = lang === 'es' ? spot.descEs : spot.descEn;
          const isCenote = spot.category === 'cenote';
          // Dot's current screen position within the map viewport
          const sx = view.tx + (spot.px / MAP_W) * W * view.s;
          const sy = view.ty + (spot.py / MAP_H) * Hl * view.s;
          const openDown = sy < Hc / 3;
          const align: 'left' | 'center' | 'right' =
            sx > W - 160 ? 'right' : sx < 160 ? 'left' : 'center';
          return (
            <div
              className="absolute z-40 pointer-events-none"
              style={{ left: sx, top: sy, width: 0, height: 0 }}
            >
              <div
                className={`absolute ${
                  align === 'center' ? 'left-1/2 -translate-x-1/2'
                  : align === 'right' ? 'right-0'
                  : 'left-0'
                }`}
                style={{
                  width: 270,
                  ...(openDown ? { top: 22 } : { bottom: 22 }),
                }}
              >
                <div className="bg-white rounded-xl shadow-2xl border border-brand-verde/10 overflow-hidden">
                  {spot.images.length > 0 && (
                    <div className={`grid ${spot.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-px bg-brand-crema-osc`}>
                      {spot.images.map((src, i) => (
                        <img key={i} src={src} alt={label} className="w-full h-28 object-cover" loading="lazy" />
                      ))}
                    </div>
                  )}
                  <div className="p-3.5">
                    <div className="text-[10px] uppercase tracking-widest text-brand-gris mb-1">
                      {isCenote
                        ? `Cenote ${spot.n}`
                        : lang === 'es' ? `Experiencia ${spot.n}` : `Experience ${spot.n}`}
                    </div>
                    <div className="font-serif text-base text-brand-verde-osc leading-tight mb-1.5">
                      {label}
                    </div>
                    {desc && (
                      <p className="text-xs text-brand-gris leading-relaxed">{desc}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ─── Legend ─── */}
      <div className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl mx-auto">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-verde-osc mb-3">
            Cenotes
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-x-4">
            {legendCenotes.map(legendItem)}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-verde-osc mb-3">
            {lang === 'es' ? 'Experiencias' : 'Experiences'}
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-x-4">
            {legendExp.map(legendItem)}
          </div>
        </div>
      </div>
    </div>
  );
}
