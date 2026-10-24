import { site } from "@/lib/seo"

/*
 * Invio delle richieste dal form contatti tramite Resend (https://resend.com).
 *
 * Variabili d'ambiente:
 *   RESEND_API_KEY      obbligatoria, API key di Resend (solo lato server)
 *   CONTACT_FROM_EMAIL  mittente su un dominio verificato in Resend
 *                       (default: "Convernext <contatti@convernext.com>")
 *   CONTACT_TO_EMAIL    destinatario (default: email del sito)
 */

const DEFAULT_FROM = `${site.name} <contatti@convernext.com>`
// invii più rapidi di così dal caricamento del form sono quasi sempre bot
const MIN_FILL_MS = 3000

const SERVICES: Record<string, string> = {
  "ecommerce-shopify": "E-commerce Shopify",
  "temi-shopify": "Temi Shopify",
  "ottimizzazione-conversioni": "Ottimizzazione Conversioni",
  "siti-web": "Siti Web Performanti",
  altro: "Altro",
}

const LIMITS = { nome: 120, azienda: 120, email: 200, telefono: 40, messaggio: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

const field = (data: Record<string, unknown>, key: string) =>
  typeof data[key] === "string" ? (data[key] as string).trim() : ""

// "contatti@convernext.com" -> "Convernext <contatti@convernext.com>"
const withSenderName = (from: string) => (from.includes("<") ? from : `${site.name} <${from}>`)

export async function POST(request: Request) {
  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return Response.json({ error: "Richiesta non valida." }, { status: 400 })
  }

  // antispam: honeypot compilato o invio troppo rapido. Fingiamo il successo
  // per non dare indizi al bot, ma non inviamo nulla.
  const elapsed = typeof data.elapsed === "number" ? data.elapsed : 0
  if (field(data, "website") || elapsed < MIN_FILL_MS) {
    console.warn("[contact] invio scartato come spam", { elapsed })
    return Response.json({ ok: true })
  }

  const nome = field(data, "nome")
  const azienda = field(data, "azienda")
  const email = field(data, "email")
  const telefono = field(data, "telefono")
  const messaggio = field(data, "messaggio")
  const servizio = SERVICES[field(data, "servizio")] ?? "Non specificato"

  const tooLong = (Object.keys(LIMITS) as (keyof typeof LIMITS)[]).some(
    (key) => field(data, key).length > LIMITS[key]
  )

  if (!nome || !messaggio || !EMAIL_RE.test(email) || tooLong) {
    return Response.json(
      { error: "Controlla i campi obbligatori: nome, email valida e messaggio." },
      { status: 422 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = withSenderName(process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM)
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY non configurata")
    return Response.json({ error: "Servizio di invio non disponibile." }, { status: 503 })
  }

  const rows: [string, string][] = [
    ["Nome", nome],
    ["Azienda", azienda || "—"],
    ["Email", email],
    ["Telefono", telefono || "—"],
    ["Servizio", servizio],
  ]

  const html = `
    <h2>Nuova richiesta dal sito ${site.name}</h2>
    <table cellpadding="6">
      ${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("")}
    </table>
    <p><strong>Messaggio</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(messaggio)}</p>
  `
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessaggio:\n${messaggio}`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nuova richiesta: ${servizio} — ${nome.replace(/\s+/g, " ")}`,
      html,
      text,
    }),
  }).catch(() => null)

  if (!res?.ok) {
    console.error("[contact] invio fallito", res?.status, await res?.text().catch(() => ""))
    return Response.json({ error: "Invio non riuscito." }, { status: 502 })
  }

  const { id } = await res.json().catch(() => ({}))
  console.info("[contact] richiesta inviata", { id, to })

  return Response.json({ ok: true })
}
