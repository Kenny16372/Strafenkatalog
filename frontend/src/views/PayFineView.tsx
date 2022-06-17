import React, { useContext, useState } from "react";
import PlayerSelection from "../components/PlayerSelection/PlayerSelection";
import TransactionList from "../components/TransactionList/TransactionList";
import TransactionContext from "../contexts/TransactionContext";
import { TransactionService } from "../services/TransactionService";
import formatMoney from "../utils/formatMoney";

function PayFineView() {
  const [playerId, setPlayerId] = useState(undefined as number | undefined);
  const { transactions } = useContext(TransactionContext);
  const filtered = transactions.filter((t) => t.playerId === playerId);
  const total = filtered
    .map((t) => t.amount)
    .reduce((acc, val) => acc + val, 0);
  const [payAmount, setPayAmount] = useState(total);

  function pay() {
    // TODO
  }

  return (
    <>
      <h1>Strafen bezahlen</h1>
      <PlayerSelection playerChanged={setPlayerId} selected={playerId} />
      <span className="d-block text-center display-4 my-3">
        {formatMoney(total)}
      </span>
      <form className="container">
        <input type="number" className="form-control" />
        <button className="btn" type="submit"></button>
      </form>
      <TransactionList transactions={filtered} displayPlayer={false} />
    </>
  );
}

export default PayFineView;
