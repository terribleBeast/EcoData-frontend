import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import type { IResearchDataFull } from "@/shared/types/research";
import { useNavigate } from "react-router";
import { useResearchesCrud } from "./useResearchesCrud";
import { useGetEntitiesLookup } from "@/shared/hooks/useEntitiesLookup";

export const useDetailDialog = () => {
  const navigate = useNavigate();

  const { create, update, mutationsState } = useResearchesCrud();
  const { researchers } = useGetEntitiesLookup();

  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const handleCreateResearch = async (data: IResearchDataFull) => {
    try {
      await create(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  const handleEditResearch = async (data: IResearchDataFull) => {
    try {
      await update(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  return {
    researchers,
    handleCreateResearch,
    handleEditResearch,
    state: mutationsState,
  };
};
