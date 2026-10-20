"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export type EditorVideoData = {
  webm?: string
  mp4?: string
  webmMobile?: string
  mp4Mobile?: string
  poster?: string
  address?: string
}

type NetworkInfo = { saveData?: boolean }

/**
 * Registrazione dell'editor del tema in una cornice browser.
 *
 * Performance: subito si vede solo l'anteprima (immagine ottimizzata da
 * next/image). Il video viene scaricato dopo il load della pagina, quando il
 * browser è libero e il riquadro è visibile; sugli schermi stretti usa i file
 * mobile. Con "risparmio dati" o "riduci movimento" resta l'anteprima.
 */
export default function EditorVideo({ webm, mp4, webmMobile, mp4Mobile, poster, address }: EditorVideoData) {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = video.current
    if (!el) return

    const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection
    if (connection?.saveData) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let loaded = false
    let visible = false
    let ready = false
    let idle = 0

    const load = () => {
      if (loaded || !visible || !ready) return
      loaded = true
      const mobile = window.matchMedia("(max-width: 767px)").matches
      const sources: [string | undefined, string][] = [
        [mobile ? webmMobile || webm : webm, "video/webm"],
        [mobile ? mp4Mobile || mp4 : mp4, "video/mp4"],
      ]
      for (const [src, type] of sources) {
        if (!src) continue
        const source = document.createElement("source")
        source.src = src
        source.type = type
        el.appendChild(source)
      }
      el.load()
      el.play().catch(() => {})
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!loaded) load()
      else if (visible) el.play().catch(() => {})
      else el.pause()
    })
    io.observe(el)

    // il video parte solo a pagina caricata e con il browser libero
    const whenIdle = () => {
      const go = () => {
        ready = true
        load()
      }
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(go, { timeout: 2500 })
      } else {
        idle = window.setTimeout(go, 1200)
      }
    }
    if (document.readyState === "complete") whenIdle()
    else window.addEventListener("load", whenIdle, { once: true })

    return () => {
      io.disconnect()
      window.removeEventListener("load", whenIdle)
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle)
      else clearTimeout(idle)
    }
  }, [webm, mp4, webmMobile, mp4Mobile])

  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[48px] bg-[radial-gradient(60%_55%_at_25%_20%,rgb(252_3_176/0.16),transparent_70%),radial-gradient(60%_55%_at_80%_85%,rgb(4_124_249/0.16),transparent_70%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_30px_80px_-30px_rgb(15_23_42/0.35)] dark:border-white/10 dark:bg-[#0f1726] dark:shadow-[0_1px_2px_rgb(0_0_0/0.3),0_30px_80px_-30px_rgb(0_0_0/0.7)]">
        <div className="flex items-center gap-1.5 px-2.5 pb-2 pt-1">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          {address && (
            <span className="ml-3 truncate rounded-md bg-slate-100 px-3 py-1 font-mono text-[11px] text-slate-500 dark:bg-white/[0.06] dark:text-white/60">
              {address}
            </span>
          )}
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-[#111827]">
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 680px, 100vw"
              className="object-cover object-top"
            />
          )}
          <video
            ref={video}
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
            muted
            loop
            playsInline
            preload="none"
            onPlaying={() => setPlaying(true)}
            aria-label="Registrazione dell'editor del tema: le sezioni si modificano senza scrivere codice"
          />
        </div>
      </div>
    </div>
  )
}
