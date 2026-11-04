"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { demos } from "./demos"
import { WhatsAppButton } from "./whatsapp"
import { createWaveRenderer } from "./waveGl"

/*
 * Le demo in una sezione sticky: titolo e filtri restano fermi, la griglia
 * scorre dentro una "finestra" e ai bordi le card si piegano all'indietro,
 * come pagine che girano su un rullo (entrano dal basso, escono dall'alto).
 * Le anteprime sono disegnate in WebGL (waveGl.ts): ondeggiano con la
 * velocità dello scroll e respirano al passaggio del mouse.
 * Desktop 2 colonne, mobile 1. Con "riduci movimento" niente pieghe né onde.
 */

const FILTERS = [
  { id: "tutti", label: "Tutti" },
  { id: "Sito web", label: "Siti web" },
  { id: "E-commerce", label: "E-commerce" },
] as const

type FilterId = (typeof FILTERS)[number]["id"]

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

// i filtri servono solo se le demo sono di almeno due tipi diversi
const showFilters = new Set(demos.map((d) => d.kind)).size > 1

export default function DemoGrid() {
  const [filter, setFilter] = useState<FilterId>("tutti")
  const [height, setHeight] = useState<number>()
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLUListElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  const visible = demos.filter((d) => filter === "tutti" || d.kind === filter)

  useEffect(() => {
    const sec = section.current
    const st = stage.current
    const gr = grid.current
    const cv = canvas.current
    if (!sec || !st || !gr || !cv) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let travel = 0
    let cards: { el: HTMLElement; img: HTMLElement; top: number; left: number; h: number; iw: number; ih: number }[] = []
    let raf = 0
    let running = false
    let smooth = -1
    let alive = true
    let gl: Awaited<ReturnType<typeof createWaveRenderer>> | null = null

    // centro della zona visibile (sotto il titolo) e sua metà altezza
    const zone = () => ({ center: st.clientHeight * 0.6, half: st.clientHeight * 0.42 })

    const frame = (time: number) => {
      const r = sec.getBoundingClientRect()
      const span = sec.offsetHeight - window.innerHeight
      const p = span > 0 ? clamp(-r.top / span) : 0
      const target = p * travel
      // inerzia: la griglia insegue lo scroll, e la differenza diventa l'onda
      if (smooth < 0 || reduce) smooth = target
      else smooth += (target - smooth) * 0.12
      const prev = gr.dataset.offset ? Number(gr.dataset.offset) : smooth
      const vel = smooth - prev
      gr.dataset.offset = String(smooth)
      gr.style.transform = `translate3d(0, ${(-smooth).toFixed(1)}px, 0)`

      const { center, half } = zone()
      const alpha: number[] = []
      for (const c of cards) {
        // -1 in alto, 1 in basso rispetto alla zona dove le card sono piatte.
        // Solo in alto (t < 0) la card si piega uscendo: dal basso entra dritta.
        const t = (c.top + c.h / 2 - smooth - center) / half
        const edge = clamp((-t - 0.3) / 0.85)
        const o = 1 - Math.pow(edge, 3) * 0.85
        alpha.push(o)
        if (reduce) continue
        const bend = Math.pow(edge, 1.6)
        const angle = bend * 78
        c.el.style.transform = `translate3d(0, ${(bend * c.h * 0.18).toFixed(1)}px, ${(-bend * 220).toFixed(1)}px) rotateX(${angle.toFixed(2)}deg)`
        c.el.style.opacity = o.toFixed(3)
      }

      if (gl) {
        const rects = cards.map((c) => ({ x: c.left, y: c.top - smooth, w: c.iw, h: c.ih }))
        gl.render(rects, vel, center, half, time / 1000, alpha)
      }

      // continua finché c'è movimento (inerzia, hover) e la sezione è in vista
      if (running) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const measure = () => {
      cards = Array.from(gr.querySelectorAll<HTMLElement>("[data-card]")).map((el) => {
        const img = el.querySelector<HTMLElement>("[data-card-img]")!
        // le posizioni servono rispetto alla finestra: se la griglia (centrata) fa da
        // riferimento, si aggiunge il suo scostamento
        const viaGrid = el.offsetParent === gr
        const left = el.offsetLeft + (viaGrid ? gr.offsetLeft : 0)
        const top = el.offsetTop + (viaGrid ? gr.offsetTop : 0)
        return { el, img, top, left, h: el.offsetHeight, iw: img.offsetWidth, ih: img.offsetHeight }
      })
      // la griglia si ferma quando il blocco finale con la CTA è al centro della zona
      // visibile: così anche le ultime demo salgono fino in alto e fanno l'onda
      const end = gr.querySelector<HTMLElement>("[data-end]")
      const { center } = zone()
      travel = end
        ? Math.max(0, end.offsetTop + (end.offsetParent === gr ? gr.offsetTop : 0) + end.offsetHeight / 2 - center)
        : Math.max(0, gr.scrollHeight - st.clientHeight)
      setHeight(window.innerHeight + travel * 1.2)
      gl?.setSize(st.clientWidth, st.clientHeight)
      requestAnimationFrame(frame)
    }

    // l'osservatore misura subito e a ogni cambio (filtro, resize, immagini)
    const ro = new ResizeObserver(measure)
    ro.observe(gr)
    ro.observe(st)

    // anima solo quando la sezione è sullo schermo
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
    io.observe(sec)

    // WebGL: le anteprime diventano teli che ondeggiano (non con "riduci movimento")
    if (!reduce) {
      const items = Array.from(gr.querySelectorAll<HTMLElement>("[data-card]")).map((el, i) => ({
        url: visible[i].image,
        el: el.querySelector<HTMLElement>("[data-card-img]")!,
        hoverEl: el,
      }))
      createWaveRenderer(cv, items)
        .then((r) => {
          if (!alive) return r.dispose()
          gl = r
          gl.setSize(st.clientWidth, st.clientHeight)
        })
        .catch(() => {
          // niente WebGL: restano le immagini HTML
        })
    }

    return () => {
      alive = false
      stop()
      ro.disconnect()
      io.disconnect()
      gl?.dispose()
      gl = null
    }
    // visible deriva da filter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const choose = (id: FilterId) => {
    setFilter(id)
    // torna all'inizio della sezione, così si vedono subito i risultati
    const sec = section.current
    if (sec && sec.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY })
    }
  }

  return (
    <section
      ref={section}
      id="demo"
      data-medusa="top-left"
      data-no-reveal
      className="relative"
      style={{ height: height ? `${height}px` : "300svh" }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pb-16 pt-24 text-center md:px-8 md:pt-28 xl:px-10">
          <h2
            className="text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] tracking-[-0.035em] !text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
          >
            Le nostre <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">esperienze</em>
          </h2>

          {showFilters && (
          <div role="group" aria-label="Filtra le demo" className="pointer-events-auto mt-5 inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur md:mt-6">
            {FILTERS.map((f) => {
              const count = f.id === "tutti" ? demos.length : demos.filter((d) => d.kind === f.id).length
              if (!count) return null
              const active = f.id === filter
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(f.id)}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold transition-colors md:px-4 ${
                    active ? "bg-white !text-[#05040a]" : "!text-white/65 hover:!text-white"
                  }`}
                >
                  {f.label} <sup className="text-[10px] font-normal opacity-60">{count}</sup>
                </button>
              )
            })}
          </div>
          )}
        </div>

        {/* finestra in cui scorre la griglia */}
        <div
          ref={stage}
          className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_18%,black_36%,black)] [perspective:1100px]"
        >
          <ul
            ref={grid}
            aria-label="Demo realizzate"
            className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-10 px-5 pb-[20svh] pt-[36svh] will-change-transform md:grid-cols-2 md:gap-y-14 md:px-8 xl:px-10"
          >
            {visible.map((d) => (
              <li key={d.slug} data-card className="origin-center will-change-transform [transform-style:preserve-3d]">
                <a
                  href={d.url || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div data-card-img className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-white/10 bg-[#0d0b18] transition-opacity duration-500">
                    <Image
                      src={d.image}
                      alt={`Anteprima della demo ${d.name}`}
                      fill
                      sizes="(min-width: 768px) 620px, 90vw"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-4 border-b border-white/15 pb-4">
                    <div className="min-w-0">
                      <p className="text-xl leading-tight !text-white md:text-2xl" style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}>
                        {d.name}
                      </p>
                      <p className="mt-1 truncate text-sm !text-white/55 md:text-base">
                        {d.kind} · {d.description}
                      </p>
                    </div>
                    <i aria-hidden className="shrink-0 pb-1 text-xl not-italic !text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                      ↘
                    </i>
                  </div>
                  <i className="sr-only not-italic">(si apre in una nuova scheda)</i>
                </a>
              </li>
            ))}

            {/* chiusura della griglia: arriva dal basso mentre le ultime demo fanno l'onda in alto */}
            <li data-end className="flex flex-col items-center py-10 text-center md:col-span-2 md:py-16">
              <p
                className="max-w-2xl text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.03em] !text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
              >
                Il prossimo potrebbe essere{" "}
                <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">il&nbsp;tuo brand.</em>
              </p>
              <WhatsAppButton label="Voglio un sito così" className="mt-8" />
            </li>
          </ul>
          {/* le anteprime in WebGL, sopra le immagini HTML (che restano per layout e accessibilità) */}
          <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 size-full" />
        </div>

      </div>
    </section>
  )
}
