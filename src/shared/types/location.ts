// ── Nested types for API responses (OpenAPI v2) ──

export interface CountryNested {
  country_id: string;
  name: string;
}

export interface RegionNested {
  region_id: string;
  name: string;
}

export interface DistrictNested {
  district_id: string;
  name: string;
}

export interface SettlementTypeNested {
  settlement_type_id: string;
  name: string;
}

export interface SettlementNested {
  settlement_id: string;
  name: string;
  district_id: string;
  settlement_type_id: string;
}

export interface LocationNested {
  location_id: string;
  address_id?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  description?: string | null;
  created_at: string;
}

// ── Response types (with nested embeds) ──

export interface CountryResponse {
  entity_id: string;
  country_id: string;
  name: string;
}

export interface RegionResponse {
  entity_id: string;
  region_id: string;
  name: string;
  country?: CountryNested;
}

export interface DistrictResponse {
  entity_id: string;
  district_id: string;
  name: string;
  region?: RegionNested;
}

export interface SettlementResponse {
  entity_id: string;
  settlement_id: string;
  name: string;
  district?: DistrictNested;
  settlement_type?: SettlementTypeNested;
}

// ── Legacy flat interfaces (used by lookups / mutations) ──
// All PKs use prefixed names: country_id, region_id, district_id, etc.

export interface ICountry {
  entity_id: string;
  id: string; // UUID (API returns "country_id")
  name: string;
}

export interface IRegion {
  entity_id: string;
  id: string; // UUID (API returns "region_id")
  name: string;
  country_id: string; // UUID
}

export interface IDistrict {
  entity_id: string;
  id: string; // UUID (API returns "district_id")
  name: string;
  region_id: string; // UUID
}

export interface ISettlementType {
  entity_id: string;
  id: string; // UUID (API returns "settlement_type_id")
  name: string;
}

export interface ISettlement {
  entity_id: string;
  id: string; // UUID (API returns "settlement_id")
  name: string;
  district_id: string; // UUID
  settlement_type_id: string; // UUID
}

export interface IStreet {
  entity_id: string;
  id: string; // UUID (API returns "street_id")
  name: string;
}

export interface IHouseNumber {
  entity_id: string;
  id: string; // UUID (API returns "house_number_id")
  number: string;
}

export interface IAddressData {
  entity_id: string;
  id: string; // UUID (API returns "address_id")
  house_number_id: string; // UUID
  street_id: string; // UUID
  settlement_id: string; // UUID
}
