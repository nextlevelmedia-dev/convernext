"use client"

import { useEffect, useId, useRef, useState } from "react"
import { BENEFIT_ICONS, type BenefitIconName } from "./benefitIcons"

/** Icona a tratto col gradiente del brand, che si disegna quando entra in vista. */
export default function BenefitIcon({ name, delay = 0 }: { name: BenefitIconName; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)
  const gradient = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setDrawn(true)
        io.disconnect()
      },
      { rootMargin: "0px 0px -15% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`benefit-icon relative grid size-12 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgb(15_23_42/0.04),0_8px_24px_-12px_rgb(124_58_237/0.35)] transition-transform duration-500 group-hover/benefit:-rotate-6 group-hover/benefit:scale-110 sm:size-14 dark:border-white/10 dark:bg-white/[0.04] ${drawn ? "is-drawn" : ""}`}
      style={{ ["--draw-delay" as string]: `${delay}ms` }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-[radial-gradient(70%_70%_at_30%_20%,rgb(252_3_176/0.14),transparent_70%),radial-gradient(70%_70%_at_80%_90%,rgb(4_124_249/0.14),transparent_70%)]"
      />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="relative size-[26px] sm:size-[30px]"
        fill="none"
        stroke={`url(#${gradient})`}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id={gradient} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fc03b0" />
            <stop offset="1" stopColor="#047cf9" />
          </linearGradient>
        </defs>
        {BENEFIT_ICONS[name].map((shape, i) => (
          // ogni tratto parte un po' dopo il precedente
          <g key={i} style={{ transitionDelay: `calc(var(--draw-delay) + ${i * 110}ms)` }}>
            {shape}
          </g>
        ))}
      </svg>
    </div>
  )
}
