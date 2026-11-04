"use client"

import { useEffect, useRef } from "react"
import { WhatsAppButton } from "./whatsapp"

/*
 * Hero cinematografica: la medusa che diventa il monogramma CN.
 * Il video (generato con Higgsfield) è esportato in fotogrammi webp e
 * disegnato su canvas in base allo scroll: avanti e indietro, senza scatti.
 *
 * - Desktop/orizzontale: fotogrammi 16:9 a tutto schermo.
 * - Mobile/verticale: fotogrammi ritagliati al centro, più leggeri.
 * - I fotogrammi si caricano a strati (prima pochi, poi tutti), così lo
 *   scroll funziona subito anche con rete lenta.
 * - Con "riduci movimento" niente scroll pinnato: resta l'immagine finale.
 */

const SETS = {
  desktop: { dir: "/immersive/hero-d/", count: 121, fps: 12 },
  mobile: { dir: "/immersive/hero-m/", count: 100, fps: 10 },
} as const

// prima dello scroll la medusa pulsa: loop avanti/indietro sui primi secondi del video
const IDLE_SECONDS = 2.6
const IDLE_SLOWDOWN = 1.35 // un po' più lento del video, più ipnotico
const IDLE_UNTIL = 0.01 // sotto questa soglia di scroll si è ancora "fermi"
// a fine scroll il CN resta vivo: loop sulle ultime battute del video
const END_FROM = 0.8 // da qui il video è finito
const END_SECONDS = 2.4

const BG = "#05040a"

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
// 0 → 1 tra a e b
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
// visibile tra inA..inB (entrata) e outA..outB (uscita)
const window4 = (p: number, inA: number, inB: number, outA: number, outB: number) =>
  Math.min(ramp(p, inA, inB), 1 - ramp(p, outA, outB))

const frameUrl = (dir: string, i: number) => `${dir}${String(i + 1).padStart(3, "0")}.webp`

