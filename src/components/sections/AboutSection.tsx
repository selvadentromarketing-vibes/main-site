import VideoEmbed from '../VideoEmbed';
import Reveal from '../Reveal';
import type { Translation } from '../../i18n/translations';

interface Props {
  t: Translation;
}

export default function AboutSection({ t }: Props) {
  return (
    <section id="acerca" className="section bg-brand-crema">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div>
            <span className="eyebrow mb-4">{t.about.videoTitle}</span>
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
          <VideoEmbed youtubeId="zFNyICgwD5c" title={t.about.videoTitle} />
        </Reveal>
      </div>
    </section>
  );
}
