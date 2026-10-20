import Link from "next/link"
import TeamOrbit from "./TeamOrbit"
import TrustPoints from "../TrustPoints/TrustPoints"

type AboutHeroProps = {
  eyebrow?: string
  title?: string
  highlightOne?: string
  titleTwo?: string
  highlightTwo?: string
  subtitle?: string
  ctaText?: string
  trustPoints?: string[]
  imageUrl?: string
  imageAlt?: string
  name?: string
  role?: string
  coreSkills?: string[]
  specialistSkills?: string[]
}

export default function AboutHero({
  eyebrow,
  title,
  highlightOne,
  titleTwo,
  highlightTwo,
  subtitle,
  ctaText,
  trustPoints,
  imageUrl,
  imageAlt,
  name,
  role,
  coreSkills = [],
  specialistSkills = [],
}: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pt-40 lg:pb-28 xl:px-10">
      {/* stessa griglia e alone della hero in home */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.045)_1px,transparent_1px),linear-gradient(rgb(15_23_42/0.045)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)] dark:bg-[linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_8%_0%,rgb(252_3_176/0.12),transparent_70%),radial-gradient(60%_60%_at_95%_10%,rgb(4_124_249/0.1),transparent_70%)] dark:bg-[radial-gradient(60%_60%_at_8%_0%,rgb(252_3_176/0.16),transparent_70%),radial-gradient(60%_60%_at_95%_10%,rgb(4_124_249/0.14),transparent_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="flex min-w-0 flex-col items-start">
          {eyebrow && (
            <div className="mb-7 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold backdrop-blur md:mb-6 dark:border-white/10 dark:bg-[#0f1726]/80">
              <span className="bg-brand-gradient bg-clip-text text-transparent">{eyebrow}</span>
            </div>
          )}

          <h1
            className="max-w-3xl text-[clamp(2.35rem,1.2rem+4.4vw,4.6rem)] leading-[1.04] tracking-[-0.035em] text-slate-950 md:text-5xl md:leading-[1.15] md:tracking-[-0.025em] dark:text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
          >
            {title}{" "}
            {highlightOne && <span className="bg-brand-gradient bg-clip-text text-transparent">{highlightOne}</span>}{" "}
            {titleTwo}{" "}
            {highlightTwo && <span className="bg-brand-gradient bg-clip-text text-transparent">{highlightTwo}</span>}
          </h1>

          {subtitle && (
            <p className="mt-7 max-w-xl text-[clamp(1.05rem,0.98rem+0.3vw,1.2rem)] leading-[1.7] text-black/65 md:mt-6 md:max-w-2xl md:text-lg md:leading-8 dark:text-white/70">
              {subtitle}
            </p>
          )}

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center md:mt-10">
            {ctaText && (
              <Link
                href="#contatti"
                className="group/btn inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-8 text-base font-bold !text-white shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_18px_44px_-12px_rgb(252_3_176/0.6)] active:scale-[0.98]"
              >
                {ctaText}
                <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
              </Link>
            )}
            <Link
              href="#modello"
              className="group/al inline-flex items-center gap-1.5 font-bold text-slate-950 transition-colors hover:text-[#047cf9] dark:text-white"
            >
              <span className="bg-[linear-gradient(90deg,#fc03b0,#047cf9)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/al:bg-[length:100%_1.5px]">
                Come lavoriamo
              </span>
              <span aria-hidden className="transition-transform duration-300 group-hover/al:translate-y-0.5">↓</span>
            </Link>
          </div>

          <TrustPoints points={trustPoints} className="mt-8" />
        </div>

        <TeamOrbit
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          name={name}
          role={role}
          coreSkills={coreSkills}
          specialistSkills={specialistSkills}
        />
      </div>
    </section>
  )
}
