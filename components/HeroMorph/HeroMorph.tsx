"use client"

import { useEffect, useRef, useState } from "react"

/*
 * Visual della hero in home: una finestra fatta di 12 blocchi che si scompone
 * e si ricompone, servizio dopo servizio: sito web → landing → e-commerce →
 * tema Shopify → CRO → esperienza immersiva.
 * Solo CSS (posizioni in %, transizioni): leggero, niente three.js.
 * Con "riduci movimento" cambia layout senza la fase di scomposizione.
 * Testi in <div>/<b>: il CSS globale del dark forza il bianco sugli <span>.
 */

type Kind = "bar" | "title" | "grad" | "img" | "card" | "pill" | "orb"
// x, y, w, h in % dell'area; k = aspetto; r = rotazione in gradi
type Block = { x: number; y: number; w: number; h: number; k: Kind; r?: number; hidden?: boolean }

const H: Block = { x: 48, y: 48, w: 4, h: 4, k: "bar", hidden: true }

const SERVICES: { name: string; short: string; url: string; toast: string; icon: string; blocks: Block[] }[] = [
  {
    name: "Siti web",
    short: "Siti web",
    url: "il-tuo-sito.it",
    toast: "Nuovo contatto",
    icon: "M2.5 4.5h11v7h-11zM2.5 4.5l5.5 4 5.5-4",
    blocks: [
      { x: 4, y: 5, w: 14, h: 5, k: "grad" },
      { x: 60, y: 5, w: 36, h: 5, k: "bar" },
      { x: 4, y: 20, w: 48, h: 8, k: "title" },
      { x: 4, y: 31, w: 40, h: 8, k: "title" },
      { x: 4, y: 44, w: 44, h: 4, k: "bar" },
      { x: 4, y: 54, w: 22, h: 8, k: "pill" },
      { x: 56, y: 18, w: 40, h: 44, k: "img" },
      { x: 4, y: 70, w: 29, h: 24, k: "card" },
      { x: 35.5, y: 70, w: 29, h: 24, k: "card" },
      { x: 67, y: 70, w: 29, h: 24, k: "card" },
      H,
      H,
    ],
  },
  {
    name: "Landing page",
    short: "Landing page",
    url: "offerta.il-tuo-sito.it",
    toast: "Nuovo lead",
    icon: "M2.5 4.5h11v7h-11zM2.5 4.5l5.5 4 5.5-4",
    blocks: [
      { x: 38, y: 6, w: 24, h: 4, k: "bar" },
      { x: 12, y: 15, w: 76, h: 9, k: "title" },
      { x: 20, y: 27, w: 60, h: 9, k: "title" },
      { x: 24, y: 41, w: 52, h: 4, k: "bar" },
      { x: 36, y: 51, w: 28, h: 9, k: "pill" },
      { x: 40, y: 64, w: 20, h: 3, k: "grad" },
      { x: 10, y: 72, w: 25, h: 21, k: "card" },
      { x: 37.5, y: 72, w: 25, h: 21, k: "card" },
      { x: 65, y: 72, w: 25, h: 21, k: "card" },
      H,
      H,
      H,
    ],
  },
  {
    name: "E-commerce",
    short: "E-commerce",
    url: "shop.il-tuo-brand.it",
    toast: "Nuovo ordine",
    icon: "M2 3h2l1.5 7h7L14 5H5M6.5 13h.01M11.5 13h.01",
    blocks: [
      { x: 4, y: 5, w: 92, h: 5, k: "bar" },
      { x: 4, y: 16, w: 46, h: 58, k: "img" },
      { x: 4, y: 78, w: 14, h: 16, k: "img" },
      { x: 20, y: 78, w: 14, h: 16, k: "img" },
      { x: 36, y: 78, w: 14, h: 16, k: "img" },
      { x: 56, y: 18, w: 40, h: 8, k: "title" },
      { x: 56, y: 30, w: 18, h: 6, k: "grad" },
      { x: 56, y: 42, w: 12, h: 8, k: "card" },
      { x: 70, y: 42, w: 12, h: 8, k: "card" },
      { x: 84, y: 42, w: 12, h: 8, k: "card" },
      { x: 56, y: 58, w: 40, h: 10, k: "pill" },
      { x: 56, y: 74, w: 40, h: 4, k: "bar" },
    ],
  },
  {
    name: "Temi Shopify",
    short: "Temi Shopify",
    url: "editor del tema",
    toast: "Tema pubblicato",
    icon: "M3 8.5l3 3 7-7",
    blocks: [
      { x: 4, y: 5, w: 26, h: 90, k: "card" },
      { x: 8, y: 12, w: 18, h: 5, k: "title" },
      { x: 8, y: 22, w: 18, h: 5, k: "bar" },
      { x: 8, y: 31, w: 18, h: 5, k: "grad" },
      { x: 8, y: 40, w: 18, h: 5, k: "bar" },
      { x: 8, y: 49, w: 18, h: 5, k: "bar" },
      { x: 34, y: 5, w: 62, h: 90, k: "card" },
      { x: 38, y: 11, w: 54, h: 32, k: "img" },
      { x: 38, y: 48, w: 54, h: 6, k: "title" },
      { x: 38, y: 59, w: 26, h: 30, k: "img" },
      { x: 66, y: 59, w: 26, h: 30, k: "img" },
      { x: 42, y: 33, w: 18, h: 6, k: "pill" },
    ],
  },
  {
    name: "Ottimizzazione conversioni",
    short: "CRO",
    url: "analytics",
    toast: "Nuova vendita",
    icon: "M8 2.5v11M11 5.5H6.75a1.75 1.75 0 000 3.5h2.5a1.75 1.75 0 010 3.5H5",
    blocks: [
      { x: 4, y: 6, w: 34, h: 4, k: "bar" },
      { x: 4, y: 13, w: 28, h: 8, k: "title" },
      { x: 74, y: 7, w: 22, h: 7, k: "pill" },
      { x: 4, y: 28, w: 92, h: 30, k: "img" },
      { x: 4, y: 66, w: 18, h: 4, k: "bar" },
      { x: 26, y: 66, w: 70, h: 4, k: "title" },
      { x: 4, y: 74, w: 18, h: 4, k: "bar" },
      { x: 26, y: 74, w: 54, h: 4, k: "title" },
      { x: 4, y: 82, w: 18, h: 4, k: "bar" },
      { x: 26, y: 82, w: 40, h: 4, k: "title" },
      { x: 4, y: 90, w: 18, h: 4, k: "bar" },
      { x: 26, y: 90, w: 28, h: 4, k: "grad" },
    ],
  },
  {
    name: "Esperienze immersive",
    short: "Immersive",
    url: "esperienza-3d.it",
    toast: "Nuova prenotazione",
    icon: "M3 4.5h10v9H3zM3 7.5h10M6 3v3M10 3v3",
    blocks: [
      { x: 31, y: 15, w: 38, h: 51, k: "orb" },
      { x: 6, y: 10, w: 22, h: 26, k: "card", r: -8 },
      { x: 72, y: 8, w: 22, h: 26, k: "card", r: 8 },
      { x: 8, y: 60, w: 20, h: 26, k: "img", r: 6 },
      { x: 72, y: 58, w: 22, h: 28, k: "img", r: -6 },
      { x: 38, y: 76, w: 24, h: 8, k: "pill" },
      { x: 44, y: 6, w: 12, h: 3, k: "grad" },
      { x: 26, y: 46, w: 4, h: 5, k: "orb" },
      { x: 70, y: 42, w: 3, h: 4, k: "orb" },
      { x: 62, y: 10, w: 3, h: 4, k: "orb" },
      H,
      H,
    ],
  },
]

