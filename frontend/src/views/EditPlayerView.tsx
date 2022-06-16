import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayerContext from "../contexts/PlayerContext";
import { Player } from "../interfaces/Player";
import { PlayerService } from "../services/PlayerService";

export default function EditPlayerView() {
  const { players, setPlayers } = useContext(PlayerContext);
  const { id } = useParams();
  const playerId = parseInt(id || "");

  let player = players.find((p) => p.id === playerId);
  const defaultName = player?.name || "";
  const [name, setName] = useState(defaultName);

  const navigate = useNavigate();

  function saveChanges(e: any) {
    e.preventDefault();
    if (!player) {
      player = new Player(name, -1);
      PlayerService.createPlayer(player);
      setPlayers(players.concat(player));
    } else {
      player.name = name;
      PlayerService.updatePlayer(player);
      setPlayers(players.slice());
    }

    navigate("/spielerliste");
  }

  function deletePlayer(e: any): void {
    e.preventDefault();
    PlayerService.deletePlayer(playerId);
    const idx = players.findIndex((player) => player.id === playerId);
    if (idx !== -1) {
      let newPlayers = players.slice();
      newPlayers.splice(idx, 1);
      setPlayers(newPlayers);
    }

    navigate("/spielerliste");
  }

  return (
    <>
      <form className="container" onSubmit={saveChanges}>
        <label htmlFor="name">Spieler</label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="container-fluid justify-content-center d-flex pt-2 gap-2">
          <button className="btn" onClick={() => navigate("/spielerliste")}>
            Zurück
          </button>
          <button type="submit" className="btn btn-primary">
            Speichern
          </button>
          <button className="btn btn-danger" onClick={deletePlayer}>
            Löschen
          </button>
        </div>
      </form>
    </>
  );
}
