import VideoEmbed from '../VideoEmbed';
import Reveal from '../Reveal';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

/**
 * About section. Video is lang-aware to match the prototype:
 *   ES → "BG" institutional film (pending upload, shows placeholder for now)
 *   EN → existing YouTube short (zFNyICgwD5c)
 *
 * When the Spanish BG film URL arrives, swap the placeholder for a
 * VideoEmbed with the new ID.
 */
export default function AboutSection({ t, lang }: Props) {
  return (
    <section id="acerca" className="section bg-brand-crema">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div id="filmsection">
            <span className="eyebrow mb-4">{lang === 'es' ? 'Acerca de Selvadentro' : 'About Selvadentro'}</span>
            <h2
              className="font-serif text-brand-verde-osc leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              {t.about.title}
            </h2>
            <p className="text-brand-negro/80 leading-relaxed mb-5 max-w-copy">
              {t.about.body}
            </p>
            <p className="font-serif italic text-xl text-brand-verde-osc max-w-copy">
              {t.about.silence}
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          {lang === 'es' ? (
            <div className="aspect-video rounded-2xl bg-brand-crema-osc border border-brand-verde/15 flex items-center justify-center text-center p-8 shadow-inner">
              <div>
                <div className="text-3xl mb-3">🎬</div>
                <div className="font-serif text-lg text-brand-verde-osc mb-2">
                  Video principal en español
                </div>
                <div className="text-xs text-brand-gris tracking-wide max-w-xs mx-auto leading-relaxed">
                  Película institucional con entrevistas y demostración del proyecto.<br />
                  Pendiente de subir a YouTube / Vimeo.
                </div>
              </div>
            </div>
          ) : (
            <VideoEmbed youtubeId="zFNyICgwD5c" title={t.about.videoTitle} />
          )}
        </Reveal>
      </div>
    </section>
  );
}
