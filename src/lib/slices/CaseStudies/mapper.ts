import * as prismic from "@prismicio/client";

export default async function mapper({
  slice,
  context,
}: {
  slice: prismic.Content.CaseStudiesSlice;
  context: { client: prismic.Client<prismic.Content.AllDocumentTypes> };
}) {
  const caseStudies = await Promise.all(
    slice.primary.items
      .map(async (item) => {
        if (prismic.isFilled.contentRelationship(item.case_study)) {
          return /** @type {prismic.Content.CaseStudyDocument} */ await context.client.getByID(
            item.case_study.id,
          );
        }
      })
      .filter(Boolean),
  );
  return {
    slice,
    caseStudies,
  };
}
