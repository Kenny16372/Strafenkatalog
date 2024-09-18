import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FineContext from "../contexts/FineContext";
import formatMoney from "../utils/formatMoney";

function FineListView() {
  const { fines } = useContext(FineContext);

  return (
    <>
      <h1 className="text-center">Strafenkatalog</h1>
      <div className="container-fluid">
        <table className="table">
          <tbody>
            {fines.map((fine) => (
              <tr key={fine.id}>
                <td>{fine.name}</td>
                <td className="text-nowrap text-end">
                  {formatMoney(fine.amount)}
                </td>
                <td>
                  <Link to={"../strafeBearbeiten/" + fine.id}>
                    <i className="bi-pencil" />
                  </Link>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>
                <Link to="../strafeBearbeiten/-1">
                  <button
                    type="button"
                    className="btn btn-success d-block m-auto"
                    aria-label="Strafe hinzufügen"
                  >
                    <i className="bi-plus-lg fs-3 px-5"></i>
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FineListView;
