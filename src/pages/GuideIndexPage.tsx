import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { GUIDES } from '../generated/content';
import type { PageProps } from '../routes/AppRoutes';

/** /guia ↔ /en/guide — index of the buyer's-guide Q&A library. */

const copy = {
  es: {
    eyebrow: 'Guía del comprador',
    lede: 'Cada página responde una pregunta real — de las que se hacen en foros, en llamadas con asesores y a las 2 a.m. antes de firmar. Sin rodeos: la respuesta directa va en el primer párrafo.',
    reading: 'min de lectura',
    also: 'También te puede servir',
    alsoLinks: [
      ['/glosario', 'El glosario: los términos que vas a firmar'],
      ['/preguntas-frecuentes', 'Preguntas frecuentes sobre Selvadentro'],
      ['/blog', 'Guías largas en el blog'],
    ],
  },
  en: {
    eyebrow: "Buyer's guide",
    lede: 'Each page answers one real question — the kind asked in forums, on advisor calls, and at 2 a.m. before signing. No runaround: the direct answer is the first paragraph.',
    reading: 'min read',
    also: 'Also useful',
    alsoLinks: [
      ['/en/glossary', 'The glossary: the terms you will sign'],
      ['/en/faq', 'Selvadentro FAQ'],
      ['/en/blog', 'Long-form guides on the blog'],
    ],
  },
} as const;

export default function GuideIndexPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];
  const guides = GUIDES.filter((g) => g.lang === lang);

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} image={meta.heroImage} lang={lang} />

      <section className="section">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((g, i) => (
              <Reveal key={g.path} delay={(i % 3) * 60}>
                <article className="card-premium p-6 h-full flex flex-col">
                  <h2 className="text-xl leading-snug mb-3">
                    <a href={g.path} className="hover:text-brand-verde transition-colors">
                      {g.title}
                    </a>
                  </h2>
                  <p className="text-sm leading-relaxed text-brand-negro/75 mb-4 flex-1">
                    {g.description}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-oro pt-4 border-t border-brand-verde/10">
                    {g.readingMinutes} {c.reading}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="h2-section mb-6">{c.also}</h2>
          <ul className="space-y-3">
            {c.alsoLinks.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="underline underline-offset-4 decoration-brand-oro hover:text-brand-verde transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
