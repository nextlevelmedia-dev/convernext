"use client"

import { useEffect, useRef, useState } from "react"
import BenefitIcon from "../BenefitsSection/BenefitIcon"
import { pickBenefitIcon } from "../BenefitsSection/benefitIcons"
import { Eyebrow } from "../About/SectionHeading"
import StepVisual from "./StepVisual"

type ProcessStep = {
  title?: string
  description?: string
}

type ProcessSectionProps = {
  eyebrow?: string
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  steps?: ProcessStep[]
}

/**
 * "Come lavoriamo": timeline verticale con linea che si riempie scorrendo.
 * Ogni step ha icona e, da tablet in su, un visual animato scelto dal titolo.
 */
export default function ProcessSection({
  eyebrow = "Come lavoriamo",
  titleHighlight,
  titleNormal,
  subtitle,
  steps,
}: ProcessSectionProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(-1)
  const [progress, setProgress] = useState(0)
  // binario dal centro del primo nodo al centro dell'ultimo
  const [rail, setRail] = useState({ top: 0, height: 0 })

  const items = (steps ?? []).filter((s) => s?.title)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    let frame = 0
    const update = () => {
      frame = 0
      const focus = window.innerHeight * 0.55
      const rect = list.getBoundingClientRect()
      const nodes = list.querySelectorAll<HTMLElement>("[data-node]")
      const first = nodes[0]?.getBoundingClientRect()
      const last = nodes[nodes.length - 1]?.getBoundingClientRect()
      if (first && last) {
        const top = first.top + first.height / 2 - rect.top
        const height = last.top + last.height / 2 - rect.top - top
        setRail((r) => (r.top === top && r.height === height ? r : { top, height }))
        setProgress(Math.min(1, Math.max(0, (focus - rect.top - top) / height)))
      }

      // attivo = ultimo step la cui parte alta ha superato il punto di fuoco
      const cards = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"))
      let next = -1
      cards.forEach((card, i) => {
        if (card.getBoundingClientRect().top < focus) next = i
      })
      setActive(next)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [items.length])

  if (!items.length) return null

  return (
    <section className="relative px-5 py-20 md:px-8 md:py-28 xl:px-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* INTESTAZIONE */}
        <div className="mx-auto flex max-w-2xl flex-col items-start md:items-center md:text-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

          {(titleHighlight || titleNormal) && (
            <h2
              className="mt-5 text-4xl leading-[1.2] tracking-tight text-slate-950 md:text-[42px] dark:text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
            >
              {titleHighlight && <span className="bg-brand-gradient bg-clip-text text-transparent">{titleHighlight}</span>}
              {titleHighlight && titleNormal && " "}
              {titleNormal}
            </h2>
          )}

          {subtitle && (
            <p className="mt-5 max-w-xl text-lg leading-8 text-black/65 dark:!text-white/70">{subtitle}</p>
          )}
        </div>

        {/* TIMELINE */}
        <ol ref={listRef} className="relative mt-12 space-y-4 md:mt-16 md:space-y-6">
          {/* binario: grigio di base, si riempie col gradiente scorrendo */}
          <span
            aria-hidden
            className="absolute left-5 w-px bg-slate-200 md:left-6 dark:bg-white/10"
            style={{ top: rail.top, height: rail.height }}
          />
          <span
            aria-hidden
            className="absolute left-5 w-px bg-[linear-gradient(180deg,#fc03b0,#047cf9)] md:left-6"
            style={{ top: rail.top, height: rail.height * progress }}
          />

          {items.map((step, i) => {
            const isActive = i === active
            const reached = i <= active
            const icon = pickBenefitIcon(step.title, step.description)
            return (
              <li
                key={i}
                id={`fase-${i + 1}`}
                data-step
                className="relative grid scroll-mt-32 grid-cols-[40px_minmax(0,1fr)] gap-4 md:grid-cols-[48px_minmax(0,1fr)] md:gap-8"
              >
                {/* nodo con il numero della fase */}
                <div
                  aria-hidden
                  data-node
                  className={`relative z-10 mt-6 grid size-10 place-items-center rounded-full border font-mono text-xs font-bold transition-all duration-500 md:mt-10 md:size-12 md:text-sm ${
                    reached
                      ? "border-transparent bg-brand-gradient text-white shadow-[0_8px_24px_-8px_rgb(124_58_237/0.6)]"
                      : "border-slate-200 bg-white text-slate-400 dark:border-white/15 dark:bg-[#111118] dark:text-white/50"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* card con bordo a gradiente quando attiva */}
                <article className="relative rounded-3xl p-px">
                  <span aria-hidden className="absolute inset-0 rounded-3xl bg-slate-200 dark:bg-white/10" />
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,#fc03b0,#7c3aed_50%,#047cf9)] transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`relative grid items-center gap-6 overflow-hidden md:gap-8 rounded-[calc(1.5rem-1px)] bg-white p-5 transition-shadow duration-700 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-6 lg:gap-10 lg:p-8 dark:bg-[#0f1726] ${
                      isActive
                        ? "shadow-[0_30px_80px_-40px_rgb(124_58_237/0.55)]"
                        : "shadow-[0_1px_2px_rgb(15_23_42/0.04)]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(252_3_176/0.10),transparent_70%),radial-gradient(60%_80%_at_0%_100%,rgb(4_124_249/0.10),transparent_70%)] transition-opacity duration-700 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div className="relative md:py-2 lg:pl-2">
                      <BenefitIcon name={icon} />
                      <p className="relative mt-6 hidden font-mono text-xs uppercase tracking-[0.16em] !text-slate-400 md:block dark:!text-white/45">
                        Fase {i + 1} di {items.length}
                      </p>
                      <h3
                        className="relative mt-4 text-2xl leading-tight tracking-tight text-slate-950 md:mt-2 md:text-[28px] dark:text-white"
                        style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                      >
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="relative mt-4 text-base leading-7 text-black/65 md:text-[17px] md:leading-8 dark:!text-white/70">
                          {step.description.trim()}
                        </p>
                      )}
                    </div>

                    {/* visual: sotto il testo su mobile, a destra da tablet in su */}
                    <div className="relative">
                      <StepVisual name={icon} on={reached} />
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
