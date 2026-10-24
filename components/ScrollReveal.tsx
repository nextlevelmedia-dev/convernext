"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/*
 * Animazione d'ingresso allo scroll per tutto il sito, senza toccare i componenti.
 *
 * - Titoli: salgono da una maschera (clip-path), come una riga che emerge.
 * - Testi, liste, pulsanti, immagini e card: dissolvenza con leggera salita.
 * - Gli elementi che entrano insieme arrivano in sequenza (stagger).
 *
 * Prestazioni e leggibilità:
 * - Un solo IntersectionObserver; si animano solo opacity, translate e clip-path.
 * - Ciò che è già visibile al caricamento non viene mai nascosto (LCP e CLS invariati).
 * - Senza JS, o con "riduci movimento", il contenuto è subito visibile.
 * - A fine animazione le classi vengono rimosse: restano gli stili originali.
 * - Si può escludere un blocco con l'attributo data-no-reveal.
 */

const TARGETS = [
  "h2",
  "h3",
  "h4",
  "p",
  "li",
  "blockquote",
  "img",
  "video",
  "table",
  "form",
  "[data-reveal]",
  ".card-adaptive",
  ".review-card",
  '[class*="rounded-2xl"]',
  '[class*="rounded-3xl"]',
  '[class*="rounded-[28px]"]',
  '[class*="rounded-[2rem]"]',
  'a[class*="bg-brand-gradient"]',
].join(",")

// aree con animazioni proprie o da non toccare
const SKIP = [
  "header",
  "footer",
  "#mobile-menu",
  "[data-no-reveal]",
  "[role=img]",
  "[aria-hidden=true]",
  ".cro-visual",
  ".mockup-row",
  ".marquee-fade",
  "[inert]",
].join(",")

const STAGGER_MS = 80
const MAX_STAGGER = 6
const DONE_MS = 1400

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const main = document.getElementById("main")
    if (!main || !("IntersectionObserver" in window)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const fold = window.innerHeight
    const width = window.innerWidth
    const candidates = Array.from(main.querySelectorAll<HTMLElement>(TARGETS)).filter((el) => {
      if (el.closest(SKIP)) return false
      const r = el.getBoundingClientRect()
      // sotto la piega e non fuori schermo in orizzontale (caroselli, loghi a scorrimento)
      return r.top > fold && r.left < width && r.right > 0
    })

    // si anima solo l'elemento più esterno: una card entra con tutto il suo contenuto
    const set = new Set(candidates)
    const targets = candidates.filter((el) => {
      for (let p = el.parentElement; p && p !== main; p = p.parentElement) {
        if (set.has(p)) return false
      }
      return true
    })

    const timers = new Set<number>()

    const finish = (el: HTMLElement) => {
      el.classList.remove("rv", "rv-h")
      el.style.removeProperty("transition-delay")
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect()
            const rb = b.getBoundingClientRect()
            return ra.top - rb.top || ra.left - rb.left
          })

        visible.forEach((el, i) => {
          observer.unobserve(el)
          const delay = Math.min(i, MAX_STAGGER) * STAGGER_MS
          if (delay) el.style.transitionDelay = `${delay}ms`
          el.classList.remove("rv-hide")
          const t = window.setTimeout(() => {
            finish(el)
            timers.delete(t)
          }, DONE_MS + delay)
          timers.add(t)
        })
      },
      { rootMargin: "0px 0px -8% 0px" }
    )

    targets.forEach((el) => {
      el.classList.add("rv", "rv-hide")
      if (/^H[2-4]$/.test(el.tagName)) el.classList.add("rv-h")
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
      timers.forEach((t) => clearTimeout(t))
      targets.forEach((el) => {
        el.classList.remove("rv-hide")
        finish(el)
      })
    }
  }, [pathname])

  return null
}
