import SectionHeading, { CARD, CONTAINER, SECTION } from "./SectionHeading"

/** Il modello: competenze core sempre presenti + specialisti coinvolti quando servono. */
export default function AboutModel({
  eyebrow,
  title,
  text,
  coreTitle,
  coreSkills = [],
  specialistsTitle,
  specialistSkills = [],
}: {
  eyebrow?: string
  title?: string
  text?: string
  coreTitle?: string
  coreSkills?: string[]
  specialistsTitle?: string
  specialistSkills?: string[]
}) {
  if (!title && !coreSkills.length) return null

  return (
    <section id="modello" className={`${SECTION} scroll-mt-20`}>
      <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={text} />

        <div className="relative flex flex-col">
          <div className={`${CARD} p-7 sm:p-8`}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-bold text-slate-950 dark:text-white">{coreTitle}</p>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-white/55">sempre</span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {coreSkills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-950 dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-brand-gradient" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* connettore: il team si allarga */}
          <div aria-hidden className="relative mx-auto flex h-14 items-center">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,#fc03b0,#047cf9)] opacity-60" />
            <span className="relative grid size-8 place-items-center rounded-full bg-brand-gradient text-lg font-bold leading-none text-white">+</span>
          </div>

          <div className="rounded-[28px] border border-dashed border-slate-300 p-7 sm:p-8 dark:border-white/15">
            <div className="flex items-center justify-between gap-4">
              <p className="font-bold text-slate-950 dark:text-white">{specialistsTitle}</p>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-white/55">se serve</span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {specialistSkills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-600 dark:border-white/20 dark:text-white/70"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
