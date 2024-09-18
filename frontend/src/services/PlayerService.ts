import { API_URL } from "../contexts/Config";
import IPlayer from "../interfaces/Player";

const BASE_URL = API_URL + "players/";

export const PlayerService = {
  createPlayer(player: IPlayer): Promise<void> {
    return fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then();
  },

  updatePlayer(player: IPlayer): Promise<void> {
    return fetch(`${BASE_URL}?id=${player.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then();
  },

  deletePlayer(id: number): Promise<void> {
    return fetch(`${BASE_URL}?id=${id}`, {
      method: "DELETE",
    }).then();
  },

  retrievePlayers(setPlayers?: (a: IPlayer[]) => void) {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((players) => {
        setPlayers && setPlayers(players);
      });
  },
};
