import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"
import { client } from "../../sanity/lib/client"
import ReviewCard, { type Review } from "./ReviewCard"

// recensioni della home: servono a completare le pagine che ne hanno poche
const POOL_QUERY = `*[_type == "page" && slug.current == "home"][0].reviews.items[]{
  stars,
  reviewTitle,
  reviewText,
  authorName,
  authorRole,
  authorPhoto{ asset->{ _id, url } },
  companyLogo{ asset->{ _id, url } }
}`

// recensioni lasciate dai clienti su /recensioni e approvate (pubblicate)
// nello Studio: compaiono prima di quelle già presenti nelle pagine
const APPROVED_QUERY = `*[_type == "review" && !(_id in path("drafts.**"))] | order(submittedAt desc){
  stars,
  reviewTitle,
  reviewText,
  authorName,
  "authorRole": company,
  website,
  service,
  authorPhoto,
  companyLogo
}`

// pagina → servizi delle recensioni approvate da mostrare (Temi Shopify usa quelle e-commerce)
const APPROVED_FOR: Record<ReviewService, string[]> = {
  "siti-web": ["siti-web"],
  ecommerce: ["ecommerce"],
  "temi-shopify": ["ecommerce"],
  "ottimizzazione-conversioni": ["ottimizzazione-conversioni"],
}

const MAX_REVIEWS = 6

/*
 * Pagine servizio: 3 recensioni pertinenti al servizio (le prime della lista
 * disponibili). Home e Contatti mostrano tutte e 6.
 */
const SERVICE_REVIEWS = {
  ecommerce: ["Luca Frassi", "Fabio Manco", "Dott.ssa Calcagni"],
  "temi-shopify": ["Luca Frassi", "Fabio Manco", "Stefano Doninelli"],
  "ottimizzazione-conversioni": ["Fabio Manco", "Alessia Conti", "Davide Rizzi"],
  "siti-web": ["Davide Rizzi", "Stefano Doninelli", "Martina Iezzi"],
} as const

export type ReviewService = keyof typeof SERVICE_REVIEWS

const SERVICE_LIMIT = 3

const reviewKey = (r: Review) =>
  `${r.authorName ?? ""}|${r.reviewTitle ?? ""}`.trim().toLowerCase().replace(/\s+/g, " ")

/** Recensioni della pagina senza ripetizioni, completate con quelle della home. */
function uniqueReviews(...lists: (Review[] | null | undefined)[]) {
  const seen = new Set<string>()
  const out: Review[] = []
  for (const r of lists.flatMap((l) => l ?? [])) {
    const key = reviewKey(r)
    if (!r?.authorName || seen.has(key)) continue
    seen.add(key)
    out.push(r)
  }
  return out
}

/** Le recensioni del servizio nell'ordine indicato, completate se ne manca qualcuna. */
function pickForService(reviews: Review[], service: ReviewService) {
  const byName = (name: string) => reviews.find((r) => r.authorName?.trim() === name)
  const picked = SERVICE_REVIEWS[service].map(byName).filter((r): r is Review => Boolean(r))
  const rest = reviews.filter((r) => !picked.includes(r))
  return [...picked, ...rest].slice(0, SERVICE_LIMIT)
}

interface Avatar {
  photo?: { asset: { _ref: string } }
}

interface ReviewsSectionProps {
  titleHighlight?: string
  titleNormal?: string
  items?: Review[]
  ctaText?: string
  ctaHref?: string
  socialProofText?: string
  socialProofAvatars?: Avatar[]
  service?: ReviewService
  // quante recensioni mostrare su mobile, dove le colonne si impilano
  mobileLimit?: number
  // link "Vedi tutte le recensioni" (solo in home)
  showAllHref?: string
}

const ctaStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #fc03b0, #047cf9)",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "16px",
  padding: "16px 40px",
  borderRadius: "999px",
  boxShadow: "0 8px 32px rgba(252,3,176,0.25)",
  textDecoration: "none",
  cursor: "pointer",
}

