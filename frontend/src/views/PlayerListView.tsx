import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import PlayerContext from "../contexts/PlayerContext";

function PlayerListView() {
  const { players } = useContext(PlayerContext);
  const activePlayers = useMemo(
    () => players.filter((player) => player.is_active),
    [players]
  );
  const inactivePlayers = useMemo(
    () => players.filter((player) => !player.is_active),
    [players]
  );

  return (
    <>
      <h1 className="text-center">Spielerliste</h1>
      <div className="container-fluid">
        <h2>Aktive Spieler</h2>
        <table className="table">
          <tbody>
            {activePlayers.map((player) => (
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

        <h2>Inaktive Spieler</h2>
        <table className="table">
          <tbody>
            {inactivePlayers.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>
                  <Link to={"../spielerBearbeiten/" + player.id}>
                    <i className="bi-pencil" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PlayerListView;
