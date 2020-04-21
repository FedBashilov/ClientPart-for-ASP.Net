export class Department{
  public id: number = 0;
  public name: string = "";
  public description: string = "";

  constructor(name, description){
    this.name = name;
    this.description = description;
  }
}
