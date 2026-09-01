import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
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

const MAP_SRC = '/masterplan-map.webp';
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

// Spot data (9 cenotes + 12 experiencias, bilingual) lives in the shared
// data module so CenotesPage and the JSON-LD builders render the same
// copy as the map popups. Re-exported here for backwards compatibility.
import { SPOTS } from '../data/masterplan';
import type { Spot } from '../data/masterplan';

export { SPOTS };
export type { Spot };

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
              style={{ imageRendering: 'high-quality' as unknown as CSSProperties['imageRendering'] }}
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
                        <img
                          key={i}
                          src={src}
                          alt={label}
                          className="w-full h-28 object-cover"
                          style={spot.imagePosition ? { objectPosition: spot.imagePosition } : undefined}
                          loading="lazy"
                        />
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
