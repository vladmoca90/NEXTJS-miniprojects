import type { DesignItem } from "../data";
export function ArchitectureFlow({ items }: { items: DesignItem[] }) {
  return <ol className="mt-6 grid gap-3 md:grid-cols-5">{items.map((item, index) =>
    <li key={item.name} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <span className="text-xs font-bold text-emerald-800">STEP {index + 1}</span>
      <h3 className="mt-2 font-bold">{item.name}</h3><p className="mt-2 text-sm text-slate-600">{item.note}</p>
    </li>)}</ol>;
}
