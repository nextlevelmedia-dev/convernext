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

const ramp = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)))

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
    let merging = false

    const place = () => {
      if (merging) return
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

    // nella CTA finale la medusa va al posto del CN e lì si ritrasforma (OceanBackdrop)
    // punto di partenza della nuotata finale: dov'era la medusa prima della sezione
    let from: [number, number] | null = null
    const onMerge = (e: Event) => {
      const { x, y: yReal, cap, w, p } = (e as CustomEvent<{ x: number; y: number; cap: number; w: number; p: number }>).detail
      // tiene la medusa in vista; poco prima del passaggio la porta esattamente sulla grande
      const yHeld = Math.min(yReal, cap)
      // (soglie allineate a OceanBackdrop: passaggio 0.62–0.68, CN completo a metà schermo)
      const y = yHeld + (yReal - yHeld) * ramp(p, 0.5, 0.62)
      if (p <= 0.02) {
        if (merging) {
          merging = false
          from = null
          el.querySelector<HTMLElement>("[data-float]")?.style.removeProperty("animation-play-state")
          el.style.transitionDuration = ""
          place()
        }
        return
      }
      const mobile = window.innerWidth < 768
      if (!merging) {
        merging = true
        el.querySelector<HTMLElement>("[data-float]")?.style.setProperty("animation-play-state", "paused")
        // parte da dove si trova davvero in questo istante (anche a metà di una nuotata),
        // così non c'è nessuno scatto
        const b = el.getBoundingClientRect()
        from = [b.left + b.width / 2, b.top + b.height / 2]
      }
      // movimento guidato dallo scroll, senza transizione CSS: arriva esattamente sulla medusa grande
      el.style.transitionDuration = "0ms"
      // discesa lenta e morbida (accelera e frena), lungo quasi tutta l'entrata della sezione
      const t0 = ramp(p, 0.03, 0.62)
      const t = t0 < 0.5 ? 4 * t0 * t0 * t0 : 1 - Math.pow(-2 * t0 + 2, 3) / 2
      const natural = mobile ? 88 : 170
      const [ax, ay] = from!
      const px = ax + (x - ax) * t
      const py = ay + (y - ay) * t
      const scale = 1 + (w / natural - 1) * t
      el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
      el.style.opacity = (1 - ramp(p, 0.62, 0.68)).toFixed(3)
      // per combaciare col primo fotogramma della trasformazione, la medusa compagna
      // si porta all'istante 0 del suo loop (che è lo stesso istante 0 del filmato)
      const vid = video.current
      if (vid) {
        if (p >= 0.48) {
          if (!vid.paused) vid.pause()
          if (vid.currentTime > 0.04) vid.currentTime = 0
        } else if (vid.paused) {
          vid.play().catch(() => {})
        }
      }
    }

    window.addEventListener("resize", place)
    window.addEventListener("medusa:merge", onMerge)
    return () => {
      io.disconnect()
      window.removeEventListener("resize", place)
      window.removeEventListener("medusa:merge", onMerge)
    }
  }, [])

  return (
    <div
      ref={wrap}
      aria-hidden
      data-no-reveal
      className="pointer-events-none fixed left-0 top-0 -z-10 opacity-0 mix-blend-screen transition-[transform,opacity] duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity"
    >
      <div data-float className="animate-[immersive-float_7s_ease-in-out_infinite] motion-reduce:animate-none">
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-auto w-[88px] [mask-image:linear-gradient(to_bottom,transparent_6%,black_16.5%),radial-gradient(ellipse_50%_50%_at_50%_42%,black_40%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] md:w-[170px]"
        >
          <source src="/immersive/medusa-loop.webm" type="video/webm" />
          <source src="/immersive/medusa-loop.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
