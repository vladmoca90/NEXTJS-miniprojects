import { ArchitectureFlow, DesignTip } from "./components";
import { designItems } from "./data";
export function SystemDesign() {
  return <section className="rounded-2xl border bg-white p-6 shadow-sm">
    <p className="text-sm font-semibold text-emerald-700">SWDN · DATM</p>
    <h2 className="mt-1 text-2xl font-bold">Case-status service design</h2>
    <p className="mt-2 text-slate-600">A scalable, secure, and auditable architecture.</p>
    <ArchitectureFlow items={designItems} /><DesignTip />
  </section>;
}
