import { useRef, type ReactNode, type AnchorHTMLAttributes } from 'react';

interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  strength?: number;
}

/**
 * Button-style anchor with a subtle magnetic pull toward the cursor on
 * near-hover. Premium effect; never overpowering. Respects
 * prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  strength = 0.25,
  className = '',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const raf = useRef<number | null>(null);

  const prefersReduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  };

  const handleLeave = () => {
    if (prefersReduce) return;
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
        display: 'inline-flex',
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
