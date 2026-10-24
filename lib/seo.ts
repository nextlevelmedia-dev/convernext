import type { Metadata } from "next"

export const site = {
  name: "Convernext",
  // dominio canonico fisso: non dipende dal deployment (preview, *.vercel.app, localhost)
  url: "https://convernext.com",
  description:
    "Studio digitale specializzato in realizzazione di siti web, sviluppo ecommerce Shopify e ottimizzazione delle conversioni (CRO). Trasformiamo il traffico in clienti con dati reali e UX strategica.",
  email: "info@next-level-media.it",
  phone: "+39 3334187542",
  phoneDisplay: "+39 333 418 7542",
  hours: "Lun – Ven, 9:00 – 18:00",
  address: {
    street: "Via Risorgimento, 61",
    locality: "Pescarolo ed Uniti",
    postalCode: "26033",
    region: "CR",
    country: "IT",
  },
}

export const absoluteUrl = (path: string) => (path === "/" ? site.url : `${site.url}${path}`)

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
      locale: "it_IT",
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  }
}

/* =========================
   DATI STRUTTURATI (JSON-LD)
========================= */

export const organizationId = `${site.url}/#organization`
export const websiteId = `${site.url}/#website`

type Crumb = { name: string; path: string }

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const items = [{ name: "Home", path: "/" }, ...crumbs]

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function serviceJsonLd({
  name,
  serviceType,
  description,
  path,
}: {
  name: string
  serviceType: string
  description: string
  path: string
}) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Italia" },
  }
}

/** Grafo JSON-LD di pagina: sempre con @context, nodi collegati tramite @id. */
export function jsonLdGraph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes }
}