export default function HeroSequence() {
  const section = useRef<HTMLElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const sec = section.current
    const cv = canvas.current
    if (!sec || !cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return

    const phases = Array.from(sec.querySelectorAll<HTMLElement>("[data-phase]"))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const first = phases[0]
    const final = phases[2]
    if (reduce) {
      phases.forEach((el, i) => {
        if (!el) return
        el.style.opacity = i === 2 ? "1" : "0"
      })
      if (final) final.style.pointerEvents = "auto"
      return
    }

    let set: (typeof SETS)[keyof typeof SETS] = SETS.desktop
    let frames: HTMLImageElement[] = []
    let loaded: boolean[] = []
    let current = -1
    let lastLift = -1
    let raf = 0
    let idleRaf = 0
    let idleStart = performance.now()
    let endStart = 0
    let inEnd = false
    // fotogramma da cui parte lo scroll: quello dove si trovava il loop
    let base = 0

    const idleFrame = (now: number) => {
      const n = Math.round(set.fps * IDLE_SECONDS)
      const period = ((n - 1) / set.fps) * 1000 * IDLE_SLOWDOWN
      const t = ((now - idleStart) / period) % 2
      const k = t < 1 ? t : 2 - t
      // ease in-out: rallenta ai capi del loop, nessun rimbalzo secco
      const e = 0.5 - Math.cos(k * Math.PI) / 2
      return Math.round(e * (n - 1))
    }

    // loop sulle ultime battute: parte dall'ultimo fotogramma, torna indietro e riparte
    const endFrame = (now: number) => {
      const n = Math.round(set.fps * END_SECONDS)
      const period = ((n - 1) / set.fps) * 1000 * IDLE_SLOWDOWN
      const t = ((now - endStart) / period) % 2
      const k = t < 1 ? t : 2 - t
      const e = 0.5 - Math.cos(k * Math.PI) / 2
      return set.count - 1 - Math.round(e * (n - 1))
    }

    // anima da sola quando si è fermi all'inizio o a fine scroll (hero ancora in vista)
    const idleTick = () => {
      const p = progress()
      const atEnd = p >= END_FROM && sec.getBoundingClientRect().bottom > 0
      if (p >= IDLE_UNTIL && !atEnd) {
        idleRaf = 0
        return
      }
      draw()
      idleRaf = requestAnimationFrame(idleTick)
    }

    const pickSet = () => (window.innerWidth / window.innerHeight < 0.9 ? SETS.mobile : SETS.desktop)

    const load = () => {
      frames = new Array(set.count)
      loaded = new Array(set.count).fill(false)
      // ordine a strati: 1° fotogramma, poi uno ogni 16, 8, 4, 2, 1
      const order: number[] = [0]
      for (const step of [16, 8, 4, 2, 1]) {
        for (let i = 0; i < set.count; i += step) if (!order.includes(i)) order.push(i)
      }
      if (!order.includes(set.count - 1)) order.push(set.count - 1)
      for (const i of order) {
        const img = new Image()
        img.decoding = "async"
        img.onload = () => {
          loaded[i] = true
          if (current === -1 || i === current) draw(true)
          else schedule()
        }
        img.src = frameUrl(set.dir, i)
        frames[i] = img
      }
    }

    // il fotogramma caricato più vicino a quello richiesto
    const nearest = (target: number) => {
      for (let d = 0; d < set.count; d++) {
        if (loaded[target - d]) return target - d
        if (loaded[target + d]) return target + d
      }
      return -1
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(cv.clientWidth * dpr)
      cv.height = Math.round(cv.clientHeight * dpr)
      draw(true)
    }

    const progress = () => {
      const r = sec.getBoundingClientRect()
      const travel = sec.offsetHeight - window.innerHeight
      return travel > 0 ? clamp(-r.top / travel) : 0
    }

    const draw = (force = false) => {
      const p = progress()

      let target: number
      if (p < IDLE_UNTIL) {
        // fermo: loop della medusa che pulsa
        target = idleFrame(performance.now())
        base = target
        if (!idleRaf) idleRaf = requestAnimationFrame(idleTick)
      } else if (p >= END_FROM) {
        // video finito: il CN continua a muoversi piano
        if (!inEnd) {
          inEnd = true
          endStart = performance.now()
        }
        target = endFrame(performance.now())
        if (!idleRaf) idleRaf = requestAnimationFrame(idleTick)
      } else {
        // il video scorre dal fotogramma del loop fino alla fine
        inEnd = false
        target = Math.round(base + ramp(p, IDLE_UNTIL, END_FROM) * (set.count - 1 - base))
      }
      const idx = nearest(target)
      // nella scena finale il CN sale e si rimpicciolisce, per lasciare spazio a titolo e CTA
      const lift = ramp(p, 0.76, 0.9)
      if (idx !== -1 && (force || idx !== current || lift !== lastLift)) {
        current = idx
        lastLift = lift
        const img = frames[idx]
        const cw = cv.width
        const ch = cv.height
        ctx.fillStyle = BG
        ctx.fillRect(0, 0, cw, ch)

        let w: number, h: number, x: number, y: number
        if (set === SETS.desktop) {
          const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * (1 - 0.3 * lift)
          w = img.naturalWidth * s
          h = img.naturalHeight * s
          x = (cw - w) / 2
          // la scena sta un po' più in alto: sotto c'è spazio per titolo e CTA
          y = (ch - h) / 2 - ch * (0.1 + 0.12 * lift)
        } else {
          // verticale: la scena occupa la parte alta, i testi stanno sotto
          const s =
            Math.min((cw * 1.08) / img.naturalWidth, (ch * 0.66) / img.naturalHeight) * (1 - 0.12 * lift)
          w = img.naturalWidth * s
          h = img.naturalHeight * s
          x = (cw - w) / 2
          y = ch * (0.34 - 0.06 * lift) - h / 2
        }
        ctx.drawImage(img, x, y, w, h)

        if (set === SETS.mobile) {
          // bordi sfumati nel colore di fondo: la scena non ha cornice
          const fade = h * 0.16
          const top = ctx.createLinearGradient(0, y, 0, y + fade)
          top.addColorStop(0, BG)
          top.addColorStop(1, "rgba(5,4,10,0)")
          ctx.fillStyle = top
          ctx.fillRect(0, y - 1, cw, fade)
          const bottom = ctx.createLinearGradient(0, y + h - fade, 0, y + h)
          bottom.addColorStop(0, "rgba(5,4,10,0)")
          bottom.addColorStop(1, BG)
          ctx.fillStyle = bottom
          ctx.fillRect(0, y + h - fade, cw, fade + 1)
        }
      }

      // testi: entrano ed escono in sequenza
      const op = [
        1 - ramp(p, 0.2, 0.3),
        window4(p, 0.36, 0.43, 0.62, 0.69),
        ramp(p, 0.78, 0.88),
      ]
      phases.forEach((el, i) => {
        if (!el) return
        el.style.opacity = op[i].toFixed(3)
        el.style.transform = `translate3d(0, ${((1 - op[i]) * 24).toFixed(1)}px, 0)`
      })
      // le CTA si cliccano solo quando il loro testo è visibile
      if (first) first.style.pointerEvents = op[0] > 0.6 ? "auto" : "none"
      if (final) final.style.pointerEvents = op[2] > 0.6 ? "auto" : "none"
      // "Scorri" sparisce appena si inizia a scorrere
      if (hint.current) hint.current.style.opacity = (1 - ramp(p, 0.01, 0.06)).toFixed(3)
    }

    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => draw())
    }

    const onResize = () => {
      const next = pickSet()
      if (next !== set) {
        set = next
        current = -1
        base = 0
        idleStart = performance.now()
        load()
      }
      resize()
    }

    set = pickSet()
    load()
    resize()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(idleRaf)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }

  return (
    <section
      ref={section}
      id="immersive-hero"
      data-medusa="hide"
      data-no-reveal
      className="relative h-[400svh] motion-reduce:h-auto"
      style={{ background: BG }}
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:relative motion-reduce:min-h-svh">
        <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full motion-reduce:hidden" />

        {/* con movimento ridotto: solo l'immagine finale */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-cover bg-center motion-reduce:block"
          style={{ backgroundImage: "url(/immersive/poster-end.webp)" }}
        />

        {/* leggibilità dei testi in basso */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#05040a] via-[#05040a]/70 to-transparent"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-[13svh] mx-auto max-w-6xl px-5 text-center md:bottom-[13svh] md:px-8 motion-reduce:relative motion-reduce:bottom-auto motion-reduce:pb-20 motion-reduce:pt-[58svh]">
          {/* 1 */}
          <div
            data-phase="0"
            className="absolute inset-x-5 bottom-0 will-change-transform md:inset-x-8 motion-reduce:hidden"
          >
            <p className="mb-4 [font-family:var(--font-archivo),sans-serif] font-semibold text-[10px] uppercase tracking-[0.3em] !text-white/60 md:mb-5 md:text-xs">
              Esperienze digitali immersive
            </p>
            <p className="text-[clamp(2.25rem,5.2vw,5.2rem)] leading-[1.02] tracking-[-0.035em] !text-white" style={archivo}>
              Tutti hanno un sito.
              <br />
              Quanti ce l&apos;hanno in{" "}
              <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">3D</em>?
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 !text-white/70 md:mt-6 md:text-lg">
              Siti ed e-commerce immersivi per brand che vogliono farsi ricordare.
            </p>
            <div className="mt-6 flex justify-center md:mt-8">
              <WhatsAppButton />
            </div>
          </div>

          {/* 2 */}
          <div data-phase="1" className="absolute inset-x-5 bottom-0 opacity-0 will-change-transform md:inset-x-8 motion-reduce:hidden">
            <p className="text-[clamp(2rem,5.4vw,4.75rem)] leading-[1.05] tracking-[-0.03em] !text-white" style={archivo}>
              Siti web ed e-commerce
              <br />
              che non si guardano.{" "}
              <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">Si vivono.</em>
            </p>
          </div>

          {/* 3: finale con la CTA */}
          <div
            data-phase="2"
            className="absolute inset-x-5 bottom-0 opacity-0 will-change-transform md:inset-x-8 motion-reduce:relative motion-reduce:inset-auto"
          >
            <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] !text-white" style={archivo}>
              Non un semplice sito&nbsp;web.{" "}
              <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">Un&apos;esperienza</em> che
              lascia il segno.
            </h1>
            <p className="mx-auto mt-5 hidden max-w-2xl text-lg leading-8 !text-white/70 md:block">
              Siti ed e-commerce in 3D, cinematografici e interattivi: il modo più diretto per far percepire il tuo
              brand come premium.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WhatsAppButton />
              <a href="#demo" className="inline-flex h-12 items-center gap-2 font-bold !text-white/85 hover:!text-white">
                Guarda le demo <i aria-hidden className="not-italic">↓</i>
              </a>
            </div>
          </div>
        </div>

        {/* invito a scorrere, sotto i testi */}
        <div
          ref={hint}
          aria-hidden
          className="pointer-events-none absolute bottom-[3svh] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 motion-reduce:hidden"
        >
          <p className="[font-family:var(--font-archivo),sans-serif] font-semibold text-[10px] uppercase tracking-[0.35em] !text-white/55">Scorri</p>
          <div className="h-8 w-px overflow-hidden bg-white/15 md:h-10">
            <div className="h-1/2 w-full animate-[immersive-hint_1.8s_ease-in-out_infinite] bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  )
}
