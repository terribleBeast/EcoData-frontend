import {
  useGetPredictionQuery,
  useGetResearchByIdQuery,
  useGetResearchersByIdsQuery,
} from "@/api/endpoints";

export const useResearchDetail = (id: number) => {
  const researchQuery = useGetResearchByIdQuery(id, { skip: id === -1 });
  const predictionQuery = useGetPredictionQuery(researchQuery.data?.id ?? -1, {
    skip: !researchQuery.data,
  });
  const researchersQuery = useGetResearchersByIdsQuery(
    researchQuery.data?.researchers_id ?? [],
    { skip: !researchQuery.data },
  );

  return { researchQuery, researchersQuery, predictionQuery };
};
