import Link from "next/link"
import Header from "@/components/Header"
import ServicesGrid from "@/components/ServicesGrid/ServicesGrid"
import FaqSection from "@/components/FaqSection/FaqSection"
import ContactSection from "@/components/ContactSection/ContactSection"
import JsonLd from "@/components/JsonLd"
import { absoluteUrl, breadcrumbJsonLd, jsonLdGraph, organizationId, pageMetadata, site } from "@/lib/seo"

const description =
  "Tutte le soluzioni di Convernext: siti web su misura, e-commerce Shopify, temi Shopify personalizzati, ottimizzazione delle conversioni (CRO) ed esperienze immersive in 3D."

export const metadata = pageMetadata({
  title: "Soluzioni e servizi: siti web, e-commerce Shopify e CRO",
  description,
  path: "/soluzioni",
})

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

const services = [
  {
    label: "E-commerce",
    title: "E-commerce Shopify",
    text: "Uno store progettato per vendere: pagine prodotto chiare, checkout veloce, ottimizzato per mobile.",
    cta: "Scopri gli e-commerce",
    href: "/ecommerce",
  },
  {
    label: "Siti web",
    title: "Siti web su misura",
    text: "Un sito chiaro, veloce e trovabile in zona, costruito per portarti contatti.",
    cta: "Scopri i siti web",
    href: "/siti-web",
  },
  {
    label: "CRO",
    title: "Ottimizzazione conversioni",
    text: "Più clienti dallo stesso traffico: troviamo cosa blocca le persone e lo sistemiamo, partendo dai dati.",
    cta: "Scopri la CRO",
    href: "/ottimizzazione-conversioni",
  },
  {
    label: "Temi Shopify",
    title: "Temi Shopify su misura",
    text: "Un tema costruito sulla tua nicchia, veloce e modulare, che gestisci in autonomia dall'editor con i nostri tutorial.",
    cta: "Scopri i temi Shopify",
    href: "/temi-shopify",
  },
  {
    label: "Esperienze immersive",
    title: "Esperienze immersive e 3D",
    text: "Siti ed e-commerce cinematografici e interattivi, per i brand che vogliono essere ricordati. Senza rinunciare a velocità e vendite.",
    cta: "Scopri le esperienze immersive",
    href: "/esperienze-immersive",
  },
]

// guida rapida: da dove partire in base alla situazione
const guide = [
  { need: "Hai un'attività e vuoi più richieste di contatto", answer: "Siti web su misura", href: "/siti-web" },
  { need: "Vuoi vendere online o rifare il tuo store", answer: "E-commerce Shopify", href: "/ecommerce" },
  { need: "Hai già Shopify e vuoi un tema che ti rappresenti", answer: "Temi Shopify su misura", href: "/temi-shopify" },
  { need: "Hai traffico ma le vendite o i contatti non arrivano", answer: "Ottimizzazione conversioni", href: "/ottimizzazione-conversioni" },
  { need: "Vuoi che il tuo brand venga percepito come premium", answer: "Esperienze immersive", href: "/esperienze-immersive" },
]

const faq = [
  {
    question: "Da quale servizio conviene partire?",
    answer:
      "Dipende da dove sei oggi. Se non hai ancora un sito o uno store partiamo dalla progettazione; se ce l'hai già e hai traffico, spesso conviene prima capire cosa blocca le conversioni. Nella prima chiamata analizziamo la tua situazione e ti diciamo cosa ha senso fare, anche se è meno di quello che pensavi.",
  },
  {
    question: "Posso combinare più servizi?",
    answer:
      "Sì, ed è il caso più comune: per esempio un e-commerce Shopify con un tema su misura, oppure un sito nuovo seguito da un percorso di ottimizzazione delle conversioni. Hai sempre un unico referente che coordina tutto.",
  },
  {
    question: "Le esperienze immersive vanno bene per ogni progetto?",
    answer:
      "No. Il 3D e le animazioni cinematografiche hanno senso quando il brand vuole distinguersi e il prodotto si presta a essere raccontato. Valutiamo caso per caso e, se non serve, te lo diciamo.",
  },
  {
    question: "Lavorate solo con Shopify?",
    answer:
      "Per gli e-commerce lavoriamo principalmente con Shopify, perché è affidabile e semplice da gestire. Siti web ed esperienze immersive li sviluppiamo su misura, senza template.",
  },
]

const jsonLd = jsonLdGraph(
  breadcrumbJsonLd([{ name: "Soluzioni e servizi", path: "/soluzioni" }]),
  {
    "@type": "CollectionPage",
    "@id": `${site.url}/soluzioni#webpage`,
    url: absoluteUrl("/soluzioni"),
    name: "Soluzioni e servizi — Convernext",
    description,
    inLanguage: "it-IT",
    about: { "@id": organizationId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: absoluteUrl(s.href),
      })),
    },
  },
  {
    "@type": "FAQPage",
    "@id": `${site.url}/soluzioni#faq`,
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
)

export default function SoluzioniPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />

      <div>
        {/* HERO */}
        <section className="relative px-6 pb-4 pt-32 md:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-white/50">
              Soluzioni e servizi
            </p>
            <h1
              className="text-[clamp(2.3rem,1.3rem+3.6vw,4rem)] leading-[1.08] tracking-[-0.03em] text-slate-950 dark:text-white"
              style={archivo}
            >
              Siti web, e-commerce Shopify e CRO:{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">la soluzione giusta per te.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-white/70">
              Siti web, e-commerce Shopify, temi su misura, ottimizzazione delle conversioni ed esperienze immersive.
              Ogni progetto parte dall&apos;analisi del tuo business e dei tuoi clienti, e lo segui con un unico referente.
            </p>
          </div>
        </section>

        {/* TUTTI I SERVIZI */}
        <ServicesGrid services={services} wide ctaText="" />

        {/* DA DOVE PARTIRE */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-10 text-center text-3xl leading-tight tracking-tight text-slate-950 md:text-4xl dark:text-white"
              style={archivo}
            >
              <span className="bg-brand-gradient bg-clip-text text-transparent">Non sai da dove partire?</span> Ecco una guida rapida.
            </h2>
            <ul className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
              {guide.map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="group flex flex-col gap-1 px-6 py-5 transition-colors hover:bg-slate-50 md:flex-row md:items-center md:justify-between md:gap-6 dark:hover:bg-white/[0.04]"
                  >
                    <span className="text-base text-slate-600 dark:text-white/70">{g.need}</span>
                    <span className="flex shrink-0 items-center gap-2 font-bold text-slate-950 dark:text-white">
                      {g.answer}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection titleHighlight="Domande" titleNormal="frequenti" items={faq} />

        {/* CONTATTI */}
        <ContactSection />
      </div>
    </>
  )
}
