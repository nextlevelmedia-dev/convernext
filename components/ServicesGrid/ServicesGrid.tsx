"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import "./ServicesGrid.css"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

type Service = {
  label: string
  title: string
  text: string
  cta: string
  href: string
  mediaType?: "video" | "image" | "lottie"
  videoWebm?: string
  videoMp4?: string
  image?: {
    asset?: {
      url?: string
    }
  }
  lottieFile?: string
}

type Props = {
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  services?: Service[]
  ctaText?: string
  ctaHref?: string
}

function LazyVideo({
  webm,
  mp4,
}: {
  webm?: string
  mp4?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const loaded = useRef(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loaded.current) return

        loaded.current = true

        const video = videoRef.current
        if (!video) return

        if (webm) {
          const source = document.createElement("source")
          source.src = webm
          source.type = "video/webm"
          video.appendChild(source)
        }

        if (mp4) {
          const source = document.createElement("source")
          source.src = mp4
          source.type = "video/mp4"
          video.appendChild(source)
        }

        video.load()
        video.play().catch(() => {})

        observer.disconnect()
      },
      {
        rootMargin: "300px",
      }
    )

    observer.observe(wrapper)

    return () => observer.disconnect()
  }, [webm, mp4])

  return (
    <div ref={wrapperRef} className="services-grid-video-wrapper">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="services-grid-video"
      />
    </div>
  )
}

function LazyLottie({ file }: { file: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [animationData, setAnimationData] = useState<any>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "200px",
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad || !file) return

    let cancelled = false

    fetch(`/lotties/${file}`)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) {
          setAnimationData(data)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [shouldLoad, file])

  return (
    <div ref={wrapperRef} className="services-grid-lottie-wrapper">
      {animationData && (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  )
}

function ServiceMedia({ service }: { service: Service }) {
  if (
    service.mediaType === "video" &&
    (service.videoWebm || service.videoMp4)
  ) {
    return (
      <LazyVideo
        webm={service.videoWebm}
        mp4={service.videoMp4}
      />
    )
  }

  if (
    service.mediaType === "image" &&
    service.image?.asset?.url
  ) {
    return (
      <img
        src={service.image.asset.url}
        alt={service.title}
        className="services-grid-image"
        loading="lazy"
        decoding="async"
      />
    )
  }

  if (
    service.mediaType === "lottie" &&
    service.lottieFile
  ) {
    return <LazyLottie file={service.lottieFile} />
  }

  return (
    <div className="services-grid-placeholder">
      <span>{service.title}</span>
    </div>
  )
}

export default function ServicesGrid({
  titleHighlight,
  titleNormal,
  subtitle,
  services = [],
  ctaText = "Parliamo del tuo progetto",
  ctaHref = "/contatti",
}: Props) {
  if (!services.length) return null

  return (
    <section className="services-grid-section">
      <div className="services-grid-container">

        {(titleHighlight || titleNormal || subtitle) && (
          <div className="services-grid-heading">
            <div className="services-grid-heading-title">
              {(titleHighlight || titleNormal) && (
                <h2
                  className="services-grid-main-title"
                  style={{
                    fontFamily: "var(--font-archivo), sans-serif",
                  }}
                >
                  {titleHighlight && (
                    <span className="services-grid-highlight">
                      {titleHighlight}
                    </span>
                  )}

                  {titleHighlight && titleNormal && " "}

                  {titleNormal}
                </h2>
              )}
            </div>

            {subtitle && (
              <div className="services-grid-heading-copy">
                <p>{subtitle}</p>
              </div>
            )}
          </div>
        )}

        <div className="services-grid-cards">
          {services.map((service, index) => (
            <Link
              href={service.href || "/contatti"}
              className="services-grid-card"
              key={`${service.title}-${index}`}
            >
              <div className="services-grid-media">
                <ServiceMedia service={service} />
              </div>

              <div className="services-grid-content">
                {service.label && (
                  <span className="services-grid-label">
                    {service.label}
                  </span>
                )}

                <h3 className="services-grid-title">
                  {service.title}
                </h3>

                <p className="services-grid-text">
                  {service.text}
                </p>

                <div className="services-grid-link">
                  <span>{service.cta}</span>

                  <span
                    className="services-grid-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {ctaText && (
          <div className="services-grid-bottom">
            <Link
              href={ctaHref}
              className="services-grid-main-button"
            >
              {ctaText}

              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}