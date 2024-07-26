import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ScoreboardProvider } from "./contexts/ScoreboardContext";
import UmpireScoreboard from "./pages/UmpireScoreboard";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import SpectatorScoreboard from "./pages/SpectatorScoreboard";
import Matches from "./pages/Matches";
import MatchSetup from "./pages/MatchSetup";
import MatchesByUmpire from "./pages/MatchesByUmpire";
import Navigation from "./components/Navigation";
import { useErrorPortal, useErrorPortalUpdate } from "./contexts/ErrorPortalContext";
import ErrorModal from "./components/Error/ErrorModal";

function App() {
  const { isAuthenticated } = useAuth();
  const {error} = useErrorPortal()
  const {closeError} = useErrorPortalUpdate()
  return (
    <>
    <Navigation/>
      <Routes>
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/matches" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/matches" />}
        />
        <Route
          path="/match-setup"
          element={isAuthenticated ? <MatchSetup /> : <Navigate to="/login" />}
        />
        <Route path="/matches" element={<Matches />} />
        <Route
          path="/matches/umpires/:umpireId"
          element={
            isAuthenticated ? <MatchesByUmpire /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/umpire-scoreboard/matches/:matchId/teams/:team/overs/:overId"
          element={
            isAuthenticated ? (
              <ScoreboardProvider>
                <UmpireScoreboard />
              </ScoreboardProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/spectator-scoreboard/matches/:matchId/teams/:team/overs/:overId"
          element={
            <ScoreboardProvider>
              <SpectatorScoreboard />
            </ScoreboardProvider>
          }
        />
      </Routes>

      <ErrorModal error={error} closeErrorModal={closeError}/>
    </>
  );
}

export default App;
