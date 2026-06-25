// ── Nested types for API responses (OpenAPI v2) ──

export interface SpeciesNested {
  species_id: string;
  latin_name: string;
  russian_name?: string | null;
}

export interface PlantLifeFormNested {
  plant_life_form_id: string;
  name: string;
}

export interface LeafBladeTypeNested {
  leaf_blade_type_id: string;
  name: string;
}

export interface PlantDescriptionNested {
  plant_description_id: string;
  species?: SpeciesNested | null;
  plant_life_form: PlantLifeFormNested;
  leaf_blade_type: LeafBladeTypeNested;
  description?: string | null;
}

export interface LocationNested {
  location_id: string;
  address_id?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  description?: string | null;
  created_at: string;
}

// ── Plant response (matches GET /api/v1/plants) ──

export interface IPlantData {
  entity_id: string;
  plant_id: string; // UUID
  location?: LocationNested | null;
  plant_description?: PlantDescriptionNested | null;
  description?: string | null;
}

/** Full plant object (same shape as API response) */
export type IPlantDataFull = IPlantData;

/** Create payload (POST /api/v1/plants) — flat FK IDs */
export interface PlantCreate {
  location_id?: string | null;
  plant_description_id?: string | null;
  description?: string | null;
}

/** Update payload (PATCH /api/v1/plants/{id}) */
export type PlantUpdate = Partial<PlantCreate>;

// ── Genera ──

export interface IGenus {
  entity_id: string;
  id: string; // UUID
  latin_name: string;
  russian_name?: string | null;
}

// ── Species (FK → genera) ──

export interface ISpecies {
  entity_id: string;
  id: string; // UUID
  genus_id: string; // UUID
  latin_name: string;
  russian_name?: string | null;
}

// ── Plant life forms ──

export interface ILifeForm {
  entity_id: string;
  id: string; // UUID
  name: string;
}

// ── Leaf blade types ──

export interface ILeafType {
  entity_id: string;
  id: string; // UUID
  name: string;
}

// ── Plant descriptions ──

export interface IPlantDescription {
  entity_id: string;
  id: string; // UUID
  species_id?: string | null; // UUID → species
  plant_life_form_id: string; // UUID → plant_life_forms
  leaf_blade_type_id: string; // UUID → leaf_blade_types
  description?: string | null;
}

/** Same shape — API returns flat, no nested embeds yet */
export type IPlantDescriptionFull = IPlantDescription;

/** Create payload (POST /api/v1/plant-descriptions) */
export interface PlantDescriptionCreate {
  species_id?: string | null;
  plant_life_form_id: string;
  leaf_blade_type_id: string;
  description?: string | null;
}

/** Update payload (PATCH /api/v1/plant-descriptions/{id}) */
export type PlantDescriptionUpdate = Partial<PlantDescriptionCreate>;
