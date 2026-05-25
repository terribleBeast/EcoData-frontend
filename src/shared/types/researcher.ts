export interface IResearcherData {
  id: number;
  name: string;
  patronymic: string;
  surname: string;
}

export interface IResearcherDataFull extends IResearcherData {
  id: number;
  email: string;
  password_hash: string;
  role: string;
  job: string;
  phone: string;
  researches_id: number[];
}

export interface IResearcherDataUpdate {
  name?: string;
  surname?: string;
  patronymic?: string;
}
