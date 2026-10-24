import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "../sanity/lib/image"
import TrustPoints from "./TrustPoints/TrustPoints"

type CtaProofAvatar = {
  photo?: Parameters<typeof urlFor>[0]
}

type SocialProofStat = {
  value?: string
  label?: string
  hideOnMobile?: boolean
}

type HeroProps = {
  eyebrow?: string
  title?: string
  titleTwo?: string
  highlightOne?: string
  highlightTwo?: string
  subtitle?: string
  ctaText?: string

  trustPoints?: string[]

  ctaProofText?: string
  ctaProofAvatars?: CtaProofAvatar[]

  socialProofBadgeTitle?: string
  socialProofBadgeSubtitle?: string
  socialProofStats?: SocialProofStat[]

  rightContent?: ReactNode
}

export default function Hero({
  eyebrow,
  title,
  titleTwo,
  highlightOne,
  highlightTwo,
  subtitle,
  ctaText,
  trustPoints,
  ctaProofText,
  ctaProofAvatars,
  socialProofBadgeTitle,
  socialProofBadgeSubtitle,
  socialProofStats,
  rightContent,
}: HeroProps) {
  const hasCtaProof = Boolean(ctaProofText)

  const hasSocialProof =
    Boolean(socialProofBadgeTitle) ||
    Boolean(socialProofBadgeSubtitle) ||
    Boolean(socialProofStats?.length)

  return (
    // da desktop hero + banda occupano esattamente lo schermo
    <div className="lg:flex lg:min-h-svh lg:flex-col">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        className="relative overflow-hidden bg-white px-5 pb-24 pt-28 md:px-6 md:pt-40 lg:flex lg:flex-1 lg:items-center lg:pb-12 lg:pt-28 text-black transition-colors duration-300 dark:bg-black dark:text-white"
        style={{
          fontFamily: "var(--font-lato), sans-serif",
        }}
      >
        {/* GRID BACKGROUND */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.045)_1px,transparent_1px),linear-gradient(rgb(15_23_42/0.045)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)] dark:bg-[linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)]"
        />

        {/* GLOW BACKGROUND */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_8%_0%,rgb(252_3_176/0.12),transparent_70%),radial-gradient(60%_60%_at_95%_10%,rgb(4_124_249/0.1),transparent_70%)] dark:bg-[radial-gradient(60%_60%_at_8%_0%,rgb(252_3_176/0.16),transparent_70%),radial-gradient(60%_60%_at_95%_10%,rgb(4_124_249/0.14),transparent_70%)]"
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* LEFT */}
          <div className="hero-in flex min-w-0 flex-col items-start text-left">
            {eyebrow && (
              <div className="mb-7 inline-flex rounded-full border md:mb-6 border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold backdrop-blur transition-shadow hover:shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.12)] dark:border-white/10 dark:bg-[#0f1726]/80">
                <a
                  href="#recensioni"
                  className="bg-brand-gradient bg-clip-text text-transparent"
                >
                  {eyebrow}
                </a>
              </div>
            )}

            <h1
              className="max-w-3xl text-[clamp(2.35rem,1.2rem+4.4vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-black md:text-5xl md:leading-[1.15] md:tracking-[-0.025em] dark:text-white"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontWeight: 600,
              }}
            >
              {title}{" "}

              {highlightOne && (
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {highlightOne}
                </span>
              )}{" "}

              {titleTwo}{" "}

              {highlightTwo && (
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {highlightTwo}
                </span>
              )}
            </h1>

            {subtitle && (
              <p
                className="mt-7 max-w-xl text-[clamp(1.05rem,0.98rem+0.3vw,1.2rem)] leading-[1.7] text-black/65 md:mt-6 md:max-w-2xl md:text-lg md:leading-8 dark:text-white/70"
                style={{
                  fontFamily: "var(--font-lato), sans-serif",
                  fontWeight: 400,
                }}
              >
                {subtitle}
              </p>
            )}

            {(ctaText || hasCtaProof) && (
              <div className="mt-9 flex flex-col items-start gap-6 md:mt-10 sm:flex-row sm:items-center">
                {ctaText && (
                  <Link
                    href="#contatti"
                    className="group/btn inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-8 text-base font-bold !text-white shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_18px_44px_-12px_rgb(252_3_176/0.6)] active:scale-[0.98]"
                    style={{
                      fontFamily: "var(--font-lato), sans-serif",
                    }}
                  >
                    <span>{ctaText}</span>
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    >
                      <path
                        d="M4.5 11.5l7-7M6 4.5h5.5V10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}

                {/* SOCIAL PROOF SOTTO CTA */}
                {hasCtaProof && (
                  <div className="flex items-center gap-4">
                    {ctaProofAvatars && ctaProofAvatars.length > 0 && (
                      <div className="flex shrink-0 -space-x-2.5">
                        {ctaProofAvatars.slice(0, 4).map((avatar, index) =>
                          avatar.photo ? (
                            <Image
                              key={index}
                              src={urlFor(avatar.photo).width(80).height(80).url()}
                              alt=""
                              width={40}
                              height={40}
                              className="size-9 rounded-full border-2 border-white object-cover dark:border-black"
                            />
                          ) : null
                        )}
                      </div>
                    )}

                    <p className="text-sm leading-5 text-black/65 dark:text-white/70">
                      <span
                        className="block text-[#fac800]"
                        aria-label="5 stelle su 5"
                      >
                        ★★★★★
                      </span>
                      {ctaProofText}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* PUNTI SOTTO CTA */}
            <TrustPoints points={trustPoints} className="mt-8" />
          </div>

          {/* RIGHT */}
          <div className="min-w-0">
            {rightContent ? (
              rightContent
            ) : (
              <div className="relative w-full">
                <div className="relative z-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-black/10 transition-colors dark:border-white/10 dark:bg-neutral-950 dark:shadow-black/40">
                  {/* WINDOW HEADER */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />

                    <span
                      className="ml-2 min-w-0 truncate text-xs font-medium"
                      style={{
                        color: "#64748b",
                        fontFamily: "var(--font-lato), sans-serif",
                      }}
                    >
                      next-level-media.it — Analytics
                    </span>
                  </div>

                  {/* CHART */}
                  <div className="mb-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-4 dark:from-neutral-900 dark:to-neutral-950">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color: "#64748b",
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        Conversioni mensili
                      </span>

                      <span
                        className="shrink-0 text-xs font-bold"
                        style={{
                          color: "#22c55e",
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        ↑ +42%
                      </span>
                    </div>

                    <div className="flex h-20 items-end gap-1.5">
                      {[
                        30, 45, 35, 55, 48, 65, 58, 75, 68, 85, 78, 95,
                      ].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background:
                              i >= 9
                                ? "linear-gradient(to top, #fc03b0, #047cf9)"
                                : "rgba(148,163,184,0.3)",
                          }}
                        />
                      ))}
                    </div>

                    <div
                      className="mt-2 flex justify-between text-[10px]"
                      style={{
                        color: "#64748b",
                        fontFamily: "var(--font-lato), sans-serif",
                      }}
                    >
                      <span>Gen</span>
                      <span>Mar</span>
                      <span>Giu</span>
                      <span>Set</span>
                      <span>Dic</span>
                    </div>
                  </div>

                  {/* ANALYTICS CARDS */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="min-w-0 rounded-xl bg-slate-50 p-3 text-center dark:bg-neutral-900">
                      <p
                        className="bg-brand-gradient bg-clip-text text-lg text-transparent"
                        style={{
                          fontFamily: "var(--font-archivo), sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        +42%
                      </p>

                      <p
                        className="mt-0.5 text-[10px]"
                        style={{
                          color: "#64748b",
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        Conversioni
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-slate-50 p-3 text-center dark:bg-neutral-900">
                      <p
                        className="text-lg text-slate-950 dark:text-white"
                        style={{
                          fontFamily: "var(--font-archivo), sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        2.8x
                      </p>

                      <p
                        className="mt-0.5 text-[10px]"
                        style={{
                          color: "#64748b",
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        ROAS medio
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-slate-50 p-3 text-center dark:bg-neutral-900">
                      <p
                        className="text-lg text-slate-950 dark:text-white"
                        style={{
                          fontFamily: "var(--font-archivo), sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        +120
                      </p>

                      <p
                        className="mt-0.5 text-[10px]"
                        style={{
                          color: "#64748b",
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        Lead/mese
                      </p>
                    </div>
                  </div>
                </div>

                {/* FLOAT CARD TOP */}
                <div className="float-1 absolute -right-2 -top-6 z-20 rounded-2xl border border-slate-100 bg-white px-3 py-2.5 shadow-xl sm:-right-4 sm:px-4 sm:py-3 dark:border-white/10 dark:bg-neutral-950">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <span className="text-sm text-green-600">✓</span>
                    </div>

                    <div>
                      <p
                        className="text-xs font-bold text-slate-800 dark:text-white"
                        style={{
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        Nuovo cliente
                      </p>

                      <p
                        className="text-[10px]"
                        style={{
                          color: "#64748b",
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        2 min fa
                      </p>
                    </div>
                  </div>
                </div>

                {/* FLOAT CARD BOTTOM */}
                <div className="float-2 absolute -bottom-6 -left-2 z-20 rounded-2xl border border-slate-100 bg-white px-3 py-2.5 shadow-xl sm:-left-4 sm:px-4 sm:py-3 dark:border-white/10 dark:bg-neutral-950">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, #fc03b0, #047cf9)",
                      }}
                    >
                      <span className="text-xs font-bold text-white">↑</span>
                    </div>

                    <div>
                      <p
                        className="text-xs font-bold text-slate-800 dark:text-white"
                        style={{
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        PageSpeed 98/100
                      </p>

                      <p
                        className="text-[10px]"
                        style={{
                          color: "#64748b",
                          fontFamily: "var(--font-lato), sans-serif",
                        }}
                      >
                        Performance ottimale
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL PROOF BAND
      ===================================================== */}
      {hasSocialProof && (
        <div
          className="hero-stats w-full shrink-0 overflow-hidden border-y border-slate-200 px-4 py-7 transition-colors sm:px-6 md:py-5 dark:border-white/10"
          style={{
            fontFamily: "var(--font-lato), sans-serif",
          }}
        >
          <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col-reverse items-center justify-center gap-7 md:flex-row md:gap-0">
            {/* BADGE */}
            {(socialProofBadgeTitle || socialProofBadgeSubtitle) && (
              <div className="flex w-full min-w-0 items-center justify-center gap-3 border-t border-slate-200 pt-6 md:w-auto md:shrink-0 md:justify-start md:border-r md:border-t-0 md:pr-8 md:pt-0 dark:border-white/10">
                <div className="relative shrink-0">
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:h-[52px] sm:w-[52px]"
                  >
                    <defs>
                      <linearGradient
                        id="badgeGrad"
                        x1="0"
                        y1="0"
                        x2="52"
                        y2="52"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#fc03b0" />
                        <stop offset="100%" stopColor="#047cf9" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M26 2L6 10V26C6 36.5 14.8 46.2 26 49C37.2 46.2 46 36.5 46 26V10L26 2Z"
                      fill="url(#badgeGrad)"
                    />

                    <path
                      d="M26 7L11 13.5V26C11 34.2 17.6 41.8 26 44C34.4 41.8 41 34.2 41 26V13.5L26 7Z"
                      fill="white"
                      fillOpacity="0.15"
                    />

                    <path
                      d="M18 26L23 31L34 20"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M26 8L27.2 11.5H31L28 13.5L29.2 17L26 15L22.8 17L24 13.5L21 11.5H24.8L26 8Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  {socialProofBadgeTitle && (
                    <p
                      className="break-words text-[10px] uppercase leading-4 tracking-[0.14em] sm:text-xs sm:tracking-widest"
                      style={{
                        background:
                          "linear-gradient(to right, #fc03b0, #047cf9)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "var(--font-archivo), sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {socialProofBadgeTitle}
                    </p>
                  )}

                  {socialProofBadgeSubtitle && (
                    <p className="mt-0.5 break-words text-[10px] font-semibold leading-4 text-slate-600 sm:text-[11px] dark:text-white/50">
                      {socialProofBadgeSubtitle}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* STATS */}
            {socialProofStats && socialProofStats.length > 0 && (
              <div
                className={`grid w-full min-w-0 items-center md:pl-8 ${
                  socialProofStats.length >= 4
                    ? "grid-cols-2 md:grid-cols-4"
                    : socialProofStats.length === 3
                      ? "grid-cols-2 md:grid-cols-3"
                      : socialProofStats.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-1"
                }`}
              >
                {socialProofStats.map((stat, index) => (
                  <div
                    key={`${stat.label}-${index}`}
                    className={`
                      min-w-0 px-3 py-4 text-center
                      max-md:odd:border-r
max-md:odd:border-slate-200
max-md:[&:nth-child(-n+2)]:border-b
max-md:[&:nth-child(-n+2)]:border-slate-200

md:border-r
md:border-slate-200
                      md:px-5
                      md:py-0
                      md:last:border-r-0

                      dark:border-white/10

                      ${stat.hideOnMobile ? "hidden md:block" : ""}
                    `}
                  >
                    {stat.value && (
                      <p
                        className="break-words bg-brand-gradient bg-clip-text text-xl leading-tight text-transparent sm:text-2xl md:text-3xl"
                        style={{
                          fontFamily: "var(--font-archivo), sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {stat.value}
                      </p>
                    )}

                    {stat.label && (
                      <p className="mx-auto mt-1 max-w-[150px] break-words text-xs md:max-w-none font-medium leading-5 text-slate-600 sm:text-sm dark:text-white/50">
                        {stat.label}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}