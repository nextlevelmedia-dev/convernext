"use client"

import type { ReactNode } from "react"

/* =========================================================
   BRAND
========================================================= */

const gradStart = "#fc03b0"
const gradEnd = "#047cf9"

/* =========================================================
   SHARED VISUAL SHELL

   LIGHT:
   - background grigio chiaro
   - elementi interni chiari
   - testi scuri

   DARK:
   - mantiene il look blu scuro attuale
========================================================= */

function VisualShell({ children }: { children: ReactNode }) {
  return (
    <div className="vp-visual-card">
      <style>{`
        .vp-visual-card {
          --vp-bg-1: #f4f5f7;
          --vp-bg-2: #eef1f5;

          --vp-text: #0f172a;
          --vp-text-strong: #020617;
          --vp-muted: rgba(15, 23, 42, 0.48);
          --vp-muted-soft: rgba(15, 23, 42, 0.28);

          --vp-panel: rgba(255,255,255,0.82);
          --vp-panel-soft: rgba(255,255,255,0.58);
          --vp-panel-subtle: rgba(15,23,42,0.035);

          --vp-border: rgba(15,23,42,0.09);
          --vp-border-soft: rgba(15,23,42,0.055);

          --vp-line: rgba(15,23,42,0.08);
          --vp-line-strong: rgba(15,23,42,0.16);

          --vp-code-bg: rgba(15,23,42,0.92);

          width: 100%;
          aspect-ratio: 16 / 10;

          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          border-radius: 20px;

          background:
            linear-gradient(
              135deg,
              var(--vp-bg-1) 0%,
              var(--vp-bg-2) 100%
            );

          border: 1px solid var(--vp-border);

          box-shadow:
            0 24px 55px rgba(15,23,42,0.10),
            0 8px 22px rgba(15,23,42,0.06),
            inset 0 1px 0 rgba(255,255,255,0.9);

          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .dark .vp-visual-card {
          --vp-bg-1: #0d1b38;
          --vp-bg-2: #0a1628;

          --vp-text: rgba(255,255,255,0.88);
          --vp-text-strong: #ffffff;
          --vp-muted: rgba(255,255,255,0.45);
          --vp-muted-soft: rgba(255,255,255,0.24);

          --vp-panel: rgba(255,255,255,0.05);
          --vp-panel-soft: rgba(255,255,255,0.03);
          --vp-panel-subtle: rgba(255,255,255,0.02);

          --vp-border: rgba(255,255,255,0.07);
          --vp-border-soft: rgba(255,255,255,0.05);

          --vp-line: rgba(255,255,255,0.06);
          --vp-line-strong: rgba(255,255,255,0.12);

          --vp-code-bg: rgba(10,12,20,0.9);

          background:
            linear-gradient(
              135deg,
              var(--vp-bg-1) 0%,
              var(--vp-bg-2) 100%
            );

          border-color: rgba(255,255,255,0.07);

          box-shadow:
            0 24px 64px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .vp-visual-card svg {
          position: relative;
          z-index: 2;
        }
      `}</style>

      {children}
    </div>
  )
}

/* =========================================================
   ECOMMERCE — UX
========================================================= */

