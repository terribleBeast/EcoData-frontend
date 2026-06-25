import { useGetPlantByIdQuery } from "@/api/endpoints";

export const usePlantDetail = (id: string) => {
  const plantQuery = useGetPlantByIdQuery(id, { skip: id === "-1" });

  const plant = plantQuery.data;
  const descriptionQuery = {
    data: plant?.plant_description ?? undefined,
    isLoading: false,
    isError: false,
    error: undefined,
  };

  return { plantQuery, descriptionQuery };
};
