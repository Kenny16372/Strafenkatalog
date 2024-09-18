import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../contexts/Config";
import StatisticsSelect from "./StatisticsSelect";

export default function PlayersByPenaltyCount() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryParams] = useSearchParams();
  const type = queryParams.get("type") || "penalty_count";

  useEffect(() => {
    fetch(API_URL + `statistics/?type=${type}`)
      .then((response) => response.json())
      .then((data) => {
        setStatistics(data);
        setLoading(false);
      });
  }, [type]);

  return (
    <div className="container-fluid">
      <StatisticsSelect type={type} />
      {loading ? (
        <p>Lade Spieler...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Spieler</th>
              <th>Strafe</th>
              <th>Anzahl</th>
            </tr>
          </thead>
          <tbody>
            {statistics.map((stats) => (
              <tr key={stats.id + "-" + stats.fine_id}>
                <td>{stats.player_name}</td>
                <td>{stats.fine_name}</td>
                <td className="text-nowrap">{stats.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
