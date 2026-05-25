export interface IPersonName {
  name: string;
  surname: string;
  patronymic: string;
}

export interface IAuthUser extends IPersonName {
  token: string | null;
  email: string;
  id: number;
}

export interface ICheckExistUser {
  password_hash: string;
  email: string;
}

export interface ICreateUser extends IPersonName, ICheckExistUser {}
