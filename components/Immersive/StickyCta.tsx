"use client"

import { useEffect, useState } from "react"
import { WhatsAppIcon, whatsappUrl } from "./whatsapp"

/**
 * Barra WhatsApp fissa in basso, solo su mobile: compare dopo l'inizio
 * dello scroll e sparisce quando è già in vista la CTA finale.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const final = document.getElementById("contatto")
    let finalVisible = false
    const io = final
      ? new IntersectionObserver(([e]) => {
          finalVisible = e.isIntersecting
          update()
        })
      : null
    if (final && io) io.observe(final)

    function update() {
      setShow(window.scrollY > window.innerHeight * 0.6 && !finalVisible)
    }
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      io?.disconnect()
      window.removeEventListener("scroll", update)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 transition-[transform,opacity] duration-500 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-brand-gradient font-bold !text-white shadow-[0_18px_50px_-14px_rgb(168_60_214/0.8)]"
      >
        <WhatsAppIcon className="size-6" />
        Parliamo del tuo progetto
        <i className="sr-only not-italic">(apre WhatsApp)</i>
      </a>
    </div>
  )
}
