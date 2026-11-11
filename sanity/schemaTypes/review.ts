import { defineField, defineType } from "sanity"

/*
 * Recensione lasciata dal cliente tramite /lascia-una-recensione.
 * Arriva come BOZZA: la recensione compare sul sito solo dopo "Publish".
 */

export const REVIEW_SERVICES = [
  { title: "Siti web", value: "siti-web" },
  { title: "E-commerce", value: "ecommerce" },
  { title: "Ottimizzazione conversioni (CRO)", value: "ottimizzazione-conversioni" },
] as const

export const reviewType = defineType({
  name: "review",
  title: "Recensione",
  type: "document",
  fields: [
    defineField({
      name: "authorName",
      title: "Nome e cognome",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "company",
      title: "Azienda",
      type: "string",
    }),
    defineField({
      name: "service",
      title: "Servizio",
      type: "string",
      options: { list: [...REVIEW_SERVICES], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stars",
      title: "Valutazione",
      type: "number",
      options: { list: [5, 4, 3, 2, 1] },
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({
      name: "reviewTitle",
      title: "Titolo",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reviewText",
      title: "Recensione",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authorPhoto",
      title: "Foto del titolare",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "companyLogo",
      title: "Logo aziendale",
      type: "image",
    }),
    defineField({
      name: "website",
      title: "Sito web",
      type: "url",
    }),
    defineField({
      name: "consent",
      title: "Consenso alla pubblicazione",
      type: "boolean",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Inviata il",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    { title: "Più recenti", name: "recent", by: [{ field: "submittedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "authorName", subtitle: "reviewTitle", media: "authorPhoto", company: "company", stars: "stars" },
    prepare: ({ title, subtitle, media, company, stars }) => ({
      title: `${title}${company ? ` · ${company}` : ""}`,
      subtitle: `${"★".repeat(stars ?? 0)} ${subtitle ?? ""}`,
      media,
    }),
  },
})
