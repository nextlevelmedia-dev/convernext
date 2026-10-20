import Header from "@/components/Header"
import AboutHero from "@/components/About/AboutHero"
import AboutCompare from "@/components/About/AboutCompare"
import AboutModel from "@/components/About/AboutModel"
import AboutSpecialties from "@/components/About/AboutSpecialties"
import AboutApproach from "@/components/About/AboutApproach"
import AboutPromise from "@/components/About/AboutPromise"
import TeamIntro from "@/components/TeamIntro/TeamIntro"
import ContactSection from "@/components/ContactSection/ContactSection"
import { client } from "@/sanity/lib/client"

import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Chi siamo — Studio digitale indipendente",
  description:
    "Next è uno studio digitale indipendente specializzato in siti web, ecommerce e conversione. Un referente diretto e, quando serve, gli specialisti giusti per il tuo progetto.",
  path: "/chi-siamo",
})

const query = `*[_type == "page" && slug.current == "chi-siamo"][0]{
  hero{
    eyebrow,
    title,
    highlightOne,
    titleTwo,
    highlightTwo,
    subtitle,
    ctaText,
    trustPoints
  },

  aboutAdvantages{
    eyebrow,
    title,
    subtitle,
    items[]{ title, text }
  },

  aboutFounder{
    eyebrow,
    title,
    titleHighlight,
    name,
    role,
    text,
    image{
      asset->{
        url
      }
    },
    imageAlt
  },

  aboutModel{
    eyebrow,
    title,
    text,
    coreTitle,
    coreSkills,
    specialistsTitle,
    specialistSkills
  },

  aboutPrinciples{
    eyebrow,
    title,
    subtitle,
    items[]{ title, text }
  },

  aboutManifesto{
    eyebrow,
    title,
    text,
    closingText
  },

  aboutFinal{
    eyebrow,
    title,
    text,
    ctaText,
    ctaHref,
    ctaSubText
  }
}`

export default async function ChiSiamoPage() {
  const page = await client.fetch(query)
  const founder = page?.aboutFounder
  const model = page?.aboutModel

  return (
    <>
      <Header />

      <div>
        {/* HERO — il modello in un colpo d'occhio */}
        <AboutHero
          {...page?.hero}
          imageUrl={founder?.image?.asset?.url}
          imageAlt={founder?.imageAlt}
          name={founder?.name}
          role="il tuo referente"
          coreSkills={model?.coreSkills}
          specialistSkills={model?.specialistSkills}
        />

        {/* NÉ AGENZIA, NÉ FREELANCE */}
        <AboutCompare {...page?.aboutAdvantages} />

        {/* FOUNDER */}
        <TeamIntro {...founder} />

        {/* MODELLO */}
        <AboutModel {...model} />

        {/* SPECIALIZZAZIONE */}
        <AboutSpecialties {...page?.aboutPrinciples} />

        {/* APPROCCIO */}
        <AboutApproach {...page?.aboutManifesto} />

        {/* PROMESSA */}
        <AboutPromise {...page?.aboutFinal} />

        {/* CONTATTI */}
        <ContactSection />
      </div>
    </>
  )
}
