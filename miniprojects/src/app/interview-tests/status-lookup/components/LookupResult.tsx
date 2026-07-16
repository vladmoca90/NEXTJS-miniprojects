import type { LookupState } from "../data";
export function LookupResult({ state }: { state: LookupState }) {
  return <div className="mt-5 min-h-14" aria-live="polite">
    {state.kind === "success" && <p className="rounded-lg bg-emerald-100 p-4">{state.reference}: {state.status}</p>}
    {state.kind === "error" && <p role="alert" className="rounded-lg bg-rose-100 p-4">{state.message}</p>}
  </div>;
}
