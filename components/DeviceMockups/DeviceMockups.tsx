'use client'

import { useEffect, useMemo, useRef } from 'react'
import './DeviceMockups.css'

type MockupSlide = {
  imac: string
  tablet: string
  mobile: string
}

type DeviceMockupsProps = {
  slides?: MockupSlide[]
}

const defaultSlides: MockupSlide[] = [
  {
    imac: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-imac-hero-next-11.webp',
    tablet: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-tablet-next-hero-1264-x-856-px-19.webp',
    mobile: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-iphone-next-hero-10.webp',
  },
  {
    imac: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-imac-hero-next-14.webp',
    tablet: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-tablet-next-hero-1264-x-856-px-22.webp',
    mobile: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-iphone-next-hero-13.webp',
  },
  {
    imac: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-imac-hero-next-13.webp',
    tablet: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-tablet-next-hero-1264-x-856-px-21.webp',
    mobile: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-iphone-next-hero-12.webp',
  },
]

// distanza minima (px) per considerare il gesto uno swipe
const SWIPE_THRESHOLD = 40
const SLIDE_MS = 550
const AUTOPLAY_MS = 2800

export default function DeviceMockups({ slides = defaultSlides }: DeviceMockupsProps) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides])
  const firstSlide = safeSlides[0]
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || safeSlides.length < 2) return

    const imac = root.querySelector<HTMLImageElement>('.imac-screen')
    const tablet = root.querySelector<HTMLImageElement>('.tablet-screen')
    const mobile = root.querySelector<HTMLImageElement>('.mobile-screen')

    if (!imac || !tablet || !mobile) return

    let index = 0
    let busy = false

    // dir 1: la nuova slide entra da destra, -1: da sinistra
    const createTemp = (el: HTMLImageElement, src: string, dir: 1 | -1) => {
      const temp = document.createElement('img')
      temp.src = src
      temp.className = 'screen-img temp-screen'
      temp.alt = ''
      temp.draggable = false

      Object.assign(temp.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '3',
        transform: `translateX(${dir * 100}%)`,
        transition: `transform ${SLIDE_MS}ms cubic-bezier(.4,0,.2,1)`,
      })

      el.closest('.screen')?.appendChild(temp)
      return temp
    }

    const goTo = (dir: 1 | -1) => {
      if (busy) return
      busy = true

      index = (index + dir + safeSlides.length) % safeSlides.length
      const slide = safeSlides[index]

      const temps = [
        createTemp(imac, slide.imac, dir),
        createTemp(tablet, slide.tablet, dir),
        createTemp(mobile, slide.mobile, dir),
      ]

      void temps[0].offsetWidth
      temps.forEach((t) => (t.style.transform = 'translateX(0)'))

      setTimeout(() => {
        imac.src = slide.imac
        tablet.src = slide.tablet
        mobile.src = slide.mobile
        temps.forEach((t) => t.remove())
        busy = false
      }, SLIDE_MS)
    }

    let interval = setInterval(() => goTo(1), AUTOPLAY_MS)
    const restartAutoplay = () => {
      clearInterval(interval)
      interval = setInterval(() => goTo(1), AUTOPLAY_MS)
    }

    // swipe da touch e trascinamento col mouse sui device
    let startX = 0
    let startY = 0
    let pointerId: number | null = null

    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest('.device-mockup')) return
      if (e.pointerType === 'mouse' && e.button !== 0) return
      pointerId = e.pointerId
      startX = e.clientX
      startY = e.clientY
    }

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      pointerId = null
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
      goTo(dx < 0 ? 1 : -1)
      restartAutoplay()
    }

    const onCancel = () => {
      pointerId = null
    }

    root.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onCancel)

    return () => {
      clearInterval(interval)
      root.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onCancel)
    }
  }, [safeSlides])

  return (
    <div ref={rootRef} className={`mockup-row${safeSlides.length > 1 ? ' is-swipeable' : ''}`}>
      <div className="mockup-stage">
        <div className="mockup-shadow" />

        <div className="device-mockup imac">
          <img
            className="frame"
            draggable={false}
            src="/frame-imac.webp"
            alt="iMac frame"
            width={620}
            height={520}
            fetchPriority="high"
          />
          <div className="screen">
            <img
              className="screen-img imac-screen"
              draggable={false}
              src={firstSlide?.imac}
              alt="iMac screen"
              fetchPriority="high"
              width={1280}
              height={800}
            />
          </div>
        </div>

        <div className="device-mockup tablet">
          <img
            className="frame"
            draggable={false}
            src="/frame-tablet.webp"
            alt="Tablet frame"
            width={430}
            height={580}
            decoding="async"
          />
          <div className="screen">
            <img
              className="screen-img tablet-screen"
              draggable={false}
              src={firstSlide?.tablet}
              alt="Tablet screen"
              decoding="async"
              width={800}
              height={600}
            />
          </div>
        </div>

        <div className="device-mockup mobile">
          <img
            className="frame"
            draggable={false}
            src="/frame-mobile.webp"
            alt="Mobile frame"
            width={280}
            height={560}
            decoding="async"
          />
          <div className="screen">
            <img
              className="screen-img mobile-screen"
              draggable={false}
              src={firstSlide?.mobile}
              alt="Mobile screen"
              decoding="async"
              width={390}
              height={844}
            />
          </div>
        </div>

      </div>
    </div>
  )
}