"use client"

import { useEffect, useRef } from "react"

/*
 * Testo che si "accende" parola per parola mentre si scorre, come una
 * voce fuori campo. Sezione pinnata: la frase resta ferma al centro.
 * Le parole sono <em> e non <span>: in dark mode il CSS globale forza
 * il bianco sugli span e cancellerebbe l'effetto.
 */

const TEXT =
  "Il sito è la prima cosa che un cliente tocca del tuo brand. Se è uguale a quello di tutti, anche tu sembri uguale a tutti. Un'esperienza immersiva fa l'opposto: si ricorda, si percepisce premium, ti distingue."
// l'unica parola in gradient: il cuore del posizionamento
const ACCENT = "premium,"

export default function Manifesto() {
  const section = useRef<HTMLElement>(null)
  const words = useRef<HTMLElement[]>([])

  useEffect(() => {
    const sec = section.current
    if (!sec) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.current.forEach((w) => (w.style.opacity = "1"))
      return
    }

    let raf = 0
    const update = () => {
      const r = sec.getBoundingClientRect()
      const travel = sec.offsetHeight - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1
      const n = words.current.length
      // tutte accese all'85% dello scroll della sezione
      const lit = (p / 0.85) * n
      words.current.forEach((w, i) => {
        const o = Math.min(1, Math.max(0, lit - i))
        w.style.opacity = (0.14 + o * 0.86).toFixed(3)
      })
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  let k = 0
  const word = (w: string, accent = false) => {
    const i = k++
    return (
      <em
        key={i}
        ref={(el) => {
          if (el) words.current[i] = el
        }}
        className={`not-italic opacity-[0.14] transition-opacity duration-150 motion-reduce:opacity-100 ${
          accent ? "bg-brand-gradient bg-clip-text text-transparent" : ""
        }`}
      >
        {w}{" "}
      </em>
    )
  }

  return (
    <section ref={section} data-medusa="right" data-no-reveal className="relative h-[260svh] motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh items-center motion-reduce:relative motion-reduce:py-32">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <p className="mb-8 [font-family:var(--font-archivo),sans-serif] font-semibold text-[11px] uppercase tracking-[0.3em] !text-white/50 md:text-xs">
            Perché in 3D
          </p>
          <p
            className="text-[clamp(1.9rem,4.6vw,4.2rem)] leading-[1.12] tracking-[-0.025em] !text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
          >
            {TEXT.split(" ").map((w) => word(w, w === ACCENT))}
          </p>
        </div>
      </div>
    </section>
  )
}
