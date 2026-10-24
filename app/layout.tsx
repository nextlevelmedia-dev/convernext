import type { Metadata, Viewport } from "next"
import { Archivo, Lato, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "../components/Footer/Footer"
import ScrollToTop from "../components/ScrollToTop"
import JsonLd from "../components/JsonLd"
import { jsonLdGraph, organizationId, site, websiteId } from "../lib/seo"

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
})

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Convernext — Siti web, ecommerce Shopify e CRO",
    template: "%s | Convernext",
  },
  description: site.description,
  applicationName: site.name,
  // il canonical è definito da ogni pagina: qui non va, altrimenti
  // le route senza metadata propri (es. 404) erediterebbero "/"
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111118",
}

// dark di default: la classe è già nel markup, qui la togliamo solo se
// l'utente ha scelto light. Gira prima del paint, quindi niente flash.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`

const siteJsonLd = jsonLdGraph(
  {
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: site.name,
    alternateName: "Next Level Media",
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    image: `${site.url}/opengraph-image.jpg`,
    email: site.email,
    telephone: site.phone,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "Country", name: "Italia" },
    knowsAbout: [
      "Realizzazione siti web",
      "Sviluppo ecommerce Shopify",
      "Temi Shopify personalizzati",
      "Ottimizzazione delle conversioni (CRO)",
    ],
  },
  {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    inLanguage: "it-IT",
    publisher: { "@id": organizationId },
  }
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`dark ${lato.variable} ${archivo.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-black">
        <JsonLd data={siteJsonLd} />

        <ScrollToTop />

        <main id="main" className="main-bg relative z-10 min-h-screen rounded-b-[42px]">
          {children}
        </main>

        <div className="h-[100vh]" />

        <Footer />
      </body>
    </html>
  )
}