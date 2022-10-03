import React from "react";
import formatMoney from "../../utils/formatMoney";

function MainStats(props: { openFines: number }) {
  return (
    <div className="display-4">
      Offene Strafen: {formatMoney(props.openFines)}
    </div>
  );
}

export default MainStats;
