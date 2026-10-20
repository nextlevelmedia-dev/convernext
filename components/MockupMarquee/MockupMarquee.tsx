"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"

interface MockupItem {
  image: { asset: { _ref: string } }
  alt: string
}

interface MockupMarqueeProps {
  rowOne?: MockupItem[] | null
  rowTwo?: MockupItem[] | null
}

function MarqueeRow({
  items,
  direction,
  rowRef,
}: {
  items: MockupItem[]
  direction: "left" | "right"
  rowRef: React.RefObject<HTMLDivElement | null>
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  // Animazione CSS (compositor) invece di requestAnimationFrame:
  // stessa velocità di prima (0.4px/frame mobile, 0.7px/frame desktop a 60fps)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const update = () => {
      const isMobile = window.innerWidth < 768
      const pxPerSecond = (isMobile ? 0.4 : 0.7) * 60
      const half = track.scrollWidth / 2
      if (!half) return
      track.style.animationDuration = `${half / pxPerSecond}s`
      track.style.animationName = direction === "left" ? "mockup-marquee-left" : "mockup-marquee-right"
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => observer.disconnect()
  }, [direction])

  useEffect(() => {
    const el = rowRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const triggerPoint = windowHeight * 0.8
const startPoint = windowHeight * 1.1
      const progress = Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - triggerPoint)))

      const opacity = progress
      const translateY = 10 + (1 - progress) * 10

      el.style.opacity = `${opacity}`
      el.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [rowRef])

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const itemWidth = isMobile ? "calc(50vw - 12px)" : "calc(25vw - 12px)"

  return (
    <div
      ref={rowRef}
      className="relative flex overflow-hidden w-full"
      style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.1s ease-out, transform 0.1s ease-out" }}
    >
      <div ref={trackRef} style={{ display: "flex", width: "max-content", alignItems: "flex-start", animationTimingFunction: "linear", animationIterationCount: "infinite", willChange: "transform" }}>
        {[...items, ...items].map((item, i) => (
          <div
  key={i}
  aria-hidden={i >= items.length || undefined}
  className="shrink-0 px-2 md:px-3 w-[calc(50vw-12px)] md:w-[calc(25vw-12px)]"
>
            <Image
              src={urlFor(item.image).width(600).url()}
              alt={i >= items.length ? "" : item.alt || "Progetto realizzato"}
              width={600}
              height={0}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="w-full h-auto rounded-2xl block"
              style={{ height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MockupMarquee({ rowOne, rowTwo }: MockupMarqueeProps) {
  const r1 = rowOne ?? []
  const r2 = rowTwo ?? []
  const rowOneRef = useRef<HTMLDivElement>(null)
  const rowTwoRef = useRef<HTMLDivElement>(null)

  if (!r1.length && !r2.length) return null

  return (
    <section className="py-12 overflow-hidden">
      <div className="flex flex-col gap-4">
        {r1.length > 0 && <MarqueeRow items={r1} direction="left" rowRef={rowOneRef} />}
        {r2.length > 0 && <MarqueeRow items={r2} direction="right" rowRef={rowTwoRef} />}
      </div>
    </section>
  )
}