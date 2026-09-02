import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  youtubeId: string;
  posterSrc?: string;
  title: string;
}

/**
 * YouTube embed with device-dependent loading (per Hoshi):
 * - Desktop (≥1024px): iframe mounts immediately, no click step (no autoplay).
 * - Mobile/tablet: click-to-load — only the poster renders until the visitor
 *   taps Play, then the iframe mounts with autoplay. Keeps mobile fast.
 *
 * The pre-JS facade is an <a> to the YouTube watch page wrapping a real
 * <img> poster, NOT a <button> with a CSS background-image. That matters
 * beyond taste: isDesktop starts false, so the facade is what gets
 * server-rendered on every page, and a background-image button left the
 * video invisible to crawlers — the homepage was shipping VideoObject
 * markup (src/seo/schema.ts) for a video that appeared nowhere in the DOM.
 * With a link and an alt-texted poster the markup is honest, the poster is
 * eligible for image search, and JS-off visitors can still reach the film.
 */
export default function VideoEmbed({ youtubeId, posterSrc, title }: VideoEmbedProps) {
  const [clicked, setClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const loaded = clicked || isDesktop;

  if (loaded) {
    // Autoplay only after an explicit tap (mobile flow) — never on the
    // desktop auto-mounted player.
    const params = clicked
      ? 'autoplay=1&rel=0&modestbranding=1'
      : 'rel=0&modestbranding=1';
    return (
      <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-brand-verde-osc/15 bg-brand-verde-osc">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?${params}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  const poster = posterSrc || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${youtubeId}`}
      // Progressive enhancement: with JS the click mounts the inline
      // player; without it the link opens the film on YouTube.
      onClick={(e) => {
        e.preventDefault();
        setClicked(true);
      }}
      className="group relative block w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-brand-verde-osc/15 bg-brand-verde-osc focus:outline-none focus:ring-4 focus:ring-brand-oro/40"
    >
      {/* The anchor takes its accessible name from this alt text, so there
          is no aria-label to double-announce it. No width/height: the
          poster is a remote thumbnail of unknown size, and the
          aspect-video container already reserves the box (no CLS). */}
      <img
        src={poster}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-oro text-brand-verde-osc shadow-2xl transition-transform group-hover:scale-110">
          <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1" fill="currentColor" />
        </span>
      </span>
    </a>
  );
}
