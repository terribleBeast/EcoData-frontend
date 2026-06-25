// ── Matches POST/PATCH/GET /api/v1/researches and DB researches table ──

export const ResearchStatus = {
  DRAFT: "draft",
  ACTIVE: "active",
  COMPLETED: "completed",
  ARCHIVED: "archived",
} as const;

export type ResearchStatus =
  (typeof ResearchStatus)[keyof typeof ResearchStatus];

/** ResearcherNested — matches nested researcher in ResearchResponse */
export interface ResearcherNested {
  researcher_id: string;
  first_name: string;
  last_name: string;
}

/** Lightweight research for lookup dropdowns */
export interface IResearchData {
  entity_id: string;
  research_id: string; // UUID PK
  title: string;
  status: ResearchStatus;
}

/** Full research detail (matches ResearchResponse) */
export interface IResearchDataFull {
  entity_id: string;
  research_id: string; // UUID PK
  title: string;
  goal?: string | null;
  description?: string | null;
  status: ResearchStatus;
  start_date?: string | null; // ISO date
  end_date?: string | null; // ISO date
  created_by?: ResearcherNested | null;
  researcher_ids?: string[];
  created_at?: string;
  updated_at?: string;
}

/** Create payload (POST /api/v1/researches) */
export interface ResearchCreate {
  title: string;
  goal?: string | null;
  description?: string | null;
  status?: ResearchStatus; // default "draft"
  start_date?: string | null;
  end_date?: string | null;
  created_by_researcher_id?: string | null;
  researcher_ids?: string[]; // UUID[] for initial researcher assignment
}

/** Update payload (PATCH /api/v1/researches/{id}) */
export interface ResearchUpdate {
  title?: string | null;
  goal?: string | null;
  description?: string | null;
  status?: ResearchStatus | null;
  start_date?: string | null;
  end_date?: string | null;
  researcher_ids?: string[] | null;
}

/** Assign researchers payload (POST /api/v1/researches/invite/{research_id}) */
export interface ResearchAssignResearchers {
  researcher_ids: string[];
}

/** Prediction result table (TODO: align with final analyzer response shape) */
export interface IPredictionTable {
  headers: string[];
  rows: number[][];
}
