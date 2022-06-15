import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FineContext from "../contexts/FineContext";
import { Fine } from "../interfaces/Fine";
import { FineService } from "../services/FineService";
import readMoney from "../utils/readMoney";

export default function EditFineView() {
  const { fines, setFines } = useContext(FineContext);
  const { id } = useParams();
  const fineId = parseInt(id || "");

  let fine = fines.find((f) => f.id === fineId);
  const defaultName = fine?.name || "Strafe";
  const defaultAmount = fine?.amount || 0;
  const [name, setName] = useState(defaultName);
  const [amount, setAmount] = useState(defaultAmount);

  const navigate = useNavigate();

  function saveChanges(e: any) {
    e.preventDefault();
    if (!fine) {
      fine = new Fine(name, amount, -1);
      FineService.createFine(fine);
      setFines(fines.concat(fine));
    } else {
      fine.name = name;
      fine.amount = amount;
      FineService.updateFine(fine);
      setFines(fines.slice());
    }

    navigate("/strafenkatalog");
  }

  function deleteFine(e: any): void {
    e.preventDefault();
    FineService.deleteFine(fineId);
    const idx = fines.findIndex((fine) => fine.id === fineId);
    if (idx !== -1) {
      let newFines = fines.slice();
      newFines.splice(idx, 1);
      setFines(newFines);
    }

    navigate("/strafenkatalog");
  }

  return (
    <>
      <form className="container" onSubmit={saveChanges}>
        <label htmlFor="name">Strafe</label>
        <input
          name="name"
          id="name"
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="amount">Preis</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">€</span>
          </div>
          <input
            name="amount"
            id="amount"
            type="number"
            className="form-control"
            step="0.5"
            value={amount / 100}
            onChange={(e) => setAmount(readMoney(e.target.value))}
          />
        </div>
        <div className="container-fluid justify-content-center d-flex pt-2 gap-2">
          <button className="btn" onClick={() => navigate("/strafenkatalog")}>
            Zurück
          </button>
          <button type="submit" className="btn btn-primary">
            Speichern
          </button>
          <button className="btn btn-danger" onClick={deleteFine}>
            Löschen
          </button>
        </div>
      </form>
    </>
  );
}
