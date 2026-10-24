import type { MetadataRoute } from "next"
import { client } from "../sanity/lib/client"
import { absoluteUrl } from "../lib/seo"

// rigenerata al massimo una volta al giorno: le date seguono le modifiche in Sanity
export const revalidate = 86400

type Route = {
  path: string
  priority: number
  // slug del documento "page" in Sanity da cui leggere l'ultima modifica
  slug?: string
  // data fissa per le pagine senza contenuti in Sanity
  updated?: string
}

const routes: Route[] = [
  { path: "/", priority: 1, slug: "home" },
  { path: "/ecommerce", priority: 0.9, slug: "ecommerce" },
  { path: "/siti-web", priority: 0.9, slug: "siti-web" },
  { path: "/ottimizzazione-conversioni", priority: 0.9, slug: "ottimizzazione-conversioni" },
  { path: "/temi-shopify", priority: 0.9, slug: "temi-shopify" },
  { path: "/progetti", priority: 0.8, slug: "progetti" },
  { path: "/chi-siamo", priority: 0.7, slug: "chi-siamo" },
  { path: "/contatti", priority: 0.8, updated: "2026-10-24" },
]

const query = `{
  "pages": *[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "projectsUpdatedAt": *[_type == "project"] | order(_updatedAt desc)[0]._updatedAt
}`

type SanityDates = {
  pages: { slug: string; _updatedAt: string }[]
  projectsUpdatedAt?: string
}

const latest = (...dates: (string | undefined)[]) =>
  dates.filter((d): d is string => Boolean(d)).sort().at(-1)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // se Sanity non risponde la sitemap resta valida, solo senza lastmod
  const data: SanityDates | null = await client.fetch(query).catch(() => null)
  const pageDates = new Map(data?.pages.map((p) => [p.slug, p._updatedAt]))

  return routes.map((route) => {
    const sanityDate = route.slug ? pageDates.get(route.slug) : undefined
    // /progetti cambia anche quando si aggiunge o modifica un progetto
    const lastModified =
      route.path === "/progetti"
        ? latest(sanityDate, data?.projectsUpdatedAt)
        : (sanityDate ?? route.updated)

    return {
      url: absoluteUrl(route.path),
      ...(lastModified && { lastModified }),
      changeFrequency: "monthly",
      priority: route.priority,
    }
  })
}
