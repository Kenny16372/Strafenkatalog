import React from "react";
import { Link } from "react-router-dom";
import ITransaction from "../../interfaces/Transaction";
import { displayDate } from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";

function TransactionList(props: {
  transactions: ITransaction[];
  displayPlayer?: boolean;
}) {
  return (
    <div className="container-fluid">
      <table className="table">
        <thead>
          <tr>
            {!!props.displayPlayer && <th>Spieler</th>}
            <th>Strafe</th>
            <th>Betrag</th>
            <th>Datum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map((transaction) => (
            <tr key={transaction.id}>
              {!!props.displayPlayer && <td>{transaction.player}</td>}
              <td>{transaction.price}</td>
              <td>{formatMoney(transaction.amount)}</td>
              <td>{displayDate(transaction.timestamp)}</td>
              <td>
                <Link to={"../vergehen/" + transaction.id}>
                  <i className="bi-pencil" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
