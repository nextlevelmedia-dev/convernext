"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

type HeroChiSiamoProps = {
  eyebrow?: string
  title?: string
  highlightOne?: string
  titleTwo?: string
  highlightTwo?: string
  subtitle?: string
  ctaText?: string
  lottieFile?: string
}

export default function HeroChiSiamo({
  eyebrow,
  title,
  highlightOne,
  titleTwo,
  highlightTwo,
  subtitle,
  ctaText,
  lottieFile = "Team.json",
}: HeroChiSiamoProps) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`/lotties/${lottieFile}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [lottieFile])

  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 pb-24 pt-40 text-black">
        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.035]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {eyebrow && (
              <div className="mb-6 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium ring-1 ring-slate-200">
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {eyebrow}
                </span>
              </div>
            )}

            <h1
              className="max-w-3xl text-4xl font-medium leading-[1.15] tracking-[-0.025em] text-black md:text-5xl lg:text-left"
              style={{
                fontFamily: "var(--font-archivo), sans-serif",
                fontWeight: 500,
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
                className="mt-6 max-w-2xl text-lg leading-8 text-black/65"
                style={{
                  fontFamily: "var(--font-lato), sans-serif",
                  fontWeight: 400,
                }}
              >
                {subtitle}
              </p>
            )}

            {ctaText && (
              <div className="mt-10 flex justify-center lg:justify-start">
                <a
                  href="/contatti"
                  className="inline-flex cursor-pointer rounded-full bg-brand-gradient px-8 py-4 !text-white shadow-xl"
                  style={{
                    fontFamily: "var(--font-lato), sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{
                  width: "100%",
                  maxWidth: 480,
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* BANDA STATISTICHE */}
      <div className="hero-stats border-y border-slate-200 bg-white px-6 py-8 text-black">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-6 md:flex-row md:gap-0">
          {/* BADGE */}
          <div className="flex w-full shrink-0 items-center justify-center gap-3 md:w-auto md:justify-start md:border-r md:border-slate-200 md:pr-8">
            <div className="relative shrink-0">
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="badgeGradCS"
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
                  fill="url(#badgeGradCS)"
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

            <div>
              <p
                className="text-xs uppercase tracking-widest"
                style={{
                  background: "linear-gradient(to right, #fc03b0, #047cf9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontWeight: 500,
                }}
              >
                Verified Agency
              </p>

              <p
                className="text-[11px] text-slate-500"
                style={{
                  fontFamily: "var(--font-lato), sans-serif",
                  fontWeight: 400,
                }}
              >
                Results Certified
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid w-full grid-cols-3 divide-x divide-slate-200 md:grid-cols-4 md:pl-8">
            {[
              {
                value: "+100",
                label: "Siti realizzati",
                hideOnMobile: false,
              },
              {
                value: "98%",
                label: "Clienti soddisfatti",
                hideOnMobile: false,
              },
              {
                value: "3x",
                label: "Lead in più in media",
                hideOnMobile: false,
              },
              {
                value: "60gg",
                label: "Primi risultati garantiti",
                hideOnMobile: true,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`px-4 text-center first:pl-0 last:pr-0 ${
                  stat.hideOnMobile ? "hidden md:block" : ""
                }`}
              >
                <p
                  className="bg-brand-gradient bg-clip-text text-3xl text-transparent"
                  style={{
                    fontFamily: "var(--font-archivo), sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {stat.value}
                </p>

                <p
                  className="mt-1 text-sm text-slate-500"
                  style={{
                    fontFamily: "var(--font-lato), sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}