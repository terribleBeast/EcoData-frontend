export default class Research {
  constructor({ id, title, goal, startDate, endDate, status, researchers_id }) {
    this.id = id;
    this.title = title;
    this.goal = goal;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.researchers_id = researchers_id;
  }
}
