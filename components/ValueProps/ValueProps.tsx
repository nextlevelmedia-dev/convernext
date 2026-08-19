"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { urlFor } from "../../sanity/lib/image"
import { ValuePropVisual } from "../ValuePropVisuals/ValuePropVisuals"

interface ValuePropItem {
  label?: string
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  mediaType?: "image" | "video" | "lottie" | "3d" | "component"
  image?: { asset: { _ref: string } }
  videoWebm?: string
  videoMp4?: string
  lottieFile?: string
  modelUrl?: string
  componentKey?: string
}

interface ValuePropsProps {
  items?: ValuePropItem[]
}

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
})

function LazyMount({
  children,
  rootMargin = "300px 0px",
}: {
  children: React.ReactNode
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shouldLoad) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [rootMargin, shouldLoad])

  return (
    <div ref={ref} className="h-full w-full">
      {shouldLoad ? children : null}
    </div>
  )
}

function LazyVideo({ item }: { item: ValuePropItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch {
        // Autoplay può essere bloccato dal browser
      }
    }

    playVideo()

    return () => {
      video.pause()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
    >
      {item.videoWebm && <source src={item.videoWebm} type="video/webm" />}
      {item.videoMp4 && <source src={item.videoMp4} type="video/mp4" />}
    </video>
  )
}

function LazyLottie({ file }: { file: string }) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`/lotties/${file}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [file])

  if (!animationData) return null

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  )
}

function MediaBlock({ item }: { item: ValuePropItem }) {
  if (item.mediaType === "component" && item.componentKey) {
    return (
      <LazyMount rootMargin="250px 0px">
        <ValuePropVisual visualKey={item.componentKey} />
      </LazyMount>
    )
  }

  if (item.mediaType === "video" && (item.videoWebm || item.videoMp4)) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-neutral-900">
        <LazyMount rootMargin="250px 0px">
          <LazyVideo item={item} />
        </LazyMount>
      </div>
    )
  }

  if (item.mediaType === "lottie" && item.lottieFile) {
    return (
      <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl">
        <LazyMount rootMargin="250px 0px">
          <LazyLottie file={item.lottieFile} />
        </LazyMount>
      </div>
    )
  }

  if (item.mediaType === "image" && item.image) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={urlFor(item.image).width(800).height(450).url()}
          alt={item.titleNormal || ""}
          width={800}
          height={450}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-slate-100 dark:bg-neutral-900">
      <p className="text-sm text-slate-400 dark:text-white/40">
        Media
      </p>
    </div>
  )
}

function ValuePropRow({
  item,
  index,
}: {
  item: ValuePropItem
  index: number
}) {
  const isReversed = index % 2 !== 0
  const link = item.ctaHref || "/contatti"

  return (
    <div
      className={`flex flex-col items-center gap-12 md:flex-row md:gap-20 ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* MEDIA */}
      <div className="w-full md:w-1/2">
        <MediaBlock item={item} />
      </div>

      {/* TEXT */}
      <div
        className="w-full md:w-1/2"
        style={{
          fontFamily: "var(--font-lato), sans-serif",
        }}
      >
        {item.label && (
          <p
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-white/50"
            style={{
              fontFamily: "var(--font-lato), sans-serif",
            }}
          >
            {item.label}
          </p>
        )}

        {(item.titleHighlight || item.titleNormal) && (
          <h3
            className="mb-4 text-3xl font-semibold leading-[1.2] tracking-tight text-slate-950 md:text-4xl dark:text-white"
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            {item.titleHighlight && (
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {item.titleHighlight}
              </span>
            )}

            {item.titleHighlight && item.titleNormal && " "}

            {item.titleNormal}
          </h3>
        )}

        {item.subtitle && (
          <p
            className="mb-8 text-lg leading-7 text-slate-600 dark:text-white/70"
            style={{
              fontFamily: "var(--font-lato), sans-serif",
              fontWeight: 400,
            }}
          >
            {item.subtitle}
          </p>
        )}

        {item.ctaText && (
          <a
            href={link}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-gradient px-8 py-3 text-sm font-bold !text-white shadow-xl"
            style={{
              fontFamily: "var(--font-lato), sans-serif",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(252,3,176,0.25)",
            }}
          >
            {item.ctaText}
          </a>
        )}
      </div>
    </div>
  )
}

export default function ValueProps({ items }: ValuePropsProps) {
  if (!items?.length) return null

  return (
    <section
      className="bg-[#f7f7f7] px-6 py-24 text-slate-950 transition-colors duration-300 dark:bg-black dark:text-white"
      style={{
        fontFamily: "var(--font-lato), sans-serif",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-24">
        {items.map((item, i) => (
          <ValuePropRow
            key={i}
            item={item}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}