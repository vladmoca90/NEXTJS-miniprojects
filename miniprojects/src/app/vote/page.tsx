import React from "react";
import "../styles/vote.css";
import VoteWidget from "./VoteWidget";

export default function Page() {
  return (
    <main className="vote-page">
      <h1>Motorbike Voting</h1>
      <VoteWidget />
    </main>
  );
}
