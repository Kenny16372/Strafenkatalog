import React from "react";
import IFine from "../interfaces/Fine";

export interface IFineContext {
  fines: IFine[];
  setFines: (a: IFine[]) => void;
}

const FineContext = React.createContext({
  fines: [],
  setFines: () => {},
} as IFineContext);

export default FineContext;
