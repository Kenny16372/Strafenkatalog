export default interface IPlayer {
  name: string;
  id: number;
}

export class Player implements IPlayer {
  name = "";
  id = -1;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