const STEP_MS = 3600
const SCATTER_MS = 420

// spostamento "casuale" ma stabile per ogni blocco, usato nella fase di scomposizione
const jitter = (i: number, step: number) => {
  const s = Math.sin(i * 12.9898 + step * 78.233) * 43758.5453
  return s - Math.floor(s)
}

const KIND: Record<Kind, string> = {
  bar: "bg-slate-200 dark:bg-white/10",
  title: "bg-slate-300 dark:bg-white/[0.22]",
  grad: "bg-slate-200 dark:bg-white/10",
  img: "bg-slate-200 dark:bg-white/[0.08]",
  card: "bg-white border-slate-200 dark:bg-white/[0.04] dark:border-white/10",
  pill: "bg-slate-200 dark:bg-white/10",
  orb: "bg-transparent",
}

export default function HeroMorph() {
  const [step, setStep] = useState(0)
  const [scatter, setScatter] = useState(false)
  const [on, setOn] = useState(false)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOn(true))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let t1 = 0
    let t2 = 0
    const next = () => {
      if (pausedRef.current) {
        t1 = window.setTimeout(next, 600)
        return
      }
      if (reduce) {
        setStep((s) => (s + 1) % SERVICES.length)
      } else {
        setScatter(true)
        t2 = window.setTimeout(() => {
          setStep((s) => (s + 1) % SERVICES.length)
          setScatter(false)
        }, SCATTER_MS)
      }
      t1 = window.setTimeout(next, STEP_MS + (reduce ? 1200 : 0))
    }
    t1 = window.setTimeout(next, STEP_MS)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  const hold = (v: boolean) => {
    pausedRef.current = v
    setPaused(v)
  }

  const svc = SERVICES[step]

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] select-none pt-6 md:pt-10"
      onPointerEnter={(e) => e.pointerType === "mouse" && hold(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && hold(false)}
    >
      {/* alone del brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[6%] inset-y-[12%] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.22),rgb(252_3_176/0.1)_55%,transparent)] blur-2xl"
      />

      {/* notifica del servizio: in alto a destra da desktop */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 z-20 max-md:hidden">
        <Toast key={step} title={svc.toast} icon={svc.icon} />
      </div>

      <div
        className={`relative overflow-hidden rounded-[22px] border border-slate-200 bg-white/80 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_30px_80px_-30px_rgb(15_23_42/0.35)] backdrop-blur-xl transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] dark:border-white/10 dark:bg-[#0f1726]/80 dark:shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] ${
          on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* barra della finestra */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10">
          <div className="flex gap-1.5">
            <i className="size-2.5 rounded-full bg-[#ff5f57]" />
            <i className="size-2.5 rounded-full bg-[#febc2e]" />
            <i className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto min-w-0 truncate rounded-full bg-slate-100 px-4 py-1 font-mono text-[10px] text-slate-500 transition-opacity duration-300 dark:bg-white/[0.06] dark:text-white/50" style={{ opacity: scatter ? 0.3 : 1 }}>
            {svc.url}
          </div>
          <div className="w-[42px]" />
        </div>

        {/* area dei blocchi */}
        <div
          role="img"
          aria-label={`Esempio di ${svc.name.toLowerCase()} progettato da Convernext`}
          className="relative m-3 aspect-[4/3] sm:m-4"
        >
          {svc.blocks.map((b, i) => {
            const j1 = jitter(i, step)
            const j2 = jitter(i + 31, step)
            // fase di scomposizione: i blocchi si staccano verso l'esterno, ruotano e rimpiccioliscono
            const dx = scatter ? (j1 - 0.5) * 40 : 0
            const dy = scatter ? (j2 - 0.5) * 34 : 0
            const rot = scatter ? (j1 - 0.5) * 50 : (b.r ?? 0)
            const scale = scatter ? 0.55 + j2 * 0.25 : 1
            return (
              <div
                key={i}
                className={`absolute overflow-hidden border border-transparent ${KIND[b.k]}`}
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.w}%`,
                  height: `${b.h}%`,
                  borderRadius: b.k === "orb" ? "999px" : b.k === "pill" ? "999px" : b.k === "card" || b.k === "img" ? "14px" : "8px",
                  opacity: b.hidden ? 0 : scatter ? 0.7 : 1,
                  transform: `translate(${dx}%, ${dy}%) rotate(${rot}deg) scale(${b.hidden ? 0.2 : scale})`,
                  transition:
                    "left .9s cubic-bezier(.16,1,.3,1), top .9s cubic-bezier(.16,1,.3,1), width .9s cubic-bezier(.16,1,.3,1), height .9s cubic-bezier(.16,1,.3,1), border-radius .9s, transform .7s cubic-bezier(.16,1,.3,1), opacity .5s, background-color .6s, border-color .6s",
                  transitionDelay: `${(scatter ? i : 11 - i) * 22}ms`,
                }}
              >
                {/* strati di colore che si accendono a seconda del tipo di blocco */}
                <i
                  className="absolute inset-0 bg-[linear-gradient(90deg,#fc03b0,#047cf9)] transition-opacity duration-700"
                  style={{ opacity: b.k === "grad" || b.k === "pill" ? 1 : 0 }}
                />
                <i
                  className="absolute inset-0 bg-[linear-gradient(135deg,rgb(252_3_176/0.28),rgb(124_58_237/0.22)_50%,rgb(4_124_249/0.28))] transition-opacity duration-700"
                  style={{ opacity: b.k === "img" ? 1 : 0 }}
                />
                <i
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff_0,#fc03b0_22%,#7c3aed_52%,#047cf9_78%)] shadow-[0_0_60px_rgb(252_3_176/0.45)] transition-opacity duration-700"
                  style={{ opacity: b.k === "orb" ? 1 : 0 }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* servizi: quello attivo evidenziato, cliccabili per fermarsi su uno */}
      <div className="mt-5 flex flex-wrap justify-center gap-1.5 md:flex-nowrap">
        {SERVICES.map((s, i) => (
          <button
            key={s.name}
            type="button"
            onClick={() => {
              setStep(i)
              hold(true)
            }}
            aria-label={s.name}
            className={`whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-bold transition-colors duration-500 ${
              i === step
                ? "border-transparent bg-brand-gradient !text-white"
                : "border-slate-200 text-slate-500 hover:text-slate-900 dark:border-white/10 dark:text-white/55 dark:hover:text-white"
            }`}
          >
            {/* su mobile il nome completo, da desktop quello corto per stare su una riga */}
            <b className="font-bold md:hidden">{s.name}</b>
            <b className="hidden font-bold md:inline">{s.short}</b>
          </button>
        ))}
      </div>
      {paused && <div className="sr-only">Animazione in pausa</div>}
    </div>
  )
}

function Toast({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex animate-[toast-in_3.2s_cubic-bezier(0.16,1,0.3,1)_forwards] items-center gap-2.5 whitespace-nowrap rounded-full border border-slate-200 bg-white/90 py-1.5 pl-1.5 pr-4 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.18)] backdrop-blur-md dark:border-white/10 dark:bg-[#0f1726]/90">
      <div className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient !text-white">
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      </div>
      <div className="text-sm font-bold text-slate-950 dark:text-white">{title}</div>
    </div>
  )
}
