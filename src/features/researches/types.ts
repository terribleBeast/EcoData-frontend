import type {
  IPredictionTable,
  IResearchDataFull,
} from "@/shared/types/research";
import type { IResearcherData } from "@/shared/types/researcher";

export interface ISelectedResearch extends IResearchDataFull {
  results: IPredictionTable;
  researchers: IResearcherData[];
}
