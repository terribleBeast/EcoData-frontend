import { useState } from "react";
import type { ISelectedResearch } from "../types";
import { useResearchesState } from "./useResearchesState";
import type { IResearchDataFull } from "@/shared/types/research";

export const useResearchesPage = () => {
  const {
    researches,
    isLoading,
    isError,
    error,
    getResearchersByIds,
    getPredictionResults,
  } = useResearchesState();
  const [selectedResearch, setSelectedResearch] =
    useState<ISelectedResearch | null>(null);

  const handleSelectResearch = async (research: IResearchDataFull) => {
    const researchers = await getResearchersByIds(
      research.researchers_id,
    ).unwrap();
    const results = await getPredictionResults(research.id).unwrap();
    setSelectedResearch({ ...research, researchers, results });
  };

  return {
    researches,
    isLoading,
    isError,
    error,
    selectedResearch,
    handleSelectResearch,
    onCloseFullInfo: () => setSelectedResearch(null),
  };
};
