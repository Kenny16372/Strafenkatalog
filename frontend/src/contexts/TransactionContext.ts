import React from "react";
import ITransaction from "../interfaces/Transaction";

export interface ITransactionContext {
  transactions: ITransaction[];
  setTransactions: (a: ITransaction[]) => void;
}

const PlayerContext = React.createContext({
  transactions: [],
  setTransactions: () => {},
} as ITransactionContext);

export default PlayerContext;
