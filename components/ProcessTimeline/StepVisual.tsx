import type { ReactNode } from "react"
import type { BenefitIconName } from "../BenefitsSection/benefitIcons"

/**
 * Mini illustrazioni degli step, in stile interfaccia. Si "accendono" quando
 * lo step è attivo (barre che crescono, elementi che compaiono).
 * Testi in <div> per non subire le regole globali del dark sui <span>/<p>.
 */

const PANEL =
  "relative h-full min-h-[230px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3.5 sm:p-5 md:min-h-[260px] dark:border-white/10 dark:bg-[#0b1220]"
const BOX = "rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]"
const LABEL = "font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 dark:text-white/45"
const TEXT = "text-xs font-bold text-slate-700 dark:text-white/85"
const SKEL = "rounded-full bg-slate-200 dark:bg-white/10"
const GRAD = "bg-[linear-gradient(90deg,#fc03b0,#047cf9)]"
const EASE = "transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"

function Panel({ children, tag }: { children: ReactNode; tag?: string }) {
  return (
    <div className={PANEL}>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.04)_1px,transparent_1px),linear-gradient(rgb(15_23_42/0.04)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_10%,rgb(252_3_176/0.10),transparent_70%),radial-gradient(60%_60%_at_10%_95%,rgb(4_124_249/0.10),transparent_70%)]"
      />
      {tag && <div className={`absolute left-3.5 top-3 z-10 sm:left-5 sm:top-4 ${LABEL}`}>{tag}</div>}
      <div className="relative flex h-full flex-col justify-center pt-5">{children}</div>
    </div>
  )
}

const w = (on: boolean, pct: number) => ({ width: on ? `${pct}%` : "0%" })
const show = (on: boolean) => `${EASE} ${on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`

function Strategy({ on }: { on: boolean }) {
  const chips = [
    ["Obiettivo", "Più ordini", "left-0 top-2"],
    ["Target", "Chi compra", "right-0 top-10"],
    ["Messaggio", "Perché noi", "bottom-1 left-6"],
  ]
  return (
    <Panel tag="Brief strategico">
      <div className="relative mx-auto h-[200px] w-full max-w-[300px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[150, 104, 58].map((s, i) => (
            <div
              key={s}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
                i === 2 ? "border-transparent bg-[linear-gradient(135deg,#fc03b0,#047cf9)] opacity-90" : "border-slate-300 dark:border-white/15"
              } ${EASE} ${on ? "scale-100" : "scale-75"}`}
              style={{ width: s, height: s, transitionDelay: `${i * 120}ms` }}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow" />
        </div>
        {chips.map(([k, v, pos], i) => (
          <div key={k} className={`absolute ${pos} ${BOX} px-3 py-2 shadow-sm ${show(on)}`} style={{ transitionDelay: `${300 + i * 150}ms` }}>
            <div className={LABEL}>{k}</div>
            <div className={`mt-0.5 ${TEXT}`}>{v}</div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function Sitemap({ on }: { on: boolean }) {
  return (
    <Panel tag="Sitemap">
      <div className="mx-auto flex w-full max-w-[320px] flex-col items-center">
        <div className={`rounded-xl px-4 py-2 text-xs font-bold text-white ${GRAD} ${show(on)}`} style={{ transitionDelay: `${0}ms` }}>Home</div>
        <div className={`h-5 w-px bg-slate-300 dark:bg-white/20 ${show(on)}`} style={{ transitionDelay: `${100}ms` }} />
        <div className={`h-px w-[68%] bg-slate-300 dark:bg-white/20 ${show(on)}`} style={{ transitionDelay: `${150}ms` }} />
        <div className="grid w-full grid-cols-3 gap-3">
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex flex-col items-center">
              <div className={`h-4 w-px bg-slate-300 dark:bg-white/20 ${show(on)}`} style={{ transitionDelay: `${200}ms` }} />
              <div className={`w-full ${BOX} px-2 py-2 ${show(on)}`} style={{ transitionDelay: `${250 + col * 120}ms` }}>
                <div className={`mx-auto h-2 w-3/4 ${SKEL}`} />
              </div>
              {[0, 1].map((leaf) => (
                <div key={leaf} className="flex w-full flex-col items-center">
                  <div className={`h-3 w-px bg-slate-300 dark:bg-white/20 ${show(on)}`} style={{ transitionDelay: `${400 + col * 120}ms` }} />
                  <div
                    className={`w-[82%] rounded-lg border border-dashed border-slate-300 px-2 py-1.5 dark:border-white/15 ${show(on)}`} style={{ transitionDelay: `${450 + col * 120 + leaf * 80}ms` }}
                  >
                    <div className={`mx-auto h-1.5 w-2/3 ${SKEL}`} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function Prototype({ on }: { on: boolean }) {
  return (
    <Panel tag="Preview navigabile">
      <div className={`relative mx-auto w-full max-w-[340px] overflow-hidden ${BOX} shadow-lg`}>
        <div className="flex items-center gap-1.5 border-b border-slate-200 px-3 py-2 dark:border-white/10">
          <div className="size-2 rounded-full bg-[#ff5f57]" />
          <div className="size-2 rounded-full bg-[#febc2e]" />
          <div className="size-2 rounded-full bg-[#28c840]" />
          <div className={`ml-2 h-3 flex-1 ${SKEL}`} />
        </div>
        <div className="space-y-2.5 p-3">
          <div className={`h-16 rounded-lg bg-[linear-gradient(120deg,rgb(252_3_176/0.18),rgb(4_124_249/0.18))] ${show(on)}`} style={{ transitionDelay: `${100}ms` }} />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-12 rounded-lg bg-slate-100 dark:bg-white/[0.06] ${show(on)}`} style={{ transitionDelay: `${250 + i * 100}ms` }} />
            ))}
          </div>
          <div className={`h-2 w-2/3 ${SKEL}`} />
          <div className={`h-2 w-1/2 ${SKEL}`} />
        </div>
        <div
          aria-hidden
          className={`absolute size-4 rounded-full border-2 border-white bg-[#7c3aed] shadow-[0_0_0_6px_rgb(124_58_237/0.2)] ${
            on ? "animate-[step-cursor_4s_ease-in-out_infinite]" : "opacity-0"
          }`}
          style={{ left: "30%", top: "45%" }}
        />
      </div>
      <div className={`absolute bottom-4 right-4 flex items-center gap-2 ${BOX} px-3 py-1.5 shadow ${show(on)}`} style={{ transitionDelay: `${600}ms` }}>
        <div className="size-2 animate-pulse rounded-full bg-[#28c840]" />
        <div className={TEXT}>Online in anteprima</div>
      </div>
    </Panel>
  )
}

