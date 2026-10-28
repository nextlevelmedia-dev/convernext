export type Project = {
  slug: string
  name: string
  tags: string[]
  description?: string
  url?: string
  // dominio mostrato nella barra della card, se diverso dal link
  displayUrl?: string
  // vuoto finché non c'è l'anteprima: il progetto non viene mostrato
  preview: string
}

export const featuredProjects: Project[] = [
  {
    slug: "lumache-di-campagna",
    name: "Lumache di Campagna",
    tags: ["E-commerce", "Custom development", "SEO"],
    description:
      "Sito e shop per un'azienda che produce prodotti in vasetto e cosmetici a base di lumaca.",
    url: "https://www.lumachedicampagna.it/",
    preview: "/media/work/lumache-di-campagna.webp",
  },
  {
    slug: "martinails-lab",
    name: "Martinails Lab",
    tags: ["Sito web", "Prenotazioni", "SEO locale"],
    description:
      "Sito per uno studio di nail art, con la galleria dei lavori e richieste di appuntamento semplici.",
    url: "https://martinails-lab.com/",
    preview: "/media/work/martinails-lab.webp",
  },
  {
    slug: "davide-rizzi",
    name: "Davide Rizzi",
    tags: ["Sito web", "Personal brand", "Lead generation"],
    description:
      "Sito personale per un consulente vendite, pensato per presentare i servizi e portare appuntamenti qualificati.",
    url: "https://davide-rizzi.vercel.app/",
    displayUrl: "daviderizzi.it",
    preview: "/media/work/davide-rizzi.webp",
  },
  {
    slug: "need-jpg",
    name: "Need Jpg",
    tags: ["E-commerce", "Custom development", "ADV"],
    description:
      "Store online streetwear con UX studiata per la conversione e flusso d'acquisto rapido.",
    url: "https://needjpg.com/",
    preview: "/media/work/need-jpg.webp",
  },
  {
    slug: "spazio-dance-on",
    name: "Spazio Dance On",
    tags: ["Sito web", "Custom development", "SEO"],
    description:
      "Sito web per scuola di danza e studio Pilates a Rho. Include presentazione corsi, team insegnanti e SEO locale.",
    url: "https://www.spaziodanceon.it/",
    preview: "/media/work/dance-on.webp",
  },
  {
    slug: "snakes-milano",
    name: "Snakes Milano",
    tags: ["Landing", "Custom development", "Donazioni"],
    description:
      "Sito web per squadra di Powerchair Football con sistema di donazioni e struttura pensata per supportare il progetto sportivo.",
    url: "https://www.snakesmilano.it/",
    preview: "/media/work/snakes-milano.webp",
  },
  {
    slug: "effemme-exclusive-lab",
    name: "Effemme Exclusive Lab",
    tags: ["E-commerce", "Custom development", "ADV"],
    description:
      "Store online streetwear con UX studiata per la conversione e flusso d'acquisto rapido.",
    url: "https://effemmeexclusivelab.com/",
    preview: "/media/work/effemme-exclusive-lab.webp",
  },
  {
    slug: "barlafus-cafe",
    name: "Barlafùs Cafè",
    tags: ["Sito web", "Custom development"],
    description:
      "Sito web per bar con menu digitale, presentazione dell'offerta e struttura ottimizzata per attrarre clienti locali.",
    url: "https://www.barlafuscafe.it/",
    preview: "/media/work/barlafus-cafe.webp",
  },
  {
    slug: "vitera-group",
    name: "Vitera Group",
    tags: ["Sito web", "Custom development", "SEO"],
    description:
      "Sito professionale per realizzatori di stand, con struttura SEO e presentazione servizi.",
    url: "https://www.viteragroup.com/",
    preview: "/media/work/vitera-group.webp",
  },
  {
    slug: "davide-fratta",
    name: "Davide Fratta",
    tags: ["Landing page", "Custom development"],
    description:
      "Landing page elegante e professionale pensata per massimizzare i contatti.",
    url: "https://www.davidefratta.it/",
    preview: "/media/work/davide-fratta.webp",
  },
  {
    slug: "samgroup",
    name: "Samgroup",
    tags: ["Sito web", "Portfolio"],
    description: "Sito professionale per geometra, layout pulito e struttura SEO.",
    url: "https://www.samgroup.it/",
    preview: "/media/work/samgroup-srl.webp",
  },
  {
    slug: "delta-antinfortunistica",
    name: "Delta Antinfortunistica",
    tags: ["Landing page", "Custom development"],
    description: "Landing per promuovere catalogo di dpi antinfortunistici.",
    url: "https://www.antinfortunisticadelta.it/",
    preview: "/media/work/delta-antinfortunistica.webp",
  },
  {
    slug: "shout-it",
    name: "Shout It",
    tags: ["E-commerce", "Shopify", "Brand"],
    description:
      "Store online per un brand di felpe dalle grafiche particolari, con schede prodotto che raccontano ogni capo.",
    url: "https://shoutit.it/",
    preview: "/media/work/shout-it.webp",
  },
  {
    slug: "dimensione-animale-rho",
    name: "Dimensione Animale Rho",
    tags: ["Sito web", "Donazioni"],
    description:
      "Sito di raccolta fondi per canile con sistema donazioni e sensibilizzazione.",
    url: "https://www.dimensioneanimalerho.org/",
    preview: "/media/work/animali-rho.webp",
  },
]
