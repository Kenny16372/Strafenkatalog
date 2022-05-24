import IFine from "../interfaces/Fine";

export default class FineService {
	private static finesCache: IFine[] = [
		{
			name: "Tunnel/20",
			amount: 50,
			id: 3,
		},
		{
			name: "Gelb wegen Meckern",
			amount: 1000,
			id: 4,
		},
	];

	public static getAllFines(): IFine[] {
		return this.finesCache;
	}

	public static putFine(fine: IFine) {
		const idx = this.finesCache.findIndex(f => f.id === fine.id);
		this.finesCache.splice(idx);
		this.finesCache.push(fine);
		// TODO replace with following
		// backend.put(fine);
		// update();
	}

	private static update() {
		this.finesCache = this.finesCache;
	}
}