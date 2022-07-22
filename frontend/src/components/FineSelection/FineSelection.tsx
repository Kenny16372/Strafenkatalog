import React, { useContext } from "react";
import FineContext from "../../contexts/FineContext";

function FineSelection(props: {
  selected?: number;
  fineChanged?: (a: number) => void;
}) {
  const { fines } = useContext(FineContext);

  function fineChanged(e: any): void {
    const id = parseInt(e.target.value);
    props.fineChanged && props.fineChanged(id);
  }

  function getDefaultValue() {
    const defaultValue = props.selected ?? (fines && fines[0] && fines[0].id);
    setTimeout(() => props.fineChanged && props.fineChanged(defaultValue), 1);
    return defaultValue;
  }

  return (
    <>
      <label htmlFor="selectFine">Strafe</label>
      <select
        id="selectFine"
        className="form-select"
        defaultValue={getDefaultValue()}
        onChange={fineChanged}
      >
        {fines.map((fine) => (
          <option key={fine.id} value={fine.id}>
            {fine.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default FineSelection;
