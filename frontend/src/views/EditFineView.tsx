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
  const defaultName = fine?.name || "";
  const defaultAmount = "" + (fine?.amount || 0);
  const [name, setName] = useState(defaultName);
  const [amount, setAmount] = useState(defaultAmount);

  const navigate = useNavigate();

  function saveChanges(e: any) {
    e.preventDefault();
    const price = readMoney(amount);
    if (!fine) {
      fine = new Fine(name, price, -1);
      FineService.createFine(fine)
        .then(() => FineService.retrieveFines(setFines))
        .then(() => navigate("/strafenkatalog"));
    } else {
      fine.name = name;
      fine.amount = price;
      FineService.updateFine(fine)
        .then(() => FineService.retrieveFines(setFines))
        .then(() => navigate("/strafenkatalog"));
    }
  }

  function deleteFine(e: any): void {
    e.preventDefault();
    FineService.deleteFine(fineId)
      .then(() => FineService.retrieveFines(setFines))
      .then(() => navigate("/strafenkatalog"));
  }

  return (
    <>
      <form className="container" onSubmit={saveChanges}>
        <label htmlFor="name">Strafe</label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Strafe"
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="container-fluid justify-content-center d-flex pt-2 gap-2">
          <button
            className="btn"
            type="button"
            onClick={() => navigate("/strafenkatalog")}
          >
            Zurück
          </button>
          <button type="submit" className="btn btn-primary">
            Speichern
          </button>
          <button className="btn btn-danger" type="button" onClick={deleteFine}>
            Löschen
          </button>
        </div>
      </form>
    </>
  );
}
