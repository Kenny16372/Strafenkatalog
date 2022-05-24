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
      amount: 50,
      id: 3,
    },
    {
      name: "Gelb wegen Meckern",
      amount: 1000,
      id: 4,
    },
  ],
};

const GlobalState = React.createContext([
  initialState,
  (a: IGlobalState) => { },
]);

export default GlobalState;
