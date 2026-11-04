"use client"

import Image from "next/image"
import { useRef, useState } from "react"

/*
 * "Anatomia" delle hero: slider con le hero delle nostre demo e, su ognuna,
 * i 5 elementi che servono a vendere segnati da punti numerati.
 * Passando su un punto (o sulla voce della lista) si accendono entrambi.
 * Le posizioni dei punti sono in % dell'immagine di ogni slide.
 */

const POINTS = [
  {
    title: "Prova sociale",
    text: "Valutazioni e numeri reali subito in vista: chi arriva da un'ads si fida prima ancora di scorrere.",
  },
  {
    title: "Un titolo che parla al cliente",
    text: "Promette un beneficio e tocca un'emozione. Il sottotitolo lo rafforza con i fatti.",
  },
  {
    title: "Il prodotto, in 3D",
    text: "Un visual che fa desiderare il prodotto: 3D, luce e movimento lavorano per il messaggio, non contro.",
  },
  {
    title: "Una CTA che dice cosa succede",
    text: "Niente \"Scopri di più\": il pulsante dice esattamente cosa trovi dopo il clic.",
  },
  {
    title: "Rassicurazioni",
    text: "Autenticità, spedizione, resi e pagamenti sicuri accanto alla CTA: tolgono i dubbi quando si decide.",
  },
]

type Slide = { name: string; image: string; ratio: string; pins: [number, number][] }

// pins: [x%, y%] nello stesso ordine di POINTS
const SLIDES: Slide[] = [
  {
    name: "Aurelle",
    image: "/immersive/cro-aurelle.webp",
    ratio: "1600/1000",
    pins: [[29.2, 51], [44.8, 60.8], [65.5, 44.8], [12.5, 83.8], [44.5, 93]],
  },
  {
    name: "Pullroom",
    image: "/immersive/cro-pullroom.webp",
    ratio: "1600/1000",
    pins: [[34.5, 17.4], [40, 24.8], [70, 44.8], [11.5, 68.8], [40.5, 78.6]],
  },
  {
    name: "Orvek",
    image: "/immersive/cro-orvek.webp",
    ratio: "1600/1000",
    pins: [[21.5, 21.3], [40, 35.2], [69, 51.2], [9.8, 70.4], [40.5, 83.2]],
  },
  {
    name: "Iconic Football",
    image: "/immersive/cro-iconic.webp",
    ratio: "1600/968",
    pins: [[32.5, 19.3], [42.5, 28], [75, 46], [10, 71], [42.5, 83.3]],
  },
]

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

export default function ConversionAnatomy() {
  const [slide, setSlide] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const touch = useRef<number | null>(null)

  const go = (i: number) => setSlide((i + SLIDES.length) % SLIDES.length)

  // clic su un punto: porta alla sua spiegazione e la evidenzia
  const showPoint = (i: number) => {
    setActive(i)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.getElementById(`cro-point-${i}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })
  }
  const s = SLIDES[slide]

  return (
    <div className="mt-16 md:mt-20">
      {/* la hero con i punti */}
      <figure
        className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0d0b18] shadow-[0_40px_120px_-40px_rgb(124_58_237/0.5)]"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return
          const dx = e.changedTouches[0].clientX - touch.current
          if (Math.abs(dx) > 40) go(slide + (dx < 0 ? 1 : -1))
          touch.current = null
        }}
      >
        <div className="relative" style={{ aspectRatio: s.ratio }}>
          {SLIDES.map((sl, i) => (
            <Image
              key={sl.name}
              src={sl.image}
              alt={`La hero della demo ${sl.name} con gli elementi di conversione evidenziati`}
              fill
              sizes="(min-width: 1280px) 1200px, 92vw"
              className={`object-contain transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}
              aria-hidden={i !== slide}
            />
          ))}
          {/* velatura: i punti risaltano, l'immagine resta leggibile */}
          <div aria-hidden className="absolute inset-0 bg-[#05040a]/25" />

          {s.pins.map(([x, y], i) => (
            <button
              key={`${s.name}-${i}`}
              type="button"
              aria-label={`${i + 1}. ${POINTS[i].title}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => showPoint(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <i
                aria-hidden
                className={`absolute inset-0 rounded-full bg-brand-gradient not-italic motion-safe:animate-ping ${
                  active === i ? "opacity-60" : "opacity-30"
                }`}
              />
              <b
                className={`relative grid size-6 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold !text-white shadow-[0_6px_20px_-4px_rgb(168_60_214/0.9)] ring-2 transition-transform duration-300 md:size-8 md:text-sm ${
                  active === i ? "scale-125 ring-white" : "ring-white/40"
                }`}
              >
                {i + 1}
              </b>
            </button>
          ))}
        </div>
      </figure>

      {/* navigazione: frecce, nome della demo e contatore */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm !text-white/55">
          Demo <b className="font-bold !text-white">{s.name}</b>
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Hero precedente"
            onClick={() => go(slide - 1)}
            className="grid size-10 place-items-center rounded-full border border-white/20 !text-white transition-colors hover:border-white hover:bg-white hover:!text-[#05040a]"
          >
            ←
          </button>
          <p aria-live="polite" className="min-w-10 text-center text-sm tabular-nums !text-white/55">
            {slide + 1} / {SLIDES.length}
          </p>
          <button
            type="button"
            aria-label="Hero successiva"
            onClick={() => go(slide + 1)}
            className="grid size-10 place-items-center rounded-full border border-white/20 !text-white transition-colors hover:border-white hover:bg-white hover:!text-[#05040a]"
          >
            →
          </button>
        </div>
      </div>

      {/* cosa fa ogni punto */}
      <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-5 lg:gap-x-6">
        {POINTS.map((p, i) => (
          <li
            key={p.title}
            id={`cro-point-${i}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={`flex gap-4 border-t pt-5 transition-colors duration-300 lg:flex-col lg:gap-3 ${
              active === i ? "border-white/60" : "border-white/10"
            }`}
          >
            <b className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.06] text-sm font-bold !text-white">
              {i + 1}
            </b>
            <div>
              <h3 className="text-xl leading-tight tracking-[-0.01em] !text-white" style={archivo}>
                {p.title}
              </h3>
              <p className="mt-2 text-base leading-7 !text-white/60">{p.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
