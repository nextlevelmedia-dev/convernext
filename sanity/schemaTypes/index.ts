import { type SchemaTypeDefinition } from "sanity"
import { pageType } from "./page"
import { projectType } from "./project"
import { reviewType } from "./review"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, projectType, reviewType],
}