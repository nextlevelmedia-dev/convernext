import SectionHeading, { CARD, CONTAINER, SECTION } from "./SectionHeading"

type Item = { title?: string; text?: string }

/**
 * Confronto agenzia / Next / freelance. Con tre voci, quella centrale è Next
 * ed è evidenziata.
 */
export default function AboutCompare({
  eyebrow,
  title,
  subtitle,
  items = [],
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  items?: Item[]
}) {
  if (!title && !items.length) return null
  const featured = items.length === 3 ? 1 : -1

  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {items.map((item, i) =>
            i === featured ? (
              <div
                key={i}
                className="rounded-[28px] bg-brand-gradient p-px shadow-[0_24px_60px_-24px_rgb(124_58_237/0.55)] md:-my-4"
              >
                <div className="flex h-full flex-col rounded-[27px] bg-white p-8 dark:bg-[#0f1726]">
                  <span className="grid size-10 place-items-center rounded-full bg-brand-gradient text-white">
                    <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  </span>
                  <h3
                    className="mt-6 text-2xl text-slate-950 dark:text-white"
                    style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                  >
                    <span className="bg-brand-gradient bg-clip-text text-transparent">{item.title}</span>
                  </h3>
                  <p className="mt-3 text-[17px] leading-7 text-black/70 dark:text-white/75">{item.text}</p>
                </div>
              </div>
            ) : (
              <div key={i} className={`${CARD} flex flex-col p-8`}>
                <span className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-400 dark:border-white/15 dark:text-white/45">
                  <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </span>
                <h3
                  className="mt-6 text-2xl text-slate-950 dark:text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-[17px] leading-7 text-black/60 dark:text-white/65">{item.text}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
