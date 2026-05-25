import type { IResearchData } from "@/shared/types/research";
import type { IResearcherDataFull } from "@/shared/types/researcher";

export interface ISelectedResearcher extends IResearcherDataFull {
  researches: IResearchData[];
}
