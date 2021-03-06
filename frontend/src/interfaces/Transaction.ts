export default interface ITransaction {
    id: number,
    player: string,
    playerId: number,
    fine: string,
    fineId: number,
    amount: number,
    count: number,
    timestamp: number,
    timestampDeleted?: number,
}

export class Transaction implements ITransaction {
    id = -1;
    player: string;
    playerId: number;
    fine: string;
    fineId: number;
    amount: number;
    count: number;
    timestamp: number;
    timestampDeleted?: number;

    constructor(id: number, player: string, playerId: number, fine: string, fineId: number, amount: number, count: number, timestamp: number, timestampDeleted?: number) {
        this.id = id;
        this.player = player;
        this.playerId = playerId;
        this.fine = fine;
        this.fineId = fineId;
        this.amount = amount;
        this.count = count;
        this.timestamp = timestamp;
        this.timestampDeleted = timestampDeleted;
    }
}