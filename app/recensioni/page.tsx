import Header from "@/components/Header"
import ReviewForm from "@/components/ReviewForm/ReviewForm"
import { getAllReviews, ReviewCard } from "@/components/ReviewsSection/ReviewsSection"
import { pageMetadata } from "@/lib/seo"

/*
 * Pagina recensioni: in alto il modulo per lasciarne una, sotto tutte le
 * recensioni (quelle approvate dal modulo per prime). Collegata dal footer e
 * dal "Vedi tutte le recensioni" della home; non è nel menu.
 */

// le recensioni approvate nello Studio compaiono entro 5 minuti
export const revalidate = 300

export const metadata = pageMetadata({
  title: "Recensioni dei clienti",
  description:
    "Le recensioni di chi ha lavorato con Convernext su siti web, e-commerce e ottimizzazione delle conversioni. Hai lavorato con noi? Lascia la tua.",
  path: "/recensioni",
})

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

export default async function RecensioniPage() {
  const reviews = await getAllReviews()
  const cols = [0, 1, 2].map((c) => reviews.filter((_, i) => i % 3 === c))

  return (
    <>
      <Header />
      <main className="px-5 pb-28 pt-32 md:px-8 md:pt-40 xl:px-10">
        <div className="mx-auto max-w-7xl">
          {/* MODULO */}
          <section id="lascia" className="scroll-mt-28">
            <div className="hero-in max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-white/50">Recensioni</p>
              <h1 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.08] tracking-[-0.03em] text-slate-950 dark:text-white" style={archivo}>
                <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">Com&apos;è andata</em> con noi?
              </h1>
              <p className="mt-5 text-lg leading-8 text-black/65 dark:text-white/70">
                Bastano un paio di minuti. La tua esperienza aiuta chi sta scegliendo a capire cosa aspettarsi.
              </p>
            </div>

            <div className="mt-12 md:mt-16">
              <ReviewForm />
            </div>
          </section>

          {/* TUTTE LE RECENSIONI */}
          {reviews.length > 0 && (
            <section id="tutte" className="mt-28 scroll-mt-28 md:mt-36">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <h2 className="text-balance text-[clamp(2rem,4vw,2.8rem)] leading-[1.15] tracking-[-0.02em] text-slate-950 dark:text-white" style={archivo}>
                  Lo raccontano i <em className="bg-brand-gradient bg-clip-text not-italic text-transparent">nostri clienti</em>
                </h2>
              </div>
              <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-3">
                {cols.map((col, c) => (
                  <div key={c}>
                    {col.map((r, i) => (
                      <ReviewCard key={`${r.authorName}-${i}`} review={r} />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}

          <p className="mt-16 max-w-3xl text-xs leading-6 text-slate-500 dark:text-white/45">
            Le recensioni lasciate tramite il modulo sono raccolte direttamente dai clienti e verificate da noi prima della pubblicazione:
            controlliamo che chi scrive abbia lavorato con Convernext. Non modifichiamo il contenuto delle recensioni.
          </p>
        </div>
      </main>
    </>
  )
}
