import { useMousePosition } from '../../hooks/useMousePosition';
import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function SuspiroSection({ t }: Props) {
  const mouse = useMousePosition();
  const bgShift = { x: -mouse.x * 8, y: -mouse.y * 8 };

  return (
    <section
      id="suspiro"
      className="relative section overflow-hidden text-brand-crema bg-brand-verde-osc"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${bgShift.x}px, ${bgShift.y}px, 0) scale(1.04)`,
          transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          backgroundImage:
            "linear-gradient(180deg, rgba(28,46,28,0.85) 0%, rgba(28,46,28,0.92) 100%), url('/render-aerial.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow text-brand-oro mb-4">{t.suspiro.eyebrow}</span>
          <h2
            className="font-serif leading-tight mb-7"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)' }}
          >
            {t.suspiro.headline}
          </h2>
          <p className="text-base sm:text-lg text-brand-crema/85 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t.suspiro.body}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 mb-10 text-left">
          <Reveal delay={100}>
            <div className="bg-brand-verde-osc/60 backdrop-blur-sm border border-brand-crema/15 rounded-2xl p-6 transition-all duration-500 hover:border-brand-oro/40 hover:-translate-y-1">
              <p className="text-sm text-brand-crema/85 leading-relaxed">
                {t.suspiro.pricing}
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="bg-brand-verde-osc/60 backdrop-blur-sm border border-brand-crema/15 rounded-2xl p-6 transition-all duration-500 hover:border-brand-oro/40 hover:-translate-y-1">
              <p className="text-sm text-brand-crema/85 leading-relaxed">
                {t.suspiro.protection}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <MagneticButton href="#contacto" className="btn-primary">
            {t.suspiro.cta}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
