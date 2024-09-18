import MainStats from "../components/MainStats/MainStats";
import React, { useContext } from "react";
import TransactionContext from "../contexts/TransactionContext";

function MainView() {
  const { transactions } = useContext(TransactionContext);
  return (
    <div className="w-100">
      <h1 className="text-center my-2">
        <img
          src="/logo400.png"
          style={{ width: "3rem", marginInlineEnd: "1rem" }}
          alt="Logo"
        />
        1. FC Bischberg Herren
      </h1>
      <MainStats
        openFines={transactions.reduce((acc, t) => acc + t.amount, 0)}
      />
    </div>
  );
}

export default MainView;
