export default class User {
  constructor(name, surname, patronymic, password_hash) {
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.password_hash = password_hash;
  }
}
