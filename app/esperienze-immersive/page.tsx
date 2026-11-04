import Image from "next/image"
import Link from "next/link"
import HeroSequence from "@/components/Immersive/HeroSequence"
import Manifesto from "@/components/Immersive/Manifesto"
import DemoGrid from "@/components/Immersive/DemoGrid"
import MedusaCompanion from "@/components/Immersive/MedusaCompanion"
import StickyCta from "@/components/Immersive/StickyCta"
import ImmersiveFooter from "@/components/Immersive/ImmersiveFooter"
import MarineSnow from "@/components/Immersive/MarineSnow"
import { WhatsAppButton } from "@/components/Immersive/whatsapp"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd, jsonLdGraph, pageMetadata } from "@/lib/seo"

const description =
  "Siti web ed e-commerce in 3D, cinematografici e interattivi. Esperienze digitali immersive che fanno percepire il tuo brand come premium, senza rinunciare a velocità e conversioni."

export const metadata = pageMetadata({
  title: "Esperienze immersive: siti ed e-commerce in 3D",
  description,
  path: "/esperienze-immersive",
})

const jsonLd = jsonLdGraph(breadcrumbJsonLd([{ name: "Esperienze immersive", path: "/esperienze-immersive" }]))

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 [font-family:var(--font-archivo),sans-serif] font-semibold text-[11px] uppercase tracking-[0.3em] !text-white/50 md:text-xs">{children}</p>
  )
}

const forms = [
  {
    title: "Siti web immersivi",
    lead: "Per chi presenta un servizio, uno studio, un locale, un'azienda.",
    points: [
      "Hero cinematografiche e scene in 3D",
      "Racconto che si sviluppa con lo scroll",
      "Contatti e prenotazioni sempre a un tocco",
    ],
  },
  {
    title: "E-commerce immersivi",
    lead: "Per chi vende un prodotto e vuole che si desideri prima ancora di leggerne il prezzo.",
    points: [
      "Prodotti da esplorare, non solo da guardare",
      "Schede prodotto che raccontano",
      "Carrello e checkout veloci, senza effetti in mezzo",
    ],
  },
]

const proof = [
  {
    title: "Veloce anche da smartphone",
    text: "La pagina si mostra subito e l'esperienza si carica a strati: niente schermate di attesa.",
  },
  {
    title: "Pensata per vendere",
    text: "L'effetto attira l'attenzione, poi la guida verso il contatto o l'acquisto. Le CTA restano sempre in vista.",
  },
  {
    title: "Trovabile su Google",
    text: "Testi veri in pagina e struttura SEO: il 3D si aggiunge ai contenuti, non li sostituisce.",
  },
  {
    title: "Per tutti",
    text: "Chi preferisce meno movimento vede una versione calma, con gli stessi contenuti.",
  },
]

const steps = [
  {
    title: "Scrivici su WhatsApp",
    text: "Raccontaci il tuo brand e cosa vorresti far provare a chi visita il sito. Ti rispondiamo entro 24 ore.",
  },
  {
    title: "Concept e scena",
    text: "Ti proponiamo la direzione visiva e l'elemento protagonista prima di sviluppare: vedi l'idea, poi decidi.",
  },
  {
    title: "Sviluppo e lancio",
    text: "Costruiamo sito o e-commerce, lo testiamo su ogni dispositivo e lo mettiamo online, pronto per le campagne.",
  },
]

