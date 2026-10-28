'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, type CSSProperties } from "react"

import dynamic from "next/dynamic"
import ThemeToggle from "./ThemeToggle"
import { services } from "./MegaMenu"
import { site } from "@/lib/seo"

const MegaMenu = dynamic(() => import("./MegaMenu"))

export default function Header() {
  const pathname = usePathname()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [mobileOpen])

  // chiusura con Esc e focus sul pulsante di chiusura all'apertura
  useEffect(() => {
    if (!mobileOpen) return
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  const closeDrawer = () => setMobileOpen(false)

  // ingresso in sequenza degli elementi del menu mobile
  const stagger = `transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
    mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`
  const staggerDelay = (i: number): CSSProperties => ({
    transitionDelay: mobileOpen ? `${220 + i * 45}ms` : "0ms",
  })

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black/40 backdrop-blur-sm"
          onMouseEnter={() => setOpen(false)}
        />
      )}

      {/* Mobile menu: si apre con un cerchio che parte dal pulsante del menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!mobileOpen}
        className={`fixed inset-0 z-[70] flex flex-col overflow-hidden bg-white transition-[clip-path] duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none md:hidden dark:bg-[#0a0a10] ${
          mobileOpen ? "[clip-path:circle(150%_at_calc(100%-42px)_36px)]" : "[clip-path:circle(0px_at_calc(100%-42px)_36px)]"
        }`}
      >
        {/* aloni del brand */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[#fc03b0]/15 blur-3xl dark:bg-[#fc03b0]/20" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-[#047cf9]/15 blur-3xl dark:bg-[#047cf9]/20" />

        <div className="relative flex h-[72px] shrink-0 items-center justify-between px-5">
          <Link href="/" onClick={closeDrawer} aria-label="Convernext — Home">
            <Image src="/logo-convernext.svg" alt="Convernext" width={1010} height={106} className="ml-[2px] h-auto w-[98px]" />
          </Link>
          <button
            ref={closeRef}
            onClick={closeDrawer}
            aria-label="Chiudi menu"
            className={`grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 transition-transform duration-500 dark:border-white/10 dark:bg-white/[0.06] dark:text-white ${mobileOpen ? "rotate-0" : "-rotate-90"}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Navigazione mobile" className="relative flex-1 overflow-y-auto px-5 pb-6">
          <div
            className={stagger}
            style={staggerDelay(0)}
          >
            <div className="mb-3 mt-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-white/50">
              <div aria-hidden className="h-px w-6 bg-brand-gradient" />
              Servizi
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {services.map((item, i) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  aria-current={active ? "page" : undefined}
                  className={`${stagger} flex min-h-[118px] flex-col justify-between rounded-2xl border p-3.5 ${
                    active
                      ? "border-transparent bg-[linear-gradient(135deg,rgb(252_3_176/0.10),rgb(4_124_249/0.10))] ring-1 ring-[#7c3aed]/40"
                      : "border-slate-200 bg-white/70 active:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04]"
                  }`}
                  style={staggerDelay(i + 1)}
                >
                  <div className="grid size-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-[0_8px_20px_-8px_rgb(124_58_237/0.7)] [&_svg]:size-[18px]">
                    {item.icon}
                  </div>
                  <div className="mt-3 text-[15px] font-semibold leading-tight !text-slate-950 dark:!text-white">
                    {item.title}
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-6 border-t border-slate-200 dark:border-white/10">
            {[
              { href: "/progetti", label: "Progetti" },
              { href: "/chi-siamo", label: "Chi siamo" },
              { href: "/contatti", label: "Contatti" },
            ].map((item, i) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  aria-current={active ? "page" : undefined}
                  className={`${stagger} group flex items-center gap-4 border-b border-slate-200 py-4 dark:border-white/10`}
                  style={staggerDelay(i + 5)}
                >
                  <div className="w-6 font-mono text-xs text-slate-400 dark:text-white/35">0{i + 1}</div>
                  <div
                    className={`flex-1 text-[28px] leading-none tracking-tight ${active ? "bg-brand-gradient bg-clip-text !text-transparent" : "!text-slate-950 dark:!text-white"}`}
                    style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                  >
                    {item.label}
                  </div>
                  <div aria-hidden className="grid size-9 place-items-center rounded-full border border-slate-200 !text-slate-900 transition-transform group-active:translate-x-1 dark:border-white/10 dark:!text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* CTA e contatti: nel flusso del menu, non fissati in basso */}
          <div
            className={`${stagger} mt-8 pb-[max(1.25rem,env(safe-area-inset-bottom))]`}
            style={staggerDelay(8)}
          >
          <Link
            href="/contatti"
            onClick={closeDrawer}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-4 text-base font-bold !text-white shadow-[0_14px_34px_-12px_rgb(124_58_237/0.7)]"
          >
            Richiedi una consulenza
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-col text-[13px] leading-5">
              <a href={`mailto:${site.email}`} className="truncate font-semibold !text-slate-900 dark:!text-white">
                {site.email}
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="!text-slate-500 dark:!text-white/60">
                {site.phoneDisplay}
              </a>
            </div>
            <ThemeToggle />
          </div>
          </div>
        </nav>
      </div>

      <header className={`fixed left-0 top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300 ${scrolled || open ? "bg-white/80 shadow-[0_1px_0_#e2e8f0] backdrop-blur-xl dark:bg-black/80 dark:shadow-[0_1px_0_rgb(255_255_255/0.1)]" : "bg-transparent"}`}>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:h-20 md:px-6">

          <Link href="/" className="flex items-center py-4" aria-label="Convernext — Home">
            <Image src="/logo-convernext.svg" alt="Convernext" width={1010} height={106} preload className="ml-[2px] h-auto w-[98px] md:w-[109px]" />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Navigazione principale">
            <div className="relative" onMouseEnter={() => setOpen(true)}>
              <button
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Soluzioni e Servizi"
                className="flex items-center gap-2 font-medium transition-colors"
              >
                Soluzioni e Servizi
                <span className={`flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>
            </div>

            <Link href="/progetti" className="transition-colors">Progetti</Link>
            <Link href="/chi-siamo" className="transition-colors">Chi Siamo</Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link className="contattaci-link font-bold" href="/contatti">Contattaci</Link>
            <Link
              className="cta-bubble flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient shadow-lg"
              href="/contatti"
              aria-label="Contattaci"
            >
              ↗
            </Link>
            <div className="w-2" />
            <ThemeToggle />
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/contatti"
              className="cta-bubble inline-flex h-10 items-center justify-center rounded-full bg-brand-gradient px-4 text-sm font-bold shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)]"
            >
              Contattaci
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Apri menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-neutral-950"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span className="absolute left-0 top-0 h-[1.5px] w-5 bg-slate-900 dark:bg-white" />
                <span className="absolute bottom-0 left-0 h-[1.5px] w-5 bg-slate-900 dark:bg-white" />
              </span>
            </button>
          </div>

        </div>

        {open && (
          <div className="relative z-50" onMouseLeave={() => setOpen(false)}>
            <MegaMenu />
          </div>
        )}
      </header>
    </>
  )
}