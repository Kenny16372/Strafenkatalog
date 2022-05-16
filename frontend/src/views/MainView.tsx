import MainStats from "../components/MainStats/MainStats";
import React from 'react'

function MainView() {
    return ( 
        <div className="w-100">
            <MainStats openFines={9550}/>
        </div>
     );
}

export default MainView;