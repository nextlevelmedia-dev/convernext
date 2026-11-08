/*
 * Consenso ai cookie (provvisorio, in attesa di iubenda).
 * La scelta è salvata nel browser; quando si aggiungerà il Pixel Meta o altri
 * strumenti di marketing, vanno attivati solo se hasMarketingConsent() è true
 * (e ascoltando l'evento "cookie-consent" per chi accetta dopo).
 */

export const CONSENT_KEY = "cookie-consent"
export const CONSENT_VERSION = 1

export type Consent = { marketing: boolean; v: number; at: string }

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as Consent
    return c.v === CONSENT_VERSION ? c : null
  } catch {
    return null
  }
}

export function saveConsent(marketing: boolean) {
  const c: Consent = { marketing, v: CONSENT_VERSION, at: new Date().toISOString() }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c))
  } catch {
    // browser senza storage: la scelta vale solo per questa visita
  }
  window.dispatchEvent(new CustomEvent("cookie-consent", { detail: c }))
}

export function hasMarketingConsent() {
  return readConsent()?.marketing === true
}

/** Riapre il banner (link "Preferenze cookie" nel footer). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event("cookie-preferences"))
}
