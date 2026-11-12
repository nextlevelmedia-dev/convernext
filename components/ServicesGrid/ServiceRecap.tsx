"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

/*
 * Visual delle card servizi in home, nello stile del recap finale dei temi:
 * schermate vere dei progetti (desktop + smartphone) con piccole card che entrano in sequenza.
 * Le schermate sono in public/services, le card sono HTML (nitide a ogni dimensione).
 */

type From = "center" | "left" | "right" | "top" | "bottom"

const HIDDEN: Record<From, string> = {
  center: "translateY(14px) scale(.96)",
  left: "translateX(-22px)",
  right: "translateX(22px)",
  top: "translateY(-18px)",
  bottom: "translateY(18px)",
}

function Layer({
  show,
  i,
  from,
  style,
  children,
}: {
  show: boolean
  i: number
  from: From
  style: CSSProperties
  children: ReactNode
}) {
  return (
    <div
      aria-hidden
      className="sr-layer"
      style={{
        position: "absolute",
        opacity: show ? 1 : 0,
        transform: show ? "none" : HIDDEN[from],
        transitionDelay: show && i > 0 ? `${380 + (i - 1) * 130}ms` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Shot({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "auto", filter: "drop-shadow(0 18px 30px rgba(0,0,0,.35))" }} />
}

/* card bianca piccola, come quelle del recap temi */
function Chip({ icon, title, sub, accent = "#7c3aed", children }: { icon: ReactNode; title: string; sub?: string; accent?: string; children?: ReactNode }) {
  return (
    <div className="sr-chip">
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, display: "grid", placeItems: "center", background: `${accent}1f`, color: accent }}>{icon}</span>
        <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <b style={{ fontSize: 9.5, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap" }}>{title}</b>
          {sub && <span style={{ fontSize: 7.5, color: "#64748b", whiteSpace: "nowrap" }}>{sub}</span>}
        </span>
      </div>
      {children}
    </div>
  )
}

const I = {
  check: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>,
  mail: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  phone: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>,
  bag: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 13H7z" /><path d="M9 8a3 3 0 016 0" /></svg>,
  split: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v6a6 6 0 006 6h0a6 6 0 006-6V3" /><path d="M12 15v6" /></svg>,
  click: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9l11 4-5 2-2 5z" /><path d="M5 3v3M3 5h3M9 4l1.5 1.5M4 9l1.5 1.5" /></svg>,
  edit: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></svg>,
  play: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>,
  cube: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 5v10l-9 5-9-5V7z" /><path d="M12 22V12M21 7l-9 5-9-5" /></svg>,
  bolt: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>,
  flag: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4h11l-2 4 2 4H5" /></svg>,
}

/* carrello in stile Shopify */
function Cart() {
  return (
    <div className="sr-chip" style={{ padding: 9, display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b style={{ fontSize: 9.5, fontWeight: 700, color: "#0f172a" }}>Il tuo carrello</b>
        <span style={{ fontSize: 7.5, color: "#64748b" }}>1 articolo</span>
      </div>
      <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/services/ecommerce-cart-thumb.webp" alt="" style={{ width: 34, height: 31, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
        <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
          <b style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Air Jordan 1 Retro High OG</b>
          <span style={{ fontSize: 7.5, color: "#64748b" }}>Taglia 9 · Qtà 1</span>
        </span>
        <b style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}>265 €</b>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: 6 }}>
        <span style={{ fontSize: 8, color: "#475569" }}>Subtotale</span>
        <b style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}>265 €</b>
      </div>
      <b style={{ display: "block", textAlign: "center", fontSize: 8.5, fontWeight: 700, color: "#fff", padding: "6px 0", borderRadius: 7, background: "#111" }}>Vai al checkout</b>
      <b style={{ display: "block", textAlign: "center", fontSize: 8.5, fontWeight: 800, color: "#fff", padding: "5px 0", borderRadius: 7, background: "#5a31f4" }}>Pagamento rapido</b>
    </div>
  )
}

export type ServiceRecapVariant = "siti-web" | "ecommerce" | "cro" | "temi-shopify" | "immersive"

export function serviceRecapFor(href?: string): ServiceRecapVariant | null {
  if (!href) return null
  if (href.includes("siti-web")) return "siti-web"
  if (href.includes("ecommerce")) return "ecommerce"
  if (href.includes("ottimizzazione") || href.includes("cro")) return "cro"
  if (href.includes("temi-shopify")) return "temi-shopify"
  if (href.includes("esperienze-immersive")) return "immersive"
  return null
}

export default function ServiceRecap({ variant }: { variant: ServiceRecapVariant }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="sr-wrap" aria-hidden title={LABELS[variant]}>
      <style>{`
        .sr-wrap { position: relative; width: 100%; height: 100%; z-index: 2; }
        .sr-layer { transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .sr-chip { font-family: var(--font-lato), sans-serif; background: #fff; border-radius: 10px; padding: 7px 9px; box-shadow: 0 14px 28px -10px rgba(0,0,0,.45), 0 0 0 1px rgba(15,23,42,.06); }
        @media (max-width: 640px) { .sr-chip { zoom: .8; } }
        @keyframes sr-heat { 0%,100% { opacity: .75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }
        .sr-heat { animation: sr-heat 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .sr-layer { transition: none; opacity: 1 !important; transform: none !important; } .sr-heat { animation: none; } }
      `}</style>
      {variant === "siti-web" && (
        <>
          <Layer show={show} i={0} from="center" style={{ left: "4%", top: "15%", width: "74%" }}><Shot src="/services/sitiweb-desktop.webp" /></Layer>
          <Layer show={show} i={1} from="right" style={{ left: "75%", top: "21%", width: "21%" }}><Shot src="/services/sitiweb-mobile.webp" /></Layer>
          <Layer show={show} i={2} from="top" style={{ left: "44%", top: "5%" }}>
            <Chip icon={I.mail} accent="#16a34a" title="Nuova richiesta di preventivo" sub="dal modulo contatti · adesso" />
          </Layer>
          <Layer show={show} i={3} from="bottom" style={{ left: "8%", bottom: "6%" }}>
            <Chip icon={I.phone} accent="#047cf9" title="Perfetto su ogni schermo" sub="Desktop, tablet e smartphone" />
          </Layer>
        </>
      )}
      {variant === "ecommerce" && (
        <>
          <Layer show={show} i={0} from="center" style={{ left: "14%", top: "17%", width: "66%" }}><Shot src="/services/ecommerce-desktop.webp" /></Layer>
          <Layer show={show} i={1} from="right" style={{ left: "75%", top: "21%", width: "21%" }}><Shot src="/services/ecommerce-mobile.webp" /></Layer>
          <Layer show={show} i={2} from="left" style={{ left: "1.5%", bottom: "4%", width: "34%", minWidth: 140 }}><Cart /></Layer>
          <Layer show={show} i={3} from="top" style={{ left: "38%", top: "4%" }}>
            <Chip icon={I.bag} accent="#16a34a" title="Nuovo ordine ricevuto" sub="Air Jordan 1 · 265 €" />
          </Layer>
        </>
      )}
      {variant === "cro" && (
        <>
          <Layer show={show} i={0} from="center" style={{ left: "10%", top: "13%", width: "80%" }}>
            <div style={{ position: "relative" }}>
              <Shot src="/services/cro-desktop.webp" />
              {/* mappa dei clic sopra i pulsanti della hero */}
              {[
                { l: "12%", t: "70%", s: "14%", c: "255,59,48" },
                { l: "26%", t: "70%", s: "10%", c: "255,149,0" },
                { l: "62%", t: "40%", s: "12%", c: "255,204,0" },
                { l: "8%", t: "36%", s: "9%", c: "255,149,0" },
              ].map((h, i) => (
                <i key={i} className="sr-heat" style={{ position: "absolute", left: h.l, top: h.t, width: h.s, aspectRatio: "1", marginLeft: `calc(${h.s} / -2)`, marginTop: `calc(${h.s} / -2)`, borderRadius: "50%", background: `radial-gradient(circle, rgba(${h.c},.85), rgba(${h.c},.35) 45%, transparent 70%)`, mixBlendMode: "multiply", animationDelay: `${i * 0.6}s` }} />
              ))}
            </div>
          </Layer>
          <Layer show={show} i={1} from="right" style={{ right: "2%", top: "4%", width: "34%", minWidth: 140 }}>
            <Chip icon={I.split} title="Test A/B in corso" sub="Pulsante della hero">
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 7 }}>
                {[["A", "48%", "#cbd5e1"], ["B", "78%", "linear-gradient(90deg,#fc03b0,#047cf9)"]].map(([k, w, bg]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <b style={{ fontSize: 7.5, fontWeight: 700, color: "#475569", width: 8 }}>{k}</b>
                    <span style={{ flex: 1, height: 5, borderRadius: 99, background: "#f1f5f9" }}>
                      <i style={{ display: "block", width: w, height: "100%", borderRadius: 99, background: bg }} />
                    </span>
                  </div>
                ))}
                <span style={{ fontSize: 7.5, fontWeight: 700, color: "#16a34a" }}>Variante B in vantaggio</span>
              </div>
            </Chip>
          </Layer>
          <Layer show={show} i={2} from="left" style={{ left: "2%", top: "6%" }}>
            <Chip icon={I.click} accent="#f97316" title="Mappa dei clic" sub="Dove si fermano le persone" />
          </Layer>
          <Layer show={show} i={3} from="bottom" style={{ left: "30%", bottom: "5%" }}>
            <Chip icon={I.flag} accent="#fc03b0" title="Frizione trovata" sub="Il modulo chiede troppi dati" />
          </Layer>
        </>
      )}
      {variant === "temi-shopify" && (
        <>
          <Layer show={show} i={0} from="center" style={{ left: "4%", top: "15%", width: "74%" }}><Shot src="/recap/temi-vaerk-desktop.webp" /></Layer>
          <Layer show={show} i={1} from="right" style={{ left: "75%", top: "21%", width: "21%" }}><Shot src="/recap/temi-vaerk-mobile.webp" /></Layer>
          <Layer show={show} i={2} from="top" style={{ left: "44%", top: "5%" }}>
            <Chip icon={I.check} accent="#16a34a" title="Modifiche pubblicate" sub="Dall'editor di Shopify" />
          </Layer>
          <Layer show={show} i={3} from="bottom" style={{ left: "6%", bottom: "6%" }}>
            <Chip icon={I.edit} title="Sezioni su misura" sub="Aggiungi, sposta, personalizza" />
          </Layer>
          <Layer show={show} i={4} from="bottom" style={{ left: "44%", bottom: "6%" }}>
            <Chip icon={I.play} accent="#fc03b0" title="Video tutorial inclusi" sub="Gestisci il tema in autonomia" />
          </Layer>
        </>
      )}
      {variant === "immersive" && (
        <>
          <Layer show={show} i={0} from="center" style={{ left: "4%", top: "15%", width: "74%" }}><Shot src="/services/immersive-desktop.webp" /></Layer>
          <Layer show={show} i={1} from="right" style={{ left: "75%", top: "21%", width: "21%" }}><Shot src="/services/immersive-mobile.webp" /></Layer>
          <Layer show={show} i={2} from="top" style={{ left: "40%", top: "5%" }}>
            <Chip icon={I.cube} accent="#7c3aed" title="Scena 3D allo scroll" sub="Si entra nella boutique" />
          </Layer>
          <Layer show={show} i={3} from="bottom" style={{ left: "8%", bottom: "6%" }}>
            <Chip icon={I.bolt} accent="#047cf9" title="Veloce anche da mobile" sub="Caricamento progressivo" />
          </Layer>
        </>
      )}
    </div>
  )
}

const LABELS: Record<ServiceRecapVariant, string> = {
  "siti-web": "Sito web Velatura su desktop e smartphone, con una nuova richiesta di preventivo",
  ecommerce: "E-commerce Orvek su desktop e smartphone, con carrello e notifica di un nuovo ordine",
  cro: "Sito Tornante con mappa dei clic, test A/B in corso e una frizione individuata",
  "temi-shopify": "Tema Shopify su misura per VÆRK su desktop e smartphone, gestibile dall'editor",
  immersive: "Esperienza immersiva Aurelle su desktop e smartphone, con scena 3D allo scroll",
}
