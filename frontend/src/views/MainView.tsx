import MainStats from "../components/MainStats/MainStats";
import React, { useContext } from "react";
import TransactionContext from "../contexts/TransactionContext";

function MainView() {
  const { transactions } = useContext(TransactionContext);
  return (
    <div className="w-100">
      <MainStats
        openFines={transactions.reduce((acc, t) => acc + t.amount, 0)}
      />
    </div>
  );
}

export default MainView;
