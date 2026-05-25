import { useCallback, useState } from "react";
import { useResearchersState } from "./useResearchersState";
import type { IResearcherDataFull } from "@/shared/types/researcher";
import type { ISelectedResearcher } from "../types";

export const useResearchersPage = () => {
  const [selectedResearcher, setSelectedResearcher] =
    useState<ISelectedResearcher | null>(null);
  const {
    researchers,
    getResearchesByIds,
    isLoadingResearchers,
    isErrorResearchers,
    error,
  } = useResearchersState();

  const handleSelectResearcher = useCallback(
    async (researcher: IResearcherDataFull) => {
      const researches = await getResearchesByIds(
        researcher.researches_id,
      ).unwrap();
      setSelectedResearcher({ ...researcher, researches });
    },
    [getResearchesByIds],
  );

  return {
    researchers,
    selectedResearcher,
    handleSelectResearcher,
    isLoadingResearchers,
    isErrorResearchers,
    error,
    closeDetail: () => setSelectedResearcher(null),
  };
};
