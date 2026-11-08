import Link from "next/link"
import LegalPage from "@/components/Legal/LegalPage"
import { pageMetadata, site } from "@/lib/seo"

export const metadata = {
  ...pageMetadata({
    title: "Privacy policy",
    description: "Come Convernext tratta i dati personali di chi visita il sito e chiede un contatto.",
    path: "/privacy-policy",
  }),
  robots: { index: false, follow: true },
}

const UPDATED = "6 novembre 2026"

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy policy" updated={UPDATED}>
      <p>
        Questa informativa descrive come vengono trattati i dati personali di chi visita {site.url.replace("https://", "")}{" "}
        e di chi ci contatta, ai sensi del Regolamento (UE) 2016/679 (GDPR) e del D.Lgs. 196/2003.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        {site.name}, {site.address.street}, {site.address.postalCode} {site.address.locality} ({site.address.region}),
        P.IVA {site.vatId}.
        <br />
        Email: <a href={`mailto:${site.email}`}>{site.email}</a> · Telefono: {site.phoneDisplay}
      </p>

      <h2>2. Quali dati trattiamo</h2>
      <ul>
        <li>
          <strong>Dati del modulo di contatto:</strong> nome, email, e se li indichi azienda, telefono, servizio di
          interesse e il contenuto del messaggio.
        </li>
        <li>
          <strong>Messaggi su WhatsApp, email o telefono:</strong> i dati che scegli di condividere quando ci scrivi o ci
          chiami.
        </li>
        <li>
          <strong>Dati di navigazione:</strong> dati tecnici raccolti automaticamente dai server per far funzionare il
          sito e proteggerlo (ad esempio indirizzo IP, browser, pagine richieste, data e ora).
        </li>
        <li>
          <strong>Cookie e strumenti simili:</strong> vedi la <Link href="/cookie-policy">Cookie policy</Link>.
        </li>
      </ul>

      <h2>3. Perché li trattiamo e su quale base</h2>
      <ul>
        <li>
          <strong>Rispondere alle tue richieste</strong> e inviarti preventivi o informazioni sui nostri servizi:
          misure precontrattuali richieste da te (art. 6.1.b GDPR).
        </li>
        <li>
          <strong>Gestire il rapporto</strong> se diventi cliente, e adempiere agli obblighi fiscali e di legge (art.
          6.1.b e 6.1.c GDPR).
        </li>
        <li>
          <strong>Far funzionare e proteggere il sito</strong>: nostro legittimo interesse (art. 6.1.f GDPR).
        </li>
        <li>
          <strong>Misurare le campagne pubblicitarie</strong>, solo se in futuro verranno attivati strumenti di
          marketing e solo con il tuo consenso (art. 6.1.a GDPR), che puoi revocare in ogni momento.
        </li>
      </ul>

      <h2>4. Per quanto tempo</h2>
      <ul>
        <li>Richieste di contatto senza seguito: fino a 24 mesi dall&apos;ultimo scambio.</li>
        <li>Dati dei clienti: per la durata del rapporto e per i tempi previsti dalla legge (fino a 10 anni).</li>
        <li>Dati di navigazione tecnici: per il tempo strettamente necessario, di norma pochi giorni.</li>
      </ul>

      <h2>5. A chi li comunichiamo</h2>
      <p>
        Non vendiamo i tuoi dati. Possono trattarli, per nostro conto e solo per le finalità indicate, i fornitori che
        ci servono a gestire il sito e le comunicazioni:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> (hosting del sito)
        </li>
        <li>
          <strong>Resend</strong> (invio delle email generate dal modulo di contatto)
        </li>
        <li>
          <strong>Sanity</strong> (gestione dei contenuti e delle immagini del sito)
        </li>
        <li>
          <strong>Google</strong> (servizio di posta elettronica)
        </li>
        <li>
          <strong>WhatsApp / Meta</strong>, se scegli di scriverci su WhatsApp
        </li>
      </ul>
      <p>
        Alcuni di questi fornitori hanno sede negli Stati Uniti: il trasferimento avviene sulla base del Data Privacy
        Framework UE-USA o delle Clausole Contrattuali Standard approvate dalla Commissione europea.
      </p>

      <h2>6. I tuoi diritti</h2>
      <p>
        Puoi chiedere in ogni momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento,
        opporti, riceverli in un formato portabile e revocare il consenso dato. Basta scrivere a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Hai anche il diritto di presentare reclamo al Garante per la
        protezione dei dati personali (
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
          garanteprivacy.it
        </a>
        ).
      </p>

      <h2>7. Modifiche</h2>
      <p>
        Questa informativa può essere aggiornata: la data in alto indica l&apos;ultima versione. Per il dettaglio sui
        cookie consulta la <Link href="/cookie-policy">Cookie policy</Link>.
      </p>
    </LegalPage>
  )
}
