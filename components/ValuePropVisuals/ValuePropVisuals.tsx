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
  return (
    <VisualShell>
      <style>{`
        @keyframes ux-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes ux-pulse {
          0%,100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.96);
          }
        }

        @keyframes ux-slide-in {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes ux-cart {
          0% { transform: translateX(0); }
          60% { transform: translateX(6px); }
          100% { transform: translateX(0); }
        }

        @keyframes ux-badge {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .ux-phone {
          animation: ux-float 3.5s ease-in-out infinite;
        }

        .ux-heart1 {
          animation: ux-pulse 2s ease-in-out infinite;
        }

        .ux-heart2 {
          animation: ux-pulse 2s ease-in-out infinite 0.6s;
        }

        .ux-cart {
          animation: ux-cart 2.5s ease-in-out infinite 1s;
        }

        .ux-badge {
          animation: ux-badge 2s ease-in-out infinite 0.3s;
        }

        .ux-item1 {
          animation: ux-slide-in 0.5s ease forwards 0.2s;
          opacity: 0;
        }

        .ux-item2 {
          animation: ux-slide-in 0.5s ease forwards 0.5s;
          opacity: 0;
        }

        .ux-item3 {
          animation: ux-slide-in 0.5s ease forwards 0.8s;
          opacity: 0;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(252,3,176,0.10) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(4,124,249,0.08) 0%, transparent 60%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "90%", maxWidth: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ux-g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>

          <linearGradient id="ux-g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2a4a" />
            <stop offset="100%" stopColor="#0d1b38" />
          </linearGradient>

          <filter id="ux-blur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <ellipse
          cx="160"
          cy="160"
          rx="80"
          ry="60"
          fill={gradStart}
          opacity="0.08"
          filter="url(#ux-blur)"
        />

        <ellipse
          cx="360"
          cy="160"
          rx="80"
          ry="60"
          fill={gradEnd}
          opacity="0.08"
          filter="url(#ux-blur)"
        />

        <g className="ux-phone">
          <rect
            x="155"
            y="30"
            width="120"
            height="210"
            rx="18"
            fill="url(#ux-g2)"
            stroke="rgba(255,255,255,0.12)"
          />

          <rect
            x="155"
            y="30"
            width="120"
            height="210"
            rx="18"
            fill="none"
            stroke="url(#ux-g1)"
            strokeWidth="1.5"
            opacity="0.4"
          />

          <rect
            x="195"
            y="36"
            width="40"
            height="7"
            rx="4"
            fill="rgba(0,0,0,0.5)"
          />

          <rect
            x="165"
            y="52"
            width="100"
            height="80"
            rx="10"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.06)"
          />

          <rect
            x="185"
            y="68"
            width="60"
            height="48"
            rx="6"
            fill="rgba(252,3,176,0.15)"
          />

          <circle
            cx="215"
            cy="92"
            r="18"
            fill="rgba(252,3,176,0.2)"
          />

          <circle
            cx="215"
            cy="92"
            r="10"
            fill="rgba(252,3,176,0.4)"
          />

          <g className="ux-item1">
            <rect
              x="165"
              y="142"
              width="70"
              height="6"
              rx="3"
              fill="rgba(255,255,255,0.7)"
            />

            <rect
              x="165"
              y="154"
              width="45"
              height="5"
              rx="2.5"
              fill="rgba(255,255,255,0.3)"
            />
          </g>

          <g className="ux-item2">
            <rect
              x="165"
              y="166"
              width="50"
              height="6"
              rx="3"
              fill="url(#ux-g1)"
              opacity="0.9"
            />
          </g>

          <g className="ux-item3">
            <rect
              x="165"
              y="180"
              width="100"
              height="26"
              rx="13"
              fill="url(#ux-g1)"
            />

            <rect
              x="185"
              y="190"
              width="60"
              height="6"
              rx="3"
              fill="rgba(255,255,255,0.9)"
            />
          </g>

          <circle cx="205" cy="226" r="3" fill="url(#ux-g1)" />
          <circle cx="215" cy="226" r="2" fill="rgba(255,255,255,0.2)" />
          <circle cx="225" cy="226" r="2" fill="rgba(255,255,255,0.2)" />
        </g>

        <g className="ux-heart1">
          <text x="92" y="105" fontSize="22" fill={gradStart}>
            ♥
          </text>
        </g>

        <g className="ux-heart2">
          <text x="340" y="85" fontSize="16" fill={gradEnd}>
            ♥
          </text>
        </g>

        <g className="ux-cart" transform="translate(340,130)">
          <rect
            width="100"
            height="52"
            rx="14"
            fill="var(--vp-panel)"
            stroke="var(--vp-border)"
          />

          <text x="16" y="22" fontSize="18">
            🛒
          </text>

          <rect
            x="38"
            y="10"
            width="50"
            height="5"
            rx="2.5"
            fill="var(--vp-text)"
            opacity="0.6"
          />

          <rect
            x="38"
            y="20"
            width="35"
            height="4"
            rx="2"
            fill="var(--vp-muted)"
          />

          <rect
            x="38"
            y="32"
            width="42"
            height="12"
            rx="6"
            fill="url(#ux-g1)"
          />

          <rect
            x="50"
            y="36"
            width="18"
            height="4"
            rx="2"
            fill="white"
          />
        </g>

        <g className="ux-badge" transform="translate(68,175)">
          <rect
            width="78"
            height="38"
            rx="10"
            fill="rgba(252,3,176,0.12)"
            stroke="rgba(252,3,176,0.3)"
          />

          <text
            x="12"
            y="24"
            fontSize="15"
            fontWeight="800"
            fill={gradStart}
          >
            +42%
          </text>
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
          to { stroke-dashoffset: 0; }
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
            100
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
  return (
    <VisualShell>
      <style>{`
        @keyframes sc-notify {
          0% {
            opacity:0;
            transform:translateY(8px);
          }
          20% {
            opacity:1;
            transform:translateY(0);
          }
          80% {
            opacity:1;
            transform:translateY(0);
          }
          100% {
            opacity:0;
            transform:translateY(-8px);
          }
        }

        @keyframes sc-count {
          from {
            opacity:0;
            transform:translateY(6px);
          }
          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes sc-pulse {
          0%,100% { opacity:0.4; }
          50% { opacity:1; }
        }

        .sc-notify1 {
          animation:sc-notify 3s ease-in-out infinite 0.5s;
          opacity:0;
        }

        .sc-notify2 {
          animation:sc-notify 3s ease-in-out infinite 1.8s;
          opacity:0;
        }

        .sc-notify3 {
          animation:sc-notify 3s ease-in-out infinite 3.1s;
          opacity:0;
        }

        .sc-count {
          animation:sc-count 0.6s ease forwards 0.4s;
          opacity:0;
        }

        .sc-dot {
          animation:sc-pulse 1.5s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(4,124,249,0.10) 0%, transparent 60%), radial-gradient(ellipse at 20% 50%, rgba(252,3,176,0.08) 0%, transparent 60%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "90%", maxWidth: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sc-g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        </defs>

        {/* telefono volutamente scuro anche in light */}
        <rect
          x="185"
          y="18"
          width="150"
          height="284"
          rx="26"
          fill="#0d1b38"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
        />

        <rect
          x="185"
          y="18"
          width="150"
          height="284"
          rx="26"
          fill="none"
          stroke="url(#sc-g1)"
          strokeWidth="1.5"
          opacity="0.35"
        />

        <rect
          x="228"
          y="26"
          width="64"
          height="10"
          rx="5"
          fill="rgba(0,0,0,0.6)"
        />

        <text
          x="260"
          y="72"
          textAnchor="middle"
          fontSize="10"
          fill="rgba(255,255,255,0.35)"
        >
          Monday, June 5
        </text>

        <text
          x="260"
          y="102"
          textAnchor="middle"
          fontSize="36"
          fontWeight="200"
          fill="white"
        >
          9:41
        </text>

        <rect
          x="196"
          y="115"
          width="128"
          height="0.5"
          fill="rgba(255,255,255,0.1)"
        />

        <g className="sc-notify1">
          <rect
            x="196"
            y="124"
            width="128"
            height="44"
            rx="12"
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.08)"
          />

          <rect
            x="206"
            y="134"
            width="22"
            height="22"
            rx="6"
            fill="#96BF48"
          />

          <text x="217" y="150" textAnchor="middle" fontSize="12">
            🛍
          </text>

          <rect
            x="234"
            y="132"
            width="68"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.5)"
          />

          <rect
            x="234"
            y="143"
            width="48"
            height="5"
            rx="2"
            fill="rgba(255,255,255,0.25)"
          />

          <text
            x="316"
            y="138"
            textAnchor="end"
            fontSize="8"
            fill={gradStart}
            fontWeight="700"
          >
            now
          </text>

          <text
            x="234"
            y="158"
            fontSize="7"
            fill="rgba(255,255,255,0.45)"
          >
            Nuovo ordine ricevuto
          </text>
        </g>

        <g className="sc-notify2">
          <rect
            x="196"
            y="180"
            width="128"
            height="44"
            rx="12"
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.08)"
          />

          <rect
            x="206"
            y="190"
            width="22"
            height="22"
            rx="6"
            fill="#96BF48"
          />

          <text x="217" y="206" textAnchor="middle" fontSize="12">
            💳
          </text>

          <rect
            x="234"
            y="188"
            width="56"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.5)"
          />

          <rect
            x="234"
            y="199"
            width="40"
            height="5"
            rx="2"
            fill="rgba(255,255,255,0.25)"
          />

          <text
            x="316"
            y="194"
            textAnchor="end"
            fontSize="8"
            fill={gradStart}
            fontWeight="700"
          >
            now
          </text>

          <text
            x="234"
            y="214"
            fontSize="7"
            fill="rgba(255,255,255,0.45)"
          >
            Pagamento confermato
          </text>
        </g>

        <g className="sc-notify3">
          <rect
            x="196"
            y="236"
            width="128"
            height="44"
            rx="12"
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.08)"
          />

          <rect
            x="206"
            y="246"
            width="22"
            height="22"
            rx="6"
            fill="#96BF48"
          />

          <text x="217" y="262" textAnchor="middle" fontSize="12">
            📦
          </text>

          <rect
            x="234"
            y="244"
            width="74"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.5)"
          />

          <rect
            x="234"
            y="255"
            width="52"
            height="5"
            rx="2"
            fill="rgba(255,255,255,0.25)"
          />

          <text
            x="316"
            y="250"
            textAnchor="end"
            fontSize="8"
            fill={gradStart}
            fontWeight="700"
          >
            now
          </text>

          <text
            x="234"
            y="270"
            fontSize="7"
            fill="rgba(255,255,255,0.45)"
          >
            Ordine spedito
          </text>
        </g>

        <rect
          x="232"
          y="290"
          width="56"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.2)"
        />

        <g transform="translate(30,80)">
          <rect
            width="120"
            height="64"
            rx="14"
            fill="var(--vp-panel)"
            stroke="var(--vp-border)"
          />

          <text
            x="14"
            y="22"
            fontSize="9"
            fill="var(--vp-muted)"
          >
            ORDINI OGGI
          </text>

          <g className="sc-count">
            <text
              x="14"
              y="48"
              fontSize="28"
              fontWeight="800"
              fill="var(--vp-text-strong)"
            >
              247
            </text>
          </g>

          <circle
            cx="100"
            cy="18"
            r="6"
            fill="rgba(34,197,94,0.3)"
          />

          <circle
            className="sc-dot"
            cx="100"
            cy="18"
            r="4"
            fill="#22c55e"
          />
        </g>

        <g transform="translate(370,80)">
          <rect
            width="120"
            height="64"
            rx="14"
            fill="var(--vp-panel)"
            stroke="var(--vp-border)"
          />

          <text
            x="14"
            y="22"
            fontSize="9"
            fill="var(--vp-muted)"
          >
            REVENUE
          </text>

          <text
            x="14"
            y="48"
            fontSize="24"
            fontWeight="800"
            fill="var(--vp-text-strong)"
          >
            €32k
          </text>

          <text
            x="14"
            y="62"
            fontSize="9"
            fill="#22c55e"
            fontWeight="700"
          >
            ↑ +18%
          </text>
        </g>
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
          from { height:0; y:180; }
          to { height:80px; y:100; }
        }

        @keyframes ab-fill-b {
          from { height:0; y:180; }
          to { height:130px; y:50; }
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
          y="100"
          width="70"
          height="80"
          rx="8"
          fill="url(#ab-ga)"
        />

        <rect
          className="ab-bar-b"
          x="295"
          y="100"
          width="70"
          height="80"
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

function SitiwebImmersiveVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes im-layer1 {
          0% {
            transform:translateY(0) translateX(0);
          }
          50% {
            transform:translateY(-6px) translateX(3px);
          }
          100% {
            transform:translateY(0) translateX(0);
          }
        }

        @keyframes im-layer2 {
          0% { transform:translateY(0); }
          50% { transform:translateY(-10px); }
          100% { transform:translateY(0); }
        }

        @keyframes im-layer3 {
          0% {
            transform:translateY(0) translateX(0);
          }
          50% {
            transform:translateY(-4px) translateX(-3px);
          }
          100% {
            transform:translateY(0) translateX(0);
          }
        }

        @keyframes im-glow {
          0%,100% { opacity:0.5; }
          50% { opacity:1; }
        }

        @keyframes im-cursor {
          0% { transform:translate(0,0); }
          33% { transform:translate(30px,-20px); }
          66% { transform:translate(-20px,20px); }
          100% { transform:translate(0,0); }
        }

        @keyframes im-ripple {
          0% {
            r:0;
            opacity:0.6;
          }
          100% {
            r:30;
            opacity:0;
          }
        }

        .im-l1 {
          animation:im-layer1 4s ease-in-out infinite;
        }

        .im-l2 {
          animation:im-layer2 3s ease-in-out infinite 0.5s;
        }

        .im-l3 {
          animation:im-layer3 5s ease-in-out infinite 1s;
        }

        .im-glow {
          animation:im-glow 2s ease-in-out infinite;
        }

        .im-cursor {
          animation:im-cursor 5s ease-in-out infinite;
        }

        .im-ripple {
          animation:im-ripple 2s ease-out infinite 1s;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.10) 0%, transparent 60%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "90%", maxWidth: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="im-g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>

          <filter id="im-blur">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <rect
          x="60"
          y="25"
          width="400"
          height="255"
          rx="16"
          fill="var(--vp-panel)"
          stroke="var(--vp-border)"
        />

        <g className="im-l3" opacity="0.5">
          <ellipse
            cx="260"
            cy="140"
            rx="120"
            ry="80"
            fill={gradStart}
            opacity="0.06"
            filter="url(#im-blur)"
          />

          <ellipse
            cx="300"
            cy="160"
            rx="100"
            ry="70"
            fill={gradEnd}
            opacity="0.08"
            filter="url(#im-blur)"
          />
        </g>

        <g className="im-l2">
          <rect
            x="120"
            y="70"
            width="280"
            height="160"
            rx="12"
            fill="var(--vp-panel-soft)"
            stroke="var(--vp-border)"
          />

          <rect
            x="140"
            y="90"
            width="180"
            height="18"
            rx="4"
            fill="var(--vp-line-strong)"
          />

          <rect
            x="140"
            y="115"
            width="240"
            height="12"
            rx="3"
            fill="var(--vp-line)"
          />

          <rect
            x="140"
            y="133"
            width="200"
            height="12"
            rx="3"
            fill="var(--vp-line)"
          />

          <rect
            x="140"
            y="160"
            width="100"
            height="32"
            rx="16"
            fill="url(#im-g1)"
          />

          <rect
            x="152"
            y="172"
            width="76"
            height="8"
            rx="4"
            fill="white"
            opacity="0.9"
          />
        </g>

        <g className="im-l1">
          <rect
            x="80"
            y="175"
            width="100"
            height="70"
            rx="12"
            fill="rgba(252,3,176,0.08)"
            stroke="rgba(252,3,176,0.2)"
          />

          <rect
            x="92"
            y="188"
            width="76"
            height="8"
            rx="4"
            fill="rgba(252,3,176,0.3)"
          />

          <rect
            x="92"
            y="202"
            width="55"
            height="6"
            rx="3"
            fill="var(--vp-line-strong)"
          />

          <rect
            x="340"
            y="60"
            width="100"
            height="70"
            rx="12"
            fill="rgba(4,124,249,0.08)"
            stroke="rgba(4,124,249,0.2)"
          />

          <rect
            x="352"
            y="73"
            width="76"
            height="8"
            rx="4"
            fill="rgba(4,124,249,0.5)"
          />

          <rect
            x="352"
            y="87"
            width="55"
            height="6"
            rx="3"
            fill="var(--vp-line-strong)"
          />
        </g>

        <g className="im-cursor" transform="translate(230,150)">
          <circle
            className="im-ripple"
            r="0"
            fill={gradStart}
            opacity="0"
          />

          <polygon
            points="0,0 0,18 5,14 9,20 11,19 7,13 14,13"
            fill="var(--vp-text-strong)"
            opacity="0.9"
          />
        </g>

        <circle
          className="im-glow"
          cx="260"
          cy="140"
          r="60"
          fill="url(#im-g1)"
          opacity="0.04"
          filter="url(#im-blur)"
        />

        <g transform="translate(80,290)">
          {["Animazioni", "Micro-interazioni", "Layout evoluti"].map(
            (text, i) => (
              <g key={text} transform={`translate(${i * 130},0)`}>
                <rect
                  width="110"
                  height="18"
                  rx="9"
                  fill="var(--vp-panel)"
                  stroke="var(--vp-border)"
                />

                <text
                  x="10"
                  y="13"
                  fontSize="8"
                  fill="var(--vp-muted)"
                >
                  {text}
                </text>
              </g>
            )
          )}
        </g>
      </svg>
    </VisualShell>
  )
}

