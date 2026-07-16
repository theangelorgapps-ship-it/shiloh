type AnalyticsValue = string | number | boolean | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_ID?.trim() || 'AW-994462220';
const sponsorConversionLabel =
  import.meta.env.VITE_GOOGLE_ADS_SPONSOR_CONVERSION_LABEL?.trim() || '3_G6CO-ErNEcEIyUmdoD';

export function initializeAnalytics() {
  persistCampaignAttribution();
  if (!googleAdsId || document.querySelector(`script[data-google-ads-id="${googleAdsId}"]`)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag('js', new Date());
  window.gtag('config', googleAdsId, { send_page_view: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAdsId)}`;
  script.dataset.googleAdsId = googleAdsId;
  document.head.appendChild(script);
}

export function trackEvent(name: string, parameters: Record<string, AnalyticsValue> = {}) {
  window.gtag?.('event', name, parameters);
}

export function trackSponsorPurchase(transactionId: string, value: number, currency = 'USD') {
  if (!transactionId || !Number.isFinite(value) || value <= 0) return false;
  const storageKey = `shiloh-sponsor-purchase:${transactionId}`;
  if (window.localStorage.getItem(storageKey)) return false;
  const purchase = { transaction_id: transactionId, value, currency: currency.toUpperCase() };
  trackEvent('purchase', purchase);
  if (googleAdsId && sponsorConversionLabel) {
    window.gtag?.('event', 'conversion', { send_to: `${googleAdsId}/${sponsorConversionLabel}`, ...purchase });
  }
  window.localStorage.setItem(storageKey, new Date().toISOString());
  return true;
}

function persistCampaignAttribution() {
  const params = new URLSearchParams(window.location.search);
  const keys = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  let stored: Record<string, string> = {};
  try { stored = JSON.parse(window.localStorage.getItem('shiloh-campaign-attribution') || '{}'); } catch { stored = {}; }
  let changed = false;
  for (const key of keys) {
    const value = params.get(key);
    if (value) { stored[key] = value; changed = true; }
  }
  if (changed) {
    stored.landing_page = window.location.href;
    stored.captured_at = new Date().toISOString();
    window.localStorage.setItem('shiloh-campaign-attribution', JSON.stringify(stored));
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
  try { return JSON.parse(input); } catch { return { message: input }; }
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
