"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { readConsent, saveConsent } from "./consent"

/**
 * Banner cookie provvisorio (sarà sostituito da iubenda).
 * "Accetta" e "Rifiuta" hanno lo stesso peso, come chiede il Garante.
 * Oggi il sito usa solo cookie tecnici: la scelta serve per gli strumenti
 * di marketing che verranno attivati in futuro (es. Pixel Meta).
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // dopo il primo render: niente differenze tra server e browser
    const t = setTimeout(() => setOpen(readConsent() === null), 600)
    const reopen = () => setOpen(true)
    window.addEventListener("cookie-preferences", reopen)
    return () => {
      clearTimeout(t)
      window.removeEventListener("cookie-preferences", reopen)
    }
  }, [])

  if (!open) return null

  const choose = (marketing: boolean) => {
    saveConsent(marketing)
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      data-no-reveal
      className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#0f1726]/95 p-5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-6 md:p-6"
    >
      <h2
        id="cookie-title"
        className="text-lg !text-white"
        style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
      >
        Rispettiamo la tua privacy
      </h2>
      <p className="mt-2 text-sm leading-6 !text-white/70">
        Usiamo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso potremmo usare anche cookie di
        marketing per misurare le nostre campagne. Puoi cambiare idea in qualsiasi momento dal link{" "}
        <em className="not-italic !text-white">Preferenze cookie</em> in fondo alla pagina.{" "}
        <Link href="/cookie-policy" className="underline underline-offset-2 !text-white hover:!text-white/80">
          Cookie policy
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose(false)}
          className="h-11 rounded-full border border-white/25 px-6 text-sm font-bold !text-white transition-colors hover:border-white"
        >
          Rifiuta
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="h-11 rounded-full bg-white px-6 text-sm font-bold !text-[#0f1726] transition-opacity hover:opacity-90"
        >
          Accetta
        </button>
      </div>
    </div>
  )
}
