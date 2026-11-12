"use client"

import { useEffect } from "react"
import { track } from "@/lib/track"

/*
 * Un solo ascoltatore per tutto il sito: clic su telefono, email, WhatsApp
 * e sui pulsanti che portano ai contatti. Nessun dato personale nei parametri.
 */
export default function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a")
      if (!a) return
      const href = a.getAttribute("href") || ""
      const text = (a.textContent || a.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 80)
      const page = window.location.pathname

      if (href.startsWith("tel:")) return track("contact_click", { method: "phone", page_path: page })
      if (href.startsWith("mailto:")) return track("contact_click", { method: "email", page_path: page })
      if (/wa\.me|api\.whatsapp\.com|whatsapp:/.test(href)) return track("contact_click", { method: "whatsapp", page_path: page })
      // pulsanti verso i contatti (non i link di menu e footer)
      if (/^\/contatti|#contatti/.test(href) && !a.closest("nav, footer")) return track("cta_click", { cta_text: text, page_path: page })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
