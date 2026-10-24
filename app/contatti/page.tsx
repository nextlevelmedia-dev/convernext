import Header from "@/components/Header"
import ContactHero from "@/components/ContactPage/ContactHero"
import ContactSection from "@/components/ContactSection/ContactSection"
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection"
import ServiceLinks from "@/components/ContactPage/ServiceLinks"
import JsonLd from "@/components/JsonLd"
import { client } from "@/sanity/lib/client"

import { breadcrumbJsonLd, jsonLdGraph, organizationId, pageMetadata, site } from "@/lib/seo"

const description =
  "Hai un progetto di sito web, ecommerce Shopify o ottimizzazione delle conversioni? Raccontacelo: Convernext ti risponde entro 24 ore, senza impegno."

export const metadata = pageMetadata({
  title: "Contatti — Richiedi una consulenza",
  description,
  path: "/contatti",
})

const jsonLd = jsonLdGraph(
  breadcrumbJsonLd([{ name: "Contatti", path: "/contatti" }]),
  {
    "@type": "ContactPage",
    "@id": `${site.url}/contatti#webpage`,
    url: `${site.url}/contatti`,
    name: "Contatti — Convernext",
    description,
    inLanguage: "it-IT",
    about: { "@id": organizationId },
  }
)

// le stesse recensioni pubblicate in home
const query = `*[_type == "page" && slug.current == "home"][0]{
  reviews{
    titleHighlight,
    titleNormal,
    socialProofText,

    socialProofAvatars[]{
      photo{
        asset->{
          _id,
          url
        }
      }
    },

    items[]{
      stars,
      reviewTitle,
      reviewText,
      authorName,
      authorRole,

      authorPhoto{
        asset->{
          _id,
          url
        }
      },

      companyLogo{
        asset->{
          _id,
          url
        }
      }
    }
  }
}`

export default async function ContattiPage() {
  const page = await client.fetch(query)

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />

      <div>
        {/* HERO + CONTATTI DIRETTI */}
        <ContactHero />

        {/* FORM */}
        <ContactSection />

        {/* RECENSIONI */}
        <ReviewsSection
          titleHighlight={page?.reviews?.titleHighlight}
          titleNormal={page?.reviews?.titleNormal}
          items={page?.reviews?.items}
          ctaText="Richiedi una consulenza"
          ctaHref="#contatti"
          socialProofText={page?.reviews?.socialProofText}
          socialProofAvatars={page?.reviews?.socialProofAvatars}
        />

        {/* SERVIZI */}
        <ServiceLinks />
      </div>
    </>
  )
}
