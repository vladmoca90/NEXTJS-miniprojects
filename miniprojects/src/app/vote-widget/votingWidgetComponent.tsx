"use client";
import React, { useState } from "react";
import { Bike } from "../../../data/vote/Bike";
import { allBikes } from "../../../data/vote/allBikes";

export default function VotingWidgetComponent(): JSX.Element {
  const [message, setMessage] = useState("");
  const bikes: Bike[] = allBikes;

  const handleClick = (_name: string) => {
    setMessage("clicked done");
  };

  return (
    <div className="vote-widget">
      <div className="vote-buttons">
        {bikes.map((b) => (
          <button
            key={b.id}
            onClick={() => handleClick(b.name)}
            className="vote-button"
          >
            <div className="bike-emoji">🏍️</div>
            <div className="bike-name">{b.name}</div>
          </button>
        ))}
      </div>

      {message ? (
        <div role="status" className="vote-message">
          {message}
        </div>
      ) : null}
    </div>
  );
}
