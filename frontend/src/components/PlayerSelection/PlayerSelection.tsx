import React, { useContext } from "react";
import PlayerContext from "../../contexts/PlayerContext";

function PlayerSelection(props: {
  selected?: number;
  playerChanged?: (a: number) => void;
}) {
  const { players } = useContext(PlayerContext);

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
      <select
        className="form-select"
        defaultValue={getDefaultValue()}
        onChange={playerChanged}
      >
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default PlayerSelection;
