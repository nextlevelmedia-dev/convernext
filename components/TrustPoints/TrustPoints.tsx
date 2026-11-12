/** Punti sotto la CTA per ridurre la frizione (es. "Nessun impegno"). */
export default function TrustPoints({ points, className = "" }: { points?: string[]; className?: string }) {
  const items = points?.map((p) => p?.trim()).filter(Boolean)
  if (!items?.length) return null

  return (
    <ul
      className={`flex max-w-full flex-wrap items-center gap-x-5 gap-y-2.5 text-sm font-normal text-black/70 dark:text-white/80 ${className}`}
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      {items.map((point, index) => (
        <li
          key={`${point}-${index}`}
          // su mobile solo i primi 2 punti, per non andare su due righe
          className={`items-center gap-2 ${index >= 2 ? "hidden md:inline-flex" : "inline-flex"}`}
        >
          {/* solo la spunta, con il gradient del brand */}
          <svg aria-hidden viewBox="0 0 20 20" className="size-[18px] shrink-0">
            <defs>
              <linearGradient id="tp-tick" gradientUnits="userSpaceOnUse" x1="3" y1="15" x2="17" y2="5">
                <stop offset="0" stopColor="#fc03b0" />
                <stop offset="1" stopColor="#047cf9" />
              </linearGradient>
            </defs>
            <path d="M3.5 10.8l4.3 4.2L16.5 5.5" fill="none" stroke="url(#tp-tick)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {point}
        </li>
      ))}
    </ul>
  )
}
