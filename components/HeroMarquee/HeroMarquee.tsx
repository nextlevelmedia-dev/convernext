"use client"

import { useId, type ReactNode } from "react"

/*
 * Carosello che scorre sotto la hero: i punti forti di Convernext, ognuno con la sua icona
 * (solo il tratto a gradient, senza riquadro). Solo affermazioni vere.
 * Prestazioni: solo CSS (transform), si ferma al passaggio del mouse e con "riduci movimento".
 */

export type MarqueeKey = "home" | "ecommerce" | "siti-web" | "cro" | "temi-shopify"

type IconKey = "bag" | "immersive" | "convert" | "person" | "code" | "bolt" | "search" | "data" | "editor" | "chart"

const line = { fill: "none", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const

/* ogni icona ha il suo gradient con id unico: un id condiviso smette di funzionare
   se la prima copia è in un elemento nascosto (es. la versione desktop su mobile) */
function Svg({ children }: { children: ReactNode }) {
  const id = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 24 24" aria-hidden style={{ stroke: `url(#${id})`, fill: "none" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fc03b0" />
          <stop offset=".5" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#047cf9" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  )
}

const ICONS: Record<IconKey, ReactNode> = {
  bag: <Svg><path d="M5 8h14l-1.2 12.5H6.2Z" {...line} /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" {...line} /></Svg>,
  immersive: <Svg><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7Z" {...line} /><path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" {...line} /></Svg>,
  convert: <Svg><circle cx="12" cy="12" r="8.5" {...line} /><circle cx="12" cy="12" r="4.5" {...line} /><circle cx="12" cy="12" r="1.2" style={{ fill: "#7c3aed", stroke: "none" }} /></Svg>,
  person: <Svg><circle cx="12" cy="8" r="4" {...line} /><path d="M4 20.5c1.6-3.6 4.5-5.5 8-5.5s6.4 1.9 8 5.5" {...line} /></Svg>,
  code: <Svg><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" {...line} /></Svg>,
  bolt: <Svg><path d="M13.5 2.5 4.5 14h6.5l-1 7.5 9-11.5h-6.5Z" {...line} /></Svg>,
  search: <Svg><circle cx="10.5" cy="10.5" r="6.5" {...line} /><path d="m15.5 15.5 5 5" {...line} /></Svg>,
  data: <Svg><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...line} /></Svg>,
  editor: <Svg><rect x="3" y="3.5" width="18" height="17" rx="3" {...line} /><path d="M3 9h18M9 9v11.5" {...line} /></Svg>,
  chart: <Svg><path d="m3 17 5.5-5.5 4 4L21 7" {...line} /><path d="M15 7h6v6" {...line} /></Svg>,
}

type Item = [IconKey, string, string]

const ITEMS: Record<MarqueeKey, Item[]> = {
  home: [
    ["bag", "Esperti Shopify", "Store pensati per vendere"],
    ["immersive", "Esperienze immersive", "3D e animazioni, se servono"],
    ["convert", "Progettati per convertire", "Ogni sezione ha un compito"],
    ["person", "Un solo referente", "Parli con chi lavora al progetto"],
  ],
  ecommerce: [
    ["bag", "Esperti Shopify", "Setup, tema e integrazioni"],
    ["convert", "Pagine prodotto che vendono", "Chiare, credibili, veloci"],
    ["bolt", "Checkout veloce", "Pensato per il mobile"],
    ["person", "Un solo referente", "Parli con chi lavora al progetto"],
  ],
  "siti-web": [
    ["convert", "Pagine per convertire", "Ogni sezione ha un compito"],
    ["search", "SEO locale inclusa", "Ti trova chi cerca in zona"],
    ["bolt", "Veloci ovunque", "Desktop, tablet e smartphone"],
    ["code", "Su misura", "Niente template"],
  ],
  cro: [
    ["data", "Decisioni sui dati", "Analytics e voce dei clienti"],
    ["search", "Heatmap e sessioni", "Vediamo dove si bloccano"],
    ["convert", "A/B test quando serve", "Con traffico sufficiente"],
    ["chart", "Risultati misurati", "Report chiari nel tempo"],
  ],
  "temi-shopify": [
    ["code", "Sulla tua nicchia", "Tema costruito per te"],
    ["editor", "Gestisci tutto tu", "Dall'editor di Shopify"],
    ["immersive", "Sezioni immersive", "Opzionali, quando servono"],
    ["bolt", "Veloce e moderno", "Online Store 2.0"],
  ],
}

const CSS = `
  .hm-band {
    position: relative; width: 100%; flex-shrink: 0; overflow: hidden;
    border-block: 1px solid rgb(15 23 42 / 0.07);
    padding-block: 18px;
    font-family: var(--font-archivo), sans-serif;
    -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
            mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
  }
  .dark .hm-band { border-color: rgb(255 255 255 / 0.07); }
  .hm-track { display: flex; width: max-content; animation: hm-scroll 42s linear infinite; }
  .hm-band:hover .hm-track { animation-play-state: paused; }
  .hm-row { display: flex; flex-shrink: 0; align-items: center; margin: 0; padding: 0; list-style: none; }
  .hm-item {
    display: inline-flex; align-items: center; gap: 10px; white-space: nowrap;
    padding-inline: 28px;
    font-size: clamp(14.5px, 1.15vw, 17px); font-weight: 500; letter-spacing: -0.01em;
    color: rgb(15 23 42 / 0.78);
  }
  .dark .hm-item { color: rgb(255 255 255 / 0.8); }
  .hm-item + .hm-item { border-left: 1px solid rgb(15 23 42 / 0.1); }
  .dark .hm-item + .hm-item { border-color: rgb(255 255 255 / 0.1); }
  .hm-row + .hm-row .hm-item:first-child { border-left: 1px solid rgb(15 23 42 / 0.1); }
  .dark .hm-row + .hm-row .hm-item:first-child { border-color: rgb(255 255 255 / 0.1); }
  .hm-item svg { width: 19px; height: 19px; flex-shrink: 0; }
  @keyframes hm-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @media (max-width: 767px) {
    .hm-band { padding-block: 14px; }
    .hm-track { animation-duration: 32s; }
    .hm-item { padding-inline: 20px; gap: 8px; }
    .hm-item svg { width: 17px; height: 17px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .hm-track { animation: none; width: 100%; justify-content: center; }
    .hm-row[aria-hidden] { display: none; }
    .hm-row { flex-wrap: wrap; justify-content: center; row-gap: 10px; }
    .hm-item:nth-child(n+5) { display: none; }
  }
`

function Row({ items, hidden }: { items: Item[]; hidden?: boolean }) {
  return (
    <ul className="hm-row" aria-hidden={hidden || undefined}>
      {items.map(([icon, title], i) => (
        <li key={i} className="hm-item">
          {ICONS[icon]}
          {title}
        </li>
      ))}
    </ul>
  )
}

export default function HeroMarquee({ variant }: { variant: MarqueeKey }) {
  // i 4 punti ripetuti due volte: la riga deve essere più larga dello schermo
  const items = [...ITEMS[variant], ...ITEMS[variant]]
  return (
    <div className="hm-band" role="region" aria-label="I nostri punti di forza">
      <style>{CSS}</style>
      <div className="hm-track">
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  )
}
