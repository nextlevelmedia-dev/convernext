import Image from "next/image"
import Link from "next/link"

/**
 * Esperienze immersive, in evidenza accanto ai servizi (mega menu e menu mobile):
 * card scura con il CN della landing, così si distingue dai quattro servizi.
 */
export function ImmersiveFeature({ compact = false, onClick }: { compact?: boolean; onClick?: () => void }) {
  return (
    <Link
      href="/esperienze-immersive"
      onClick={onClick}
      className={`group/im relative flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-[#05040a] ${
        compact ? "min-h-[150px] p-4 pr-[45%]" : "min-h-[330px] p-5"
      }`}
    >
      {/* il CN intero, in alto (contain: non esce mai dai bordi della card) */}
      <div className={`absolute inset-x-0 top-0 ${compact ? "bottom-0 left-auto w-1/2" : "h-[62%]"}`}>
        <Image
          src="/immersive/poster-end-m.webp"
          alt=""
          fill
          sizes={compact ? "45vw" : "280px"}
          className="object-contain object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/im:scale-105"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05040a] via-[#05040a]/70 to-transparent" />

      <div className="relative">
        <p className="mb-2 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest !text-white backdrop-blur">
          Novità
        </p>
        <h3
          className={`leading-tight !text-white ${compact ? "text-[17px]" : "text-xl"}`}
          style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
        >
          Esperienze immersive
        </h3>
        <p className={`mt-1.5 leading-6 !text-white/70 ${compact ? "text-[13px]" : "text-sm"}`}>
          Siti ed e-commerce in 3D che lasciano il segno.
        </p>
        {!compact && (
          <span className="mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-4 py-2 text-sm font-bold !text-white shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)]">
            Scopri di più →
          </span>
        )}
      </div>
    </Link>
  )
}

// usati anche nella pagina Contatti per i link ai servizi
export const services = [
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
    title: "Temi Shopify",
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
    title: "Siti Web su Misura",
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

            {services.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group/col flex flex-col pr-6 ${i > 0 ? "pl-6" : ""} ${i < services.length - 1 ? "border-r border-slate-200 dark:border-white/10" : ""}`}
              >
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover/col:scale-105 bg-[linear-gradient(135deg,rgb(252_3_176/0.10),rgb(4_124_249/0.10))] dark:bg-[linear-gradient(135deg,rgb(252_3_176/0.18),rgb(4_124_249/0.18))] [&_svg]:!text-[#7c3aed] dark:[&_svg]:!text-[#a78bfa]">
                  {item.icon}
                </div>

                <h3
                  className="mb-2 text-lg !text-slate-900 dark:!text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                >
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

            {/* COLONNA DESTRA — servizio in evidenza: esperienze immersive */}
            <div className="border-l border-slate-200 pl-6 dark:border-white/10">
              <ImmersiveFeature />
            </div>

          </div>

          {/* panoramica di tutte le soluzioni */}
          <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-8 py-4 dark:border-white/10">
            <p className="text-sm !text-slate-500 dark:!text-white/60">Non sai quale scegliere? Confrontale tutte in una pagina.</p>
            <Link href="/soluzioni" className="inline-flex items-center gap-2 text-sm font-bold !text-slate-900 transition-colors hover:!text-[#7c3aed] dark:!text-white dark:hover:!text-[#a78bfa]">
              Tutte le soluzioni →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
