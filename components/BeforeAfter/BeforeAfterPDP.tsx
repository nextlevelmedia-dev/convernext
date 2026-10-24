"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import Image from "next/image"
import { CARD } from "../About/SectionHeading"

type Case = {
  kind: string
  title: string
  before: string
  after: string
  changes: string[]
}

const CASES: Case[] = [
  {
    kind: "Ecommerce",
    title: "Pagina prodotto",
    before: "/before-after/pdp-before.webp",
    after: "/before-after/pdp-after-gallery.webp",
    changes: [
      "Foto grande e recensioni subito visibili",
      "Formati e bundle scelti con un tocco",
      "Spedizione, reso e pagamenti chiari prima del carrello",
    ],
  },
  {
    kind: "Lead generation",
    title: "Landing page",
    before: "/before-after/lp-before.webp",
    after: "/before-after/lp-after.webp",
    changes: [
      "Un messaggio chiaro al posto di “Benvenuti”",
      "Prenotazione diretta con giorni e orari",
      "Recensioni Google in evidenza",
    ],
  },
]

// percorso del cursore quando la card entra nello schermo: fa capire che si trascina
const HINT: [number, number][] = [
  [0, 50],
  [600, 74],
  [1300, 28],
  [1900, 50],
]

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

function CompareSlider({ item }: { item: Case }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const dragging = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          if (touched.current) return
          const t = now - start
          const i = HINT.findIndex(([at]) => at > t)
          if (i === -1) {
            setPos(50)
            return
          }
          const [t0, p0] = HINT[i - 1]
          const [t1, p1] = HINT[i]
          setPos(p0 + (p1 - p0) * ease((t - t0) / (t1 - t0)))
          frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  const moveTo = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    setPos(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    touched.current = true
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(e.clientX)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 20 : 5
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step))
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step))
    else if (e.key === "Home") setPos(0)
    else if (e.key === "End") setPos(100)
    else return
    touched.current = true
    e.preventDefault()
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative mx-auto aspect-[390/760] w-full max-w-[340px] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[2.4rem] border-[7px] border-slate-900 bg-slate-900 shadow-[0_40px_80px_-30px_rgb(15_23_42/0.55)] dark:border-[#1f2533] dark:shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]"
    >
      <Image
        src={item.before}
        alt={`${item.title} prima dell'ottimizzazione`}
        fill
        sizes="340px"
        draggable={false}
        className="object-cover object-top"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image
          src={item.after}
          alt={`${item.title} dopo l'ottimizzazione`}
          fill
          sizes="340px"
          draggable={false}
          className="object-cover object-top"
        />
      </div>

      {/* etichette */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur transition-opacity duration-200"
        style={{ opacity: pos > 18 ? 1 : 0 }}
      >
        Prima
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity duration-200"
        style={{ opacity: pos < 82 ? 1 : 0 }}
      >
        Dopo
      </div>

      {/* cursore */}
      <div className="pointer-events-none absolute inset-y-0 w-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgb(0_0_0/0.35)]" />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Confronta ${item.title.toLowerCase()} prima e dopo`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(100 - pos)}% versione ottimizzata`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-0 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_8px_24px_rgb(15_23_42/0.35)] outline-none ring-[#7c3aed] focus-visible:ring-4"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M7.5 5 3 10l4.5 5M12.5 5 17 10l-4.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function BeforeAfterPDP() {
  return (
    <section className="px-6 pb-24" aria-label="Prima e dopo l'ottimizzazione">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {CASES.map((item) => (
            <div key={item.title} className={`${CARD} flex flex-col p-6 md:p-8`}>
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3
                  className="text-xl text-slate-950 dark:text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <div className="rounded-full bg-[linear-gradient(135deg,rgb(252_3_176/0.10),rgb(4_124_249/0.10))] px-3 py-1 text-xs font-bold text-[#7c3aed] dark:text-[#a78bfa]">
                  {item.kind}
                </div>
              </div>

              <CompareSlider item={item} />

              <ul className="mt-8 flex flex-col gap-3">
                {item.changes.map((change) => (
                  <li key={change} className="flex items-start gap-3">
                    <div
                      aria-hidden
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-[15px] leading-6 text-slate-700 dark:text-white/80">{change}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
