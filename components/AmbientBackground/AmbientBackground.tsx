/*
 * Sfondo animato unico del sito: aloni del brand (rosa, viola, blu) distribuiti
 * lungo tutta la pagina, che si spostano lentamente.
 * Prestazioni: niente JS e niente filter blur; solo radial-gradient e animazioni
 * di transform (gestite dal compositor). Il livello sta dietro ai contenuti,
 * non intercetta i clic e si ferma con "riduci movimento".
 */

const BLOBS = [
  { top: "2%", left: "-12%", size: 720, color: "252,3,176", dur: 38, delay: 0 },
  { top: "9%", left: "62%", size: 640, color: "4,124,249", dur: 44, delay: -10 },
  { top: "22%", left: "18%", size: 560, color: "124,58,237", dur: 40, delay: -20 },
  { top: "34%", left: "70%", size: 700, color: "252,3,176", dur: 46, delay: -5 },
  { top: "47%", left: "-8%", size: 620, color: "4,124,249", dur: 42, delay: -15 },
  { top: "59%", left: "55%", size: 600, color: "124,58,237", dur: 48, delay: -25 },
  { top: "71%", left: "10%", size: 680, color: "252,3,176", dur: 40, delay: -8 },
  { top: "83%", left: "64%", size: 620, color: "4,124,249", dur: 44, delay: -18 },
]

export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-b-[42px]">
      <style>{`
        @keyframes ambient-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(6vw, -4vh, 0) scale(1.08); }
          66% { transform: translate3d(-5vw, 5vh, 0) scale(0.94); }
        }
        .ambient-blob {
          position: absolute;
          border-radius: 9999px;
          will-change: transform;
          animation: ambient-drift var(--d) ease-in-out infinite;
          animation-delay: var(--dl);
          opacity: var(--o-light);
        }
        .dark .ambient-blob { opacity: var(--o-dark); }
        @media (max-width: 767px) { .ambient-blob { width: 120vw !important; height: 120vw !important; } }
        @media (prefers-reduced-motion: reduce) { .ambient-blob { animation: none; } }
      `}</style>
      {BLOBS.map((b, i) => (
        <i
          key={i}
          className="ambient-blob"
          style={
            {
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              background: `radial-gradient(closest-side, rgba(${b.color},0.22), rgba(${b.color},0.07) 55%, transparent)`,
              "--d": `${b.dur}s`,
              "--dl": `${b.delay}s`,
              "--o-light": 0.55,
              "--o-dark": 0.75,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
