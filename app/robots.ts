import type { MetadataRoute } from "next"
import { site } from "../lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    // solo aree tecniche: CMS e API. CSS, JS e immagini restano accessibili.
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
