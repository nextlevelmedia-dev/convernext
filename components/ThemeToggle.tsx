"use client"

import { useEffect, useState } from "react"

/**
 * Switch tema. Il sito parte in dark (classe `dark` già sull'<html>);
 * la scelta dell'utente viene salvata e riapplicata prima del paint dallo
 * script in layout. L'aspetto segue la classe `dark`, quindi niente salti
 * al caricamento.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
    setDark(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Tema scuro"
      onClick={toggle}
      className="relative h-9 w-[68px] shrink-0 rounded-full border border-slate-200 bg-white shadow-[inset_0_1px_2px_rgb(15_23_42/0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-[#161a26] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)]"
    >
      <span className="absolute left-1 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_1px_2px_rgb(15_23_42/0.08),0_4px_12px_-4px_rgb(15_23_42/0.18)] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:translate-x-8 dark:bg-[#1d2333] dark:shadow-[0_1px_2px_rgb(0_0_0/0.4)]">
        {/* sole */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute size-[18px] !text-[#fc03b0] transition-[opacity,transform] duration-300 dark:rotate-90 dark:scale-50 dark:opacity-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="3.6" fill="currentColor" stroke="none" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>

        {/* luna */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute size-[18px] -rotate-90 scale-50 !text-[#2f7cf6] opacity-0 transition-[opacity,transform] duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
          fill="currentColor"
        >
          <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
        </svg>
      </span>
    </button>
  )
}
