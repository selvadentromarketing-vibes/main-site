import { useEffect, useRef, useState } from 'react';

/**
 * Tracks the global mouse position as values in [-1, 1] relative to the
 * viewport center. Values are smoothed via requestAnimationFrame lerp so
 * downstream transforms feel premium instead of jittery.
 *
 * Respects prefers-reduced-motion: if the user has motion preferences
 * disabled, this hook returns (0, 0) and skips listeners entirely.
 */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      setPos({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return pos;
}
