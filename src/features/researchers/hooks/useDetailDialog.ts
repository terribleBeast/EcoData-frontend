import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import type { IResearcherDataFull } from "@/shared/types/researcher";
import { useNavigate } from "react-router";
import { useResearchersCrud } from "./useResearchersCrud";
import { useGetEntitiesLookup } from "@/shared/hooks/useEntitiesLookup";

export const useDetailDialog = () => {
  const navigate = useNavigate();
  const { researches } = useGetEntitiesLookup();
  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const { create, update, mutationsState } = useResearchersCrud();

  const handleCreateResearcher = async (data: IResearcherDataFull) => {
    try {
      await create(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  const handleEditResearcher = async (data: IResearcherDataFull) => {
    try {
      await update(data);
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
