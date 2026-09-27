import type { Status } from "../../../../data/statuses/Statuses";

interface SelectedStatusComponentProps {
  status: Status | undefined;
}

export const SelectedStatusComponent = ({ status }: SelectedStatusComponentProps) => (
  <section className="statuses-details" aria-live="polite" aria-atomic="true">
    <h2>Selected status</h2>
    {status ? (
      <>
        <span className={`statuses-badge status-${status.status}`}>
          <span className="statuses-dot" aria-hidden="true" />
          {status.name}
        </span>
        <p>{status.description}</p>
      </>
    ) : (
      <p>No status selected. Choose one above to get started.</p>
    )}
  </section>
);
