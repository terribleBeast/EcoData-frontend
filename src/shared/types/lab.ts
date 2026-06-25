// ── Matches POST/PATCH/GET /api/v1/laboratories and DB laboratories table ──

// ── Nested types for API responses (OpenAPI v2) ──

export interface OrganizationNested {
  organization_id: string;
  name: string;
}

export interface AddressNested {
  address_id: string;
}

/** Lightweight lab data (id + name) */
export interface ILabData {
  entity_id: string;
  id: string; // UUID
  name: string;
}

/** Full lab (includes FK references) */
export interface ILabDataFull extends ILabData {
  entity_id: string;
  id: string; // UUID
  organization?: OrganizationNested | null;
  address?: AddressNested | null;
}

/** Create payload (POST /api/v1/laboratories) */
export interface LaboratoryCreate {
  name: string;
  organization_id?: string | null;
  address_id?: string | null;
}

/** Update payload (PATCH /api/v1/laboratories/{id}) */
export type LaboratoryUpdate = Partial<LaboratoryCreate>;

// ── Organization (backed by /api/v1/organizations) ──

/** Organization response (GET /api/v1/organizations) */
export interface IOrganizationResponse {
  entity_id: string;
  id: string; // UUID
  name: string;
  organization_type_id?: string | null; // UUID
  address_id?: string | null; // UUID
}

/** Organization type (GET /api/v1/organizations/types) */
export interface IOrganizationType {
  entity_id: string;
  id: string; // UUID
  name: string;
}

// ── Legacy aliases kept for migration ──

/** @deprecated — use IOrganizationResponse */
export interface IOrganizationDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
}
