export type MockupSlide = {
  imac: string
  tablet: string
  mobile: string
}

/** Proiezione GROQ del campo "Hero mockup slides" (pagine Ecommerce e Siti web). */
export const MOCKUP_SLIDES_PROJECTION = `mockupSlides[]{
    "imac": imac.asset->url,
    "tablet": tablet.asset->url,
    "mobile": mobile.asset->url
  }`

/** Slide da Sanity complete (tutti e tre i device); se non ce ne sono, quelle locali. */
export function resolveMockupSlides(
  fromSanity: Partial<MockupSlide>[] | null | undefined,
  fallback: MockupSlide[]
): MockupSlide[] {
  const slides = (fromSanity ?? []).filter(
    (s): s is MockupSlide => Boolean(s?.imac && s?.tablet && s?.mobile)
  )
  return slides.length ? slides : fallback
}
