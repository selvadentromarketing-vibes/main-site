import { useState, FormEvent } from 'react';
import { Calendar, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import type { Value as PhoneValue } from 'react-phone-number-input';
import Reveal from '../Reveal';
import MagneticButton from '../MagneticButton';
import { getStoredTrackingParams } from '../../utils/tracking';
import type { Translation } from '../../i18n/translations';
import 'react-phone-number-input/style.css';

interface Props {
  t: Translation;
  lang: 'es' | 'en';
}

/**
 * Final CTA + Contact form. Posts to the existing GHL inbound webhook with a
 * source_label of 'main-site' so the sales team can route those leads to a
 * dedicated workflow. Field set matches the /escape squeeze form on
 * lotes.selvadentrotulum.com — first name, last name, phone, email, budget,
 * investment horizon.
 */
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/crN2IhAuOBAl7D8324yI/webhook-trigger/9270085e-204b-40e0-a565-b2bf60861970';

const WHATSAPP_URL = 'https://wa.me/529994890828';

// Budget ranges are universal ($USD) and stay identical across langs so the
// stored value is stable for reporting.
const BUDGET_OPTIONS = ['$1M - $2M', '$2M - $3M', '$3M - $5M', '+$5M'] as const;

export default function FinalCTASection({ t, lang }: Props) {
  const schedulePath = lang === 'en' ? '/en/agendar' : '/agendar';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [horizon, setHorizon] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone ||
      !email.trim() ||
      !budget ||
      !horizon
    ) {
      setErrorMsg(t.finalCta.formError);
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setErrorMsg(t.finalCta.formError);
      return;
    }

    setStatus('submitting');

    // Same hidden-field standard as the squeeze pages (per Hoshi).
    const tracking = getStoredTrackingParams();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      name: fullName,
      email: email.trim(),
      phone,
      budget,
      investment_horizon: horizon,
      source_label: 'main-site',
      form_name: 'main-site-final-cta',
      landing_page: tracking.landing_page,
      page_url: window.location.href,
      utm_source: tracking.utm_source || 'organic',
      utm_medium: tracking.utm_medium,
      utm_campaign: tracking.utm_campaign || '',
      utm_term: tracking.utm_term,
      utm_content: tracking.utm_content,
      gclid: tracking.gclid,
      fbclid: tracking.fbclid,
      ad_id: tracking.ad_id,
      ad_source_id: tracking.ad_id, // GHL "Ad Source ID" alias
      adset_id: tracking.adset_id,
      campaign_id: tracking.campaign_id,
      search_term: tracking.search_term,
      'contact.source': tracking.utm_source || 'main-site',
      'contact.campaign': tracking.utm_campaign,
      'contact.ad_ctwa_clid': tracking.fbclid || tracking.gclid,
      'contact.budget': budget,
      'contact.investment_horizon': horizon,
      campaign_label: tracking.utm_campaign || 'Direct',
      tags: ['main-site'],
    };

    try {
      const response = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      // Meta Pixel Lead event — fires only when the webhook accepted the
      // submission, so it stays in sync with the CRM.
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(
        'track',
        'Lead',
        { content_name: 'main-site-final-cta', budget, investment_horizon: horizon },
      );
      setStatus('success');
    } catch (err) {
      console.error('Main site form submission failed:', err);
      setStatus('error');
      setErrorMsg(t.finalCta.formError);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-brand-verde/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-oro/40 focus:border-brand-oro transition bg-white';
  const labelClass =
    'block text-xs font-semibold uppercase tracking-wider text-brand-gris mb-1';

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
              <MagneticButton href={schedulePath} className="btn-secondary">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className={labelClass}>
                      {t.finalCta.formName} <span className="text-brand-oro">*</span>
                    </span>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClass}
                      autoComplete="given-name"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>
                      {t.finalCta.formLastName} <span className="text-brand-oro">*</span>
                    </span>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClass}
                      autoComplete="family-name"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>
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
                  <span className={labelClass}>
                    {t.finalCta.formEmail} <span className="text-brand-oro">*</span>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>
                    {t.finalCta.formHorizon} <span className="text-brand-oro">*</span>
                  </span>
                  <select
                    value={horizon}
                    onChange={(e) => setHorizon(e.target.value)}
                    className={inputClass + ' appearance-none pr-10 cursor-pointer'}
                    required
                  >
                    <option value="">{t.finalCta.formHorizonPlaceholder}</option>
                    {t.finalCta.horizonOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className={labelClass}>
                    {t.finalCta.formBudget} <span className="text-brand-oro">*</span>
                  </span>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={inputClass + ' appearance-none pr-10 cursor-pointer'}
                    required
                  >
                    <option value="">{t.finalCta.formBudgetPlaceholder}</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
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
