"use client"

import { useRef, useState } from "react"
import { ProjectCard } from "./ProjectCard"
import type { Project } from "./projects"

// filtri ricavati dai tag dei progetti; "short" è l'etichetta su mobile
const FILTERS = [
  { id: "tutti", label: "Tutti", match: () => true },
  { id: "siti", label: "Siti web", match: (t: string) => t === "sito web" },
  { id: "ecommerce", label: "E-commerce", match: (t: string) => t === "e-commerce" },
  { id: "landing", label: "Landing page", short: "Landing", match: (t: string) => t.startsWith("landing") },
] as const

type FilterId = (typeof FILTERS)[number]["id"]

const matches = (project: Project, id: FilterId) => {
  const filter = FILTERS.find((f) => f.id === id)!
  return id === "tutti" || project.tags.some((t) => filter.match(t.toLowerCase()))
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterId>("tutti")
  const visible = projects.filter((p) => matches(p, active))
  const bar = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLUListElement>(null)

  const select = (id: FilterId) => {
    setActive(id)
    // se la barra è già agganciata sotto l'header, riporta l'inizio della griglia sotto la barra
    const b = bar.current?.getBoundingClientRect()
    const g = grid.current?.getBoundingClientRect()
    if (b && g && g.top < b.bottom) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      window.scrollBy({ top: g.top - b.bottom - 24, behavior: reduce ? "auto" : "smooth" })
    }
  }

  return (
    <div>
      {/* barra filtri agganciata sotto l'header (72px mobile, 80px desktop) */}
      <div
        ref={bar}
        className="sticky top-[72px] z-30 -mx-5 bg-white/85 py-3 backdrop-blur-xl md:top-20 md:-mx-8 xl:-mx-10 dark:bg-[#111118]/85"
      >
        <div
          role="group"
          aria-label="Filtra i progetti"
          // mobile: una sola riga (scorre in orizzontale solo se proprio non ci sta)
          className="flex gap-1.5 overflow-x-auto px-5 md:gap-2 [scrollbar-width:none] md:flex-wrap md:px-8 xl:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {FILTERS.map((f) => {
            const count = projects.filter((p) => matches(p, f.id)).length
            if (!count) return null
            const isActive = f.id === active
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={isActive}
                aria-label={`${f.label} (${count})`}
                onClick={() => select(f.id)}
                className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-sm font-bold transition-colors md:px-4 ${
                  isActive
                    ? "border-transparent bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "border-slate-200 text-slate-700 hover:border-slate-400 dark:border-white/15 dark:text-white/75 dark:hover:border-white/40"
                }`}
              >
                {/* <em>/<small> e non <span>: in dark mode .main-bg forza gli span a bianco */}
                {"short" in f ? (
                  <>
                    <em className="not-italic md:hidden">{f.short}</em>
                    <em className="hidden not-italic md:inline">{f.label}</em>
                  </>
                ) : (
                  f.label
                )}
                <small
                  className={`hidden font-mono text-[11px] md:inline ${
                    isActive ? "text-white/60 dark:text-slate-950/60" : "text-slate-400 dark:text-white/45"
                  }`}
                >
                  {count}
                </small>
              </button>
            )
          })}
        </div>
      </div>

      <ul ref={grid} className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  )
}
