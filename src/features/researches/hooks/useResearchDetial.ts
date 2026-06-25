import {
  useGetResearchByIdQuery,
  useGetResearchersByIdsQuery,
} from "@/api/endpoints";
import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo } from "react";

export const useResearchDetail = (id: string) => {
  const researchQuery = useGetResearchByIdQuery(id, { skip: !id });

  const hasIds = researchQuery.data?.researcher_ids?.length;

  const byIdsResult = useGetResearchersByIdsQuery(
    hasIds ? researchQuery.data!.researcher_ids! : skipToken,
  );

  const researchersByIdsQuery = {
    data: byIdsResult.data ?? [],
    isLoading: byIdsResult.isLoading ?? false,
    isError: byIdsResult.isError ?? false,
    error: byIdsResult.error,
  };

  const predictionQuery = useMemo(
    () => ({
      data: undefined,
      isLoading: false,
      isError: false,
      error: undefined,
    }),
    [],
  );

  return {
    researchQuery,
    researchersByIdsQuery,
    predictionQuery,
  };
};
