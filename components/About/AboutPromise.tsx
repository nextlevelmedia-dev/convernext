import Link from "next/link"
import { Eyebrow, gradientTitle } from "./SectionHeading"

/** La promessa di Next, con CTA verso il form contatti. */
export default function AboutPromise({
  eyebrow,
  title,
  text,
  ctaText,
  ctaHref = "#contatti",
  ctaSubText,
}: {
  eyebrow?: string
  title?: string
  text?: string
  ctaText?: string
  ctaHref?: string
  ctaSubText?: string
}) {
  if (!title) return null

  return (
    <section className="relative px-5 py-12 md:px-8 xl:px-10">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[36px] border border-slate-200 bg-white px-6 py-20 text-center shadow-[0_1px_2px_rgb(15_23_42/0.04),0_24px_60px_-24px_rgb(15_23_42/0.18)] sm:px-12 md:py-24 dark:border-white/10 dark:bg-[#0f1726]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_15%_0%,rgb(252_3_176/0.14),transparent_70%),radial-gradient(50%_60%_at_85%_100%,rgb(4_124_249/0.14),transparent_70%)]"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2
            className="mt-5 text-4xl leading-[1.2] tracking-tight text-slate-950 md:text-[42px] dark:text-white"
            style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
          >
            {gradientTitle(title)}
          </h2>
          {text && <p className="mt-5 text-lg leading-8 text-black/65 dark:text-white/70">{text}</p>}

          {ctaText && (
            <Link
              href={ctaHref}
              className="group/btn mt-10 inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-8 text-base font-bold !text-white shadow-[0_12px_32px_-10px_rgb(124_58_237/0.55)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_18px_44px_-12px_rgb(252_3_176/0.6)] active:scale-[0.98]"
            >
              {ctaText}
              <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </Link>
          )}
          {ctaSubText && <p className="mt-4 text-sm text-slate-500 dark:text-white/55">{ctaSubText}</p>}
        </div>
      </div>
    </section>
  )
}
