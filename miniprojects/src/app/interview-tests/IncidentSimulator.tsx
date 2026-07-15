"use client";

import { useState } from "react";

type IncidentStep = {
  title: string;
  detail: string;
};

const incidentSteps: IncidentStep[] = [
  { title: "Assess impact", detail: "Confirm affected users, start time, severity, security implications, and critical journeys." },
  { title: "Stabilise service", detail: "Use a safe rollback or feature flag when evidence connects the deployment to the failure." },
  { title: "Investigate evidence", detail: "Correlate metrics, safe logs, traces, deployment events, and representative failing records." },
  { title: "Fix and verify", detail: "Add a regression test, peer-review the change, deploy gradually, and verify user-journey recovery." },
  { title: "Learn", detail: "Run a blameless review and assign preventive actions with owners and dates." },
];

export function IncidentSimulator() {
  const [revealedSteps, setRevealedSteps] = useState(1);

  return (
    <section aria-labelledby="incident-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">ASUP · SINT</p>
      <h2 id="incident-heading" className="mt-1 text-2xl font-bold text-slate-950">Production incident walkthrough</h2>
      <div className="mt-4 rounded-lg border-l-4 border-rose-500 bg-rose-50 p-4 text-slate-800">
        After a deployment, API 5xx errors rise from 0.2% to 8% for older applications.
      </div>

      <ol className="mt-6 space-y-3">
        {incidentSteps.slice(0, revealedSteps).map((step, index) => (
          <li key={step.title} className="flex gap-4 rounded-xl bg-slate-50 p-4">
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-700 font-bold !text-white">{index + 1}</span>
            <div>
              <h3 className="font-bold text-slate-950">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      {revealedSteps < incidentSteps.length ? (
        <button
          type="button"
          onClick={() => setRevealedSteps((current) => current + 1)}
          className="mt-5 rounded-lg bg-violet-700 px-5 py-2 font-semibold !text-white hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
        >
          Reveal next step
        </button>
      ) : (
        <p role="status" className="mt-5 font-semibold text-emerald-700">Response complete: restore safely, investigate with evidence, then prevent recurrence.</p>
      )}
    </section>
  );
}
