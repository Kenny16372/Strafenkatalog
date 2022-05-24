import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GlobalState, { IGlobalState } from '../contexts/GlobalState';
import { Fine } from '../interfaces/Fine';
import FineService from '../services/FineService';
import readMoney from '../utils/readMoney';

export default function EditFineView() {
	const [state] = useContext(GlobalState);
	const { fines } = state as IGlobalState;
	const { id } = useParams();
	const fineId = parseInt(id || "");

	const fine = fines.find(f => f.id === fineId);
	const defaultName = fine?.name || "Name";
	const defaultAmount = fine?.amount || 0;
	const [name, setName] = useState(defaultName);
	const [amount, setAmount] = useState(defaultAmount);

	const navigate = useNavigate();

	function saveChanges(e: any) {
		e.preventDefault();
		FineService.putFine(new Fine(name,))
		navigate("/strafenkatalog");
	}

	return (
		<>
			<form className="container" onSubmit={saveChanges}>
				<label htmlFor="name">Strafe</label>
				<input name="name" id="name" type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
				<label htmlFor="amount">Preis</label>
				<div className="input-group">
					<div className="input-group-prepend">
						<span className="input-group-text">€</span>
					</div>
					<input name="amount" id="amount" type="number" className="form-control" step="0.5" value={amount / 100} onChange={e => setAmount(readMoney(e.target.value))} />
				</div>
				<div className="container-fluid justify-content-center d-flex pt-2 gap-2">
					<button className="btn" onClick={() => navigate("/strafenkatalog")}>Zurück</button>
					<button type="submit" className="btn btn-primary">Speichern</button>
				</div>
			</form>
		</>
	)
}
