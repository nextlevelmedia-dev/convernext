import type { ReactNode } from "react"

/*
 * Loghi disegnati in SVG per le recensioni senza un logo utilizzabile (quelli in
 * Sanity avevano lo sfondo bianco). Trasparenti, il testo segue il colore della card.
 */

const font = { fontFamily: "var(--font-archivo), sans-serif" }

function Logo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 132 36"
      className="h-8 w-auto shrink-0 text-slate-800 dark:text-white/85"
    >
      {children}
    </svg>
  )
}

const LOGOS: Record<string, ReactNode> = {
  "Davide Rizzi": (
    <Logo label="Davide Rizzi">
      <circle cx="16" cy="18" r="13" fill="none" stroke="#b7793f" strokeWidth="2.4" />
      <text x="16" y="22.5" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="800" letterSpacing="0.5" style={font}>
        DR
      </text>
      <text x="35" y="19" fill="currentColor" fontSize="14" fontWeight="800" letterSpacing="0.3" style={font}>
        DAVIDE
      </text>
      <text x="35" y="31" fill="currentColor" fillOpacity="0.6" fontSize="9" fontWeight="700" letterSpacing="3.4" style={font}>
        RIZZI
      </text>
    </Logo>
  ),
  "Alessia Conti": (
    <Logo label="Conti Servizi Aziendali">
      <path d="M27 11.5A11 11 0 1 0 27 24.5" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
      <circle cx="27.5" cy="18" r="2.6" fill="#38bdf8" />
      <text x="37" y="20" fill="currentColor" fontSize="17" fontWeight="800" letterSpacing="-0.5" style={font}>
        conti
      </text>
      <text x="37" y="30" fill="currentColor" fillOpacity="0.6" fontSize="6.6" fontWeight="700" letterSpacing="1.2" style={font}>
        SERVIZI AZIENDALI
      </text>
    </Logo>
  ),
}

export function companyLogoFor(authorName?: string) {
  return authorName ? LOGOS[authorName.trim()] : undefined
}
