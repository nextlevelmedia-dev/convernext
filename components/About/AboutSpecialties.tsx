import SectionHeading, { CARD, CONTAINER, SECTION } from "./SectionHeading"

type Item = { title?: string; text?: string }

/** In cosa è specializzato Next: griglia numerata. */
export default function AboutSpecialties({
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

  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li
              key={i}
              className={`${CARD} group flex flex-col p-8 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1`}
            >
              <span className="font-mono text-sm text-slate-400 transition-colors group-hover:text-[#7c3aed] dark:text-white/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="mt-6 text-xl text-slate-950 dark:text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
              >
                {item.title}
              </h3>
              <p className="mt-2 leading-7 text-black/60 dark:text-white/65">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
