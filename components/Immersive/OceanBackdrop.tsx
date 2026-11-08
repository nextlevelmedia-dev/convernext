"use client"

import { useEffect, useRef } from "react"

/*
 * Fondale della CTA finale: il CN "vive" sott'acqua.
 * - Video in loop degli ultimi secondi della medusa (CN formato, tentacoli che ondeggiano)
 * - Raggi di luce che scendono dalla superficie e oscillano piano
 * - Poche particelle in sospensione che salgono lente (marine snow)
 * - Entrando nella sezione (senza pin: segue lo scroll normale) la medusa che ci ha
 *   accompagnato arriva al centro e si ritrasforma nel CN: sono gli stessi fotogrammi
 *   della hero, disegnati su canvas in base a quanto la sezione è entrata nello schermo.
 *   Finita la trasformazione parte il loop del CN.
 * Si anima solo quando la sezione è in vista. Con "riduci movimento" resta l'immagine fissa.
 */

const SETS = {
  desktop: { dir: "/immersive/hero-d/", count: 121 },
  mobile: { dir: "/immersive/hero-m/", count: 100 },
} as const
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
const frameUrl = (dir: string, i: number) => `${dir}${String(i + 1).padStart(3, "0")}.webp`

const RAYS = [
  { left: "41%", width: "2.2%", rot: -11, dur: 11, delay: 0, op: 0.35 },
  { left: "47%", width: "3.4%", rot: -4, dur: 14, delay: -4, op: 0.42 },
  { left: "52%", width: "1.8%", rot: 3, dur: 9, delay: -2, op: 0.3 },
  { left: "57%", width: "2.8%", rot: 9, dur: 13, delay: -7, op: 0.28 },
  { left: "35%", width: "1.6%", rot: -17, dur: 16, delay: -9, op: 0.2 },
  { left: "63%", width: "1.5%", rot: 15, dur: 12, delay: -5, op: 0.18 },
]