function Funnel({ on }: { on: boolean }) {
  const rows: [string, number][] = [
    ["Visite", 100],
    ["Prodotto", 64],
    ["Carrello", 32],
    ["Checkout", 14],
  ]
  return (
    <Panel tag="Analisi del funnel">
      <div className="mx-auto w-full max-w-[340px] space-y-3">
        {rows.map(([k, v], i) => (
          <div key={k}>
            <div className="mb-1 flex justify-between">
              <div className={TEXT}>{k}</div>
              <div className={LABEL}>{v}%</div>
            </div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
              <div className={`h-full rounded-full ${GRAD} ${EASE}`} style={{ ...w(on, v), transitionDelay: `${i * 140}ms` }} />
            </div>
          </div>
        ))}
        <div className={`mt-2 inline-flex items-center gap-2 rounded-full border border-[#fc03b0]/30 bg-[#fc03b0]/10 px-3 py-1 ${show(on)}`} style={{ transitionDelay: `${700}ms` }}>
          <div className="size-1.5 rounded-full bg-[#fc03b0]" />
          <div className="text-[11px] font-bold text-[#c0027f] dark:text-[#ff6fd0]">Punto di abbandono trovato</div>
        </div>
      </div>
    </Panel>
  )
}

function AbTest({ on }: { on: boolean }) {
  const variants: [string, number, boolean][] = [
    ["A", 38, false],
    ["B", 74, true],
  ]
  return (
    <Panel tag="A/B test">
      <div className="mx-auto grid w-full max-w-[340px] grid-cols-2 gap-3">
        {variants.map(([k, v, win], i) => (
          <div
            key={k}
            className={`${BOX} p-3 ${win && on ? "border-transparent shadow-[0_0_0_1.5px_#7c3aed,0_12px_30px_-12px_rgb(124_58_237/0.6)]" : ""} ${EASE}`}
          >
            <div className="flex items-center justify-between">
              <div className={`grid size-6 place-items-center rounded-md text-[11px] font-bold ${win ? `${GRAD} text-white` : "bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-white/70"}`}>
                {k}
              </div>
              {win && <div className={`text-[11px] font-bold text-[#7c3aed] dark:text-[#b18cff] ${show(on)}`} style={{ transitionDelay: `${900}ms` }}>Vince</div>}
            </div>
            <div className={`mt-3 h-10 rounded-lg ${win ? "bg-[linear-gradient(120deg,rgb(252_3_176/0.16),rgb(4_124_249/0.16))]" : "bg-slate-100 dark:bg-white/[0.06]"}`} />
            <div className={`mt-2 h-1.5 w-3/4 ${SKEL}`} />
            <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className={`h-full rounded-full ${win ? GRAD : "bg-slate-400 dark:bg-white/30"} ${EASE}`}
                style={{ ...w(on, v), transitionDelay: `${300 + i * 150}ms` }}
              />
            </div>
            <div className={`mt-1.5 ${LABEL}`}>Conversione</div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function Report({ on }: { on: boolean }) {
  return (
    <Panel tag="Report settimanale">
      <div className="mx-auto w-full max-w-[340px]">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {["CVR", "AOV", "ROAS"].map((k, i) => (
            <div key={k} className={`${BOX} px-2.5 py-2 ${show(on)}`} style={{ transitionDelay: `${150 + i * 120}ms` }}>
              <div className={LABEL}>{k}</div>
              <div className="mt-0.5 text-sm font-bold text-[#16a34a] dark:text-[#4ade80]">↑</div>
            </div>
          ))}
        </div>
        <div className={`${BOX} p-3`}>
          <svg viewBox="0 0 300 110" className="h-[110px] w-full" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="step-report-line" x1="0" x2="1">
                <stop offset="0" stopColor="#fc03b0" />
                <stop offset="1" stopColor="#047cf9" />
              </linearGradient>
              <linearGradient id="step-report-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7c3aed" stopOpacity="0.25" />
                <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 92 L40 84 L80 88 L120 66 L160 70 L200 48 L240 40 L300 14 L300 110 L0 110Z"
              fill="url(#step-report-area)"
              className={`${EASE} ${on ? "opacity-100" : "opacity-0"}`}
            />
            <path
              d="M0 92 L40 84 L80 88 L120 66 L160 70 L200 48 L240 40 L300 14"
              stroke="url(#step-report-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 1.4s cubic-bezier(0.65,0,0.35,1) 200ms" }}
            />
          </svg>
        </div>
      </div>
    </Panel>
  )
}

function Code({ on }: { on: boolean }) {
  const lines: [number, string, string][] = [
    [0, "text-[#c084fc]", "{% schema %}"],
    [1, "text-slate-500 dark:text-white/60", '"name": "Hero",'],
    [1, "text-slate-500 dark:text-white/60", '"settings": ['],
    [2, "text-[#38bdf8]", '{ "type": "image" },'],
    [2, "text-[#38bdf8]", '{ "type": "text" },'],
    [2, "text-[#f472b6]", '{ "type": "color" }'],
    [1, "text-slate-500 dark:text-white/60", "]"],
    [0, "text-[#c084fc]", "{% endschema %}"],
  ]
  return (
    <Panel tag="sections/hero.liquid">
      <div className={`mx-auto w-full max-w-[340px] ${BOX} p-4 font-mono text-[11px] leading-6`}>
        {lines.map(([indent, color, text], i) => (
          <div key={i} className={`flex gap-3 ${show(on)}`} style={{ transitionDelay: `${i * 90}ms` }}>
            <div className="w-4 select-none text-right text-slate-300 dark:text-white/25">{i + 1}</div>
            <div className={`whitespace-nowrap ${color}`} style={{ paddingLeft: indent * 12 }}>
              {text}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function Tutorial({ on }: { on: boolean }) {
  const chapters = ["Creare una pagina", "Lanciare una promo", "Nuova collezione"]
  return (
    <Panel tag="Tutorial del tema">
      <div className="mx-auto w-full max-w-[340px]">
        <div className={`relative grid h-[120px] place-items-center overflow-hidden rounded-xl bg-[linear-gradient(120deg,rgb(252_3_176/0.22),rgb(4_124_249/0.22))]`}>
          <div className={`grid size-12 place-items-center rounded-full bg-white shadow-lg ${EASE} ${on ? "scale-100" : "scale-75"}`}>
            <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-[#7c3aed]">
              <path d="M8 5.5v13l10.5-6.5L8 5.5z" />
            </svg>
          </div>
          <div className="absolute inset-x-3 bottom-3 h-1 rounded-full bg-white/40">
            <div className={`h-full rounded-full bg-white ${EASE}`} style={{ ...w(on, 42), transitionDuration: "2200ms" }} />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {chapters.map((c, i) => (
            <div key={c} className={`flex items-center gap-3 ${BOX} px-3 py-2 ${show(on)}`} style={{ transitionDelay: `${300 + i * 130}ms` }}>
              <div className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${i === 0 ? `${GRAD} text-white` : "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-white/60"}`}>
                {i + 1}
              </div>
              <div className={TEXT}>{c}</div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

const VISUALS: Partial<Record<BenefitIconName, (p: { on: boolean }) => ReactNode>> = {
  strategy: Strategy,
  sitemap: Sitemap,
  prototype: Prototype,
  editor: Prototype,
  funnel: Funnel,
  abtest: AbTest,
  report: Report,
  code: Code,
  sections: Code,
  tutorial: Tutorial,
}

export default function StepVisual({ name, on }: { name: BenefitIconName; on: boolean }) {
  const Visual = VISUALS[name] ?? Prototype
  return <Visual on={on} />
}
