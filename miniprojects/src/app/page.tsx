import React from "react";
import "./styles/vote.css";
import VoteWidget from "./vote/VoteWidget";

export default function Voting() {
  return (
    <main className="vote-page">
      <h1>Motorbike Voting</h1>
      <VoteWidget />
    </main>
  );
}
