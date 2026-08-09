"use client";
import React, { useState } from "react";
import { Bike } from "../../../data/vote/Bike";
import { allBikes } from "../../../data/vote/allBikes";

export default function VotingWidgetComponent() {
  const [message, setMessage] = useState("");
  const bikes: Bike[] = allBikes;

  const handleClick = (_name: string) => {
    setMessage("clicked done");
  };

  return (
    <div>
      {bikes.map((b) => (
        <button
          key={b.id}
          onClick={() => handleClick(b.name)}
          className="vote-button"
        >
          🏍️ {b.name}
        </button>
      ))}

      {message ? (
        <div role="status" className="vote-message">
          {message}
        </div>
      ) : null}
    </div>
  );
}