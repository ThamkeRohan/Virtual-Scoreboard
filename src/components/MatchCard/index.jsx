import React from "react";
import { getTeamScore } from "../../utils/scoreboard";
import { useSettings } from "../../contexts/SettingsContext";
import TeamScore from "../Scoreboard/TeamScore";
import { getMonthNameDayYearFormattedDate } from "../../utils/date";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function MatchCard({ match }) {
  const { settings } = useSettings();
  const battingFirstTeamScore = getTeamScore(
    settings,
    match.battingFirstTeam.oversFaced
  );
  const battingSecondTeamScore = getTeamScore(
    settings,
    match.battingSecondTeam.oversFaced
  );
  const { isAuthenticated, umpire } = useAuth();
  const scoreboardType =
    isAuthenticated && umpire._id === match.umpireId._id
      ? "umpire-scoreboard"
      : "spectator-scoreboard";
  
  return (
    <Link
      to={`/${scoreboardType}/matches/${match._id}/teams/battingFirstTeam/overs/${match.battingFirstTeam.oversFaced[0]._id}`}
    >
      <div className="match-card">
        <p className="date">
          <strong>Match started at: </strong>
          {getMonthNameDayYearFormattedDate(match.createdAt)}
        </p>
        <div>
          <TeamScore
            teamName={match.battingFirstTeam.name}
            runs={battingFirstTeamScore.runs}
            wickets={battingFirstTeamScore.wickets}
            legalDeliveries={battingFirstTeamScore.legalDeliveries}
            totalDeliveries={battingFirstTeamScore.totalDeliveries}
          />
          <TeamScore
            teamName={match.battingSecondTeam.name}
            runs={battingSecondTeamScore.runs}
            wickets={battingSecondTeamScore.wickets}
            legalDeliveries={battingSecondTeamScore.legalDeliveries}
            totalDeliveries={battingSecondTeamScore.totalDeliveries}
          />
        </div>
        <div>
          <p>
            <strong>Umpire: </strong> {match.umpireId.umpireName}
          </p>
        </div>
        <div>
          <p>
            <strong>Match status: </strong> {match.matchStatus}
          </p>
        </div>
      </div>
    </Link>
  );
}
