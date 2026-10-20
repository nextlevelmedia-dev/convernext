import Header from "@/components/Header"
import Hero from "@/components/Hero"

import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Temi Shopify",
  description:
    "Temi Shopify progettati per convertire: design curato, velocità e un’esperienza d’acquisto che guida il cliente fino al checkout.",
  path: "/temi-shopify",
})

export default function TemiShopifyPage() {
  return (
    <>
      <Header />
      <div>
        <Hero />
      </div>
    </>
  )
}