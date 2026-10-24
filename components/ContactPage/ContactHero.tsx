import Link from "next/link"
import TrustPoints from "../TrustPoints/TrustPoints"
import { CARD } from "../About/SectionHeading"
import { site } from "@/lib/seo"

const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.locality} (${site.address.region})`

const CHANNELS = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z",
  },
  {
    label: "Telefono",
    value: site.phoneDisplay,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z",
  },
  {
    label: "Sede",
    value: fullAddress,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    external: true,
    icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z",
  },
  {
    label: "Orari",
    value: site.hours,
    icon: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 5v5l4 2",
  },
]

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pt-40 lg:pb-28 xl:px-10">
      {/* stessa griglia e alone della hero in home */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.045)_1px,transparent_1px),linear-gradient(rgb(15_23_42/0.045)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)] dark:bg-[linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_8%_0%,rgb(252_3_176/0.12),transparent_70%),radial-gradient(60%_60%_at_95%_10%,rgb(4_124_249/0.1),transparent_70%)] dark:bg-[radial-gradient(60%_60%_at_8%_0%,rgb(252_3_176/0.16),transparent_70%),radial-gradient(60%_60%_at_95%_10%,rgb(4_124_249/0.14),transparent_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="flex min-w-0 flex-col items-start">
          <div className="mb-7 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold backdrop-blur md:mb-6 dark:border-white/10 dark:bg-[#0f1726]/80">
            <span className="bg-brand-gradient bg-clip-text text-transparent">Contatti</span>
          </div>

          <h1
            className="max-w-3xl text-[clamp(2.35rem,1.2rem+4.4vw,4.6rem)] leading-[1.04] tracking-[-0.035em] text-slate-950 md:text-5xl md:leading-[1.15] md:tracking-[-0.025em] dark:text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
          >
            Parliamo del tuo{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">sito web</span>{" "}
            o del tuo{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">ecommerce</span>
          </h1>

          <p className="mt-7 max-w-xl text-[clamp(1.05rem,0.98rem+0.3vw,1.2rem)] leading-[1.7] text-black/65 md:mt-6 md:max-w-2xl md:text-lg md:leading-8 dark:text-white/70">
            Che tu debba realizzare un nuovo sito, lanciare un ecommerce Shopify o far rendere di più
            il traffico che hai già, raccontaci da dove parti e dove vuoi arrivare. Analizziamo la
            richiesta e ti ricontattiamo per una prima consulenza, senza impegno.
          </p>

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center md:mt-10">
            <Link
              href="#contatti"
              className="group/btn inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-8 text-base font-bold !text-white shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_18px_44px_-12px_rgb(252_3_176/0.6)] active:scale-[0.98]"
            >
              Richiedi una consulenza
              <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-y-0.5">↓</span>
            </Link>
            <Link
              href="/progetti"
              className="group/al inline-flex items-center gap-1.5 font-bold text-slate-950 transition-colors hover:text-[#047cf9] dark:text-white"
            >
              <span className="bg-[linear-gradient(90deg,#fc03b0,#047cf9)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/al:bg-[length:100%_1.5px]">
                Guarda i progetti
              </span>
              <span aria-hidden className="transition-transform duration-300 group-hover/al:translate-x-1">→</span>
            </Link>
          </div>

          <TrustPoints
            points={["Risposta entro 24 ore", "Nessun impegno", "Un referente diretto"]}
            className="mt-8"
          />
        </div>

        {/* CONTATTI DIRETTI */}
        <div className={`${CARD} min-w-0 p-6 sm:p-8`}>
          <h2
            className="text-2xl text-slate-950 dark:text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
          >
            Preferisci un contatto diretto?
          </h2>
          <p className="mt-2 text-[15px] leading-6 text-black/60 dark:text-white/65">
            Scrivici o chiamaci: parli subito con chi seguirà il tuo progetto.
          </p>

          <ul className="mt-6 flex flex-col divide-y divide-slate-200 dark:divide-white/10">
            {CHANNELS.map((channel) => {
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgb(252_3_176/0.10),rgb(4_124_249/0.10))] dark:bg-[linear-gradient(135deg,rgb(252_3_176/0.18),rgb(4_124_249/0.18))]">
                    <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#7c3aed] dark:text-[#a78bfa]">
                      <path d={channel.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    {/* div e non span: in dark mode globals.css forza gli span a bianco pieno */}
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/50">
                      {channel.label}
                    </div>
                    <span className="mt-0.5 block break-words font-bold text-slate-950 dark:text-white">
                      {channel.value}
                    </span>
                  </div>
                </>
              )

              return (
                <li key={channel.label} className="py-4 first:pt-0 last:pb-0">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      {...(channel.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="flex items-center gap-4 rounded-xl transition-opacity hover:opacity-80"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
