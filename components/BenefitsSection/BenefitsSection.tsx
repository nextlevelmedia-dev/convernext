import BenefitIcon from "./BenefitIcon"
import { pickBenefitIcon } from "./benefitIcons"

interface BenefitItem {
  title: string
  description: string
}

interface BenefitsSectionProps {
  titleHighlight?: string
  titleNormal?: string
  items?: BenefitItem[]
  ctaText?: string
  ctaHref?: string
}

export default function BenefitsSection({ titleHighlight, titleNormal, items, ctaText, ctaHref }: BenefitsSectionProps) {
  if (!items?.length) return null
  const link = ctaHref || "#contatti"

  return (
    <section className="benefits-section py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {(titleHighlight || titleNormal) && (
          <div className="text-center mb-16 max-w-lg mx-auto">
            <h2
  className="benefits-title text-4xl leading-[1.2] tracking-tight md:text-[42px]"
  style={{
    fontFamily: "var(--font-archivo), sans-serif",
    fontWeight: 600,
  }}
>
  {titleHighlight && (
    <span className="bg-brand-gradient bg-clip-text text-transparent">
      {titleHighlight}
    </span>
  )}
  {titleHighlight && titleNormal && " "}
  {titleNormal}
</h2>
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="benefit-card card-adaptive group/benefit rounded-2xl p-5 sm:p-7 lg:p-8">
              {/* mobile: icona e titolo sulla stessa riga; da sm in su icona sopra */}
              <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-6">
                <BenefitIcon name={pickBenefitIcon(item.title, item.description)} delay={i * 140} />
                <h3 className="benefit-card-title pr-7 text-lg font-bold leading-snug sm:pr-0">{item.title}</h3>
              </div>
              <span
                aria-hidden
                className="absolute right-5 top-5 font-mono text-xs tracking-[0.14em] !text-slate-400 sm:right-7 sm:top-7 lg:right-8 lg:top-8 dark:!text-white/35"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="benefit-card-text mt-3 text-base leading-7 text-black/65 sm:mt-3 dark:text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        {ctaText && (
          <div className="mt-16 flex justify-center">
            <a href={link} style={{ color: "#ffffff", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #fc03b0, #047cf9)", padding: "16px 40px", borderRadius: "999px", fontWeight: 700, fontSize: "16px", textDecoration: "none", boxShadow: "0 8px 32px rgba(252,3,176,0.25)", cursor: "pointer" }}>{ctaText}</a>
          </div>
        )}
      </div>
    </section>
  )
}