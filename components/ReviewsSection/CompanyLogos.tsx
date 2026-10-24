import type { ReactNode } from "react"

/*
 * Loghi di fantasia per le recensioni senza un logo reale (quelli in Sanity
 * avevano lo sfondo bianco). Trasparenti, il testo segue il colore della card.
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
  "Marco Rinaldi": (
    <Logo label="Studio Rinaldi & Partners">
      <rect x="2" y="6" width="16" height="16" rx="3" fill="#0d9488" />
      <rect x="10" y="14" width="16" height="16" rx="3" fill="#14b8a6" fillOpacity="0.75" />
      <text x="33" y="19" fill="currentColor" fontSize="15" fontWeight="800" letterSpacing="0.5" style={font}>
        RINALDI
      </text>
      <text x="33" y="30" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontWeight="700" letterSpacing="2.2" style={font}>
        &amp; PARTNERS
      </text>
    </Logo>
  ),
  "Chiara Moretti": (
    <Logo label="Moretti Consulting">
      <circle cx="16" cy="18" r="13" fill="#7c3aed" />
      <path d="M9.5 24V12.5l6.5 7 6.5-7V24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <text x="35" y="19" fill="currentColor" fontSize="16" fontWeight="700" style={{ fontFamily: "Georgia, serif" }}>
        Moretti
      </text>
      <text x="35" y="30" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontWeight="700" letterSpacing="2.4" style={font}>
        CONSULTING
      </text>
    </Logo>
  ),
  "Luca Ferrero": (
    <Logo label="Ferraro Advisory">
      <path d="M4 28 16 6l12 22z" fill="#f59e0b" />
      <path d="M11 28 16 19l5 9z" fill="#fff" fillOpacity="0.85" />
      <text x="34" y="19" fill="currentColor" fontSize="15" fontWeight="800" letterSpacing="1" style={font}>
        FERRARO
      </text>
      <text x="34" y="30" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontWeight="700" letterSpacing="2.6" style={font}>
        ADVISORY
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
