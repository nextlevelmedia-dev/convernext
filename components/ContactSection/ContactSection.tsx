"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import ContactOrb from "../ContactOrb/ContactOrb"

const STEPS = [
  {
    n: "01",
    title: "Analizziamo la tua richiesta",
    desc: "Valutiamo il progetto e prepariamo le domande giuste per capire i tuoi obiettivi.",
  },
  {
    n: "02",
    title: "Ti ricontattiamo entro 24 ore",
    desc: "Una call veloce per capire nel dettaglio cosa ti serve e come possiamo aiutarti.",
  },
  {
    n: "03",
    title: "Preventivo su misura",
    desc: "Nessuna soluzione standard. Solo quello che ti serve, con tempi e costi chiari.",
  },
]

const INFO = [
  {
    icon: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z",
    text: "info@next-level-media.it",
    href: "mailto:info@next-level-media.it",
  },
  {
    icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z",
    text: "Milano, Italia",
  },
  {
    icon: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 5v5l4 2",
    text: "Lun – Ven, 9:00 – 18:00",
  },
]

const LABEL = "mb-2 block text-sm font-bold text-slate-950 dark:text-white"
const FIELD =
  "w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-slate-950 outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-[#7c3aed] focus:shadow-[0_0_0_4px_rgb(124_58_237/0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nome: "",
    azienda: "",
    email: "",
    telefono: "",
    messaggio: "",
    servizio: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    await new Promise((r) => setTimeout(r, 1000))
    setStatus("success")
  }

  return (
    <section
      id="contatti"
      className="relative overflow-clip px-5 py-24 md:px-8 md:py-32 xl:px-10"
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_0%_10%,rgb(252_3_176/0.08),transparent_70%),radial-gradient(50%_45%_at_100%_90%,rgb(4_124_249/0.08),transparent_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        {/* SINISTRA — titolo, sfera, passaggi */}
        <div className="flex flex-col">
          {/* titolo + sfera nello spazio libero accanto */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-white/60">
                <span aria-hidden className="h-px w-8 bg-brand-gradient" />
                Contattaci
              </p>

              <h2
                className="mt-5 text-4xl leading-[1.1] tracking-tight text-slate-950 sm:whitespace-nowrap md:text-5xl xl:text-[54px] dark:text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
              >
                Parliamo del
                <br />
                tuo{" "}
                <span className="bg-brand-gradient bg-clip-text text-transparent">progetto</span>
              </h2>

              <p className="mt-5 text-lg leading-8 text-black/65 dark:text-white/70">
                Rispondiamo entro 24 ore. Nessun impegno.
              </p>
            </div>

            <ContactOrb className="mx-auto aspect-square w-[240px] shrink-0 sm:mx-0 sm:-my-8 sm:w-[230px] xl:w-[270px]" />
          </div>

          <div className="mt-10 lg:mt-auto lg:pt-10">
            <p
              className="text-lg text-slate-950 dark:text-white"
              style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
            >
              Cosa succede dopo l&apos;invio
            </p>

            <ol className="mt-5 flex flex-col gap-5">
              {STEPS.map((step) => (
                <li key={step.n} className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-gradient p-px">
                    <span className="grid size-full place-items-center rounded-full bg-white font-mono text-xs text-slate-950 dark:bg-[#111118] dark:text-white">
                      {step.n}
                    </span>
                  </span>
                  <div>
                    <p className="font-bold text-slate-950 dark:text-white">{step.title}</p>
                    <p className="mt-1 text-[15px] leading-6 text-black/60 dark:text-white/65">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-6 dark:border-white/10">
            {INFO.map((item) => {
              const content = (
                <>
                  <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-slate-400 dark:text-white/45">
                    <path d={item.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item.text}</span>
                </>
              )
              return (
                <li key={item.text} className="flex items-center gap-2.5 text-sm text-black/60 dark:text-white/65">
                  {item.href ? (
                    <a href={item.href} className="flex items-center gap-2.5 transition-colors hover:text-[#047cf9]">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* DESTRA — form */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_24px_60px_-24px_rgb(15_23_42/0.18)] sm:p-10 dark:border-white/10 dark:bg-[#0f1726] dark:shadow-[0_1px_2px_rgb(0_0_0/0.3),0_24px_60px_-24px_rgb(0_0_0/0.6)]">
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-brand-gradient">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12l4 4 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">Messaggio inviato!</h3>
              <p className="text-[15px] text-black/60 dark:text-white/65">Ti ricontatteremo entro 24 ore.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <div>
                    <label htmlFor="contact-nome" className={LABEL}>Nome e cognome</label>
                    <input id="contact-nome" name="nome" type="text" autoComplete="name" required value={formData.nome} onChange={handleChange} placeholder="Mario Rossi" className={`${FIELD} h-[52px]`} />
                  </div>
                  <div>
                    <label htmlFor="contact-azienda" className={LABEL}>
                      Azienda <span className="font-normal text-slate-500 dark:text-white/50">(facoltativo)</span>
                    </label>
                    <input id="contact-azienda" name="azienda" type="text" autoComplete="organization" value={formData.azienda} onChange={handleChange} placeholder="Nome azienda" className={`${FIELD} h-[52px]`} />
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <label htmlFor="contact-email" className={LABEL}>Email</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="mario@azienda.it" className={`${FIELD} h-[52px]`} />
                  </div>
                  <div>
                    <label htmlFor="contact-telefono" className={LABEL}>
                      Telefono <span className="font-normal text-slate-500 dark:text-white/50">(facoltativo)</span>
                    </label>
                    <input id="contact-telefono" name="telefono" type="tel" autoComplete="tel" value={formData.telefono} onChange={handleChange} placeholder="+39 333 000 0000" className={`${FIELD} h-[52px]`} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="contact-servizio" className={LABEL}>Servizio di interesse</label>
                <div className="relative">
                  <select id="contact-servizio" name="servizio" value={formData.servizio} onChange={handleChange} className={`${FIELD} h-[52px] appearance-none pr-10 dark:[&>option]:bg-[#0f1726]`}>
                    <option value="">Seleziona un servizio</option>
                    <option value="ecommerce-shopify">E-commerce Shopify</option>
                    <option value="ottimizzazione-conversioni">Ottimizzazione Conversioni</option>
                    <option value="siti-web">Siti Web Performanti</option>
                    <option value="temi-shopify">Temi Shopify</option>
                    <option value="altro">Altro</option>
                  </select>
                  <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-white/50" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="contact-messaggio" className={LABEL}>Di cosa hai bisogno?</label>
                <textarea id="contact-messaggio" name="messaggio" required rows={6} value={formData.messaggio} onChange={handleChange} placeholder="Descrivi brevemente il tuo progetto..." className={`${FIELD} resize-y py-3.5 leading-relaxed`} />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 flex h-14 w-full items-center justify-center rounded-full bg-brand-gradient px-8 text-base font-bold !text-white shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] transition-[transform,box-shadow,opacity] duration-300 hover:shadow-[0_18px_44px_-12px_rgb(252_3_176/0.6)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Invio in corso..." : "Invia richiesta"}
              </button>

              <p className="-mt-2 text-center text-sm text-slate-500 dark:text-white/55">
                Senza impegno — risposta entro 24 ore
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
