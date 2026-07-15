import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle2, Calendar } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import type { Value as PhoneValue } from 'react-phone-number-input';
import Reveal from '../Reveal';
import { getStoredTrackingParams } from '../../utils/tracking';
import type { Lang } from '../../i18n/translations';
import 'react-phone-number-input/style.css';

interface Props {
  lang: Lang;
}

/**
 * Schedule page section — form on the left, embedded GHL booking widget
 * on the right. Both actions happen on-site: the form posts to the same
 * GHL webhook as the main-site contact form, tagged as 'schedule-page';
 * the calendar renders inline via iframe so the visitor never leaves.
 */
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/crN2IhAuOBAl7D8324yI/webhook-trigger/9270085e-204b-40e0-a565-b2bf60861970';

const CALENDAR_URL_ES =
  'https://api.leadconnectorhq.com/widget/booking/8nXsnnlYWnit0JbwUFsJ';
const CALENDAR_URL_EN =
  'https://api.leadconnectorhq.com/widget/booking/jL5tqW1PsFp98HZOafHO';

export default function ScheduleSection({ lang }: Props) {
  const calendarUrl = lang === 'en' ? CALENDAR_URL_EN : CALENDAR_URL_ES;

  const copy =
    lang === 'es'
      ? {
          eyebrow: 'Agenda tu llamada',
          headline: 'Elige el día y la hora que mejor te acomode.',
          body: 'Un asesor de Selvadentro te llama para responder tus preguntas, mostrarte lotes disponibles y explicarte el esquema de inversión. Rellena tus datos y elige un horario del calendario a la derecha — todo desde aquí.',
          calendarLabel: 'Calendario disponible',
          formTitle: 'Tus datos',
          formName: 'Nombre',
          formLastName: 'Apellido',
          formPhone: 'Teléfono',
          formEmail: 'Correo',
          formSubmit: 'Guardar mis datos',
          formSubmitting: 'Enviando…',
          formSuccess:
            '¡Listo! Ahora elige un horario en el calendario a la derecha.',
          formError:
            'No pudimos enviar tus datos. Intenta de nuevo o escríbenos a info@selvadentrotulum.com.',
          consent:
            'Al enviar aceptas que un asesor de Selvadentro te contacte. No compartimos tus datos.',
          iframeTitle: 'Agenda con Selvadentro',
        }
      : {
          eyebrow: 'Schedule your call',
          headline: 'Pick the day and time that fits you best.',
          body: 'A Selvadentro advisor will call you to answer questions, walk you through available lots, and explain the investment plan. Leave your details and pick a slot on the calendar to the right — everything happens here.',
          calendarLabel: 'Live calendar',
          formTitle: 'Your details',
          formName: 'First name',
          formLastName: 'Last name',
          formPhone: 'Phone',
          formEmail: 'Email',
          formSubmit: 'Save my details',
          formSubmitting: 'Sending…',
          formSuccess:
            'All set! Now pick a slot on the calendar to the right.',
          formError:
            "We couldn't send your details. Please try again or email info@selvadentrotulum.com.",
          consent:
            'By submitting you agree to be contacted by a Selvadentro advisor. We never share your data.',
          iframeTitle: 'Schedule with Selvadentro',
        };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!firstName.trim() || !lastName.trim() || !phone || !email.trim()) {
      setErrorMsg(copy.formError);
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setErrorMsg(copy.formError);
      return;
    }

    setStatus('submitting');

    const tracking = getStoredTrackingParams();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      name: fullName,
      email: email.trim(),
      phone,
      source_label: 'schedule-page',
      form_name: 'main-site-schedule',
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
      'contact.source': tracking.utm_source || 'schedule-page',
      'contact.campaign': tracking.utm_campaign,
      'contact.ad_ctwa_clid': tracking.fbclid || tracking.gclid,
      campaign_label: tracking.utm_campaign || 'Direct',
      tags: ['main-site', 'schedule-page'],
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
        { content_name: 'main-site-schedule' },
      );
      setStatus('success');
    } catch (err) {
      console.error('Schedule form submission failed:', err);
      setStatus('error');
      setErrorMsg(copy.formError);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-brand-verde/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-oro/40 focus:border-brand-oro transition bg-white';
  const labelClass =
    'block text-xs font-semibold uppercase tracking-wider text-brand-gris mb-1';

  return (
    <section
      id="agendar"
      className="section bg-brand-verde-osc text-brand-crema"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* LEFT — intro + form */}
        <Reveal>
          <div>
            <span className="eyebrow text-brand-oro mb-3">{copy.eyebrow}</span>
            <h1
              className="font-serif leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              {copy.headline}
            </h1>
            <p className="text-brand-crema/85 leading-relaxed mb-8">
              {copy.body}
            </p>

            <div className="bg-brand-crema text-brand-negro rounded-2xl p-6 sm:p-8 shadow-2xl">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-brand-verde mx-auto mb-3" />
                  <p className="font-serif text-lg text-brand-verde-osc">
                    {copy.formSuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="font-serif text-xl text-brand-verde-osc mb-5">
                    {copy.formTitle}
                  </h2>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className={labelClass}>
                          {copy.formName} <span className="text-brand-oro">*</span>
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
                          {copy.formLastName} <span className="text-brand-oro">*</span>
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
                        {copy.formPhone} <span className="text-brand-oro">*</span>
                      </span>
                      <div className="phone-input-shell px-4 py-3 border border-brand-verde/20 rounded-lg bg-white focus-within:border-brand-oro focus-within:ring-2 focus-within:ring-brand-oro/30 transition">
                        <PhoneInput
                          defaultCountry="MX"
                          value={phone}
                          onChange={setPhone}
                          autoComplete="tel"
                          numberInputProps={{ 'aria-label': copy.formPhone, required: true }}
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className={labelClass}>
                        {copy.formEmail} <span className="text-brand-oro">*</span>
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
                  </div>

                  {errorMsg && (
                    <p className="mt-3 text-sm text-red-600" role="alert">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-verde text-brand-crema rounded-full font-medium tracking-wide hover:bg-brand-verde-osc transition-all shadow-lg hover:shadow-xl disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {copy.formSubmitting}
                      </>
                    ) : (
                      copy.formSubmit
                    )}
                  </button>

                  <p className="mt-3 text-[11px] text-brand-gris text-center leading-relaxed">
                    {copy.consent}
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>

        {/* RIGHT — embedded calendar */}
        <Reveal delay={150}>
          <div>
            <div className="flex items-center gap-2 text-brand-oro text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              <Calendar className="w-4 h-4" />
              {copy.calendarLabel}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-brand-crema/10 bg-white">
              <iframe
                src={calendarUrl}
                title={copy.iframeTitle}
                loading="lazy"
                className="block w-full border-0"
                style={{ height: '760px' }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
