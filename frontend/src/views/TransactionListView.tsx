import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import TransactionList from "../components/TransactionList/TransactionList";
import TransactionContext from "../contexts/TransactionContext";

function TransactionListView() {
  const { transactions } = useContext(TransactionContext);
  transactions.sort((a, b) => b.timestamp - a.timestamp);

  const search = useLocation().search;
  const player = new URLSearchParams(search).get("spieler");

  return (
    <>
      <h1 className="text-center">{player ?? "Strafen"}</h1>
      <TransactionList transactions={transactions} displayPlayer={!player} />
    </>
  );
}

export default TransactionListView;
