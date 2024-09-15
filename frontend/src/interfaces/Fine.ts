export default interface IFine {
  name: string;
  amount: number;
  id: number;
}

export class Fine implements IFine {
  name: string = "";
  amount: number = 0;
  id: number = 0;

  constructor(name: string, amount: number, id: number) {
    this.name = name;
    this.amount = amount;
    this.id = id;
  }
}
