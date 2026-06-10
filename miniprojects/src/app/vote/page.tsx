import React from "react";
import VoteWidget from "../../components/VoteWidget";

export default function Page() {
  return (
    <main style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <h1>Motorbike Voting</h1>
      <VoteWidget />
    </main>
  );
}
