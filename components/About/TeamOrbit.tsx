import Image from "next/image"

type RingProps = {
  items: string[]
  radius: number // in % della larghezza del visual
  duration: number
  reverse?: boolean
  offset?: number
  variant: "core" | "specialist"
}

const CHIP = {
  core: "border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-950 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.2)] sm:px-3.5 sm:py-2 sm:text-sm dark:border-white/10 dark:bg-[#0f1726] dark:text-white",
  specialist:
    "border border-dashed border-slate-300 bg-white/70 px-2.5 py-1 text-[11px] text-slate-500 backdrop-blur transition-colors duration-500 group-hover:border-solid group-hover:border-[#7c3aed]/50 group-hover:text-slate-950 sm:px-3 sm:py-1.5 sm:text-xs dark:border-white/20 dark:bg-white/[0.03] dark:text-white/60 dark:group-hover:text-white",
}

function Ring({ items, radius, duration, reverse = false, offset = 0, variant }: RingProps) {
  // proprietà separate (non lo shorthand) così la pausa in hover via classe funziona
  const anim = (name: string) => ({
    animationName: name,
    animationDuration: `${duration}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  })
  const spin = anim(reverse ? "orbit-spin-reverse" : "orbit-spin")
  const counter = anim(reverse ? "orbit-spin" : "orbit-spin-reverse")

  return (
    <div
      className="absolute inset-0 group-hover:[animation-play-state:paused] motion-reduce:!animate-none"
      style={spin}
    >
      {items.map((label, i) => {
        const a = (360 / items.length) * i + offset
        return (
          <div
            key={label}
            className="absolute left-1/2 top-1/2 size-0"
            style={{ transform: `rotate(${a}deg) translateX(${radius}cqw) rotate(${-a}deg)` }}
          >
            <span
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full group-hover:[animation-play-state:paused] motion-reduce:!animate-none ${CHIP[variant]}`}
              style={counter}
            >
              {variant === "core" && <span aria-hidden className="size-1.5 rounded-full bg-brand-gradient" />}
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Il modello di Next in un colpo d'occhio: il referente al centro, le
 * competenze core nell'anello interno e gli specialisti, coinvolti quando
 * servono, in quello esterno. Al passaggio del mouse le orbite si fermano e
 * gli specialisti "si attivano".
 */
export default function TeamOrbit({
  imageUrl,
  imageAlt,
  name,
  role,
  coreSkills,
  specialistSkills,
}: {
  imageUrl?: string
  imageAlt?: string
  name?: string
  role?: string
  coreSkills: string[]
  specialistSkills: string[]
}) {
  return (
    <figure className="mx-auto w-full max-w-[580px]">
      <div className="group relative aspect-square w-full [container-type:inline-size]">
        <div
          aria-hidden
          className="absolute inset-[14%] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.22),rgb(252_3_176/0.08)_60%,transparent)] blur-2xl"
        />

        {/* anelli */}
        <div aria-hidden className="absolute inset-[19%] rounded-full border border-slate-200 dark:border-white/10" />
        <div aria-hidden className="absolute inset-[5%] rounded-full border border-dashed border-slate-300/80 dark:border-white/15" />

        {/* referente al centro */}
        <div className="absolute inset-[33%] rounded-full bg-brand-gradient p-[3px] shadow-[0_24px_60px_-20px_rgb(124_58_237/0.55)]">
          <div className="relative size-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#111827]">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt || name || "Il fondatore di Next"}
                fill
                sizes="200px"
                className="object-cover object-top"
                priority
              />
            )}
          </div>
        </div>

        {(name || role) && (
          <div className="absolute left-1/2 top-[68.5%] -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-center text-[11px] shadow-sm backdrop-blur sm:text-xs dark:border-white/10 dark:bg-[#0f1726]/90">
            <strong className="font-bold text-slate-950 dark:text-white">{name}</strong>
            {role && <span className="text-slate-500 dark:text-white/60"> · {role}</span>}
          </div>
        )}

        <Ring items={coreSkills} radius={31} duration={70} variant="core" offset={-90} />
        <Ring items={specialistSkills} radius={45} duration={110} reverse variant="specialist" offset={-60} />
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-white/60">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-brand-gradient" />
          Competenze core
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full border border-dashed border-slate-400 dark:border-white/40" />
          Specialisti, quando il progetto li richiede
        </span>
      </figcaption>
    </figure>
  )
}
