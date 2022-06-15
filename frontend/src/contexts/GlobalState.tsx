import React from "react";
import IFine from "../interfaces/Fine";

export interface IGlobalState {
  players: {
    name: string;
    id: number;
  }[];
  fines: IFine[];
}

let initialState: IGlobalState = {
  players: [
    {
      name: "Kenny",
      id: 1,
    },
    {
      name: "Luis",
      id: 2,
    },
  ],
  fines: [
    {
      name: "Tunnel/20",
      amount: 100,
      id: 3,
    },
    {
      name: "Gelb wegen Meckern",
      amount: 900,
      id: 4,
    },
  ],
};

const GlobalState = React.createContext({
  state: initialState,
  setState: (a: IGlobalState) => {},
});

export default GlobalState;
