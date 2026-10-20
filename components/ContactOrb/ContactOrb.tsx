"use client"

import { useRef } from "react"
import { useLazyScene } from "../three/useLazyScene"

/** Sfera 3D Convernext della sezione contatti. */
export default function ContactOrb({ className = "" }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null)
  const ready = useLazyScene(stage, (el, env) =>
    import("./scene").then(({ createContactOrb }) => createContactOrb(el, env))
  )

  return (
    <div className={`relative select-none ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.22),rgb(252_3_176/0.08)_60%,transparent)] blur-2xl"
      />
      <div
        ref={stage}
        aria-hidden
        className={`absolute inset-0 cursor-pointer touch-pan-y transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  )
}
