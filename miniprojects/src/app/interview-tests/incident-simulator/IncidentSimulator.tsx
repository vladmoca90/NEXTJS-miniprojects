"use client";
import { useState } from "react";
import { IncidentScenario, IncidentTimeline } from "./components";
import { incidentSteps } from "./data";
export function IncidentSimulator() {
  const [count, setCount] = useState(1);
  const complete = count === incidentSteps.length;
  return <section className="rounded-2xl border bg-white p-6 shadow-sm">
    <p className="text-sm font-semibold text-violet-700">ASUP · SINT</p>
    <h2 className="mt-1 text-2xl font-bold">Production incident walkthrough</h2>
    <IncidentScenario /><IncidentTimeline steps={incidentSteps.slice(0, count)} />
    {!complete ? <button onClick={() => setCount((value) => value + 1)} className="mt-5 rounded-lg bg-violet-700 px-5 py-2 font-semibold !text-white">Reveal next step</button>
      : <p role="status" className="mt-5 font-semibold text-emerald-700">Response complete: restore, investigate, prevent recurrence.</p>}
  </section>;
}
