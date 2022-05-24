import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import GlobalState from "./contexts/GlobalState";
import EditFineView from "./views/EditFineView";
import FineListView from "./views/FineListView";
import MainView from "./views/MainView";

function App() {
  let initialState = {
    players: [
      {
        name: "Kenny",
        id: 1,
      },
      {
        name: "Luis",
        id: 2,
      },
    ],
    fines: [
      {
        name: "Tunnel/20",
        amount: 50,
        id: 3,
      },
      {
        name: "Gelb wegen Meckern",
        amount: 1000,
        id: 4,
      },
    ],
  };

  const [state, setState] = useState(initialState);

  return (
    <GlobalState.Provider value={[state, setState]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainView />} />
            <Route path="strafenkatalog" element={<FineListView />} />
            <Route path="strafeBearbeiten/:id" element={<EditFineView />} />
            <Route path="*" element={<MainView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalState.Provider>
  );
}

export default App;
