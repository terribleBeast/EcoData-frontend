import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import type { ILabDataFull } from "@/shared/types/lab";
import { useNavigate } from "react-router";
import { useLabsCrud } from "./useLabsState";

export const useDetailDialog = () => {
  const navigate = useNavigate();

  const { create, update, mutationsState } = useLabsCrud();

  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const handleCreateLab = async (data: ILabDataFull) => {
    try {
      await create(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  const handleEditLab = async (data: ILabDataFull) => {
    try {
      await update(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  return {
    handleCreateLab,
    handleEditLab,
    mutationsState,
  };
};
