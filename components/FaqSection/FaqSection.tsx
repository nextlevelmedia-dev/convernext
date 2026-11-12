"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { Eyebrow } from "../About/SectionHeading"

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  titleHighlight?: string
  titleNormal?: string
  items?: FaqItem[]
}

export default function FaqSection({ titleHighlight, titleNormal, items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  if (!items?.length) return null

  return (
    <section className="faq-section relative overflow-x-clip px-6 py-24 md:py-32">
      {/* aloni del brand, solo decorativi */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 size-[420px] rounded-full bg-[#fc03b0]/[0.07] blur-3xl dark:bg-[#fc03b0]/[0.12]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 size-[420px] rounded-full bg-[#047cf9]/[0.07] blur-3xl dark:bg-[#047cf9]/[0.12]"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* intestazione centrata */}
        <div className="flex flex-col items-center text-center">
          <Eyebrow>FAQ</Eyebrow>

          {(titleHighlight || titleNormal) && (
            <h2
              className="mt-5 text-4xl leading-[1.15] tracking-tight text-slate-950 dark:text-white md:text-5xl"
              style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
            >
              {titleHighlight && (
                <span className="bg-brand-gradient bg-clip-text text-transparent">{titleHighlight}</span>
              )}
              {titleHighlight && titleNormal && " "}
              {titleNormal}
            </h2>
          )}
        </div>

        {/* lista a filo: righe separate da linee sottili, niente card */}
        <div className="mt-14 border-t border-slate-200 dark:border-white/10 md:mt-16">
          {items.map((item, i) => {
            const open = openIndex === i
            const buttonId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`

            return (
              <div key={i} className="group border-b border-slate-200 dark:border-white/10">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full cursor-pointer items-center gap-5 py-6 text-left md:gap-8 md:py-7"
                  >
                    <span
                      aria-hidden
                      className={`hidden w-8 shrink-0 font-mono text-sm tracking-wider transition-colors sm:block ${
                        open ? "text-[#7c3aed] dark:text-[#a78bfa]" : "text-slate-400 dark:text-white/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`flex-1 text-lg font-semibold leading-snug transition-colors md:text-xl ${
                        open
                          ? "text-slate-950 dark:text-white"
                          : "text-slate-800 group-hover:text-slate-950 dark:text-white/85 dark:group-hover:text-white"
                      }`}
                    >
                      {item.question}
                    </span>

                    <span
                      aria-hidden
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        open
                          ? "rotate-45 border-transparent bg-brand-gradient text-white"
                          : "border-slate-300 text-slate-700 group-hover:border-slate-950 group-hover:text-slate-950 dark:border-white/20 dark:text-white/80 dark:group-hover:border-white dark:group-hover:text-white"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="max-w-2xl pb-7 text-base leading-8 text-slate-600 dark:text-white/65 sm:pl-[4.25rem]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* chiusura: chi non trova la risposta scrive */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-white/70 px-6 py-6 text-center sm:flex-row sm:text-left md:px-8 dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <p className="font-semibold text-slate-950 dark:text-white">Non trovi la risposta che cerchi?</p>
            <p className="mt-1 text-slate-600 dark:text-white/65">Scrivici: ti rispondiamo entro 24 ore.</p>
          </div>
          <Link
            href="/contatti"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold !text-white transition-colors hover:bg-slate-800 dark:bg-white dark:!text-slate-950 dark:hover:bg-white/90"
          >
            Fai una domanda
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
