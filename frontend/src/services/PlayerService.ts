import { API_URL } from "../contexts/Config";
import IPlayer from "../interfaces/Player";

const BASE_URL = API_URL + "player/";

export const PlayerService = {
	createPlayer(player: IPlayer) {		
		fetch(BASE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(player),
		});
	},

	updatePlayer(player: IPlayer) {
		fetch(BASE_URL + player.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(player),
		});
	},

	deletePlayer(id: number) {
		fetch(BASE_URL + id, {
			method: "DELETE"
		});
	},

	retrievePlayers(setPlayers?: ((a: IPlayer[]) => void)) {
		const url = BASE_URL + "players";
		fetch(url)
		.then(response => response.json())
		.then(players => {
			setPlayers && setPlayers(players);
		})
	}
}