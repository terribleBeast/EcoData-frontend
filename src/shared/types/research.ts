export type UUID = string;

export const ResearchStatus = {
  DRAFT: "draft",
  ACTIVE: "active",
  COMPLETED: "completed",
  ARCHIVED: "archived",
} as const;

export type ResearchStatus =
  (typeof ResearchStatus)[keyof typeof ResearchStatus];

export interface IResearcherShort {
  id: UUID;
  first_name?: string;
  last_name?: string;
  name?: string;
  surname?: string;
}

export interface IResearchData {
  id: UUID;
  research_id?: UUID;
  title: string;

  researcher_ids?: Array<UUID | IResearcherShort>;
  researchers_id?: Array<UUID | IResearcherShort>;

  created_by_researcher_id?: UUID | null;
  created_by?: IResearcherShort | null;
}

export interface IResearchDataFull extends IResearchData {
  goal: string | null;
  description: string | null;
  startDate?: string | null;
  endDate?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  status: ResearchStatus | string;
}

export interface IPredictionTable {
  headers: string[];
  rows: number[][];
}
