const designItems = [
  { name: "Accessible Next.js UI", note: "Semantic HTML, keyboard support, clear error states" },
  { name: "API gateway", note: "Authentication, rate limiting, request IDs" },
  { name: "Status service", note: "Server-side authorisation and input validation" },
  { name: "Primary data store", note: "Transactions, versioning, audit history" },
  { name: "Event worker", note: "Idempotent notifications through an outbox pattern" },
];

export function SystemDesign() {
  return (
    <section aria-labelledby="design-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">SWDN · DATM</p>
      <h2 id="design-heading" className="mt-1 text-2xl font-bold text-slate-950">Case-status service design</h2>
      <p className="mt-2 text-slate-600">A simple architecture that can scale while preserving security and auditability.</p>

      <ol className="mt-6 grid gap-3 md:grid-cols-5">
        {designItems.map((item, index) => (
          <li key={item.name} className="relative rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <span className="text-xs font-bold text-emerald-800">STEP {index + 1}</span>
            <h3 className="mt-2 font-bold text-slate-950">{item.name}</h3>
            <p className="mt-2 text-sm leading-5 text-slate-600">{item.note}</p>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-xl bg-slate-100 p-4">
        <h3 className="font-bold text-slate-950">Interview tip</h3>
        <p className="mt-1 text-sm leading-6 text-slate-700">Start with users, scale, consistency, retention, and security constraints. Then justify the simplest design that meets them and explain its trade-offs.</p>
      </div>
    </section>
  );
}