export default function EsperienzeImmersivePage() {
  return (
    <div className="relative isolate bg-[#05040a] !text-white" style={{ fontFamily: "var(--font-lato), sans-serif" }}>
      <JsonLd data={jsonLd} />

      {/* header minimale: logo e contatto, niente menu */}
      <div className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-[#05040a] via-[#05040a]/85 to-transparent pb-4">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:h-20 md:px-8 xl:px-10">
          <Link href="/" aria-label="Convernext, torna alla home">
            <Image
              src="/logo-convernext.svg"
              alt="Convernext"
              width={1010}
              height={106}
              preload
              className="h-auto w-[104px] md:w-[124px]"
            />
          </Link>
          <WhatsAppButton
            size="sm"
            label={
              <>
                <em className="not-italic sm:hidden">Scrivici</em>
                <em className="hidden not-italic sm:inline">Parliamo del tuo progetto</em>
              </>
            }
          />
        </div>
      </div>

      <HeroSequence />

      <Manifesto />

      {/* sito o e-commerce: stessa esperienza */}
      <section data-medusa="left" className="relative px-5 py-28 md:px-8 md:py-40 xl:px-10">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Per ogni brand</Eyebrow>
          <h2
            className="max-w-4xl text-[clamp(2.2rem,5vw,4.6rem)] leading-[1.04] tracking-[-0.03em] !text-white"
            style={archivo}
          >
            Sito o e-commerce.{" "}
            <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">Stessa esperienza.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 !text-white/65">
            Non serve una nicchia particolare: serve un brand che vuole farsi ricordare. Ogni progetto ha il suo
            protagonista e la sua scena, costruiti su ciò che vendi.
          </p>

          <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-0">
            {forms.map((f, i) => (
              <div key={f.title} className={`md:px-12 ${i === 0 ? "md:border-r md:border-white/10 md:pl-0" : "md:pr-0"}`}>
                <p className="[font-family:var(--font-archivo),sans-serif] font-semibold text-xs !text-white/40">0{i + 1}</p>
                <h3 className="mt-3 text-3xl tracking-[-0.02em] !text-white md:text-4xl" style={archivo}>
                  {f.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-7 !text-white/60">{f.lead}</p>
                <ul className="mt-8 space-y-4">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-4 border-t border-white/10 pt-4 text-lg !text-white/85">
                      <i aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-gradient" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center md:mt-24">
            <WhatsAppButton label="Voglio il mio sito in 3D" />
          </div>
        </div>
      </section>

      <DemoGrid />

      {/* performance */}
      <section data-medusa="right" className="relative px-5 py-28 md:px-8 md:py-40 xl:px-10">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Non solo effetto</Eyebrow>
          <h2
            className="max-w-4xl text-[clamp(2.2rem,5vw,4.6rem)] leading-[1.04] tracking-[-0.03em] !text-white"
            style={archivo}
          >
            Esperienze straordinarie.{" "}
            <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">Performance concrete.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 !text-white/65">
            Un sito spettacolare che non si carica o non converte è solo un video costoso. Progettiamo l&apos;impatto
            visivo insieme a velocità, usabilità e obiettivi di vendita.
          </p>

          <div className="mt-16 grid overflow-hidden rounded-[28px] border border-white/10 md:mt-20 md:grid-cols-2">
            {proof.map((p) => (
              <div key={p.title} className="border-white/10 p-8 [&:not(:last-child)]:border-b md:p-12 md:[&:nth-child(odd)]:border-r md:[&:nth-child(-n+2)]:border-b md:[&:nth-child(n+3)]:border-b-0">
                <h3 className="text-2xl tracking-[-0.02em] !text-white md:text-3xl" style={archivo}>
                  {p.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-7 !text-white/60">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* come lavoriamo */}
      <section data-medusa="left" className="relative px-5 pb-28 md:px-8 md:pb-40 xl:px-10">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Come funziona</Eyebrow>
          <h2
            className="max-w-3xl text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.05] tracking-[-0.03em] !text-white"
            style={archivo}
          >
            Dall&apos;idea all&apos;esperienza, in tre passi.
          </h2>
          <ol className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-white/15 pt-6">
                <p className="text-5xl tracking-[-0.04em] !text-white/20 md:text-6xl" style={archivo}>
                  0{i + 1}
                </p>
                <h3 className="mt-6 text-2xl tracking-[-0.02em] !text-white" style={archivo}>
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-7 !text-white/60">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ImmersiveFooter />

      <MarineSnow />
      <MedusaCompanion />
      <StickyCta />
    </div>
  )
}
