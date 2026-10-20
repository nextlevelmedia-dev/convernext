import type { Metadata } from "next"

export const site = {
  name: "Convernext",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Studio digitale indipendente specializzato in siti web, ecommerce Shopify e ottimizzazione delle conversioni. Trasformiamo il traffico in clienti con dati reali e UX strategica.",
  email: "info@next-level-media.it",
  phone: "+39 3334187542",
  address: {
    street: "Via Risorgimento, 61",
    locality: "Pescarolo ed Uniti",
    region: "CR",
    country: "IT",
  },
}

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
