import { useState } from 'react';
import { Play } from 'lucide-react';
import Reveal from '../Reveal';
import type { Lang } from '../../i18n/translations';

interface Props {
  lang: Lang;
}

const TOUR_URL =
  'https://eva3d.com/recorridos-virtuales-360/jjf-creando/selvadentro/index.htm';

export default function TourVirtualSection({ lang }: Props) {
  const [active, setActive] = useState(false);

  const eyebrow = lang === 'es' ? 'Recorrido 360°' : '360° Tour';
  const headline =
    lang === 'es'
      ? 'Camina por Selvadentro sin salir de aquí.'
      : 'Walk through Selvadentro without leaving this page.';
  const hint =
    lang === 'es'
      ? 'Arrastra para mirar alrededor · usa las flechas para avanzar entre puntos'
      : 'Drag to look around · use arrows to move between points';
  const iframeTitle =
    lang === 'es' ? 'Tour virtual 360° Selvadentro' : 'Selvadentro 360° virtual tour';
  const playLabel = lang === 'es' ? 'Iniciar tour virtual' : 'Start virtual tour';

  return (
    <section id="tour-virtual" className="section bg-brand-crema">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <span className="eyebrow mb-3">{eyebrow}</span>
            <h2
              className="font-serif text-brand-verde-osc leading-tight mb-5 max-w-3xl mx-auto"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {headline}
            </h2>
            <p className="text-brand-gris">{hint}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="relative w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-brand-verde/10 bg-brand-verde-osc"
            style={{ aspectRatio: '16 / 9' }}
          >
            {/* Iframe mounts from the start so its first frame is visible as
                the "poster". The overlay below intercepts pointer events
                until the visitor opts in. */}
            <iframe
              src={TOUR_URL}
              title={iframeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking; fullscreen"
              allowFullScreen
              tabIndex={active ? 0 : -1}
              className="absolute inset-0 w-full h-full border-0"
            />

            {!active && (
              <button
                type="button"
                onClick={() => setActive(true)}
                aria-label={playLabel}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-black/25 via-black/15 to-black/45 hover:from-black/15 hover:via-black/5 hover:to-black/35 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-brand-oro/40"
              >
                <span className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-oro text-brand-verde-osc shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-9 h-9 sm:w-10 sm:h-10 ml-1" fill="currentColor" />
                </span>
                <span className="text-brand-crema text-sm sm:text-base tracking-[0.2em] uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {playLabel}
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
