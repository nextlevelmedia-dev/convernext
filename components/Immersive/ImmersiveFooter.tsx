import FooterContent from "@/components/Footer/FooterContent"
import { WhatsAppButton } from "./whatsapp"
import OceanBackdrop from "./OceanBackdrop"

/*
 * Footer della landing: chiude la storia come i titoli di coda.
 * Sopra la CTA finale sul monogramma CN, sotto contatti e link essenziali.
 * Sostituisce il footer del sito solo su questa pagina (vedi SiteFooter).
 */

const archivo = { fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 } as const

export default function ImmersiveFooter() {
  return (
    <footer id="contatto" data-medusa="right" className="relative overflow-hidden">
      {/* CTA finale sul monogramma */}
      <div className="relative flex min-h-svh items-end px-5 pb-20 pt-40 md:items-center md:px-8 md:py-32 xl:px-10">
        <div aria-hidden className="absolute inset-0">
          <OceanBackdrop />
          {/* il CN si spegne verso il basso, nel buio dei titoli di coda */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05040a]/85 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl text-center md:pt-[46svh]">
          <h2
            className="mx-auto max-w-4xl text-[clamp(2.2rem,5vw,4.6rem)] leading-[1.04] tracking-[-0.03em] !text-white"
            style={archivo}
          >
            Il prossimo progetto memorabile{" "}
            {/* gradient solo su mobile: su desktop il CN dietro è già abbastanza colorato */}
            <em className="bg-brand-gradient bg-clip-text not-italic text-transparent md:!bg-none md:!text-white">
              potrebbe essere il tuo.
            </em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 !text-white/70">
            Scrivici su WhatsApp: ci racconti il tuo brand, ti proponiamo l&apos;esperienza giusta. Risposta entro 24 ore,
            senza impegno.
          </p>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton />
          </div>
        </div>
      </div>

      {/* stesso footer di tutto il sito */}
      <div className="border-t border-white/10">
        <FooterContent />
      </div>
    </footer>
  )
}
