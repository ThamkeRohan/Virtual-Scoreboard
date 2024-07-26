import React from "react";

const BALLS_PER_OVER = 6;

export default function TeamScore({
  teamName,
  runs,
  wickets,
  legalDeliveries,
  totalDeliveries
}) {
  return (
    <div className="team">
      <p className="team-name">{teamName}</p>
      {totalDeliveries > 0 ? (
        <>
          <div className="team-score">
            <span className="runs">{runs}/</span>
            <span className="wicket">{wickets}</span>
          </div>
          <div className="overs">
            {`${Math.floor(legalDeliveries / BALLS_PER_OVER)}.${
              legalDeliveries % BALLS_PER_OVER
            }`}
          </div>
        </>
      ) : (
        <div>Yet to bat</div>
      )}
    </div>
  );
}

