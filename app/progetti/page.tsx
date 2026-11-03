import Header from "@/components/Header"
import ContactSection from "@/components/ContactSection/ContactSection"
import TrustPoints from "@/components/TrustPoints/TrustPoints"
import { client } from "@/sanity/lib/client"
import Image from "next/image"

import JsonLd from "@/components/JsonLd"
import { ProjectsGrid } from "@/components/FeaturedProjects/ProjectsGrid"
import { featuredProjects } from "@/components/FeaturedProjects/projects"
import { breadcrumbJsonLd, jsonLdGraph, pageMetadata } from "@/lib/seo"

// testo della hero da Sanity: la pagina si rigenera al massimo ogni 5 minuti
export const revalidate = 300

const description =
  "Una selezione dei nostri lavori: siti web, ecommerce e landing page realizzati su misura per imprenditori che volevano clienti, non solo visitatori."

export const metadata = pageMetadata({
  title: "Progetti: siti web ed ecommerce realizzati",
  description,
  path: "/progetti",
})

const jsonLd = jsonLdGraph(
  breadcrumbJsonLd([{ name: "Progetti", path: "/progetti" }])
)

const query = `{
  "page": *[_type == "page" && slug.current == "progetti"][0]{
    hero{
      title,
      highlightOne,
      titleTwo,
      subtitle,
      ctaText,
      ctaHref,
      trustPoints
    }
  }
}`

// solo i progetti che hanno già un'anteprima
const projects = featuredProjects.filter((p) => p.preview)

export default async function ProgettiPage() {
  const data = await client.fetch(query)

  const hero = data?.page?.hero
  const ctaHref = hero?.ctaHref || "#contatti"

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />

      <div className="pt-20">
        <section className="px-5 pb-24 pt-16 md:px-8 md:pt-24 xl:px-10">
          <div className="mx-auto max-w-7xl">
            {/* HERO */}
            <div className="hero-in border-b border-slate-200 pb-12 dark:border-white/10">
              <h1
                className="text-4xl leading-[1.15] tracking-tight text-slate-950 md:text-6xl dark:text-white"
                style={{
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontWeight: 600,
                }}
              >
                {hero?.title}{" "}
                {hero?.highlightOne && (
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    {hero.highlightOne}
                  </span>
                )}{" "}
                {hero?.titleTwo}
              </h1>

              {hero?.subtitle && (
                <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/70">
                  {hero.subtitle}
                </p>
              )}

              <div className="mt-8">
                {hero?.ctaText && (
                  <a
                    href={ctaHref}
                    className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-8 py-4 font-bold !text-white shadow-xl"
                  >
                    {hero.ctaText}
                  </a>
                )}
                <TrustPoints points={hero?.trustPoints} className="mt-6" />
              </div>
            </div>

            {/* PROGETTI */}
            <div className="mt-8">
              <ProjectsGrid projects={projects} />
            </div>

            <div className="mt-20 flex items-center gap-4 text-sm text-slate-500 dark:text-white/50">
              <Image
                src="/PixelWaveLogo3-61fa153c.webp"
                alt="Pixel Wave"
                width={200}
                height={104}
                sizes="64px"
                className="h-auto w-16 object-contain dark:invert"
              />
              <p>Alcuni di questi progetti sono stati realizzati per conto di Pixel Wave.</p>
            </div>
          </div>
        </section>

        <ContactSection />
      </div>
    </>
  )
}
