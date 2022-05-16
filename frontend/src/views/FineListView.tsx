import React, { useContext } from "react";
import GlobalState, { IGlobalState } from "../contexts/GlobalState";
import formatMoney from "../utils/formatMoney";

function FineListView() {
  const [state] = useContext(GlobalState);
  const { fines } = state as IGlobalState;

  return (
    <>
      <h1 className="text-center">Strafenkatalog</h1>
      <div className="container-fluid">
        <table className="table">
          <tbody>
            {fines.map((fine) => (
              <tr key={fine.id}>
                <td>{fine.name}</td>
                <td>{formatMoney(fine.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FineListView;
