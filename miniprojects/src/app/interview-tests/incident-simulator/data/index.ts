export type IncidentStep = { title: string; detail: string };
export const incidentSteps: IncidentStep[] = [
  { title: "Assess impact", detail: "Confirm affected users, severity, security implications, and critical journeys." },
  { title: "Stabilise service", detail: "Use a safe rollback or feature flag when evidence links the release to failure." },
  { title: "Investigate evidence", detail: "Correlate metrics, safe logs, traces, deployments, and failing records." },
  { title: "Fix and verify", detail: "Add a regression test, review, deploy gradually, and verify recovery." },
  { title: "Learn", detail: "Run a blameless review and assign actions with owners and dates." },
];
