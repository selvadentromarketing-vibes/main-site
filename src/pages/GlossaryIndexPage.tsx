import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { getMeta } from '../seo/meta';
import { TERMS } from '../generated/content';
import type { PageProps } from '../routes/AppRoutes';

/** /glosario ↔ /en/glossary — alphabetical index of all defined terms. */

const copy = {
  es: {
    eyebrow: 'Glosario',
    lede: 'Fideicomiso, ejido, dominio pleno, ISABI: comprar en México tiene su propio idioma. Cada término aquí tiene su definición clara, cómo aparece en una compra real en Tulum y de qué cuidarte.',
    also: 'Para ir más profundo',
    alsoLinks: [
      ['/guia', 'Guía del comprador: preguntas reales respondidas'],
      ['/legalidad-y-permisos', 'La documentación de Selvadentro'],
      ['/lotes-en-venta-tulum', 'Lotes disponibles'],
    ],
  },
  en: {
    eyebrow: 'Glossary',
    lede: 'Fideicomiso, ejido, dominio pleno, ISABI: buying in Mexico comes with its own language. Every term here gets a clear definition, how it shows up in a real Tulum purchase, and what to watch out for.',
    also: 'To go deeper',
    alsoLinks: [
      ['/en/guide', "Buyer's guide: real questions answered"],
      ['/en/legal-compliance', "Selvadentro's documentation"],
      ['/en/tulum-land-for-sale', 'Available lots'],
    ],
  },
} as const;

export default function GlossaryIndexPage({ lang, path }: PageProps) {
  const meta = getMeta(path)!;
  const c = copy[lang];
  const terms = TERMS.filter((t) => t.lang === lang).sort((a, b) =>
    (a.term ?? '').localeCompare(b.term ?? '', lang === 'es' ? 'es' : 'en'),
  );
  const groups = new Map<string, typeof terms>();
  for (const t of terms) {
    const letter = (t.term ?? t.title).charAt(0).toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(t);
  }

  return (
    <PageLayout lang={lang} path={path}>
      <PageHero eyebrow={c.eyebrow} title={meta.h1} lede={c.lede} />

      <section className="section">
        <div className="max-w-4xl mx-auto space-y-10">
          {[...groups.entries()].map(([letter, entries], i) => (
            <Reveal key={letter} delay={(i % 4) * 40}>
              <div>
                <h2 className="font-serif text-3xl text-brand-oro mb-4">{letter}</h2>
                <ul className="space-y-4">
                  {entries.map((t) => (
                    <li key={t.path} className="bg-white/70 border border-brand-verde/10 rounded-2xl p-5 hover:border-brand-oro/50 transition-colors">
                      <a href={t.path} className="group block">
                        <h3 className="text-xl mb-1 group-hover:text-brand-verde transition-colors">
                          {t.term}
                        </h3>
                        <p className="text-sm leading-relaxed text-brand-negro/75">
                          {t.description}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-brand-crema-osc/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-6">{c.also}</h2>
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
