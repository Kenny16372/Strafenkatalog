import React, { useContext, useMemo } from "react";
import PlayerContext from "../../contexts/PlayerContext";

function PlayerSelection(props: {
  selected?: number;
  playerChanged?: (a: number) => void;
}) {
  const { players } = useContext(PlayerContext);
  const activePlayers = useMemo(
    () => players.filter((player) => player.is_active),
    [players]
  );
  const inactivePlayers = useMemo(
    () => players.filter((player) => !player.is_active),
    [players]
  );

  function playerChanged(e: any): void {
    const id = parseInt(e.target.value);
    props.playerChanged && props.playerChanged(id);
  }

  function getDefaultValue() {
    const defaultValue =
      props.selected ?? (players && players[0] && players[0].id);
    setTimeout(
      () => props.playerChanged && props.playerChanged(defaultValue),
      1
    );
    return defaultValue;
  }

  return (
    <>
      <label htmlFor="selectPlayer">Spieler</label>
      <select
        id="selectPlayer"
        className="form-select"
        defaultValue={getDefaultValue()}
        onChange={playerChanged}
      >
        <option value="">Bitte wählen</option>
        <optgroup label="Aktiv">
          {activePlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Inaktiv">
          {inactivePlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </optgroup>
      </select>
    </>
  );
}

export default PlayerSelection;