export default function OceanBackdrop() {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const morph = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = root.current
    const cv = canvas.current
    const mc = morph.current
    if (!el || !cv || !mc) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // video giusto per il formato (desktop 16:9, mobile ritagliato), webm se supportato
    const mq = window.matchMedia("(max-width: 767px)")
    const v = video.current
    const pickVideo = () => {
      if (!v) return
      const suffix = mq.matches ? "-m" : ""
      const ext = v.canPlayType('video/webm; codecs="vp9"') ? "webm" : "mp4"
      v.poster = `/immersive/cn-loop-poster${suffix}.webp`
      v.src = `/immersive/cn-loop${suffix}.${ext}`
      if (running) v.play().catch(() => {})
    }
    mq.addEventListener("change", pickVideo)

    // --- trasformazione medusa → CN, guidata dallo scroll ---
    const mctx = mc.getContext("2d")
    let set: (typeof SETS)[keyof typeof SETS] = mq.matches ? SETS.mobile : SETS.desktop
    let frames: HTMLImageElement[] = []
    let loaded: boolean[] = []
    let framesRequested = false
    let lastIdx = -1

    const loadFrames = () => {
      framesRequested = true
      frames = new Array(set.count)
      loaded = new Array(set.count).fill(false)
      const order: number[] = [0, set.count - 1]
      for (const step of [16, 8, 4, 2, 1]) {
        for (let i = 0; i < set.count; i += step) if (!order.includes(i)) order.push(i)
      }
      for (const i of order) {
        const img = new Image()
        img.decoding = "async"
        img.onload = () => {
          loaded[i] = true
          lastIdx = -1
          onScroll()
        }
        img.src = frameUrl(set.dir, i)
        frames[i] = img
      }
    }
    const nearest = (t: number) => {
      for (let d = 0; d < set.count; d++) {
        if (loaded[t - d]) return t - d
        if (loaded[t + d]) return t + d
      }
      return -1
    }

    const drawMorph = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // carica i fotogrammi quando la sezione si avvicina
      if (!framesRequested && r.top < vh * 2.5) loadFrames()

      // la medusa compagna nuota al centro, poi lascia il posto a quella grande
      // dove si trova la medusa del primo fotogramma, così la compagna ci si sovrappone
      // esattamente (il suo video è un ritaglio 640x900 dello stesso filmato 1912x1080)
      const mob = mq.matches
      const srcW = mob ? 1100 : 1912
      const cw0 = mc.clientWidth
      const ch0 = mc.clientHeight
      const fs = Math.max(cw0 / srcW, ch0 / 1080)
      const canvasTop = r.top + (mc.offsetTop || 0)

      // avanzamento legato a dove si trova il CN sullo schermo (non alla sezione):
      // 0 = centro del CN quasi uno schermo sotto il bordo · 1 = centro del CN poco sotto
      // metà schermo. Così il CN è già formato quando arriva al centro, su desktop e mobile.
      const cnCenter = canvasTop + ch0 / 2
      const p = clamp(1 - (cnCenter - vh * 0.62) / vh, 0, 1.4)
      window.dispatchEvent(
        new CustomEvent("medusa:merge", {
          detail: {
            x: r.left + cw0 / 2,
            y: canvasTop + ch0 / 2 + (580 - 540) * fs,
            // finché la medusa grande è sotto il bordo, la compagna aspetta in vista qui
            cap: vh * 0.72,
            w: 640 * fs,
            p,
          },
        })
      )

      // passaggio di consegne: la compagna sfuma mentre appare il primo fotogramma
      // (quando la medusa grande è ben dentro lo schermo)
      const show = ramp(p, 0.62, 0.68)
      const done = p >= 1
      // cambio canvas → loop video senza buchi: prima compare il video (sotto),
      // e solo quando è del tutto visibile il canvas sopra sfuma
      if (done) {
        if (v) {
          if (v.paused) v.play().catch(() => {})
          v.style.opacity = "1"
        }
        mc.style.transitionDelay = "700ms"
        mc.style.opacity = "0"
        return
      }
      mc.style.transitionDelay = "0ms"
      mc.style.opacity = show.toFixed(3)
      if (v) v.style.opacity = "0"
      if (!mctx) return

      // la trasformazione avviene mentre il CN sale verso il centro dello schermo
      const idx = nearest(Math.round(ramp(p, 0.68, 0.98) * (set.count - 1)))
      if (idx === -1 || idx === lastIdx) return
      lastIdx = idx
      const img = frames[idx]
      const cw = mc.width
      const ch = mc.height
      mctx.clearRect(0, 0, cw, ch)
      const sc = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * sc
      const h = img.naturalHeight * sc
      mctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
    }

    let scrollRaf = 0
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf)
      scrollRaf = requestAnimationFrame(drawMorph)
    }
    const sizeMorph = () => {
      mc.width = Math.round(mc.clientWidth * dpr)
      mc.height = Math.round(mc.clientHeight * dpr)
      const next = mq.matches ? SETS.mobile : SETS.desktop
      if (next !== set) {
        set = next
        framesRequested = false
      }
      lastIdx = -1
      onScroll()
    }

    // particelle in sospensione
    const ctx = cv.getContext("2d")
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    type P = { x: number; y: number; r: number; a: number; vy: number; ph: number }
    let parts: P[] = []
    const resize = () => {
      cv.width = cv.clientWidth * dpr
      cv.height = cv.clientHeight * dpr
      const n = Math.round((cv.clientWidth * cv.clientHeight) / 26000)
      parts = Array.from({ length: Math.min(70, n) }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: (0.5 + Math.random() * 1.4) * dpr,
        a: 0.12 + Math.random() * 0.4,
        vy: (0.08 + Math.random() * 0.25) * dpr,
        ph: Math.random() * Math.PI * 2,
      }))
    }

    let raf = 0
    let running = false
    const tick = (t: number) => {
      if (ctx) {
        ctx.clearRect(0, 0, cv.width, cv.height)
        for (const p of parts) {
          p.y -= p.vy
          if (p.y < -10) {
            p.y = cv.height + 10
            p.x = Math.random() * cv.width
          }
          const x = p.x + Math.sin(t / 2400 + p.ph) * 6 * dpr
          ctx.beginPath()
          ctx.arc(x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(190, 210, 255, ${p.a})`
          ctx.fill()
        }
      }
      if (running) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true
        raf = requestAnimationFrame(tick)
        video.current?.play().catch(() => {})
      } else if (!e.isIntersecting) {
        running = false
        cancelAnimationFrame(raf)
        video.current?.pause()
      }
    })
    resize()
    pickVideo()
    sizeMorph()
    io.observe(el)
    window.addEventListener("resize", resize)
    window.addEventListener("resize", sizeMorph)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      running = false
      cancelAnimationFrame(raf)
      cancelAnimationFrame(scrollRaf)
      window.removeEventListener("resize", sizeMorph)
      window.removeEventListener("scroll", onScroll)
      io.disconnect()
      mq.removeEventListener("change", pickVideo)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div ref={root} aria-hidden data-no-reveal className="absolute inset-0">
      {/* immagine fissa: anteprima, e versione con "riduci movimento" */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center motion-reduce:md:block"
        style={{ backgroundImage: "url(/immersive/cn-loop-poster.webp)" }}
      />
      <div
        className="absolute inset-x-0 top-0 hidden h-[58%] bg-cover bg-center motion-reduce:block motion-reduce:md:hidden"
        style={{ backgroundImage: "url(/immersive/cn-loop-poster-m.webp)" }}
      />

      {/* il CN che vive: loop del video (solo con movimento attivo) */}
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-x-0 top-0 h-[58%] w-full object-cover opacity-0 transition-opacity duration-700 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent),radial-gradient(ellipse_62%_60%_at_50%_45%,black_55%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] md:inset-0 md:h-full motion-reduce:hidden"
      />

      {/* la trasformazione medusa → CN, sopra il video finché non è finita */}
      <canvas
        ref={morph}
        className="pointer-events-none absolute inset-x-0 top-0 h-[58%] w-full opacity-0 transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent),radial-gradient(ellipse_62%_60%_at_50%_45%,black_55%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] md:inset-0 md:h-full motion-reduce:hidden"
      />

      {/* luce dalla superficie: raggi che oscillano come sotto il mare */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_55%,transparent_85%)] motion-reduce:hidden">
        {RAYS.map((r, i) => (
          <div
            key={i}
            className="absolute -top-[5%] h-[90%] origin-top animate-[immersive-ray_var(--d)_ease-in-out_infinite] blur-md md:blur-lg"
            style={
              {
                left: r.left,
                width: r.width,
                "--o": r.op,
                "--r": `${r.rot}deg`,
                "--d": `${r.dur}s`,
                animationDelay: `${r.delay}s`,
                background: "linear-gradient(to bottom, rgba(150,190,255,0.9), rgba(120,110,255,0.25) 55%, transparent)",
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <canvas ref={canvas} className="pointer-events-none absolute inset-0 size-full motion-reduce:hidden" />

    </div>
  )
}
