import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  youtubeId: string;
  posterSrc?: string;
  title: string;
}

/**
 * Click-to-load YouTube embed. Until the visitor clicks Play, only the YouTube
 * thumbnail (or our own poster) loads — the iframe + player JS only mount on
 * click. Keeps the hero section fast.
 */
export default function VideoEmbed({ youtubeId, posterSrc, title }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-brand-verde-osc/15 bg-brand-verde-osc">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  const fallbackPoster =
    posterSrc || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative block w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-brand-verde-osc/15 bg-brand-verde-osc focus:outline-none focus:ring-4 focus:ring-brand-oro/40"
      aria-label={title}
      style={{
        backgroundImage: `url('${fallbackPoster}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-oro text-brand-verde-osc shadow-2xl transition-transform group-hover:scale-110">
          <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
