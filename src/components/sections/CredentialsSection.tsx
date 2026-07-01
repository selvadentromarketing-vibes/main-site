import Reveal from '../Reveal';
import type { Translation, Lang } from '../../i18n/translations';

interface Props {
  t: Translation;
  lang: Lang;
}

interface Partner {
  name: string;
  logo: string;
  isSvg?: boolean;
  roleEs: string;
  roleEn: string;
  portfolio: { src: string; captionEs: string; captionEn: string }[];
  awardEs?: string;
  awardEn?: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'JJF Creando',
    logo: '/jjf-creando.webp',
    roleEs: 'Desarrollador maestro',
    roleEn: 'Master developer',
    portfolio: [
      {
        src: '/portfolio-yucatan-country-club.webp',
        captionEs: 'Yucatán Country Club',
        captionEn: 'Yucatán Country Club',
      },
      {
        src: '/portfolio-aldea-zama.webp',
        captionEs: 'Aldea Zamá',
        captionEn: 'Aldea Zamá',
      },
    ],
  },
  {
    name: 'Maat Handasa',
    logo: '/maat-handasa.webp',
    roleEs: 'Masterplan y arquitectura',
    roleEn: 'Masterplan & architecture',
    portfolio: [
      {
        src: '/portfolio-chable-resort.webp',
        captionEs: 'Chablé Resort',
        captionEn: 'Chablé Resort',
      },
    ],
    awardEs: 'AHEAD Americas 2017 — mejor hotel del año',
    awardEn: 'AHEAD Americas 2017 — Hotel of the Year',
  },
  {
    name: 'Estudio AMA',
    logo: '/ama-estudio.svg',
    isSvg: true,
    roleEs: 'Arquitectura y diseño',
    roleEn: 'Architecture & design',
    portfolio: [
      {
        src: '/portfolio-casa-chacala.webp',
        captionEs: 'Casa Chacala',
        captionEn: 'Casa Chacala',
      },
    ],
    awardEs: 'Architizer A+ Awards 2025 — finalista',
    awardEn: 'Architizer A+ Awards 2025 — finalist',
  },
];

export default function CredentialsSection({ t, lang }: Props) {
  const eyebrow = lang === 'es' ? 'Quiénes lo construyen' : 'Who builds it';
  const portfolioLabel = lang === 'es' ? 'Portafolio destacado' : 'Selected portfolio';

  return (
    <section id="credenciales" className="section bg-brand-crema">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow mb-3">{eyebrow}</span>
            <h2
              className="font-serif text-brand-verde-osc leading-tight mb-8 max-w-3xl mx-auto"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {t.credentials.headline}
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-brand-negro/80 leading-relaxed max-w-3xl mx-auto mb-10 text-left sm:text-justify">
              {t.credentials.body}
            </p>

            <p className="font-serif italic text-xl text-brand-verde-osc mb-14">
              {t.credentials.partners}
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={200 + i * 100}>
              <article className="h-full flex flex-col bg-white rounded-2xl border border-brand-verde/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500">
                {/* Portfolio strip */}
                <div className={`grid ${p.portfolio.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-px bg-brand-crema-osc`}>
                  {p.portfolio.map((piece, j) => (
                    <figure key={j} className="relative">
                      <img
                        src={piece.src}
                        alt={lang === 'es' ? piece.captionEs : piece.captionEn}
                        className="w-full h-40 object-cover"
                        loading="lazy"
                      />
                      <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-gradient-to-t from-black/70 to-transparent text-white text-[11px] uppercase tracking-widest">
                        {lang === 'es' ? piece.captionEs : piece.captionEn}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {/* Logo + role + award */}
                <div className="flex-1 flex flex-col p-6">
                  <div className="h-14 mb-4 flex items-center justify-center">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-12 w-auto object-contain"
                      style={p.isSvg ? { color: '#000' } : undefined}
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-brand-gris mb-2">
                      {lang === 'es' ? p.roleEs : p.roleEn}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-brand-oro/80 mb-1">
                      {portfolioLabel}
                    </div>
                    {(p.awardEs || p.awardEn) && (
                      <div className="mt-3 pt-3 border-t border-brand-verde/10">
                        <div className="text-xs italic text-brand-verde-osc leading-snug">
                          {lang === 'es' ? p.awardEs : p.awardEn}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
