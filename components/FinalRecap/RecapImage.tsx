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
    alt: "Ecommerce Shopify: negozio online, checkout da mobile e notifica di un nuovo ordine",
    ratio: "1217 / 818",
    layers: [
      { src: "/recap/ecommerce-0.webp", width: 1165, height: 832, left: 0.7, top: 8.37, size: 76.58, from: "center" },
      { src: "/recap/ecommerce-1.webp", width: 479, height: 869, left: 68.49, top: 14.17, size: 31.51, from: "right" },
      { src: "/recap/ecommerce-2.webp", width: 409, height: 153, left: 51.44, top: 0.0, size: 26.91, from: "top" },
      { src: "/recap/ecommerce-3.webp", width: 411, height: 290, left: 0.0, top: 64.81, size: 27.03, from: "left" },
      { src: "/recap/ecommerce-4.webp", width: 425, height: 179, left: 27.9, top: 82.53, size: 27.94, from: "bottom" },
    ],
  },
  "siti-web": {
    alt: "Sito web aziendale su desktop e mobile, con punteggi di qualità, risultato su Google e richiesta di contatto",
    ratio: "1237 / 900",
    layers: [
      { src: "/recap/siti-web-0.webp", width: 1152, height: 807, left: 5.38, top: 9.78, size: 74.54, from: "center" },
      { src: "/recap/siti-web-1.webp", width: 418, height: 745, left: 0.0, top: 33.78, size: 27.04, from: "left" },
      { src: "/recap/siti-web-2.webp", width: 481, height: 242, left: 68.71, top: 4.44, size: 31.12, from: "top" },
      { src: "/recap/siti-web-3.webp", width: 571, height: 248, left: 24.17, top: 0.0, size: 36.94, from: "top" },
      { src: "/recap/siti-web-4.webp", width: 424, height: 439, left: 72.59, top: 31.11, size: 27.41, from: "right" },
      { src: "/recap/siti-web-5.webp", width: 397, height: 153, left: 51.25, top: 75.5, size: 25.67, from: "bottom" },
      { src: "/recap/siti-web-6.webp", width: 385, height: 153, left: 25.34, top: 77.72, size: 24.9, from: "bottom" },
    ],
  },
  cro: {
    alt: "Dashboard di un test A/B con variante vincente, mappa dei clic e metodo di ottimizzazione",
    ratio: "1213 / 868",
    layers: [
      { src: "/recap/cro-0.webp", width: 1152, height: 832, left: 10.59, top: 10.14, size: 76.01, from: "center" },
      { src: "/recap/cro-1.webp", width: 434, height: 198, left: 71.39, top: 2.3, size: 28.61, from: "top" },
      { src: "/recap/cro-2.webp", width: 399, height: 336, left: 0.0, top: 50.69, size: 26.3, from: "left" },
      { src: "/recap/cro-3.webp", width: 324, height: 288, left: 1.65, top: 0.0, size: 21.35, from: "top" },
      { src: "/recap/cro-4.webp", width: 434, height: 153, left: 59.03, top: 81.16, size: 28.61, from: "bottom" },
      { src: "/recap/cro-5.webp", width: 475, height: 204, left: 26.75, top: 81.22, size: 31.33, from: "bottom" },
    ],
  },
  "temi-shopify": {
    alt: "Editor del tema Shopify con sezioni personalizzabili e anteprima su mobile",
    ratio: "1240 / 842",
    layers: [
      { src: "/recap/temi-shopify-0.webp", width: 1252, height: 857, left: 0.0, top: 8.14, size: 80.84, from: "center" },
      { src: "/recap/temi-shopify-1.webp", width: 433, height: 770, left: 72.05, top: 25.61, size: 27.95, from: "right" },
      { src: "/recap/temi-shopify-2.webp", width: 422, height: 153, left: 46.59, top: 0.0, size: 27.23, from: "top" },
      { src: "/recap/temi-shopify-3.webp", width: 409, height: 153, left: 11.09, top: 83.18, size: 26.42, from: "bottom" },
      { src: "/recap/temi-shopify-4.webp", width: 422, height: 177, left: 38.08, top: 83.18, size: 27.27, from: "bottom" },
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
