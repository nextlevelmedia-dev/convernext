import Link from "next/link"
import { HorizontalScroll } from "./HorizontalScroll"
import { MobileProjectList } from "./MobileProjectList"
import { featuredProjects } from "./projects"

// solo i progetti che hanno già un'anteprima
const visibleProjects = featuredProjects.filter((p) => p.preview)

type FeaturedProjectsProps = {
  title?: string
  highlight?: string
  titleTwo?: string
  subtitle?: string
}

export default function FeaturedProjects({
  title,
  highlight,
  titleTwo,
  subtitle,
}: FeaturedProjectsProps) {
  const rest = titleTwo?.trim()
  const restStartsWithPunctuation = rest ? /^[,.;:!?]/.test(rest) : false

  return (
    <section id="progetti" className="relative overflow-clip py-24 md:py-0">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.045)_1px,transparent_1px),linear-gradient(rgb(15_23_42/0.045)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)] dark:bg-[linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)]"
      />

      <HorizontalScroll
        items={visibleProjects}
        intro={
          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-end md:px-8 xl:px-10">
            <div className="max-w-3xl">
              <h2
                className="text-4xl leading-[1.2] tracking-tight text-slate-950 md:text-[42px] dark:text-white"
                style={{
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontWeight: 600,
                }}
              >
                {title}{" "}
                {highlight && (
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    {highlight}
                  </span>
                )}
                {rest && (restStartsWithPunctuation ? rest : ` ${rest}`)}
              </h2>

              {subtitle && (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/70">
                  {subtitle}
                </p>
              )}
            </div>

            <Link
              href="/progetti"
              className="group/al hidden shrink-0 md:inline-flex items-center gap-1.5 font-bold text-slate-950 transition-colors hover:text-[#047cf9] dark:text-white"
            >
              <span className="bg-[linear-gradient(90deg,#fc03b0,#047cf9)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/al:bg-[length:100%_1.5px]">
                Tutti i progetti
              </span>
              <span aria-hidden className="transition-transform duration-300 group-hover/al:translate-x-1">
                →
              </span>
            </Link>
          </div>
        }
        mobile={<MobileProjectList items={visibleProjects.slice(0, 8)} />}
      />
    </section>
  )
}
