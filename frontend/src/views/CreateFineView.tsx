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
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState(0);
  const amount = () => fines.find((f) => f.id === fineId)?.amount ?? 0;
  const total = () => count * amount();

  const dateString =
    "" +
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2);

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
      date.valueOf()
    );
    TransactionService.createTransaction(transaction).then(() =>
      TransactionService.retrieveTransactions(setTransactions)
    );

    setCount(0);
    setDate(new Date());
    updateCountInput("");
    setTransactions(transactions.concat(transaction));
  }

  function updateCountInput(value: string | number) {
    (document.getElementById("count") as HTMLInputElement).value = "" + value;
  }

  function incCount() {
    const value = count + 1;
    setCount(value);
    updateCountInput(value);
  }

  function decCount() {
    const value = Math.max(0, count - 1);
    setCount(value);
    updateCountInput(value);
  }

  return (
    <>
      <h1 className="text-center">Strafe verhängen</h1>
      <div className="container">
        <PlayerSelection playerChanged={setPlayerId} selected={playerId} />
        <FineSelection fineChanged={setFineId} selected={fineId} />
        <form onSubmit={create}>
          <label htmlFor="date">Datum</label>
          <input
            type="date"
            id="date"
            value={dateString}
            className="form-control"
            onChange={(e) =>
              e.target.valueAsDate && setDate(e.target.valueAsDate)
            }
          />
          <label htmlFor="count">Anzahl</label>
          <div className="d-flex justify-content-around">
            <button
              className="btn border"
              onClick={decCount}
              type="button"
              disabled={count <= 0}
            >
              -
            </button>
            <input
              id="count"
              type="number"
              className="form-control"
              style={{ width: "60%", display: "inline" }}
              min={0}
              onChange={(e) =>
                setCount(((x) => (isNaN(x) ? 0 : x))(parseInt(e.target.value)))
              }
              onBlur={() => updateCountInput(count)}
            />
            <button className="btn border" onClick={incCount} type="button">
              +
            </button>
          </div>
          <span className="d-block text-center display-4 my-3">
            {formatMoney(total())}
          </span>
          <button
            disabled={!count || playerId === undefined || fineId === undefined}
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