/** Tutte le recensioni: prima quelle approvate dal modulo (più recenti), poi quelle già presenti. */
export async function getAllReviews() {
  const [pool, approved] = await Promise.all([
    client.fetch<Review[] | null>(POOL_QUERY).catch(() => null),
    client.fetch<Review[] | null>(APPROVED_QUERY).catch(() => null),
  ])
  return uniqueReviews(approved, pool)
}

export { ReviewCard }

export default async function ReviewsSection({
  titleHighlight,
  titleNormal,
  items,
  ctaText,
  ctaHref,
  socialProofText,
  socialProofAvatars,
  service,
  mobileLimit,
  showAllHref,
}: ReviewsSectionProps) {
  const [pool, approvedAll] = await Promise.all([
    client.fetch<Review[] | null>(POOL_QUERY).catch(() => null),
    client.fetch<(Review & { service?: string })[] | null>(APPROVED_QUERY).catch(() => null),
  ])
  const approved = (approvedAll ?? []).filter((r) => !service || APPROVED_FOR[service].includes(r.service ?? ""))
  const all = uniqueReviews(items, pool)
  const existing = service ? pickForService(all, service) : all
  const reviews = uniqueReviews(approved, existing).slice(0, service ? SERVICE_LIMIT : MAX_REVIEWS)
  if (!reviews.length) return null

  const col1 = reviews.filter((_, i) => i % 3 === 0)
  const col2 = reviews.filter((_, i) => i % 3 === 1)
  const col3 = reviews.filter((_, i) => i % 3 === 2)

  // su mobile l'ordine è colonna 1, poi 2, poi 3: si nascondono le ultime
  const hiddenOnMobile = new Set(mobileLimit ? [...col1, ...col2, ...col3].slice(mobileLimit) : [])
  const card = (r: Review, i: number) => <ReviewCard key={i} review={r} hideOnMobile={hiddenOnMobile.has(r)} />

  return (
    <section id="recensioni" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {(titleHighlight || titleNormal) && (
          <div className="text-center mb-12 pb-4 max-w-2xl mx-auto">
            <h2
              className="reviews-title"
              style={{
                fontSize: "clamp(32px, 4vw, 42px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "#0f172a",
              }}
            >
              {titleHighlight && (
                <span
                  style={{
                    background: "linear-gradient(to right, #fc03b0, #047cf9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {titleHighlight}
                </span>
              )}
              {titleHighlight && titleNormal && " "}
              {titleNormal}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          <div>{col1.map(card)}</div>
          <div>{col2.map(card)}</div>
          <div>{col3.map(card)}</div>
        </div>

        {showAllHref && (
          <div className="mt-8 flex justify-center">
            <a
              href={showAllHref}
              className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:border-slate-950 dark:border-white/20 dark:text-white dark:hover:border-white"
            >
              Vedi tutte le recensioni
              <i aria-hidden className="not-italic transition-transform duration-300 group-hover:translate-x-1">→</i>
            </a>
          </div>
        )}

        {(ctaText || socialProofText) && (
          <div
            style={{
              marginTop: "48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {ctaText && (
              <a href={ctaHref ?? "/contatti"} style={ctaStyle}>
                {ctaText}
              </a>
            )}

            {(socialProofAvatars?.length || socialProofText) && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {socialProofAvatars && socialProofAvatars.length > 0 && (
                  <div style={{ display: "flex" }}>
                    {socialProofAvatars.slice(0, 4).map((a, i) =>
                      a.photo ? (
                        <Image
                          key={i}
                          src={urlFor(a.photo).width(64).height(64).url()}
                          alt="cliente"
                          width={32}
                          height={32}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid white",
                            marginLeft: i > 0 ? "-8px" : "0",
                            position: "relative",
                            zIndex: 4 - i,
                          }}
                        />
                      ) : (
                        <div
                          key={i}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "linear-gradient(to right, #fc03b0, #047cf9)",
                            border: "2px solid white",
                            marginLeft: i > 0 ? "-8px" : "0",
                            position: "relative",
                            zIndex: 4 - i,
                          }}
                        />
                      )
                    )}
                  </div>
                )}
                {socialProofText && (
                  <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 500 }}>
                    {socialProofText}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}