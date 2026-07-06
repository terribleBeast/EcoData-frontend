export type UUID = string;

export interface IResearcherData {
  id: UUID;
  researcher_id?: UUID;

  first_name: string;
  last_name: string;
  patronymic?: string | null;

  // compatibility with old UI code
  name?: string;
  surname?: string;
}

export interface IResearcherDataFull extends IResearcherData {
  entity_id?: UUID;

  email: string;
  is_active: boolean;
  phone?: string | null;
  orcid_link?: string | null;
  created_at: string;

  system_role?: {
    id: UUID;
    system_role_id?: UUID;
    name: string;
  } | null;

  job?: {
    id: UUID;
    job_id?: UUID;
    name: string;
  } | null;

  organization?: {
    id: UUID;
    organization_id?: UUID;
    name: string;
  } | null;
}

export type ResearcherCreate = {
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  phone?: string | null;
  orcid_link?: string | null;
  job_id?: UUID | null;
  organization_id?: UUID | null;
};
