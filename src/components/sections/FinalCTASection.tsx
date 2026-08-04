import { useState, useMemo, useRef, FormEvent } from 'react';
import { Calendar, MessageCircle, Loader2, CheckCircle2, Check } from 'lucide-react';
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

const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/crN2IhAuOBAl7D8324yI/webhook-trigger/9270085e-204b-40e0-a565-b2bf60861970';

const WHATSAPP_URL = 'https://wa.me/529994890828';

const BUDGET_OPTIONS = ['$1M - $2M', '$2M - $3M', '$3M - $5M', '+$5M'] as const;

// Tulum runs on America/Cancun (EST, UTC-05:00, no DST).
const TULUM_TZ_OFFSET = '-05:00';

const TIME_SLOTS: { value: string; label: string }[] = [
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
];

function buildDateOptions(lang: 'es' | 'en') {
  const locale = lang === 'es' ? 'es-MX' : 'en-US';
  const fmt = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const days: { value: string; label: string }[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < 14) {
    if (d.getDay() !== 0) {
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const label = fmt.format(d).replace(/\./g, '').replace(/,\s/g, ' ');
      days.push({ value: iso, label: label.charAt(0).toUpperCase() + label.slice(1) });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export default function FinalCTASection({ t, lang }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [horizon, setHorizon] = useState('');
  const [scheduleMode, setScheduleMode] = useState(false);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const dateOptions = useMemo(() => buildDateOptions(lang), [lang]);

  const toggleSchedule = () => {
    setScheduleMode((prev) => {
      const next = !prev;
      if (!next) {
        setPreferredDate('');
        setPreferredTime('');
      } else {
        // Scroll the form into view when opening scheduling.
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 60);
      }
      return next;
    });
  };

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
    if (scheduleMode && (!preferredDate || !preferredTime)) {
      setErrorMsg(t.finalCta.formError);
      return;
    }

    setStatus('submitting');

    const tracking = getStoredTrackingParams();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    const dateLabel = scheduleMode
      ? dateOptions.find((d) => d.value === preferredDate)?.label || preferredDate
      : '';
    const timeLabel = scheduleMode
      ? TIME_SLOTS.find((s) => s.value === preferredTime)?.label || preferredTime
      : '';
    const preferredDatetime =
      scheduleMode && preferredDate && preferredTime
        ? `${preferredDate}T${preferredTime}:00${TULUM_TZ_OFFSET}`
        : '';

    const payload: Record<string, unknown> = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      name: fullName,
      email: email.trim(),
      phone,
      budget,
      investment_horizon: horizon,
      source_label: scheduleMode ? 'main-site-schedule' : 'main-site',
      form_name: scheduleMode ? 'main-site-schedule' : 'main-site-final-cta',
      wants_call: scheduleMode,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      preferred_date_label: dateLabel,
      preferred_time_label: timeLabel,
      preferred_datetime: preferredDatetime,
      preferred_timezone: 'America/Cancun',
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
      ad_source_id: tracking.ad_id,
      adset_id: tracking.adset_id,
      campaign_id: tracking.campaign_id,
      search_term: tracking.search_term,
      'contact.source': tracking.utm_source || (scheduleMode ? 'main-site-schedule' : 'main-site'),
      'contact.campaign': tracking.utm_campaign,
      'contact.ad_ctwa_clid': tracking.fbclid || tracking.gclid,
      'contact.budget': budget,
      'contact.investment_horizon': horizon,
      'contact.preferred_date': preferredDate,
      'contact.preferred_time': preferredTime,
      'contact.preferred_datetime': preferredDatetime,
      campaign_label: tracking.utm_campaign || 'Direct',
      tags: scheduleMode ? ['main-site', 'schedule'] : ['main-site'],
    };

    try {
      const response = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(
        'track',
        'Lead',
        {
          content_name: scheduleMode ? 'main-site-schedule' : 'main-site-final-cta',
          budget,
          investment_horizon: horizon,
        },
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

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <MagneticButton
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="w-5 h-5" />
                {t.finalCta.whatsappCta}
              </MagneticButton>
              <button
                type="button"
                onClick={toggleSchedule}
                aria-pressed={scheduleMode}
                className={
                  scheduleMode
                    ? 'btn-secondary ring-2 ring-brand-oro/60'
                    : 'btn-secondary'
                }
                style={{ display: 'inline-flex' }}
              >
                {scheduleMode ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Calendar className="w-5 h-5" />
                )}
                {scheduleMode ? t.finalCta.callCtaActive : t.finalCta.callCta}
              </button>
            </div>
            {scheduleMode && (
              <p className="text-brand-oro text-xs uppercase tracking-[0.25em] mb-8">
                {t.finalCta.callCtaHint}
              </p>
            )}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={150}>
        <div ref={formRef} className="bg-brand-crema text-brand-negro rounded-2xl p-8 sm:p-10 shadow-2xl">
          {status === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-14 h-14 text-brand-verde mx-auto mb-4" />
              <p className="font-serif text-2xl text-brand-verde-osc">
                {scheduleMode ? t.finalCta.formSuccessSchedule : t.finalCta.formSuccess}
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

                {scheduleMode && (
                  <div
                    id="schedule-fields"
                    className="rounded-xl border border-brand-oro/40 bg-brand-oro/5 p-4"
                  >
                    <span className="eyebrow text-brand-verde-osc mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t.finalCta.schedulePreferred}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className={labelClass}>
                          {t.finalCta.formDate} <span className="text-brand-oro">*</span>
                        </span>
                        <select
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className={inputClass + ' appearance-none pr-10 cursor-pointer'}
                          required
                        >
                          <option value="">{t.finalCta.formDatePlaceholder}</option>
                          {dateOptions.map((d) => (
                            <option key={d.value} value={d.value}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className={labelClass}>
                          {t.finalCta.formTime} <span className="text-brand-oro">*</span>
                        </span>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className={inputClass + ' appearance-none pr-10 cursor-pointer'}
                          required
                        >
                          <option value="">{t.finalCta.formTimePlaceholder}</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                )}

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
                  scheduleMode ? t.finalCta.formSubmitSchedule : t.finalCta.formSubmit
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
