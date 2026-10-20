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
 * Monta una scena three.js nel contenitore quando il browser è libero
 * (così non pesa sul primo caricamento) e la mette in pausa quando è fuori
 * dallo schermo o la scheda non è attiva.
 */
export function useLazyScene(
  ref: RefObject<HTMLElement | null>,
  create: (el: HTMLElement, env: SceneEnv) => Promise<SceneApi>
) {
  const [ready, setReady] = useState(false)
  const createRef = useRef(create)
  createRef.current = create

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let disposed = false
    let api: SceneApi | undefined
    let visible = false

    const sync = () => api?.setRunning(visible && !document.hidden)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    io.observe(el)
    document.addEventListener("visibilitychange", sync)

    const start = () =>
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

    const hasIdle = typeof window.requestIdleCallback === "function"
    const idle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : setTimeout(start, 300)

    return () => {
      disposed = true
      if (hasIdle) window.cancelIdleCallback(idle as number)
      else clearTimeout(idle)
      io.disconnect()
      document.removeEventListener("visibilitychange", sync)
      api?.dispose()
    }
  }, [ref])

  return ready
}
