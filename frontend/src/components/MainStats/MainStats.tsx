import React from "react";
import formatMoney from "../../utils/formatMoney";

function MainStats(props: { openFines: number; }) {
    return ( 
        <div>
            <span className="openFines">Offene Strafen: {formatMoney(props.openFines)}</span>
        </div>
     );
}

export default MainStats;