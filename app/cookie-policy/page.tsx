import Link from "next/link"
import LegalPage from "@/components/Legal/LegalPage"
import CookiePreferencesLink from "@/components/Legal/CookiePreferencesLink"
import { pageMetadata, site } from "@/lib/seo"

export const metadata = {
  ...pageMetadata({
    title: "Cookie policy",
    description: "Quali cookie e strumenti simili usa il sito di Convernext e come gestire le tue preferenze.",
    path: "/cookie-policy",
  }),
  robots: { index: false, follow: true },
}

const UPDATED = "6 novembre 2026"

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie policy" updated={UPDATED}>
      <p>
        I cookie sono piccoli file che un sito salva nel tuo browser. Strumenti simili, come la memoria locale del
        browser (localStorage), funzionano allo stesso modo. Qui trovi quali usiamo e come gestirli.
      </p>

      <h2>1. Cookie tecnici (sempre attivi)</h2>
      <p>Servono a far funzionare il sito e non richiedono il consenso:</p>
      <ul>
        <li>
          <strong>Tema chiaro o scuro</strong> (localStorage, chiave &quot;theme&quot;): ricorda la modalità che hai
          scelto.
        </li>
        <li>
          <strong>Preferenze cookie</strong> (localStorage, chiave &quot;cookie-consent&quot;): ricorda la scelta che hai
          fatto nel banner, per non chiedertela a ogni visita.
        </li>
        <li>
          <strong>Sicurezza e funzionamento del server</strong>: dati tecnici gestiti dal nostro hosting (Vercel) per
          proteggere il sito.
        </li>
      </ul>

      <h2>2. Cookie di marketing (solo con il tuo consenso)</h2>
      <p>
        Oggi il sito <strong>non usa cookie di profilazione o di marketing</strong>. In futuro potremmo usare strumenti
        come il Pixel di Meta per misurare le campagne pubblicitarie: verranno attivati solo se clicchi
        &quot;Accetta&quot; nel banner, e questa pagina verrà aggiornata con l&apos;elenco completo.
      </p>

      <h2>3. Servizi di terze parti</h2>
      <ul>
        <li>
          <strong>Immagini del sito</strong>: alcune sono caricate dalla CDN di Sanity, che riceve i dati tecnici della
          richiesta (come l&apos;indirizzo IP) ma non installa cookie.
        </li>
        <li>
          <strong>WhatsApp</strong>: i pulsanti WhatsApp aprono il servizio di Meta solo quando li clicchi; da quel
          momento valgono le regole privacy di WhatsApp.
        </li>
        <li>
          <strong>Font</strong>: i caratteri sono serviti direttamente dal nostro sito, senza collegarsi a Google Fonts.
        </li>
      </ul>

      <h2>4. Come gestire le preferenze</h2>
      <p>
        Puoi cambiare la tua scelta quando vuoi: <CookiePreferencesLink className="underline underline-offset-2" />.
        Puoi anche cancellare cookie e dati dei siti dalle impostazioni del tuo browser.
      </p>

      <h2>5. Contatti</h2>
      <p>
        Per qualsiasi domanda scrivi a <a href={`mailto:${site.email}`}>{site.email}</a>. Per sapere come trattiamo i
        dati personali leggi la <Link href="/privacy-policy">Privacy policy</Link>.
      </p>
    </LegalPage>
  )
}
