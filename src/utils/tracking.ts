/**
 * Tracking capture — same hidden-field standard as the lotes squeeze pages
 * (per Hoshi: every SLVD form sends the identical attribution set).
 *
 * Captured once on app mount and persisted to localStorage so attribution
 * survives in-site navigation before the visitor reaches the contact form.
 */
export interface TrackingParams {
  gclid?: string;
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  // Meta ad structure ({{ad.id}} etc. URL templates) / Google equivalents
  ad_id?: string;
  adset_id?: string;
  campaign_id?: string;
  search_term?: string;
  landing_page: string;
}

const STORAGE_KEY = 'tracking_params';

const pickFirst = (url: URLSearchParams, keys: string[]): string | undefined => {
  for (const k of keys) {
    const v = url.get(k);
    if (v) return v;
  }
  return undefined;
};

export const captureTrackingParams = (): TrackingParams => {
  const urlParams = new URLSearchParams(window.location.search);

  const fresh: TrackingParams = {
    landing_page: window.location.href,
    gclid: urlParams.get('gclid') || undefined,
    fbclid: urlParams.get('fbclid') || undefined,
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
    ad_id: pickFirst(urlParams, ['ad_id', 'ad_source_id', 'fb_ad_id']),
    adset_id: pickFirst(urlParams, ['adset_id', 'fb_adset_id']),
    campaign_id: pickFirst(urlParams, ['campaign_id', 'fb_campaign_id']),
    search_term: pickFirst(urlParams, ['search_term', 'keyword']),
  };

  // Only overwrite the stored set when this visit actually carries
  // attribution — an internal revisit without params keeps the original.
  const hasSignal = Object.entries(fresh).some(
    ([k, v]) => k !== 'landing_page' && v,
  );
  if (hasSignal || !localStorage.getItem(STORAGE_KEY)) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)); } catch { /* private mode */ }
  }
  return getStoredTrackingParams();
};

export const getStoredTrackingParams = (): TrackingParams => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* private mode */ }
  return { landing_page: window.location.href };
};
