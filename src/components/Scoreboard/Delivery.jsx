import React from 'react'

export default function Delivery({type, isWicket, runs}) {
  return (
    <div className="delivery">
      {type !== "legal" && <span>{type}</span> }
      {isWicket && <span>Out</span>}
      <span>{runs}</span>
    </div>
  );
}
