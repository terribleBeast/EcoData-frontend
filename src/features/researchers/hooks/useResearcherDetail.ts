import {
  useGetResearcherByIdQuery,
  useGetResearchesByIdsQuery,
} from "@/api/endpoints";

export const useResearcherDetail = (id: number) => {
  const researcherQuery = useGetResearcherByIdQuery(id, {
    skip: id === -1,
  });

  const researchesQuery = useGetResearchesByIdsQuery(
    researcherQuery.data?.researches_id ?? [],
    {
      skip: !researcherQuery.data,
    },
  );

  return {
    researcherQuery,
    researchesQuery,
  };
};
