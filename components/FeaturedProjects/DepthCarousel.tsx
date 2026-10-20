"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Project } from "./projects"
import { ProjectCard } from "./ProjectCard"

const NAV_BUTTON =
  "grid size-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-950 transition-[opacity,box-shadow] hover:shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.12)] disabled:opacity-40 dark:border-white/10 dark:bg-[#0f1726] dark:text-white"

/**
 * Scroll orizzontale nativo (touch, trackpad e tastiera funzionano) con una
 * trasformazione in profondità calcolata dalla distanza di ogni card dal centro.
 */
export function DepthCarousel({ items }: { items: Project[] }) {
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // punto di fuoco = dove si ferma la card (padding iniziale), così la prima è nitida
    const pad = parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0
    const first = el.firstElementChild as HTMLElement | null
    const narrow = el.clientWidth < 768
    const focus =
      el.scrollLeft +
      (narrow ? el.clientWidth / 2 : pad + (first?.offsetWidth ?? 0) / 2)

    for (const li of Array.from(el.children) as HTMLElement[]) {
      const c = li.offsetLeft + li.offsetWidth / 2
      const d = Math.max(-2, Math.min(2, (c - focus) / (li.offsetWidth * 1.4)))
      const inner = li.firstElementChild as HTMLElement | null
      if (!inner) continue

      if (reduced) {
        inner.style.transform = ""
        continue
      }

      const a = Math.abs(d)
      inner.style.transform =
        a < 0.04
          ? ""
          : `translateZ(${(-a * 70).toFixed(1)}px) rotateY(${(-d * 10).toFixed(2)}deg)`
    }

    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    el.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    el.scrollBy({ left: dir * (card?.offsetWidth ?? 400) * 1.02, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <ul
        ref={track}
        aria-label="Progetti realizzati"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1.25rem,calc((100vw-80rem)/2+2.5rem))] py-10 [perspective:1600px] [scroll-padding-inline:max(1.25rem,calc((100vw-80rem)/2+2.5rem))] [scrollbar-width:none] md:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((project) => (
          <li
            key={project.slug}
            className="w-[82vw] max-w-[460px] shrink-0 snap-center sm:w-[60vw] md:snap-start lg:w-[34vw]"
          >
            <div className="h-full transition-transform duration-300 ease-out [transform-style:preserve-3d]">
              <ProjectCard project={project} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 md:px-8 xl:px-10">
        <p className="font-mono text-xs text-slate-500 dark:text-white/60">
          {items.length} progetti · scorri per esplorare
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={atStart}
            aria-label="Progetto precedente"
            className={NAV_BUTTON}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={atEnd}
            aria-label="Progetto successivo"
            className={NAV_BUTTON}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
