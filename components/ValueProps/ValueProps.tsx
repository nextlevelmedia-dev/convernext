"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { urlFor } from "../../sanity/lib/image"

interface ValuePropItem {
  label?: string
  titleHighlight?: string
  titleNormal?: string
  highlightLast?: boolean
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

const ValuePropVisual = dynamic(() =>
  import("../ValuePropVisuals/ValuePropVisuals").then(
    (mod) => mod.ValuePropVisual
  )
)

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

/*
 * Senza il riquadro blu le grafiche più piccole sembrerebbero perse: le
 * ingrandiamo (zoom) finché il contenuto non riempie lo spazio del vecchio riquadro.
 * Misura una volta al mount e quando cambia la larghezza.
 */
function FitVisual({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current
    if (!host) return
    let raf = 0
    const fit = () => {
      const card = host.querySelector<HTMLElement>(".vp-visual-card")
      if (!card) return
      const content = [...card.children].find(
        (c): c is HTMLElement | SVGElement =>
          (c instanceof HTMLElement || c instanceof SVGElement) && c.tagName !== "STYLE" && getComputedStyle(c).position !== "absolute"
      )
      if (!content) return
      // SVG: il disegno spesso occupa solo una parte della tela, quindi si stringe
      // il viewBox attorno al contenuto reale (una volta sola) prima di ingrandire
      if (content instanceof SVGSVGElement && !content.dataset.fitted) {
        try {
          const b = content.getBBox()
          const vb = content.viewBox.baseVal
          if (b.width > 0 && b.height > 0 && vb && vb.width > 0) {
            const pad = Math.max(b.width, b.height) * 0.06
            const x = Math.max(vb.x, b.x - pad)
            const y = Math.max(vb.y, b.y - pad)
            const w = Math.min(vb.x + vb.width, b.x + b.width + pad) - x
            const h = Math.min(vb.y + vb.height, b.y + b.height + pad) - y
            if (w < vb.width * 0.92 || h < vb.height * 0.92) {
              content.setAttribute("viewBox", `${x} ${y} ${w} ${h}`)
            }
          }
        } catch {}
        content.dataset.fitted = "1"
      }
      content.style.zoom = "1"
      const cw = card.clientWidth
      const ch = card.clientHeight
      const r = content.getBoundingClientRect()
      if (!r.width || !r.height) return
      const z = Math.max(1, Math.min(1.8, (cw * 0.96) / r.width, (ch * 0.96) / r.height))
      content.style.zoom = z.toFixed(3)
    }
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(fit)
    }
    // la grafica arriva in modo lazy: si misura quando compare e quando cambia dimensione
    const mo = new MutationObserver(schedule)
    mo.observe(host, { childList: true, subtree: false })
    const ro = new ResizeObserver(schedule)
    ro.observe(host)
    schedule()
    const t = window.setTimeout(schedule, 600)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t)
      mo.disconnect()
      ro.disconnect()
    }
  }, [])
  return <div ref={ref}>{children}</div>
}

function MediaBlock({ item }: { item: ValuePropItem }) {
  if (item.mediaType === "component" && item.componentKey) {
    return (
      <LazyMount rootMargin="250px 0px">
        <FitVisual>
          <ValuePropVisual visualKey={item.componentKey} />
        </FitVisual>
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
      <div aria-hidden className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl">
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
      <p className="text-sm text-slate-500 dark:text-white/40">
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
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 dark:text-white/50"
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
            {item.highlightLast ? (
              <>
                {item.titleNormal}
                {item.titleHighlight && item.titleNormal && " "}
                {item.titleHighlight && (
                  <span className="bg-brand-gradient bg-clip-text text-transparent">{item.titleHighlight}</span>
                )}
              </>
            ) : (
              <>
                {item.titleHighlight && (
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    {item.titleHighlight}
                  </span>
                )}

                {item.titleHighlight && item.titleNormal && " "}

                {item.titleNormal}
              </>
            )}
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

export default function ValueProps({ items, bare = true }: ValuePropsProps & { bare?: boolean }) {
  if (!items?.length) return null

  return (
    <section
      className={`${bare ? "vp-bare " : ""}bg-transparent px-6 py-24 text-slate-950 dark:text-white`}
      style={{
        fontFamily: "var(--font-lato), sans-serif",
      }}
    >
      {/* bare (ora predefinito): grafiche senza il riquadro blu, a tutta larghezza.
          I pannelli interni prendono il blu del vecchio riquadro, così la grafica resta di quel colore. */}
      {bare && (
        <style>{`
          .vp-bare .vp-visual-card { background: none !important; border: 0 !important; box-shadow: none !important; border-radius: 0 !important; overflow: visible !important; }
          .dark .vp-bare .vp-visual-card {
            --vp-panel: #12203d;
            --vp-panel-soft: #0f1b35;
            --vp-panel-subtle: rgba(255,255,255,0.035);
            --vp-border: rgba(255,255,255,0.10);
            --vp-border-soft: rgba(255,255,255,0.07);
          }
          .vp-bare .vp-visual-card > div[style*="position: absolute"] { display: none; }
          .vp-bare .tn-wrap, .vp-bare .te-wrap { width: 100% !important; max-width: none !important; }
          @media (max-width: 640px) { .vp-bare .te-wrap { transform: none !important; } }
        `}</style>
      )}
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