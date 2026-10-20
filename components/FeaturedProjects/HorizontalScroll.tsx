"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import type { Project } from "./projects"
import { ProjectCard } from "./ProjectCard"

const pad = (n: number) => String(n).padStart(2, "0")

// larghezza card limitata anche dall'altezza dello schermo, così titolo e
// card stanno sempre insieme nella viewport (≈560px = header, titolo, testi)
const CARD_WIDTH =
  "w-[min(60vw,460px,max(300px,calc((100vh-560px)*1.6)))] lg:w-[min(34vw,460px,max(300px,calc((100vh-560px)*1.6)))]"

/**
 * Desktop: titolo e card restano fissi e lo scroll verticale della pagina fa
 * scorrere le card in orizzontale. L'altezza del contenitore è pari alla
 * distanza da percorrere, così la velocità segue quella dello scroll.
 * Su mobile mostra intro + `mobile` senza effetti.
 */
export function HorizontalScroll({
  items,
  intro,
  mobile,
}: {
  items: Project[]
  intro: ReactNode
  mobile: ReactNode
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const distance = useRef(0)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const el = wrap.current
    const list = track.current
    if (!el || !list) return

    let raf = 0

    const update = () => {
      const travel = el.offsetHeight - window.innerHeight
      const p =
        travel > 0
          ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / travel))
          : 0

      list.style.transform = `translate3d(${(-p * distance.current).toFixed(1)}px,0,0)`
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      if (counter.current)
        counter.current.textContent = pad(Math.round(p * (items.length - 1)) + 1)
    }

    const measure = () => {
      distance.current = Math.max(0, list.scrollWidth - window.innerWidth)
      setHeight(window.innerHeight + distance.current)
      update()
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", onScroll)
    }
  }, [items.length])

  // con la tastiera porta in vista la card che riceve il focus
  const onFocus = (li: HTMLLIElement) => {
    const el = wrap.current
    const list = track.current
    if (!el || !list || distance.current === 0) return

    const start = parseFloat(getComputedStyle(list).paddingLeft) || 0
    const p = Math.min(1, Math.max(0, (li.offsetLeft - start) / distance.current))
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + p * (el.offsetHeight - window.innerHeight) })
  }

  return (
    <div
      ref={wrap}
      style={{ "--h": height ? `${height}px` : "100vh" } as CSSProperties}
      className="relative md:h-[var(--h)]"
    >
      <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden md:pt-20">
        {intro}

        <div className="relative mt-10 md:hidden">{mobile}</div>

        <ul
          ref={track}
          aria-label="Progetti realizzati"
          className="hidden w-max gap-10 px-[max(2rem,calc((100vw-80rem)/2+2.5rem))] pb-6 pt-10 will-change-transform md:flex"
        >
          {items.map((project) => (
            <li
              key={project.slug}
              onFocus={(e) => onFocus(e.currentTarget)}
              className={`shrink-0 ${CARD_WIDTH}`}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <div className="mx-auto hidden w-full max-w-7xl items-center gap-6 px-8 md:flex xl:px-10">
          <p className="font-mono text-xs tabular-nums text-slate-500 dark:text-white/60">
            <span ref={counter}>01</span> / {pad(items.length)}
          </p>
          <span className="relative h-px flex-1 overflow-hidden bg-slate-200 dark:bg-white/10">
            <span
              ref={bar}
              className="absolute inset-0 origin-left scale-x-0 bg-brand-gradient"
            />
          </span>
        </div>
      </div>
    </div>
  )
}
