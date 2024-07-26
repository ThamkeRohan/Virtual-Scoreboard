import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup"
import MatchSetup from "../../pages/MatchSetup";
import Matches from "../../pages/Matches";
import MatchesByUmpire from "../../pages/MatchesByUmpire";
import { ScoreboardProvider } from "../../contexts/ScoreboardContext";
import UmpireScoreboard from "../../pages/UmpireScoreboard";
import SpectatorScoreboard from "../../pages/SpectatorScoreboard";
import { useAuth } from ".././../contexts/AuthContext";
import Settings from "../../pages/Settings";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Matches />} />

        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/match-setup"
          element={isAuthenticated ? <MatchSetup /> : <Navigate to="/login" />}
        />

        <Route 
            path="/settings"
            element={<Settings/>}
        />

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
    </>
  );
}
