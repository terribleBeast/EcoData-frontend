import { skipToken } from "@reduxjs/toolkit/query";

import {
  useGetResearcherByIdQuery,
  useGetResearchesQuery,
} from "@/api/endpoints";

import type { IResearchData } from "@/shared/types/research";

const getResearcherId = (value: unknown): string | null => {
  if (!value) return null;

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object") {
    const item = value as Record<string, unknown>;

    return (
      (item.id as string | undefined) ??
      (item.researcher_id as string | undefined) ??
      null
    );
  }

  return null;
};

const researchHasResearcher = (
  research: IResearchData,
  researcherId?: string,
): boolean => {
  if (!researcherId) return false;

  const rawResearcherIds =
    research.researcher_ids ?? research.researchers_id ?? [];

  const participantIds = rawResearcherIds.map(getResearcherId).filter(Boolean);

  const createdById =
    research.created_by_researcher_id ?? getResearcherId(research.created_by);

  return participantIds.includes(researcherId) || createdById === researcherId;
};

export const useResearcherDetail = (id?: string) => {
  const researcherQuery = useGetResearcherByIdQuery(id ?? skipToken);
  const allResearchesQuery = useGetResearchesQuery();

  const researchesQuery = {
    data: allResearchesQuery.data?.filter((research) =>
      researchHasResearcher(research, id),
    ),
    isLoading: allResearchesQuery.isLoading,
    isError: allResearchesQuery.isError,
    error: allResearchesQuery.error,
  };

  return {
    researcherQuery,
    researchesQuery,
  };
};
