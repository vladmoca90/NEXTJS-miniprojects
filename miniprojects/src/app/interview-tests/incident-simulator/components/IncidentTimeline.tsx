import type { IncidentStep } from "../data";
export function IncidentTimeline({ steps }: { steps: IncidentStep[] }) {
  return <ol className="mt-6 space-y-3">{steps.map((step, index) =>
    <li key={step.title} className="flex gap-4 rounded-xl bg-slate-50 p-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-700 font-bold !text-white">{index + 1}</span>
      <div><h3 className="font-bold">{step.title}</h3><p className="mt-1 text-sm text-slate-600">{step.detail}</p></div>
    </li>)}</ol>;
}
