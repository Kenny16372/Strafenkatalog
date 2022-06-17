export default interface ITransaction {
    id: number,
    player: string,
    playerId: number,
    price: string,
    priceId: number,
    amount: number,
    count: number,
    timestamp: number,
    timestampDeleted?: number,
}

export class Transaction implements ITransaction {
    id = -1;
    player: string;
    playerId: number;
    price: string;
    priceId: number;
    amount: number;
    count: number;
    timestamp: number;
    timestampDeleted?: number;

    constructor(id: number, player: string, playerId: number, price: string, priceId: number, amount: number, count: number, timestamp: number, timestampDeleted?: number) {
        this.id = id;
        this.player = player;
        this.playerId = playerId;
        this.price = price;
        this.priceId = priceId;
        this.amount = amount;
        this.count = count;
        this.timestamp = timestamp;
        this.timestampDeleted = timestampDeleted;
    }
}