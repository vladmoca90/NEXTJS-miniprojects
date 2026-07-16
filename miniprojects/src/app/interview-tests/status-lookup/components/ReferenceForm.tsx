import type { FormEvent } from "react";
export function ReferenceForm({ value, loading, onChange, onSubmit }: {
  value: string; loading: boolean; onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return <form onSubmit={onSubmit} className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
    <label className="flex flex-1 flex-col gap-1 text-sm font-medium !text-white">Application reference
      <input value={value} onChange={(event) => onChange(event.target.value)} aria-describedby="reference-hint"
        className="rounded-lg border bg-white px-3 py-2 text-slate-950" />
      <span id="reference-hint" className="text-xs !text-slate-300">For example, HO-1042</span>
    </label>
    <button disabled={loading} className="rounded-lg bg-cyan-300 px-5 py-2 font-bold">{loading ? "Checking…" : "Check status"}</button>
  </form>;
}
