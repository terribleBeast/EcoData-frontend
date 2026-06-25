import {
  useGetGeneraQuery,
  useGetLeafTypesQuery,
  useGetLifeFormsQuery,
} from "@/api/endpoints";
import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import type { IPlantDataFull, PlantCreate } from "@/shared/types/plant";
import { useNavigate } from "react-router";
import { usePlantsCrud } from "./usePlantsState";

export const useDetailDialog = () => {
  const navigate = useNavigate();

  const { create, update, mutationsState } = usePlantsCrud();

  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const { data: genera = [] } = useGetGeneraQuery();
  const { data: leafTypes = [] } = useGetLeafTypesQuery();
  const { data: lifeForms = [] } = useGetLifeFormsQuery();

  const handleCreatePlant = async (data: IPlantDataFull) => {
    try {
      const payload: PlantCreate = {
        description: data.description,
      };
      await create(payload);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  const handleEditPlant = async (data: IPlantDataFull) => {
    try {
      const payload: PlantCreate = {
        description: data.description,
      };
      await update({ ...payload, entity_id: data.entity_id });
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  return {
    genera,
    leafTypes,
    lifeForms,
    handleCreatePlant,
    handleEditPlant,
    mutationsState,
  };
};
