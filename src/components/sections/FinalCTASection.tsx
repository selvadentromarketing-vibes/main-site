import { useState, FormEvent } from 'react';
import { Calendar, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import type { Value as PhoneValue } from 'react-phone-number-input';
import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import type { Translation } from '../../i18n/translations';
import 'react-phone-number-input/style.css';

interface Props {
  t: Translation;
}

/**
 * Final CTA + Contact form. Posts to the existing GHL inbound webhook with a
 * source_label of 'main-site' so the sales team can route those leads to a
 * dedicated workflow. The team can later create a dedicated webhook for the
 * main site — only the URL constant needs to change.
 */
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/crN2IhAuOBAl7D8324yI/webhook-trigger/9270085e-204b-40e0-a565-b2bf60861970';

const WHATSAPP_URL = 'https://wa.me/529994890237';

export default function FinalCTASection({ t }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !phone || !email.trim()) {
      setErrorMsg(t.finalCta.formError);
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setErrorMsg(t.finalCta.formError);
      return;
    }

    setStatus('submitting');

    const payload = {
      first_name: name.trim().split(' ')[0] || '',
      last_name: name.trim().split(' ').slice(1).join(' ') || '',
      name: name.trim(),
      email: email.trim(),
      phone,
      country: country || 'Mexico',
      source_label: 'main-site',
      form_name: 'main-site-final-cta',
      landing_page: window.location.href,
      utm_source:
        new URLSearchParams(window.location.search).get('utm_source') || 'organic',
      utm_campaign:
        new URLSearchParams(window.location.search).get('utm_campaign') || '',
      tags: ['main-site'],
    };

    try {
      const response = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
    } catch (err) {
      console.error('Main site form submission failed:', err);
      setStatus('error');
      setErrorMsg(t.finalCta.formError);
    }
  };

  return (
    <section
      id="contacto"
      className="section bg-brand-verde-osc text-brand-crema"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <Reveal>
          <div>
            <span className="eyebrow text-brand-oro mb-3">{t.finalCta.eyebrow}</span>
            <h2
              className="font-serif leading-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              {t.finalCta.headline}
            </h2>
            <p className="text-brand-crema/85 leading-relaxed mb-10 max-w-xl">
              {t.finalCta.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <MagneticButton
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="w-5 h-5" />
                {t.finalCta.whatsappCta}
              </MagneticButton>
              <MagneticButton
                href="https://api.leadconnectorhq.com/widget/booking/dummy"
                className="btn-secondary"
              >
                <Calendar className="w-5 h-5" />
                {t.finalCta.callCta}
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={150}>
        <div className="bg-brand-crema text-brand-negro rounded-2xl p-8 sm:p-10 shadow-2xl">
          {status === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-14 h-14 text-brand-verde mx-auto mb-4" />
              <p className="font-serif text-2xl text-brand-verde-osc">
                {t.finalCta.formSuccess}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="font-serif text-2xl text-brand-verde-osc mb-6">
                {t.finalCta.formTitle}
              </h3>

              <div className="space-y-4">
                <label className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-brand-gris mb-1">
                    {t.finalCta.formName} <span className="text-brand-oro">*</span>
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-verde/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-oro/40 focus:border-brand-oro transition"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-brand-gris mb-1">
                    {t.finalCta.formPhone} <span className="text-brand-oro">*</span>
                  </span>
                  <div className="phone-input-shell px-4 py-3 border border-brand-verde/20 rounded-lg bg-white focus-within:border-brand-oro focus-within:ring-2 focus-within:ring-brand-oro/30 transition">
                    <PhoneInput
                      defaultCountry="MX"
                      value={phone}
                      onChange={setPhone}
                      autoComplete="tel"
                      numberInputProps={{ 'aria-label': t.finalCta.formPhone, required: true }}
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-brand-gris mb-1">
                    {t.finalCta.formEmail} <span className="text-brand-oro">*</span>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-verde/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-oro/40 focus:border-brand-oro transition"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-brand-gris mb-1">
                    {t.finalCta.formCountry}
                  </span>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-verde/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-oro/40 focus:border-brand-oro transition"
                    autoComplete="country"
                  />
                </label>
              </div>

              {errorMsg && (
                <p className="mt-3 text-sm text-red-600" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-brand-verde text-brand-crema rounded-full font-medium tracking-wide hover:bg-brand-verde-osc transition-all shadow-lg hover:shadow-xl disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.finalCta.formSubmitting}
                  </>
                ) : (
                  t.finalCta.formSubmit
                )}
              </button>

              <p className="mt-3 text-[11px] text-brand-gris text-center leading-relaxed">
                {t.finalCta.formConsent}
              </p>
            </form>
          )}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
