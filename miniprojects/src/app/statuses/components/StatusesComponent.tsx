import type { Status } from "../../../../data/statuses/Statuses";

interface StatusesComponentProps {
  statuses: Status[];
  selectedStatusId: number | null;
  onSelectStatus: (id: number) => void;
}

export const StatusesComponent = ({
  statuses,
  selectedStatusId,
  onSelectStatus,
}: StatusesComponentProps) => (
  <div className="statuses-options" role="group" aria-label="Choose a status">
    {statuses.map((status) => (
      <button
        key={status.id}
        type="button"
        className={`status-button status-${status.status}`}
        aria-pressed={selectedStatusId === status.id}
        onClick={() => onSelectStatus(status.id)}
      >
        <span className="statuses-dot" aria-hidden="true" />
        {status.name}
      </button>
    ))}
  </div>
);
