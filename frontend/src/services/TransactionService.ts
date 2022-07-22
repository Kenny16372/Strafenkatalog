import { API_URL } from "../contexts/Config";
import ITransaction from "../interfaces/Transaction";

const BASE_URL = API_URL + "transaction/";

export const TransactionService = {
  createTransaction(transaction: ITransaction): Promise<void> {
    return fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }).then();
  },

  updateTransaction(transaction: ITransaction): Promise<void> {
    return fetch(BASE_URL + transaction.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }).then();
  },

  deleteTransaction(id: number): Promise<void> {
    return fetch(BASE_URL + id, {
      method: "DELETE",
    }).then();
  },

  retrieveTransactions(setTransactions?: (a: ITransaction[]) => void) {
    const url = BASE_URL + "transactions";
    fetch(url)
      .then((response) => response.json())
      .then((transactions) => {
        setTransactions && setTransactions(transactions);
      });
  },

  payTransactions(transactionIds: number[]): Promise<void> {
    return new Promise((resolve) =>
      fetch(BASE_URL + "transactions", {
        method: "PATCH",
        body: JSON.stringify(transactionIds),
        headers: { "Content-Type": "application/json" },
      }).then(() => resolve())
    );
  },
};
