/*
 * Banda che scorre sotto la hero: i punti forti di Convernext, uno dopo l'altro.
 * Solo affermazioni vere (niente numeri non dimostrabili).
 * Prestazioni: solo CSS (transform), si ferma al passaggio del mouse e con "riduci movimento".
 */

export type MarqueeKey = "home" | "ecommerce" | "siti-web" | "cro" | "temi-shopify"

const ITEMS: Record<MarqueeKey, string[]> = {
  home: [
    "Analisi del business prima del design",
    "Niente template, tutto su misura",
    "Un solo referente diretto",
    "Specialisti Shopify",
    "Esperienze immersive e 3D",
    "Siti veloci, pensati per il mobile",
    "Decisioni prese sui dati",
    "Risposta entro 24 ore",
  ],
  ecommerce: [
    "Pagine prodotto che convincono",
    "Checkout veloce da mobile",
    "Specialisti Shopify",
    "Niente template, tutto su misura",
    "Gestisci lo store in autonomia",
    "SEO e-commerce inclusa",
    "Un solo referente diretto",
    "Risposta entro 24 ore",
  ],
  "siti-web": [
    "Pagine costruite per convertire",
    "SEO locale inclusa",
    "Niente template, tutto su misura",
    "Veloce su ogni dispositivo",
    "Testi pensati per i tuoi clienti",
    "Un solo referente diretto",
    "Esperienze immersive se servono",
    "Risposta entro 24 ore",
  ],
  cro: [
    "Analisi prima degli interventi",
    "Heatmap e registrazioni delle sessioni",
    "A/B test quando il traffico lo permette",
    "Interventi ordinati per impatto",
    "Report chiari su cosa è cambiato",
    "Risultati misurati nel tempo",
    "Un solo referente diretto",
    "Risposta entro 24 ore",
  ],
  "temi-shopify": [
    "Tema costruito sulla tua nicchia",
    "Sezioni modulari dall'editor",
    "Video tutorial inclusi",
    "Gestisci tutto in autonomia",
    "Sezioni immersive opzionali",
    "Veloce e Online Store 2.0",
    "Supporto dopo il lancio",
    "Risposta entro 24 ore",
  ],
}

function Row({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul className="hm-row" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="hm-item">
          <span aria-hidden className="hm-dot" />
          {t}
        </li>
      ))}
    </ul>
  )
}

export default function HeroMarquee({ variant }: { variant: MarqueeKey }) {
  const items = ITEMS[variant]
  return (
    <div className="hm-band" role="region" aria-label="I nostri punti di forza">
      <style>{`
        .hm-band {
          position: relative;
          width: 100%;
          flex-shrink: 0;
          overflow: hidden;
          border-block: 1px solid rgb(15 23 42 / 0.08);
          padding-block: 18px;
          font-family: var(--font-archivo), sans-serif;
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
                  mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }
        .dark .hm-band { border-color: rgb(255 255 255 / 0.08); background: rgb(255 255 255 / 0.015); }
        .hm-track { display: flex; width: max-content; animation: hm-scroll 48s linear infinite; }
        .hm-band:hover .hm-track { animation-play-state: paused; }
        .hm-row { display: flex; flex-shrink: 0; align-items: center; margin: 0; padding: 0; list-style: none; }
        .hm-item {
          display: inline-flex; align-items: center; gap: 22px; padding-right: 22px; white-space: nowrap;
          font-size: clamp(15px, 1.3vw, 19px); font-weight: 600; letter-spacing: -0.01em;
          color: rgb(15 23 42 / 0.82);
        }
        .dark .hm-item { color: rgb(255 255 255 / 0.85); }
        .hm-dot {
          width: 9px; height: 9px; border-radius: 3px; transform: rotate(45deg); flex-shrink: 0;
          background: linear-gradient(135deg, #fc03b0, #7c3aed 50%, #047cf9);
          box-shadow: 0 0 12px rgb(124 58 237 / 0.55);
        }
        @keyframes hm-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 767px) { .hm-band { padding-block: 14px; } .hm-track { animation-duration: 36s; } }
        @media (prefers-reduced-motion: reduce) {
          .hm-track { animation: none; flex-wrap: wrap; width: 100%; justify-content: center; }
          .hm-row[aria-hidden] { display: none; }
          .hm-row { flex-wrap: wrap; justify-content: center; row-gap: 8px; }
        }
      `}</style>
      <div className="hm-track">
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  )
}
