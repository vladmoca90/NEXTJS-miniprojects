import { filters, type ApplicationFilter } from "../data";

export function ApplicationControls({ value, onChange }: {
  value: ApplicationFilter;
  onChange: (value: ApplicationFilter) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-800">
      Filter by status
      <select value={value} onChange={(event) => onChange(event.target.value as ApplicationFilter)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2">
        {filters.map((filter) => <option key={filter} value={filter}>{filter.replaceAll("_", " ")}</option>)}
      </select>
    </label>
  );
}
