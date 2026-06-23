export interface ICountry {
  id: number;
  name: string;
}

export interface IRegion {
  id: number;
  name: string;
  country_id: number;
  country?: ICountry;
}

export interface IDistrict {
  id: number;
  name: string;
  region_id: number;
  region?: IRegion;
}

export interface ISettlementType {
  id: number;
  name: string;
}

export interface ISettlement {
  id: number;
  name: string;
  district_id: number;
  settlement_type_id: number;
  district?: IDistrict;
  settlement_type?: ISettlementType;
}

export interface IStreet {
  id: number;
  name: string;
}

export interface IHouseNumber {
  id: number;
  number: string;
}

export interface IAddressData {
  id: number;
  house_number_id: number;
  street_settlement_association_id: number;
}

export interface IAddressDataFull extends IAddressData {
  house_number: IHouseNumber;
  street: IStreet;
  settlement: ISettlement;
}
