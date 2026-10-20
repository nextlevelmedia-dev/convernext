"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"
import "./LogoMarquee.css"

interface Logo {
  logo: { asset: { _ref: string } }
  alt: string
}

interface LogoMarqueeProps {
  logosRowOne?: Logo[] | null
  logosRowTwo?: Logo[] | null
}

function MarqueeRow({ logos, direction }: { logos: Logo[]; direction: "left" | "right" }) {
  const trackRef = useRef<HTMLDivElement>(null)

  // Animazione CSS (compositor) invece di requestAnimationFrame:
  // stessa velocità di prima (0.4px/frame mobile, 0.8px/frame desktop a 60fps)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const update = () => {
      const isMobile = window.innerWidth < 768
      const pxPerSecond = (isMobile ? 0.4 : 0.8) * 60
      const half = track.scrollWidth / 2
      if (!half) return
      track.style.animationDuration = `${half / pxPerSecond}s`
      track.style.animationName = direction === "left" ? "logo-marquee-left" : "logo-marquee-right"
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [direction])

  return (
    <div className="relative flex overflow-hidden w-full marquee-fade">
      <div ref={trackRef} className="logo-marquee-track">
        {logos.map((item, i) => (
          <div key={`a-${i}`} className="flex shrink-0 items-center justify-center px-4 md:px-8">
            <Image
              src={urlFor(item.logo).width(240).height(120).url()}
              alt={item.alt || "Logo cliente"}
              width={240}
              height={120}
              className="h-10 md:h-20 w-auto object-contain block"
            />
          </div>
        ))}
        {logos.map((item, i) => (
          <div key={`b-${i}`} aria-hidden className="flex shrink-0 items-center justify-center px-4 md:px-8">
            <Image
              src={urlFor(item.logo).width(240).height(120).url()}
              alt=""
              width={240}
              height={120}
              className="h-10 md:h-20 w-auto object-contain block"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoMarquee({ logosRowOne, logosRowTwo }: LogoMarqueeProps) {
  const rowOne = logosRowOne ?? []
  const rowTwo = logosRowTwo ?? []

  if (!rowOne.length && !rowTwo.length) return null

  return (
    <section className="py-4 overflow-hidden">
      <div className="flex flex-col gap-6 md:gap-10">
        {rowOne.length > 0 && <MarqueeRow logos={rowOne} direction="left" />}
        {rowTwo.length > 0 && <MarqueeRow logos={rowTwo} direction="right" />}
      </div>
    </section>
  )
}