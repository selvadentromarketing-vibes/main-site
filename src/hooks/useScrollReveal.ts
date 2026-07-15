import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver-based scroll reveal. Returns a ref to attach to the
 * element + a boolean for "has entered viewport at least once". Uses
 * once-only triggering so elements don't re-animate when scrolling back up.
 *
 * Respects prefers-reduced-motion: if motion is reduced, returns visible=true
 * immediately so content shows without animation.
 */
export function useScrollReveal<T extends Element = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      {
        // Fire as soon as any pixel of the element enters the extended
        // viewport (root grown 200px past the fold bottom). Prevents the
        // "empty block" flash on slow connections that scrolls used to
        // show while the reveal was still waiting for its trigger.
        threshold: options.threshold ?? 0,
        rootMargin: options.rootMargin ?? '0px 0px 200px 0px',
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, visible };
}
