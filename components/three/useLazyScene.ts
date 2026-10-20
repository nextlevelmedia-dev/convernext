"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

export type SceneApi = {
  setRunning(on: boolean): void
  dispose(): void
}

export type SceneEnv = {
  lite: boolean
  reducedMotion: boolean
}

/**
 * Quando caricare three.js (≈140 KB gzip):
 * - "near": quando il contenitore si avvicina alla viewport (scene sotto la piega)
 * - "interaction": alla prima interazione dell'utente o, in mancanza, qualche
 *   secondo dopo il load della pagina (scene above the fold)
 * In entrambi i casi il caricamento non pesa su LCP/TBT del primo render.
 */
export type SceneTrigger = "near" | "interaction"

const INTERACTION_EVENTS = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart"] as const
const FALLBACK_AFTER_LOAD_MS = 3000

/**
 * Monta una scena three.js nel contenitore e la mette in pausa quando è fuori
 * dallo schermo o la scheda non è attiva.
 */
export function useLazyScene(
  ref: RefObject<HTMLElement | null>,
  create: (el: HTMLElement, env: SceneEnv) => Promise<SceneApi>,
  trigger: SceneTrigger = "near"
) {
  const [ready, setReady] = useState(false)
  const createRef = useRef(create)
  createRef.current = create

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let disposed = false
    let started = false
    let api: SceneApi | undefined
    let visible = false
    let fallback = 0

    const sync = () => api?.setRunning(visible && !document.hidden)

    const start = () => {
      if (started || disposed) return
      started = true
      cleanupTriggers()
      createRef
        .current(el, {
          lite: window.innerWidth < 768,
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        })
        .then((scene) => {
          if (disposed) return scene.dispose()
          api = scene
          setReady(true)
          sync()
        })
    }

    // visibilità: pausa/ripresa del loop, e trigger "near"
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    io.observe(el)

    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
      },
      { rootMargin: "300px 0px" }
    )

    const onLoad = () => {
      fallback = window.setTimeout(start, FALLBACK_AFTER_LOAD_MS)
    }

    function cleanupTriggers() {
      near.disconnect()
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, start))
      window.removeEventListener("load", onLoad)
      clearTimeout(fallback)
    }

    if (trigger === "near") {
      near.observe(el)
    } else {
      INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }))
      if (document.readyState === "complete") onLoad()
      else window.addEventListener("load", onLoad, { once: true })
    }

    document.addEventListener("visibilitychange", sync)

    return () => {
      disposed = true
      cleanupTriggers()
      io.disconnect()
      document.removeEventListener("visibilitychange", sync)
      api?.dispose()
    }
  }, [ref, trigger])

  return ready
}
