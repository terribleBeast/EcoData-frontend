import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreatePlantMutation,
  useDeletePlantMutation,
  useEditPlantMutation,
  useLazyGetPlantByIdQuery,
  useGetPlantsQuery,
} from "@/api/endpoints";

export const usePlantsCrud = () => {
  const crud = useEntityCRUD(
    useGetPlantsQuery,
    useLazyGetPlantByIdQuery,
    useCreatePlantMutation,
    useEditPlantMutation,
    useDeletePlantMutation,
    undefined,
  );

  return { ...crud };
};
