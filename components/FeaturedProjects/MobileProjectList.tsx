"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import type { Project } from "./projects"

const EASE_OUT_EXPO = "ease-[cubic-bezier(0.16,1,0.3,1)]"

/**
 * Versione mobile: pochi progetti in colonna, immagine grande con titolo
 * sovrapposto e rimando alla pagina completa.
 */
export function MobileProjectList({ items }: { items: Project[] }) {
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const el = list.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-shown", "")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )

    for (const li of Array.from(el.children)) observer.observe(li)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="px-5">
      <ul ref={list} aria-label="Progetti realizzati" className="flex flex-col gap-8">
        {items.map((project) => (
          <li
            key={project.slug}
            className={`translate-y-6 opacity-0 transition-[opacity,transform] duration-700 ${EASE_OUT_EXPO} data-[shown]:translate-y-0 data-[shown]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100`}
          >
            <MobileProjectCard project={project} />
          </li>
        ))}
      </ul>

      <Link
        href="/progetti"
        className="mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-8 text-base font-bold !text-white shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] transition-transform duration-300 active:scale-[0.98]"
      >
        Vedi altri progetti
        <span aria-hidden>→</span>
      </Link>
    </div>
  )
}

function MobileProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.18)] dark:bg-[#111827]">
        <Image
          src={project.preview}
          alt={`Anteprima del progetto ${project.name}`}
          fill
          sizes="100vw"
          className={`object-cover transition-transform duration-700 ${EASE_OUT_EXPO} group-active:scale-[1.03]`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
        />

        {project.url && (
          // div e non span: in dark mode il CSS globale forza il bianco sugli span
          <div
            aria-hidden
            className="absolute right-4 top-4 grid size-10 place-items-center overflow-hidden rounded-full bg-white/90 text-slate-950 backdrop-blur transition-[color,box-shadow] duration-300 group-hover:text-white group-hover:shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] group-active:text-white group-active:shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)]"
          >
            <div className="absolute inset-0 bg-brand-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100" />
            <svg viewBox="0 0 16 16" className="relative size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 11.5l7-7M6 4.5h5.5V10" />
            </svg>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/75">
            {project.tags.slice(0, 2).join(" · ")}
          </p>
          <h3
            className="mt-1.5 text-[28px] leading-tight text-white"
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 600,
            }}
          >
            {project.name}
          </h3>
          {project.description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-white/80">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </>
  )

  if (!project.url) return <article>{content}</article>

  return (
    <article>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {content}
        <span className="sr-only">(si apre in una nuova scheda)</span>
      </a>
    </article>
  )
}
