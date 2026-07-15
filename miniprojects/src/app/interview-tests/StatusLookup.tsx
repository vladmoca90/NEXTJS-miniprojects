"use client";

import { FormEvent, useState } from "react";

type LookupState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; reference: string; status: string }
  | { kind: "error"; message: string };

const knownApplications: Record<string, string> = {
  "HO-1042": "In review",
  "HO-1043": "Submitted",
  "HO-1038": "Approved",
};

export function StatusLookup() {
  const [reference, setReference] = useState("");
  const [state, setState] = useState<LookupState>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalisedReference = reference.trim().toUpperCase();

    if (!/^HO-\d{4}$/.test(normalisedReference)) {
      setState({ kind: "error", message: "Enter a reference in the format HO-1042." });
      return;
    }

    setState({ kind: "loading" });

    // This delay stands in for a fetch call so the sample works without a
    // backend. A real API must authenticate and authorise on the server.
    await new Promise((resolve) => setTimeout(resolve, 450));
    const status = knownApplications[normalisedReference];

    // A generic message avoids revealing whether a record belongs to someone
    // else. Server-side ownership checks would be mandatory in production.
    if (!status) {
      setState({ kind: "error", message: "We could not find an application you can access." });
      return;
    }

    setState({ kind: "success", reference: normalisedReference, status });
  }

  return (
    <section aria-labelledby="status-lookup-heading" className="rounded-2xl border border-slate-200 bg-slate-950 p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">SWDN · TEST · Security</p>
      <h2 id="status-lookup-heading" className="mt-1 text-2xl font-bold !text-white">Accessible status lookup</h2>
      <p className="mt-2 max-w-2xl !text-slate-300">Try HO-1042, HO-1043, or HO-1038. The form demonstrates validation and explicit UI states.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1 text-sm font-medium !text-white">
          Application reference
          <input
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            aria-describedby="reference-hint"
            autoComplete="off"
            className="rounded-lg border border-slate-500 bg-white px-3 py-2 text-slate-950 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
          <span id="reference-hint" className="text-xs !text-slate-300">For example, HO-1042</span>
        </label>
        <button
          type="submit"
          disabled={state.kind === "loading"}
          className="rounded-lg bg-cyan-300 px-5 py-2 font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-wait disabled:opacity-60"
        >
          {state.kind === "loading" ? "Checking…" : "Check status"}
        </button>
      </form>

      <div className="mt-5 min-h-14" aria-live="polite">
        {state.kind === "success" && (
          <p className="rounded-lg bg-emerald-100 p-4 font-medium text-emerald-950">
            {state.reference}: {state.status}
          </p>
        )}
        {state.kind === "error" && <p role="alert" className="rounded-lg bg-rose-100 p-4 font-medium text-rose-950">{state.message}</p>}
      </div>
    </section>
  );
}
