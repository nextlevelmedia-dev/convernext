"use client"

import { useEffect, useRef } from "react"

/*
 * Fondale della CTA finale: il CN "vive" sott'acqua.
 * - Video in loop degli ultimi secondi della medusa (CN formato, tentacoli che ondeggiano)
 * - Raggi di luce che scendono dalla superficie e oscillano piano
 * - Poche particelle in sospensione che salgono lente (marine snow)
 * Si anima solo quando la sezione è in vista. Con "riduci movimento" resta l'immagine fissa.
 */

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

  useEffect(() => {
    const el = root.current
    const cv = canvas.current
    if (!el || !cv) return
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
    io.observe(el)
    window.addEventListener("resize", resize)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      mq.removeEventListener("change", pickVideo)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div ref={root} aria-hidden data-no-reveal className="absolute inset-0">
      {/* immagine fissa: anteprima, e versione con "riduci movimento" */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center md:block"
        style={{ backgroundImage: "url(/immersive/cn-loop-poster.webp)" }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[58%] bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url(/immersive/cn-loop-poster-m.webp)" }}
      />

      {/* il CN che vive: loop del video (solo con movimento attivo) */}
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-x-0 top-0 h-[58%] w-full object-cover md:inset-0 md:h-full motion-reduce:hidden"
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

      {/* bordi del video sfumati nel buio: niente rettangolo visibile */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_80px_#05040a]" />
    </div>
  )
}
