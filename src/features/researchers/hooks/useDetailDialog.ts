import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import type { ResearcherCreate } from "@/shared/types/researcher";
import { useNavigate } from "react-router";
import { useResearchersCrud } from "./useResearchersCrud";
import { useGetEntitiesLookup } from "@/shared/hooks/useEntitiesLookup";

export const useDetailDialog = (researcherId?: string) => {
  const navigate = useNavigate();
  const { researches } = useGetEntitiesLookup();
  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const { create, update, mutationsState } = useResearchersCrud();

  const handleCreateResearcher = async (data: ResearcherCreate) => {
    try {
      await create(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  const handleEditResearcher = async (data: ResearcherCreate) => {
    if (!researcherId) return;
    try {
      await update({ entity_id: researcherId, ...data });
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };

  return {
    researches,
    handleCreateResearcher,
    handleEditResearcher,
    mutationsState,
  };
};
