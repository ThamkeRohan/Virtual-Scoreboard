import React, { useState } from "react";
import Counter from "./Counter";
import { useAsyncFn } from "../../hooks/useAsync";
import { createNewMatch } from "../../services/match";
import {useNavigate} from "react-router-dom"
import { useErrorPortalUpdate } from "../../contexts/ErrorPortalContext";

export default function MatchSetup() {
  const [battingFirstTeamName, setBattingFirstTeamName] = useState("");
  const [battingSecondTeamName, setBattingSecondTeamName] = useState("");
  const [totalOversPerInning, setTotalOversPerInning] = useState(4);
  const [totalPlayersPerTeam, setTotalPlayersPerTeam] = useState(5);
  const createNewMatchFn = useAsyncFn(createNewMatch);
  const navigate = useNavigate()
  const {addError} = useErrorPortalUpdate()

  function handleSubmit(e) {
    e.preventDefault();
    createNewMatchFn
      .execute({
        battingFirstTeamName,
        battingSecondTeamName,
        totalOversPerInning,
        totalPlayersPerTeam,
      })
      .then((match) => {
        const matchId = match._id;
        const overId = match.battingFirstTeam.oversFaced[0]._id;
        navigate(
          `/umpire-scoreboard/matches/${matchId}/teams/battingFirstTeam/overs/${overId}`
        );
      })
      .catch((message) => addError(message));
  }

  return (
    <div className="match-setup">
      <h1>Match setup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Batting first team name"
          value={battingFirstTeamName}
          onChange={(e) => setBattingFirstTeamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Batting second team name"
          value={battingSecondTeamName}
          onChange={(e) => setBattingSecondTeamName(e.target.value)}
        />
        <Counter
          label="Overs"
          value={totalOversPerInning}
          setValue={setTotalOversPerInning}
        />
        <Counter
          label="Team players"
          value={totalPlayersPerTeam}
          setValue={setTotalPlayersPerTeam}
        />
        <button>Create match</button>
        
      </form>
    </div>
  );
}
