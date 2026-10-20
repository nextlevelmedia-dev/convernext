import Image from "next/image"
import Link from "next/link"

type TeamIntroProps = {
  eyebrow?: string
  title?: string
  titleHighlight?: string
  text?: string
  name?: string
  role?: string
  image?: {
    asset?: {
      url?: string
    }
  }
  imageAlt?: string
  ctaText?: string
  ctaHref?: string
}

/**
 * Sezione team in home: foto con cartellino nome a sinistra,
 * titolo e testo a destra.
 */
export default function TeamIntro({
  eyebrow,
  title,
  titleHighlight,
  text,
  name,
  role,
  image,
  imageAlt,
  ctaText,
  ctaHref,
}: TeamIntroProps) {
  const imageUrl = image?.asset?.url
  const paragraphs = text
    ?.split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  if (!title && !titleHighlight && !paragraphs?.length && !imageUrl) return null

  return (
    <section className="relative overflow-clip px-5 py-24 md:px-8 md:py-32 xl:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-16 lg:gap-24">
        {imageUrl && (
          <div className="relative mx-auto w-full max-w-[460px] md:mx-0">
            <div
              aria-hidden
              className="absolute -inset-10 rounded-[48px] bg-[radial-gradient(60%_55%_at_30%_25%,rgb(252_3_176/0.16),transparent_70%),radial-gradient(60%_55%_at_70%_80%,rgb(4_124_249/0.14),transparent_70%)] blur-2xl"
            />

            <figure className="relative rounded-[28px] border border-slate-200 bg-white p-2 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_24px_60px_-24px_rgb(15_23_42/0.25)] dark:border-white/10 dark:bg-[#0f1726]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-slate-100 dark:bg-[#111827]">
                <Image
                  src={imageUrl}
                  alt={imageAlt || name || "Il team di Convernext"}
                  fill
                  sizes="(min-width: 768px) 460px, 100vw"
                  className="object-cover"
                />

                {(name || role) && (
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/35 px-5 py-4 backdrop-blur-md">
                    {name && (
                      <strong
                        className="block text-lg text-white"
                        style={{
                          fontFamily: "var(--font-archivo), sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {name}
                      </strong>
                    )}
                    {role && (
                      <span className="mt-0.5 block text-sm text-white/75">
                        {role}
                      </span>
                    )}
                  </figcaption>
                )}
              </div>
            </figure>
          </div>
        )}

        <div>
          {eyebrow && (
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-white/60">
              <span aria-hidden className="h-px w-8 bg-brand-gradient" />
              {eyebrow}
            </p>
          )}

          {(title || titleHighlight) && (
            <h2
              className="mt-5 text-4xl leading-[1.1] tracking-tight text-slate-950 md:text-5xl lg:text-[56px] dark:text-white"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontWeight: 600,
              }}
            >
              {title}
              {title && titleHighlight && <br />}
              {titleHighlight && (
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {titleHighlight}
                </span>
              )}
            </h2>
          )}

          {paragraphs && paragraphs.length > 0 && (
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-black/65 dark:text-white/70">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {ctaText && ctaHref && (
            <Link
              href={ctaHref}
              className="group/al mt-10 inline-flex items-center gap-1.5 font-bold text-slate-950 transition-colors hover:text-[#047cf9] dark:text-white"
            >
              <span className="bg-[linear-gradient(90deg,#fc03b0,#047cf9)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/al:bg-[length:100%_1.5px]">
                {ctaText}
              </span>
              <span aria-hidden className="transition-transform duration-300 group-hover/al:translate-x-1">
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
