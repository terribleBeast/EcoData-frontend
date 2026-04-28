export default class ResearcherModel {
  constructor({
    id,
    email,
    password_hash,
    role,
    name,
    surname,
    patronymic,
    job,
    phone,
    researches_id,
  }) {
    this.id = id;
    this.email = email;
    this.password_hash = password_hash;
    this.role = role;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.job = job;
    this.phone = phone;
    this.researches_id = researches_id;
  }
}
