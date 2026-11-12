/*
 * Eventi per Google Tag Manager (dataLayer).
 * GTM decide cosa farne (GA4, Meta Pixel, ...) e li invia solo se c'è il consenso:
 * qui non si gestisce il consenso, lo fanno iubenda e il Consent Mode di Google.
 */

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

/** id univoco dell'evento: servirà per non contare due volte lo stesso lead (Pixel + API Conversioni) */
export function eventId() {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
}
