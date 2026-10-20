import type { ReactNode } from "react"

/**
 * Titolo con gradiente sulle parti tra asterischi:
 * "Né agenzia, né *freelance generalista*."
 */
export function gradientTitle(text?: string): ReactNode {
  if (!text) return null
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} className="bg-brand-gradient bg-clip-text text-transparent">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    )
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-white/60">
      <span aria-hidden className="h-px w-8 bg-brand-gradient" />
      {children}
    </p>
  )
}

/** Intestazione standard delle sezioni di Chi siamo (stessa scala dei titoli della home). */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  className?: string
}) {
  if (!eyebrow && !title && !subtitle) return null

  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2
          className="mt-5 max-w-3xl text-4xl leading-[1.2] tracking-tight text-slate-950 md:text-[42px] dark:text-white"
          style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
        >
          {gradientTitle(title)}
        </h2>
      )}
      {subtitle && (
        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/70">{subtitle}</p>
      )}
    </div>
  )
}

export const SECTION = "relative px-5 py-24 md:px-8 md:py-32 xl:px-10"
export const CONTAINER = "relative mx-auto w-full max-w-7xl"
export const CARD =
  "rounded-[28px] border border-slate-200 bg-white shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.12)] dark:border-white/10 dark:bg-[#0f1726] dark:shadow-[0_1px_2px_rgb(0_0_0/0.3),0_16px_40px_-16px_rgb(0_0_0/0.6)]"
