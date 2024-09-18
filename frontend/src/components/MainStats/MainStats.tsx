import React from "react";
import { useSearchParams } from "react-router-dom";
import PlayersByPenaltySum from "../PlayersByPenaltySum";
import PlayersByPenaltyCount from "../PlayersByPenaltyCount";
import PlayersByPenaltyOpen from "../PlayersByPenaltyOpen";
import PlayersByPenaltySettled from "../PlayersByPenaltySettled";

function MainStats(props: { openFines: number }) {
  const [queryParams] = useSearchParams();
  const type = queryParams.get("type") || "penalty_open";

  switch (type) {
    case "penalty_sum":
      return <PlayersByPenaltySum />;
    case "penalty_count":
      return <PlayersByPenaltyCount />;
    case "penalty_settled":
      return <PlayersByPenaltySettled />;
    case "penalty_open":
    default:
      return <PlayersByPenaltyOpen />;
  }
}

export default MainStats;
