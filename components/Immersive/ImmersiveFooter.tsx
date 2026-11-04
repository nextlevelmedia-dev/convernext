import Image from "next/image"
import Link from "next/link"
import { site } from "@/lib/seo"
import { WhatsAppButton, whatsappUrl } from "./whatsapp"

/*
 * Footer della landing: chiude la storia come i titoli di coda.
 * Sopra la CTA finale sul monogramma CN, sotto contatti e link essenziali.
 * Sostituisce il footer del sito solo su questa pagina (vedi SiteFooter).
 */

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

const services = [
  { href: "/siti-web", label: "Siti web su misura" },
  { href: "/ecommerce", label: "E-commerce Shopify" },
  { href: "/temi-shopify", label: "Temi Shopify" },
  { href: "/ottimizzazione-conversioni", label: "Ottimizzazione conversioni" },
]

const company = [
  { href: "/", label: "Home" },
  { href: "/progetti", label: "Progetti" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
]

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 text-[11px] uppercase tracking-[0.3em] !text-white/45 md:text-xs" style={archivo}>
      {children}
    </h3>
  )
}

const linkClass = "!text-white/75 transition-colors hover:!text-white"

export default function ImmersiveFooter() {
  return (
    <footer id="contatto" data-medusa="hide" className="relative overflow-hidden">
      {/* CTA finale sul monogramma */}
      <div className="relative flex min-h-svh items-end px-5 pb-20 pt-40 md:items-center md:px-8 md:py-32 xl:px-10">
        <div aria-hidden data-no-reveal className="absolute inset-0">
          <Image src="/immersive/poster-end.webp" alt="" fill sizes="100vw" className="hidden object-cover md:block" />
          <div className="absolute inset-x-0 top-0 h-[58%] md:hidden">
            <Image src="/immersive/poster-end-m.webp" alt="" fill sizes="100vw" className="object-cover" />
          </div>
          {/* il CN si spegne verso il basso, nel buio dei titoli di coda */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05040a] via-[#05040a]/55 to-[#05040a]/10 md:via-[#05040a]/20 md:to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl text-center md:pt-[46svh]">
          <h2
            className="mx-auto max-w-4xl text-[clamp(2.2rem,5vw,4.6rem)] leading-[1.04] tracking-[-0.03em] !text-white"
            style={archivo}
          >
            Il prossimo progetto memorabile{" "}
            {/* gradient solo su mobile: su desktop il CN dietro è già abbastanza colorato */}
            <em className="bg-brand-gradient bg-clip-text not-italic text-transparent md:!bg-none md:!text-white">
              potrebbe essere il tuo.
            </em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 !text-white/70">
            Scrivici su WhatsApp: ci racconti il tuo brand, ti proponiamo l&apos;esperienza giusta. Risposta entro 24 ore,
            senza impegno.
          </p>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton />
          </div>
        </div>
      </div>

      {/* contatti e link essenziali */}
      <div className="relative border-t border-white/10 px-5 pb-10 pt-16 md:px-8 md:pt-20 xl:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          <div>
            <Link href="/" aria-label="Convernext, vai alla home">
              <Image src="/logo-convernext.svg" alt="Convernext" width={1010} height={106} className="h-auto w-[150px]" />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-7 !text-white/55">
              Siti ed e-commerce immersivi per brand che vogliono farsi ricordare.
            </p>
          </div>

          <div>
            <Title>Contatti</Title>
            <ul className="space-y-3 text-base">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </li>
              <li className="!text-white/45">{site.hours}</li>
            </ul>
          </div>

          <div>
            <Title>Servizi</Title>
            <ul className="space-y-3 text-base">
              {services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Title>Convernext</Title>
            <ul className="space-y-3 text-base">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="!text-white/40">
            © {new Date().getFullYear()} {site.name} · {site.address.street}, {site.address.locality} ({site.address.region})
          </p>
          <a href="#immersive-hero" className="!text-white/55 transition-colors hover:!text-white">
            Torna all&apos;inizio ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
