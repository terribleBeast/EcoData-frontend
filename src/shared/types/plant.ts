export interface IPlantData {
  id: number;
  additional_info: string;
}

export interface IPlantDataFull extends IPlantData {
  id: number;
  address_id: number;
  plant_description_id: number;
  plant_description?: IPlantDescriptionFull;
}

export interface IGenus {
  id: string;
  name: string;
}

export interface ISpecies {
  id: number;
  name: string;
  genusId: number;
}

export interface ILeafType {
  id: number;
  name: string;
}

export interface ILifeForm {
  id: number;
  name: string;
}

export interface IPlantDescription {
  id: number;
  life_form_id: number;
  leaf_type_id: number;
  genus_id: number;
  species_id: number;
  description: string;
}

export interface IPlantDescriptionFull extends IPlantDescription {
  genus: IGenus;
  species: ISpecies;
  leaf_type: ILeafType;
  life_form: ILifeForm;
}
