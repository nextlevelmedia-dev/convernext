import Link from "next/link"

const items = [
  {
    title: "E-commerce Shopify",
    href: "/ecommerce",
    description: "Soluzioni su misura per costruire e far crescere il tuo brand online.",
    features: ["Setup e configurazione", "Design personalizzato", "Integrazioni e automazioni", "Assistenza e scalabilità"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    title: "Temi Shopify su misura",
    href: "/temi-shopify",
    description: "Temi custom e immersivi che gestisci in autonomia, con i nostri tutorial.",
    features: ["Sezioni custom e immersive", "Modifiche dall'editor", "Tutorial su misura", "Online Store 2.0"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
  },
  {
    title: "Ottimizzazione Conversioni",
    href: "/ottimizzazione-conversioni",
    description: "Trasformiamo i visitatori in clienti con strategie data-driven.",
    features: ["Analisi e audit CRO", "A/B Testing", "UX & Performance", "Strategie di crescita"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    title: "Siti Web Performanti",
    href: "/siti-web",
    description: "Siti veloci, moderni e ottimizzati per offrire la migliore esperienza.",
    features: ["Design moderno e responsive", "SEO & Performance", "Sicurezza e affidabilità", "Manutenzione e supporto"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

// i colori usano `!` perché in globals.css gli elementi dentro <header>
// hanno già un colore forzato (sia in light che in dark)
export default function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full w-screen -translate-x-1/2 border-t border-slate-200 bg-transparent dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 pb-6">
        <div className="rounded-b-3xl border border-t-0 border-slate-200 bg-white/[0.98] shadow-2xl shadow-slate-200/60 backdrop-blur-xl dark:border-white/10 dark:bg-[#0f1726]/[0.97] dark:shadow-black/50">
          <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,0.95fr)] gap-0 p-8">

            {items.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group/col flex flex-col pr-6 ${i > 0 ? "pl-6" : ""} ${i < items.length - 1 ? "border-r border-slate-200 dark:border-white/10" : ""}`}
              >
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover/col:scale-105 bg-[linear-gradient(135deg,rgb(252_3_176/0.10),rgb(4_124_249/0.10))] dark:bg-[linear-gradient(135deg,rgb(252_3_176/0.18),rgb(4_124_249/0.18))] [&_svg]:!text-[#7c3aed] dark:[&_svg]:!text-[#a78bfa]">
                  {item.icon}
                </div>

                <h3 className="mb-2 text-lg font-black !text-slate-900 dark:!text-white">
                  {item.title}
                </h3>

                <p className="mb-5 text-sm leading-6 !text-slate-500 dark:!text-white/60">
                  {item.description}
                </p>

                <ul className="mb-6 flex-1 space-y-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm !text-slate-600 dark:!text-white/75">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 !text-[#7c3aed] dark:!text-[#a78bfa]">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-2 self-start rounded-full bg-slate-100 px-4 py-2 text-sm font-bold !text-slate-900 transition-all duration-300 group-hover/col:bg-[linear-gradient(to_right,#fc03b0,#047cf9)] group-hover/col:!text-white group-hover/col:shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] group-focus-visible/col:bg-[linear-gradient(to_right,#fc03b0,#047cf9)] group-focus-visible/col:!text-white dark:bg-white/[0.07] dark:!text-white">
                  Scopri di più →
                </span>
              </Link>
            ))}

            {/* COLONNA DESTRA — CTA */}
            <div className="flex flex-col justify-center border-l border-slate-200 pl-6 dark:border-white/10">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest !text-[#7c3aed] dark:!text-[#a78bfa]">
                Hai un&apos;idea in mente?
              </p>
              <h3 className="mb-3 text-2xl font-black leading-tight !text-slate-900 dark:!text-white">
                Parliamone insieme
              </h3>
              <p className="mb-6 text-sm leading-6 !text-slate-500 dark:!text-white/60">
                Raccontaci il tuo progetto e scopriamo come realizzarlo al meglio.
              </p>
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold !text-white shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] transition-shadow duration-300 hover:shadow-[0_18px_44px_-12px_rgb(252_3_176/0.6)]"
              >
                Contattaci ora →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
