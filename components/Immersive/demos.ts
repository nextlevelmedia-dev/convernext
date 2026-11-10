export type Demo = {
  slug: string
  name: string
  kind: string
  description: string
  url: string
  image: string
}

// demo online realizzate da Convernext (screenshot in public/immersive/demo)
export const demos: Demo[] = [
  {
    slug: "aurelle",
    name: "Aurelle",
    kind: "Sito web",
    description: "Una maison di gioielli in cui si entra: anelli su misura, da vedere in 3D prima di sceglierli.",
    url: "https://aurelle-jewelry-two.vercel.app",
    image: "/immersive/demo/aurelle.webp",
  },
  {
    slug: "iconic-football",
    name: "Iconic Football",
    kind: "E-commerce",
    description: "Un corridoio in 3D tra le maglie che hanno fatto la storia, anno dopo anno.",
    url: "https://vintage-football-store.vercel.app",
    image: "/immersive/demo/iconic-football.webp",
  },
  {
    slug: "pullroom",
    name: "Pullroom",
    kind: "E-commerce",
    description: "Carte collezionabili sigillate e gradate, presentate come in una vetrina da sogno: ogni busta è una scoperta.",
    url: "https://tcg-immersive-store-demo.vercel.app",
    image: "/immersive/demo/pullstore.webp",
  },
  {
    slug: "dental-atelier",
    name: "Dental Atelier",
    kind: "Sito web",
    description: "Uno studio dentistico che si visita come un atelier: calma, luce e prenotazione sempre a portata di mano.",
    url: "https://dental-atelier-eight.vercel.app",
    image: "/immersive/demo/dental-atelier.webp",
  },
  {
    slug: "vaerk",
    name: "VÆRK",
    kind: "E-commerce",
    description: "Uno stender in 3D con i capi streetwear appesi: si girano con un tocco e si guardano da vicino prima di sceglierli.",
    url: "https://vaerk-studio.vercel.app",
    image: "/immersive/demo/vaerk-rail.webp",
  },
  {
    slug: "velatura",
    name: "Velatura",
    kind: "Sito web",
    description: "Un atelier di detailing in cui l'auto emerge dal buio, riflesso dopo riflesso, mentre scorri.",
    url: "https://velatura-livid.vercel.app",
    image: "/immersive/demo/velatura-cover.webp",
  },
]
