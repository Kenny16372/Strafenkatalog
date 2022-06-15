import { API_URL } from "../contexts/Config";
import IFine from "../interfaces/Fine";

const BASE_URL = API_URL + "price/";

export const FineService = {
	createFine(fine: IFine) {
		console.log("doing a post");
		
		fetch(BASE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(fine),
		});
	},

	updateFine(fine: IFine) {
		fetch(BASE_URL + fine.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(fine),
		});
	},

	deleteFine(id: number) {
		fetch(BASE_URL + id, {
			method: "DELETE"
		});
	},

	retrieveFines(setFines?: ((a: IFine[]) => void)) {
		const url = BASE_URL + "prices";
		fetch(url)
		.then(response => response.json())
		.then(data=>{console.log(data); return data;})
		.then(fines => {
			setFines && setFines(fines);
		})
	}
}