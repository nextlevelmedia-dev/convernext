import type { MetadataRoute } from "next"
import { site } from "../lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/ecommerce", priority: 0.9 },
    { path: "/siti-web", priority: 0.9 },
    { path: "/ottimizzazione-conversioni", priority: 0.9 },
    { path: "/temi-shopify", priority: 0.7 },
    { path: "/progetti", priority: 0.8 },
    { path: "/chi-siamo", priority: 0.7 },
  ]

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }))
}
