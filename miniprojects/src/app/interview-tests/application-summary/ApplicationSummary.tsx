"use client";
import { useMemo, useState } from "react";
import { ApplicationControls, ApplicationTable } from "./components";
import { applications, type ApplicationFilter } from "./data";

export function ApplicationSummary() {
  const [filter, setFilter] = useState<ApplicationFilter>("all");
  const rows = useMemo(() => applications
    .filter((item) => filter === "all" || item.status === filter)
    .toSorted((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt)), [filter]);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold text-blue-700">PROG · DATM</p>
          <h2 className="mt-1 text-2xl font-bold">Application data</h2>
          <p className="mt-2 text-slate-600">Filter and sort typed records without mutating source data.</p></div>
        <ApplicationControls value={filter} onChange={setFilter} />
      </div>
      <ApplicationTable rows={rows} />
    </section>
  );
}
