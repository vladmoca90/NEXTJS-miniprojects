"use client";
import { type FormEvent, useState } from "react";
import { LookupResult, ReferenceForm } from "./components";
import { knownApplications, referencePattern, type LookupState } from "./data";
export function StatusLookup() {
  const [reference, setReference] = useState("");
  const [state, setState] = useState<LookupState>({ kind: "idle" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = reference.trim().toUpperCase();
    if (!referencePattern.test(id)) return setState({ kind: "error", message: "Enter a reference in the format HO-1042." });
    setState({ kind: "loading" });
    await new Promise((resolve) => setTimeout(resolve, 450));
    const status = knownApplications[id];
    setState(status ? { kind: "success", reference: id, status } : { kind: "error", message: "We could not find an application you can access." });
  }
  return <section className="rounded-2xl bg-slate-950 p-6 shadow-sm">
    <p className="text-sm font-semibold !text-cyan-300">SWDN · TEST · Security</p>
    <h2 className="mt-1 text-2xl font-bold !text-white">Accessible status lookup</h2>
    <p className="mt-2 !text-slate-300">Try HO-1042, HO-1043, or HO-1038.</p>
    <ReferenceForm value={reference} loading={state.kind === "loading"} onChange={setReference} onSubmit={submit} />
    <LookupResult state={state} />
  </section>;
}
