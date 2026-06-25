// ── Auth types: matches POST /api/v1/auth/register & /login & GET /auth/me ──
// users table deleted — researchers now holds both auth + profile fields

import type {
  SystemRoleNested,
  JobNested,
  OrganizationNested,
} from "./researcher";

export interface RegisterRequest {
  email: string;
  password: string;
  system_role_id: string; // UUID
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  phone?: string | null;
  orcid_link?: string | null;
  job_id?: string | null;
  organization_id?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/** Response from POST /api/v1/auth/login */
export interface TokenResponse {
  access_token: string;
  token_type: string; // "bearer"
}

/** Response from GET /api/v1/auth/me (matches ResearcherProfileResponse) */
export interface ResearcherProfileResponse {
  researcher_id: string; // UUID PK
  email: string;
  system_role?: SystemRoleNested | null;
  is_active: boolean;
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  phone?: string | null;
  orcid_link?: string | null;
  job?: JobNested | null;
  organization?: OrganizationNested | null;
  created_at: string;
  updated_at: string;
}

export interface ISystemRoleType {
  name: string;
  system_role_id: string;
}

// ── Legacy (keep for compatibility during migration, marked deprecated) ──

/** @deprecated — use ResearcherProfileResponse */
export interface UserResponse {
  id: string;
  email: string;
  username: string;
  system_role_id: string;
  is_active: boolean;
}

/** @deprecated — use TokenResponse */
export interface IAuthUser {
  token: string | null;
  email: string;
  id: string;
  username?: string;
  system_role_id?: string;
  is_active?: boolean;
}

/** @deprecated — use LoginRequest */
export interface ICheckExistUser {
  password: string;
  email: string;
}

/** @deprecated — use RegisterRequest */
export interface ICreateUser extends ICheckExistUser {
  name: string;
  surname: string;
  patronymic: string;
}
