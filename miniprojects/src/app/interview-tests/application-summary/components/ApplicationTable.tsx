import { statusStyles, type Application } from "../data";

export function ApplicationTable({ rows }: { rows: Application[] }) {
  if (!rows.length) return <p role="status" className="mt-5 text-slate-600">No applications match.</p>;
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Applications ordered by submission date</caption>
        <thead><tr className="border-b border-slate-200">
          {["Reference", "Applicant", "Status", "Submitted"].map((item) =>
            <th key={item} className="px-3 py-3 font-semibold">{item}</th>)}
        </tr></thead>
        <tbody>{rows.map((row) => (
          <tr key={row.id} className="border-b border-slate-100">
            <td className="px-3 py-4 font-mono">{row.id}</td>
            <td className="px-3 py-4">{row.applicant}</td>
            <td className="px-3 py-4"><span className={"rounded-full px-3 py-1 text-xs font-semibold " + statusStyles[row.status]}>{row.status.replaceAll("_", " ")}</span></td>
            <td className="px-3 py-4"><time dateTime={row.submittedAt}>{row.submittedAt}</time></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
