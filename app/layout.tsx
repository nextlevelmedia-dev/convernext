import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Archivo, Lato, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "../components/Footer/Footer"
import AmbientBackground from "../components/AmbientBackground/AmbientBackground"
import SiteFooter from "../components/SiteFooter"
import ClickTracking from "../components/Analytics/ClickTracking"
import ScrollToTop from "../components/ScrollToTop"
import ScrollReveal from "../components/ScrollReveal"
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

/*
 * Tracciamento: iubenda (consenso) + Google Tag Manager.
 * Ordine: 1) Consent Mode con tutto negato di default, 2) iubenda, 3) GTM.
 * Così nessun tag in GTM parte prima che l'utente abbia scelto.
 */
const GTM_ID = "GTM-KXMGLPFJ"
const IUBENDA_WIDGET = "https://embeds.iubenda.com/widgets/3d5396df-31f3-4e12-ab04-b47bfc7c3cf9.js"

const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",functionality_storage:"granted",security_storage:"granted",wait_for_update:2000});gtag("set","ads_data_redaction",true);gtag("set","url_passthrough",true);`

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`

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
    vatID: `IT${site.vatId}`,
    description: site.description,
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
        {/* eseguiti nell'ordine: consenso negato di default, poi iubenda */}
        <Script id="consent-default" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
        <Script id="iubenda" strategy="beforeInteractive" src={IUBENDA_WIDGET} />
      </head>
      <body className="min-h-full bg-[var(--page-bg)]">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd data={siteJsonLd} />

        <ScrollToTop />

        <main id="main" className="main-bg relative z-10 min-h-screen rounded-b-[42px]">
          <AmbientBackground />
          {children}
        </main>

        {/* footer del sito (le landing con footer proprio lo saltano) */}
        <SiteFooter>
          <Footer />
        </SiteFooter>

        <ScrollReveal />

        <ClickTracking />

        {/* GTM dopo l'idratazione: il consenso è già impostato */}
        <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtmScript }} />
      </body>
    </html>
  )
}