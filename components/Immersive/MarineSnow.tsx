"use client"

import { useEffect, useRef } from "react"

/*
 * Atmosfera da fondale marino per tutta la landing: particelle in sospensione
 * ("marine snow") dietro ai contenuti e una luce tenue che arriva dall'alto.
 * - ogni particella ha una profondità: quelle vicine sono più grandi, luminose
 *   e si spostano di più quando si scorre (parallasse), quelle lontane quasi ferme
 * - salgono piano e dondolano, come in acqua
 * - si ferma con la scheda in background; con "riduci movimento" non c'è
 */

type P = { x: number; y: number; z: number; r: number; a: number; vy: number; ph: number; sw: number }

export default function MarineSnow() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvas.current
    if (!cv) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = cv.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let parts: P[] = []
    let w = 0
    let h = 0

    const spawn = (y?: number): P => {
      const z = Math.pow(Math.random(), 1.6) // tante lontane, poche vicine
      return {
        x: Math.random() * w,
        y: y ?? Math.random() * h,
        z,
        r: (0.4 + z * 1.9) * dpr,
        a: 0.08 + z * 0.45,
        vy: (0.05 + z * 0.22) * dpr,
        ph: Math.random() * Math.PI * 2,
        sw: (2 + z * 7) * dpr,
      }
    }

    const resize = () => {
      w = cv.width = Math.round(window.innerWidth * dpr)
      h = cv.height = Math.round(window.innerHeight * dpr)
      const count = Math.min(window.innerWidth < 768 ? 55 : 110, Math.round((window.innerWidth * window.innerHeight) / 13000))
      parts = Array.from({ length: count }, () => spawn())
    }

    let lastScroll = window.scrollY
    let raf = 0
    const tick = (t: number) => {
      // quanto si è scorso dall'ultimo fotogramma: le particelle vicine lo seguono di più
      const dy = (window.scrollY - lastScroll) * dpr
      lastScroll = window.scrollY

      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.y -= p.vy + dy * (0.08 + p.z * 0.35)
        if (p.y < -20) Object.assign(p, spawn(h + 20))
        else if (p.y > h + 20) Object.assign(p, spawn(-20))
        const x = p.x + Math.sin(t / 2600 + p.ph) * p.sw
        ctx.beginPath()
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(185, 205, 255, ${p.a.toFixed(3)})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div aria-hidden data-no-reveal className="pointer-events-none fixed inset-0 -z-10">
      {/* la superficie, lontana, sopra di noi */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-5%,rgba(110,140,255,0.13),transparent_70%)]" />
      <canvas ref={canvas} className="absolute inset-0 size-full motion-reduce:hidden" />
    </div>
  )
}
