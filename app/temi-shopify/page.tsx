import Header from "@/components/Header"
import Hero from "@/components/Hero"
import DeviceMockups from "@/components/DeviceMockups/DeviceMockups"
import EditorVideo from "@/components/EditorVideo/EditorVideo"
import ImpactSection from "@/components/ImpactSection/ImpactSection"
import MockupMarquee from "@/components/MockupMarquee/MockupMarquee"
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection"
import ValueProps from "@/components/ValueProps/ValueProps"
import BenefitsSection from "@/components/BenefitsSection/BenefitsSection"
import ProcessSection from "@/components/ProcessTimeline/ProcessSection"
import FinalRecap from "@/components/FinalRecap/FinalRecap"
import FaqSection from "@/components/FaqSection/FaqSection"
import ContactSection from "@/components/ContactSection/ContactSection"
import { client } from "@/sanity/lib/client"

import { MOCKUP_SLIDES_PROJECTION, resolveMockupSlides } from "@/lib/mockupSlides"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd, jsonLdGraph, pageMetadata, serviceJsonLd } from "@/lib/seo"

const description =
  "Temi Shopify custom con sezioni immersive, costruiti sul tuo brand e pensati per vendere. Li gestisci in autonomia dall’editor di Shopify, con i nostri tutorial."

export const metadata = pageMetadata({
  title: "Temi Shopify su misura e personalizzati",
  description,
  path: "/temi-shopify",
})

const jsonLd = jsonLdGraph(
  breadcrumbJsonLd([{ name: "Temi Shopify", path: "/temi-shopify" }]),
  serviceJsonLd({
    name: "Temi Shopify su misura",
    serviceType: "Sviluppo temi Shopify",
    description,
    path: "/temi-shopify",
  })
)

// usate solo se in Sanity non ci sono slide complete
const themeSlides = [
  {
    imac: "/mockups/ecommerce-imac-1.webp",
    tablet: "/mockups/ecommerce-tablet-1.webp",
    mobile: "/mockups/ecommerce-mobile-1.webp",
  },
  {
    imac: "/mockups/ecommerce-imac-2.webp",
    tablet: "/mockups/ecommerce-tablet-2.webp",
    mobile: "/mockups/ecommerce-mobile-2.webp",
  },
  {
    imac: "/mockups/ecommerce-imac-3.webp",
    tablet: "/mockups/ecommerce-tablet-3.webp",
    mobile: "/mockups/ecommerce-mobile-3.webp",
  },
  {
    imac: "/mockups/ecommerce-imac-4.webp",
    tablet: "/mockups/ecommerce-tablet-4.webp",
    mobile: "/mockups/ecommerce-mobile-4.webp",
  },
  {
    imac: "/mockups/ecommerce-imac-5.webp",
    tablet: "/mockups/ecommerce-tablet-5.webp",
    mobile: "/mockups/ecommerce-mobile-5.webp",
  },
  {
    imac: "/mockups/ecommerce-imac-6.webp",
    tablet: "/mockups/ecommerce-tablet-6.webp",
    mobile: "/mockups/ecommerce-mobile-6.webp",
  },
]

const query = `*[_type == "page" && slug.current == "temi-shopify"][0]{

  hero{
    eyebrow,
    title,
    titleTwo,
    highlightOne,
    highlightTwo,
    subtitle,
    ctaText,

    trustPoints,

    socialProofBadgeTitle,
    socialProofBadgeSubtitle,

    socialProofStats[]{
      value,
      label,
      hideOnMobile
    }
  },

  heroVideo{
    "webm": webm.asset->url,
    "mp4": mp4.asset->url,
    "webmMobile": webmMobile.asset->url,
    "mp4Mobile": mp4Mobile.asset->url,
    "poster": poster.asset->url,
    address
  },

  ${MOCKUP_SLIDES_PROJECTION},

  impactSection{
    titleHighlight,
    titleNormal,
    subtitle,
    impactText
  },

  mockupMarquee{
    rowOne[]{
      image{
        asset->{
          _id,
          url
        }
      },
      alt
    },

    rowTwo[]{
      image{
        asset->{
          _id,
          url
        }
      },
      alt
    }
  },

  reviews{
    titleHighlight,
    titleNormal,
    ctaText,
    ctaHref,
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
  },

  valueProps[]{
    label,
    titleHighlight,
    titleNormal,
    subtitle,
    ctaText,
    ctaHref,
    mediaType,

    image{
      asset->{
        _id,
        url
      }
    },

    videoWebm,
    videoMp4,
    lottieFile,
    modelUrl,
    componentKey
  },

  benefits{
    titleHighlight,
    titleNormal,
    ctaText,
    ctaHref,

    items[]{
      image{
        asset->{
          _id,
          url
        }
      },

      title,
      description
    }
  },

  processSection{
    titleHighlight,
    titleNormal,
    subtitle,

    steps[]{
      title,
      description
    }
  },

  faqSection{
    titleHighlight,
    titleNormal,

    items[]{
      question,
      answer
    }
  },

  finalRecap{
    eyebrow,
    titleHighlight,
    titleNormal,
    subtitle,
    bulletPoints,
    ctaText,
    ctaHref,
    ctaSubText,
    mediaType,

    image{
      asset->{
        _id,
        url
      }
    },

    videoWebm,
    videoMp4,
    lottieFile
  }
}`

