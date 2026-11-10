import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import Header from "@/components/Header"
import ContactSection from "@/components/ContactSection/ContactSection"
import JsonLd from "@/components/JsonLd"
import { caseStudies, getCaseStudy } from "@/components/CaseStudies/caseStudies"
import { breadcrumbJsonLd, jsonLdGraph, pageMetadata } from "@/lib/seo"

/*
 * Pagina case study di un progetto. I contenuti sono in caseStudies.ts:
 * per aggiungerne uno basta una nuova voce lì e caseStudy: true in projects.ts.
 */

// solo i case study esistenti: gli altri slug danno 404
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) return {}
  return pageMetadata({ title: cs.seo.title, description: cs.seo.description, path: `/progetti/${cs.slug}` })
}

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-white/55 md:text-xs">
      {children}
    </p>
  )
}

function BrowserFrame({ src, alt, priority = false, children }: { src: string; alt: string; priority?: boolean; children?: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2 shadow-[0_30px_80px_-40px_rgb(15_23_42/0.35)] dark:border-white/10 dark:bg-[#0f1726] dark:shadow-[0_30px_80px_-40px_rgb(0_0_0/0.8)] md:rounded-[28px] md:p-3">
      <div className="flex items-center gap-1.5 px-2 pb-2 pt-1 md:pb-3">
        <i className="size-2.5 rounded-full bg-[#ff5f57]" />
        <i className="size-2.5 rounded-full bg-[#febc2e]" />
        <i className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="relative aspect-[1396/868] overflow-hidden rounded-xl md:rounded-2xl">
        <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        {children}
      </div>
    </div>
  )
}

/** titolo con una sola frase in gradient */
function gradientTitle(title: string, part?: string) {
  const i = part ? title.indexOf(part) : -1
  if (!part || i < 0) return title
  return (
    <>
      {title.slice(0, i)}
      <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">{part}</em>
      {title.slice(i + part.length)}
    </>
  )
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-[30px] bg-slate-900 p-[3px] shadow-[0_30px_80px_-30px_rgb(15_23_42/0.55)] ring-1 ring-white/15">
      <div className="relative aspect-[584/1266] overflow-hidden rounded-[27px]">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 300px, 45vw" className="object-cover" />
      </div>
    </div>
  )
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  const jsonLd = jsonLdGraph(
    breadcrumbJsonLd([
      { name: "Progetti", path: "/progetti" },
      { name: cs.client, path: `/progetti/${cs.slug}` },
    ])
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />

      <article className="pt-20">
        {/* HERO: testo a sinistra, il sito a destra */}
        <section className="px-5 pt-12 md:px-8 md:pt-16 xl:px-10">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Percorso" className="hero-in text-sm text-slate-500 dark:text-white/50">
              <Link href="/progetti" className="hover:text-[#047cf9]">
                Progetti
              </Link>
              <i aria-hidden className="mx-2 not-italic">/</i>
              <b className="font-normal text-slate-900 dark:text-white">{cs.client}</b>
            </nav>

            <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              <div className="hero-in">
                <Eyebrow>{cs.hero.eyebrow}</Eyebrow>
                <h1
                  className="mt-5 text-[clamp(2rem,2.9vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-slate-950 dark:text-white"
                  style={archivo}
                >
                  {gradientTitle(cs.hero.title, cs.hero.gradient)}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-black/65 dark:text-white/70">{cs.hero.intro}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#contatti"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 font-bold !text-white dark:bg-white dark:!text-slate-950"
                  >
                    Voglio un sito così
                  </a>
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-7 py-4 font-bold text-slate-950 hover:border-[#047cf9] hover:text-[#047cf9] dark:border-white/20 dark:text-white"
                  >
                    Visita il sito ↗<b className="sr-only">(si apre in una nuova scheda)</b>
                  </a>
                </div>
              </div>

              {/* il sito: desktop con lo smartphone sovrapposto */}
              <div className="hero-in relative pb-10 lg:pb-14">
                <BrowserFrame src={cs.hero.image} alt={`La home di ${cs.client}`} priority />
                {cs.gallery.mobile[0] && (
                  <div className="absolute -bottom-2 right-3 w-[27%] min-w-[110px] rotate-[4deg] md:right-6">
                    <Phone src={cs.gallery.mobile[0].src} alt={cs.gallery.mobile[0].alt} />
                  </div>
                )}
              </div>
            </div>

            {/* scheda progetto */}
            <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-3">
              {[
                ["Cliente", cs.client],
                ["Settore", cs.sector],
                ["Servizi", cs.services.join(" · ")],
              ].map(([k, v]) => (
                <div key={k} className="bg-white p-6 dark:bg-[#0b1220]">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-white/50">{k}</dt>
                  <dd className="mt-2 leading-7 text-slate-950 dark:text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* LA SFIDA */}
        <section className="px-5 pt-24 md:px-8 md:pt-36 xl:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow>La sfida</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-slate-950 dark:text-white" style={archivo}>
                {cs.challenge.title}
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-black/70 dark:text-white/70">
              {cs.challenge.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {cs.challenge.photo && (
            <figure className="mx-auto mt-14 max-w-7xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] md:aspect-[21/9]">
                <Image src={cs.challenge.photo.src} alt={cs.challenge.photo.alt} fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover object-[50%_35%]" />
              </div>
              {cs.challenge.photo.caption && (
                <figcaption className="mt-3 text-sm text-slate-500 dark:text-white/50">{cs.challenge.photo.caption}</figcaption>
              )}
            </figure>
          )}

          {cs.challenge.lines && (
            <ul className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-3">
              {cs.challenge.lines.map((l, i) => (
                <li key={l.name} className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="font-mono text-xs text-slate-400 dark:text-white/40">0{i + 1}</p>
                  <h3 className="mt-4 text-2xl tracking-[-0.01em] text-slate-950 dark:text-white" style={archivo}>
                    {l.name}
                  </h3>
                  <p className="mt-3 leading-7 text-black/65 dark:text-white/65">{l.text}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mx-auto mt-14 max-w-7xl rounded-3xl bg-slate-950 p-8 text-white dark:bg-white/[0.04] md:p-12">
            <Eyebrow>Gli obiettivi</Eyebrow>
            <ul className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {cs.goals.map((g) => (
                <li key={g} className="flex items-start gap-3 text-lg leading-7 !text-white/90">
                  <i aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-gradient" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* LE OPERE DEL CLIENTE */}
        {cs.artworks && (
          <section className="px-5 pt-24 md:px-8 md:pt-36 xl:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
                <h2 className="text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-slate-950 dark:text-white" style={archivo}>
                  {cs.artworks.title}
                </h2>
                <p className="text-lg leading-8 text-black/65 dark:text-white/70">{cs.artworks.intro}</p>
              </div>
              <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
                {cs.artworks.images.map((img, i) => (
                  <li key={img.src} className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${i % 2 ? "lg:translate-y-8" : ""}`}>
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* LE SCELTE CRO */}
        <section className="px-5 pt-24 md:px-8 md:pt-36 xl:px-10">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>Conversion Rate Optimization</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-slate-950 dark:text-white" style={archivo}>
              {cs.cro.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/70">{cs.cro.intro}</p>

            <div className="mt-12">
              <BrowserFrame src={cs.cro.image} alt={`La hero di ${cs.client} con i punti CRO numerati`}>
                {cs.cro.points.map((pt, i) => (
                  <i
                    key={pt.title}
                    aria-hidden
                    className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-gradient font-mono text-xs font-bold not-italic !text-white shadow-[0_0_0_4px_rgb(255_255_255/0.85),0_10px_30px_-6px_rgb(168_60_214/0.9)] md:size-9 md:text-sm"
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                  >
                    {i + 1}
                  </i>
                ))}
              </BrowserFrame>
            </div>

            <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {cs.cro.points.map((pt, i) => (
                <li key={pt.title} className="border-t border-slate-200 pt-6 dark:border-white/10">
                  <i aria-hidden className="grid size-8 place-items-center rounded-full bg-brand-gradient font-mono text-sm font-bold not-italic !text-white">
                    {i + 1}
                  </i>
                  <h3 className="mt-4 text-xl tracking-[-0.01em] text-slate-950 dark:text-white" style={archivo}>
                    {pt.title}
                  </h3>
                  <p className="mt-2 leading-7 text-black/65 dark:text-white/65">{pt.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* COSA ABBIAMO FATTO */}
        <section className="px-5 pt-24 md:px-8 md:pt-36 xl:px-10">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>Cosa abbiamo fatto</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-slate-950 dark:text-white" style={archivo}>
              Dalla strategia al sito online
            </h2>
            <ol className="mt-12 divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
              {cs.approach.map((a, i) => (
                <li key={a.title} className="grid gap-3 py-8 md:grid-cols-[80px_0.8fr_1.2fr] md:gap-10">
                  <p className="text-4xl tracking-[-0.04em] text-slate-300 dark:text-white/20" style={archivo}>
                    0{i + 1}
                  </p>
                  <h3 className="text-2xl tracking-[-0.01em] text-slate-950 dark:text-white" style={archivo}>
                    {a.title}
                  </h3>
                  <p className="text-lg leading-8 text-black/65 dark:text-white/65">{a.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* GALLERIA */}
        <section className="px-5 pt-24 md:px-8 md:pt-36 xl:px-10">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>Il sito</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-slate-950 dark:text-white" style={archivo}>
              Su desktop e su smartphone
            </h2>
            <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
              {cs.gallery.desktop.map((g) => (
                <BrowserFrame key={g.src} src={g.src} alt={g.alt} />
              ))}
              <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4 lg:max-w-none">
                {cs.gallery.mobile.map((g, i) => (
                  <div key={g.src} className={i % 2 ? "translate-y-10" : ""}>
                    <Phone src={g.src} alt={g.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RISULTATI */}
        <section className="px-5 pb-24 pt-32 md:px-8 md:pb-36 md:pt-44 xl:px-10">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>Risultati</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-slate-950 dark:text-white" style={archivo}>
              {cs.results.title}
            </h2>
            <p className="mt-4 text-lg text-black/60 dark:text-white/60">{cs.results.intro}</p>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {cs.results.items.map((r) => (
                <li key={r.title} className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
                  <h3 className="text-2xl tracking-[-0.01em] text-slate-950 dark:text-white" style={archivo}>
                    {r.title}
                  </h3>
                  <p className="mt-3 leading-7 text-black/65 dark:text-white/65">{r.text}</p>
                </li>
              ))}
            </ul>

            {cs.testimonial && (
              <figure className="mt-16 rounded-[32px] bg-slate-950 p-8 dark:bg-white/[0.04] md:p-14">
                <p aria-hidden className="text-5xl leading-none !text-white/30" style={archivo}>
                  “
                </p>
                <blockquote className="mt-2 max-w-4xl text-xl leading-9 !text-white md:text-2xl md:leading-10">
                  {cs.testimonial.quote}
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-bold !text-white">{cs.testimonial.author}</p>
                  <p className="!text-white/60">{cs.testimonial.role}</p>
                </figcaption>
              </figure>
            )}

            <div className="mt-16 flex flex-wrap items-center gap-4">
              <a
                href="#contatti"
                className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-8 py-4 font-bold !text-white shadow-xl"
              >
                Voglio un sito così
              </a>
              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-7 py-4 font-bold text-slate-950 hover:border-[#047cf9] hover:text-[#047cf9] dark:border-white/20 dark:text-white"
              >
                Visita il sito ↗<b className="sr-only">(si apre in una nuova scheda)</b>
              </a>
              <Link href="/progetti" className="ml-auto font-bold text-slate-500 hover:text-[#047cf9] dark:text-white/60">
                ← Tutti i progetti
              </Link>
            </div>
          </div>
        </section>

        <ContactSection />
      </article>
    </>
  )
}
