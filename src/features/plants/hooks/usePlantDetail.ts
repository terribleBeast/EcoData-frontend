import {
  useGetPlantByIdQuery,
  useGetPlantDescriptionQuery,
} from "@/api/endpoints";

export const usePlantDetail = (id: number) => {
  const plantQuery = useGetPlantByIdQuery(id, { skip: id === -1 });

  const descriptionQuery = useGetPlantDescriptionQuery(
    plantQuery.data?.plant_description_id ?? -1,
    { skip: !plantQuery.data?.plant_description_id },
  );

  return { plantQuery, descriptionQuery };
};
