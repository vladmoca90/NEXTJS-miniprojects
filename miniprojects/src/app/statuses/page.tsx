"use client";
import { useState } from "react";
import { allStatuses } from "../../../data/statuses/allStatuses";
import { StatusesComponent } from "./components/StatusesComponent";
import { SelectedStatusComponent } from "./components/SelectedStatusComponent";
import "../styles/statuses.css";

export default function StatusesPage() {
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const selectedStatus = allStatuses.find((status) => status.id === selectedStatusId);

  return (
    <main className="statuses-container">
      <header className="statuses-header">
        <h1>Statuses</h1>
        <p>Select a status to view its details.</p>
      </header>
      <StatusesComponent
        statuses={allStatuses}
        selectedStatusId={selectedStatusId}
        onSelectStatus={setSelectedStatusId}
      />
      <SelectedStatusComponent status={selectedStatus} />
      {selectedStatus && (
        <button
          type="button"
          className="statuses-reset"
          onClick={() => setSelectedStatusId(null)}
        >
          Clear selection
        </button>
      )}
    </main>
  );
}
