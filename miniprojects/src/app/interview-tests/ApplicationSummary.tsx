"use client";

import { useMemo, useState } from "react";

type Status = "submitted" | "in_review" | "approved" | "rejected";

type Application = {
  id: string;
  applicant: string;
  status: Status;
  submittedAt: string;
};

const applications: Application[] = [
  { id: "HO-1042", applicant: "Sam Taylor", status: "in_review", submittedAt: "2026-07-12" },
  { id: "HO-1043", applicant: "Alex Morgan", status: "submitted", submittedAt: "2026-07-14" },
  { id: "HO-1038", applicant: "Jordan Singh", status: "approved", submittedAt: "2026-07-08" },
  { id: "HO-1039", applicant: "Charlie Jones", status: "rejected", submittedAt: "2026-07-09" },
];

const statuses: Array<Status | "all"> = [
  "all",
  "submitted",
  "in_review",
  "approved",
  "rejected",
];

const statusStyles: Record<Status, string> = {
  submitted: "bg-blue-100 text-blue-900",
  in_review: "bg-amber-100 text-amber-900",
  approved: "bg-emerald-100 text-emerald-900",
  rejected: "bg-rose-100 text-rose-900",
};

export function ApplicationSummary() {
  const [filter, setFilter] = useState<Status | "all">("all");

  // useMemo is not essential for four items, but demonstrates how derived data
  // can be calculated without storing a second, potentially stale state value.
  const filteredApplications = useMemo(() => {
    return applications
      .filter((application) => filter === "all" || application.status === filter)
      .toSorted(
        (first, second) =>
          Date.parse(second.submittedAt) - Date.parse(first.submittedAt),
      );
  }, [filter]);

  return (
    <section aria-labelledby="application-summary-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">PROG · DATM</p>
          <h2 id="application-summary-heading" className="mt-1 text-2xl font-bold text-slate-950">Application data</h2>
          <p className="mt-2 max-w-2xl text-slate-600">Filter and sort typed records without mutating the source array.</p>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-800">
          Filter by status
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as Status | "all")}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status.replaceAll("_", " ")}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Applications sorted by newest submission date</caption>
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-3 py-3 font-semibold text-slate-700">Reference</th>
              <th className="px-3 py-3 font-semibold text-slate-700">Applicant</th>
              <th className="px-3 py-3 font-semibold text-slate-700">Status</th>
              <th className="px-3 py-3 font-semibold text-slate-700">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id} className="border-b border-slate-100 last:border-0">
                <td className="whitespace-nowrap px-3 py-4 font-mono text-slate-900">{application.id}</td>
                <td className="px-3 py-4 text-slate-700">{application.applicant}</td>
                <td className="px-3 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status]}`}>
                    {application.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-slate-700">
                  <time dateTime={application.submittedAt}>{application.submittedAt}</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredApplications.length === 0 && <p role="status" className="mt-5 text-slate-600">No applications match this filter.</p>}
    </section>
  );
}
