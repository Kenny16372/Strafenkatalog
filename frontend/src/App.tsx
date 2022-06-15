import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import FineContext from "./contexts/FineContext";
import IFine from "./interfaces/Fine";
import { FineService } from "./services/FineService";
import EditFineView from "./views/EditFineView";
import FineListView from "./views/FineListView";
import MainView from "./views/MainView";

function App() {
  const [fines, setFines] = useState([] as IFine[]);

  // fines
  useEffect(() => {
    let subscribed = true;

    FineService.retrieveFines((fines) => {
      if (subscribed) {
        setFines(fines);
      }
    });

    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(fines)]);

  return (
    <FineContext.Provider value={{ fines, setFines }}>
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
    </FineContext.Provider>
  );
}

export default App;
