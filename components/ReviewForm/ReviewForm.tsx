"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { track } from "@/lib/track"

/*
 * Modulo per lasciare una recensione. Le immagini vengono ridimensionate nel
 * browser prima dell'invio (max 600 px), così restano leggere.
 */

const LABEL = "mb-2 block text-sm font-bold text-slate-950 dark:text-white"
const FIELD =
  "w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-slate-950 outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-[#7c3aed] focus:shadow-[0_0_0_4px_rgb(124_58_237/0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35"
const OPTIONAL = <b className="font-normal text-slate-400 dark:text-white/40"> (facoltativo)</b>

const SERVICES = [
  { value: "siti-web", label: "Sito web" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "ottimizzazione-conversioni", label: "Ottimizzazione conversioni" },
]

/** ridimensiona l'immagine (lato lungo max `size`) e la riconverte; i PNG restano PNG per la trasparenza dei loghi */
async function shrink(file: File, size = 600): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, size / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const type = file.type === "image/png" ? "image/png" : "image/jpeg"
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, type, 0.86))
    if (!blob) return file
    return new File([blob], file.name.replace(/\.\w+$/, type === "image/png" ? ".png" : ".jpg"), { type })
  } catch {
    return file
  }
}

export default function ReviewForm() {
  // momento in cui il modulo è comparso: serve all'antispam (invii troppo rapidi)
  const started = useRef(0)
  useEffect(() => {
    started.current = Date.now()
  }, [])
  const [values, setValues] = useState({ authorName: "", company: "", reviewTitle: "", reviewText: "", website: "", service: "" })
  const [stars, setStars] = useState(5)
  const [photo, setPhoto] = useState<File | null>(null)
  const [logo, setLogo] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")
  const [error, setError] = useState("")


  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }))

  // file scelto → ridimensionato prima dell'invio
  const pick = (setFile: (f: File | null) => void) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    setFile(f ? await shrink(f) : null)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setError("")
    const form = new FormData(e.currentTarget)
    form.set("stars", String(stars))
    form.set("elapsed", String(Date.now() - started.current))
    form.delete("authorPhoto")
    form.delete("companyLogo")
    if (photo) form.set("authorPhoto", photo)
    if (logo) form.set("companyLogo", logo)
    try {
      const res = await fetch("/api/reviews", { method: "POST", body: form })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || "Invio non riuscito.")
      setStatus("done")
      track("review_submit", { service: values.service })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invio non riuscito.")
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl rounded-[28px] border border-slate-200 bg-white p-10 text-center dark:border-white/10 dark:bg-[#0f1726]">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand-gradient text-2xl !text-white">✓</div>
        <h2 className="mt-6 text-2xl text-slate-950 dark:text-white" style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}>
          Grazie, recensione ricevuta!
        </h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-white/65">
          La leggiamo e la pubblichiamo sul sito nei prossimi giorni.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold !text-white dark:bg-white dark:!text-slate-950">
          Torna al sito
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={onSubmit} className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-10 dark:border-white/10 dark:bg-[#0f1726]">
        {/* honeypot: invisibile alle persone */}
        <input type="text" name="fax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <b className={LABEL}>Nome e cognome</b>
            <input name="authorName" required maxLength={80} value={values.authorName} onChange={set("authorName")} className={`${FIELD} h-12`} placeholder="Mario Rossi" />
          </label>
          <label className="block">
            <b className={LABEL}>Azienda{OPTIONAL}</b>
            <input name="company" maxLength={100} value={values.company} onChange={set("company")} className={`${FIELD} h-12`} placeholder="Nome dell'azienda" />
          </label>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <b className={LABEL}>Servizio</b>
            <select name="service" required value={values.service} onChange={set("service")} className={`${FIELD} h-12`}>
              <option value="" disabled>
                Seleziona il servizio
              </option>
              {SERVICES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div>
            <b className={LABEL}>Valutazione</b>
            <div className="flex h-12 items-center gap-1" role="radiogroup" aria-label="Valutazione da 1 a 5 stelle">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={stars === n}
                  aria-label={`${n} stell${n === 1 ? "a" : "e"}`}
                  onClick={() => setStars(n)}
                  className={`text-3xl leading-none transition-transform hover:scale-110 ${n <= stars ? "text-[#a855f7]" : "text-slate-300 dark:text-white/20"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="mt-5 block">
          <b className={LABEL}>Titolo</b>
          <input name="reviewTitle" required maxLength={90} value={values.reviewTitle} onChange={set("reviewTitle")} className={`${FIELD} h-12`} placeholder="Es. Più richieste dal nuovo sito" />
        </label>

        <label className="mt-5 block">
          <b className={LABEL}>La tua recensione</b>
          <textarea name="reviewText" required maxLength={900} rows={5} value={values.reviewText} onChange={set("reviewText")} className={`${FIELD} py-3`} placeholder="Com'è andato il progetto? Cosa è cambiato da quando il sito è online?" />
          <i className="mt-1 block text-right text-xs not-italic text-slate-400 dark:text-white/40">{values.reviewText.length}/900</i>
        </label>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <b className={LABEL}>La tua foto{OPTIONAL}</b>
            <input type="file" name="authorPhoto" accept="image/jpeg,image/png,image/webp" onChange={pick(setPhoto)} className={`${FIELD} py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-bold dark:file:bg-white/10 dark:file:text-white`} />
          </label>
          <label className="block">
            <b className={LABEL}>Logo aziendale{OPTIONAL}</b>
            <input type="file" name="companyLogo" accept="image/png,image/webp,image/jpeg" onChange={pick(setLogo)} className={`${FIELD} py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-bold dark:file:bg-white/10 dark:file:text-white`} />
          </label>
        </div>

        <label className="mt-5 block">
          <b className={LABEL}>Sito web{OPTIONAL}</b>
          <input name="website" maxLength={200} inputMode="url" value={values.website} onChange={set("website")} className={`${FIELD} h-12`} placeholder="www.tuosito.it" />
        </label>

        <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-white/65">
          <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-[#7c3aed]" />
          <i className="not-italic">
            Acconsento alla pubblicazione della recensione sul sito, con nome, azienda e le immagini caricate, come descritto nella{" "}
            <a href="https://www.iubenda.com/privacy-policy/90237580" target="_blank" rel="noopener" className="font-bold text-slate-950 underline underline-offset-2 dark:text-white">
              privacy policy
            </a>
            .
          </i>
        </label>

        {status === "error" && (
          <p role="alert" className="mt-5 rounded-xl border border-[#fc03b0]/30 bg-[#fc03b0]/[0.06] px-4 py-3 text-sm text-[#be0b85] dark:text-[#ff7ad6]">
            {error} Riprova, o scrivici dalla pagina contatti.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-8 py-4 font-bold !text-white shadow-xl transition-opacity disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Invio in corso…" : "Invia la recensione"}
        </button>
      </form>

    </div>
  )
}
