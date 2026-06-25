import { Mail, Phone } from 'lucide-react';
import type { Translation } from '../i18n/translations';

interface FooterProps {
  t: Translation;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-brand-verde-osc text-brand-crema/75 py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <img
              src="/logo-cream.webp"
              alt="Selvadentro"
              className="h-12 w-auto mb-4"
            />
            <p className="font-serif italic text-sm">{t.footer.tagline}</p>
          </div>

          <div className="text-sm space-y-3">
            <h4 className="font-serif text-brand-oro tracking-wide mb-3">
              {t.nav.cta}
            </h4>
            <a
              href={`mailto:${t.footer.contactEmail}`}
              className="flex items-center gap-2 hover:text-brand-oro transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t.footer.contactEmail}
            </a>
            <a
              href={`tel:${t.footer.contactPhone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 hover:text-brand-oro transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t.footer.contactPhone}
            </a>
          </div>

          <div className="text-sm">
            <h4 className="font-serif text-brand-oro tracking-wide mb-3">
              Tulum, Quintana Roo
            </h4>
            <p className="leading-relaxed">
              Ruta de los Cenotes
              <br />
              Tulum 77780, México
            </p>
          </div>
        </div>

        <div className="border-t border-brand-crema/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-crema/50">
          <span>
            © {new Date().getFullYear()} Selvadentro · {t.footer.copyright}
          </span>
          <span className="tracking-[0.25em] uppercase">Selvadentrotulum.com</span>
        </div>
      </div>
    </footer>
  );
}
