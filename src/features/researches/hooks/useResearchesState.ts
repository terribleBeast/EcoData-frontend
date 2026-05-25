import {
  useGetResearchesQuery,
  useLazyGetPredictionQuery,
  useLazyGetResearchersByIdsQuery,
} from "@/api/endpoints";

export const useResearchesState = () => {
  const {
    data: researches = [],
    isLoading,
    isError,
    error,
  } = useGetResearchesQuery();
  console.log(isLoading);
  const [getPredictionResults] = useLazyGetPredictionQuery();
  const [getResearchersByIds] = useLazyGetResearchersByIdsQuery();
  return {
    researches,
    isLoading,
    isError,
    error,
    getResearchersByIds,
    getPredictionResults,
  };
};
