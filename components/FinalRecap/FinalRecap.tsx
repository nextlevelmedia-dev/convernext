"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { urlFor } from "../../sanity/lib/image"

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
})

interface FinalRecapProps {
  eyebrow?: string
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  bulletPoints?: string[]
  ctaText?: string
  ctaHref?: string
  ctaSubText?: string
  mediaType?: "image" | "video" | "lottie"
  image?: { asset: { _ref: string } }
  videoWebm?: string
  videoMp4?: string
  lottieFile?: string
}

function MediaBlock({
  mediaType,
  image,
  videoWebm,
  videoMp4,
  lottieFile,
}: Partial<FinalRecapProps>) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    if (mediaType !== "lottie" || !lottieFile) return

    let cancelled = false

    fetch(`/lotties/${lottieFile}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setAnimationData(data)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [mediaType, lottieFile])

  if (mediaType === "video" && (videoWebm || videoMp4)) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full rounded-2xl object-cover"
      >
        {videoWebm && (
          <source
            src={videoWebm}
            type="video/webm"
          />
        )}

        {videoMp4 && (
          <source
            src={videoMp4}
            type="video/mp4"
          />
        )}
      </video>
    )
  }

  if (mediaType === "lottie" && lottieFile) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>
    )
  }

  if (mediaType === "image" && image) {
    return (
      <Image
        src={urlFor(image).width(800).height(600).url()}
        alt=""
        width={800}
        height={600}
        className="h-full w-full rounded-2xl object-cover"
      />
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-sm text-slate-400 dark:text-white/30">
        Media
      </p>
    </div>
  )
}

export default function FinalRecap({
  eyebrow,
  titleHighlight,
  titleNormal,
  subtitle,
  bulletPoints,
  ctaText,
  ctaHref = "/contatti",
  ctaSubText,
  mediaType,
  image,
  videoWebm,
  videoMp4,
  lottieFile,
}: FinalRecapProps) {
  if (!titleHighlight && !titleNormal) return null

  const linkHref = ctaHref ?? "/contatti"

  return (
    <section
      className="bg-[#f7f7f7] px-6 py-24 text-slate-950 transition-colors duration-300 dark:bg-black dark:text-white"
      style={{
        fontFamily: "var(--font-lato), sans-serif",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          <div className="flex w-full flex-col md:w-1/2">
            {eyebrow && (
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-white/45">
                {eyebrow}
              </p>
            )}

            {(titleHighlight || titleNormal) && (
              <h2
                className="mb-5 text-4xl leading-[1.2] tracking-tight text-slate-950 dark:text-white md:text-[42px]"
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
            )}

            {subtitle && (
              <p className="mb-6 text-base leading-7 text-slate-600 dark:text-white/65">
                {subtitle}
              </p>
            )}

            {bulletPoints && bulletPoints.length > 0 && (
              <ul className="mb-8 flex flex-col gap-3">
                {bulletPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, #fc03b0, #047cf9)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <span className="text-[15px] font-medium text-slate-700 dark:text-white/85">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {ctaText && (
              <div className="flex flex-col gap-3">
                <a
                  href={linkHref}
                  className="inline-flex self-start items-center justify-center rounded-full bg-brand-gradient px-10 py-4 font-bold !text-white shadow-xl"
                  style={{
                    textDecoration: "none",
                    boxShadow: "0 8px 32px rgba(252,3,176,0.25)",
                  }}
                >
                  {ctaText}
                </a>

                {ctaSubText && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/35">
                    {ctaSubText}
                  </p>
                )}
              </div>
            )}
          </div>

          <div
            className="w-full md:w-1/2"
            style={{
              minHeight: "380px",
            }}
          >
            <MediaBlock
              mediaType={mediaType}
              image={image}
              videoWebm={videoWebm}
              videoMp4={videoMp4}
              lottieFile={lottieFile}
            />
          </div>
        </div>
      </div>
    </section>
  )
}