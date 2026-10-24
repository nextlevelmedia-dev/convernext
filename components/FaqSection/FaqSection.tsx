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
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  if (!items?.length) return null

  return (
    <section className="faq-section relative overflow-hidden px-6 py-24 md:py-32">
      {/* aloni del brand, solo decorativi */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 size-[420px] rounded-full bg-[#fc03b0]/[0.07] blur-3xl dark:bg-[#fc03b0]/[0.12]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 size-[420px] rounded-full bg-[#047cf9]/[0.07] blur-3xl dark:bg-[#047cf9]/[0.12]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>

          {(titleHighlight || titleNormal) && (
            <h2
              className="mt-5 text-4xl leading-[1.2] tracking-tight text-slate-950 dark:text-white md:text-[42px]"
              style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
            >
              {titleHighlight && (
                <span className="bg-brand-gradient bg-clip-text text-transparent">{titleHighlight}</span>
              )}
              {titleHighlight && titleNormal && " "}
              {titleNormal}
            </h2>
          )}

          <div className="mt-5 max-w-sm text-base leading-7 text-slate-600 dark:text-white/65">
            Non trovi la risposta che cerchi? Scrivici: ti rispondiamo entro 24 ore.
          </div>

          <Link
            href="/contatti"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:border-transparent hover:bg-slate-950 hover:!text-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white dark:hover:!text-slate-950"
          >
            Fai una domanda
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const open = openIndex === i
            const buttonId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`

            return (
              <div
                key={i}
                className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ${
                  open
                    ? "border-[#7c3aed]/30 bg-white shadow-[0_18px_40px_-18px_rgb(124_58_237/0.35)] dark:border-[#a78bfa]/30 dark:bg-[#0f1726] dark:shadow-[0_18px_40px_-18px_rgb(124_58_237/0.5)]"
                    : "border-slate-200 bg-white/70 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left md:px-6"
                  >
                    <span
                      aria-hidden
                      className={`hidden font-mono text-xs tracking-wider sm:block ${
                        open ? "text-[#7c3aed] dark:text-[#a78bfa]" : "text-slate-400 dark:text-white/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 text-base font-semibold leading-snug text-slate-950 dark:text-white md:text-lg">
                      {item.question}
                    </span>

                    <span
                      aria-hidden
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        open
                          ? "rotate-45 bg-brand-gradient text-white"
                          : "bg-slate-100 text-slate-700 dark:bg-white/[0.08] dark:text-white/80"
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
                    <div className="px-5 pb-6 text-[15px] leading-7 text-slate-600 dark:text-white/65 sm:pl-[3.25rem] md:pr-16">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
