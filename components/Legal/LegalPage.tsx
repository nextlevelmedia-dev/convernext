import Header from "@/components/Header"

/** Impaginazione comune delle pagine legali (privacy e cookie policy). */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <article className="px-5 pb-28 pt-36 md:px-8 md:pt-44 xl:px-10">
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-4xl leading-[1.1] tracking-tight text-slate-950 md:text-5xl dark:text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
          >
            {title}
          </h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-white/50">Ultimo aggiornamento: {updated}</p>
          <p className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70">
            Versione provvisoria: a breve sarà sostituita da un&apos;informativa redatta con iubenda.
          </p>
          <div className="legal-text mt-10">{children}</div>
        </div>
      </article>
    </>
  )
}
