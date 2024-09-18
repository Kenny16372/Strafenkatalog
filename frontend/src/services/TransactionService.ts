import { API_URL } from "../contexts/Config";
import ITransaction, { Transaction } from "../interfaces/Transaction";

const BASE_URL = API_URL + "transactions/";

export const TransactionService = {
  createTransaction({ fineId, playerId, count }: ITransaction): Promise<void> {
    return fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fine_id: fineId, player_id: playerId, count }),
    }).then();
  },

  updateTransaction(transaction: ITransaction): Promise<void> {
    return fetch(`${BASE_URL}?id=${transaction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }).then();
  },

  deleteTransaction(id: number): Promise<void> {
    return fetch(`${BASE_URL}?id=${id}`, {
      method: "DELETE",
    }).then();
  },

  retrieveTransactions(setTransactions?: (a: ITransaction[]) => void) {
    const url = BASE_URL;
    fetch(url)
      .then((response) => response.json())
      .then((transactions) => {
        transactions = transactions.map(
          (t: any) =>
            new Transaction(
              t.id,
              t.player_name,
              t.player_id,
              t.fine_name,
              t.fine_id,
              t.amount,
              t.count,
              t.created_at,
              t.deleted_at,
              t.settled_at
            )
        );
        setTransactions && setTransactions(transactions);
      });
  },

  payTransactions(transactionIds: number[]): Promise<void> {
    return fetch(BASE_URL, {
      method: "PATCH",
      body: JSON.stringify({ transaction_ids: transactionIds }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {});
  },
};
