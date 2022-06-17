import { API_URL } from "../contexts/Config";
import ITransaction from "../interfaces/Transaction";

const BASE_URL = API_URL + "transaction/";

export const TransactionService = {
	createTransaction(transaction: ITransaction) {		
		fetch(BASE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(transaction),
		});
	},

	updateTransaction(transaction: ITransaction) {
		fetch(BASE_URL + transaction.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(transaction),
		});
	},

	deleteTransaction(id: number) {
		fetch(BASE_URL + id, {
			method: "DELETE"
		});
	},

	retrieveTransactions(setTransactions?: ((a: ITransaction[]) => void)) {
		const url = BASE_URL + "transactions";
		fetch(url)
		.then(response => response.json())
		.then(transactions => {
			setTransactions && setTransactions(transactions);
		})
	}
}