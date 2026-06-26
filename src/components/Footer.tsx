import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import type { Translation, Lang } from '../i18n/translations';

interface FooterProps {
  t: Translation;
  lang: Lang;
}

export default function Footer({ t, lang }: FooterProps) {
  const showroomLabel = lang === 'es' ? 'Showroom' : 'Showroom';
  const showroomAddress = 'Loft Corporativo Sinergia, Av. Tulum, Tulum, México';

  return (
    <footer className="bg-brand-verde-osc text-brand-crema/75 pt-14 pb-10 px-4 sm:px-6">
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
              {lang === 'es' ? 'Contacto' : 'Contact'}
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
            <a
              href="https://instagram.com/selvadentro.tulum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-brand-oro transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @selvadentro.tulum
            </a>
          </div>

          <div className="text-sm">
            <h4 className="font-serif text-brand-oro tracking-wide mb-3">
              {showroomLabel}
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 shrink-0" />
              <p className="leading-relaxed">{showroomAddress}</p>
            </div>
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
