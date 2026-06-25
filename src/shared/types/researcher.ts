// ── Matches POST/PATCH/GET /api/v1/researchers and DB researchers table ──
// researchers table = auth (email, password_hash, system_role_id, is_active) + profile

/** SystemRoleNested — matches nested system_role in ResearcherResponse */
export interface SystemRoleNested {
  system_role_id: string;
  name: string;
}

/** JobNested — matches nested job in ResearcherResponse */
export interface JobNested {
  job_id: string;
  name: string;
}

/** OrganizationNested — matches nested organization in ResearcherResponse */
export interface OrganizationNested {
  organization_id: string;
  name: string;
}

/** Lightweight researcher for lookup dropdowns (matches ResearcherNested) */
export interface IResearcherData {
  researcher_id: string; // UUID PK
  first_name: string;
  last_name: string;
}

/** Full researcher detail (matches ResearcherResponse) */
export interface IResearcherDataFull extends IResearcherData {
  entity_id: string; // PK alias
  email: string;
  patronymic?: string | null;
  system_role?: SystemRoleNested | null;
  is_active: boolean;
  phone?: string | null;
  orcid_link?: string | null;
  job?: JobNested | null;
  organization?: OrganizationNested | null;
  created_at: string;
}

/** Create payload via /api/v1/researchers (no auth fields — those come from register) */
export interface ResearcherCreate {
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  phone?: string | null;
  orcid_link?: string | null;
  job_id?: string | null;
  organization_id?: string | null;
}

/** Update payload (PATCH /api/v1/researchers/{id}) */
export type ResearcherUpdate = Partial<ResearcherCreate>;
