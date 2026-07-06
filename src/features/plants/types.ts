export type UUID = string;

export interface IGenus {
  id: UUID;
  latin_name: string;
  russian_name: string | null;
}

export interface ISpecies {
  id: UUID;
  genus_id: UUID | null;
  latin_name: string;
  russian_name: string | null;
  genus?: IGenus | null;
}

export interface ILeafType {
  id: UUID;
  name: string;
}

export interface ILifeForm {
  id: UUID;
  name: string;
}

export interface ILocation {
  id: UUID;
  address_id: UUID | null;
  latitude: string | number | null;
  longitude: string | number | null;
  description: string | null;
}

export interface IPlantDescriptionFull {
  id: UUID;
  species_id: UUID | null;
  plant_life_form_id: UUID | null;
  leaf_blade_type_id: UUID | null;
  description: string | null;

  species?: ISpecies | null;
  genus?: IGenus | null;
  plant_life_form?: ILifeForm | null;
  leaf_blade_type?: ILeafType | null;
}

export interface IPlantDataFull {
  id: UUID;
  location_id: UUID | null;
  plant_description_id: UUID | null;
  description: string | null;

  location?: ILocation | null;
  plant_description?: IPlantDescriptionFull | null;
}

export interface IPlantFormData {
  id?: UUID;
  location_id?: UUID | "" | null;
  plant_description_id?: UUID | null;

  genus_id: UUID | "";
  species_id: UUID | "";
  leaf_blade_type_id: UUID | "";
  plant_life_form_id: UUID | "";

  plant_description_text?: string | null;
  description?: string | null;
}
