/** Punti sotto la CTA per ridurre la frizione (es. "Nessun impegno"). */
export default function TrustPoints({ points, className = "" }: { points?: string[]; className?: string }) {
  const items = points?.map((p) => p?.trim()).filter(Boolean)
  if (!items?.length) return null

  return (
    <ul
      className={`flex max-w-full flex-wrap items-center gap-x-5 gap-y-2.5 text-sm font-bold text-black/60 dark:text-white/70 ${className}`}
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      {items.map((point, index) => (
        <li
          key={`${point}-${index}`}
          // su mobile solo i primi 2 punti, per non andare su due righe
          className={`items-center gap-2 ${index >= 2 ? "hidden md:inline-flex" : "inline-flex"}`}
        >
          <svg aria-hidden viewBox="0 0 20 20" className="size-[18px] shrink-0">
            <defs>
              <linearGradient id={`tp-${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fc03b0" />
                <stop offset="1" stopColor="#047cf9" />
              </linearGradient>
            </defs>
            <circle cx="10" cy="10" r="10" fill={`url(#tp-${index})`} />
            <path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {point}
        </li>
      ))}
    </ul>
  )
}
