import type { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
}

/**
 * Wrap any block with a fade-up-on-scroll-in effect. Lightweight: no
 * animation library, just one IntersectionObserver per Reveal + CSS
 * transition. Respects prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
