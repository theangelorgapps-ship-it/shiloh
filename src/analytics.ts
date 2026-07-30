type AnalyticsValue = string | number | boolean | undefined;

type AnalyticsConsent = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_ID?.trim() || 'AW-994462220';
const registrationLeadLabel =
  import.meta.env.VITE_GOOGLE_ADS_REGISTRATION_LEAD_LABEL?.trim() || '-_kFCMmqqtkcEIyUmdoD';
const sponsorLeadLabel =
  import.meta.env.VITE_GOOGLE_ADS_SPONSOR_LEAD_LABEL?.trim() || '914TCPSns9kcEIyUmdoD';
const sponsorPurchaseLabel =
  import.meta.env.VITE_GOOGLE_ADS_SPONSOR_CONVERSION_LABEL?.trim() || '3_G6CO-ErNEcEIyUmdoD';
const attributionStorageKey = 'shiloh-campaign-attribution';
const consentStorageKey = 'shiloh-google-consent-v1';
const attributionKeys = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export function initializeAnalytics() {
  persistCampaignAttribution();
  ensureGoogleTag();
  const storedConsent = getAnalyticsConsent();
  if (storedConsent) updateGoogleConsent(storedConsent);
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem(consentStorageKey);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  try {
    window.localStorage.setItem(consentStorageKey, consent);
  } catch {
    // Consent still applies for this page view when storage is unavailable.
  }
  updateGoogleConsent(consent);
  trackEvent('consent_update', { analytics_storage: consent, ad_storage: consent });
}

export function trackEvent(name: string, parameters: Record<string, AnalyticsValue> = {}) {
  window.gtag?.('event', name, parameters);
}

export function trackRegistrationLead(registrationType: 'conference' | 'birthday') {
  const dedupeKey = `shiloh-registration-lead:${registrationType}`;
  if (!markOnce(window.sessionStorage, dedupeKey)) return false;
  const event = {
    currency: 'USD',
    value: 1,
    campaign: 'shiloh_2026_registration',
    registration_type: registrationType,
  };
  trackEvent('generate_lead', event);
  sendGoogleAdsConversion(registrationLeadLabel, event);
  return true;
}

export function trackSponsorLead() {
  if (!markOnce(window.sessionStorage, 'shiloh-sponsor-lead')) return false;
  const event = { currency: 'USD', value: 1, campaign: 'bring_someone_to_shiloh_2026' };
  trackEvent('generate_lead', event);
  sendGoogleAdsConversion(sponsorLeadLabel, event);
  return true;
}

export function trackSponsorPurchase(transactionId: string, value: number, currency = 'USD') {
  if (!transactionId || !Number.isFinite(value) || value <= 0) return false;
  const storageKey = `shiloh-sponsor-purchase:${transactionId}`;
  if (!markOnce(window.localStorage, storageKey)) return false;
  const purchase = { transaction_id: transactionId, value, currency: currency.toUpperCase() };
  trackEvent('purchase', purchase);
  sendGoogleAdsConversion(sponsorPurchaseLabel, purchase);
  return true;
}

export function trackMerchCheckout(value: number, items: number) {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value,
    items,
    campaign: 'shiloh_2026_merchandise',
  });
}

export function appendCampaignAttribution(destination: string) {
  const url = new URL(destination, window.location.origin);
  const attribution = getCampaignAttribution();
  for (const key of attributionKeys) {
    const value = attribution[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}

function ensureGoogleTag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));
  if (document.querySelector(`script[data-google-ads-id="${googleAdsId}"]`)) return;
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });
  window.gtag('js', new Date());
  window.gtag('config', googleAdsId, { send_page_view: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAdsId)}`;
  script.dataset.googleAdsId = googleAdsId;
  document.head.appendChild(script);
}

function updateGoogleConsent(consent: AnalyticsConsent) {
  window.gtag?.('consent', 'update', {
    ad_storage: consent,
    analytics_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
  });
}

function sendGoogleAdsConversion(label: string, parameters: Record<string, AnalyticsValue>) {
  if (!googleAdsId || !label) return;
  window.gtag?.('event', 'conversion', { send_to: `${googleAdsId}/${label}`, ...parameters });
}

function markOnce(storage: Storage, key: string) {
  try {
    if (storage.getItem(key)) return false;
    storage.setItem(key, new Date().toISOString());
    return true;
  } catch {
    return true;
  }
}

function getCampaignAttribution(): Record<string, string> {
  try {
    return JSON.parse(window.localStorage.getItem(attributionStorageKey) || '{}');
  } catch {
    return {};
  }
}

function persistCampaignAttribution() {
  const params = new URLSearchParams(window.location.search);
  const stored = getCampaignAttribution();
  let changed = false;
  for (const key of attributionKeys) {
    const value = params.get(key);
    if (value) {
      stored[key] = value;
      changed = true;
    }
  }
  if (changed) {
    stored.landing_page = window.location.href;
    stored.captured_at = new Date().toISOString();
    try {
      window.localStorage.setItem(attributionStorageKey, JSON.stringify(stored));
    } catch {
      // First-party attribution remains available in the current URL.
    }
  }
}

export function readSponsorPaymentMessage(input: unknown) {
  const data = normalizeMessage(input);
  const status = String(findValue(data, ['paymentStatus', 'payment_status', 'status']) ?? '').toLowerCase();
  const transactionId = String(findValue(data, ['transactionId', 'transaction_id', 'chargeId']) ?? '');
  const rawValue = findValue(data, ['amount', 'amountPaid', 'paymentAmount', 'value', 'total']);
  const value = typeof rawValue === 'number' ? rawValue : Number(String(rawValue ?? '').replace(/[^0-9.-]/g, ''));
  const currency = String(findValue(data, ['currency', 'currencyCode']) ?? 'USD');
  return { paid: /succeeded|successful|paid|complete|completed/.test(status), transactionId, value, currency };
}

function normalizeMessage(input: unknown): unknown {
  if (typeof input !== 'string') return input;
  try {
    return JSON.parse(input);
  } catch {
    return { message: input };
  }
}

function findValue(input: unknown, keys: string[]): unknown {
  if (!input || typeof input !== 'object') return undefined;
  const record = input as Record<string, unknown>;
  for (const key of keys) if (record[key] !== undefined && record[key] !== null && record[key] !== '') return record[key];
  for (const value of Object.values(record)) {
    const found = findValue(value, keys);
    if (found !== undefined) return found;
  }
  return undefined;
}
