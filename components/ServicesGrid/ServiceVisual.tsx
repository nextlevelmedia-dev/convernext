import Image from "next/image"

/*
 * Grafiche dei servizi in home: schermate vere dei nostri progetti dentro
 * finestre del browser (e smartphone), scelte in base alla pagina del servizio.
 * Solo immagini ottimizzate: niente video o animazioni pesanti.
 */

function Browser({ src, alt, ratio, position = "top" }: { src: string; alt: string; ratio: string; position?: string }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-[0_18px_40px_-18px_rgb(15_23_42/0.35)] dark:border-white/10 dark:bg-[#14161c] dark:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-1 px-2.5 py-1.5">
        <i className="size-1.5 rounded-full bg-[#ff5f57]" />
        <i className="size-1.5 rounded-full bg-[#febc2e]" />
        <i className="size-1.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="relative" style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 380px, 80vw" className="object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  )
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-[14px] bg-[#0b0c10] p-[2px] shadow-[0_16px_30px_-12px_rgb(0_0_0/0.6)] ring-1 ring-white/15">
      <div className="relative aspect-[584/1266] overflow-hidden rounded-[12px]">
        <Image src={src} alt={alt} fill sizes="90px" className="object-cover object-top" />
      </div>
    </div>
  )
}

export default function ServiceVisual({ href }: { href: string }) {
  switch (href) {
    case "/ecommerce":
      return (
        <div className="w-[86%]">
          <Browser src="/media/visuals/temi/tcg-hero.webp" alt="E-commerce Pullroom" ratio="1000 / 601" />
        </div>
      )
    case "/siti-web":
      return (
        <div className="relative w-[86%] pb-[6%] pr-[8%]">
          <Browser src="/media/case-studies/lumache-di-campagna/desktop-hero.webp" alt="Sito Lumache di Campagna" ratio="1396 / 868" />
          <div className="absolute bottom-0 right-0 w-[22%]">
            <Phone src="/media/case-studies/lumache-di-campagna/mobile-hero.webp" alt="Sito Lumache di Campagna su smartphone" />
          </div>
        </div>
      )
    case "/ottimizzazione-conversioni":
      // prima/dopo della stessa landing, affiancati
      return (
        <div className="flex h-full items-center gap-3 py-4">
          {[
            ["/before-after/lp-before.webp", "Prima", "bg-slate-500"],
            ["/before-after/lp-after.webp", "Dopo", "bg-brand-gradient"],
          ].map(([src, label, badge]) => (
            <div key={label} className="relative h-full">
              <div className="relative h-full overflow-hidden rounded-[10px] border border-slate-200 shadow-[0_14px_30px_-16px_rgb(15_23_42/0.4)] dark:border-white/10" style={{ aspectRatio: "585 / 1140" }}>
                <Image src={src} alt={`Landing page ${label.toLowerCase()} l'ottimizzazione`} fill sizes="140px" className="object-cover object-top" />
              </div>
              <b className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[10px] font-bold !text-white ${badge}`}>{label}</b>
            </div>
          ))}
        </div>
      )
    case "/temi-shopify":
      return (
        <div className="w-[90%]">
          <Browser src="/media/visuals/temi/street-hero.webp" alt="Tema Shopify VÆRK" ratio="1000 / 603" />
        </div>
      )
    case "/esperienze-immersive":
      return (
        <div className="w-[90%]">
          <Browser src="/media/visuals/temi/gioielli-hero.webp" alt="Esperienza immersiva Aurelle" ratio="1000 / 625" />
        </div>
      )
    default:
      return null
  }
}
