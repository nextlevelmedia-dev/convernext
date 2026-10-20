"use client"

import { useEffect, useRef, useState } from "react"
import { useLazyScene } from "../three/useLazyScene"
import type { ConversionKind } from "./scene"

type Toast = { id: number; kind: ConversionKind }

const TOASTS: Record<ConversionKind, { title: string; text: string; icon: string }> = {
  lead: {
    title: "Nuovo lead",
    text: "Richiesta di preventivo",
    icon: "M2.5 4.5h11v7h-11zM2.5 4.5l5.5 4 5.5-4",
  },
  order: {
    title: "Nuovo ordine",
    text: "Checkout completato",
    icon: "M2 3h2l1.5 7h7L14 5H5M6.5 13h.01M11.5 13h.01",
  },
  sale: {
    title: "Nuova vendita",
    text: "Pagamento ricevuto",
    icon: "M8 2.5v11M11 5.5H6.75a1.75 1.75 0 000 3.5h2.5a1.75 1.75 0 010 3.5H5",
  },
}

/**
 * Visual 3D della hero: il traffico entra nell'anello e diventa vendite,
 * ordini e lead. three.js viene caricato solo nel browser, a pagina pronta.
 */
export default function ConversionScene() {
  const stage = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const timers = useRef(new Set<number>())
  const nextId = useRef(0)

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((t) => window.clearTimeout(t))
  }, [])

  const ready = useLazyScene(stage, (el, env) =>
    import("./scene").then(({ createConversionScene }) =>
      createConversionScene(el, {
        ...env,
        onHover: setHovering,
        onConvert: (kind) => {
          const id = nextId.current++
          setToasts((t) => [...t.slice(-2), { id, kind }])
          const timer = window.setTimeout(() => {
            timers.current.delete(timer)
            setToasts((t) => t.filter((x) => x.id !== id))
          }, 2600)
          timers.current.add(timer)
        },
      })
    ),
    // above the fold: three.js parte alla prima interazione, non durante il caricamento
    "interaction"
  )

  return (
    <div className="relative mx-auto aspect-[11/10] w-full max-w-[640px] select-none">
      {/* alone di base, visibile anche prima che la scena sia pronta */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.18),rgb(252_3_176/0.08)_55%,transparent)] blur-2xl"
      />

      <div
        ref={stage}
        role="img"
        aria-label="Animazione: i visitatori passano nell'anello e diventano vendite, ordini e lead"
        className={`absolute inset-0 cursor-pointer touch-pan-y transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      />

      <span className="pointer-events-none absolute left-[4%] top-[18%] font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-white/55">
        Traffico
      </span>
      <span className="pointer-events-none absolute bottom-[22%] right-[4%] bg-brand-gradient bg-clip-text font-mono text-[11px] uppercase tracking-[0.16em] text-transparent">
        Clienti
      </span>

      {/* notifiche di conversione: da mobile una sola pillola compatta sotto l'anello */}
      <div aria-hidden className="pointer-events-none absolute bottom-[4%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-auto md:left-auto md:right-0 md:top-0 md:w-[210px] md:translate-x-0 md:items-end">
        {toasts.map((t) => {
          const toast = TOASTS[t.kind]
          return (
            <div
              key={t.id}
              className="flex animate-[toast-in_2.6s_cubic-bezier(0.16,1,0.3,1)_forwards] items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white/85 py-1 pl-1 pr-3 max-md:[&:not(:last-child)]:hidden md:w-full md:gap-3 md:whitespace-normal md:rounded-2xl md:px-3.5 md:py-2.5 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.18)] backdrop-blur-md dark:border-white/10 dark:bg-[#0f1726]/85"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-white md:size-8">
                <svg viewBox="0 0 16 16" className="size-3 md:size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={toast.icon} />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold text-slate-950 md:text-sm dark:text-white">{toast.title}</span>
                <span className="hidden truncate text-xs md:block text-slate-500 dark:text-white/60">{toast.text}</span>
              </span>
            </div>
          )
        })}
      </div>

      {/* tasso di conversione: sale quando l'utente interagisce */}
      <div className="pointer-events-none absolute bottom-0 left-0 hidden w-[230px] rounded-2xl md:block border border-slate-200 bg-white/85 px-4 py-3 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.18)] backdrop-blur-md dark:border-white/10 dark:bg-[#0f1726]/85">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-950 dark:text-white">Tasso di conversione</span>
          <span className={`font-mono transition-colors duration-500 ${hovering ? "text-[#047cf9]" : "text-slate-500 dark:text-white/55"}`}>
            {hovering ? "CRO attivo" : "standard"}
          </span>
        </div>
        <span className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
          <span
            className={`block h-full rounded-full bg-brand-gradient transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${hovering ? "w-[88%]" : "w-[34%]"}`}
          />
        </span>
        <span className="mt-2 block text-[11px] text-slate-500 dark:text-white/55">
          {hovering ? "Clicca per una raffica di conversioni" : "Passa il mouse sull'anello"}
        </span>
      </div>
    </div>
  )
}
