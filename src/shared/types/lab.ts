export interface IOrganizationDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface IOrganizationType {
  id: number;
  name: string;
}

export interface ILabData {
  id: number;
  address_id: number;
  organization_details_id: number;
  organization_type_id: number;
}

export interface ILabDataFull extends ILabData {
  organization_details: IOrganizationDetails;
  organization_type: IOrganizationType;
}
