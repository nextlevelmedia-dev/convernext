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
    kind: "E-commerce",
    description: "Una maison di gioielli in cui si entra: anelli su misura, da vedere in 3D prima di sceglierli.",
    url: "https://aurelle-jewelry-two.vercel.app",
    image: "/immersive/demo/aurelle.webp",
  },
  {
    slug: "orvek",
    name: "Orvek",
    kind: "E-commerce",
    description: "Sneaker autenticate esposte come in una boutique: ogni paio ha la sua mensola.",
    url: "https://sneaker-store-sooty.vercel.app",
    image: "/immersive/demo/orvek.webp",
  },
  {
    slug: "iconic-football",
    name: "Iconic Football",
    kind: "E-commerce",
    description: "Un corridoio in 3D tra le maglie che hanno fatto la storia, anno dopo anno.",
    url: "https://vintage-football-store.vercel.app",
    image: "/immersive/demo/vintage-football-store.webp",
  },
  {
    slug: "pullroom",
    name: "Pullroom",
    kind: "E-commerce",
    description: "Lo store si apre con un clic, come una bustina: ogni visita diventa una scoperta.",
    url: "https://tcg-immersive-store.vercel.app",
    image: "/immersive/demo/tcg-immersive-store.webp",
  },
]
