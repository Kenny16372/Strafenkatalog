import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../contexts/Config";
import formatMoney from "../utils/formatMoney";
import StatisticsSelect from "./StatisticsSelect";

export default function PlayersByPenaltySettled() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryParams] = useSearchParams();
  const type = queryParams.get("type") || "penalty_settled";

  useEffect(() => {
    fetch(API_URL + `statistics/?type=${type}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      });
  }, [type]);

  return (
    <div className="container-fluid">
      <StatisticsSelect type={type} />
      {loading ? (
        <p>Lade Spieler...</p>
      ) : (
        <>
          <h2 className="text-center">
            Gesamt:&nbsp;
            {formatMoney(
              players.reduce((acc, player) => acc + player.penalty_total, 0)
            )}
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th>Spieler</th>
                <th>Gezahlter Betrag</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td className="text-nowrap">
                    {formatMoney(player.penalty_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
