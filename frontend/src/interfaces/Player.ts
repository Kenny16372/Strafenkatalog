export default interface IPlayer {
  name: string;
  id: number;
  is_active: boolean;
}

export class Player implements IPlayer {
  name = "";
  id = -1;
  is_active = true;

  constructor(name: string, id: number = -1, is_active: boolean = true) {
    this.name = name;
    this.id = id;
    this.is_active = is_active;
  }
}
