import type { ReactNode } from "react"

/**
 * Icone dei benefit, disegnate a tratto su una griglia 24×24.
 * Ogni elemento ha pathLength=1 così l'animazione d'ingresso le "disegna".
 */
const p = (d: string) => <path d={d} pathLength={1} />
const c = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} pathLength={1} />
const r = (x: number, y: number, w: number, h: number, rx = 2) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} pathLength={1} />
)

export const BENEFIT_ICONS = {
  cart: [
    p("M3 4h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2"),
    c(9.5, 19.5, 1.3),
    c(17, 19.5, 1.3),
    p("M13.2 13V8.6"),
    p("M11.2 10.4l2-2 2 2"),
  ],
  box: [
    p("M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"),
    p("M4 7.5l8 4.5 8-4.5"),
    p("M12 12v9"),
    p("M8 5.3l8 4.5"),
  ],
  payment: [r(2.5, 5, 19, 14, 2.5), p("M2.5 9.5h19"), p("M6 14.5h4"), p("M14.5 14.5h3")],
  growth: [
    p("M4 20.5h16"),
    p("M7 20.5v-3.5"),
    p("M12 20.5v-6"),
    p("M17 20.5v-8.5"),
    p("M4 11l5-5 3 3 6-6"),
    p("M15 3h3v3"),
  ],
  target: [c(11, 13, 8), c(11, 13, 4.5), p("M11 13L20 4"), p("M16.5 4H20v3.5")],
  message: [
    p("M4 5h16a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 17h-9.5L6 20.5V17H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 5z"),
    p("M7 9.5h10"),
    p("M7 13h6"),
  ],
  sliders: [
    p("M4 7h9"),
    p("M17 7h3"),
    c(15, 7, 2),
    p("M4 12h5"),
    p("M13 12h7"),
    c(11, 12, 2),
    p("M4 17h2"),
    p("M10 17h10"),
    c(8, 17, 2),
  ],
  layers: [p("M12 3l9 4.5-9 4.5-9-4.5L12 3z"), p("M3 12l9 4.5 9-4.5"), p("M3 16.5L12 21l9-4.5")],
  funnel: [p("M3.5 4.5h17l-6.5 8v6l-4 2v-8l-6.5-8z"), p("M7.2 9h9.6")],
  abtest: [
    r(2.5, 5, 8, 14),
    r(13.5, 5, 8, 14),
    p("M4.7 15l1.8-6 1.8 6"),
    p("M5.3 13h2.4"),
    p("M15.4 12.3l1.6 1.6 2.8-3.2"),
  ],
  copy: [p("M15.5 4.5l4 4L9 19H5v-4L15.5 4.5z"), p("M13.5 6.5l4 4"), p("M13 20h7")],
  report: [r(5, 3.5, 14, 17), p("M9 7.5h6"), p("M9 16.5v-3"), p("M12 16.5v-5"), p("M15 16.5v-2")],
  sections: [r(3, 4, 18, 16), p("M3 9h18"), p("M9 9v11"), p("M15 12.5v4"), p("M13 14.5h4")],
  editor: [r(3, 4, 18, 13), p("M3 8h18"), p("M6 11.5h4"), p("M6 14h2.5"), p("M13 11.5l6 2.2-2.6 1-1 2.6L13 11.5z")],
  tutorial: [r(3, 4.5, 18, 12.5), p("M10.5 8.2v5.1l4.2-2.55-4.2-2.55z"), p("M8 20.5h8")],
  speed: [
    p("M4.5 18a8.5 8.5 0 1 1 15 0"),
    p("M12.9 13.1L16.5 9"),
    c(12, 14, 1.4),
    p("M12 5.5V7"),
    p("M6.6 8l1 1"),
    p("M17.4 8l-1 1"),
  ],
  strategy: [c(12, 12, 9), p("M15.8 8.2l-2.2 5.4-5.4 2.2 2.2-5.4 5.4-2.2z"), p("M12 3v1.6"), p("M12 19.4V21"), p("M3 12h1.6"), p("M19.4 12H21")],
  sitemap: [r(9, 2.5, 6, 4.5, 1.5), r(2.5, 16.5, 6, 4.5, 1.5), r(9, 16.5, 6, 4.5, 1.5), r(15.5, 16.5, 6, 4.5, 1.5), p("M12 7v4.5"), p("M5.5 16.5V14a2.5 2.5 0 0 1 2.5-2.5h8a2.5 2.5 0 0 1 2.5 2.5v2.5"), p("M12 11.5v5")],
  prototype: [r(2.5, 4, 19, 14.5), p("M2.5 8h19"), p("M5 6h.01"), p("M7.5 6h.01"), r(5.5, 10.5, 6, 5, 1), p("M14 11h4.5"), p("M14 13.5h3"), p("M10 21h4")],
  code: [p("M8.5 8L4 12l4.5 4"), p("M15.5 8L20 12l-4.5 4"), p("M13.5 5l-3 14")],
  spark: [p("M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"), p("M19 3.5v3"), p("M17.5 5h3")],
} satisfies Record<string, ReactNode[]>

export type BenefitIconName = keyof typeof BENEFIT_ICONS

/**
 * Sceglie l'icona dal testo della card: prima cerca nel titolo, poi nella
 * descrizione. L'ordine conta (es. "veloce … convertire" → speed, non cart).
 */
const RULES: [BenefitIconName, RegExp][] = [
  ["speed", /velo|rapid|performan|caricament|core web vital/],
  ["prototype", /prototip|testabil|preview|anteprima/],
  ["abtest", /\ba\/?b\b|\btest\b|testing/],
  ["strategy", /strategi|progettazion|obiettiv/],
  ["funnel", /funnel|audit|analisi/],
  ["tutorial", /tutorial|formazion|video|guida/],
  ["sitemap", /architettur|sitemap|wireframe|struttur/],
  ["code", /sviluppo|codice|svilupp/],
  ["report", /report|\bdati\b|misurabil|kpi|analytics/],
  ["copy", /copy|testi|persuasiv|scrittur/],
  ["editor", /editor|autonomi/],
  ["sections", /sezion|immersiv|custom|design|layout|su misura/],
  ["payment", /pagament|spedizion|checkout/],
  ["box", /prodott|catalog|inventari/],
  ["target", /contatt|lead|qualificat|clienti/],
  ["message", /messaggi|chiar|comunica|brand/],
  ["layers", /piattaform|integrazion/],
  ["growth", /cresc|scal|aument/],
  ["cart", /vendit|acquist|carrell|ordini|convers|convert/],
  ["sliders", /gestion|gestisci|semplic|facil/],
]

export function pickBenefitIcon(title = "", description = ""): BenefitIconName {
  for (const text of [title, description]) {
    const t = text.toLowerCase()
    const hit = RULES.find(([, re]) => re.test(t))
    if (hit) return hit[0]
  }
  return "spark"
}
