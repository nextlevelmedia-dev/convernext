import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
// Le recensioni dal sito arrivano come bozze: "Da approvare" mostra solo quelle,
// "Pubblicate" quelle già visibili sul sito.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Recensioni')
        .child(
          S.list()
            .title('Recensioni')
            .items([
              S.listItem()
                .title('Da approvare')
                .child(
                  S.documentList()
                    .title('Da approvare')
                    .filter('_type == "review" && _id in path("drafts.**")')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Pubblicate')
                .child(
                  S.documentList()
                    .title('Pubblicate')
                    .filter('_type == "review" && !(_id in path("drafts.**"))')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'review'),
    ])
