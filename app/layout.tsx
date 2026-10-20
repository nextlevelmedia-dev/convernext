import type { Metadata, Viewport } from "next"
import { Archivo, Lato, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "../components/Footer/Footer"
import ScrollToTop from "../components/ScrollToTop"
import { site } from "../lib/seo"

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
    default: "Convernext — Siti web, ecommerce e CRO che generano clienti",
    template: "%s | Convernext",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111118",
}

// dark di default: la classe è già nel markup, qui la togliamo solo se
// l'utente ha scelto light. Gira prima del paint, quindi niente flash.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: "Next Level Media",
  url: site.url,
  logo: `${site.url}/logo-convernext.webp`,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: "IT",
}

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

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