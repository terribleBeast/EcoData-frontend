export interface IResearcherData {
  id: number;
  name: string;
  patronymic: string;
  surname: string;
}

export interface IResearcherDataFull extends IResearcherData {
  id: number;
  email: string;
  role: string;
  job?: string;
  phoneNumber?: string;
  researches_id: number[];
  lab_id?: number;
}
