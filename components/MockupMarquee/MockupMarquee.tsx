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

  // trascinamento (dito o mouse): durante il drag l'animazione CSS si ferma e la fila
  // segue il puntatore; al rilascio l'animazione riparte dal punto raggiunto
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let dragging = false
    let startX = 0
    let startT = 0
    let current = 0
    let moved = false

    const currentX = () => new DOMMatrixReadOnly(getComputedStyle(track).transform).m41
    const wrap = (x: number) => {
      const half = track.scrollWidth / 2
      if (!half) return x
      let v = x % half
      if (v > 0) v -= half
      return v
    }

    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return
      dragging = true
      moved = false
      startX = e.clientX
      startT = currentX()
      current = startT
      track.style.animationName = "none"
      track.style.transform = `translate3d(${startT}px,0,0)`
      track.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 4) moved = true
      current = wrap(startT + dx)
      track.style.transform = `translate3d(${current}px,0,0)`
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId)
      const half = track.scrollWidth / 2
      const duration = parseFloat(track.style.animationDuration) || 60
      // posizione raggiunta → punto equivalente dell'animazione (ritardo negativo)
      const p = half ? -current / half : 0
      const progress = direction === "left" ? p : 1 - p
      track.style.transform = ""
      track.style.animationDelay = `${-progress * duration}s`
      track.style.animationName = direction === "left" ? "mockup-marquee-left" : "mockup-marquee-right"
    }
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    track.addEventListener("pointerdown", down)
    track.addEventListener("pointermove", move)
    track.addEventListener("pointerup", up)
    track.addEventListener("pointercancel", up)
    track.addEventListener("click", click, true)
    return () => {
      track.removeEventListener("pointerdown", down)
      track.removeEventListener("pointermove", move)
      track.removeEventListener("pointerup", up)
      track.removeEventListener("pointercancel", up)
      track.removeEventListener("click", click, true)
    }
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


  return (
    <div
      ref={rowRef}
      className="relative flex overflow-hidden w-full"
      style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.1s ease-out, transform 0.1s ease-out" }}
    >
      <div ref={trackRef} className="cursor-grab select-none active:cursor-grabbing" style={{ display: "flex", width: "max-content", alignItems: "flex-start", animationTimingFunction: "linear", animationIterationCount: "infinite", willChange: "transform", touchAction: "pan-y" }}>
        {[...items, ...items].map((item, i) => (
          <div
  key={i}
  aria-hidden={i >= items.length || undefined}
  className="shrink-0 px-2 md:px-3 w-[calc(62vw-12px)] md:w-[calc(25vw-12px)]"
>
            <Image
              src={urlFor(item.image).width(600).url()}
              alt={i >= items.length ? "" : item.alt || "Progetto realizzato"}
              width={600}
              height={0}
              sizes="(max-width: 768px) 62vw, 25vw"
              draggable={false}
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