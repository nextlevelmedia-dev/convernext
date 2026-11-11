import Image from "next/image"
import Link from "next/link"
import { site } from "@/lib/seo"
import CookiePreferencesLink from "@/components/Legal/CookiePreferencesLink"

/*
 * Contenuto del footer, uguale in tutte le pagine (sito e landing immersiva):
 * contatti essenziali (nome, indirizzo, telefono: utili alla SEO locale), link, logo Convernext a tutta larghezza come ultima cosa,
 * poi la banda con copyright, P.IVA e voci legali.
 * I colori hanno "!" perché nella landing il footer sta dentro <main>, dove
 * il CSS globale forza il bianco su p, span e a.
 */

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

const services = [
  { href: "/siti-web", label: "Siti web su misura" },
  { href: "/ecommerce", label: "E-commerce Shopify" },
  { href: "/temi-shopify", label: "Temi Shopify" },
  { href: "/ottimizzazione-conversioni", label: "Ottimizzazione conversioni" },
  { href: "/esperienze-immersive", label: "Esperienze immersive" },
]

const company = [
  { href: "/", label: "Home" },
  { href: "/progetti", label: "Progetti" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
  { href: "/recensioni", label: "Recensioni" },
]

// pagine legali (provvisorie, in attesa di iubenda)
const legal = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/cookie-policy", label: "Cookie policy" },
]

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-[11px] uppercase tracking-[0.3em] !text-white/45 md:text-xs" style={archivo}>
      {children}
    </h2>
  )
}

const linkClass = "!text-white/75 transition-colors hover:!text-white"

export default function FooterContent() {
  return (
    <div className="relative px-5 pt-16 md:px-8 md:pt-20 xl:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <Title>Contatti</Title>
          <ul className="space-y-3 text-base">
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
            <li className="!text-white/45">
              {site.address.street}, {site.address.locality} ({site.address.region})
            </li>
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

      {/* logo a tutta larghezza: l'ultima cosa prima della banda legale */}
      <div className="mx-auto mt-16 max-w-7xl md:mt-24">
        <Link href="/" aria-label="Convernext, vai alla home" className="block">
          <Image
            src="/logo-convernext.svg"
            alt="Convernext"
            width={1010}
            height={106}
            sizes="(min-width: 1280px) 1200px, 92vw"
            className="h-auto w-full"
          />
        </Link>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 py-6 text-sm md:mt-14 md:flex-row md:items-center md:justify-between">
        <p className="!text-white/40">
          © {new Date().getFullYear()} {site.name} · P.IVA {site.vatId}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="!text-white/55 transition-colors hover:!text-white">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <CookiePreferencesLink
              label="Preferenze cookie"
              className="!text-white/55 transition-colors hover:!text-white"
            />
          </li>
          <li>
            <a href="#top" className="!text-white/55 transition-colors hover:!text-white">
              Torna su ↑
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
