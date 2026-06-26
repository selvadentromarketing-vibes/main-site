import { useRef, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // degrees
}

/**
 * Card that subtly tilts toward the cursor on hover, with a premium spring
 * resolve when the cursor leaves. Uses raf + transform — no library.
 *
 * Respects prefers-reduced-motion: if motion is reduced, the card behaves
 * as a static block (no tilt, no transform changes).
 */
export default function TiltCard({ children, className = '', maxTilt = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  const prefersReduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const tiltX = (0.5 - y) * (maxTilt * 2);
    const tiltY = (x - 0.5) * (maxTilt * 2);
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`;
    });
  };

  const handleLeave = () => {
    if (prefersReduce) return;
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
