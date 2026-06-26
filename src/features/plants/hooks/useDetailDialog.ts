import {
  useGetGeneraQuery,
  useGetLeafTypesQuery,
  useGetLifeFormsQuery,
  useGetPlantLocationsQuery,
} from "@/api/endpoints";
import type { IPlantFormData } from "@/shared/types/plant";

import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import { useNavigate } from "react-router";
import { usePlantsCrud } from "./usePlantsState";

export const useDetailDialog = () => {
  const navigate = useNavigate();

  const { create, update, mutationsState } = usePlantsCrud();

  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const { data: genera = [] } = useGetGeneraQuery();
  const { data: leafTypes = [] } = useGetLeafTypesQuery();
  const { data: lifeForms = [] } = useGetLifeFormsQuery();
  const { data: locations = [] } = useGetPlantLocationsQuery();

  const handleCreatePlant = async (data: IPlantFormData) => {
    try {
      await create(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };

  const handleEditPlant = async (data: IPlantFormData) => {
    try {
      await update(data as IPlantFormData & { id: string });
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };

  return {
    locations,
    genera,
    leafTypes,
    lifeForms,
    handleCreatePlant,
    handleEditPlant,
    mutationsState,
  };
};
