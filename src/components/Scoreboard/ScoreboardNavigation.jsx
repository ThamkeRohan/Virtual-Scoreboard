import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useScoreboard } from "../../contexts/ScoreboardContext";

export default function ScoreboardNavigation({ scoreboardType }) {
  const { matchId, team } = useParams();
  const { match } = useScoreboard();
  const isBattingFirstTeam =
    window.location.pathname.includes("battingFirstTeam");

  return (
    <nav className="scoreboard-navigation">
      <div className="teams-nav">
        <Link
          className={`${isBattingFirstTeam ? "active" : ""}`}
          to={`/${scoreboardType}/matches/${matchId}/teams/battingFirstTeam/overs/${match.battingFirstTeam.oversFaced[0]._id}`}
        >
          {match.battingFirstTeam.name}
        </Link>
        <Link
          className={`${!isBattingFirstTeam ? "active" : ""}`}
          to={`/${scoreboardType}/matches/${matchId}/teams/battingSecondTeam/overs/${match.battingSecondTeam.oversFaced[0]._id}`}
        >
          {match.battingSecondTeam.name}
        </Link>
      </div>
      <div className="overs-nav">
        {match[team].oversFaced.map((over, overIndex) => (
          <NavLink
            key={over._id}
            to={`/${scoreboardType}/matches/${matchId}/teams/${team}/overs/${over._id}`}
          >
            {overIndex + 1}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