export default async function TemiShopifyPage() {
  const page = await client.fetch(query)

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />

      <div>
        {/* HERO */}
        <Hero
          eyebrow={page?.hero?.eyebrow}
          title={page?.hero?.title}
          highlightOne={page?.hero?.highlightOne}
          titleTwo={page?.hero?.titleTwo}
          highlightTwo={page?.hero?.highlightTwo}
          subtitle={page?.hero?.subtitle}
          ctaText={page?.hero?.ctaText}

          trustPoints={page?.hero?.trustPoints}

          socialProofBadgeTitle={page?.hero?.socialProofBadgeTitle}
          socialProofBadgeSubtitle={page?.hero?.socialProofBadgeSubtitle}
          socialProofStats={page?.hero?.socialProofStats}

          rightContent={
            page?.heroVideo?.webm || page?.heroVideo?.mp4 ? (
              <EditorVideo {...page.heroVideo} />
            ) : (
              <DeviceMockups slides={resolveMockupSlides(page?.mockupSlides, themeSlides)} />
            )
          }
        />

        {/* IMPACT */}
        <ImpactSection
          titleHighlight={page?.impactSection?.titleHighlight}
          titleNormal={page?.impactSection?.titleNormal}
          subtitle={page?.impactSection?.subtitle}
          impactText={page?.impactSection?.impactText}
        />

        {/* MOCKUP MARQUEE */}
        <MockupMarquee
          rowOne={page?.mockupMarquee?.rowOne}
          rowTwo={page?.mockupMarquee?.rowTwo}
        />

        {/* REVIEWS */}
        <ReviewsSection
          service="temi-shopify"
          titleHighlight={page?.reviews?.titleHighlight}
          titleNormal={page?.reviews?.titleNormal}
          items={page?.reviews?.items}
          ctaText={page?.reviews?.ctaText}
          ctaHref={page?.reviews?.ctaHref}
          socialProofText={page?.reviews?.socialProofText}
          socialProofAvatars={page?.reviews?.socialProofAvatars}
        />

        {/* VALUE PROPOSITIONS */}
        <ValueProps items={page?.valueProps} />

        {/* BENEFITS */}
        <BenefitsSection
          titleHighlight={page?.benefits?.titleHighlight}
          titleNormal={page?.benefits?.titleNormal}
          ctaText={page?.benefits?.ctaText}
          ctaHref={page?.benefits?.ctaHref}
          items={page?.benefits?.items}
        />

        {/* PROCESS */}
        <ProcessSection
          titleHighlight={page?.processSection?.titleHighlight}
          titleNormal={page?.processSection?.titleNormal}
          subtitle={page?.processSection?.subtitle}
          steps={page?.processSection?.steps}
        />

        {/* FINAL RECAP */}
        <FinalRecap
          visual="temi-shopify"
          eyebrow={page?.finalRecap?.eyebrow}
          titleHighlight={page?.finalRecap?.titleHighlight}
          titleNormal={page?.finalRecap?.titleNormal}
          subtitle={page?.finalRecap?.subtitle}
          bulletPoints={page?.finalRecap?.bulletPoints}
          ctaText={page?.finalRecap?.ctaText}
          ctaHref={page?.finalRecap?.ctaHref}
          ctaSubText={page?.finalRecap?.ctaSubText}
          mediaType={page?.finalRecap?.mediaType}
          image={page?.finalRecap?.image}
          videoWebm={page?.finalRecap?.videoWebm}
          videoMp4={page?.finalRecap?.videoMp4}
          lottieFile={page?.finalRecap?.lottieFile}
        />

        {/* FAQ */}
        <FaqSection
          titleHighlight={page?.faqSection?.titleHighlight}
          titleNormal={page?.faqSection?.titleNormal}
          items={page?.faqSection?.items}
        />

        {/* CONTACT */}
        <ContactSection />
      </div>
    </>
  )
}