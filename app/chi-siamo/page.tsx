import Header from "@/components/Header"
import HeroChiSiamo from "@/components/HeroChiSiamo/HeroChiSiamo"
import AboutManifesto from "@/components/AboutManifesto/AboutManifesto"
import AboutFounder from "@/components/AboutFounder/AboutFounder"
import ContactSection from "@/components/ContactSection/ContactSection"
import { client } from "@/sanity/lib/client"

const query = `*[_type == "page" && slug.current == "chi-siamo"][0]{
  hero{
    eyebrow,
    title,
    highlightOne,
    titleTwo,
    highlightTwo,
    subtitle,
    ctaText,
    lottieFile
  },

  aboutManifesto{
    eyebrow,
    title,
    text,
    closingText
  },

  aboutFounder{
    eyebrow,
    title,
    name,
    role,
    text,
    image{
      asset->{
        url
      }
    },
    imageAlt
  }
}`

export default async function ChiSiamoPage() {
  const page = await client.fetch(query)

  return (
    <>
      <Header />

      <main>

        {/* HERO */}
        <HeroChiSiamo
          eyebrow={page?.hero?.eyebrow}
          title={page?.hero?.title}
          highlightOne={page?.hero?.highlightOne}
          titleTwo={page?.hero?.titleTwo}
          highlightTwo={page?.hero?.highlightTwo}
          subtitle={page?.hero?.subtitle}
          ctaText={page?.hero?.ctaText}
          lottieFile={page?.hero?.lottieFile}
        />

        {/* FILOSOFIA NEXT */}
        <AboutManifesto
          eyebrow={page?.aboutManifesto?.eyebrow}
          title={page?.aboutManifesto?.title}
          text={page?.aboutManifesto?.text}
          closingText={page?.aboutManifesto?.closingText}
        />

        {/* FOUNDER */}
        <AboutFounder
          eyebrow={page?.aboutFounder?.eyebrow}
          title={page?.aboutFounder?.title}
          name={page?.aboutFounder?.name}
          role={page?.aboutFounder?.role}
          text={page?.aboutFounder?.text}
          image={page?.aboutFounder?.image}
          imageAlt={page?.aboutFounder?.imageAlt}
        />

        {/* CONTATTI */}
        <ContactSection />

      </main>
    </>
  )
}