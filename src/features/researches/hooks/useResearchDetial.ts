import {
  useGetResearchByIdQuery,
  useGetResearchersByIdsQuery,
} from "@/api/endpoints";
import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo } from "react";

type UUID = string;

type ResearcherIdLike =
  | UUID
  | {
      id?: UUID;
      researcher_id?: UUID;
    }
  | null
  | undefined;

const getResearcherId = (value: ResearcherIdLike): UUID | null => {
  if (!value) return null;

  if (typeof value === "string") {
    return value;
  }

  return value.id ?? value.researcher_id ?? null;
};

export const useResearchDetail = (id?: string) => {
  const researchQuery = useGetResearchByIdQuery(id ? id : skipToken);

  const researcherIds = useMemo(() => {
    const rawIds = researchQuery.data?.researcher_ids ?? [];

    return Array.from(
      new Set(
        rawIds
          .map(getResearcherId)
          .filter((item): item is UUID => Boolean(item)),
      ),
    );
  }, [researchQuery.data?.researcher_ids]);
  console.log(researcherIds);
  const researchersByIdsQueryResult = useGetResearchersByIdsQuery(
    researcherIds.length > 0 ? researcherIds : skipToken,
  );

  const researchersByIdsQuery = useMemo(
    () => ({
      data: researchersByIdsQueryResult.data ?? [],
      isLoading:
        researchQuery.isLoading ||
        researchQuery.isFetching ||
        researchersByIdsQueryResult.isLoading ||
        researchersByIdsQueryResult.isFetching,
      isError: researchQuery.isError || researchersByIdsQueryResult.isError,
      error: researchQuery.error ?? researchersByIdsQueryResult.error,
    }),
    [
      researchersByIdsQueryResult.data,
      researchersByIdsQueryResult.isLoading,
      researchersByIdsQueryResult.isFetching,
      researchersByIdsQueryResult.isError,
      researchersByIdsQueryResult.error,
      researchQuery.isLoading,
      researchQuery.isFetching,
      researchQuery.isError,
      researchQuery.error,
    ],
  );

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
    researcherIds,
  };
};
