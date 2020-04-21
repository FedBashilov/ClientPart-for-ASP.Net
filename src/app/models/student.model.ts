export class Student{
  public id: number = 0;
  public first_name: string = "";
  public last_name: string = "";
  public department: number = 0;

  constructor(first_name, last_name, department){
    this.first_name = first_name;
    this.last_name = last_name;
    this.department = department;
  }
}
