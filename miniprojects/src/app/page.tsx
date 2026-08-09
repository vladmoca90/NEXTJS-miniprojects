import React from "react";
import "./styles/vote-widget.css";
import VotingWidgetComponent from "./vote-widget/votingWidgetComponent";

export default function VotingWidget() {
  return (
    <main className="vote-page">
      <h1 className="vote-title">Motorbike Voting</h1>
      <votingWidgetComponent />
    </main>
  );
}
