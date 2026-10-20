export type Project = {
  slug: string
  name: string
  tags: string[]
  description?: string
  url?: string
  preview: string
}

export const featuredProjects: Project[] = [
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
    slug: "dimensione-animale-rho",
    name: "Dimensione Animale Rho",
    tags: ["Sito web", "Donazioni"],
    description:
      "Sito di raccolta fondi per canile con sistema donazioni e sensibilizzazione.",
    url: "https://www.dimensioneanimalerho.org/",
    preview: "/media/work/animali-rho.webp",
  },
]