/* =========================================================
   SITI WEB — SVILUPPO
========================================================= */

function SitiwebSviluppoVisual() {
  return (
    <VisualShell>
      <style>{`
        @keyframes sv-cursor {
          0%,100% { opacity:1; }
          50% { opacity:0; }
        }

        @keyframes sv-line {
          from {
            opacity:0;
            transform:translateY(6px);
          }
          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes sv-tag {
          0% { transform:scale(1); }
          50% { transform:scale(1.08); }
          100% { transform:scale(1); }
        }

        .sv-l1 {
          animation:sv-line 0.4s ease forwards 0.3s;
          opacity:0;
        }

        .sv-l2 {
          animation:sv-line 0.4s ease forwards 0.6s;
          opacity:0;
        }

        .sv-l3 {
          animation:sv-line 0.4s ease forwards 0.9s;
          opacity:0;
        }

        .sv-l4 {
          animation:sv-line 0.4s ease forwards 1.2s;
          opacity:0;
        }

        .sv-l5 {
          animation:sv-line 0.4s ease forwards 1.5s;
          opacity:0;
        }

        .sv-l6 {
          animation:sv-line 0.4s ease forwards 1.8s;
          opacity:0;
        }

        .sv-cursor {
          animation:sv-cursor 1s ease-in-out infinite 2s;
        }

        .sv-tag1 {
          animation:sv-tag 2.5s ease-in-out infinite 0.5s;
        }

        .sv-tag2 {
          animation:sv-tag 2.5s ease-in-out infinite 1s;
        }

        .sv-tag3 {
          animation:sv-tag 2.5s ease-in-out infinite 1.5s;
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(4,124,249,0.08) 0%, transparent 55%)",
        }}
      />

      <svg
        viewBox="0 0 520 320"
        style={{ width: "90%", maxWidth: 480 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sv-g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        </defs>

        {/* editor volutamente scuro anche in light */}
        <rect
          x="52"
          y="30"
          width="260"
          height="260"
          rx="14"
          fill="var(--vp-code-bg)"
          stroke="var(--vp-border)"
        />

        <rect
          x="52"
          y="30"
          width="260"
          height="32"
          rx="14"
          fill="rgba(255,255,255,0.03)"
        />

        <rect
          x="52"
          y="48"
          width="260"
          height="14"
          fill="rgba(255,255,255,0.03)"
        />

        <rect
          x="66"
          y="36"
          width="70"
          height="20"
          rx="4"
          fill="rgba(255,255,255,0.06)"
        />

        <text
          x="76"
          y="51"
          fontSize="8"
          fill="rgba(255,255,255,0.5)"
        >
          index.tsx
        </text>

        <rect
          x="144"
          y="40"
          width="60"
          height="14"
          rx="3"
          fill="rgba(255,255,255,0.03)"
        />

        <text
          x="152"
          y="51"
          fontSize="8"
          fill="rgba(255,255,255,0.25)"
        >
          styles.css
        </text>

        {[1,2,3,4,5,6,7,8,9,10].map((n, i) => (
          <text
            key={n}
            x="66"
            y={82 + i * 18}
            fontSize="8"
            fill="rgba(255,255,255,0.15)"
            textAnchor="end"
          >
            {n}
          </text>
        ))}

        <g className="sv-l1" transform="translate(76,80)">
          <text fontSize="9" fill="#7dd3fc" fontFamily="monospace">
            {"<"}
          </text>

          <text
            x="8"
            fontSize="9"
            fill={gradStart}
            fontFamily="monospace"
          >
            Hero
          </text>

          <text
            x="44"
            fontSize="9"
            fill="#7dd3fc"
            fontFamily="monospace"
          >
            {"/>"}
          </text>
        </g>

        <g className="sv-l2" transform="translate(76,98)">
          <text
            x="10"
            fontSize="9"
            fill="#86efac"
            fontFamily="monospace"
          >
            title
          </text>

          <text
            x="42"
            fontSize="9"
            fill="rgba(255,255,255,0.4)"
            fontFamily="monospace"
          >
            =
          </text>

          <text
            x="50"
            fontSize="9"
            fill="#fde68a"
            fontFamily="monospace"
          >
            "Next Level"
          </text>
        </g>

        <g className="sv-l3" transform="translate(76,116)">
          <text
            x="10"
            fontSize="9"
            fill="#86efac"
            fontFamily="monospace"
          >
            gradient
          </text>

          <text
            x="62"
            fontSize="9"
            fill="rgba(255,255,255,0.4)"
            fontFamily="monospace"
          >
            =
          </text>

          <text
            x="70"
            fontSize="9"
            fill="#c4b5fd"
            fontFamily="monospace"
          >
            {"{brand}"}
          </text>
        </g>

        <g className="sv-l4" transform="translate(76,134)">
          <text fontSize="9" fill="#7dd3fc" fontFamily="monospace">
            {"<"}
          </text>

          <text
            x="8"
            fontSize="9"
            fill={gradEnd}
            fontFamily="monospace"
          >
            Section
          </text>

          <text
            x="60"
            fontSize="9"
            fill="#7dd3fc"
            fontFamily="monospace"
          >
            {"/>"}
          </text>
        </g>

        <g className="sv-l5" transform="translate(76,152)">
          <text
            x="10"
            fontSize="9"
            fill="#86efac"
            fontFamily="monospace"
          >
            cms
          </text>

          <text
            x="34"
            fontSize="9"
            fill="rgba(255,255,255,0.4)"
            fontFamily="monospace"
          >
            =
          </text>

          <text
            x="42"
            fontSize="9"
            fill="#fde68a"
            fontFamily="monospace"
          >
            "sanity"
          </text>
        </g>

        <g className="sv-l6" transform="translate(76,170)">
          <text fontSize="9" fill="#7dd3fc" fontFamily="monospace">
            {"<"}
          </text>

          <text
            x="8"
            fontSize="9"
            fill={gradStart}
            fontFamily="monospace"
          >
            Footer
          </text>

          <text
            x="52"
            fontSize="9"
            fill="#7dd3fc"
            fontFamily="monospace"
          >
            {"/>"}
          </text>

          <rect
            className="sv-cursor"
            x="64"
            y="-10"
            width="2"
            height="12"
            fill="white"
            rx="1"
          />
        </g>

        {[
          {
            cls: "sv-tag1",
            x: 340,
            y: 50,
            width: 70,
            icon: "⚛️",
            text: "React",
            border: "rgba(4,124,249,0.3)",
          },
          {
            cls: "sv-tag2",
            x: 330,
            y: 95,
            width: 80,
            icon: "▲",
            text: "Next.js",
            border: "rgba(252,3,176,0.3)",
          },
          {
            cls: "",
            x: 345,
            y: 140,
            width: 70,
            icon: "🎨",
            text: "CSS",
            border: "rgba(34,197,94,0.3)",
          },
          {
            cls: "sv-tag3",
            x: 330,
            y: 185,
            width: 90,
            icon: "🔷",
            text: "TypeScript",
            border: "rgba(250,204,21,0.3)",
          },
          {
            cls: "",
            x: 340,
            y: 230,
            width: 70,
            icon: "🟣",
            text: "Sanity",
            border: "rgba(167,139,250,0.3)",
          },
        ].map((tag) => (
          <g
            key={tag.text}
            className={tag.cls}
            transform={`translate(${tag.x},${tag.y})`}
          >
            <rect
              width={tag.width}
              height="28"
              rx="10"
              fill="var(--vp-panel)"
              stroke={tag.border}
            />

            <text x="14" y="19" fontSize="12">
              {tag.icon}
            </text>

            <text
              x="32"
              y="19"
              fontSize="9"
              fill="var(--vp-text)"
              fontWeight="600"
            >
              {tag.text}
            </text>
          </g>
        ))}

        <rect
          x="52"
          y="260"
          width="260"
          height="30"
          fill="rgba(255,255,255,0.02)"
        />

        <text
          x="76"
          y="279"
          fontSize="8"
          fill="#22c55e"
        >
          ✓ Build successful — 0 errors
        </text>
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
      return <EcommercePerformanceVisual />

    case "ecommerce-scalabile":
      return <EcommerceScalabileVisual />

    case "cro-analisi":
      return <CROAnalisiVisual />

    case "cro-abtest":
      return <CROABTestVisual />

    case "cro-crescita":
      return <CROCrescitaVisual />

    case "sitiweb-immersive":
      return <SitiwebImmersiveVisual />

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