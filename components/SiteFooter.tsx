"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

// pagine con un footer proprio: qui il footer del sito non compare
const OWN_FOOTER = ["/esperienze-immersive"]

/** Mostra il footer del sito (spazio sticky + footer) tranne sulle landing che ne hanno uno loro. */
export default function SiteFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (OWN_FOOTER.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null
  return <>{children}</>
}
