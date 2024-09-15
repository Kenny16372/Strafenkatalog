import React from "react";
import IPlayer from "../interfaces/Player";

export interface IPlayerContext {
  players: IPlayer[];
  setPlayers: (a: IPlayer[]) => void;
}

const PlayerContext = React.createContext({
  players: [],
  setPlayers: () => {},
} as IPlayerContext);

export default PlayerContext;
