"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type From = "center" | "left" | "right" | "top" | "bottom"

type Layer = {
  src: string
  width: number
  height: number
  // posizione e larghezza in % della composizione
  left: number
  top: number
  size: number
  from: From
}

/*
 * Composizioni di recap dei servizi, scomposte a livelli (public/recap).
 * Il primo livello è la finestra principale: entra per prima, poi le card in sequenza.
 */
const RECAPS = {
  ecommerce: {
    alt: "E-commerce Orvek su desktop e smartphone, con nuovo ordine, checkout semplificato e spedizione gratuita",
    ratio: "1240 / 900",
    layers: [
      { src: "/recap/ecommerce-orvek-desktop.webp", width: 1252, height: 798, left: 0.0, top: 9.5, size: 80.0, from: "center" },
      { src: "/recap/ecommerce-orvek-mobile.webp", width: 433, height: 908, left: 73.0, top: 18.0, size: 27.0, from: "right" },
      { src: "/recap/ecommerce-2.webp", width: 409, height: 153, left: 46.0, top: 0.0, size: 27.0, from: "top" },
      { src: "/recap/ecommerce-3.webp", width: 411, height: 290, left: 0.0, top: 50.0, size: 24.0, from: "left" },
      { src: "/recap/ecommerce-4.webp", width: 425, height: 179, left: 36.0, top: 83.0, size: 28.0, from: "bottom" },
    ],
  },
  "siti-web": {
    alt: "Sito web Velatura su desktop e smartphone, con punteggi di qualità, risultato su Google e nuova richiesta",
    ratio: "1240 / 900",
    layers: [
      { src: "/recap/sitiweb-velatura-desktop.webp", width: 1252, height: 798, left: 0.0, top: 9.5, size: 80.0, from: "center" },
      { src: "/recap/sitiweb-velatura-mobile.webp", width: 433, height: 908, left: 73.0, top: 18.0, size: 27.0, from: "right" },
      { src: "/recap/siti-web-2.webp", width: 481, height: 242, left: 42.0, top: 0.0, size: 30.0, from: "top" },
      { src: "/recap/siti-web-3.webp", width: 571, height: 248, left: 0.0, top: 52.0, size: 32.0, from: "left" },
      { src: "/recap/siti-web-5.webp", width: 397, height: 153, left: 38.0, top: 84.0, size: 27.0, from: "bottom" },
    ],
  },
  cro: {
    alt: "Sito Tornante su desktop e smartphone, con mappa dei clic, significatività statistica e più ordini dallo stesso traffico",
    ratio: "1240 / 900",
    layers: [
      { src: "/recap/cro-tornante-desktop.webp", width: 1252, height: 798, left: 0.0, top: 9.5, size: 80.0, from: "center" },
      { src: "/recap/cro-tornante-mobile.webp", width: 433, height: 908, left: 73.0, top: 18.0, size: 27.0, from: "right" },
      { src: "/recap/cro-1.webp", width: 434, height: 198, left: 44.0, top: 0.0, size: 28.0, from: "top" },
      { src: "/recap/cro-2.webp", width: 399, height: 336, left: 0.0, top: 46.0, size: 24.0, from: "left" },
      { src: "/recap/cro-5.webp", width: 475, height: 204, left: 34.0, top: 82.0, size: 30.0, from: "bottom" },
    ],
  },
  "temi-shopify": {
    alt: "Tema Shopify su misura per VÆRK, su desktop e su smartphone",
    ratio: "1240 / 900",
    layers: [
      { src: "/recap/temi-vaerk-desktop.webp", width: 1252, height: 798, left: 0.0, top: 9.5, size: 80.0, from: "center" },
      { src: "/recap/temi-vaerk-mobile.webp", width: 433, height: 908, left: 73.0, top: 18.0, size: 27.0, from: "right" },
      { src: "/recap/temi-shopify-2.webp", width: 422, height: 153, left: 46.59, top: 0.0, size: 27.23, from: "top" },
      { src: "/recap/temi-shopify-3.webp", width: 409, height: 153, left: 8.0, top: 84.0, size: 26.42, from: "bottom" },
      { src: "/recap/temi-shopify-4.webp", width: 422, height: 177, left: 36.0, top: 84.0, size: 27.27, from: "bottom" },
    ],
  },
} satisfies Record<string, { alt: string; ratio: string; layers: Layer[] }>

export type RecapVariant = keyof typeof RECAPS

const HIDDEN: Record<From, string> = {
  center: "translate-y-6 scale-95",
  left: "-translate-x-10",
  right: "translate-x-10",
  top: "-translate-y-8",
  bottom: "translate-y-8",
}

const FIRST_DELAY = 550
const STEP = 140

export default function RecapImage({ variant }: { variant: RecapVariant }) {
  const { alt, ratio, layers } = RECAPS[variant]
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} role="img" aria-label={alt} className="relative w-full xl:w-[110%]" style={{ aspectRatio: ratio }}>
      {layers.map((layer, i) => (
        <div
          key={layer.src}
          aria-hidden
          className={`absolute transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `opacity-0 motion-reduce:translate-none motion-reduce:scale-100 motion-reduce:opacity-100 ${HIDDEN[layer.from]}`
          }`}
          style={{
            left: `${layer.left}%`,
            top: `${layer.top}%`,
            width: `${layer.size}%`,
            transitionDelay: visible && i > 0 ? `${FIRST_DELAY + (i - 1) * STEP}ms` : undefined,
          }}
        >
          <Image
            src={layer.src}
            alt=""
            width={layer.width}
            height={layer.height}
            sizes={`(min-width: 1280px) ${Math.round(layer.size * 6.2)}px, (min-width: 768px) ${Math.round(layer.size / 2)}vw, ${Math.round(layer.size)}vw`}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  )
}
