import React from "react";
import "./styles/vote-widget.css";
import VotingWidgetComponent from "./votingWidgetComponent";

export default function VotingWidget() {
  return (
    <main className="vote-page">
      <h1 className="vote-title">Motorbike Voting</h1>
      <VotingWidgetComponent />
    </main>
  );
}
