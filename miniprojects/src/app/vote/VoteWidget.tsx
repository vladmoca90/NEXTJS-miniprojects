"use client";
import React, { useState } from "react";
import { Bike } from "../../../data/vote/Bike";
import { allBikes } from "../../../data/vote/allBikes";

export default function VoteWidget(): JSX.Element {
  const [message, setMessage] = useState("");
  const bikes: Bike[] = allBikes;

  const handleClick = (_name: string) => {
    setMessage("clicked done");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", gap: 16 }}>
        {bikes.map((b) => (
          <button
            key={b.id}
            onClick={() => handleClick(b.name)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              background: "white",
              cursor: "pointer",
              width: 120,
            }}
          >
            <div style={{ fontSize: 48 }}>🏍️</div>
            <div style={{ fontWeight: 600 }}>{b.name}</div>
          </button>
        ))}
      </div>

      {message ? (
        <div
          role="status"
          style={{ marginTop: 12, fontWeight: 700, color: "#111" }}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
