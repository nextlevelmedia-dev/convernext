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
    slug: "houseofstreetstyle",
    name: "House of Streetstyle",
    kind: "E-commerce",
    description: "Sneaker custom dipinte a mano, presentate come pezzi unici: il prodotto è il protagonista.",
    url: "https://houseofstreetstyle-redesign.vercel.app",
    image: "/immersive/demo/houseofstreetstyle-redesign.webp",
  },
  {
    slug: "iconic-football",
    name: "Iconic Football",
    kind: "E-commerce",
    description: "Le maglie che hanno fatto la storia, sotto i riflettori come in uno spogliatoio.",
    url: "https://vintage-football-store.vercel.app",
    image: "/immersive/demo/vintage-football-store.webp",
  },
  {
    slug: "club-cosmetico",
    name: "Club Cosmetico",
    kind: "E-commerce",
    description: "Cosmesi clinica e botanica, con un oggetto 3D che accompagna il racconto del brand.",
    url: "https://club-cosmetico-demo.vercel.app",
    image: "/immersive/demo/club-cosmetico-demo.webp",
  },
  {
    slug: "forme-cremona",
    name: "For Me Cremona",
    kind: "Sito web",
    description: "Una boutique di moda che diventa un editoriale: atmosfera da rivista e negozio sempre a un passo.",
    url: "https://forme-cremona.vercel.app",
    image: "/immersive/demo/forme-cremona.webp",
  },
  {
    slug: "e-cycles",
    name: "E-Cycles",
    kind: "Sito web",
    description: "E-bike, test ride e officina: tre sedi raccontate in un'unica esperienza.",
    url: "https://ecycles-redesign.vercel.app",
    image: "/immersive/demo/ecycles-redesign.webp",
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
