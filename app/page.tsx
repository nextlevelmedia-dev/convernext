import Header from "../components/Header"
import Hero from "../components/Hero"
import ConversionScene from "../components/ConversionScene/ConversionScene"
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects"
import ServicesGrid from "../components/ServicesGrid/ServicesGrid"
import ReviewsSection from "../components/ReviewsSection/ReviewsSection"
import LogoMarquee from "../components/LogoMarquee/LogoMarquee"
import VantaggioUnico from "../components/VantaggioUnico/VantaggioUnico"
import ValueProps from "../components/ValueProps/ValueProps"
import TeamIntro from "../components/TeamIntro/TeamIntro"
import ContactSection from "../components/ContactSection/ContactSection"
import { client } from "../sanity/lib/client"

import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Convernext — Siti web, ecommerce e CRO che generano clienti",
  description:
    "Hai traffico ma poche vendite? Ottimizziamo la tua presenza digitale con dati reali e UX strategica per aumentare lead e conversioni: siti web, ecommerce Shopify e CRO.",
  path: "/",
  absoluteTitle: true,
})

const fallbackServices = [
  {
    label: "Ecommerce Solutions",
    title: "Ecommerce Shopify",
    text: "Ottieni più vendite con un ecommerce Shopify progettato per convertire e offrire un'esperienza fluida.",
    cta: "Ottimizza il tuo ecommerce",
    href: "/ecommerce",
    mediaType: "video" as const,
    videoWebm:
      "https://next-level-media.it/wp-content/uploads/2026/03/Ecommerce.webm",
    videoMp4:
      "https://next-level-media.it/wp-content/uploads/2026/03/Ecommerce.mp4",
  },
  {
    label: "Conversion Optimization",
    title: "Ottimizzazione Conversioni",
    text: "Genera più ricavi dagli stessi visitatori migliorando conversioni e performance.",
    cta: "Ottieni di più dal tuo traffico",
    href: "/ottimizzazione-conversioni",
    mediaType: "lottie" as const,
    lottieFile: "Stats-Going-Up (1).json",
  },
  {
    label: "Web Performance",
    title: "Siti Web Performanti",
    text: "Ottieni più lead e clienti con pagine ottimizzate per guidare ogni utente all'azione.",
    cta: "Ottimizza il tuo sito web",
    href: "/siti-web",
    mediaType: "video" as const,
    videoWebm:
      "https://next-level-media.it/wp-content/uploads/2025/12/website.webm",
    videoMp4:
      "https://next-level-media.it/wp-content/uploads/2025/12/website.mp4",
  },
]

const query = `*[_type == "page" && slug.current == "home"][0]{

  hero{
    eyebrow,
    title,
    titleTwo,
    highlightOne,
    highlightTwo,
    subtitle,
    ctaText,

    trustPoints,

    ctaProofText,
    ctaProofAvatars[]{
      photo{
        asset->{
          _id,
          url
        }
      }
    },

    socialProofBadgeTitle,
    socialProofBadgeSubtitle,

    socialProofStats[]{
      value,
      label,
      hideOnMobile
    }
  },

  homeProjects{
    title,
    highlight,
    titleTwo,
    subtitle,
    ctaLabel,
    ctaText,
    ctaHref
  },

  logoMarquee{
    logosRowOne[]{
      alt,
      logo{
        asset->{
          _id,
          url
        }
      }
    },

    logosRowTwo[]{
      alt,
      logo{
        asset->{
          _id,
          url
        }
      }
    }
  },

  vantaggioUnico{
    titleOne,
    highlightOne,
    titleTwo,
    highlightTwo,
    titleThree,
    subtitle,
    ctaText,
    ctaHref
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

  stickyServices{
    titleHighlight,
    titleNormal,
    subtitle,

    cards[]{
      label,
      title,
      text,
      cta,
      href,
      mediaType,
      videoWebm,
      videoMp4,

      image{
        asset->{
          _id,
          url
        }
      },

      lottieFile
    }
  },

  homeTeam{
    eyebrow,
    title,
    titleHighlight,
    text,
    name,
    role,
    image{
      asset->{
        url
      }
    },
    imageAlt,
    ctaText,
    ctaHref
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
  }
}`

export default async function Home() {
  const page = await client.fetch(query)

  const services =
    page?.stickyServices?.cards?.length > 0
      ? page.stickyServices.cards
      : fallbackServices

  return (
    <>
      <Header />

      <div>
        {/* HERO */}
        <Hero {...page?.hero} rightContent={<ConversionScene />} />

        {/* RECENSIONI */}
        <ReviewsSection
          titleHighlight={page?.reviews?.titleHighlight}
          titleNormal={page?.reviews?.titleNormal}
          items={page?.reviews?.items}
          ctaText={page?.reviews?.ctaText}
          ctaHref={page?.reviews?.ctaHref}
          socialProofText={page?.reviews?.socialProofText}
          socialProofAvatars={page?.reviews?.socialProofAvatars}
        />

        {/* LOGHI CLIENTI */}
        <LogoMarquee
          logosRowOne={page?.logoMarquee?.logosRowOne}
          logosRowTwo={page?.logoMarquee?.logosRowTwo}
        />

        {/* VANTAGGIO UNICO */}
        <VantaggioUnico
          titleOne={page?.vantaggioUnico?.titleOne}
          highlightOne={page?.vantaggioUnico?.highlightOne}
          titleTwo={page?.vantaggioUnico?.titleTwo}
          highlightTwo={page?.vantaggioUnico?.highlightTwo}
          titleThree={page?.vantaggioUnico?.titleThree}
          subtitle={page?.vantaggioUnico?.subtitle}
          ctaText={page?.vantaggioUnico?.ctaText}
          ctaHref={page?.vantaggioUnico?.ctaHref}
        />

        {/* VALUE PROPOSITIONS */}
        <ValueProps items={page?.valueProps} />

        {/* SERVIZI */}
        <ServicesGrid
          titleHighlight={page?.stickyServices?.titleHighlight}
          titleNormal={page?.stickyServices?.titleNormal}
          subtitle={page?.stickyServices?.subtitle}
          services={services}
          ctaText="Parliamo del tuo progetto"
          ctaHref="/contatti"
        />

        {/* PROGETTI */}
        <FeaturedProjects
          title={page?.homeProjects?.title}
          highlight={page?.homeProjects?.highlight}
          titleTwo={page?.homeProjects?.titleTwo}
          subtitle={page?.homeProjects?.subtitle}
        />

        {/* TEAM */}
        <TeamIntro {...page?.homeTeam} />

        {/* CONTATTI */}
        <ContactSection />
      </div>
    </>
  )
}