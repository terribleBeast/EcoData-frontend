import { useLazyGetResearchesByIdsQuery } from "@/api/endpoints/research";

import { useGetResearchersQuery } from "@/api/endpoints";

export const useResearchersState = () => {
  const {
    data: researchers = [],
    isLoading: isLoadingResearchers,
    isError: isErrorResearchers,
    error,
  } = useGetResearchersQuery();

  const [getResearchesByIds] = useLazyGetResearchesByIdsQuery();
  return {
    researchers,
    getResearchesByIds,
    isLoadingResearchers,
    isErrorResearchers,
    error,
  };
};
