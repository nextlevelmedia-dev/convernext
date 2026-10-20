import SectionHeading, { CONTAINER, SECTION } from "./SectionHeading"

/** L'approccio: prima capire le persone, poi progettare. */
export default function AboutApproach({
  eyebrow,
  title,
  text,
  closingText,
}: {
  eyebrow?: string
  title?: string
  text?: string
  closingText?: string
}) {
  const paragraphs = text
    ?.split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  if (!title && !paragraphs?.length) return null

  return (
    <section className={SECTION}>
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20`}>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div className="lg:pt-12">
          {paragraphs && (
            <div className="space-y-5 text-lg leading-8 text-black/65 dark:text-white/70">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {closingText && (
            <blockquote className="relative mt-10 border-l-2 border-transparent pl-6 [border-image:linear-gradient(to_bottom,#fc03b0,#047cf9)_1]">
              <p
                className="text-2xl leading-snug text-slate-950 dark:text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
              >
                {closingText}
              </p>
            </blockquote>
          )}
        </div>
      </div>
    </section>
  )
}
