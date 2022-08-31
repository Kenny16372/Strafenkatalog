import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ITransaction from "../../interfaces/Transaction";
import { displayDate } from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";

function TransactionList(props: {
  transactions: ITransaction[];
  displayPlayer?: boolean;
  selectionChanged?: (a: number[]) => void;
}) {
  const selectionChanged = props.selectionChanged;
  const [selectedIds, setSelectedIds] = useState([] as number[]);

  useEffect(() => {
    selectionChanged && selectionChanged(selectedIds);
  }, [props.transactions, selectedIds, selectionChanged]);

  function changeAll(e: any) {
    if (e.target.checked) {
      setSelectedIds(props.transactions.map(({ id }) => id));
    } else {
      setSelectedIds([]);
    }
    document
      .querySelectorAll(".selection")
      .forEach((el) => ((el as any).checked = e.target.checked));
  }

  const handleCheck = (event: any) => {
    const updated = new Set(
      selectedIds.filter((selId) =>
        props.transactions.map(({ id }) => id).includes(selId)
      )
    );

    if (event.target.checked) {
      updated.add(parseInt(event.target.value));
    } else {
      updated.delete(parseInt(event.target.value));
    }
    setSelectedIds([...updated]);

    (document.getElementById("selectAll") as any).checked =
      updated.size === props.transactions.length;
  };

  return (
    <div className="container-fluid">
      <table className="table">
        <thead>
          <tr>
            {!!selectionChanged && (
              <th>
                <input
                  type="checkbox"
                  id="selectAll"
                  onChange={changeAll}
                  defaultChecked={false}
                />
              </th>
            )}
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
              {!!selectionChanged && (
                <td>
                  <input
                    type="checkbox"
                    className="selection"
                    value={transaction.id}
                    checked={selectedIds.includes(transaction.id)}
                    onChange={(e) => handleCheck(e)}
                  />
                </td>
              )}
              {!!props.displayPlayer && <td>{transaction.player}</td>}
              <td>{transaction.fine}</td>
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
