import type { IPlantDataFull, IPlantDescriptionFull } from "@/shared/types/plant";

export interface ISelectedPlant extends IPlantDataFull {
  plant_description: IPlantDescriptionFull;
}
