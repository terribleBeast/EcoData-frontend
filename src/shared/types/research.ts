import type { IPrediction } from "./image";

export const ResearchStatus = {
  ACTIVE: "Активно",
  STOP: "Прекращено",
} as const;

export type ResearchStatus =
  (typeof ResearchStatus)[keyof typeof ResearchStatus];

export interface IResearchData {
  id: number;
  title: string;
}

export interface IResearchDataFull {
  id: number;
  title: string;
  goal: string;
  startDate: string;
  endDate: string;
  researchers_id: number[];
  status: ResearchStatus;
}

export interface IPredictionTable {
  headers: string[];
  rows: IPrediction[][];
}
