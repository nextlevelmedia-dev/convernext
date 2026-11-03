import Link from "next/link"
import { MobileProjectList } from "./MobileProjectList"
import { ProjectCard } from "./ProjectCard"
import { featuredProjects } from "./projects"

// in home solo i primi 6 progetti con anteprima; gli altri sono in /progetti
const HOME_COUNT = 6
const visibleProjects = featuredProjects.filter((p) => p.preview).slice(0, HOME_COUNT)

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
    <section id="progetti" className="relative overflow-clip py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.045)_1px,transparent_1px),linear-gradient(rgb(15_23_42/0.045)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)] dark:bg-[linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8 xl:px-10">
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

        {/* desktop e tablet: griglia come nella pagina progetti */}
        <ul
          aria-label="Progetti realizzati"
          className="mt-14 hidden grid-cols-2 gap-x-8 gap-y-14 md:grid lg:grid-cols-3"
        >
          {visibleProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <div className="mt-16 hidden justify-center md:flex">
          <Link
            href="/progetti"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-8 py-4 font-bold !text-white shadow-xl"
          >
            Vedi tutti i progetti
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* mobile: lista in colonna con il suo bottone */}
      <div className="relative mt-10 md:hidden">
        <MobileProjectList items={visibleProjects} />
      </div>
    </section>
  )
}
