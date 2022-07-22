import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransactionContext from "../contexts/TransactionContext";
import { TransactionService } from "../services/TransactionService";
import { displayDateTime } from "../utils/formatDate";
import formatMoney from "../utils/formatMoney";

export default function EditTransactionView() {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const { id } = useParams();
  const transactionId = parseInt(id || "");
  let transaction = transactions.find((t) => t.id === transactionId);

  const navigate = useNavigate();

  if (!transaction) {
    setTimeout(() => navigate("/vergehensliste"), 1000);
    return (
      <>
        Transaktion nicht gefunden
        <br />
        <br />
        Bitte lade die Seite neu
      </>
    );
  }

  function deleteTransaction(e: any): void {
    e.preventDefault();
    TransactionService.deleteTransaction(transactionId).then(() =>
      TransactionService.retrieveTransactions(setTransactions)
    );
    if (!transaction) {
      return;
    }
    transaction.timestampDeleted = Date.now();
    setTransactions(transactions.slice());

    navigate("/vergehensliste");
  }

  return (
    <>
      <form className="container">
        <label htmlFor="player">Spieler</label>
        <input
          name="player"
          id="player"
          type="text"
          value={transaction.player}
          readOnly
          className="form-control"
        />
        <label htmlFor="fine">Strafe</label>
        <input
          name="fine"
          id="fine"
          type="text"
          value={transaction.fine}
          readOnly
          className="form-control"
        />
        <label htmlFor="amount">Gesamtbetrag</label>
        <input
          name="amount"
          id="amount"
          type="number"
          value={formatMoney(transaction.amount)}
          readOnly
          className="form-control"
        />
        <label htmlFor="count">Anzahl</label>
        <input
          name="count"
          id="count"
          type="number"
          value={transaction.count}
          readOnly
          className="form-control"
        />
        <label htmlFor="timestamp">Datum</label>
        <input
          name="timestamp"
          id="timestamp"
          type="text"
          value={displayDateTime(transaction.timestamp)}
          readOnly
          className="form-control"
        />
        <label htmlFor="timestampDeleted">Datum storniert</label>
        <input
          name="timestampDeleted"
          id="timestampDeleted"
          type="text"
          value={
            transaction.timestampDeleted
              ? displayDateTime(transaction.timestampDeleted)
              : ""
          }
          readOnly
          className="form-control"
        />
        <div className="container-fluid justify-content-center d-flex pt-2 gap-2">
          <button className="btn" onClick={() => navigate("/vergehensliste")}>
            Zurück
          </button>
          {!transaction.timestampDeleted && (
            <button className="btn btn-danger" onClick={deleteTransaction}>
              Stornieren
            </button>
          )}
        </div>
      </form>
    </>
  );
}
