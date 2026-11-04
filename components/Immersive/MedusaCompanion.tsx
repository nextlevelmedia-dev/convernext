"use client"

import { useEffect, useRef } from "react"

/*
 * La medusa che accompagna l'utente dopo la hero.
 * Ogni sezione dichiara dove vuole la medusa con data-medusa:
 *   "left" | "right" | "top-left" | "top-right" | "hide"
 * La medusa nuota fino a quel punto (transizione lunga e morbida) e intanto
 * fluttua su sé stessa. Il video ha il fondo nero: con mix-blend screen
 * (sul contenitore più esterno, così si fonde con la pagina) il nero sparisce.
 * Sta dietro ai contenuti (z negativo dentro la pagina "isolate"): nuota
 * dietro ai testi, non sopra.
 */

type Spot = "left" | "right" | "top-left" | "top-right" | "hide"

// posizione del centro della medusa, in frazioni del viewport
const DESKTOP: Record<Exclude<Spot, "hide">, [number, number]> = {
  left: [0.08, 0.5],
  right: [0.9, 0.46],
  "top-left": [0.1, 0.26],
  "top-right": [0.88, 0.24],
}
// su mobile resta ai margini alti, lontana dai testi
const MOBILE: Record<Exclude<Spot, "hide">, [number, number]> = {
  left: [0.1, 0.2],
  right: [0.88, 0.18],
  "top-left": [0.1, 0.16],
  "top-right": [0.88, 0.15],
}

export default function MedusaCompanion() {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return

    let spot: Spot = "hide"

    const place = () => {
      const mobile = window.innerWidth < 768
      if (spot === "hide") {
        el.style.opacity = "0"
        video.current?.pause()
        return
      }
      const [fx, fy] = (mobile ? MOBILE : DESKTOP)[spot]
      el.style.opacity = "1"
      el.style.transform = `translate3d(${fx * window.innerWidth}px, ${fy * window.innerHeight}px, 0) translate(-50%, -50%)`
      video.current?.play().catch(() => {})
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-medusa]"))
    // la sezione attiva è quella che attraversa la fascia centrale dello schermo
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const next = (e.target as HTMLElement).dataset.medusa as Spot
          if (next !== spot) {
            spot = next
            place()
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    sections.forEach((s) => io.observe(s))

    window.addEventListener("resize", place)
    return () => {
      io.disconnect()
      window.removeEventListener("resize", place)
    }
  }, [])

  return (
    <div
      ref={wrap}
      aria-hidden
      data-no-reveal
      className="pointer-events-none fixed left-0 top-0 -z-10 opacity-0 mix-blend-screen transition-[transform,opacity] duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity"
    >
      <div className="animate-[immersive-float_7s_ease-in-out_infinite] motion-reduce:animate-none">
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-auto w-[88px] [mask-image:radial-gradient(ellipse_closest-side,black_62%,transparent)] md:w-[170px]"
        >
          <source src="/immersive/medusa-loop.webm" type="video/webm" />
          <source src="/immersive/medusa-loop.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
