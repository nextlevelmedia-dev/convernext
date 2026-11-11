import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "@/sanity/env"
import { site } from "@/lib/seo"

/*
 * Recensioni inviate da /recensioni.
 * Si salvano in Sanity come BOZZA (non visibili sul sito) e arriva una mail
 * con il link per approvarle nello Studio: "Publish" = recensione approvata.
 *
 * Variabili d'ambiente (Vercel → Settings → Environment Variables):
 *   SANITY_WRITE_TOKEN  obbligatoria, token Sanity con permesso Editor (solo lato server)
 *   RESEND_API_KEY      la stessa del form contatti, per la mail di notifica
 *   CONTACT_FROM_EMAIL  / CONTACT_TO_EMAIL  come per il form contatti
 */

const MIN_FILL_MS = 4000
const MAX_IMAGE_BYTES = 2_500_000
const SERVICES: Record<string, string> = {
  "siti-web": "Siti web",
  ecommerce: "E-commerce",
  "ottimizzazione-conversioni": "Ottimizzazione conversioni",
}
const LIMITS = { authorName: 80, company: 100, reviewTitle: 90, reviewText: 900, website: 200 }

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
const withSenderName = (from: string) => (from.includes("<") ? from : `${site.name} <${from}>`)

const text = (form: FormData, key: string) => {
  const v = form.get(key)
  return typeof v === "string" ? v.trim() : ""
}

/** "www.sito.it" → "https://www.sito.it"; scarta tutto ciò che non è un URL http(s) valido. */
function normalizeUrl(raw: string) {
  if (!raw) return undefined
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
    return /^https?:$/.test(url.protocol) && url.hostname.includes(".") ? url.toString() : undefined
  } catch {
    return undefined
  }
}

function imageFile(form: FormData, key: string) {
  const f = form.get(key)
  if (!(f instanceof File) || f.size === 0) return null
  if (!f.type.startsWith("image/") || f.size > MAX_IMAGE_BYTES) return "invalid" as const
  return f
}

export async function POST(request: Request) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return Response.json({ error: "Richiesta non valida." }, { status: 400 })
  }

  // antispam: honeypot compilato o invio troppo rapido. Fingiamo il successo.
  const elapsed = Number(text(form, "elapsed")) || 0
  if (text(form, "fax") || elapsed < MIN_FILL_MS) {
    console.warn("[reviews] invio scartato come spam", { elapsed })
    return Response.json({ ok: true })
  }

  const data = {
    authorName: text(form, "authorName"),
    company: text(form, "company"),
    reviewTitle: text(form, "reviewTitle"),
    reviewText: text(form, "reviewText"),
    website: text(form, "website"),
  }
  const service = text(form, "service")
  const stars = Number(text(form, "stars"))
  const consent = text(form, "consent") === "on"
  const website = normalizeUrl(data.website)

  const tooLong = (Object.keys(LIMITS) as (keyof typeof LIMITS)[]).some((k) => data[k].length > LIMITS[k])
  if (
    !data.authorName ||
    !data.reviewTitle ||
    !data.reviewText ||
    !SERVICES[service] ||
    !(stars >= 1 && stars <= 5) ||
    !consent ||
    tooLong ||
    (data.website && !website)
  ) {
    return Response.json(
      { error: "Controlla i campi obbligatori: nome, servizio, valutazione, titolo, recensione e consenso." },
      { status: 422 }
    )
  }

  const photo = imageFile(form, "authorPhoto")
  const logo = imageFile(form, "companyLogo")
  if (photo === "invalid" || logo === "invalid") {
    return Response.json({ error: "Le immagini devono essere JPG, PNG o WebP sotto i 2,5 MB." }, { status: 422 })
  }

  const token = process.env.SANITY_WRITE_TOKEN
  if (!token) {
    console.error("[reviews] SANITY_WRITE_TOKEN non configurata")
    return Response.json({ error: "Servizio non disponibile." }, { status: 503 })
  }
  const sanity = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

  try {
    const upload = async (file: File | null, label: string) => {
      if (!file) return undefined
      const asset = await sanity.assets.upload("image", Buffer.from(await file.arrayBuffer()), {
        filename: `${label}-${data.authorName}.${file.type.split("/")[1] || "jpg"}`,
        contentType: file.type,
      })
      return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } }
    }
    const [authorPhoto, companyLogo] = await Promise.all([upload(photo, "foto"), upload(logo, "logo")])

    const id = `drafts.review-${crypto.randomUUID()}`
    await sanity.create({
      _id: id,
      _type: "review",
      authorName: data.authorName,
      company: data.company || undefined,
      service,
      stars,
      reviewTitle: data.reviewTitle,
      reviewText: data.reviewText,
      website,
      authorPhoto,
      companyLogo,
      consent: true,
      submittedAt: new Date().toISOString(),
    })
    console.info("[reviews] recensione salvata come bozza", { id })

    // notifica: se la mail non parte, la recensione resta comunque da approvare nello Studio
    await notify(id.replace(/^drafts\./, ""), { ...data, website, service, stars }).catch((e) =>
      console.error("[reviews] notifica non inviata", e)
    )
  } catch (e) {
    console.error("[reviews] salvataggio fallito", e)
    return Response.json({ error: "Invio non riuscito." }, { status: 502 })
  }

  return Response.json({ ok: true })
}

async function notify(
  id: string,
  r: { authorName: string; company: string; reviewTitle: string; reviewText: string; website?: string; service: string; stars: number }
) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const from = withSenderName(process.env.CONTACT_FROM_EMAIL?.trim() || `${site.name} <contatti@convernext.com>`)
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email
  const studio = `${site.url}/studio/intent/edit/id=${id};type=review`

  const rows: [string, string][] = [
    ["Nome", r.authorName],
    ["Azienda", r.company || "—"],
    ["Servizio", SERVICES[r.service]],
    ["Valutazione", "★".repeat(r.stars) + "☆".repeat(5 - r.stars)],
    ["Sito", r.website || "—"],
  ]
  const html = `
    <h2>Nuova recensione da approvare</h2>
    <table cellpadding="6">
      ${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("")}
    </table>
    <p><strong>“${escapeHtml(r.reviewTitle)}”</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(r.reviewText)}</p>
    <p><a href="${studio}">Apri la recensione nello Studio</a> e premi <strong>Publish</strong> per mostrarla sul sito.</p>
  `
  const plain = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n"${r.reviewTitle}"\n${r.reviewText}\n\nApprova: ${studio}`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Nuova recensione da approvare — ${r.authorName.replace(/\s+/g, " ")}`,
      html,
      text: plain,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text().catch(() => "")}`)
}
