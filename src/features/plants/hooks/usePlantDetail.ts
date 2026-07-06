import { skipToken } from "@reduxjs/toolkit/query";

import {
  useGetPlantByIdQuery,
  useGetPlantDescriptionQuery,
} from "@/api/endpoints";

export const usePlantDetail = (id?: string) => {
  const plantQuery = useGetPlantByIdQuery(id ?? skipToken);

  const descriptionQuery = useGetPlantDescriptionQuery(
    plantQuery.data?.plant_description_id ?? skipToken,
  );

  return { plantQuery, descriptionQuery };
};
