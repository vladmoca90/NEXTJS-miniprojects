import React from "react";
import "./styles/vote-widget.css";
import VoteWidget from "./vote-widget/VoteWidget";

export default function Voting() {
  return (
    <main className="vote-page">
      <h1 className="vote-title">Motorbike Voting</h1>
      <VoteWidget />
    </main>
  );
}
