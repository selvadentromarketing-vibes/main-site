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
  const [loaded, setLoaded] = useState(false);

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
            {loaded ? (
              <iframe
                src={TOUR_URL}
                title={iframeTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setLoaded(true)}
                aria-label={playLabel}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-5 focus:outline-none focus:ring-4 focus:ring-brand-oro/40"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 45%, rgba(200,169,110,0.20), transparent 60%), linear-gradient(180deg, #2b3c2b 0%, #1c2e1c 100%)',
                }}
              >
                <span className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-oro text-brand-verde-osc shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-9 h-9 sm:w-10 sm:h-10 ml-1" fill="currentColor" />
                </span>
                <span className="text-brand-crema text-sm sm:text-base tracking-[0.2em] uppercase font-semibold">
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
