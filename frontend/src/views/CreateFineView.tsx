import React, { useContext, useState } from "react";
import FineSelection from "../components/FineSelection/FineSelection";
import PlayerSelection from "../components/PlayerSelection/PlayerSelection";
import FineContext from "../contexts/FineContext";
import TransactionContext from "../contexts/TransactionContext";
import { Transaction } from "../interfaces/Transaction";
import { TransactionService } from "../services/TransactionService";
import formatMoney from "../utils/formatMoney";

function CreateFineView() {
  const [playerId, setPlayerId] = useState(undefined as number | undefined);
  const [fineId, setFineId] = useState(undefined as number | undefined);
  const { fines } = useContext(FineContext);
  const { transactions, setTransactions } = useContext(TransactionContext);
  const [count, setCount] = useState(0);
  const amount = () => fines.find((f) => f.id === fineId)?.amount ?? 0;
  const total = () => count * amount();

  function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const transaction = new Transaction(
      -1,
      "",
      playerId ?? -1,
      "",
      fineId ?? -1,
      total(),
      count,
      Date.now()
    );
    TransactionService.createTransaction(transaction).then(() =>
      TransactionService.retrieveTransactions(setTransactions)
    );

    setCount(0);
    setTransactions(transactions.concat(transaction));
  }

  return (
    <>
      <h1 className="text-center">Strafe verhängen</h1>
      <div className="container">
        <PlayerSelection playerChanged={setPlayerId} selected={playerId} />
        <FineSelection fineChanged={setFineId} selected={fineId} />
        <form onSubmit={create}>
          <label htmlFor="count">Anzahl</label>
          <input
            id="count"
            type="number"
            className="form-control"
            value={count}
            min={0}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
          <span className="d-block text-center display-4 my-3">
            {formatMoney(total())}
          </span>
          <button
            disabled={!count}
            className="btn btn-success mt-2 mx-auto d-block"
            type="submit"
          >
            Strafe verhängen
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateFineView;
