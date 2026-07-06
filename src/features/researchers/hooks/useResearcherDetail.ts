import {
  useGetResearcherByIdQuery,
  useGetResearchesQuery,
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

export const useResearcherDetail = (id?: UUID) => {
  const researcherQuery = useGetResearcherByIdQuery(id ?? skipToken);
  const researchesQueryRaw = useGetResearchesQuery();

  const researches = useMemo(() => {
    if (!id) return [];

    return (researchesQueryRaw.data ?? []).filter((research) => {
      const researcherIds = research.researcher_ids ?? [];

      return researcherIds.map(getResearcherId).filter(Boolean).includes(id);
    });
  }, [researchesQueryRaw.data, id]);

  const researchesQuery = {
    data: researches,
    isLoading: researchesQueryRaw.isLoading || researchesQueryRaw.isFetching,
    isError: researchesQueryRaw.isError,
    error: researchesQueryRaw.error,
  };

  return {
    researcherQuery,
    researchesQuery,
  };
};
