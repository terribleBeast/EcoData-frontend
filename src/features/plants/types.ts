import type {
  IPlantDataFull,
  PlantDescriptionNested,
} from "@/shared/types/plant";

/** Plant with joined description (from the nested API response) */
export interface ISelectedPlant extends IPlantDataFull {
  plant_description: PlantDescriptionNested;
}
