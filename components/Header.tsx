'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

import dynamic from "next/dynamic"
import ThemeToggle from "./ThemeToggle"

const MegaMenu = dynamic(() => import("./MegaMenu"))

export default function Header() {
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

  const closeDrawer = () => setMobileOpen(false)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black/40 backdrop-blur-sm"
          onMouseEnter={() => setOpen(false)}
        />
      )}

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeDrawer}
      />

      {/* Mobile drawer — full screen */}
      <div
        className={`fixed inset-0 z-[70] bg-white dark:bg-[#111118] shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700">
          <Image src="/logo-convernext.svg" alt="Convernext" width={1010} height={106} preload className="ml-[2px] h-auto w-[98px]" />
          <button
            onClick={closeDrawer}
            aria-label="Chiudi menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col px-6 py-8 gap-1 overflow-y-auto h-[calc(100%-80px)]">

          {/* Soluzioni e Servizi sempre aperto */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
            <p className="py-3 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Soluzioni e Servizi
            </p>
            <div className="flex flex-col gap-1 pl-2">
              <Link
                href="/ecommerce"
                onClick={closeDrawer}
                className="flex items-center gap-3 py-2.5 text-base font-medium text-slate-700 dark:text-white/80"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fc03b0] to-[#047cf9]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </span>
                E-commerce Shopify
              </Link>
              <Link
                href="/temi-shopify"
                onClick={closeDrawer}
                className="flex items-center gap-3 py-2.5 text-base font-medium text-slate-700 dark:text-white/80"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fc03b0] to-[#047cf9]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
                  </svg>
                </span>
                Temi Shopify su misura
              </Link>
              <Link
                href="/ottimizzazione-conversioni"
                onClick={closeDrawer}
                className="flex items-center gap-3 py-2.5 text-base font-medium text-slate-700 dark:text-white/80"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fc03b0] to-[#047cf9]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                Ottimizzazione Conversioni
              </Link>
              <Link
                href="/siti-web"
                onClick={closeDrawer}
                className="flex items-center gap-3 py-2.5 text-base font-medium text-slate-700 dark:text-white/80"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fc03b0] to-[#047cf9]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </span>
                Siti Web Performanti
              </Link>
            </div>
          </div>

          <Link href="/progetti" onClick={closeDrawer} className="flex items-center py-3 text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
            Progetti
          </Link>
          <Link href="/chi-siamo" onClick={closeDrawer} className="flex items-center py-3 text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
            Chi Siamo
          </Link>

          <div className="mt-8">
            <Link href="/contatti" onClick={closeDrawer} className="flex w-full items-center justify-center rounded-full bg-brand-gradient px-8 py-4 text-base font-bold text-white shadow-lg">
              Contattaci →
            </Link>
          </div>

          <div className="mt-4 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
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