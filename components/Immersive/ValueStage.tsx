"use client"

import { useEffect, useRef } from "react"
import { useLazyScene } from "../three/useLazyScene"
import { WhatsAppButton } from "./whatsapp"
import "./ValueStage.css"

/*
 * Proposta di valore della landing immersiva.
 * Due "portali" (sito / e-commerce): si inclinano verso il mouse e una luce
 * segue il cursore. Dentro, una scena three.js nello stesso stile lucido in
 * gradient brand: una finestra del browser da cui esce una sfera per il sito,
 * una shopping bag per l'e-commerce.
 * Entrata con scroll-driven animation dove supportata: senza supporto
 * il contenuto è semplicemente visibile. Con "riduci movimento" tutto fermo.
 * Niente <span> per i testi colorati: in dark mode il CSS globale li forza bianchi.
 */

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

const portals = [
  {
    kind: "site" as const,
    kicker: "Per attività, studi e professionisti",
    title: "Siti web immersivi",
    lead: "La tua attività raccontata come una scena: spazi, luce, dettagli. Il cliente la vive prima ancora di varcare la porta.",
    points: [
      "Percepita premium dal primo secondo",
      "Più tempo sul sito, il tuo nome resta in testa",
      "Contatti e prenotazioni sempre a un tocco",
    ],
  },
  {
    kind: "shop" as const,
    kicker: "Per brand e prodotti",
    title: "E-commerce immersivi",
    lead: "Il prodotto si gira, si avvicina, si scopre come in una boutique. Il desiderio arriva prima del prezzo.",
    points: [
      "Prodotti da esplorare in 3D, quasi da toccare",
      "Valore percepito più alto, prezzo che pesa meno",
      "Checkout veloce, senza effetti tra il cliente e l'acquisto",
    ],
  },
]

// scene three.js (valueScenes.ts), caricate solo quando la sezione si avvicina
function Scene({ kind }: { kind: "site" | "shop" }) {
  const stage = useRef<HTMLDivElement>(null)
  const ready = useLazyScene(stage, (el, env) =>
    import("./valueScenes").then((m) => (kind === "site" ? m.createWindowScene(el, env) : m.createBagScene(el, env)))
  )
  return (
    <div ref={stage} className={`vs-scene ${ready ? "is-ready" : ""}`} aria-hidden>
      {kind === "shop" && <i className="vs-chip vs-chip-shop">Aggiungi al carrello</i>}
    </div>
  )
}

export default function ValueStage() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (reduce || !fine) return

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".vs-portal"))
    const cleanups = cards.map((card) => {
      let raf = 0
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`)
          card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`)
          card.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`)
          card.style.setProperty("--rx", `${((0.5 - y) * 8).toFixed(2)}deg`)
          card.style.setProperty("--px", (x - 0.5).toFixed(3))
          card.style.setProperty("--py", (y - 0.5).toFixed(3))
        })
      }
      const leave = () => {
        cancelAnimationFrame(raf)
        for (const p of ["--rx", "--ry", "--px", "--py"]) card.style.setProperty(p, "0")
      }
      card.addEventListener("pointermove", move)
      card.addEventListener("pointerleave", leave)
      return () => {
        cancelAnimationFrame(raf)
        card.removeEventListener("pointermove", move)
        card.removeEventListener("pointerleave", leave)
      }
    })
    return () => cleanups.forEach((c) => c())
  }, [])

  return (
    <div ref={root}>
      {/* desktop: titolo a sinistra, testo a destra allineato in basso */}
      <div className="grid gap-7 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="mb-6 [font-family:var(--font-archivo),sans-serif] font-semibold text-[11px] uppercase tracking-[0.3em] !text-white/50 md:text-xs">
            Il tuo vantaggio
          </p>
          <h2
            className="vs-rise text-[clamp(2.4rem,5.4vw,5.2rem)] leading-[1.02] tracking-[-0.035em] !text-white"
            style={archivo}
          >
            Non lo guardano.{" "}
            <em className="whitespace-nowrap bg-brand-gradient bg-clip-text not-italic text-transparent">Ci entrano.</em>
          </h2>
        </div>
        <p className="vs-rise max-w-xl text-lg leading-8 !text-white/65 md:text-xl md:leading-9 lg:pb-2">
          Un sito in 3D trasforma una visita in un&apos;esperienza: chi arriva rallenta, esplora e si ricorda di te. È
          così che un&apos;attività smette di essere una tra tante e diventa quella che si sceglie,{" "}
          <em className="not-italic !text-white">anche quando costa di più.</em>
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2 md:gap-8">
        {portals.map((p) => (
          <article key={p.kind} className="vs-portal vs-rise">
            <div className="vs-inner">
              <i className="vs-glow" aria-hidden />
              <Scene kind={p.kind} />
              <div className="relative p-7 md:p-10">
                <p className="text-[11px] uppercase tracking-[0.28em] !text-white/45 md:text-xs" style={archivo}>
                  {p.kicker}
                </p>
                <h3 className="mt-3 text-3xl tracking-[-0.02em] !text-white md:text-[2.6rem] md:leading-[1.05]" style={archivo}>
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-7 !text-white/65 md:text-lg md:leading-8">{p.lead}</p>
                <ul className="mt-8 space-y-0">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-4 border-t border-white/10 py-4 text-base !text-white/85 md:text-lg">
                      <i aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-gradient" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 md:mt-24">
        <WhatsAppButton label="Voglio il mio sito in 3D" />
        <p className="text-sm !text-white/45">Ti rispondiamo entro 24 ore, senza impegno.</p>
      </div>
    </div>
  )
}
