import Link from "next/link"
import { services } from "../MegaMenu"
import SectionHeading, { CARD, CONTAINER, SECTION } from "../About/SectionHeading"

/** Collegamenti ai servizi per chi vuole approfondire prima di scriverci. */
export default function ServiceLinks() {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="I nostri servizi"
          title="Di cosa vuoi *parlarci?*"
          subtitle="Se prima di scriverci vuoi capire come lavoriamo, scopri il servizio più vicino al tuo progetto."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={`${CARD} group/card flex flex-col p-6 transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgb(252_3_176/0.10),rgb(4_124_249/0.10))] text-[#7c3aed] dark:bg-[linear-gradient(135deg,rgb(252_3_176/0.18),rgb(4_124_249/0.18))] dark:text-[#a78bfa] [&_svg]:size-6">
                {service.icon}
              </div>

              <h3
                className="text-lg text-slate-950 dark:text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
              >
                {service.title}
              </h3>

              <p className="mt-2 flex-1 text-[15px] leading-6 text-black/60 dark:text-white/65">
                {service.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-slate-950 dark:text-white">
                Scopri di più
                <span aria-hidden className="transition-transform duration-300 group-hover/card:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
