import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import FineContext from "./contexts/FineContext";
import PlayerContext from "./contexts/PlayerContext";
import TransactionContext from "./contexts/TransactionContext";
import IFine from "./interfaces/Fine";
import IPlayer from "./interfaces/Player";
import ITransaction from "./interfaces/Transaction";
import { FineService } from "./services/FineService";
import { PlayerService } from "./services/PlayerService";
import { TransactionService } from "./services/TransactionService";
import EditFineView from "./views/EditFineView";
import EditPlayerView from "./views/EditPlayerView";
import EditTransactionView from "./views/EditTransactionView";
import FineListView from "./views/FineListView";
import MainView from "./views/MainView";
import PlayerListView from "./views/PlayerListView";
import TransactionListView from "./views/TransactionListView";

function App() {
  const [fines, setFines] = useState([] as IFine[]);
  const [players, setPlayers] = useState([] as IPlayer[]);
  const [transactions, setTransactions] = useState([] as ITransaction[]);

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

  // players
  useEffect(() => {
    let subscribed = true;

    PlayerService.retrievePlayers((players) => {
      if (subscribed) {
        setPlayers(players);
      }
    });

    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(players)]);

  // transactions
  useEffect(() => {
    let subscribed = true;

    TransactionService.retrieveTransactions((transactions) => {
      if (subscribed) {
        setTransactions(transactions);
      }
    });

    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(transactions)]);

  return (
    <FineContext.Provider value={{ fines, setFines }}>
      <PlayerContext.Provider value={{ players, setPlayers }}>
        <TransactionContext.Provider value={{ transactions, setTransactions }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainView />} />
                <Route path="strafenkatalog" element={<FineListView />} />
                <Route path="strafeBearbeiten/:id" element={<EditFineView />} />
                <Route path="spielerliste" element={<PlayerListView />} />
                <Route
                  path="spielerBearbeiten/:id"
                  element={<EditPlayerView />}
                />
                <Route
                  path="vergehensliste"
                  element={<TransactionListView />}
                />
                <Route path="vergehen/:id" element={<EditTransactionView />} />
                <Route path="*" element={<MainView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TransactionContext.Provider>
      </PlayerContext.Provider>
    </FineContext.Provider>
  );
}

export default App;
