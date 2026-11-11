import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"
import { companyLogoFor } from "./CompanyLogos"

/*
 * Card di una recensione: la stessa nelle sezioni recensioni e nell'anteprima
 * di /recensioni. Le immagini arrivano da Sanity (photo/logo) oppure,
 * nell'anteprima, come URL locali (photoSrc/logoSrc).
 */

type SanityImage = { asset: { _ref: string } }

export interface Review {
  stars: number
  reviewTitle: string
  reviewText: string
  authorName: string
  authorRole: string
  authorPhoto?: SanityImage
  companyLogo?: SanityImage
  website?: string
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div
      style={{
        display: "inline-block",
        background: "linear-gradient(to right, #fc03b0, #047cf9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontSize: "18px",
        letterSpacing: "2px",
        marginBottom: "12px",
      }}
    >
      {"★".repeat(stars)}
    </div>
  )
}

const avatarStyle = { borderRadius: "50%", width: "36px", height: "36px", objectFit: "cover" as const, flexShrink: 0 }
const logoStyle = { height: "28px", width: "auto", objectFit: "contain" as const, flexShrink: 0 }

export default function ReviewCard({
  review,
  hideOnMobile,
  photoSrc,
  logoSrc,
}: {
  review: Review
  hideOnMobile?: boolean
  photoSrc?: string
  logoSrc?: string
}) {
  const photo = photoSrc ?? (review.authorPhoto ? urlFor(review.authorPhoto).width(80).height(80).url() : undefined)
  const logo = logoSrc ?? (review.companyLogo ? urlFor(review.companyLogo).width(140).fit("max").url() : undefined)

  return (
    <div className={`review-card card-adaptive rounded-2xl p-5 mb-3${hideOnMobile ? " max-md:hidden" : ""}`}>
      <StarRating stars={review.stars} />

      {review.reviewTitle && (
        <h3
          className="review-card-title"
          style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", lineHeight: "1.4" }}
        >
          &ldquo;{review.reviewTitle}&rdquo;
        </h3>
      )}

      {review.reviewText && (
        <p className="review-card-text" style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
          &ldquo;{review.reviewText}&rdquo;
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {photo ? (
            <Image src={photo} alt={review.authorName} width={36} height={36} unoptimized={!!photoSrc} style={avatarStyle} />
          ) : (
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(to right, #fc03b0, #047cf9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              {review.authorName?.charAt(0)}
            </div>
          )}
          <div>
            <p className="review-card-author" style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1.2 }}>
              {review.authorName}
            </p>
            {review.authorRole &&
              (review.website ? (
                <a
                  href={review.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="review-card-role underline-offset-2 hover:underline"
                  style={{ fontSize: "11px" }}
                >
                  {review.authorRole}
                </a>
              ) : (
                <p className="review-card-role" style={{ fontSize: "11px" }}>
                  {review.authorRole}
                </p>
              ))}
          </div>
        </div>

        {companyLogoFor(review.authorName) ??
          (logo && (
            <Image src={logo} alt="logo" width={70} height={35} unoptimized={!!logoSrc} style={logoStyle} />
          ))}
      </div>
    </div>
  )
}
