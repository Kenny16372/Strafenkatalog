import React, { useContext, useEffect, useState } from "react";
import PlayerSelection from "../components/PlayerSelection/PlayerSelection";
import TransactionList from "../components/TransactionList/TransactionList";
import TransactionContext from "../contexts/TransactionContext";
import { TransactionService } from "../services/TransactionService";
import formatMoney from "../utils/formatMoney";

function PayFineView() {
  const [playerId, setPlayerId] = useState(undefined as number | undefined);
  const { transactions, setTransactions } = useContext(TransactionContext);
  const filtered = transactions.filter((t) => t.playerId === playerId);
  const total = filtered
    .map(({ amount }) => amount)
    .reduce((acc, val) => acc + val, 0);
  const [payAmount, setPayAmount] = useState(total);
  const [selected, setSelected] = useState([] as number[]);

  useEffect(() => {
    const toBePaid = filtered
      .filter(({ id }) => selected.includes(id))
      .reduce((acc, { amount }) => acc + amount, 0);
    setPayAmount(toBePaid);
  }, [filtered, selected]);

  function pay(e: any) {
    e.preventDefault();
    TransactionService.payTransactions(selected).then(() =>
      TransactionService.retrieveTransactions(setTransactions)
    );
  }

  return (
    <>
      <h1 className="text-center">Strafen bezahlen</h1>
      <div className="container">
        <PlayerSelection playerChanged={setPlayerId} selected={playerId} />
        <span className="d-block text-center display-4 my-3">
          {formatMoney(payAmount)}
        </span>
        <form onSubmit={(e) => pay(e)}>
          <button
            className="btn btn-success d-block mx-auto my-2"
            type="submit"
          >
            Bezahlen
          </button>
        </form>
        <TransactionList
          transactions={filtered}
          displayPlayer={false}
          selectionChanged={setSelected}
        />
      </div>
    </>
  );
}

export default PayFineView;
