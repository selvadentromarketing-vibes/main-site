import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionProps {
  items: Array<{ q: string; a: string }>;
}

export default function Accordion({ items }: AccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="divide-y divide-brand-verde/15 border-y border-brand-verde/15">
      {items.map((it, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-6 text-left group"
              aria-expanded={isOpen}
            >
              <h3 className="font-serif text-lg sm:text-xl text-brand-verde-osc group-hover:text-brand-verde transition-colors">
                {it.q}
              </h3>
              <span className="shrink-0 w-9 h-9 rounded-full border border-brand-verde/30 flex items-center justify-center text-brand-verde transition-transform">
                {isOpen ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-12 text-brand-gris leading-relaxed max-w-copy">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
