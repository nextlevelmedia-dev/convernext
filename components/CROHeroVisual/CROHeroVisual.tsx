import Image from "next/image"

/*
 * Hero CRO: test A/B su una pagina prodotto vera (Orvek), due smartphone affiancati.
 * A = originale (senza recensioni, rassicurazioni e pulsante fisso),
 * B = variante con quegli elementi, evidenziati da marcatori.
 * Esempio illustrativo: nessun numero inventato.
 * Solo HTML/CSS, animazioni d'ingresso al primo paint.
 */

const PHONE = { w: 400, h: 842 }

function Marker({ n, label, style }: { n: number; label: string; style: React.CSSProperties }) {
  return (
    <div className="cro2-marker absolute flex items-center gap-1.5" style={style}>
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold !text-white shadow-[0_0_0_3px_rgb(255_255_255/0.9),0_6px_16px_-4px_rgb(124_58_237/0.8)]">
        {n}
      </span>
      <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[9.5px] font-bold !text-slate-900 shadow-[0_8px_20px_-8px_rgb(0_0_0/0.6)] md:text-[10.5px]">
        {label}
      </span>
    </div>
  )
}

export default function CROHeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[600px] select-none pt-4 max-md:-mt-4 max-md:pt-0"
      role="img"
      aria-label="Test A/B su una pagina prodotto: la variante B aggiunge recensioni in evidenza, resi gratuiti in vista e un pulsante d'acquisto sempre visibile."
    >
      <style>{`
        @keyframes cro2-in { from { opacity: 0; transform: translateY(18px) scale(.97); } to { opacity: 1; transform: none; } }
        @keyframes cro2-pop { from { opacity: 0; transform: scale(.8); } to { opacity: 1; transform: none; } }
        @keyframes cro2-glow { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        @keyframes cro2-bar { from { width: 0; } }
        .cro2-in { animation: cro2-in .8s cubic-bezier(.22,1,.36,1) both; }
        .cro2-marker { animation: cro2-pop .5s cubic-bezier(.22,1,.36,1) both; }
        .cro2-glow { animation: cro2-glow 3.2s ease-in-out infinite; }
        .cro2-bar { animation: cro2-bar 1.4s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .cro2-in, .cro2-marker, .cro2-glow, .cro2-bar { animation: none; } }
      `}</style>

      {/* alone del brand */}
      <div aria-hidden className="pointer-events-none absolute inset-[6%] -z-10 bg-[radial-gradient(closest-side_at_30%_45%,rgb(252_3_176/0.26),transparent),radial-gradient(closest-side_at_72%_55%,rgb(4_124_249/0.26),transparent)] blur-2xl" />

      {/* intestazione del test */}
      <div className="cro2-in mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">
        <i className="size-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
        <span className="text-[10.5px] font-bold !text-slate-700 dark:!text-white/80 md:text-[11.5px]">Test A/B · Pagina prodotto</span>
        <span className="text-[10.5px] !text-slate-400 dark:!text-white/40 md:text-[11.5px]">Traffico 50 / 50</span>
      </div>

      <div className="grid grid-cols-2 items-end gap-[6%] px-[4%]">
        {/* A: originale */}
        <div className="cro2-in flex flex-col gap-3" style={{ animationDelay: ".1s" }}>
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-lg bg-slate-200 text-[11px] font-bold !text-slate-700 dark:bg-white/10 dark:!text-white/70">A</span>
            <span className="text-[12px] font-bold !text-slate-600 dark:!text-white/60">Originale</span>
          </div>
          <div className="relative opacity-80 [filter:saturate(.55)]">
            <Image src="/cro/pdp-a.webp" alt="" width={PHONE.w} height={PHONE.h} sizes="(min-width: 1024px) 240px, 40vw" className="h-auto w-full drop-shadow-[0_24px_30px_rgb(0_0_0/0.45)]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider !text-slate-500 dark:!text-white/45">Conversione</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <i className="cro2-bar block h-full w-[42%] rounded-full bg-slate-400 dark:bg-white/35" style={{ animationDelay: ".9s" }} />
            </span>
          </div>
        </div>

        {/* B: variante */}
        <div className="cro2-in flex flex-col gap-3" style={{ animationDelay: ".25s" }}>
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-lg bg-brand-gradient text-[11px] font-bold !text-white">B</span>
            <span className="text-[12px] font-bold !text-slate-900 dark:!text-white">Variante</span>
            <span className="ml-auto hidden whitespace-nowrap rounded-full bg-[#fc03b0]/10 sm:inline px-2 py-0.5 text-[9.5px] font-bold !text-[#fc03b0] ring-1 ring-[#fc03b0]/30">★ Vincente</span>
          </div>
          <div className="relative">
            {/* bordo luminoso col gradient del brand */}
            <div aria-hidden className="cro2-glow absolute -inset-[3px] rounded-[2.4rem] bg-[linear-gradient(140deg,#fc03b0,#7c3aed,#047cf9)] blur-[6px]" />
            <Image src="/cro/pdp-b.webp" alt="" width={PHONE.w} height={PHONE.h} sizes="(min-width: 1024px) 240px, 40vw" className="relative h-auto w-full" />
            {/* cosa cambia */}
            <Marker n={1} label="Resi gratuiti in vista" style={{ top: "3.5%", right: "-8%", animationDelay: "1.1s" }} />
            <Marker n={2} label="Recensioni in evidenza" style={{ top: "47%", left: "-16%", animationDelay: "1.35s" }} />
            <Marker n={3} label="Pulsante sempre visibile" style={{ bottom: "-2.5%", right: "-8%", animationDelay: "1.6s" }} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider !text-slate-500 dark:!text-white/45">Conversione</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <i className="cro2-bar block h-full w-[74%] rounded-full bg-brand-gradient" style={{ animationDelay: "1s" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