function EcommerceUXVisual() {
  // scheda prodotto animata (ciclo 8s): il cursore sceglie il colore, aggiunge al carrello,
  // il prodotto vola nel carrello e compare la conferma. I bordi del disegno sono fissi
  // (le card laterali si muovono di pochi px) così il ridimensionamento non scatta.
  return (
    <VisualShell>
      <style>{`
        .ux2 {
          --u-card: #ffffff;
          --u-card-b: rgba(15,23,42,0.09);
          --u-t: #0f172a;
          --u-m: rgba(15,23,42,0.52);
          --u-chip: #f1f3f8;
        }
        .dark .ux2 {
          --u-card: #12203d;
          --u-card-b: rgba(255,255,255,0.10);
          --u-t: #ffffff;
          --u-m: rgba(255,255,255,0.55);
          --u-chip: rgba(255,255,255,0.06);
        }
        .ux2 * { transform-box: fill-box; }

        @keyframes ux2-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        .ux2-f1 { animation: ux2-float 5s ease-in-out infinite; }
        .ux2-f2 { animation: ux2-float 5s ease-in-out infinite -1.6s; }
        .ux2-f3 { animation: ux2-float 5s ease-in-out infinite -3.2s; }

        @keyframes ux2-cursor {
          0%, 6%   { transform: translate(300px, 262px); }
          16%, 20% { transform: translate(222px, 246px); }
          30%, 38% { transform: translate(240px, 246px); }
          52%, 62% { transform: translate(262px, 292px); }
          80%, 100% { transform: translate(300px, 262px); }
        }
        .ux2-cursor { animation: ux2-cursor 8s cubic-bezier(.6,0,.3,1) infinite; transform-box: view-box; }

        @keyframes ux2-tap {
          0%, 17%, 23%, 35%, 41%, 58%, 66%, 100% { opacity: 0; transform: scale(.3); }
          18%, 36%, 59% { opacity: .9; transform: scale(.5); }
          21%, 39%, 63% { opacity: 0; transform: scale(1.5); }
        }
        .ux2-tap { animation: ux2-tap 8s linear infinite; transform-origin: center; }

        @keyframes ux2-ring {
          0%, 17%   { transform: translateX(0); }
          19%, 35%  { transform: translateX(18px); }
          37%, 94%  { transform: translateX(36px); }
          97%, 100% { transform: translateX(0); }
        }
        .ux2-ring { animation: ux2-ring 8s ease infinite; }

        @keyframes ux2-color {
          0%, 17%   { fill: #fc03b0; stroke: #fc03b0; }
          19%, 35%  { fill: #7c3aed; stroke: #7c3aed; }
          37%, 94%  { fill: #047cf9; stroke: #047cf9; }
          97%, 100% { fill: #fc03b0; stroke: #fc03b0; }
        }
        .ux2-prod { animation: ux2-color 8s ease infinite; }
        .ux2-prod-s { animation: ux2-color 8s ease infinite; fill: none !important; }

        @keyframes ux2-btn {
          0%, 58%, 66%, 100% { transform: scale(1); }
          60% { transform: scale(.94); }
          63% { transform: scale(1.03); }
        }
        .ux2-btn { animation: ux2-btn 8s ease infinite; transform-origin: center; }

        @keyframes ux2-fly {
          0%, 59%  { opacity: 0; transform: translate(0,0) scale(1); }
          61%      { opacity: 1; transform: translate(0,0) scale(1); }
          71%      { opacity: 1; transform: translate(48px,-66px) scale(.25); }
          73%, 100% { opacity: 0; transform: translate(48px,-66px) scale(.25); }
        }
        .ux2-fly { animation: ux2-fly 8s cubic-bezier(.5,0,.4,1) infinite; transform-origin: center; }

        @keyframes ux2-n1 { 0%, 71% { opacity: 1 } 72%, 95% { opacity: 0 } 97%, 100% { opacity: 1 } }
        @keyframes ux2-n2 { 0%, 71% { opacity: 0 } 72%, 95% { opacity: 1 } 97%, 100% { opacity: 0 } }
        .ux2-n1 { animation: ux2-n1 8s linear infinite; }
        .ux2-n2 { animation: ux2-n2 8s linear infinite; }
        @keyframes ux2-badge { 0%, 71%, 78%, 100% { transform: scale(1) } 74% { transform: scale(1.35) } }
        .ux2-badge { animation: ux2-badge 8s ease infinite; transform-origin: center; }

        @keyframes ux2-toast {
          0%, 63%  { opacity: 0; transform: translateX(14px); }
          67%, 92% { opacity: 1; transform: translateX(0); }
          96%, 100% { opacity: 0; transform: translateX(14px); }
        }
        .ux2-toast { animation: ux2-toast 8s ease infinite; }

        @keyframes ux2-heart { 0%, 40%, 100% { fill-opacity: 0 } 45%, 92% { fill-opacity: 1 } }
        .ux2-heart { animation: ux2-heart 8s ease infinite; }

        @keyframes ux2-spark { 0% { stroke-dashoffset: 120 } 40%, 100% { stroke-dashoffset: 0 } }
        .ux2-spark { stroke-dasharray: 120; animation: ux2-spark 8s ease-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ux2 *, .ux2-cursor { animation: none !important; }
          .ux2-toast, .ux2-n1 { opacity: 1; }
          .ux2-n2, .ux2-fly, .ux2-tap { opacity: 0; }
          .ux2-cursor { transform: translate(262px, 292px); }
          .ux2-prod { fill: #fc03b0; stroke: #fc03b0; }
          .ux2-spark { stroke-dashoffset: 0; }
        }
      `}</style>

      <svg
        className="ux2"
        viewBox="0 0 520 340"
        style={{ width: "92%", maxWidth: 500 }}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
      >
        <defs>
          <linearGradient id="ux2-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <linearGradient id="ux2-img" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(252,3,176,0.16)" />
            <stop offset="100%" stopColor="rgba(4,124,249,0.14)" />
          </linearGradient>
        </defs>

        {/* ---- card sinistra: checkout veloce ---- */}
        <g className="ux2-f1">
          <rect x="20" y="64" width="146" height="62" rx="14" fill="var(--u-card)" stroke="var(--u-card-b)" />
          <circle cx="40" cy="84" r="9" fill="url(#ux2-g)" />
          <path d="M36 84 l3 3 l5 -6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="56" y="81" fontSize="10" fontWeight="700" fill="var(--u-t)">Checkout in 1 tap</text>
          <text x="56" y="92" fontSize="7.5" fill="var(--u-m)">senza registrazione</text>
          {["Carta", "Wallet", "3 rate"].map((l, i) => (
            <g key={l}>
              <rect x={32 + i * 42} y="102" width="38" height="14" rx="7" fill="var(--u-chip)" stroke="var(--u-card-b)" />
              <text x={51 + i * 42} y="111.5" fontSize="7" fontWeight="600" textAnchor="middle" fill="var(--u-t)">{l}</text>
            </g>
          ))}
        </g>

        {/* ---- card sinistra: aggiunte al carrello ---- */}
        <g className="ux2-f2">
          <rect x="20" y="214" width="146" height="78" rx="14" fill="var(--u-card)" stroke="var(--u-card-b)" />
          <text x="34" y="234" fontSize="8" fontWeight="600" fill="var(--u-m)" letterSpacing="0.6">AGGIUNTE AL CARRELLO</text>
          <text x="34" y="258" fontSize="20" fontWeight="800" fill="url(#ux2-g)">+38%</text>
          <path className="ux2-spark" d="M34 280 L58 276 L80 278 L104 268 L128 266 L152 252" stroke="url(#ux2-g)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="152" cy="252" r="3" fill={gradEnd} />
        </g>

        {/* ---- telefono ---- */}
        <rect x="180" y="12" width="150" height="316" rx="26" fill="#0c1529" stroke="rgba(255,255,255,0.14)" />
        <rect x="180" y="12" width="150" height="316" rx="26" fill="none" stroke="url(#ux2-g)" strokeWidth="1.4" opacity="0.45" />
        <rect x="188" y="20" width="134" height="300" rx="20" fill="#111d38" />
        <rect x="235" y="26" width="40" height="7" rx="3.5" fill="#000" opacity="0.55" />

        {/* header: indietro + carrello */}
        <path d="M202 45 l-5 5 l5 5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M296 45 h3 l3 10 h9 l2 -7 h-13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="303.5" cy="58" r="1.3" fill="rgba(255,255,255,0.8)" />
        <circle cx="310" cy="58" r="1.3" fill="rgba(255,255,255,0.8)" />
        <g className="ux2-badge">
          <circle cx="314" cy="43" r="6" fill="url(#ux2-g)" />
          <text className="ux2-n1" x="314" y="45.6" fontSize="7.5" fontWeight="800" textAnchor="middle" fill="#fff">1</text>
          <text className="ux2-n2" x="314" y="45.6" fontSize="7.5" fontWeight="800" textAnchor="middle" fill="#fff">2</text>
        </g>

        {/* immagine prodotto */}
        <rect x="196" y="66" width="118" height="102" rx="14" fill="url(#ux2-img)" stroke="rgba(255,255,255,0.06)" />
        <ellipse cx="255" cy="152" rx="32" ry="4" fill="#000" opacity="0.25" />
        <path className="ux2-prod-s" d="M243 102 v-8 a12 12 0 0 1 24 0 v8" strokeWidth="4" strokeLinecap="round" />
        <rect className="ux2-prod" x="228" y="100" width="54" height="50" rx="9" />
        <rect x="228" y="100" width="54" height="50" rx="9" fill="url(#ux2-g)" opacity="0.18" />
        <rect x="236" y="108" width="18" height="4" rx="2" fill="#fff" opacity="0.35" />
        <path className="ux2-heart" d="M300 80 c-2 -3 -7 -2 -7 2 c0 3 4 5 7 8 c3 -3 7 -5 7 -8 c0 -4 -5 -5 -7 -2 z" fill={gradStart} stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
        <circle cx="247" cy="176" r="2.4" fill="url(#ux2-g)" />
        <circle cx="255" cy="176" r="1.8" fill="rgba(255,255,255,0.25)" />
        <circle cx="263" cy="176" r="1.8" fill="rgba(255,255,255,0.25)" />

        {/* dettagli */}
        <text x="198" y="196" fontSize="11" fontWeight="700" fill="#fff">Borsa Weekender</text>
        <text x="198" y="209" fontSize="8.5" fill="#fbbf24" letterSpacing="0.5">★★★★★</text>
        <text x="248" y="209" fontSize="7.5" fill="rgba(255,255,255,0.55)">4,9 (1.240)</text>
        <text x="198" y="229" fontSize="14" fontWeight="800" fill="#fff">€ 89</text>
        <text x="234" y="229" fontSize="8.5" fill="rgba(255,255,255,0.4)" textDecoration="line-through">€ 119</text>
        <rect x="264" y="220" width="30" height="12" rx="6" fill="rgba(252,3,176,0.18)" />
        <text x="279" y="229" fontSize="7.5" fontWeight="800" textAnchor="middle" fill="#ff5fcf">-25%</text>

        {/* colori */}
        <circle cx="204" cy="246" r="6" fill="#fc03b0" />
        <circle cx="222" cy="246" r="6" fill="#7c3aed" />
        <circle cx="240" cy="246" r="6" fill="#047cf9" />
        <circle className="ux2-ring" cx="204" cy="246" r="9" fill="none" stroke="#fff" strokeWidth="1.5" />
        <text x="256" y="249" fontSize="7.5" fill="#34d399" fontWeight="600">✓ Arriva domani</text>

        {/* bottone */}
        <g className="ux2-btn">
          <rect x="196" y="279" width="118" height="27" rx="13.5" fill="#fff" />
          <text x="255" y="296" fontSize="9.5" fontWeight="800" textAnchor="middle" fill="#0c1529">Aggiungi al carrello</text>
        </g>

        {/* prodotto che vola nel carrello */}
        <rect className="ux2-fly" x="246" y="112" width="18" height="16" rx="4" fill="url(#ux2-g)" />

        {/* ---- card destra: conferma ---- */}
        <g className="ux2-toast">
          <rect x="344" y="56" width="156" height="52" rx="14" fill="var(--u-card)" stroke="var(--u-card-b)" />
          <circle cx="366" cy="82" r="11" fill="url(#ux2-g)" />
          <path d="M361 82 l3.5 3.5 l6 -7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="384" y="79" fontSize="10" fontWeight="700" fill="var(--u-t)">Aggiunto al carrello</text>
          <text x="384" y="91" fontSize="7.5" fill="var(--u-m)">Borsa Weekender · € 89</text>
        </g>

        {/* ---- card destra: recensioni ---- */}
        <g className="ux2-f3">
          <rect x="344" y="212" width="156" height="80" rx="14" fill="var(--u-card)" stroke="var(--u-card-b)" />
          <text x="358" y="232" fontSize="8" fontWeight="600" fill="var(--u-m)" letterSpacing="0.6">RECENSIONI VERIFICATE</text>
          <text x="358" y="250" fontSize="11" fill="#fbbf24" letterSpacing="1">★★★★★</text>
          <text x="420" y="249" fontSize="11" fontWeight="800" fill="var(--u-t)">4,9</text>
          <circle cx="366" cy="272" r="8" fill="#fc03b0" stroke="var(--u-card)" strokeWidth="2" />
          <circle cx="378" cy="272" r="8" fill="#7c3aed" stroke="var(--u-card)" strokeWidth="2" />
          <circle cx="390" cy="272" r="8" fill="#047cf9" stroke="var(--u-card)" strokeWidth="2" />
          <text x="404" y="275" fontSize="8" fontWeight="600" fill="var(--u-t)">+1.200 clienti</text>
        </g>

        {/* ---- cursore ---- */}
        <g className="ux2-cursor">
          <circle className="ux2-tap" cx="0" cy="0" r="12" fill="none" stroke="#fff" strokeWidth="2" />
          <path d="M0 0 L0 16 L4.5 12 L7.5 19 L10.5 17.7 L7.5 11 L13 11 Z" fill="#fff" stroke="#0f172a" strokeWidth="1" strokeLinejoin="round" />
        </g>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   ECOMMERCE — VELOCITÀ CHE VENDE (solo pagina e-commerce)
========================================================= */

function EcommerceSpeedVisual() {
  // ciclo 6s: la pagina prodotto si carica (barra + scheletro → contenuto in 0,8 s),
  // poi crescono le barre "conversione per velocità di caricamento"
  const bars = [
    { label: "1 s", value: "3,1%", h: 118, hi: true },
    { label: "2 s", value: "2,3%", h: 86 },
    { label: "3 s", value: "1,6%", h: 58 },
    { label: "5 s", value: "0,9%", h: 32 },
  ]
  return (
    <VisualShell>
      <style>{`
        .sp2 {
          --s-card: #ffffff;
          --s-card-b: rgba(15,23,42,0.09);
          --s-t: #0f172a;
          --s-m: rgba(15,23,42,0.52);
          --s-bar: rgba(15,23,42,0.10);
          --s-grid: rgba(15,23,42,0.07);
        }
        .dark .sp2 {
          --s-card: #12203d;
          --s-card-b: rgba(255,255,255,0.10);
          --s-t: #ffffff;
          --s-m: rgba(255,255,255,0.55);
          --s-bar: rgba(255,255,255,0.12);
          --s-grid: rgba(255,255,255,0.06);
        }
        .sp2 * { transform-box: fill-box; }

        @keyframes sp2-load { 0% { transform: scaleX(0); opacity: 1 } 14% { transform: scaleX(1); opacity: 1 } 18%, 100% { transform: scaleX(1); opacity: 0 } }
        .sp2-load { animation: sp2-load 6s cubic-bezier(.3,0,.2,1) infinite; transform-origin: left center; }

        @keyframes sp2-skel { 0%, 13% { opacity: 1 } 17%, 94% { opacity: 0 } 98%, 100% { opacity: 1 } }
        .sp2-skel { animation: sp2-skel 6s ease infinite; }
        @keyframes sp2-shimmer { 0%, 100% { opacity: .55 } 50% { opacity: 1 } }
        .sp2-skel rect { animation: sp2-shimmer 1s ease-in-out infinite; }

        @keyframes sp2-content { 0%, 13% { opacity: 0; transform: translateY(4px) } 18%, 93% { opacity: 1; transform: translateY(0) } 98%, 100% { opacity: 0; transform: translateY(4px) } }
        .sp2-content { animation: sp2-content 6s ease infinite; }

        @keyframes sp2-chip { 0%, 16% { opacity: 0; transform: scale(.85) } 21%, 92% { opacity: 1; transform: scale(1) } 97%, 100% { opacity: 0; transform: scale(.85) } }
        .sp2-chip { animation: sp2-chip 6s ease infinite; transform-origin: center; }

        @keyframes sp2-bar { 0%, 18% { transform: scaleY(0) } 34%, 93% { transform: scaleY(1) } 99%, 100% { transform: scaleY(0) } }
        .sp2-bar { animation: sp2-bar 6s cubic-bezier(.3,.7,.2,1) infinite; transform-origin: bottom center; }
        .sp2-b1 { animation-delay: 0s } .sp2-b2 { animation-delay: .12s } .sp2-b3 { animation-delay: .24s } .sp2-b4 { animation-delay: .36s }

        @keyframes sp2-val { 0%, 30% { opacity: 0 } 38%, 92% { opacity: 1 } 97%, 100% { opacity: 0 } }
        .sp2-val { animation: sp2-val 6s ease infinite; }

        @keyframes sp2-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        .sp2-f1 { animation: sp2-float 5s ease-in-out infinite; }
        .sp2-f2 { animation: sp2-float 5s ease-in-out infinite -2.5s; }

        @media (prefers-reduced-motion: reduce) {
          .sp2 * { animation: none !important; }
          .sp2-skel, .sp2-load { opacity: 0; }
        }
      `}</style>

      <svg
        className="sp2"
        viewBox="0 0 520 340"
        style={{ width: "92%", maxWidth: 500 }}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
      >
        <defs>
          <linearGradient id="sp2-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <linearGradient id="sp2-gv" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={gradEnd} />
            <stop offset="100%" stopColor={gradStart} />
          </linearGradient>
          <linearGradient id="sp2-img" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(252,3,176,0.22)" />
            <stop offset="100%" stopColor="rgba(4,124,249,0.20)" />
          </linearGradient>
        </defs>

        {/* ---- telefono con pagina prodotto ---- */}
        <rect x="20" y="12" width="150" height="316" rx="26" fill="#0c1529" stroke="rgba(255,255,255,0.14)" />
        <rect x="20" y="12" width="150" height="316" rx="26" fill="none" stroke="url(#sp2-g)" strokeWidth="1.4" opacity="0.45" />
        <rect x="28" y="20" width="134" height="300" rx="20" fill="#111d38" />
        <rect x="75" y="26" width="40" height="7" rx="3.5" fill="#000" opacity="0.55" />

        {/* barra indirizzo + caricamento */}
        <rect x="38" y="42" width="114" height="16" rx="8" fill="rgba(255,255,255,0.06)" />
        <path d="M46 47.5 v-1.5 a2.5 2.5 0 0 1 5 0 v1.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
        <rect x="45" y="47.5" width="7" height="5.5" rx="1.2" fill="rgba(255,255,255,0.5)" />
        <text x="58" y="53.5" fontSize="7" fill="rgba(255,255,255,0.55)">tuostore.it/prodotto</text>
        <rect className="sp2-load" x="38" y="61" width="114" height="2" rx="1" fill="url(#sp2-g)" />

        {/* scheletro (prima del caricamento) */}
        <g className="sp2-skel">
          <rect x="38" y="70" width="114" height="104" rx="12" fill="rgba(255,255,255,0.07)" />
          <rect x="38" y="186" width="84" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="38" y="200" width="54" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
          <rect x="38" y="216" width="40" height="12" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="38" y="280" width="114" height="27" rx="13.5" fill="rgba(255,255,255,0.07)" />
        </g>

        {/* contenuto caricato */}
        <g className="sp2-content">
          <rect x="38" y="70" width="114" height="104" rx="12" fill="url(#sp2-img)" />
          <ellipse cx="95" cy="158" rx="30" ry="4" fill="#000" opacity="0.25" />
          <path d="M64 146 C64 132 70 120 80 116 L88 118 C92 124 100 126 106 124 L112 130 C122 132 132 137 132 146 Z" fill="url(#sp2-g)" />
          <path d="M64 146 h68 v4 a5 5 0 0 1 -5 5 h-58 a5 5 0 0 1 -5 -5 z" fill="#fff" opacity="0.92" />
          <path d="M92 128 l6 -3 M95 133 l7 -3 M98 138 l7 -3" stroke="#fff" strokeWidth="1.6" opacity="0.8" strokeLinecap="round" />
          <circle cx="74" cy="134" r="3" fill="#fff" opacity="0.35" />
          <text x="38" y="194" fontSize="11" fontWeight="700" fill="#fff">Sneaker Runner</text>
          <text x="38" y="207" fontSize="8.5" fill="#fbbf24" letterSpacing="0.5">★★★★★</text>
          <text x="38" y="228" fontSize="14" fontWeight="800" fill="#fff">€ 129</text>
          {["39", "40", "41", "42"].map((s, i) => (
            <g key={s}>
              <rect x={38 + i * 29} y="240" width="25" height="18" rx="6" fill={i === 2 ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.05)"} stroke={i === 2 ? "#7c3aed" : "rgba(255,255,255,0.12)"} />
              <text x={50.5 + i * 29} y="252" fontSize="8" fontWeight="600" textAnchor="middle" fill="#fff">{s}</text>
            </g>
          ))}
          <rect x="38" y="280" width="114" height="27" rx="13.5" fill="#fff" />
          <text x="95" y="297" fontSize="9.5" fontWeight="800" textAnchor="middle" fill="#0c1529">Acquista ora</text>
        </g>

        {/* chip tempo di caricamento */}
        <g className="sp2-chip">
          <rect x="92" y="78" width="54" height="18" rx="9" fill="#0c1529" stroke="rgba(52,211,153,0.6)" />
          <path d="M102 81 l-4 7 h4 l-2 6 l6 -8 h-4 l2 -5 z" fill="#34d399" />
          <text x="111" y="90.5" fontSize="8" fontWeight="800" fill="#34d399">0,8 s</text>
        </g>

        {/* ---- grafico: conversione per velocità ---- */}
        <g className="sp2-f1">
          <rect x="194" y="12" width="306" height="232" rx="16" fill="var(--s-card)" stroke="var(--s-card-b)" />
          <text x="214" y="38" fontSize="12" fontWeight="800" fill="var(--s-t)">Conversione per velocità</text>
          <text x="214" y="52" fontSize="8" fill="var(--s-m)">Tasso di conversione in base al tempo di caricamento</text>
          {[0, 1, 2].map((i) => (
            <line key={i} x1="214" x2="480" y1={100 + i * 36} y2={100 + i * 36} stroke="var(--s-grid)" strokeDasharray="3 4" />
          ))}
          <line x1="214" x2="480" y1="208" y2="208" stroke="var(--s-bar)" />
          {bars.map((b, i) => {
            const x = 228 + i * 64
            return (
              <g key={b.label}>
                <rect
                  className={`sp2-bar sp2-b${i + 1}`}
                  x={x}
                  y={208 - b.h}
                  width="44"
                  height={b.h}
                  rx="8"
                  fill={b.hi ? "url(#sp2-gv)" : "var(--s-bar)"}
                />
                <text className="sp2-val" x={x + 22} y={202 - b.h} fontSize="10" fontWeight="800" textAnchor="middle" fill={b.hi ? "var(--s-t)" : "var(--s-m)"}>
                  {b.value}
                </text>
                <text x={x + 22} y="226" fontSize="8.5" fontWeight="600" textAnchor="middle" fill="var(--s-m)">
                  {b.label}
                </text>
              </g>
            )
          })}
          <g className="sp2-val">
            <path d="M286 80 L280 84 L286 88 Z" fill={gradStart} />
            <rect x="285" y="75" width="64" height="18" rx="9" fill="url(#sp2-g)" />
            <text x="317" y="87" fontSize="8" fontWeight="800" textAnchor="middle" fill="#fff">Il tuo store</text>
          </g>
        </g>

        {/* ---- badge sotto ---- */}
        <g className="sp2-f2">
          <rect x="194" y="262" width="148" height="44" rx="14" fill="var(--s-card)" stroke="var(--s-card-b)" />
          <circle cx="215" cy="284" r="10" fill="rgba(52,211,153,0.16)" />
          <path d="M210.5 284 l3 3 l5.5 -6" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="232" y="281" fontSize="9.5" fontWeight="700" fill="var(--s-t)">Core Web Vitals</text>
          <text x="232" y="293" fontSize="7.5" fill="var(--s-m)">superati su mobile</text>

          <rect x="352" y="262" width="148" height="44" rx="14" fill="var(--s-card)" stroke="var(--s-card-b)" />
          <text x="368" y="290" fontSize="18" fontWeight="800" fill="url(#sp2-g)">-1,6 s</text>
          <text x="428" y="281" fontSize="7.5" fill="var(--s-m)">tempo di</text>
          <text x="428" y="292" fontSize="7.5" fill="var(--s-m)">caricamento</text>
        </g>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   ECOMMERCE — VALORE MEDIO DELL'ORDINE
========================================================= */

function EcommerceValoreVisual() {
  // carrello animato (ciclo 7s): il cursore aggiunge il prodotto abbinato, si sblocca la
  // spedizione gratuita e lo scontrino passa da € 89 a € 118
  return (
    <VisualShell>
      <style>{`
        .va2 {
          --v-card: #ffffff;
          --v-card-b: rgba(15,23,42,0.09);
          --v-t: #0f172a;
          --v-m: rgba(15,23,42,0.52);
          --v-track: rgba(15,23,42,0.08);
        }
        .dark .va2 {
          --v-card: #12203d;
          --v-card-b: rgba(255,255,255,0.10);
          --v-t: #ffffff;
          --v-m: rgba(255,255,255,0.55);
          --v-track: rgba(255,255,255,0.10);
        }
        .va2 * { transform-box: fill-box; }

        @keyframes va2-cursor {
          0%, 6%   { transform: translate(300px, 300px); }
          22%, 34% { transform: translate(290px, 225px); }
          50%, 100% { transform: translate(300px, 300px); }
        }
        .va2-cursor { animation: va2-cursor 7s cubic-bezier(.6,0,.3,1) infinite; transform-box: view-box; }
        @keyframes va2-tap { 0%, 25%, 34%, 100% { opacity: 0; transform: scale(.3) } 27% { opacity: .9; transform: scale(.5) } 31% { opacity: 0; transform: scale(1.5) } }
        .va2-tap { animation: va2-tap 7s linear infinite; transform-origin: center; }

        /* stato "prima" visibile fino al click, poi lo stato "dopo" */
        @keyframes va2-before { 0%, 27% { opacity: 1 } 29%, 94% { opacity: 0 } 97%, 100% { opacity: 1 } }
        @keyframes va2-after  { 0%, 27% { opacity: 0 } 29%, 94% { opacity: 1 } 97%, 100% { opacity: 0 } }
        .va2-b { animation: va2-before 7s linear infinite; }
        .va2-a { animation: va2-after 7s linear infinite; }

        @keyframes va2-in { 0%, 27% { opacity: 0; transform: translateY(-6px) } 32%, 94% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0; transform: translateY(-6px) } }
        .va2-in { animation: va2-in 7s ease infinite; }

        @keyframes va2-bar { 0%, 28% { transform: scaleX(.89) } 36%, 94% { transform: scaleX(1) } 98%, 100% { transform: scaleX(.89) } }
        .va2-bar { animation: va2-bar 7s cubic-bezier(.3,.7,.2,1) infinite; transform-origin: left center; }

        @keyframes va2-grow { 0%, 28% { transform: scaleX(.75) } 38%, 94% { transform: scaleX(1) } 98%, 100% { transform: scaleX(.75) } }
        .va2-grow { animation: va2-grow 7s cubic-bezier(.3,.7,.2,1) infinite; transform-origin: left center; }

        @keyframes va2-pop { 0%, 28%, 40%, 100% { transform: scale(1) } 33% { transform: scale(1.12) } }
        .va2-pop { animation: va2-pop 7s ease infinite; transform-origin: center; }

        @keyframes va2-toast { 0%, 31% { opacity: 0; transform: translateX(14px) } 36%, 90% { opacity: 1; transform: translateX(0) } 95%, 100% { opacity: 0; transform: translateX(14px) } }
        .va2-toast { animation: va2-toast 7s ease infinite; }

        @keyframes va2-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        .va2-f1 { animation: va2-float 5s ease-in-out infinite; }
        .va2-f2 { animation: va2-float 5s ease-in-out infinite -2.5s; }

        @media (prefers-reduced-motion: reduce) {
          .va2 *, .va2-cursor { animation: none !important; }
          .va2-b, .va2-tap { opacity: 0; }
          .va2-a, .va2-in, .va2-toast { opacity: 1; }
          .va2-cursor { transform: translate(300px, 300px); }
        }
      `}</style>

      <svg
        className="va2"
        viewBox="0 0 520 340"
        style={{ width: "92%", maxWidth: 500 }}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
      >
        <defs>
          <linearGradient id="va2-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <linearGradient id="va2-g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        </defs>

        {/* ---- sinistra: scontrino medio ---- */}
        <g className="va2-f1">
          <rect x="20" y="58" width="146" height="92" rx="14" fill="var(--v-card)" stroke="var(--v-card-b)" />
          <text x="34" y="80" fontSize="8" fontWeight="600" fill="var(--v-m)" letterSpacing="0.6">SCONTRINO MEDIO</text>
          <text className="va2-b" x="34" y="108" fontSize="24" fontWeight="800" fill="var(--v-t)">€ 89</text>
          <text className="va2-a" x="34" y="108" fontSize="24" fontWeight="800" fill="url(#va2-g)">€ 118</text>
          <g className="va2-in">
            <rect x="112" y="92" width="42" height="18" rx="9" fill="rgba(52,211,153,0.15)" />
            <text x="133" y="104.5" fontSize="8.5" fontWeight="800" textAnchor="middle" fill="#34d399">↑ 33%</text>
          </g>
          <text x="34" y="132" fontSize="7.5" fill="var(--v-m)">stesse visite, più fatturato</text>
        </g>

        {/* ---- sinistra: prima / dopo ---- */}
        <g className="va2-f2">
          <rect x="20" y="180" width="146" height="100" rx="14" fill="var(--v-card)" stroke="var(--v-card-b)" />
          <text x="34" y="202" fontSize="8" fontWeight="600" fill="var(--v-m)" letterSpacing="0.6">FATTURATO / MESE</text>
          <text x="34" y="224" fontSize="7.5" fill="var(--v-m)">Prima</text>
          <rect x="34" y="229" width="90" height="10" rx="5" fill="var(--v-track)" />
          <text x="34" y="256" fontSize="7.5" fill="var(--v-m)">Dopo</text>
          <rect className="va2-grow" x="34" y="261" width="120" height="10" rx="5" fill="url(#va2-g)" />
        </g>

        {/* ---- telefono: carrello ---- */}
        <rect x="180" y="12" width="150" height="316" rx="26" fill="#0c1529" stroke="rgba(255,255,255,0.14)" />
        <rect x="180" y="12" width="150" height="316" rx="26" fill="none" stroke="url(#va2-g)" strokeWidth="1.4" opacity="0.45" />
        <rect x="188" y="20" width="134" height="300" rx="20" fill="#111d38" />
        <rect x="235" y="26" width="40" height="7" rx="3.5" fill="#000" opacity="0.55" />

        <text x="198" y="54" fontSize="11" fontWeight="800" fill="#fff">Carrello</text>
        <text className="va2-b" x="246" y="54" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.5)">(1)</text>
        <text className="va2-a" x="246" y="54" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.5)">(2)</text>
        <path d="M304 46 l8 8 M312 46 l-8 8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />

        {/* articolo 1 */}
        <rect x="196" y="64" width="30" height="30" rx="8" fill="url(#va2-g)" />
        <path d="M206 75 v-2 a5 5 0 0 1 10 0 v2" stroke="#fff" strokeWidth="1.4" fill="none" />
        <rect x="203" y="74" width="16" height="13" rx="3" fill="#fff" opacity="0.9" />
        <text x="232" y="77" fontSize="8.5" fontWeight="700" fill="#fff">Borsa Weekender</text>
        <text x="232" y="89" fontSize="7" fill="rgba(255,255,255,0.5)">Nero · 1 pz</text>
        <text x="314" y="89" fontSize="9" fontWeight="800" textAnchor="end" fill="#fff">€ 89</text>

        {/* articolo 2 (aggiunto) */}
        <g className="va2-in">
          <rect x="196" y="102" width="30" height="30" rx="8" fill="url(#va2-g2)" />
          <rect x="203" y="111" width="16" height="12" rx="3" fill="#fff" opacity="0.9" />
          <line x1="203" x2="219" y1="115" y2="115" stroke="#7c3aed" strokeWidth="1.2" />
          <text x="232" y="115" fontSize="8.5" fontWeight="700" fill="#fff">Portafoglio</text>
          <text x="232" y="127" fontSize="7" fill="rgba(255,255,255,0.5)">Abbinato · 1 pz</text>
          <text x="314" y="127" fontSize="9" fontWeight="800" textAnchor="end" fill="#fff">€ 29</text>
        </g>

        {/* spedizione gratuita */}
        <rect x="196" y="142" width="118" height="36" rx="10" fill="rgba(255,255,255,0.05)" />
        <text x="204" y="157" fontSize="7.5" fontWeight="700" fill="#fff">Spedizione gratis</text>
        <text className="va2-b" x="306" y="157" fontSize="7" textAnchor="end" fill="rgba(255,255,255,0.55)">mancano € 11</text>
        <text className="va2-a" x="306" y="157" fontSize="7" fontWeight="800" textAnchor="end" fill="#34d399">sbloccata ✓</text>
        <rect x="204" y="164" width="102" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <rect className="va2-bar" x="204" y="164" width="102" height="6" rx="3" fill="url(#va2-g)" />

        {/* suggerimento */}
        <rect x="196" y="188" width="118" height="54" rx="10" fill="rgba(124,58,237,0.13)" stroke="rgba(124,58,237,0.4)" />
        <text x="204" y="201" fontSize="6" fontWeight="700" fill="rgba(255,255,255,0.55)" letterSpacing="0.6">SPESSO COMPRATI INSIEME</text>
        <rect x="204" y="208" width="26" height="26" rx="7" fill="url(#va2-g2)" />
        <rect x="209" y="215" width="16" height="12" rx="3" fill="#fff" opacity="0.9" />
        <text x="235" y="219" fontSize="7" fontWeight="700" fill="#fff">Portafoglio</text>
        <text x="235" y="230" fontSize="7" fill="rgba(255,255,255,0.55)">€ 29</text>
        <g className="va2-pop">
          <rect className="va2-b" x="273" y="216" width="35" height="17" rx="8.5" fill="#fff" />
          <text className="va2-b" x="290.5" y="227.5" fontSize="6.5" fontWeight="800" textAnchor="middle" fill="#0c1529">+ Aggiungi</text>
          <rect className="va2-a" x="273" y="216" width="35" height="17" rx="8.5" fill="rgba(52,211,153,0.18)" stroke="rgba(52,211,153,0.6)" />
          <text className="va2-a" x="290.5" y="227.5" fontSize="6.5" fontWeight="800" textAnchor="middle" fill="#34d399">Aggiunto</text>
        </g>

        {/* totale + checkout */}
        <text x="198" y="264" fontSize="8" fill="rgba(255,255,255,0.55)">Totale</text>
        <g className="va2-pop">
          <text className="va2-b" x="312" y="265" fontSize="12" fontWeight="800" textAnchor="end" fill="#fff">€ 89</text>
          <text className="va2-a" x="312" y="265" fontSize="12" fontWeight="800" textAnchor="end" fill="#fff">€ 118</text>
        </g>
        <rect x="196" y="278" width="118" height="28" rx="14" fill="#fff" />
        <text x="255" y="295.5" fontSize="9.5" fontWeight="800" textAnchor="middle" fill="#0c1529">Vai al checkout</text>

        {/* ---- destra: bundle ---- */}
        <g className="va2-f2">
          <rect x="344" y="58" width="156" height="92" rx="14" fill="var(--v-card)" stroke="var(--v-card-b)" />
          <text x="358" y="80" fontSize="8" fontWeight="600" fill="var(--v-m)" letterSpacing="0.6">BUNDLE</text>
          <rect x="358" y="90" width="30" height="30" rx="8" fill="url(#va2-g)" />
          <rect x="365" y="100" width="16" height="13" rx="3" fill="#fff" opacity="0.9" />
          <text x="396" y="110" fontSize="12" fontWeight="800" fill="var(--v-m)">+</text>
          <rect x="406" y="90" width="30" height="30" rx="8" fill="url(#va2-g2)" />
          <rect x="413" y="99" width="16" height="12" rx="3" fill="#fff" opacity="0.9" />
          <rect x="446" y="96" width="42" height="18" rx="9" fill="rgba(252,3,176,0.15)" />
          <text x="467" y="108.5" fontSize="8.5" fontWeight="800" textAnchor="middle" fill="#ff5fcf">-10%</text>
          <text x="358" y="138" fontSize="7.5" fill="var(--v-m)">se li prendi insieme</text>
        </g>

        {/* ---- destra: notifica ---- */}
        <g className="va2-toast">
          <rect x="344" y="190" width="156" height="52" rx="14" fill="var(--v-card)" stroke="var(--v-card-b)" />
          <circle cx="366" cy="216" r="11" fill="rgba(52,211,153,0.16)" />
          <path d="M361 216 l3.5 3.5 l6 -7" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="384" y="213" fontSize="9.5" fontWeight="700" fill="var(--v-t)">Spedizione gratuita</text>
          <text x="384" y="225" fontSize="7.5" fill="var(--v-m)">sbloccata con l&apos;abbinato</text>
        </g>

        {/* ---- cursore ---- */}
        <g className="va2-cursor">
          <circle className="va2-tap" cx="0" cy="0" r="12" fill="none" stroke="#fff" strokeWidth="2" />
          <path d="M0 0 L0 16 L4.5 12 L7.5 19 L10.5 17.7 L7.5 11 L13 11 Z" fill="#fff" stroke="#0f172a" strokeWidth="1" strokeLinejoin="round" />
        </g>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   ECOMMERCE — PERFORMANCE
========================================================= */

function EcommercePerformanceVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes perf-score {
          from { stroke-dashoffset: 283; }
          to { stroke-dashoffset: 14; }
        }

        @keyframes perf-glow {
          0%,100% {
            filter: drop-shadow(0 0 6px #22c55e);
          }
          50% {
            filter: drop-shadow(0 0 16px #22c55e);
          }
        }

        @keyframes perf-num {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes perf-bar1 {
          from { width: 0; }
          to { width: 150px; }
        }

        @keyframes perf-bar2 {
          from { width: 0; }
          to { width: 186px; }
        }

        @keyframes perf-bar3 {
          from { width: 0; }
          to { width: 176px; }
        }

        .perf-circle {
          animation: perf-score 1.8s cubic-bezier(0.4,0,0.2,1) forwards 0.3s;
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
        }

        .perf-glow {
          animation: perf-glow 2s ease-in-out infinite 2s;
        }

        .perf-num {
          animation: perf-num 0.5s ease forwards 1.8s;
          opacity: 0;
        }

        .perf-bar1 {
          animation: perf-bar1 1s cubic-bezier(0.4,0,0.2,1) forwards 0.8s;
        }

        .perf-bar2 {
          animation: perf-bar2 1s cubic-bezier(0.4,0,0.2,1) forwards 1.1s;
        }

        .perf-bar3 {
          animation: perf-bar3 1s cubic-bezier(0.4,0,0.2,1) forwards 1.4s;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.08) 0%, transparent 60%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "90%", maxWidth: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="p-green" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        <rect
          x="60"
          y="40"
          width="400"
          height="240"
          rx="14"
          fill="var(--vp-panel)"
          stroke="var(--vp-border)"
        />

        <rect
          x="60"
          y="40"
          width="400"
          height="36"
          rx="14"
          fill="var(--vp-panel-soft)"
        />

        <rect
          x="60"
          y="62"
          width="400"
          height="14"
          fill="var(--vp-panel-soft)"
        />

        <circle cx="82" cy="58" r="5" fill="#fb7185" />
        <circle cx="98" cy="58" r="5" fill="#facc15" />
        <circle cx="114" cy="58" r="5" fill="#22c55e" />

        <rect
          x="148"
          y="50"
          width="220"
          height="16"
          rx="8"
          fill="var(--vp-panel-subtle)"
          stroke="var(--vp-border)"
        />

        <rect
          x="158"
          y="55"
          width="100"
          height="6"
          rx="3"
          fill="var(--vp-muted)"
        />

        <g className="perf-glow">
          <circle
            cx="170"
            cy="175"
            r="52"
            fill="none"
            stroke="rgba(34,197,94,0.1)"
            strokeWidth="8"
          />

          <circle
            className="perf-circle"
            cx="170"
            cy="175"
            r="45"
            fill="none"
            stroke="url(#p-green)"
            strokeWidth="6"
            strokeLinecap="round"
            transform="rotate(-90 170 175)"
          />
        </g>

        <g className="perf-num">
          <text
            x="170"
            y="181"
            textAnchor="middle"
            fontSize="32"
            fontWeight="800"
            fill="var(--vp-text-strong)"
          >
            95
          </text>

          <text
            x="170"
            y="197"
            textAnchor="middle"
            fontSize="9"
            fill="var(--vp-muted)"
            letterSpacing="1"
          >
            PERFORMANCE
          </text>
        </g>

        <g transform="translate(248,105)">
          <text fontSize="9" fill="var(--vp-muted)">
            FIRST CONTENTFUL PAINT
          </text>

          <text
            y="18"
            fontSize="16"
            fontWeight="700"
            fill="var(--vp-text-strong)"
          >
            1.2s
          </text>

          <rect
            y="24"
            width="200"
            height="6"
            rx="3"
            fill="var(--vp-line)"
          />

          <rect
            className="perf-bar1"
            y="24"
            height="6"
            rx="3"
            fill="url(#p-green)"
            style={{ width: 0 }}
          />

          <text y="52" fontSize="9" fill="var(--vp-muted)">
            FIRST INPUT DELAY
          </text>

          <text
            y="70"
            fontSize="16"
            fontWeight="700"
            fill="var(--vp-text-strong)"
          >
            12ms
          </text>

          <rect
            y="76"
            width="200"
            height="6"
            rx="3"
            fill="var(--vp-line)"
          />

          <rect
            className="perf-bar2"
            y="76"
            height="6"
            rx="3"
            fill="url(#p-green)"
            style={{ width: 0 }}
          />

          <text y="104" fontSize="9" fill="var(--vp-muted)">
            LARGEST CONTENTFUL PAINT
          </text>

          <text
            y="122"
            fontSize="16"
            fontWeight="700"
            fill="var(--vp-text-strong)"
          >
            0.9s
          </text>

          <rect
            y="128"
            width="200"
            height="6"
            rx="3"
            fill="var(--vp-line)"
          />

          <rect
            className="perf-bar3"
            y="128"
            height="6"
            rx="3"
            fill="url(#p-green)"
            style={{ width: 0 }}
          />
        </g>

        <g transform="translate(248,248)">
          <rect
            width="120"
            height="22"
            rx="11"
            fill="rgba(34,197,94,0.12)"
            stroke="rgba(34,197,94,0.3)"
          />

          <text
            x="12"
            y="15"
            fontSize="10"
            fill="#22c55e"
            fontWeight="700"
          >
            ✓ Fast (90-100)
          </text>
        </g>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   ECOMMERCE — SCALABILE
========================================================= */

function EcommerceScalabileVisual() {
  // dashboard dello store al centro: integrazioni a sinistra che "alimentano" lo store
  // (flussi animati), feed ordini live a destra e canali di vendita sotto. Ciclo 6s.
  const integrations = [
    { label: "Pagamenti", sub: "Carte, wallet, rate", y: 52, icon: "card" },
    { label: "Spedizioni", sub: "Etichette automatiche", y: 128, icon: "box" },
    { label: "Magazzino", sub: "Stock sincronizzato", y: 204, icon: "stack" },
  ]
  const feed = [
    { t: "Nuovo ordine", s: "#1048 · € 89", c: gradStart, y: 52 },
    { t: "Pagamento ricevuto", s: "#1047 · € 129", c: "#7c3aed", y: 116 },
    { t: "Ordine spedito", s: "#1046 · Milano", c: gradEnd, y: 180 },
  ]
  const channels = ["Sito", "Instagram", "Google", "Marketplace"]
  return (
    <VisualShell>
      <style>{`
        .sc2 {
          --c-card: #ffffff;
          --c-card-b: rgba(15,23,42,0.09);
          --c-t: #0f172a;
          --c-m: rgba(15,23,42,0.52);
          --c-chip: #f1f3f8;
          --c-line: rgba(15,23,42,0.14);
          --c-grid: rgba(15,23,42,0.07);
        }
        .dark .sc2 {
          --c-card: #12203d;
          --c-card-b: rgba(255,255,255,0.10);
          --c-t: #ffffff;
          --c-m: rgba(255,255,255,0.55);
          --c-chip: rgba(255,255,255,0.06);
          --c-line: rgba(255,255,255,0.16);
          --c-grid: rgba(255,255,255,0.06);
        }
        .sc2 * { transform-box: fill-box; }

        @keyframes sc2-flow { to { stroke-dashoffset: -24 } }
        .sc2-flow { stroke-dasharray: 4 8; animation: sc2-flow 1.2s linear infinite; }

        @keyframes sc2-draw { 0% { stroke-dashoffset: 260 } 45%, 100% { stroke-dashoffset: 0 } }
        .sc2-line { stroke-dasharray: 260; animation: sc2-draw 6s cubic-bezier(.4,0,.2,1) infinite; }
        @keyframes sc2-area { 0%, 10% { opacity: 0 } 45%, 92% { opacity: 1 } 100% { opacity: 0 } }
        .sc2-area { animation: sc2-area 6s ease infinite; }

        @keyframes sc2-live { 0%,100% { opacity: 1; transform: scale(1) } 50% { opacity: .35; transform: scale(.7) } }
        .sc2-live { animation: sc2-live 1.4s ease-in-out infinite; transform-origin: center; }

        @keyframes sc2-feed {
          0%, 4%  { opacity: 0; transform: translateX(12px); }
          10%, 88% { opacity: 1; transform: translateX(0); }
          96%, 100% { opacity: 0; transform: translateX(0); }
        }
        .sc2-feed { animation: sc2-feed 6s ease infinite; }
        .sc2-d1 { animation-delay: 0s } .sc2-d2 { animation-delay: .5s } .sc2-d3 { animation-delay: 1s }

        @keyframes sc2-ping { 0%, 40% { opacity: 0; transform: scale(.6) } 50% { opacity: .9; transform: scale(1) } 70%, 100% { opacity: 0; transform: scale(1.8) } }
        .sc2-ping { animation: sc2-ping 2.4s ease-out infinite; transform-origin: center; }

        @keyframes sc2-num1 { 0%, 45% { opacity: 1 } 50%, 95% { opacity: 0 } 100% { opacity: 1 } }
        @keyframes sc2-num2 { 0%, 45% { opacity: 0 } 50%, 95% { opacity: 1 } 100% { opacity: 0 } }
        .sc2-n1 { animation: sc2-num1 6s linear infinite; }
        .sc2-n2 { animation: sc2-num2 6s linear infinite; }

        @keyframes sc2-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        .sc2-float { animation: sc2-float 5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .sc2 * { animation: none !important; }
          .sc2-feed, .sc2-area, .sc2-n2 { opacity: 1; }
          .sc2-n1, .sc2-ping { opacity: 0; }
          .sc2-line { stroke-dashoffset: 0; }
        }
      `}</style>

      <svg
        className="sc2"
        viewBox="0 0 520 340"
        style={{ width: "92%", maxWidth: 500 }}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
      >
        <defs>
          <linearGradient id="sc2-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <linearGradient id="sc2-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ---- connessioni integrazioni → store ---- */}
        {integrations.map((it) => (
          <path
            key={it.label}
            className="sc2-flow"
            d={`M128 ${it.y + 22} C 140 ${it.y + 22}, 140 128, 152 128`}
            stroke="url(#sc2-g)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        ))}
        {/* store → feed */}
        {feed.map((f) => (
          <path
            key={f.t}
            className="sc2-flow"
            d={`M368 128 C 378 128, 378 ${f.y + 22}, 388 ${f.y + 22}`}
            stroke="var(--c-line)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
        ))}

        {/* ---- integrazioni ---- */}
        {integrations.map((it) => (
          <g key={it.label}>
            <rect x="12" y={it.y} width="116" height="44" rx="12" fill="var(--c-card)" stroke="var(--c-card-b)" />
            <rect x="22" y={it.y + 10} width="24" height="24" rx="7" fill="url(#sc2-g)" />
            {it.icon === "card" && (
              <g stroke="#fff" strokeWidth="1.4" fill="none">
                <rect x="27" y={it.y + 16} width="14" height="11" rx="2" />
                <line x1="27" x2="41" y1={it.y + 20} y2={it.y + 20} />
              </g>
            )}
            {it.icon === "box" && (
              <g stroke="#fff" strokeWidth="1.4" fill="none" strokeLinejoin="round">
                <path d={`M34 ${it.y + 15} l7 3.5 v8 l-7 3.5 l-7 -3.5 v-8 z`} />
                <path d={`M27 ${it.y + 18.5} l7 3.5 l7 -3.5 M34 ${it.y + 22} v8`} />
              </g>
            )}
            {it.icon === "stack" && (
              <g stroke="#fff" strokeWidth="1.4" fill="none" strokeLinejoin="round">
                <path d={`M34 ${it.y + 15} l7 3.5 l-7 3.5 l-7 -3.5 z`} />
                <path d={`M27 ${it.y + 22.5} l7 3.5 l7 -3.5 M27 ${it.y + 26.5} l7 3.5 l7 -3.5`} />
              </g>
            )}
            <text x="54" y={it.y + 20} fontSize="9.5" fontWeight="700" fill="var(--c-t)">{it.label}</text>
            <text x="54" y={it.y + 31} fontSize="6.8" fill="var(--c-m)">{it.sub}</text>
          </g>
        ))}

        {/* ---- dashboard store ---- */}
        <g className="sc2-float">
          <rect x="152" y="30" width="216" height="210" rx="18" fill="var(--c-card)" stroke="var(--c-card-b)" />
          <rect x="152" y="30" width="216" height="210" rx="18" fill="none" stroke="url(#sc2-g)" strokeWidth="1.4" opacity="0.5" />
          <text x="170" y="56" fontSize="10" fontWeight="700" fill="var(--c-t)">Il tuo store</text>
          <circle className="sc2-ping" cx="322" cy="52" r="7" fill="none" stroke="#34d399" strokeWidth="1.5" />
          <circle className="sc2-live" cx="322" cy="52" r="3" fill="#34d399" />
          <text x="330" y="55" fontSize="7.5" fontWeight="800" fill="#34d399" letterSpacing="0.8">LIVE</text>

          <text x="170" y="78" fontSize="7.5" fontWeight="600" fill="var(--c-m)" letterSpacing="0.6">FATTURATO DEL MESE</text>
          <text className="sc2-n1" x="170" y="102" fontSize="22" fontWeight="800" fill="var(--c-t)">€ 31.960</text>
          <text className="sc2-n2" x="170" y="102" fontSize="22" fontWeight="800" fill="var(--c-t)">€ 32.480</text>
          <rect x="294" y="88" width="46" height="16" rx="8" fill="rgba(52,211,153,0.15)" />
          <text x="317" y="99" fontSize="8" fontWeight="800" textAnchor="middle" fill="#34d399">↑ 18%</text>

          {[0, 1, 2].map((i) => (
            <line key={i} x1="170" x2="350" y1={124 + i * 22} y2={124 + i * 22} stroke="var(--c-grid)" strokeDasharray="3 4" />
          ))}
          <path className="sc2-area" d="M170 178 L196 170 L222 172 L248 158 L274 160 L300 142 L326 136 L350 120 L350 180 L170 180 Z" fill="url(#sc2-area)" />
          <path className="sc2-line" d="M170 178 L196 170 L222 172 L248 158 L274 160 L300 142 L326 136 L350 120" stroke="url(#sc2-g)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="350" cy="120" r="3.5" fill={gradEnd} stroke="var(--c-card)" strokeWidth="2" />

          <line x1="166" x2="354" y1="192" y2="192" stroke="var(--c-grid)" />
          {[
            { k: "Ordini", v: "247", x: 170 },
            { k: "Conversione", v: "3,4%", x: 230 },
            { k: "Scontrino", v: "€ 131", x: 300 },
          ].map((m) => (
            <g key={m.k}>
              <text x={m.x} y="208" fontSize="6.8" fill="var(--c-m)">{m.k}</text>
              <text x={m.x} y="224" fontSize="12" fontWeight="800" fill="var(--c-t)">{m.v}</text>
            </g>
          ))}
        </g>

        {/* ---- feed ordini ---- */}
        {feed.map((f, i) => (
          <g key={f.t} className={`sc2-feed sc2-d${i + 1}`}>
            <rect x="388" y={f.y} width="120" height="44" rx="12" fill="var(--c-card)" stroke="var(--c-card-b)" />
            <circle cx="404" cy={f.y + 22} r="7" fill={f.c} opacity="0.18" />
            <circle cx="404" cy={f.y + 22} r="3.2" fill={f.c} />
            <text x="417" y={f.y + 19} fontSize="8.5" fontWeight="700" fill="var(--c-t)">{f.t}</text>
            <text x="417" y={f.y + 31} fontSize="7" fill="var(--c-m)">{f.s}</text>
          </g>
        ))}

        {/* ---- canali di vendita ---- */}
        <path d="M260 240 V 262" stroke="var(--c-line)" strokeWidth="1.4" />
        <path d="M110 262 H 410" stroke="var(--c-line)" strokeWidth="1.4" fill="none" />
        {channels.map((c, i) => {
          const cx = 110 + i * 100
          return (
            <g key={c}>
              <path className="sc2-flow" d={`M${cx} 262 V 278`} stroke="url(#sc2-g)" strokeWidth="1.4" />
              <rect x={cx - 44} y="278" width="88" height="28" rx="14" fill="var(--c-chip)" stroke="var(--c-card-b)" />
              <circle cx={cx - 30} cy="292" r="3" fill="url(#sc2-g)" />
              <text x={cx + 4} y="295.5" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="var(--c-t)">{c}</text>
            </g>
          )
        })}
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   CRO — ANALISI
========================================================= */

function CROAnalisiVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes cro-hm1 {
          0%,100% { opacity:0.3; }
          50% { opacity:0.9; }
        }

        @keyframes cro-hm2 {
          0%,100% { opacity:0.2; }
          50% { opacity:0.7; }
        }

        @keyframes cro-cursor {
          0% { transform:translate(0,0); }
          30% { transform:translate(40px,20px); }
          60% { transform:translate(80px,-10px); }
          100% { transform:translate(0,0); }
        }

        @keyframes cro-tooltip {
          0%,40% { opacity:0; }
          50%,90% { opacity:1; }
          100% { opacity:0; }
        }

        @keyframes cro-rec {
          0% { r:4; }
          50% { r:7; }
          100% { r:4; }
        }

        .cro-hm1 {
          animation:cro-hm1 2.5s ease-in-out infinite;
        }

        .cro-hm2 {
          animation:cro-hm2 2.5s ease-in-out infinite 0.8s;
        }

        .cro-cursor {
          animation:cro-cursor 4s ease-in-out infinite;
        }

        .cro-tooltip {
          animation:cro-tooltip 4s ease-in-out infinite;
        }

        .cro-rec {
          animation:cro-rec 1.5s ease-in-out infinite;
          fill:#ef4444;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(252,3,176,0.08) 0%, transparent 55%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "90%", maxWidth: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="ca-hot1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="ca-hot2">
            <stop offset="0%" stopColor="#fc03b0" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <filter id="ca-blur2">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <rect
          x="60"
          y="30"
          width="400"
          height="260"
          rx="14"
          fill="var(--vp-panel)"
          stroke="var(--vp-border)"
        />

        <rect
          x="60"
          y="30"
          width="400"
          height="32"
          rx="14"
          fill="var(--vp-panel-soft)"
        />

        <rect
          x="60"
          y="48"
          width="400"
          height="14"
          fill="var(--vp-panel-soft)"
        />

        <circle cx="80" cy="46" r="4" fill="#ef4444" opacity="0.6" />
        <circle cx="94" cy="46" r="4" fill="#facc15" opacity="0.7" />
        <circle cx="108" cy="46" r="4" fill="#22c55e" opacity="0.7" />

        <rect
          x="136"
          y="38"
          width="200"
          height="14"
          rx="7"
          fill="var(--vp-panel-subtle)"
        />

        <rect
          x="72"
          y="72"
          width="376"
          height="20"
          rx="4"
          fill="var(--vp-panel-subtle)"
        />

        <rect
          x="72"
          y="100"
          width="200"
          height="12"
          rx="3"
          fill="var(--vp-panel-subtle)"
        />

        <rect
          x="72"
          y="118"
          width="160"
          height="12"
          rx="3"
          fill="var(--vp-panel-subtle)"
        />

        <rect
          x="280"
          y="100"
          width="80"
          height="30"
          rx="8"
          fill="rgba(252,3,176,0.08)"
          stroke="rgba(252,3,176,0.2)"
        />

        {[72, 184, 296].map((x) => (
          <rect
            key={x}
            x={x}
            y="160"
            width="100"
            height="60"
            rx="6"
            fill="var(--vp-panel-subtle)"
            stroke="var(--vp-border-soft)"
          />
        ))}

        <g className="cro-hm1">
          <ellipse
            cx="320"
            cy="115"
            rx="45"
            ry="25"
            fill="url(#ca-hot1)"
            filter="url(#ca-blur2)"
          />
        </g>

        <g className="cro-hm2">
          <ellipse
            cx="145"
            cy="185"
            rx="55"
            ry="30"
            fill="url(#ca-hot2)"
            filter="url(#ca-blur2)"
          />

          <ellipse
            cx="235"
            cy="185"
            rx="35"
            ry="25"
            fill="url(#ca-hot1)"
            filter="url(#ca-blur2)"
            opacity="0.5"
          />
        </g>

        <g className="cro-cursor" transform="translate(200,120)">
          <polygon
            points="0,0 0,16 5,12 8,18 10,17 7,11 13,11"
            fill="var(--vp-text-strong)"
            stroke="var(--vp-border)"
          />
        </g>

        <g className="cro-tooltip" transform="translate(210,100)">
          <rect
            width="100"
            height="28"
            rx="8"
            fill="rgba(252,3,176,0.92)"
          />

          <text
            x="10"
            y="12"
            fontSize="8"
            fill="white"
            fontWeight="700"
          >
            Drop-off: 68%
          </text>

          <text
            x="10"
            y="22"
            fontSize="7"
            fill="rgba(255,255,255,0.8)"
          >
            Users exit here
          </text>
        </g>

        <g transform="translate(400,50)">
          <circle className="cro-rec" cx="8" cy="8" r="4" />

          <text
            x="18"
            y="12"
            fontSize="8"
            fill="var(--vp-muted)"
            fontWeight="600"
          >
            REC
          </text>
        </g>

        <g transform="translate(72,240)">
          {[
            {
              x: 0,
              label: "SCROLL DEPTH",
              value: "42%",
              color: gradStart,
            },
            {
              x: 100,
              label: "CLICK RATE",
              value: "8.2%",
              color: gradEnd,
            },
            {
              x: 200,
              label: "EXIT RATE",
              value: "68%",
              color: "#ef4444",
            },
            {
              x: 300,
              label: "CVR",
              value: "1.4%",
              color: "#22c55e",
            },
          ].map((item) => (
            <g key={item.label}>
              <rect
                x={item.x}
                width="88"
                height="36"
                rx="10"
                fill="var(--vp-panel)"
                stroke={item.color}
                strokeOpacity="0.22"
              />

              <text
                x={item.x + 10}
                y="14"
                fontSize="7"
                fill="var(--vp-muted)"
              >
                {item.label}
              </text>

              <text
                x={item.x + 10}
                y="28"
                fontSize="14"
                fontWeight="800"
                fill={item.color}
              >
                {item.value}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   CRO — A/B TEST
========================================================= */

function CROABTestVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes ab-fill-a {
          from { height:0; y:210; }
          to { height:70px; y:140; }
        }

        @keyframes ab-fill-b {
          from { height:0; y:210; }
          to { height:115px; y:95; }
        }

        @keyframes ab-badge {
          0% {
            opacity:0;
            transform:scale(0.8);
          }
          100% {
            opacity:1;
            transform:scale(1);
          }
        }

        @keyframes ab-line {
          from { stroke-dashoffset:200; }
          to { stroke-dashoffset:0; }
        }

        @keyframes ab-blink {
          0%,100% { opacity:1; }
          50% { opacity:0.4; }
        }

        .ab-bar-a {
          animation:ab-fill-a 1.2s cubic-bezier(0.4,0,0.2,1) forwards 0.5s;
        }

        .ab-bar-b {
          animation:ab-fill-b 1.2s cubic-bezier(0.4,0,0.2,1) forwards 0.8s;
        }

        .ab-badge {
          animation:ab-badge 0.5s ease forwards 2s;
          opacity:0;
        }

        .ab-line {
          animation:ab-line 1s ease forwards 0.3s;
          stroke-dasharray:200;
          stroke-dashoffset:200;
        }

        .ab-blink {
          animation:ab-blink 1.5s ease-in-out infinite 2.5s;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(252,3,176,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 40%, rgba(4,124,249,0.08) 0%, transparent 55%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "90%", maxWidth: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ab-g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>

          <linearGradient id="ab-ga" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={gradStart} stopOpacity="0.4" />
            <stop offset="100%" stopColor={gradStart} stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="ab-gb" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={gradEnd} stopOpacity="0.4" />
            <stop offset="100%" stopColor={gradEnd} stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <rect
          x="100"
          y="30"
          width="140"
          height="34"
          rx="10"
          fill="rgba(252,3,176,0.08)"
          stroke="rgba(252,3,176,0.25)"
        />

        <text
          x="170"
          y="52"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill={gradStart}
        >
          A
        </text>

        <text
          x="125"
          y="52"
          fontSize="10"
          fill="var(--vp-muted)"
        >
          Variante
        </text>

        <rect
          x="280"
          y="30"
          width="140"
          height="34"
          rx="10"
          fill="rgba(4,124,249,0.08)"
          stroke="rgba(4,124,249,0.25)"
        />

        <text
          x="350"
          y="52"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill={gradEnd}
        >
          B
        </text>

        <text
          x="305"
          y="52"
          fontSize="10"
          fill="var(--vp-muted)"
        >
          Variante
        </text>

        <circle
          cx="260"
          cy="47"
          r="14"
          fill="var(--vp-panel)"
          stroke="var(--vp-border)"
        />

        <text
          x="260"
          y="52"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="var(--vp-muted)"
        >
          VS
        </text>

        <rect
          x="80"
          y="85"
          width="360"
          height="140"
          rx="10"
          fill="var(--vp-panel-subtle)"
          stroke="var(--vp-border-soft)"
        />

        <rect
          className="ab-bar-a"
          x="155"
          y="140"
          width="70"
          height="70"
          rx="8"
          fill="url(#ab-ga)"
        />

        <rect
          className="ab-bar-b"
          x="295"
          y="95"
          width="70"
          height="115"
          rx="8"
          fill="url(#ab-gb)"
        />

        <text
          x="190"
          y="238"
          textAnchor="middle"
          fontSize="10"
          fill="var(--vp-muted)"
        >
          CVR: 1.8%
        </text>

        <text
          x="330"
          y="238"
          textAnchor="middle"
          fontSize="10"
          fill="var(--vp-muted)"
        >
          CVR: 3.2%
        </text>

        <g className="ab-badge" transform="translate(270,42)">
          <rect
            width="80"
            height="22"
            rx="11"
            fill="rgba(4,124,249,0.10)"
            stroke="rgba(4,124,249,0.4)"
          />

          <text
            x="10"
            y="15"
            fontSize="9"
            fill={gradEnd}
            fontWeight="700"
          >
            🏆 Winner
          </text>
        </g>

        <g transform="translate(100,256)">
          <rect
            width="320"
            height="32"
            rx="10"
            fill="var(--vp-panel)"
            stroke="var(--vp-border)"
          />

          <text
            x="16"
            y="14"
            fontSize="8"
            fill="var(--vp-muted)"
          >
            STATISTICAL CONFIDENCE
          </text>

          <rect
            x="16"
            y="18"
            width="288"
            height="6"
            rx="3"
            fill="var(--vp-line)"
          />

          <rect
            className="ab-line"
            x="16"
            y="18"
            width="230"
            height="6"
            rx="3"
            fill="url(#ab-g1)"
          />

          <text
            x="250"
            y="24"
            fontSize="8"
            fill="var(--vp-text-strong)"
            fontWeight="700"
            className="ab-blink"
          >
            95%
          </text>
        </g>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   CRO — CRESCITA
========================================================= */

function CROCrescitaVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes cr-line {
          from { stroke-dashoffset:600; }
          to { stroke-dashoffset:0; }
        }

        @keyframes cr-dot {
          from {
            opacity:0;
            r:0;
          }
          to {
            opacity:1;
            r:6;
          }
        }

        @keyframes cr-label {
          from {
            opacity:0;
            transform:translateY(4px);
          }
          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes cr-glow {
          0%,100% { opacity:0.4; }
          50% { opacity:1; }
        }

        .cr-line {
          animation:cr-line 2s cubic-bezier(0.4,0,0.2,1) forwards 0.3s;
          stroke-dasharray:600;
          stroke-dashoffset:600;
        }

        .cr-dot1 {
          animation:cr-dot 0.4s ease forwards 2.1s;
          opacity:0;
        }

        .cr-dot2 {
          animation:cr-dot 0.4s ease forwards 2.3s;
          opacity:0;
        }

        .cr-label1 {
          animation:cr-label 0.4s ease forwards 2.2s;
          opacity:0;
        }

        .cr-label2 {
          animation:cr-label 0.4s ease forwards 2.4s;
          opacity:0;
        }

        .cr-glow {
          animation:cr-glow 2s ease-in-out infinite 2.5s;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(34,197,94,0.08) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(252,3,176,0.06) 0%, transparent 55%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "90%", maxWidth: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cr-g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>

          <linearGradient id="cr-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradEnd} stopOpacity="0.25" />
            <stop offset="100%" stopColor={gradEnd} stopOpacity="0" />
          </linearGradient>

          <filter id="cr-gf">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <rect
          x="52"
          y="30"
          width="416"
          height="250"
          rx="16"
          fill="var(--vp-panel)"
          stroke="var(--vp-border)"
        />

        <text
          x="76"
          y="60"
          fontSize="11"
          fill="var(--vp-muted)"
        >
          REVENUE MENSILE
        </text>

        <text
          x="76"
          y="82"
          fontSize="26"
          fontWeight="800"
          fill="var(--vp-text-strong)"
        >
          € 48.200
        </text>

        <rect
          x="76"
          y="90"
          width="70"
          height="18"
          rx="9"
          fill="rgba(34,197,94,0.12)"
          stroke="rgba(34,197,94,0.3)"
        />

        <text
          x="84"
          y="103"
          fontSize="9"
          fill="#22c55e"
          fontWeight="700"
        >
          ↑ +40% CVR
        </text>

        {[130, 160, 190, 220, 250].map((y) => (
          <line
            key={y}
            x1="76"
            y1={y}
            x2="444"
            y2={y}
            stroke="var(--vp-line)"
          />
        ))}

        {["Gen", "Feb", "Mar", "Apr", "Mag", "Giu"].map((month, i) => (
          <text
            key={month}
            x={96 + i * 58}
            y="272"
            textAnchor="middle"
            fontSize="8"
            fill="var(--vp-muted-soft)"
          >
            {month}
          </text>
        ))}

        <path
          d="M96,240 C120,235 140,220 154,200 C168,180 175,175 212,160 C249,145 260,140 270,125 C280,110 300,100 328,88 C356,76 380,72 444,60 L444,250 L96,250 Z"
          fill="url(#cr-area)"
        />

        <path
          className="cr-line"
          d="M96,240 C120,235 140,220 154,200 C168,180 175,175 212,160 C249,145 260,140 270,125 C280,110 300,100 328,88 C356,76 380,72 444,60"
          fill="none"
          stroke="url(#cr-g1)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <circle
          className="cr-glow"
          cx="444"
          cy="60"
          r="12"
          fill={gradEnd}
          opacity="0.3"
          filter="url(#cr-gf)"
        />

        <circle
          className="cr-dot1"
          cx="212"
          cy="160"
          r="0"
          fill="var(--vp-text-strong)"
          stroke={gradStart}
          strokeWidth="2"
        />

        <circle
          className="cr-dot2"
          cx="444"
          cy="60"
          r="0"
          fill="var(--vp-text-strong)"
          stroke={gradEnd}
          strokeWidth="2"
        />

        <g className="cr-label1">
          <rect
            x="182"
            y="140"
            width="60"
            height="20"
            rx="6"
            fill="rgba(252,3,176,0.12)"
            stroke="rgba(252,3,176,0.3)"
          />

          <text
            x="212"
            y="154"
            textAnchor="middle"
            fontSize="8"
            fill={gradStart}
            fontWeight="700"
          >
            €28k
          </text>
        </g>

        <g className="cr-label2">
          <rect
            x="406"
            y="42"
            width="60"
            height="20"
            rx="6"
            fill="rgba(4,124,249,0.12)"
            stroke="rgba(4,124,249,0.3)"
          />

          <text
            x="436"
            y="56"
            textAnchor="middle"
            fontSize="8"
            fill={gradEnd}
            fontWeight="700"
          >
            €48k
          </text>
        </g>

        <line
          x1="212"
          y1="160"
          x2="212"
          y2="250"
          stroke="rgba(252,3,176,0.15)"
          strokeDasharray="3,3"
        />

        <text
          x="212"
          y="268"
          textAnchor="middle"
          fontSize="7"
          fill="rgba(252,3,176,0.6)"
        >
          CRO start
        </text>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   SITI WEB — IMMERSIVE
========================================================= */

/* Temi Shopify: lo stesso tema che cambia volto in base alla nicchia, con le foto dei nostri progetti */
const TEMI_IMG = "/media/visuals/temi"
const TEMI_NICHES = [
  {
    name: "Gioielli",
    brand: "AURELLE",
    title: "Gioielli su misura",
    cta: "Scopri la collezione",
    accent: "#c9a46a",
    dark: "#1c1712",
    full: true,
    img: "gioielli",
    products: [["Orecchini", "€ 420"], ["Collana", "€ 380"], ["Solitario", "€ 1.250"]],
  },
  {
    name: "Streetwear",
    brand: "VÆRK",
    title: "",
    cta: "",
    accent: "#c2410c",
    dark: "#efebe4",
    light: true,
    img: "street",
    products: [["Heavy Hoodie", "€ 160"], ["Bomber", "€ 230"], ["Crewneck", "€ 140"]],
  },
  {
    name: "TCG",
    brand: "PULLROOM",
    title: "",
    cta: "",
    accent: "#facc15",
    dark: "#0e1024",
    full: true,
    img: "tcg",
    products: [["Charizard PSA 9", "€ 2.400"], ["Venusaur 1st Ed.", "€ 890"], ["Blastoise Holo", "€ 760"]],
  },
]

function TemiNicchiaVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes tn-show { 0% { opacity: 0; } 3%, 31% { opacity: 1; } 34%, 100% { opacity: 0; } }
        .tn-layer { animation: tn-show 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .tn-layer { animation: none; } }
        /* su mobile il riquadro è basso: il negozio si rimpicciolisce per lasciare margine */
        @media (max-width: 640px) { .tn-wrap { width: 64% !important; gap: 6px !important; } }
      `}</style>
      <div className="tn-wrap" style={{ position: "relative", zIndex: 2, width: "80%", display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 12, border: "1px solid var(--vp-border)", overflow: "hidden", boxShadow: "0 24px 50px -24px rgba(0,0,0,.6)" }}>
          {TEMI_NICHES.map((n, i) => {
            // tema chiaro (VÆRK): testi scuri, foto senza velo e senza titolo sovrapposto
            const light = "light" in n && n.light
            // la foto del sito ha già titolo e CTA: niente testo sovrapposto
            const full = light || ("full" in n && n.full)
            // solo la hero, a tutta altezza (TCG)
            const heroOnly = true
            const ink = light ? "#111" : "#fff"
            const inkSoft = light ? "rgba(17,17,17,.6)" : "rgba(255,255,255,.6)"
            return (
            <div
              key={n.name}
              className="tn-layer"
              style={{ animationDelay: `${i * 3}s`, opacity: i === 0 ? 1 : 0, position: "absolute", inset: 0, background: n.dark, display: "flex", flexDirection: "column" }}
            >
              {/* barra del negozio: solo per le foto senza il menu del sito */}
              {!full && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px" }}>
                <b style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", color: ink }}>{n.brand}</b>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Shop", "Collezioni", "Chi siamo"].map((l) => (
                    <b key={l} style={{ fontSize: 7.5, fontWeight: 500, color: inkSoft }}>{l}</b>
                  ))}
                </div>
              </div>}
              {/* hero con la foto vera */}
              <div style={{ position: "relative", flex: 1.4, margin: full ? 0 : heroOnly ? "0 8px 8px" : "0 8px", borderRadius: full ? 0 : 8, overflow: "hidden", background: full ? (light ? "#efeae0" : "#14183a") : undefined }}>
                <img src={`${TEMI_IMG}/${n.img}-hero.webp`} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                {!full && (
                  <>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.65), rgba(0,0,0,.05) 70%)" }} />
                    <div style={{ position: "absolute", left: 10, bottom: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                      <b style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.15, maxWidth: 140 }}>{n.title}</b>
                      <b style={{ alignSelf: "flex-start", fontSize: 7.5, fontWeight: 700, color: "#111", background: n.accent, padding: "4px 9px", borderRadius: 99 }}>{n.cta}</b>
                    </div>
                  </>
                )}
              </div>
              {/* prodotti */}
              {!heroOnly && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, padding: 8 }}>
                {n.products.map(([name, price], k) => (
                  <div key={name} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <div style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 6, overflow: "hidden", background: light ? "#efeae0" : "rgba(255,255,255,.06)" }}>
                      <img src={`${TEMI_IMG}/${n.img}-${k + 1}.webp`} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                      <b style={{ fontSize: 7.5, fontWeight: 600, color: light ? "#111" : "rgba(255,255,255,.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</b>
                      <b style={{ fontSize: 7.5, fontWeight: 700, color: n.accent, whiteSpace: "nowrap" }}>{price}</b>
                    </div>
                  </div>
                ))}
              </div>}
            </div>
            )
          })}
        </div>
      </div>
    </VisualShell>
  )
}

/* Temi Shopify: editor del tema in stile Shopify, sezioni che si riordinano e anteprima con foto vere */
function TemiEditorVisual() {
  const sections = ["Hero", "Scena immersiva", "Recensioni", "Newsletter"]
  return (
    <VisualShell>
      <style>{`
        @keyframes te-prev-a { 0%, 38% { opacity: 1; } 46%, 82% { opacity: 0; } 90%, 100% { opacity: 1; } }
        @keyframes te-prev-b { 0%, 38% { opacity: 0; } 46%, 82% { opacity: 1; } 90%, 100% { opacity: 0; } }
        @keyframes te-btn { 0%, 50% { background: #111; color: #fff; } 60%, 90% { background: #c2410c; color: #fff; } 100% { background: #111; color: #fff; } }
        @keyframes te-saved { 0%, 80% { opacity: 0; transform: translateY(4px); } 86%, 96% { opacity: 1; transform: none; } 100% { opacity: 0; } }
        .te-pa { animation: te-prev-a 6s cubic-bezier(.65,0,.35,1) infinite; }
        .te-pb { animation: te-prev-b 6s cubic-bezier(.65,0,.35,1) infinite; }
        .te-btn { animation: te-btn 6s ease infinite; }
        .te-saved { animation: te-saved 6s ease infinite; }
        @media (prefers-reduced-motion: reduce) { .te-pa, .te-pb, .te-btn, .te-saved { animation: none; } }
        .vp-visual-card:has(.te-wrap) { aspect-ratio: 16 / 11.5; }
        @media (max-width: 640px) { .te-wrap { width: 82% !important; transform: scale(.86); } }
      `}</style>
      <div className="te-wrap" style={{ position: "relative", zIndex: 2, width: "86%", display: "grid", gridTemplateColumns: "0.8fr 1.4fr", gap: 9, alignItems: "start" }}>
        {/* pannello sezioni dell'editor */}
        <div style={{ borderRadius: 12, border: "1px solid var(--vp-border)", background: "var(--vp-panel)", padding: 9, display: "flex", flexDirection: "column", gap: 5 }}>
          <b style={{ fontSize: 9, fontWeight: 700, color: "var(--vp-text-strong)" }}>Home page</b>
          <b style={{ fontSize: 8, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--vp-muted)", marginTop: 2 }}>Sezioni</b>
          {/* due ordini delle sezioni sovrapposti che si alternano in dissolvenza: niente elementi che si incrociano */}
          <div style={{ display: "grid" }}>
            {[sections, [sections[0], sections[2], sections[1], sections[3]]].map((list, v) => (
              <div key={v} className={v ? "te-pb" : "te-pa"} style={{ gridArea: "1 / 1", display: "flex", flexDirection: "column", gap: 5, opacity: v ? 0 : 1 }}>
                {list.map((name) => (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 7px",
                      borderRadius: 7,
                      border: name === "Scena immersiva" ? "1.5px solid #7c3aed" : "1px solid var(--vp-border-soft)",
                      background: "var(--vp-panel-soft)",
                      boxShadow: name === "Scena immersiva" ? "0 10px 24px -12px rgba(124,58,237,.6)" : "none",
                    }}
                  >
                    <b style={{ fontSize: 9, color: "var(--vp-muted-soft)", letterSpacing: 1 }}>⋮⋮</b>
                    <b style={{ fontSize: 9.5, fontWeight: 600, color: "var(--vp-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</b>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <b style={{ fontSize: 8.5, fontWeight: 700, color: "#7c3aed", marginTop: 2 }}>+ Aggiungi sezione</b>
        </div>
        {/* anteprima del negozio: hero e scena immersiva di Pullroom */}
        <div style={{ position: "relative", borderRadius: 12, border: "1px solid var(--vp-border)", background: "#0e1024", padding: 6, display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
          <div style={{ position: "relative", aspectRatio: "1000 / 601", borderRadius: 7, overflow: "hidden" }}>
            <img src={`${TEMI_IMG}/tcg-hero.webp`} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          {/* le due disposizioni si alternano insieme alle sezioni dell'editor */}
          <div style={{ display: "grid" }}>
            {[false, true].map((swapped) => {
              const scene = (
                <div key="s" style={{ position: "relative", aspectRatio: "1000 / 390", borderRadius: 6, overflow: "hidden" }}>
                  <img src={`${TEMI_IMG}/tcg-scena.webp`} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )
              const reviews = (
                <div key="r" style={{ display: "flex", gap: 4, alignItems: "center", padding: "5px 6px", borderRadius: 6, background: "rgba(255,255,255,.06)" }}>
                  <b style={{ fontSize: 8, color: "#facc15" }}>★★★★★</b>
                  <i style={{ flex: 1, height: 4, borderRadius: 4, background: "rgba(255,255,255,.18)" }} />
                </div>
              )
              return (
                <div
                  key={String(swapped)}
                  className={swapped ? "te-pb" : "te-pa"}
                  style={{ gridArea: "1 / 1", display: "flex", flexDirection: "column", gap: 5, opacity: swapped ? 0 : 1 }}
                >
                  {swapped ? [reviews, scene] : [scene, reviews]}
                </div>
              )
            })}
          </div>
          <div className="te-saved" style={{ position: "absolute", right: 7, top: 7, display: "flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 99, background: "rgba(22,163,74,.9)" }}>
            <i style={{ width: 6, height: 6, borderRadius: 99, background: "#fff" }} />
            <b style={{ fontSize: 8.5, fontWeight: 700, color: "#fff" }}>Salvato, senza codice</b>
          </div>
        </div>
      </div>
    </VisualShell>
  )
}

/* Home: esperienza immersiva illustrata, sfera 3D con card che fluttuano */
function HomeImmersiveVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes hi-spin { to { transform: rotate(360deg) } }
        @keyframes hi-float { 0%,100% { transform: translateY(0) rotate(var(--r)) } 50% { transform: translateY(-8px) rotate(var(--r)) } }
        .hi-orb { animation: hi-spin 16s linear infinite }
        .hi-card { animation: hi-float 6s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .hi-orb, .hi-card { animation: none } }
      `}</style>
      <div style={{ position: "relative", zIndex: 2, width: "80%", aspectRatio: "16 / 10", borderRadius: 14, overflow: "hidden", border: "1px solid var(--vp-border)", background: "#0b0f1d", boxShadow: "0 24px 50px -24px rgba(0,0,0,.6)" }}>
        <div style={{ position: "absolute", left: 12, top: 10, display: "flex", gap: 5 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <i key={c} style={{ width: 7, height: 7, borderRadius: 99, background: c }} />
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 50% 55%, rgba(124,58,237,.35), transparent 70%)" }} />
        <i className="hi-orb" style={{ position: "absolute", left: "50%", top: "50%", width: "34%", aspectRatio: "1", margin: "-17% 0 0 -17%", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #fff 0, #fc03b0 22%, #7c3aed 52%, #047cf9 78%)", boxShadow: "0 0 70px rgba(252,3,176,.5)" }} />
        {[
          { l: "8%", t: "20%", w: "20%", h: "34%", r: "-8deg", d: "0s" },
          { l: "72%", t: "14%", w: "19%", h: "30%", r: "8deg", d: "-2s" },
          { l: "74%", t: "60%", w: "18%", h: "28%", r: "-5deg", d: "-4s" },
        ].map((c, i) => (
          <i
            key={i}
            className="hi-card"
            style={{ position: "absolute", left: c.l, top: c.t, width: c.w, height: c.h, borderRadius: 10, border: "1px solid rgba(255,255,255,.15)", background: "linear-gradient(160deg, rgba(255,255,255,.12), rgba(255,255,255,.03))", backdropFilter: "blur(6px)", ["--r" as string]: c.r, animationDelay: c.d } as React.CSSProperties}
          />
        ))}
        <i style={{ position: "absolute", left: "50%", bottom: "11%", width: "24%", height: 12, marginLeft: "-12%", borderRadius: 99, background: "linear-gradient(90deg,#fc03b0,#047cf9)" }} />
      </div>
    </VisualShell>
  )
}

/* Home 1: analisi del business. Cliente target, offerta e mappa di posizionamento sui concorrenti */
function HomeStrategyVisual() {
  const persona: [string, string][] = [
    ["Cosa cerca", "Un servizio affidabile, subito"],
    ["Dubbi", "Prezzo, tempi, garanzie"],
    ["Cosa lo convince", "Prove reali e chiarezza"],
  ]
  const rivals: [number, number][] = [[22, 30], [34, 62], [62, 70], [28, 78], [70, 40]]
  return (
    <VisualShell>
      <style>{`
        @keyframes hs-you { 0%, 15% { left: 46%; top: 52%; } 45%, 100% { left: 80%; top: 18%; } }
        @keyframes hs-ring { 0% { transform: scale(.6); opacity: .9; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes hs-row { 0%, 6% { opacity: .35; } 14%, 100% { opacity: 1; } }
        .hs-you { animation: hs-you 7s cubic-bezier(.6,.05,.3,1) infinite alternate; }
        .hs-you::after { content: ""; position: absolute; inset: 0; border-radius: 99px; border: 2px solid #fc03b0; animation: hs-ring 1.8s ease-out infinite; }
        .hs-row { animation: hs-row 7s ease infinite alternate; }
        @media (prefers-reduced-motion: reduce) { .hs-you, .hs-you::after, .hs-row { animation: none; } .hs-you { left: 80%; top: 18%; } }
      `}</style>
      <div style={{ position: "relative", zIndex: 2, width: "86%", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ borderRadius: 12, border: "1px solid var(--vp-border)", background: "var(--vp-panel)", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 99, background: "linear-gradient(135deg,#fc03b0,#047cf9)", display: "grid", placeItems: "center" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <b style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", color: "var(--vp-muted)" }}>CLIENTE TARGET</b>
                <b style={{ fontSize: 11.5, fontWeight: 700, color: "var(--vp-text-strong)" }}>Chi ti sceglie e perché</b>
              </div>
            </div>
            {persona.map(([k, v], i) => (
              <div key={k} className="hs-row" style={{ animationDelay: `${i * 0.5}s`, display: "flex", justifyContent: "space-between", gap: 8, padding: "6px 8px", borderRadius: 8, background: "var(--vp-panel-subtle)", border: "1px solid var(--vp-border-soft)" }}>
                <b style={{ fontSize: 9.5, fontWeight: 700, color: "var(--vp-text)", whiteSpace: "nowrap" }}>{k}</b>
                <b style={{ fontSize: 9.5, fontWeight: 500, color: "var(--vp-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v}</b>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 12, border: "1px solid var(--vp-border)", background: "var(--vp-panel)", padding: 12, display: "flex", flexDirection: "column", gap: 7 }}>
            <b style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", color: "var(--vp-muted)" }}>LA TUA OFFERTA</b>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Valore unico", "Garanzie", "Prezzo chiaro"].map((t) => (
                <b key={t} style={{ fontSize: 9.5, fontWeight: 600, padding: "4px 9px", borderRadius: 99, border: "1px solid rgba(124,58,237,.45)", background: "rgba(124,58,237,.12)", color: "var(--vp-text)" }}>{t}</b>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderRadius: 12, border: "1px solid var(--vp-border)", background: "var(--vp-panel)", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <b style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", color: "var(--vp-muted)" }}>POSIZIONAMENTO</b>
          <div style={{ position: "relative", flex: 1, minHeight: 150, borderRadius: 8, background: "var(--vp-panel-subtle)", border: "1px solid var(--vp-border-soft)", overflow: "hidden" }}>
            <i style={{ position: "absolute", left: "50%", top: 6, bottom: 6, width: 1, background: "var(--vp-line-strong)" }} />
            <i style={{ position: "absolute", top: "50%", left: 6, right: 6, height: 1, background: "var(--vp-line-strong)" }} />
            <i style={{ position: "absolute", right: 4, top: 4, width: "44%", height: "40%", borderRadius: 8, background: "radial-gradient(circle, rgba(252,3,176,.18), transparent 70%)" }} />
            {rivals.map(([x, y], i) => (
              <i key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 9, height: 9, margin: "-4.5px 0 0 -4.5px", borderRadius: 99, background: "var(--vp-muted-soft)" }} />
            ))}
            <i className="hs-you" style={{ position: "absolute", width: 13, height: 13, margin: "-6.5px 0 0 -6.5px", borderRadius: 99, background: "linear-gradient(135deg,#fc03b0,#047cf9)", boxShadow: "0 0 14px rgba(252,3,176,.7)" }} />
            <b style={{ position: "absolute", right: 8, bottom: 6, fontSize: 8.5, fontWeight: 600, color: "var(--vp-muted)" }}>● concorrenti</b>
          </div>
          <b style={{ fontSize: 10, fontWeight: 600, color: "var(--vp-text)" }}>Lo spazio libero dove crei valore</b>
        </div>
      </div>
    </VisualShell>
  )
}

/* Home 2: hero stilizzata di un sito a conversione. Ogni elemento ha il suo compito
   (beneficio, prova, CTA) e il cursore arriva fino alla richiesta */
function HomeConvertVisual() {
  const tag = (text: string, style: React.CSSProperties, delay: string) => (
    <b
      className="hc-tag"
      style={{
        position: "absolute",
        animationDelay: delay,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: ".04em",
        whiteSpace: "nowrap",
        padding: "4px 10px 4px 8px",
        borderRadius: 99,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "var(--vp-text-strong)",
        background: "var(--vp-panel)",
        border: "1px solid var(--vp-border)",
        boxShadow: "0 10px 24px -12px rgba(0,0,0,.45)",
        ...style,
      }}
    >
      <i style={{ width: 6, height: 6, borderRadius: 99, flexShrink: 0, background: "linear-gradient(135deg,#fc03b0,#047cf9)" }} />
      {text}
    </b>
  )
  return (
    <VisualShell>
      <style>{`
        @keyframes hc-tag { 0%, 6% { opacity: 0; transform: translateY(4px) scale(.96); } 12%, 88% { opacity: 1; transform: none; } 96%, 100% { opacity: 0; } }
        @keyframes hc-cursor {
          0% { transform: translate(120px, 50px); opacity: 0; }
          10%, 30% { transform: translate(120px, 50px); opacity: 1; }
          55%, 92% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(0, 0); opacity: 0; }
        }
        @keyframes hc-press { 0%, 56% { transform: scale(1); } 60% { transform: scale(.94); } 64%, 100% { transform: scale(1); } }
        @keyframes hc-ring { 0%, 57% { opacity: 0; transform: scale(.4); } 60% { opacity: .9; } 74%, 100% { opacity: 0; transform: scale(2.2); } }
        @keyframes hc-toast { 0%, 64% { opacity: 0; transform: translateY(8px); } 70%, 94% { opacity: 1; transform: none; } 100% { opacity: 0; } }
        .hc-tag { opacity: 0; animation: hc-tag 7s ease infinite; }
        .hc-cursor { animation: hc-cursor 7s cubic-bezier(.6,.05,.3,1) infinite; }
        .hc-btn { animation: hc-press 7s ease infinite; }
        .hc-ring { animation: hc-ring 7s ease-out infinite; }
        .hc-toast { opacity: 0; animation: hc-toast 7s ease infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hc-tag, .hc-toast { animation: none; opacity: 1; }
          .hc-cursor, .hc-btn, .hc-ring { animation: none; }
          .hc-ring { opacity: 0; }
        }
      `}</style>
      <div style={{ position: "relative", zIndex: 2, width: "84%", borderRadius: 14, border: "1px solid var(--vp-border)", background: "var(--vp-panel)", overflow: "visible", boxShadow: "0 24px 50px -28px rgba(0,0,0,.6)" }}>
        {/* barra browser + menu */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderBottom: "1px solid var(--vp-border-soft)" }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <i key={c} style={{ width: 7, height: 7, borderRadius: 99, background: c }} />
            ))}
          </div>
          <i style={{ width: 46, height: 7, borderRadius: 99, marginLeft: 8, background: "linear-gradient(90deg,#fc03b0,#047cf9)" }} />
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {[22, 26, 20].map((w, i) => (
              <i key={i} style={{ width: w, height: 5, borderRadius: 99, background: "var(--vp-line-strong)" }} />
            ))}
          </div>
        </div>

        {/* hero */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 14, padding: "34px 18px 30px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill="#fbbf24" aria-hidden><path d="M12 2l3 7h7l-5.6 4.3L18.5 21 12 16.8 5.5 21l2.1-7.7L2 9h7z" /></svg>
              ))}
              <i style={{ width: 40, height: 5, borderRadius: 99, marginLeft: 4, background: "var(--vp-line-strong)" }} />
            </div>
            <i style={{ width: "92%", height: 12, borderRadius: 4, background: "var(--vp-text-strong)", opacity: .85 }} />
            <i style={{ width: "70%", height: 12, borderRadius: 4, background: "linear-gradient(90deg,#fc03b0,#047cf9)" }} />
            <i style={{ width: "88%", height: 5, borderRadius: 99, marginTop: 4, background: "var(--vp-line-strong)" }} />
            <i style={{ width: "64%", height: 5, borderRadius: 99, background: "var(--vp-line-strong)" }} />
            <div style={{ position: "relative", marginTop: 8, alignSelf: "flex-start" }}>
              <b className="hc-btn" style={{ display: "inline-block", fontSize: 9.5, fontWeight: 700, color: "#fff", padding: "7px 14px", borderRadius: 99, background: "linear-gradient(150deg, rgba(252,3,176,.42), rgba(124,58,237,.34) 48%, rgba(4,124,249,.42))", border: "1px solid rgba(255,255,255,.16)", backdropFilter: "blur(6px)", boxShadow: "0 10px 24px -12px rgba(124,58,237,.7), inset 0 1px 0 rgba(255,255,255,.14)" }}>Richiedi un preventivo</b>
              <i className="hc-ring" style={{ position: "absolute", left: "92%", top: "50%", width: 22, height: 22, margin: "-11px 0 0 -11px", borderRadius: 99, border: "2px solid #fff" }} />
              {/* cursore */}
              <svg className="hc-cursor" width="16" height="16" viewBox="0 0 24 24" style={{ position: "absolute", left: "97%", top: "50%" }} aria-hidden>
                <path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#0b0f1d" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {/* immagine prodotto/servizio */}
          <div style={{ position: "relative", borderRadius: 10, minHeight: 150, overflow: "hidden", border: "1px solid var(--vp-border-soft)", background: "linear-gradient(150deg, rgba(252,3,176,.28), rgba(124,58,237,.22) 45%, rgba(4,124,249,.28))" }}>
            <i style={{ position: "absolute", left: "22%", top: "18%", width: "56%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,.55), rgba(255,255,255,.08) 60%, transparent 70%)" }} />
            <i style={{ position: "absolute", left: 10, right: 10, bottom: 10, height: 18, borderRadius: 6, background: "rgba(0,0,0,.25)", backdropFilter: "blur(4px)" }} />
          </div>
        </div>

        {/* strip loghi / prove */}
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "16px 18px 20px", borderTop: "1px solid var(--vp-border-soft)" }}>
          {[34, 28, 38, 30, 26].map((w, i) => (
            <i key={i} style={{ width: w, height: 7, borderRadius: 3, background: "var(--vp-muted-soft)" }} />
          ))}
        </div>

        {/* etichette: il compito di ogni elemento */}
        {tag("Il beneficio, subito", { left: "-4%", top: "30%" }, "0s")}
        {tag("Prove reali", { left: "30%", top: "13%" }, ".6s")}
        {tag("Un'azione chiara", { left: "16%", bottom: "6%" }, "1.2s")}

        {/* conferma */}
        <div className="hc-toast" style={{ position: "absolute", right: "-5%", bottom: "16%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 12, border: "1px solid var(--vp-border)", background: "var(--vp-panel)", boxShadow: "0 14px 30px -12px rgba(0,0,0,.55)" }}>
          <span style={{ width: 18, height: 18, borderRadius: 99, background: "#16a34a", display: "grid", placeItems: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5 9-10" /></svg>
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <b style={{ fontSize: 10, fontWeight: 700, color: "var(--vp-text-strong)" }}>Nuova richiesta</b>
            <b style={{ fontSize: 8.5, fontWeight: 500, color: "var(--vp-muted)" }}>ti hanno scelto</b>
          </div>
        </div>
      </div>
    </VisualShell>
  )
}

/* Home: referente diretto, una conversazione con il fondatore */
function HomeReferenteVisual() {
  const msgs: [boolean, string][] = [
    [false, "Ciao Francesco, possiamo spostare le recensioni più in alto?"],
    [true, "Certo, lo faccio oggi e ti mando l'anteprima."],
    [true, "Per le foto prodotto coinvolgo il nostro fotografo."],
  ]
  return (
    <VisualShell>
      <style>{`
        @keyframes rf-in { 0%, 8% { opacity: 0; transform: translateY(6px); } 14%, 92% { opacity: 1; transform: none; } 100% { opacity: 0; } }
        .rf-msg { animation: rf-in 9s ease infinite; opacity: 0; }
        @media (prefers-reduced-motion: reduce) { .rf-msg { animation: none; opacity: 1; } }
      `}</style>
      <div style={{ position: "relative", zIndex: 2, width: "74%", borderRadius: 14, border: "1px solid var(--vp-border)", background: "var(--vp-panel)", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, borderBottom: "1px solid var(--vp-border-soft)" }}>
          <div style={{ width: 30, height: 30, borderRadius: 99, background: "linear-gradient(135deg,#fc03b0,#047cf9)", display: "grid", placeItems: "center" }}>
            <b style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>F</b>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <b style={{ fontSize: 12, fontWeight: 700, color: "var(--vp-text-strong)" }}>Francesco</b>
            <b style={{ fontSize: 10, fontWeight: 500, color: "#16a34a" }}>● il tuo referente</b>
          </div>
        </div>
        {msgs.map(([me, text], i) => (
          <div
            key={text}
            className="rf-msg"
            style={{
              animationDelay: `${i * 1.1}s`,
              alignSelf: me ? "flex-end" : "flex-start",
              maxWidth: "82%",
              padding: "8px 11px",
              borderRadius: me ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
              background: me ? "linear-gradient(150deg, rgba(252,3,176,.14), rgba(124,58,237,.12) 50%, rgba(4,124,249,.14))" : "var(--vp-panel-subtle)",
              border: me ? "1px solid rgba(124,58,237,.3)" : "1px solid var(--vp-border-soft)",
            }}
          >
            <b style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.4, color: "var(--vp-text)" }}>{text}</b>
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingTop: 4 }}>
          {["Advertising", "Copy", "Foto"].map((t) => (
            <b key={t} style={{ fontSize: 9.5, fontWeight: 600, padding: "3px 8px", borderRadius: 99, border: "1px solid var(--vp-border)", color: "var(--vp-muted)" }}>+ {t}</b>
          ))}
        </div>
      </div>
    </VisualShell>
  )
}

/* Variabili colore condivise dalle grafiche "Siti web" (card chiare / scure) */
const SW_VARS = `
  .sw2 {
    --w-card: #ffffff;
    --w-card-b: rgba(15,23,42,0.09);
    --w-t: #0f172a;
    --w-m: rgba(15,23,42,0.52);
    --w-chip: #f1f3f8;
  }
  .dark .sw2 {
    --w-card: #12203d;
    --w-card-b: rgba(255,255,255,0.10);
    --w-t: #ffffff;
    --w-m: rgba(255,255,255,0.55);
    --w-chip: rgba(255,255,255,0.06);
  }
  .sw2 * { transform-box: fill-box; }
  /* le rotazioni scritte nell'attributo transform usano le coordinate del disegno */
  .sw2 [transform] { transform-box: view-box; }
`

/* Struttura di pagina a conversione: la pagina scorre nel browser e a destra
   si accende, in sincrono, la sezione che il visitatore sta leggendo (ciclo 12s) */
function SitiwebStrutturaVisual() {
  const steps = [
    { n: "Hero", h: "Beneficio + CTA" },
    { n: "Problema", h: "Il dubbio che risolvi" },
    { n: "Proposta di valore", h: "Perché scegliere te" },
    { n: "Recensioni", h: "Prova sociale" },
    { n: "Metodo", h: "Come lavori" },
    { n: "Contatto", h: "Il passo successivo" },
  ]
  // posizione (y) e altezza di ogni sezione nella pagina che scorre
  const sec = [
    { y: 58, h: 108 },
    { y: 174, h: 62 },
    { y: 244, h: 72 },
    { y: 324, h: 72 },
    { y: 404, h: 52 },
    { y: 464, h: 96 },
  ]
  return (
    <VisualShell>
      <style>{`
        ${SW_VARS}
        @keyframes st2-scroll {
          0%, 12%   { transform: translateY(0); }
          17%, 29%  { transform: translateY(-104px); }
          34%, 46%  { transform: translateY(-174px); }
          51%, 95%  { transform: translateY(-250px); }
          100%      { transform: translateY(0); }
        }
        .st2-page { animation: st2-scroll 12s cubic-bezier(.6,0,.25,1) infinite; }

        @keyframes st2-on { 0%, 1% { opacity: 0 } 3%, 15% { opacity: 1 } 17%, 100% { opacity: 0 } }
        .st2-on { animation: st2-on 12s ease infinite; }

        @keyframes st2-bar { 0% { transform: scaleY(0) } 100% { transform: scaleY(1) } }
        .st2-prog { animation: st2-bar 12s linear infinite; transform-origin: center top; }

        @keyframes st2-toast { 0%, 88% { opacity: 0; transform: translateY(6px) } 91%, 98% { opacity: 1; transform: translateY(0) } 100% { opacity: 0 } }
        .st2-toast { animation: st2-toast 12s ease infinite; }

        @media (prefers-reduced-motion: reduce) {
          .sw2 * { animation: none !important; }
          .st2-on { opacity: 0; }
          .st2-on.st2-first { opacity: 1; }
        }
      `}</style>

      <svg className="sw2" viewBox="0 0 520 340" style={{ width: "92%", maxWidth: 500 }} xmlns="http://www.w3.org/2000/svg" fontFamily="inherit">
        <defs>
          <linearGradient id="st2-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <linearGradient id="st2-gv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <linearGradient id="st2-img" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(252,3,176,0.30)" />
            <stop offset="100%" stopColor="rgba(4,124,249,0.28)" />
          </linearGradient>
          <clipPath id="st2-clip">
            <rect x="22" y="50" width="276" height="268" rx="0" />
          </clipPath>
        </defs>

        {/* ---- browser ---- */}
        <rect x="20" y="16" width="280" height="306" rx="16" fill="#0c1529" stroke="rgba(255,255,255,0.14)" />
        <rect x="20" y="16" width="280" height="306" rx="16" fill="none" stroke="url(#st2-g)" strokeWidth="1.3" opacity="0.4" />
        <circle cx="36" cy="33" r="3.5" fill="#ff5f57" />
        <circle cx="48" cy="33" r="3.5" fill="#febc2e" />
        <circle cx="60" cy="33" r="3.5" fill="#28c840" />
        <rect x="96" y="25" width="150" height="16" rx="8" fill="rgba(255,255,255,0.06)" />
        <text x="171" y="36" fontSize="7.5" textAnchor="middle" fill="rgba(255,255,255,0.55)">tuosito.it</text>
        <line x1="20" x2="300" y1="48" y2="48" stroke="rgba(255,255,255,0.08)" />

        <g clipPath="url(#st2-clip)" data-fit-ignore="">
          <g className="st2-page">
            {/* hero */}
            <rect x="34" y={sec[0].y} width="252" height={sec[0].h} rx="10" fill="rgba(255,255,255,0.03)" />
            <rect x="46" y="74" width="120" height="9" rx="4.5" fill="#fff" opacity="0.9" />
            <rect x="46" y="88" width="96" height="9" rx="4.5" fill="url(#st2-g)" />
            <rect x="46" y="106" width="118" height="5" rx="2.5" fill="rgba(255,255,255,0.35)" />
            <rect x="46" y="115" width="92" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
            <rect x="46" y="132" width="62" height="18" rx="9" fill="#fff" />
            <rect x="56" y="139" width="42" height="4" rx="2" fill="#0c1529" />
            <rect x="184" y="70" width="90" height="84" rx="10" fill="url(#st2-img)" />
            <circle cx="229" cy="112" r="18" fill="url(#st2-g)" opacity="0.8" />

            {/* problema */}
            <rect x="34" y={sec[1].y} width="252" height={sec[1].h} rx="10" fill="rgba(255,255,255,0.03)" />
            <rect x="96" y="184" width="128" height="7" rx="3.5" fill="#fff" opacity="0.8" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx={70 + i * 80} cy="212" r="7" fill="rgba(252,3,176,0.2)" />
                <text x={70 + i * 80} y="215" fontSize="8" fontWeight="800" textAnchor="middle" fill="#ff5fcf">?</text>
                <rect x={52 + i * 80} y="223" width="36" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
              </g>
            ))}

            {/* proposta di valore */}
            <rect x="34" y={sec[2].y} width="252" height={sec[2].h} rx="10" fill="rgba(255,255,255,0.03)" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={42 + i * 82} y="254" width="74" height="54" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
                <rect x={50 + i * 82} y="262" width="14" height="14" rx="4" fill="url(#st2-g)" />
                <rect x={50 + i * 82} y="284" width="50" height="5" rx="2.5" fill="#fff" opacity="0.75" />
                <rect x={50 + i * 82} y="294" width="38" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
              </g>
            ))}

            {/* recensioni */}
            <rect x="34" y={sec[3].y} width="252" height={sec[3].h} rx="10" fill="rgba(255,255,255,0.03)" />
            {[0, 1].map((i) => (
              <g key={i}>
                <rect x={42 + i * 124} y="334" width="116" height="54" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
                <text x={52 + i * 124} y="350" fontSize="8" fill="#fbbf24" letterSpacing="0.5">★★★★★</text>
                <rect x={52 + i * 124} y="358" width="92" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
                <rect x={52 + i * 124} y="366" width="70" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
                <circle cx={58 + i * 124} cy="379" r="5" fill={i ? gradEnd : gradStart} />
                <rect x={68 + i * 124} y="377" width="34" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
              </g>
            ))}

            {/* metodo */}
            <rect x="34" y={sec[4].y} width="252" height={sec[4].h} rx="10" fill="rgba(255,255,255,0.03)" />
            <line x1="76" x2="244" y1="426" y2="426" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 4" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx={76 + i * 84} cy="426" r="10" fill="#0c1529" stroke="url(#st2-g)" strokeWidth="1.5" />
                <text x={76 + i * 84} y="429.5" fontSize="9" fontWeight="800" textAnchor="middle" fill="#fff">{i + 1}</text>
                <rect x={60 + i * 84} y="443" width="32" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
              </g>
            ))}

            {/* contatto */}
            <rect x="34" y={sec[5].y} width="252" height={sec[5].h} rx="10" fill="url(#st2-img)" opacity="0.6" />
            <rect x="96" y="476" width="128" height="8" rx="4" fill="#fff" opacity="0.9" />
            <rect x="70" y="494" width="180" height="16" rx="6" fill="rgba(255,255,255,0.1)" />
            <rect x="70" y="514" width="180" height="16" rx="6" fill="rgba(255,255,255,0.1)" />
            <rect x="120" y="536" width="80" height="18" rx="9" fill="#fff" />
            <rect x="136" y="543" width="48" height="4" rx="2" fill="#0c1529" />

            {/* evidenziazione della sezione attiva */}
            {sec.map((s, i) => (
              <rect
                key={i}
                className="st2-on"
                style={{ animationDelay: `${i * 2 - 12}s` }}
                x="31"
                y={s.y - 3}
                width="258"
                height={s.h + 6}
                rx="12"
                fill="none"
                stroke="url(#st2-g)"
                strokeWidth="1.6"
              />
            ))}
          </g>
        </g>

        {/* ---- percorso a destra ---- */}
        <line x1="333" x2="333" y1="38" y2="298" stroke="var(--w-card-b)" strokeWidth="2" strokeLinecap="round" />
        <rect className="st2-prog" x="332" y="38" width="2" height="260" rx="1" fill="url(#st2-gv)" />
        {steps.map((st, i) => {
          const y = 22 + i * 52
          return (
            <g key={st.n}>
              <rect x="344" y={y} width="156" height="40" rx="12" fill="var(--w-card)" stroke="var(--w-card-b)" />
              <rect
                className={`st2-on${i === 0 ? " st2-first" : ""}`}
                style={{ animationDelay: `${i * 2 - 12}s` }}
                x="344"
                y={y}
                width="156"
                height="40"
                rx="12"
                fill="rgba(124,58,237,0.10)"
                stroke="url(#st2-g)"
                strokeWidth="1.4"
              />
              <circle cx="333" cy={y + 20} r="5" fill="var(--w-card)" stroke="var(--w-card-b)" strokeWidth="1.5" />
              <circle className={`st2-on${i === 0 ? " st2-first" : ""}`} style={{ animationDelay: `${i * 2 - 12}s` }} cx="333" cy={y + 20} r="5" fill="url(#st2-g)" />
              <text x="358" y={y + 18} fontSize="9.5" fontWeight="700" fill="var(--w-t)">{st.n}</text>
              <text x="358" y={y + 30} fontSize="7.5" fill="var(--w-m)">{st.h}</text>
              <text x="490" y={y + 24} fontSize="8" fontWeight="700" textAnchor="end" fill="var(--w-m)">{`0${i + 1}`}</text>
            </g>
          )
        })}

        {/* richiesta arrivata a fine percorso */}
        <g className="st2-toast">
          <rect x="150" y="262" width="138" height="44" rx="12" fill="var(--w-card)" stroke="var(--w-card-b)" />
          <circle cx="170" cy="284" r="10" fill="rgba(52,211,153,0.16)" />
          <path d="M165.5 284 l3 3 l5.5 -6" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="186" y="281" fontSize="9" fontWeight="700" fill="var(--w-t)">Nuova richiesta</text>
          <text x="186" y="293" fontSize="7" fill="var(--w-m)">dal modulo contatti</text>
        </g>
      </svg>
    </VisualShell>
  )
}

/* SEO locale: ricerca su Google con la tua attività in cima a mappa e risultati (ciclo 8s) */
function SitiwebSeoVisual() {
  const checks = ["Testi per le ricerche in zona", "Dati strutturati", "Scheda Google collegata", "Pagine veloci"]
  return (
    <VisualShell>
      <style>{`
        ${SW_VARS}
        @keyframes seo2-type { 0%, 2% { transform: scaleX(1) } 16%, 94% { transform: scaleX(0) } 100% { transform: scaleX(1) } }
        .seo2-cover { animation: seo2-type 8s steps(22, end) infinite; transform-origin: right center; }
        @keyframes seo2-caret { 0%, 50% { opacity: 1 } 51%, 100% { opacity: 0 } }
        .seo2-caret { animation: seo2-caret 1s step-end infinite; }

        @keyframes seo2-in { 0%, 17% { opacity: 0; transform: translateY(6px) } 22%, 94% { opacity: 1; transform: translateY(0) } 98%, 100% { opacity: 0 } }
        .seo2-in { animation: seo2-in 8s ease infinite; }
        .seo2-in2 { animation-delay: .25s } .seo2-in3 { animation-delay: .5s }

        @keyframes seo2-pin { 0%, 18% { transform: translateY(-14px); opacity: 0 } 24% { transform: translateY(0); opacity: 1 } 28% { transform: translateY(-4px) } 32%, 94% { transform: translateY(0); opacity: 1 } 98%, 100% { opacity: 0 } }
        .seo2-pin { animation: seo2-pin 8s ease infinite; }
        @keyframes seo2-ping { 0%, 28% { opacity: 0; transform: scale(.4) } 34% { opacity: .8 } 48%, 100% { opacity: 0; transform: scale(1.8) } }
        .seo2-ping { animation: seo2-ping 8s ease-out infinite; transform-origin: center; }

        @keyframes seo2-check { 0%, 24% { opacity: .25 } 28%, 94% { opacity: 1 } 98%, 100% { opacity: .25 } }
        .seo2-check { animation: seo2-check 8s ease infinite; }

        @keyframes seo2-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        .seo2-f1 { animation: seo2-float 5s ease-in-out infinite; }
        .seo2-f2 { animation: seo2-float 5s ease-in-out infinite -2.5s; }

        @media (prefers-reduced-motion: reduce) {
          .sw2 * { animation: none !important; }
          .seo2-cover, .seo2-ping { opacity: 0; }
        }
      `}</style>

      <svg className="sw2" viewBox="0 0 520 340" style={{ width: "92%", maxWidth: 500 }} xmlns="http://www.w3.org/2000/svg" fontFamily="inherit">
        <defs>
          <linearGradient id="seo2-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <clipPath id="seo2-map">
            <rect x="34" y="66" width="262" height="96" rx="10" />
          </clipPath>
        </defs>

        {/* ---- pannello ricerca ---- */}
        <rect x="20" y="16" width="290" height="308" rx="16" fill="#0c1529" stroke="rgba(255,255,255,0.14)" />
        <rect x="20" y="16" width="290" height="308" rx="16" fill="none" stroke="url(#seo2-g)" strokeWidth="1.3" opacity="0.4" />

        {/* barra di ricerca con testo che si scrive */}
        <rect x="34" y="28" width="262" height="26" rx="13" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.1)" />
        <circle cx="50" cy="40.5" r="4.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
        <line x1="53.5" y1="44" x2="57" y2="47.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        <text x="64" y="44.5" fontSize="9.5" fill="#fff">idraulico a Bergamo</text>
        <rect className="seo2-cover" x="62" y="32" width="100" height="18" fill="#1a2438" />
        <rect className="seo2-caret" x="163" y="35" width="1.2" height="12" fill="#fff" />

        {/* mappa */}
        <g clipPath="url(#seo2-map)">
          <rect x="34" y="66" width="262" height="96" fill="#132341" />
          <path d="M34 120 C 90 110, 130 140, 296 104" stroke="rgba(255,255,255,0.10)" strokeWidth="9" fill="none" />
          <path d="M120 66 L 150 162" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <path d="M230 66 C 220 100, 250 130, 240 162" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
          <path d="M34 84 L 296 92" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <rect x="60" y="134" width="40" height="22" rx="4" fill="rgba(52,211,153,0.10)" />
        </g>
        {/* concorrenti */}
        {[
          [84, 98],
          [258, 140],
          [272, 84],
        ].map(([x, y]) => (
          <g key={`${x}`}>
            <path d={`M${x} ${y} c-5 -6 -7 -9 -7 -12 a7 7 0 0 1 14 0 c0 3 -2 6 -7 12 z`} fill="rgba(255,255,255,0.28)" />
            <circle cx={x} cy={y - 12} r="2.4" fill="#0c1529" />
          </g>
        ))}
        {/* la tua attività */}
        <circle className="seo2-ping" cx="180" cy="120" r="14" fill="none" stroke={gradStart} strokeWidth="2" />
        <g className="seo2-pin">
          <path d="M180 120 c-8 -9 -11 -14 -11 -19 a11 11 0 0 1 22 0 c0 5 -3 10 -11 19 z" fill="url(#seo2-g)" stroke="#fff" strokeWidth="1.2" />
          <circle cx="180" cy="101" r="4" fill="#fff" />
        </g>

        {/* risultati locali */}
        <g className="seo2-in">
          <rect x="34" y="172" width="262" height="58" rx="10" fill="rgba(124,58,237,0.13)" stroke="url(#seo2-g)" strokeWidth="1.2" />
          <rect x="44" y="182" width="38" height="38" rx="8" fill="url(#seo2-g)" />
          <path d="M55 207 l8 -10 l8 10 z M58 207 v5 h10 v-5" fill="#fff" opacity="0.9" />
          <text x="90" y="192" fontSize="9.5" fontWeight="800" fill="#fff">La tua attività</text>
          <text x="90" y="204" fontSize="8" fill="#fbbf24" letterSpacing="0.4">★★★★★</text>
          <text x="138" y="204" fontSize="7.5" fill="rgba(255,255,255,0.6)">4,9 · Idraulico</text>
          <text x="90" y="216" fontSize="7.5" fontWeight="700" fill="#34d399">Aperto ora</text>
          <text x="134" y="216" fontSize="7.5" fill="rgba(255,255,255,0.5)">· Bergamo centro</text>
          <rect x="236" y="182" width="50" height="16" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" />
          <text x="261" y="193" fontSize="7" fontWeight="700" textAnchor="middle" fill="#fff">Sito web</text>
          <rect x="236" y="204" width="50" height="16" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" />
          <text x="261" y="215" fontSize="7" fontWeight="700" textAnchor="middle" fill="#fff">Chiama</text>
        </g>
        {[0, 1].map((i) => (
          <g key={i} className={`seo2-in seo2-in${i + 2}`} opacity="0.55">
            <rect x="34" y={238 + i * 40} width="262" height="34" rx="10" fill="rgba(255,255,255,0.04)" />
            <rect x="44" y={245 + i * 40} width="20" height="20" rx="6" fill="rgba(255,255,255,0.12)" />
            <rect x="72" y={248 + i * 40} width="90" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
            <rect x="72" y={258 + i * 40} width="60" height="4" rx="2" fill="rgba(255,255,255,0.22)" />
          </g>
        ))}

        {/* ---- destra: risultato organico ---- */}
        <g className="seo2-f1">
          <rect x="326" y="40" width="176" height="100" rx="14" fill="var(--w-card)" stroke="var(--w-card-b)" />
          <circle cx="344" cy="60" r="7" fill="url(#seo2-g)" />
          <text x="356" y="58" fontSize="7.5" fontWeight="700" fill="var(--w-t)">tuosito.it</text>
          <text x="356" y="67" fontSize="6.5" fill="var(--w-m)">› servizi › bergamo</text>
          <text x="338" y="86" fontSize="10" fontWeight="700" fill="#4f8dff">Idraulico a Bergamo,</text>
          <text x="338" y="98" fontSize="10" fontWeight="700" fill="#4f8dff">pronto intervento 24h</text>
          <text x="338" y="114" fontSize="8" fill="#fbbf24" letterSpacing="0.4">★★★★★</text>
          <text x="386" y="114" fontSize="7" fill="var(--w-m)">Valutazione 4,9</text>
          <rect x="338" y="122" width="140" height="4" rx="2" fill="var(--w-card-b)" />
        </g>

        {/* ---- destra: cosa curiamo ---- */}
        <g className="seo2-f2">
          <rect x="326" y="158" width="176" height="128" rx="14" fill="var(--w-card)" stroke="var(--w-card-b)" />
          <text x="340" y="178" fontSize="8" fontWeight="600" fill="var(--w-m)" letterSpacing="0.6">GIÀ INCLUSO NEL SITO</text>
          {checks.map((c, i) => (
            <g key={c} className="seo2-check" style={{ animationDelay: `${i * 0.35}s` }}>
              <circle cx="349" cy={198 + i * 22} r="8" fill="rgba(52,211,153,0.16)" />
              <path d={`M345 ${198 + i * 22} l2.8 2.8 l5 -5.6`} stroke="#34d399" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="364" y={201 + i * 22} fontSize="8.5" fontWeight="600" fill="var(--w-t)">{c}</text>
            </g>
          ))}
        </g>
      </svg>
    </VisualShell>
  )
}

/* Sviluppo su misura: dal pannello modifichi il titolo, l'anteprima si aggiorna;
   nell'anteprima un oggetto 3D animato, sotto il componente che lo genera (ciclo 8s) */
function SitiwebSviluppoVisual() {
  return (
    <VisualShell>
      <style>{`
        ${SW_VARS}
        @keyframes dev2-a { 0%, 38% { opacity: 1 } 42%, 92% { opacity: 0 } 96%, 100% { opacity: 1 } }
        @keyframes dev2-b { 0%, 38% { opacity: 0 } 42%, 92% { opacity: 1 } 96%, 100% { opacity: 0 } }
        .dev2-a { animation: dev2-a 8s linear infinite; }
        .dev2-b { animation: dev2-b 8s linear infinite; }

        @keyframes dev2-focus { 0%, 14% { opacity: 0 } 18%, 40% { opacity: 1 } 44%, 100% { opacity: 0 } }
        .dev2-focus { animation: dev2-focus 8s ease infinite; }

        @keyframes dev2-type { 0%, 18% { transform: scaleX(1) } 38%, 94% { transform: scaleX(0) } 100% { transform: scaleX(1) } }
        .dev2-cover { animation: dev2-type 8s steps(16, end) infinite; transform-origin: right center; }

        @keyframes dev2-pub { 0%, 44%, 52%, 100% { transform: scale(1) } 48% { transform: scale(.93) } }
        .dev2-pub { animation: dev2-pub 8s ease infinite; transform-origin: center; }

        @keyframes dev2-flash { 0%, 46% { opacity: 0 } 50% { opacity: .9 } 62%, 100% { opacity: 0 } }
        .dev2-flash { animation: dev2-flash 8s ease infinite; }

        @keyframes dev2-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-5px) } }
        .dev2-orb { animation: dev2-bob 4s ease-in-out infinite; }

        @keyframes dev2-drag { 0%, 56% { transform: translateY(0) } 62%, 80% { transform: translateY(22px) } 86%, 100% { transform: translateY(0) } }
        @keyframes dev2-drag2 { 0%, 56% { transform: translateY(0) } 62%, 80% { transform: translateY(-22px) } 86%, 100% { transform: translateY(0) } }
        .dev2-r1 { animation: dev2-drag 8s cubic-bezier(.5,0,.3,1) infinite; }
        .dev2-r2 { animation: dev2-drag2 8s cubic-bezier(.5,0,.3,1) infinite; }

        @keyframes dev2-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        .dev2-f { animation: dev2-float 5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .sw2 * { animation: none !important; }
          .dev2-a, .dev2-focus, .dev2-flash, .dev2-cover { opacity: 0; }
          .dev2-b { opacity: 1; }
        }
      `}</style>

      <svg className="sw2" viewBox="0 0 520 340" style={{ width: "92%", maxWidth: 500 }} xmlns="http://www.w3.org/2000/svg" fontFamily="inherit">
        <defs>
          <linearGradient id="dev2-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <radialGradient id="dev2-orb" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffd1f1" />
            <stop offset="35%" stopColor={gradStart} />
            <stop offset="75%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#1e1b6b" />
          </radialGradient>
          <radialGradient id="dev2-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(252,3,176,0.45)" />
            <stop offset="100%" stopColor="rgba(252,3,176,0)" />
          </radialGradient>
        </defs>

        {/* ---- pannello di gestione ---- */}
        <g className="dev2-f">
          <rect x="16" y="30" width="160" height="276" rx="16" fill="var(--w-card)" stroke="var(--w-card-b)" />
          <rect x="30" y="44" width="16" height="16" rx="5" fill="url(#dev2-g)" />
          <text x="54" y="56" fontSize="10" fontWeight="800" fill="var(--w-t)">Pannello</text>
          <text x="162" y="56" fontSize="7" textAnchor="end" fill="var(--w-m)">Home</text>

          <text x="30" y="82" fontSize="7.5" fontWeight="600" fill="var(--w-m)">Titolo hero</text>
          <rect x="30" y="88" width="132" height="24" rx="8" fill="var(--w-chip)" stroke="var(--w-card-b)" />
          <rect className="dev2-focus" x="30" y="88" width="132" height="24" rx="8" fill="none" stroke="url(#dev2-g)" strokeWidth="1.5" />
          <text className="dev2-a" x="40" y="103.5" fontSize="8.5" fill="var(--w-t)">Benvenuti sul sito</text>
          <g className="dev2-b">
            <text x="40" y="103.5" fontSize="8.5" fill="var(--w-t)">Arredi su misura</text>
          </g>

          <text x="30" y="132" fontSize="7.5" fontWeight="600" fill="var(--w-m)">Sezioni</text>
          {[
            { n: "Hero 3D", c: "dev2-r0" },
            { n: "Servizi", c: "dev2-r1" },
            { n: "Recensioni", c: "dev2-r2" },
          ].map((r, i) => (
            <g key={r.n} className={r.c}>
              <rect x="30" y={138 + i * 22} width="132" height="18" rx="6" fill="var(--w-chip)" stroke="var(--w-card-b)" />
              <g fill="var(--w-m)">
                <circle cx="38" cy={144 + i * 22} r="1" />
                <circle cx="42" cy={144 + i * 22} r="1" />
                <circle cx="38" cy={150 + i * 22} r="1" />
                <circle cx="42" cy={150 + i * 22} r="1" />
              </g>
              <text x="50" y={150 + i * 22} fontSize="8" fontWeight="600" fill="var(--w-t)">{r.n}</text>
            </g>
          ))}

          <text x="30" y="226" fontSize="8" fontWeight="600" fill="var(--w-t)">Animazioni</text>
          <rect x="134" y="217" width="28" height="15" rx="7.5" fill="url(#dev2-g)" />
          <circle cx="154.5" cy="224.5" r="5.5" fill="#fff" />
          <text x="30" y="250" fontSize="8" fontWeight="600" fill="var(--w-t)">Modalità scura</text>
          <rect x="134" y="241" width="28" height="15" rx="7.5" fill="var(--w-chip)" stroke="var(--w-card-b)" />
          <circle cx="141.5" cy="248.5" r="5.5" fill="var(--w-m)" />

          <g className="dev2-pub">
            <rect x="30" y="268" width="132" height="26" rx="13" fill="var(--w-t)" />
            <text x="96" y="284.5" fontSize="9" fontWeight="800" textAnchor="middle" fill="var(--w-card)">Pubblica</text>
          </g>
        </g>

        {/* ---- anteprima del sito ---- */}
        <rect x="192" y="16" width="312" height="214" rx="16" fill="#0c1529" stroke="rgba(255,255,255,0.14)" />
        <rect x="192" y="16" width="312" height="214" rx="16" fill="none" stroke="url(#dev2-g)" strokeWidth="1.3" opacity="0.4" />
        <circle cx="208" cy="31" r="3.2" fill="#ff5f57" />
        <circle cx="219" cy="31" r="3.2" fill="#febc2e" />
        <circle cx="230" cy="31" r="3.2" fill="#28c840" />
        <rect x="290" y="23" width="116" height="15" rx="7.5" fill="rgba(255,255,255,0.06)" />
        <text x="348" y="33.5" fontSize="7" textAnchor="middle" fill="rgba(255,255,255,0.55)">tuosito.it</text>
        <line x1="192" x2="504" y1="45" y2="45" stroke="rgba(255,255,255,0.08)" />

        {/* nav */}
        <rect x="208" y="58" width="34" height="6" rx="3" fill="url(#dev2-g)" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={370 + i * 34} y="59" width="24" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
        ))}

        {/* hero: titolo che si aggiorna */}
        <text className="dev2-a" x="208" y="104" fontSize="17" fontWeight="800" fill="#fff">Benvenuti</text>
        <text className="dev2-a" x="208" y="124" fontSize="17" fontWeight="800" fill="#fff">sul sito</text>
        <g className="dev2-b">
          <text x="208" y="104" fontSize="17" fontWeight="800" fill="#fff">Arredi</text>
          <text x="208" y="124" fontSize="17" fontWeight="800" fill="url(#dev2-g)">su misura</text>
        </g>
        <rect x="208" y="138" width="110" height="5" rx="2.5" fill="rgba(255,255,255,0.35)" />
        <rect x="208" y="148" width="86" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
        <rect x="208" y="166" width="70" height="20" rx="10" fill="#fff" />
        <rect x="222" y="174" width="42" height="4" rx="2" fill="#0c1529" />
        <rect className="dev2-flash" x="200" y="84" width="140" height="50" rx="8" fill="rgba(255,255,255,0.12)" />

        {/* oggetto 3D */}
        <circle cx="420" cy="130" r="62" fill="url(#dev2-glow)" />
        <g className="dev2-orb">
          <circle cx="420" cy="130" r="34" fill="url(#dev2-orb)" />
          <g transform="rotate(-18 420 130)">
            <ellipse cx="420" cy="130" rx="56" ry="15" fill="none" stroke="url(#dev2-g)" strokeWidth="1.6" opacity="0.85" />
            <circle r="3.5" fill="#fff">
              <animateMotion dur="6s" repeatCount="indefinite" path="M476 130 A56 15 0 1 1 364 130 A56 15 0 1 1 476 130" />
            </circle>
          </g>
          <ellipse cx="420" cy="130" rx="48" ry="12" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" transform="rotate(28 420 130)" />
          <ellipse cx="408" cy="116" rx="9" ry="5" fill="#fff" opacity="0.35" transform="rotate(-30 408 116)" />
        </g>
        <ellipse cx="420" cy="206" rx="34" ry="5" fill="#000" opacity="0.3" />

        {/* ---- codice del componente ---- */}
        <rect x="192" y="244" width="312" height="78" rx="14" fill="#0a1222" stroke="rgba(255,255,255,0.12)" />
        <text x="206" y="264" fontSize="7" fill="rgba(255,255,255,0.4)">Hero.tsx</text>
        <text x="206" y="282" fontSize="9" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <tspan fill="rgba(255,255,255,0.45)">&lt;</tspan>
          <tspan fill="#ff5fcf">Hero3D</tspan>
          <tspan fill="#8fb8ff"> title</tspan>
          <tspan fill="rgba(255,255,255,0.6)">=</tspan>
          <tspan fill="#34d399">{"{cms.title}"}</tspan>
        </text>
        <text x="218" y="296" fontSize="9" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <tspan fill="#8fb8ff">motion</tspan>
          <tspan fill="rgba(255,255,255,0.6)">=</tspan>
          <tspan fill="#fbbf24">&quot;orbit&quot;</tspan>
          <tspan fill="rgba(255,255,255,0.45)"> /&gt;</tspan>
        </text>
        <rect x="408" y="256" width="84" height="18" rx="9" fill="rgba(52,211,153,0.14)" />
        <text x="450" y="268" fontSize="7.5" fontWeight="800" textAnchor="middle" fill="#34d399">✓ Build ok</text>
        {["Next.js", "Sanity", "3D"].map((t, i) => (
          <g key={t}>
            <rect x={392 + i * 36} y="290" width="32" height="16" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
            <text x={408 + i * 36} y="301" fontSize="6.5" fontWeight="700" textAnchor="middle" fill="rgba(255,255,255,0.75)">{t}</text>
          </g>
        ))}
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   HOME — RESEARCH
========================================================= */

function HomeResearchVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes hr-cursor {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(42px, 18px); }
          60% { transform: translate(92px, -12px); }
          80% { transform: translate(128px, 28px); }
        }

        @keyframes hr-pulse {
          0%, 100% { opacity: .35; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes hr-card {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes hr-scan {
          0% { transform: translateY(-35px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }

        .hr-cursor {
          animation: hr-cursor 5s ease-in-out infinite;
        }

        .hr-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: hr-pulse 2.2s ease-in-out infinite;
        }

        .hr-card-one {
          animation: hr-card 4s ease-in-out infinite;
        }

        .hr-card-two {
          animation: hr-card 4s ease-in-out infinite .7s;
        }

        .hr-scan {
          animation: hr-scan 3.4s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 25% 35%, rgba(252,3,176,.10), transparent 32%), radial-gradient(circle at 75% 65%, rgba(4,124,249,.10), transparent 34%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "92%", maxWidth: 490 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="homeResearchGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>

          <filter id="homeResearchGlow">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Browser principale */}
        <rect
          x="72"
          y="38"
          width="376"
          height="244"
          rx="18"
          fill="var(--vp-panel)"
          stroke="var(--vp-border)"
        />

        {/* Browser top */}
        <rect
          x="72"
          y="38"
          width="376"
          height="38"
          rx="18"
          fill="var(--vp-panel-soft)"
        />

        <rect
          x="72"
          y="60"
          width="376"
          height="16"
          fill="var(--vp-panel-soft)"
        />

        <circle cx="94" cy="57" r="4" fill="#fb7185" />
        <circle cx="108" cy="57" r="4" fill="#facc15" />
        <circle cx="122" cy="57" r="4" fill="#22c55e" />

        <rect
          x="155"
          y="49"
          width="190"
          height="16"
          rx="8"
          fill="var(--vp-panel-subtle)"
          stroke="var(--vp-border-soft)"
        />

        {/* Sidebar research */}
        <rect
          x="88"
          y="94"
          width="98"
          height="166"
          rx="12"
          fill="var(--vp-panel-subtle)"
          stroke="var(--vp-border-soft)"
        />

        <text
          x="103"
          y="116"
          fontSize="8"
          fontWeight="700"
          fill="var(--vp-muted)"
          letterSpacing="1"
        >
          RESEARCH
        </text>

        {[
          { y: 132, w: 62 },
          { y: 151, w: 48 },
          { y: 170, w: 70 },
          { y: 189, w: 55 },
        ].map((item, index) => (
          <g key={index}>
            <circle
              cx="104"
              cy={item.y}
              r="3"
              fill={index === 1 ? gradStart : "var(--vp-muted-soft)"}
            />
            <rect
              x="114"
              y={item.y - 3}
              width={item.w}
              height="6"
              rx="3"
              fill={
                index === 1
                  ? "url(#homeResearchGradient)"
                  : "var(--vp-muted-soft)"
              }
            />
          </g>
        ))}

        {/* Insight principale */}
        <rect
          x="202"
          y="94"
          width="226"
          height="76"
          rx="14"
          fill="var(--vp-panel)"
          stroke="var(--vp-border)"
        />

        <text
          x="218"
          y="115"
          fontSize="8"
          fill="var(--vp-muted)"
          fontWeight="700"
          letterSpacing=".8"
        >
          COSA CONTA PER IL CLIENTE
        </text>

        <rect
          x="218"
          y="128"
          width="152"
          height="8"
          rx="4"
          fill="var(--vp-text)"
          opacity=".72"
        />

        <rect
          x="218"
          y="143"
          width="118"
          height="6"
          rx="3"
          fill="var(--vp-muted-soft)"
        />

        {/* Scan */}
        <g className="hr-scan">
          <rect
            x="202"
            y="102"
            width="226"
            height="2"
            rx="1"
            fill="url(#homeResearchGradient)"
            opacity=".8"
          />
        </g>

        {/* Insight cards */}
        <g className="hr-card-one">
          <rect
            x="202"
            y="184"
            width="104"
            height="66"
            rx="12"
            fill="var(--vp-panel)"
            stroke="rgba(252,3,176,.22)"
          />

          <circle
            className="hr-pulse"
            cx="220"
            cy="203"
            r="5"
            fill={gradStart}
          />

          <text
            x="232"
            y="206"
            fontSize="8"
            fill="var(--vp-muted)"
            fontWeight="700"
          >
            DESIDERI
          </text>

          <rect
            x="218"
            y="219"
            width="67"
            height="6"
            rx="3"
            fill="var(--vp-text)"
            opacity=".5"
          />

          <rect
            x="218"
            y="232"
            width="48"
            height="5"
            rx="2.5"
            fill="var(--vp-muted-soft)"
          />
        </g>

        <g className="hr-card-two">
          <rect
            x="320"
            y="184"
            width="108"
            height="66"
            rx="12"
            fill="var(--vp-panel)"
            stroke="rgba(4,124,249,.22)"
          />

          <circle
            className="hr-pulse"
            cx="338"
            cy="203"
            r="5"
            fill={gradEnd}
            style={{ animationDelay: ".8s" }}
          />

          <text
            x="350"
            y="206"
            fontSize="8"
            fill="var(--vp-muted)"
            fontWeight="700"
          >
            OBIEZIONI
          </text>

          <rect
            x="336"
            y="219"
            width="70"
            height="6"
            rx="3"
            fill="var(--vp-text)"
            opacity=".5"
          />

          <rect
            x="336"
            y="232"
            width="52"
            height="5"
            rx="2.5"
            fill="var(--vp-muted-soft)"
          />
        </g>

        {/* Cursor */}
        <g className="hr-cursor" transform="translate(260 145)">
          <path
            d="M0 0 L0 22 L6 16 L11 27 L16 24 L11 14 L20 14 Z"
            fill="var(--vp-text-strong)"
            stroke="var(--vp-border)"
          />
        </g>

        {/* Badge */}
        <g transform="translate(88 226)">
          <rect
            width="82"
            height="22"
            rx="11"
            fill="rgba(252,3,176,.08)"
            stroke="rgba(252,3,176,.2)"
          />

          <text
            x="12"
            y="15"
            fontSize="8"
            fontWeight="700"
            fill={gradStart}
          >
            INSIGHT FOUND
          </text>
        </g>
      </svg>
    </VisualShell>
  )
}


/* =========================================================
   HOME — EXPERIENCE / UX
========================================================= */

function HomeExperienceVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes he-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes he-flow {
          from { stroke-dashoffset: 180; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes he-button {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }

        @keyframes he-node {
          0%, 100% { opacity: .35; }
          50% { opacity: 1; }
        }

        .he-screen {
          animation: he-float 4s ease-in-out infinite;
        }

        .he-flow {
          stroke-dasharray: 8 7;
          animation: he-flow 5s linear infinite;
        }

        .he-button {
          transform-box: fill-box;
          transform-origin: center;
          animation: he-button 2.4s ease-in-out infinite;
        }

        .he-node {
          animation: he-node 2s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 45%, rgba(124,58,237,.08), transparent 35%), radial-gradient(circle at 25% 70%, rgba(252,3,176,.08), transparent 30%), radial-gradient(circle at 80% 30%, rgba(4,124,249,.08), transparent 30%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "92%", maxWidth: 490 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="homeExperienceGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>

          <filter id="heGlow">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Connessioni */}
        <path
          className="he-flow"
          d="M90 160 C135 160 135 100 185 100"
          fill="none"
          stroke={gradStart}
          strokeWidth="2"
          opacity=".45"
        />

        <path
          className="he-flow"
          d="M335 100 C385 100 385 160 430 160"
          fill="none"
          stroke={gradEnd}
          strokeWidth="2"
          opacity=".45"
        />

        <path
          className="he-flow"
          d="M260 240 C260 270 335 270 370 245"
          fill="none"
          stroke="url(#homeExperienceGradient)"
          strokeWidth="2"
          opacity=".35"
        />

        {/* Nodi */}
        <g>
          <circle
            cx="82"
            cy="160"
            r="24"
            fill="var(--vp-panel)"
            stroke="rgba(252,3,176,.25)"
          />
          <circle
            className="he-node"
            cx="82"
            cy="160"
            r="7"
            fill={gradStart}
          />

          <text
            x="82"
            y="196"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="var(--vp-muted)"
          >
            MESSAGGIO
          </text>
        </g>

        <g>
          <circle
            cx="438"
            cy="160"
            r="24"
            fill="var(--vp-panel)"
            stroke="rgba(4,124,249,.25)"
          />

          <path
            d="M430 160 L436 166 L447 153"
            fill="none"
            stroke={gradEnd}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text
            x="438"
            y="196"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="var(--vp-muted)"
          >
            DECISIONE
          </text>
        </g>

        {/* Browser centrale */}
        <g className="he-screen">
          <rect
            x="174"
            y="54"
            width="172"
            height="194"
            rx="16"
            fill="var(--vp-panel)"
            stroke="url(#homeExperienceGradient)"
            strokeOpacity=".35"
          />

          <rect
            x="174"
            y="54"
            width="172"
            height="28"
            rx="16"
            fill="var(--vp-panel-soft)"
          />

          <rect
            x="174"
            y="70"
            width="172"
            height="12"
            fill="var(--vp-panel-soft)"
          />

          <circle cx="190" cy="68" r="3" fill="#fb7185" />
          <circle cx="201" cy="68" r="3" fill="#facc15" />
          <circle cx="212" cy="68" r="3" fill="#22c55e" />

          {/* Hero */}
          <rect
            x="191"
            y="101"
            width="102"
            height="8"
            rx="4"
            fill="var(--vp-text)"
            opacity=".75"
          />

          <rect
            x="191"
            y="116"
            width="132"
            height="7"
            rx="3.5"
            fill="var(--vp-text)"
            opacity=".75"
          />

          <rect
            x="191"
            y="132"
            width="96"
            height="5"
            rx="2.5"
            fill="var(--vp-muted-soft)"
          />

          <rect
            x="191"
            y="143"
            width="112"
            height="5"
            rx="2.5"
            fill="var(--vp-muted-soft)"
          />

          {/* CTA */}
          <g className="he-button">
            <rect
              x="191"
              y="163"
              width="76"
              height="25"
              rx="12.5"
              fill="url(#homeExperienceGradient)"
            />

            <text
              x="229"
              y="179"
              textAnchor="middle"
              fontSize="7"
              fontWeight="800"
              fill="white"
            >
              CALL TO ACTION
            </text>
          </g>

          {/* Trust cards */}
          <rect
            x="191"
            y="205"
            width="38"
            height="26"
            rx="6"
            fill="var(--vp-panel-subtle)"
            stroke="var(--vp-border-soft)"
          />

          <rect
            x="238"
            y="205"
            width="38"
            height="26"
            rx="6"
            fill="var(--vp-panel-subtle)"
            stroke="var(--vp-border-soft)"
          />

          <rect
            x="285"
            y="205"
            width="38"
            height="26"
            rx="6"
            fill="var(--vp-panel-subtle)"
            stroke="var(--vp-border-soft)"
          />

          <circle cx="210" cy="218" r="4" fill={gradStart} opacity=".65" />
          <circle cx="257" cy="218" r="4" fill="#7c3aed" opacity=".65" />
          <circle cx="304" cy="218" r="4" fill={gradEnd} opacity=".65" />
        </g>

        {/* Label UX */}
        <g transform="translate(333 78)">
          <rect
            width="104"
            height="30"
            rx="10"
            fill="var(--vp-panel)"
            stroke="var(--vp-border)"
          />

          <circle
            className="he-node"
            cx="16"
            cy="15"
            r="4"
            fill={gradEnd}
          />

          <text
            x="28"
            y="18"
            fontSize="8"
            fill="var(--vp-text)"
            fontWeight="700"
          >
            USER JOURNEY
          </text>
        </g>

        {/* Label hierarchy */}
        <g transform="translate(82 78)">
          <rect
            width="96"
            height="30"
            rx="10"
            fill="var(--vp-panel)"
            stroke="var(--vp-border)"
          />

          <circle
            className="he-node"
            cx="16"
            cy="15"
            r="4"
            fill={gradStart}
            style={{ animationDelay: ".6s" }}
          />

          <text
            x="28"
            y="18"
            fontSize="8"
            fill="var(--vp-text)"
            fontWeight="700"
          >
            HIERARCHY
          </text>
        </g>
      </svg>
    </VisualShell>
  )
}


/* =========================================================
   HOME — CONTINUOUS OPTIMIZATION
========================================================= */

function HomeOptimizationVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes ho-line {
          from { stroke-dashoffset: 500; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes ho-ring {
          from { stroke-dashoffset: 250; }
          to { stroke-dashoffset: 55; }
        }

        @keyframes ho-pulse {
          0%, 100% { opacity: .4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.18); }
        }

        @keyframes ho-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .ho-line {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: ho-line 2.6s cubic-bezier(.4,0,.2,1) forwards;
        }

        .ho-ring {
          stroke-dasharray: 250;
          stroke-dashoffset: 250;
          animation: ho-ring 2s cubic-bezier(.4,0,.2,1) forwards .4s;
        }

        .ho-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: ho-pulse 2s ease-in-out infinite 2s;
        }

        .ho-float {
          animation: ho-float 4s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 70% 30%, rgba(4,124,249,.10), transparent 34%), radial-gradient(circle at 25% 70%, rgba(252,3,176,.08), transparent 34%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "92%", maxWidth: 490 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="homeOptimizationGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>

          <linearGradient id="homeOptimizationArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradEnd} stopOpacity=".22" />
            <stop offset="100%" stopColor={gradEnd} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dashboard */}
        <rect
          x="58"
          y="38"
          width="404"
          height="244"
          rx="18"
          fill="var(--vp-panel)"
          stroke="var(--vp-border)"
        />

        <text
          x="80"
          y="67"
          fontSize="9"
          fontWeight="700"
          fill="var(--vp-muted)"
          letterSpacing=".8"
        >
          CONTINUOUS OPTIMIZATION
        </text>

        <circle
          className="ho-pulse"
          cx="436"
          cy="63"
          r="5"
          fill="#22c55e"
        />

        <text
          x="423"
          y="66"
          textAnchor="end"
          fontSize="8"
          fill="#22c55e"
          fontWeight="700"
        >
          ACTIVE
        </text>

        {/* Chart */}
        <rect
          x="80"
          y="91"
          width="244"
          height="145"
          rx="12"
          fill="var(--vp-panel-subtle)"
          stroke="var(--vp-border-soft)"
        />

        {[120, 150, 180, 210].map((y) => (
          <line
            key={y}
            x1="94"
            y1={y}
            x2="310"
            y2={y}
            stroke="var(--vp-line)"
            strokeWidth="1"
          />
        ))}

        <path
          d="M96 208 C125 201 142 205 160 187 C179 168 195 180 215 157 C236 134 252 148 270 120 C283 101 295 110 309 97 L309 224 L96 224 Z"
          fill="url(#homeOptimizationArea)"
        />

        <path
          className="ho-line"
          d="M96 208 C125 201 142 205 160 187 C179 168 195 180 215 157 C236 134 252 148 270 120 C283 101 295 110 309 97"
          fill="none"
          stroke="url(#homeOptimizationGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <circle
          className="ho-pulse"
          cx="309"
          cy="97"
          r="6"
          fill={gradEnd}
        />

        {/* Loop */}
        <g className="ho-float">
          <circle
            cx="387"
            cy="145"
            r="42"
            fill="var(--vp-panel-subtle)"
            stroke="var(--vp-border)"
          />

          <circle
            cx="387"
            cy="145"
            r="31"
            fill="none"
            stroke="var(--vp-line)"
            strokeWidth="6"
          />

          <circle
            className="ho-ring"
            cx="387"
            cy="145"
            r="31"
            fill="none"
            stroke="url(#homeOptimizationGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            transform="rotate(-90 387 145)"
          />

          <text
            x="387"
            y="141"
            textAnchor="middle"
            fontSize="9"
            fill="var(--vp-muted)"
            fontWeight="700"
          >
            TEST
          </text>

          <text
            x="387"
            y="158"
            textAnchor="middle"
            fontSize="11"
            fill="var(--vp-text-strong)"
            fontWeight="800"
          >
            LEARN
          </text>
        </g>

        {/* Bottom workflow */}
        <g transform="translate(344 211)">
          <rect
            width="88"
            height="28"
            rx="9"
            fill="var(--vp-panel)"
            stroke="var(--vp-border)"
          />

          <circle cx="14" cy="14" r="4" fill={gradStart} />

          <text
            x="25"
            y="17"
            fontSize="8"
            fontWeight="700"
            fill="var(--vp-text)"
          >
            ANALYZE
          </text>
        </g>

        <g transform="translate(344 247)">
          <rect
            width="88"
            height="22"
            rx="11"
            fill="rgba(4,124,249,.08)"
            stroke="rgba(4,124,249,.20)"
          />

          <text
            x="44"
            y="14"
            textAnchor="middle"
            fontSize="7"
            fontWeight="700"
            fill={gradEnd}
          >
            IMPROVE → REPEAT
          </text>
        </g>

        {/* Caption chart */}
        <g transform="translate(94 245)">
          <circle cx="4" cy="4" r="4" fill={gradStart} />

          <text
            x="15"
            y="7"
            fontSize="8"
            fill="var(--vp-muted)"
            fontWeight="700"
          >
            DATA → INSIGHT → ITERATION
          </text>
        </g>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   VISUAL SWITCH
========================================================= */

export function ValuePropVisual({
  visualKey,
}: {
  visualKey: string
}) {
  switch (visualKey) {
        case "home-research":
      return <HomeResearchVisual />

    case "home-experience":
      return <HomeExperienceVisual />

    case "home-optimization":
      return <HomeOptimizationVisual />
      
    case "ecommerce-ux":
      return <EcommerceUXVisual />

    case "ecommerce-performance":
      return <EcommerceSpeedVisual />

    case "ecommerce-valore":
      return <EcommerceValoreVisual />

    case "ecommerce-scalabile":
      return <EcommerceScalabileVisual />

    case "cro-analisi":
      return <CROAnalisiVisual />

    case "cro-abtest":
      return <CROABTestVisual />

    case "cro-crescita":
      return <CROCrescitaVisual />

    case "temi-nicchia":
      return <TemiNicchiaVisual />

    case "temi-editor":
      return <TemiEditorVisual />

    case "home-strategy":
      return <HomeStrategyVisual />
    case "home-convert":
      return <HomeConvertVisual />
    case "home-immersive":
      return <HomeImmersiveVisual />

    case "home-referente":
      return <HomeReferenteVisual />

    case "sitiweb-struttura":
      return <SitiwebStrutturaVisual />

    case "sitiweb-immersive":
      return <SitiwebSeoVisual />

    case "sitiweb-performance":
      return <EcommercePerformanceVisual />

    case "sitiweb-sviluppo":
      return <SitiwebSviluppoVisual />

    default:
      return (
        <VisualShell>
          <p
            style={{
              color: "var(--vp-muted)",
              fontSize: 12,
              position: "relative",
              zIndex: 2,
            }}
          >
            Visual: {visualKey}
          </p>
        </VisualShell>
      )
  }
}