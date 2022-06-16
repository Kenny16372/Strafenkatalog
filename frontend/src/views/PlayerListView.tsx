import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PlayerContext from "../contexts/PlayerContext";

function PlayerListView() {
  const { players } = useContext(PlayerContext);

  return (
    <>
      <h1 className="text-center">Spielerliste</h1>
      <div className="container-fluid">
        <table className="table">
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>
                  <Link to={"../spielerBearbeiten/" + player.id}>
                    <i className="bi-pencil" />
                  </Link>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>
                <Link to="../spielerBearbeiten/-1">
                  <button
                    type="button"
                    className="btn btn-success d-block m-auto"
                    aria-label="Spieler hinzufügen"
                  >
                    <i className="bi-plus-lg fs-3 px-5"></i>
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PlayerListView;
