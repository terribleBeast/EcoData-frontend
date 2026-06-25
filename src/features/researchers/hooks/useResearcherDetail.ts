import {
  useGetResearcherByIdQuery,
  useGetResearchesByIdsQuery,
} from "@/api/endpoints";

export const useResearcherDetail = (id: string) => {
  const researcherQuery = useGetResearcherByIdQuery(id, {
    skip: !id,
  });

  const researchesQuery = useGetResearchesByIdsQuery([], {
    skip: true,
  });

  return {
    researcherQuery,
    researchesQuery,
  };
};
