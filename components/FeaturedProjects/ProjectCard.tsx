"use client"

import Image from "next/image"
import { useRef, type PointerEvent } from "react"
import type { Project } from "./projects"

const host = (url?: string) =>
  url ? new URL(url).hostname.replace(/^www\./, "") : ""

const EASE_OUT_EXPO = "ease-[cubic-bezier(0.16,1,0.3,1)]"

/**
 * Anteprima del progetto a livelli: cornice browser + screenshot + testi,
 * con inclinazione che segue il mouse (solo puntatori precisi).
 */
export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5

    ref.current.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`)
    ref.current.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`)
    ref.current.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`)
    ref.current.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const reset = () => {
    ref.current?.style.setProperty("--rx", "0deg")
    ref.current?.style.setProperty("--ry", "0deg")
  }

  const domain = project.displayUrl ?? host(project.url)

  return (
    <article className="group h-full [perspective:1200px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={`relative flex h-full flex-col transition-transform duration-500 ${EASE_OUT_EXPO} [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]`}
      >
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.12)] [transform:translateZ(0)] dark:border-white/10 dark:bg-[#0f1726] dark:shadow-[0_1px_2px_rgb(0_0_0/0.3),0_16px_40px_-16px_rgb(0_0_0/0.6)]">
          <div className="flex items-center gap-1.5 px-2 pb-2 pt-1">
            <span className="size-2 rounded-full bg-[#ff5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#28c840]" />
            {domain && (
              <span className="ml-2 truncate font-mono text-[11px] text-slate-500 dark:text-white/60">
                {domain}
              </span>
            )}
          </div>

          <div className="relative aspect-[650/404] overflow-hidden rounded-xl bg-slate-50 dark:bg-[#111827]">
            <Image
              src={project.preview}
              alt={`Anteprima del progetto ${project.name}`}
              fill
              sizes="(min-width: 1024px) 460px, 85vw"
              className={`object-cover transition-transform duration-700 ${EASE_OUT_EXPO} group-hover:scale-[1.04]`}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(60%_60%_at_var(--gx,50%)_var(--gy,50%),rgb(255_255_255/0.22),transparent_70%)]"
            />
          </div>
        </div>

        <div className="relative mt-5 px-1 [transform:translateZ(28px)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-white/60">
            {project.tags.join(" · ")}
          </p>

          <h3
            className="mt-2 text-2xl text-slate-950 dark:text-white"
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            {project.name}
          </h3>

          {project.description && (
            <p className="mt-2 line-clamp-2 leading-7 text-black/65 dark:text-white/70">
              {project.description}
            </p>
          )}

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-bold text-slate-950 transition-colors hover:text-[#047cf9] dark:text-white"
            >
              Vedi il sito
              <span aria-hidden>↗</span>
              <span className="sr-only">(si apre in una nuova scheda)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
